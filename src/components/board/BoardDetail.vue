<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";

const route = useRoute();
const router = useRouter();
const { boardId } = route.params;
console.log(boardId);

const board = ref({});

const viewArticle = (boardId) => {
  axios.get("http://localhost/api/board/" + boardId).then((response) => {
    console.log("글작성 후 확인");
    console.log(response);
    board.value = response.data;
  });
};

viewArticle(boardId);

function moveList() {
  router.push({ name: "board-list" });
}

function moveModify() {
  router.push({ name: "board-modify", params: { boardId } });
}

const onDeleteBoard = () => {
  axios.delete("http://localhost/api/board/" + boardId).then((response) => {
    console.log("글삭제 후 확인!!!");
    console.log(response);
    router.replace({ name: "board-list" });
  });
};
</script>

<template>
  <div class="container" style="margin-top: 50px">
    <div class="row">
      <div class="" style="width: 1200px; border: 3px solid lightgray; border-radius: 10px">
        <div class="form-head" style="margin: 20px">
          <br />
          <h4 class="title" style="font-size: 25px; font-family: 'neon'">글 상세 정보</h4>
          <br />
          <table>
            <tr>
              <th style="width: 100px">글번호</th>
              <td>{{ board.boardId }}</td>
            </tr>
            <tr>
              <th>제목</th>
              <td>{{ board.title }}</td>
            </tr>
            <tr>
              <th>조회수</th>
              <td>{{ board.viewCount }}</td>
            </tr>
            <tr>
              <th>내용</th>
              <td>{{ board.content }}</td>
            </tr>
          </table>
          <button class="nav-link" @click="moveList">목록</button>
          <button class="nav-link" @click="onDeleteBoard">삭제</button>
          <button class="nav-link" @click="moveModify">수정</button>
          <br />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
button {
  font-size: 17px;
  float: right;
  margin-top: 10px;
  margin-bottom: 10px;
  color: #00bcd4;
  background-color: rgb(246, 246, 246);
  cursor: pointer;
  border: none;
}
</style>
