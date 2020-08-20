import { Provide, Config } from "@midwayjs/decorator";
import { ISSRService } from "../interface";
import { createBundleRenderer } from "vue-server-renderer";
const path = require("path");
const file = require("fs");

@Provide("ssrService")
export class SSRService implements ISSRService {
  @Config("ssrDir")
  ssrDir: string;

  async VueSSR(params: { title: string; url: string }): Promise<any> {
    const serverBundle = require(`${this.ssrDir}/vue-ssr-server-bundle.json`);
    const clientManifest = require(`${this.ssrDir}/vue-ssr-client-manifest.json`);
    let renderer = createBundleRenderer(serverBundle, {
      template: file.readFileSync(
        this.ssrDir + "/index.template.html",
        "utf-8"
      ),
      clientManifest,
    });
    return renderer.renderToString(params);
  }
}
