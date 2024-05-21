import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    host: "0.0.0.0", // 모든 네트워크 인터페이스에서 접근 가능하도록 설정
    port: 5174, // 원하는 포트 번호로 설정
    // public: "172.20.10.14:5174", // 외부에서 접근할 때 사용할 URL
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
