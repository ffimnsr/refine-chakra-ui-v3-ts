import { defineConfig } from "tsup"

import { markAsExternalPlugin } from "./shared/mark-as-external-plugin"
import { removeTestIdsPlugin } from "./shared/remove-test-ids-plugin"
import { dayJsEsmReplacePlugin } from "./shared/dayjs-esm-replace-plugin"

export default defineConfig((options) => ({
  entry: ["src/index.tsx"],
  splitting: true,
  sourcemap: true,
  clean: true,
  minify: true,
  format: ["cjs", "esm"],
  outExtension: ({ format }) => ({ js: format === "cjs" ? ".cjs" : ".mjs" }),
  platform: "browser",
  esbuildPlugins: [
    markAsExternalPlugin,
    dayJsEsmReplacePlugin,
    removeTestIdsPlugin,
  ],
  loader: {
    ".svg": "dataurl",
  },
  esbuildOptions(options) {
    options.keepNames = true
    options.banner = {
      js: '"use client"',
    }
  },
  onSuccess: options.watch ? "pnpm types" : undefined,
}))
