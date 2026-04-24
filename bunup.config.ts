import { defineConfig } from "bunup";

export default defineConfig({
    // defining multiple entry points
    entry: ["src/vanilla/index.ts", "src/react/index.ts"],
    format: ["esm"],

    dts: true,
    external: ["react", "react-dom", "svelte"],
    // always define this as is
    define: {
        "process.env.NODE_ENV": "production",
    },
    jsx: {
        development: false,
    },
});
