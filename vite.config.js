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
      open: true,
      cors: true,
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
      target: "modules",
      emptyOutDir: true,
      assetsDir: "assets",
      minify: "terser",
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
      rollupOptions: {
        output: {
          chunkFileNames: "js/[name].[hash].js",
          entryFileNames: "js/[name].[hash].js",
          assetFileNames: "[ext]/[name].[hash].[ext]",
        },
      },
    },
  };
});
