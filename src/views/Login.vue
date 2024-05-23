<script setup>
import { ref, onMounted } from "vue";
import axiosInstance from "@/api/axiosInstance";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const router = useRouter();
const authStore = useAuthStore();

const userId = ref("");
const password = ref("");
const saveId = ref(false);
const showModal = ref(false);

const signIn = async () => {
  try {
    await axiosInstance.post("/api/auth/sign-in", {
      userId: userId.value,
      password: password.value,
      auto: true,
    });
    authStore.login(userId.value);
    await router.replace("/");
    window.location.reload(); // 페이지 새로고침
    if (saveId.value) {
      localStorage.setItem("savedUserId", userId.value);
    } else {
      localStorage.removeItem("savedUserId");
    }
  } catch (error) {
    alert("로그인 실패: " + error.message);
  }
};

onMounted(() => {
  const savedUserId = localStorage.getItem("savedUserId");
  if (savedUserId) {
    userId.value = savedUserId;
    saveId.value = true;
  }
});
</script>

<template>
  <div class="page-header">
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <div class="inner-header">
            <p style="color: black; font-size: 30px; font-family: 'neon'">로그인</p>
            <p style="color: black; font-family: 'neon'">저기어때에 오신 것을 환영합니다 ^_^</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <section id="content" class="section-padding">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-5 col-md-6 col-xs-12">
          <div class="page-login-form box">
            <h3 style="font-family: 'neon'">로그인</h3>
            <form class="login-form">
              <div class="form-group">
                <div class="input-icon">
                  <i class="lni-user"></i>
                  <input
                    v-model="userId"
                    type="text"
                    id="sender-email"
                    class="form-control"
                    name="email"
                    placeholder="아이디를 입력하세요."
                  />
                </div>
              </div>
              <div class="form-group">
                <div class="input-icon">
                  <i class="lni-lock"></i>
                  <input v-model="password" type="password" class="form-control" placeholder="비밀번호를 입력하세요." />
                </div>
              </div>
              <div class="form-group form-check">
                <input type="checkbox" class="form-check-input" id="exampleCheck1" v-model="saveId" />
                <label class="form-check-label" for="exampleCheck1">아이디 저장</label>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span style="color: gray; cursor: pointer" @click="showModal = true">아이디/비밀번호 찾기</span>
                <div v-if="showModal" class="modal-mask" @click="showModal = false">
                  <div class="modal-wrapper" style="color: black" @click.stop>
                    <div class="modal-container">
                      <div class="modal-header">
                        <span>알림</span>
                        <button style="color: gray; cursor: pointer" @click="showModal = false">x</button>
                      </div>
                      <div class="modal-body">
                        <p style="color: black">
                          고객센터에 문의하세요.<br /><br /><i class="lni-user"></i> 김태균 상담원<br /><i
                            class="lni-phone"
                          ></i>
                          010-4677-9695<br /><i class="lni-user"></i> 임원석 상담원<br /><i class="lni-phone"></i>
                          010-8301-4988
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <button @click.prevent="signIn" class="btn btn-common log-btn">로그인</button>
            </form>
            <br />
            <ul class="row form-links justify-content-center">
              <p class="text-center" style="font-family: 'neon'">
                계정이 없으신가요? &nbsp;&nbsp;&nbsp;<router-link to="/regist">회원가입하기</router-link>
              </p>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
* {
  font-family: "neon";
}

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-wrapper {
  background: white;
  padding: 20px;
  border-radius: 10px;
}

.modal-container {
  display: flex;
  flex-direction: column;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
