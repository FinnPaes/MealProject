// I have copy and pasted this config as this is what's required for Nuxt 3 & Vue testing
// I modified it a bit; such as adding custom Nuxt elements so it will not give false warnings.

import path from "path";
import { defineConfig } from "vitest/config";
import Vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import VueTypeImports from "vite-plugin-vue-type-imports";

export default defineConfig({
	plugins: [
		Vue({
			template: {
				compilerOptions: {
					isCustomElement: (tag) => ["nuxt-link"].includes(tag),
				}
			}
		}),
		VueTypeImports(),
		AutoImport({
			imports: ["vue"]
		}),
		Components({
			dirs: ["components"],
			directoryAsNamespace: true
		}),
	],
	test: {
		globals: true,
		environment: "jsdom",
		deps: {
			inline: [/@nuxt\/test-utils-edge/],
		}
	},
	root: ".",
	resolve: {
		alias: {
			"~": path.resolve(__dirname, "."),
		},
	},
});