import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwind from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
	plugins: [react(), tailwind()],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src/web"),
		},
	},
	server: {
		allowedHosts: true,
		proxy: {
			// При `vercel dev` API доступен на том же порту — proxy не нужен.
			// При `vite dev` (без vercel) — используется dev-fallback во фронтенде.
		},
	},
	build: {
		outDir: "dist/client",
		rollupOptions: {
			input: path.resolve(__dirname, "index.html"),
		},
	},
});
