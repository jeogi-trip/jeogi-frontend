import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import { useAuthStore } from "@/stores/auth";

// Vue 애플리케이션 인스턴스를 생성
const app = createApp(App);
const pinia = createPinia();

// 라우터 인스턴스를 애플리케이션에 등록
app.use(router);
app.use(pinia);

const authStore = useAuthStore();
authStore.checkAuth();

// 애플리케이션을 웹 페이지에 마운트
app.mount("#app");
