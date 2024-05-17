import { createRouter, createWebHistory } from "vue-router";
// import BoardList from "@/components/main/BoardList.vue";
// import BoardWrite from "@/components/board/BoardList.vue";
// import BoardDetail from "@/components/board/BoardDetail.vue";
import Main from "@/views/Main.vue";
import Notice from "@/views/Notice.vue";
import Board from "@/views/Board.vue";
import Login from "@/views/Login.vue";
import Promise from "@/views/Promise.vue";
import Result from "@/components/main/SearchResult.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // linkActiveClass: "active",
  routes: [
    {
      path: "/",
      name: "main",
      component: Main,
    },
    {
      path: "/result",
      name: "result",
      component: Result,
    },
    {
      path: "/notice",
      name: "notice",
      component: Notice,
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/promise",
      name: "promise",
      component: Promise,
    },
    {
      path: "/board",
      name: "board",
      component: Board,
      redirect: { name: "board-list" },
      children: [
        {
          path: "list",
          name: "board-list",
          component: () => import("@/components/board/BoardList.vue"),
        },
        {
          path: "detail/:boardId",
          name: "board-detail",
          component: () => import("@/components/board/BoardDetail.vue"),
        },
        {
          path: "write",
          name: "board-write",
          component: () => import("@/components/board/BoardWrite.vue"),
        },
        {
          path: "modify/:boardId",
          name: "board-modify",
          component: () => import("@/components/board/BoardModify.vue"),
        },
      ],
    },
  ],
});

export default router;
