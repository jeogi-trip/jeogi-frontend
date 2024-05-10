<script setup>
import { useRouter } from "vue-router";

const router = useRouter();
const moveMain = () => {
  router.replace("/");
};
</script>

<template>
  <div class="page-header">
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <div class="inner-header">
            <h3 style="font-family: 'neon'">로그인</h3>
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
            <h3>로그인</h3>
            <form class="login-form">
              <div class="form-group">
                <div class="input-icon">
                  <i class="lni-user"></i>
                  <input
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
                  <input type="password" class="form-control" placeholder="비밀번호를 입력하세요." />
                </div>
              </div>
              <div class="form-group form-check">
                <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                <label class="form-check-label" for="exampleCheck1">아이디 저장</label>
              </div>
              <button @click="moveMain" class="btn btn-common log-btn">로그인</button>
            </form>
            <br />
            <ul class="row form-links justify-content-center">
              <p class="text-center" style="font-family: 'neon'">
                계정이 없으신가요? &nbsp;&nbsp;&nbsp;<a href="register.html">회원가입하기</a>
              </p>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
