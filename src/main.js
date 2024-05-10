import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

// Vue 애플리케이션 인스턴스를 생성
const app = createApp(App);

// 라우터 인스턴스를 애플리케이션에 등록
app.use(router);

// 애플리케이션을 웹 페이지에 마운트
app.mount("#app");
