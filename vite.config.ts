import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    cssInjectedByJsPlugin(),
    // Este plugin genera los archivos de tipos (.d.ts)
    dts({
      insertTypesEntry: true,
      tsconfigPath: "./tsconfig.app.json",
      exclude: ["src/App.tsx", "src/main.tsx"],
    }),
  ],
  build: {
    lib: {
      // Le decimos a Vite dónde está la "puerta de entrada" que creaste
      entry: "./src/index.ts",
      name: "TooltipReact", // Un nombre global
      fileName: (format) => `tooltip-react.${format}.js`,
    },
    rollupOptions: {
      // Excluimos React de nuestro paquete final, quien instale tu librería ya tendrá React en su propio proyecto, si no hacemos esto, tu librería pesará mucho y puede causar errores.
      external: ["react", "react-dom", "react/jsx-runtime"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
});
