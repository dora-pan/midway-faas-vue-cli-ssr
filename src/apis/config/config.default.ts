import { join } from "path";

module.exports = (appInfo: any) => {
  const exports = {} as any;

  exports.staticFile = {
    prefix: "/staticssr/",
    dir: join(appInfo.baseDir, "../build/ssr"),
  };

  exports.ssrDir = join(appInfo.baseDir, "../build/ssr");

  return exports;
};
