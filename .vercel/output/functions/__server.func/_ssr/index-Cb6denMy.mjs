import { TSS_SERVER_FUNCTION, createServerFn } from "./index.mjs";
import { readFile } from "node:fs/promises";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:stream";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
var createServerRpc = (serverFnMeta, splitImportFn) => {
  const url = "/_serverFn/" + serverFnMeta.id;
  return Object.assign(splitImportFn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
const getBusinessName_createServerFn_handler = createServerRpc({
  id: "ed9e0b62e19345253bb81dfb20bac27bb23001205689ad75c3f2879c99c299c4",
  name: "getBusinessName",
  filename: "src/routes/index.tsx"
}, (opts) => getBusinessName.__executeServer(opts));
const getBusinessName = createServerFn({
  method: "GET"
}).handler(getBusinessName_createServerFn_handler, async () => {
  try {
    const cfg = JSON.parse(await readFile("site.json", "utf8"));
    return cfg.businessName?.trim() ?? "";
  } catch {
    return "";
  }
});
export {
  getBusinessName_createServerFn_handler
};
