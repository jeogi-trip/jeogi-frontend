<script setup>
import { ref } from "vue";
import axiosInstance from "@/api/axiosInstance";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const router = useRouter();
const authStore = useAuthStore();

const userId = ref("");
const password = ref("");

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
  } catch (error) {
    alert("로그인 실패: " + error.message);
  }
};
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
                <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                <label class="form-check-label" for="exampleCheck1">아이디 저장</label>
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

<style scoped></style>
