import { defineConfig, loadEnv } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
import { resolve } from "path";

export default defineConfig(({ mode }) => {
  const envConfig = loadEnv(mode, "./");
  return {
    base: "/",
    plugins: [uni()],
    resolve: {
      alias: {
        "@": resolve(__dirname, "src"),
      },
    },
    server: {
      host: "0.0.0.0",
      port: 8902,
      proxy: {
        "/dev": {
          target: envConfig.VITE_BASE_URL,
          changeOrigin: true,
          secure: true,
          ws: false,
          rewrite: (path) => path.replace(/^\/dev/, ""),
        },
      },
    },
    build: {
      assetsDir: "static/img/",
      rollupOptions: {
        output: {
          chunkFileNames: "static/js/[name]-[hash].js",
          entryFileNames: "static/js/[name]-[hash].js",
          assetFileNames: "static/[ext]/[name]-[hash].[ext]",
        },
      },
    },
  };
});
