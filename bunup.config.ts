import { defineConfig } from "bunup";

export default defineConfig({
    entry: ["src/index.ts"],
    format: ["esm"],
    dts: true,
    external: ["react", "react-dom"],
    // always define this as is
    define: {
        "process.env.NODE_ENV": "production",
    },
    jsx: {
        development: false,
    },
});
