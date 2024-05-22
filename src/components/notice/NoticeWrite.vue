<script setup>
import { ref, onMounted } from "vue";
import axiosInstance from "@/api/axiosInstance";
import { useRouter } from "vue-router";

// Vue Router 인스턴스를 사용합니다.
const router = useRouter();

// 반응형 데이터로 입력 필드 값을 관리합니다.
const title = ref("");
const content = ref("");

const userId = ref("");
onMounted(() => {
  // 로컬 스토리지에서 userId 값을 가져옵니다.
  userId.value = localStorage.getItem("userId");
});

// 게시글 등록 함수
const writeArticle = () => {
  // 수정된 주소 - 예시로 localhost를 사용합니다. 실제 주소로 변경해주세요.
  const addr = "/api/board/regist";

  axiosInstance
    .post(addr, {
      userId: userId.value,
      title: title.value,
      content: content.value,
    })
    .then((response) => {
      // 수정된 axios.get 호출
      console.log(response.data.boardList[0].boardId);
      const boardId = response.data.boardList[0].boardId;
      axiosInstance.get(`/api/board/${boardId}`).then((response) => {
        console.log("글작성 후 확인!!");
        console.log(response);
        moveList();
      });
    })
    .catch((error) => console.error("게시글 등록 에러:", error));
};

// 글 목록 페이지로 이동하는 함수
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
          <h4 class="title" style="font-size: 25px; font-family: 'neon'">공지 등록하기</h4>
          <br />
          <table>
            <tr>
              <th>제목</th>
              <td><input type="text" v-model="title" /></td>
            </tr>
            <tr>
              <th>작성자</th>
              <td><input type="text" v-model="userId" readonly /></td>
            </tr>
            <tr>
              <th>내용</th>
              <td><textarea v-model="content" rows="7" cols="80"></textarea></td>
            </tr>
          </table>
          <div>
            <br />
            <!-- 등록 버튼에 writeArticle 함수를 연결합니다. -->
            <button @click="writeArticle" style="font-size: 17px; float: right; margin-right: 10px; cursor: pointer">
              등록하기
            </button>
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
