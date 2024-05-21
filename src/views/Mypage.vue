<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();
const userId = ref(localStorage.getItem("userId") || "");
const password = ref("");
const email = ref("");
const name = ref("");
const phone = ref("");
const birth = ref("");

const fetchUserInfo = async () => {
  if (!userId.value) {
    alert("사용자 ID가 없습니다. 로그인 페이지로 이동합니다.");
    router.push("/login");
    return;
  }
  try {
    const response = await axios.get(`http://localhost/api/user/${userId.value}`);
    const userInfo = response.data;
    console.log(userInfo);
    email.value = userInfo.email || ""; // 이메일 값이 없으면 빈 문자열로 설정
    name.value = userInfo.name;
    phone.value = userInfo.phone;
    birth.value = userInfo.birth; // 서버에서 'YYYY-MM-DD' 형식으로 반환되어야 합니다.

    // 이메일이 없는 경우 fetchUserInfo2 호출
    if (!email.value) {
      await fetchUserInfo2();
    }
  } catch (error) {
    console.error("사용자 정보를 가져오는 데 실패했습니다.", error);
  }
};

const fetchUserInfo2 = async () => {
  if (!userId.value) {
    alert("사용자 ID가 없습니다. 로그인 페이지로 이동합니다.");
    router.push("/login");
    return;
  }
  try {
    const response = await axios.get("http://localhost/api/user/list");
    const users = response.data;
    console.log(users);

    // 배열인지 확인
    if (Array.isArray(users)) {
      const user = users.find((u) => u.userId === userId.value);
      if (user) {
        email.value = user.email;
      } else {
        console.error("사용자 정보를 찾을 수 없습니다.");
      }
    } else {
      console.error("서버로부터 받은 데이터가 배열이 아닙니다.");
    }
  } catch (error) {
    console.error("사용자 목록을 가져오는 데 실패했습니다.", error);
  }
};

// 사용자 정보 수정 함수
const updateUser = async () => {
  try {
    console.log({
      userId: userId.value,
      password: password.value,
      email: email.value,
      name: name.value,
      phone: phone.value,
      birth: birth.value,
    });

    await axios.put("http://localhost/api/user/", {
      userId: userId.value,
      password: password.value,
      email: email.value,
      name: name.value,
      phone: phone.value,
      birth: birth.value,
    });
    alert("회원 정보가 성공적으로 수정되었습니다.");
    // 수정 성공 후 필요한 로직 추가(예: 페이지 리다이렉션)
  } catch (error) {
    console.error("회원 정보 수정에 실패했습니다.", error);
    alert("회원 정보 수정에 실패했습니다.");
  }
};

onMounted(fetchUserInfo);
</script>

<template>
  <div class="page-header">
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <div class="inner-header">
            <p style="color: black; font-size: 30px; font-family: 'neon'">마이페이지</p>
            <p style="color: black; font-family: 'neon'">회원정보를 변경할 수 있어요~!</p>
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
            <h3 style="font-family: 'neon'">마이페이지</h3>
            <form class="login-form" @submit.prevent="updateUser">
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
                    readonly
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
                  <input
                    type="email"
                    class="form-control"
                    placeholder="이메일을 입력하세요."
                    v-model="email"
                    readonly
                  />
                </div>
              </div>

              <button class="btn btn-common log-btn">회원정보 수정</button>
            </form>
            <br />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
