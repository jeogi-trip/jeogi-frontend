<script setup>
import { ref } from "vue";
import axiosInstance from "@/api/axiosInstance";
import { useRouter } from "vue-router";

const router = useRouter();
const userId = ref("");
const password = ref("");
const email = ref("");
const name = ref("");
const phone = ref("");
const birth = ref("");

const signUp = async () => {
  const userData = {
    userId: userId.value,
    password: password.value,
    email: email.value,
    name: name.value,
    phone: phone.value,
    birth: birth.value,
  };

  try {
    await axiosInstance.post("/api/auth/sign-up", userData);
    // 회원가입 성공 후 메인 페이지로 이동
    alert("회원가입이 완료되었습니다.");
    router.replace("/login");
  } catch (error) {
    console.error("회원가입 실패:", error);
    // 에러 처리 로직 추가
  }
};
</script>

<template>
  <div class="page-header">
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <div class="inner-header">
            <p style="color: black; font-size: 30px; font-family: 'neon'">회원가입</p>
            <p style="color: black; font-family: 'neon'">저기어때의 회원이 되어주세요 :)</p>
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
            <h3 style="font-family: 'neon'">회원가입</h3>
            <form class="login-form" @submit.prevent="signUp">
              <div class="form-group">
                <div class="input-icon">
                  <i class="lni-user"></i>
                  <input
                    type="text"
                    id="sender-email"
                    class="form-control"
                    name="email"
                    placeholder="아이디를 입력하세요."
                    v-model="userId"
                  />
                </div>
              </div>
              <div class="form-group">
                <div class="input-icon">
                  <i class="lni-lock"></i>
                  <input type="password" class="form-control" placeholder="비밀번호를 입력하세요." v-model="password" />
                </div>
              </div>
              <div class="form-group">
                <div class="input-icon">
                  <i class="lni-lock"></i>
                  <input type="password" class="form-control" placeholder="비밀번호 확인!" />
                </div>
              </div>
              <br />
              <div class="form-group">
                <div class="input-icon">
                  <i class="lni-user"></i>
                  <input type="text" class="form-control" placeholder="이름을 입력하세요." v-model="name" />
                </div>
              </div>
              <div class="form-group">
                <div class="input-icon">
                  <i class="lni-calendar"></i>
                  <input type="date" class="form-control" placeholder="생년월일를 입력하세요." v-model="birth" />
                </div>
              </div>
              <div class="form-group">
                <div class="input-icon">
                  <i class="lni-phone"></i>
                  <input
                    type="tel"
                    class="form-control"
                    placeholder="전화번호를 입력하세요."
                    pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}"
                    title="전화번호 형식: 010-1234-5678"
                    v-model="phone"
                  />
                </div>
              </div>
              <div class="form-group">
                <div class="input-icon">
                  <i class="lni-envelope"></i>
                  <input type="email" class="form-control" placeholder="이메일을 입력하세요." v-model="email" />
                </div>
              </div>

              <button class="btn btn-common log-btn">회원가입</button>
            </form>
            <br />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
