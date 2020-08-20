const fs = require("fs");
const path = require("path");
const LRU = require("lru-cache");
const express = require("express");
const compression = require("compression");
const microcache = require("route-cache");
const {
  createBundleRenderer
} = require("vue-server-renderer");

const isProd = process.env.NODE_ENV === "production";
const useMicroCache = process.env.MICRO_CACHE !== "false";

const resolve = (file) => path.resolve(__dirname, file);
const serverInfo =
  `express/${require("express/package.json").version} ` + // eslint-disable-line
  `vue-server-renderer/${require("vue-server-renderer/package.json").version}`; // eslint-disable-line

function createRenderer(bundle, options) {
  // https://github.com/vuejs/vue/blob/dev/packages/vue-server-renderer/README.md#why-use-bundlerenderer
  return createBundleRenderer(
    bundle,
    Object.assign(options, {
      // for component caching
      cache: LRU({
        max: 1000,
        maxAge: 1000 * 60 * 15,
      }),
      // this is only needed when vue-server-renderer is npm-linked
      basedir: resolve("./build/ssr"),
      // recommended for performance
      runInNewContext: false,
    })
  );
}

let renderer;
let readyPromise;
const app = express();
const templatePath = resolve("./web/public/index.template.html");
if (isProd) {
  // In production: create server renderer using template and built server bundle.
  // The server bundle is generated by vue-ssr-webpack-plugin.
  const template = fs.readFileSync(templatePath, "utf-8");
  const bundle = require("./build/ssr/vue-ssr-server-bundle.json"); // eslint-disable-line
  // The client manifests are optional, but it allows the renderer
  // to automatically infer preload/prefetch links and directly add <script>
  // tags for any async chunks used during render, avoiding waterfall requests.
  const clientManifest = require("./build/ssr/vue-ssr-client-manifest.json"); // eslint-disable-line
  renderer = createRenderer(bundle, {
    template,
    clientManifest,
  });
} else {
  // In development: setup the dev server with watch and hot-reload,
  // and create a new renderer on bundle / index template update.
  readyPromise = require("./config/setup-dev-server")(
    // eslint-disable-line
    app,
    templatePath,
    (bundle, options) => {
      renderer = createRenderer(bundle, options);
    } // eslint-disable-line
  );
}

const serve = (path, cache) =>
  express.static(resolve(path), {
    // eslint-disable-line
    maxAge: cache && isProd ? 1000 * 60 * 60 * 24 * 30 : 0,
  });

const project = "";

app.use(
  compression({
    threshold: 0,
  })
);
app.use(`${project}/staticssr`, serve("./build/ssr", true));
app.use(`${project}/public`, serve("./public", true));
app.use(`${project}/manifest.json`, serve("./manifest.json", true));
app.use(`${project}/service-worker.js`, serve("./build/ssr/service-worker.js"));

// since this app has no user-specific content, every page is micro-cacheable.
// if your app involves user-specific content, you need to implement custom
// logic to determine whether a request is cacheable based on its url and
// headers.
// 1-second microcache.
// https://www.nginx.com/blog/benefits-of-microcaching-nginx/
app.use(microcache.cacheSeconds(1, (req) => useMicroCache && req.originalUrl));

function render(req, res) {
  const s = Date.now();
  const {
    url
  } = req;

  res.setHeader("Content-Type", "text/html");
  res.setHeader("Server", serverInfo);

  const handleError = (err) => {
    if (err.url) {
      res.redirect(err.url);
    } else if (err.code === 404) {
      res.status(404).send("404 | Page Not Found");
    } else {
      // Render Error Page or Redirect
      res.status(500).send("500 | Internal Server Error");
      console.error(`error during render : ${url}`); // eslint-disable-line
      console.error(err.stack); // eslint-disable-line
    }
  };

  // if (url === project) return res.redirect(301, `${url}/`);

  /*const currDate = new Date();
  const dateTime = `${currDate.toLocaleDateString()} ${currDate.toLocaleTimeString()}`;
  console.log(`${dateTime}`); // eslint-disable-line*/

  const context = {
    url,
    title: "",
    keywords: "",
    description: "",
    query: req.query,
    cookies: req.cookies,
  };

  return renderer.renderToString(context, (err, html) => {
    let newHtml = html || "";

    if (context.meta) {
      const {
        title,
        meta
      } = context.meta.inject();
      const titleText = title.text();
      let metaText = meta.text();

      metaText = metaText.replace(/></, ">\n\t<");

      newHtml = newHtml
        .replace(/<title[^>]*>[^<]*<\/title>/, titleText)
        .replace(
          /<meta[^<]name="keywords"[^>]*>[\n\s]*<meta[^<]name="description"[^>]*>/,
          metaText
        );
    }

    if (!isProd && url.indexOf('/api') > -1) {
      const jsonStr = fs.readFileSync(path.join(__dirname, `./web/mock${url}.json`), 'utf-8')
      res.send(jsonStr)
      console.log(`[res-RouteMock]"${url}": ${Date.now() - s}ms`); // eslint-disable-line
      return
    }

    if (err) {
      console.log(`[res-Error]"${url}": ${JSON.stringify(err)}`); // eslint-disable-line
      return handleError(err);
    }

    res.send(newHtml);

    console.log(`[res-Route]"${url}": ${Date.now() - s}ms`); // eslint-disable-line
    //console.log(`[UserAgent]"${req.headers['x-forwarded-for'] || req.connection.remoteAddress}": ${req.get('User-Agent')}`) // eslint-disable-line

    return newHtml;
  });
}

app.get("*", isProd ? render : (req, res) => {
  readyPromise.then(() => render(req, res));
});

const port = process.env.PORT || 7000;
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port} ...`); // eslint-disable-line
});