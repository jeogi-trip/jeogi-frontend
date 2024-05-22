<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import axiosInstance from "@/api/axiosInstance";

const route = useRoute();
const router = useRouter();
const boardId = ref(route.params.boardId);
console.log(boardId.value);

const title = ref("");
const content = ref("");
const userId = ref("");

const fetchArticle = () => {
  axiosInstance
    .get(`/api/board/${boardId.value}`)
    .then((response) => {
      const { title: fetchedTitle, userId: fetchedUserId, content: fetchedContent } = response.data;
      title.value = fetchedTitle;
      content.value = fetchedContent;
      userId.value = fetchedUserId;
    })
    .catch((error) => console.error("게시글 정보 불러오기 에러:", error));
};

fetchArticle();

const modifyArticle = () => {
  const addr = "/api/board/" + boardId.value;

  // 데이터를 요청 본문에 포함시켜 PUT 요청을 보냅니다.
  axiosInstance
    .put(addr, {
      boardId: boardId.value,
      userId: userId.value,
      title: title.value,
      content: content.value,
    })
    .then(() => {
      axiosInstance.get(addr).then((response) => {
        console.log("글 수정 후 확인!!");
        console.log(response);
        router.push({ name: "notice-detail" });
      });
    })
    .catch((error) => console.error("게시글 수정 에러:", error));
};

function moveList() {
  router.replace({ name: "notice-list" });
}
</script>

<template>
  <div class="container" style="margin-top: 50px">
    <div class="row">
      <div class="" style="width: 1200px; border: 3px solid lightgray; border-radius: 10px">
        <div class="form-head" style="margin: 20px">
          <br />
          <h4 class="title" style="font-size: 25px; font-family: 'neon'">공지 수정하기</h4>
          <br />
          <table>
            <tr>
              <th>글번호</th>
              <td><input type="text" :value="boardId" readonly style="color: gray" /></td>
            </tr>
            <tr>
              <th>제목</th>
              <td><input type="text" v-model="title" /></td>
            </tr>
            <tr>
              <th>작성자</th>
              <td>
                <input type="text" name="writer" v-model="userId" readonly style="color: gray" />
              </td>
            </tr>
            <tr>
              <th>내용</th>
              <td><textarea v-model="content" rows="7" cols="80"></textarea></td>
              <td></td>
            </tr>
          </table>
          <div>
            <button type="submit" @click="modifyArticle">수정하기</button>
          </div>
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
