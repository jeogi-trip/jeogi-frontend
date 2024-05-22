<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { listArticle } from "@/api/board.js";

import BoardListItem from "@/components/board/BoardListItem.vue";
import axiosInstance from "@/api/axiosInstance";

const router = useRouter();
const isLoggedIn = ref(false);

const selectOption = ref([
  { text: "검색조건", value: "" },
  { text: "글번호", value: "article_no" },
  { text: "제목", value: "subject" },
  { text: "작성자아이디", value: "user_id" },
]);

const articles = ref([]);
// const currentPage = ref(1);
// const totalPage = ref(0);
const { VITE_ARTICLE_LIST_SIZE } = import.meta.env;
const param = ref({
  //   pgno: currentPage.value,
  //   spp: VITE_ARTICLE_LIST_SIZE,
  key: "",
  word: "",
});

onMounted(() => {
  isLoggedIn.value = localStorage.getItem("userId") !== null;

  axiosInstance
    .get("/api/board/list")
    .then((response) => {
      console.log(response);
      articles.value = response.data.boardList;
    })
    .catch((error) => {
      console.dir(error);
    });
});

const moveWrite = () => {
  router.push({ name: "article-write" });
};
</script>

<template>
  <div class="container" style="margin-top: 50px">
    <div class="row">
      <div class="" style="width: 1200px; border: 3px solid lightgray; border-radius: 10px">
        <div class="form-head" style="margin: 20px">
          <br />
          <h4 class="title" style="font-size: 25px; font-family: 'neon'">게시글 목록</h4>
          <br />
          <table style="font-size: 13px">
            <tr style="color: black">
              <th class="num">번호</th>
              <th class="title">제목</th>
              <th class="author">글쓴이</th>
              <th class="views">조회수</th>
              <th class="date">작성일시</th>
            </tr>
            <BoardListItem v-for="article in articles" key="article.boardNo" :article="article"> </BoardListItem>

            <!-- <c:forEach var="board" items="${list}">
                  <tr>
                    <td>${board.no}</td>
                    <td><a href="${pageContext.request.contextPath}/free-board?action=detail&no=${board.no}">${board.title}</a></td>
                    <td>${board.writer}</td>
                    <td>${board.hit}</td> 
                    <td>${board.createTime}</td>
                  </tr>
                  </c:forEach> -->
          </table>

          <!-- <c:choose> -->
          <!-- <c:when test="${not empty sessionScope.member}"> -->
          <RouterLink
            v-if="isLoggedIn"
            class="nav-link"
            :to="{ name: 'board-write' }"
            style="font-size: 17px; float: right; margin: 10px; color: #00bcd4"
            >등록하기</RouterLink
          >
          <!-- </c:when> -->
          <!-- </c:choose> -->
          <br />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
