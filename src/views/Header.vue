<script setup>
import { ref, onMounted, computed } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";
import axiosInstance from "@/api/axiosInstance";

const router = useRouter();
const authStore = useAuthStore();

const isAuthenticated = computed(() => authStore.isAuthenticated);

const performLogout = () => {
  authStore.logout(); // 로그아웃 액션 호출
  alert("로그아웃 되었습니다."); // 사용자에게 알림
  router.replace("/");
};

// 사용자 이름을 저장할 상태
const userName = ref("");

// 사용자 정보를 가져오는 함수
const fetchUserInfo = async () => {
  const userId = localStorage.getItem("userId"); // localStorage에서 사용자 ID 가져오기
  if (userId) {
    try {
      const response = await axiosInstance.get(`/api/user/${userId}`);
      userName.value = response.data.name; // API 응답으로부터 사용자 이름 설정
    } catch (error) {
      console.error("사용자 정보를 가져오는 데 실패했습니다:", error);
    }
  }
};

// 컴포넌트가 마운트되었을 때 사용자 정보를 가져옴
onMounted(() => {
  fetchUserInfo();
});
</script>
<template>
  <div>
    <header id="home" class="hero-area">
      <!-- Navbar Start -->
      <nav class="navbar navbar-expand-lg fixed-top scrolling-navbar top-nav-collapse">
        <div class="container">
          <div class="theme-header clearfix">
            <!-- Brand and toggle get grouped for better mobile display -->
            <div class="navbar-header">
              <button
                class="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#main-navbar"
                aria-controls="main-navbar"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span class="navbar-toggler-icon"></span>
                <span class="lni-menu"></span>
                <span class="lni-menu"></span>
                <span class="lni-menu"></span>
              </button>
              <RouterLink to="/" class="navbar-brand">
                <img src="../assets/img/logo.png" style="height: 40px; width: 130px" alt="로고" />
              </RouterLink>
            </div>
            <div class="collapse navbar-collapse" id="main-navbar">
              <ul class="navbar-nav mr-auto w-100 justify-content-end">
                <!-- <li v-if="isAuthenticated" class="nav-item">
                  <a class="nav-link">{{ userName }}님 환영합니다~</a>
                </li> -->
                <li class="nav-item" style="margin-left: 100px" :class="{ active: $route.path === '/' }">
                  <RouterLink class="nav-link" to="/">홈</RouterLink>
                </li>
                <li class="nav-item" :class="{ active: $route.path === '/notice' }">
                  <RouterLink class="nav-link" to="/notice">공지사항</RouterLink>
                </li>
                <li class="nav-item" :class="{ active: $route.path === '/board' }">
                  <RouterLink class="nav-link" to="/board">자유게시판</RouterLink>
                </li>

                <li class="nav-item dropdown" :class="{ active: $route.path === '/promise' }">
                  <RouterLink
                    class="nav-link dropdown-toggle"
                    href="#"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                    to="/promise"
                  >
                    추가기능
                  </RouterLink>
                </li>
                <li v-if="isAuthenticated" class="nav-item dropdown">
                  <a
                    class="nav-link dropdown-toggle"
                    href="#"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                    style="font-size: 17px"
                  >
                    {{ userName }}님 환영합니다~
                  </a>
                  <ul class="dropdown-menu">
                    <li v-if="isAuthenticated" class="nav-item" :class="{ active: $route.path === '/mypage' }">
                      <RouterLink class="nav-link" to="/mypage">마이페이지</RouterLink>
                    </li>
                    <li v-if="isAuthenticated" class="nav-item">
                      <!-- <RouterLink class="nav-link" @click="performLogout">로그아웃</RouterLink> -->
                      <a class="nav-link" @click.prevent="performLogout">로그아웃</a>
                    </li>
                  </ul>
                </li>
                <li v-if="!isAuthenticated" class="nav-item" :class="{ active: $route.path === '/login' }">
                  <RouterLink class="nav-link" to="/login">로그인</RouterLink>
                </li>
                <li v-if="!isAuthenticated" class="nav-item" :class="{ active: $route.path === '/regist' }">
                  <RouterLink class="nav-link" to="/regist">회원가입</RouterLink>
                </li>

                <!-- <li class="button-group">
                  <a href="login.html" class="button btn btn-common" style="margin-right: 5px">로그인</a>
                </li> -->
              </ul>
            </div>
          </div>
        </div>
        <!-- <div class="mobile-menu" data-logo="../assets/img/logo-mobile.png">
          <div class="slicknav_menu">
            <div class="slicknav_brand">
              <a href="index.html"><img src="../assets/img/logo-mobile.png" class="img-responsive" alt="logo" /></a>
            </div>
            <a
              href="#"
              aria-haspopup="true"
              role="button"
              tabindex="0"
              class="slicknav_btn slicknav_collapsed"
              style="outline: none"
              ><span class="slicknav_menutxt"></span
              ><span class="slicknav_icon slicknav_no-text"
                ><span class="slicknav_icon-bar"></span><span class="slicknav_icon-bar"></span
                ><span class="slicknav_icon-bar"></span></span
            ></a>
            <div class="slicknav_nav slicknav_hidden" aria-hidden="true" role="menu" style="display: none">
              <ul class="navbar-nav mr-auto w-100 justify-content-end">
                <li class="nav-item active">
                  <a class="nav-link" href="index.html" role="menuitem"> Home </a>
                </li>
                <li class="nav-item dropdown slicknav_collapsed slicknav_parent">
                  <a
                    href="#"
                    role="menuitem"
                    aria-haspopup="true"
                    tabindex="-1"
                    class="slicknav_item slicknav_row"
                    style="outline: none"
                  >
                    <a
                      class="nav-link dropdown-toggle"
                      href="#"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      Pages
                    </a>
                    <span class="slicknav_arrow"
                      ><i class="lni-chevron-right"><i></i></i></span
                  ></a>
                  <ul class="dropdown-menu slicknav_hidden" role="menu" aria-hidden="true" style="display: none">
                    <li>
                      <a class="dropdown-item" href="about.html" role="menuitem" tabindex="-1">About</a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="job-page.html" role="menuitem" tabindex="-1">Job Page</a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="job-details.html" role="menuitem" tabindex="-1">Job Details</a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="resume.html" role="menuitem" tabindex="-1">Resume Page</a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="privacy-policy.html" role="menuitem" tabindex="-1"
                        >Privacy Policy</a
                      >
                    </li>
                    <li>
                      <a class="dropdown-item" href="faq.html" role="menuitem" tabindex="-1">FAQ</a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="pricing.html" role="menuitem" tabindex="-1">Pricing Tables</a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="contact.html" role="menuitem" tabindex="-1">Contact</a>
                    </li>
                  </ul>
                </li>
                <li class="nav-item dropdown slicknav_collapsed slicknav_parent">
                  <a
                    href="#"
                    role="menuitem"
                    aria-haspopup="true"
                    tabindex="-1"
                    class="slicknav_item slicknav_row"
                    style="outline: none"
                  >
                    <a
                      class="nav-link dropdown-toggle"
                      href="#"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      Candidates
                    </a>
                    <span class="slicknav_arrow"
                      ><i class="lni-chevron-right"><i></i></i></span
                  ></a>
                  <ul class="dropdown-menu slicknav_hidden" role="menu" aria-hidden="true" style="display: none">
                    <li>
                      <a class="dropdown-item" href="browse-jobs.html" role="menuitem" tabindex="-1">Browse Jobs</a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="browse-categories.html" role="menuitem" tabindex="-1"
                        >Browse Categories</a
                      >
                    </li>
                    <li>
                      <a class="dropdown-item" href="add-resume.html" role="menuitem" tabindex="-1">Add Resume</a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="manage-resumes.html" role="menuitem" tabindex="-1"
                        >Manage Resumes</a
                      >
                    </li>
                    <li>
                      <a class="dropdown-item" href="job-alerts.html" role="menuitem" tabindex="-1">Job Alerts</a>
                    </li>
                  </ul>
                </li>
                <li class="nav-item dropdown slicknav_collapsed slicknav_parent">
                  <a
                    href="#"
                    role="menuitem"
                    aria-haspopup="true"
                    tabindex="-1"
                    class="slicknav_item slicknav_row"
                    style="outline: none"
                  >
                    <a
                      class="nav-link dropdown-toggle"
                      href="#"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      Employers
                    </a>
                    <span class="slicknav_arrow"
                      ><i class="lni-chevron-right"><i></i></i></span
                  ></a>
                  <ul class="dropdown-menu slicknav_hidden" role="menu" aria-hidden="true" style="display: none">
                    <li>
                      <a class="dropdown-item" href="post-job.html" role="menuitem" tabindex="-1">Add Job</a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="manage-jobs.html" role="menuitem" tabindex="-1">Manage Jobs</a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="manage-applications.html" role="menuitem" tabindex="-1"
                        >Manage Applications</a
                      >
                    </li>
                    <li>
                      <a class="dropdown-item" href="browse-resumes.html" role="menuitem" tabindex="-1"
                        >Browse Resumes</a
                      >
                    </li>
                  </ul>
                </li>
                <li class="nav-item dropdown slicknav_collapsed slicknav_parent">
                  <a
                    href="#"
                    role="menuitem"
                    aria-haspopup="true"
                    tabindex="-1"
                    class="slicknav_item slicknav_row"
                    style="outline: none"
                  >
                    <a
                      class="nav-link dropdown-toggle"
                      href="#"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      Blog
                    </a>
                    <span class="slicknav_arrow"
                      ><i class="lni-chevron-right"><i></i></i></span
                  ></a>
                  <ul class="dropdown-menu slicknav_hidden" role="menu" aria-hidden="true" style="display: none">
                    <li>
                      <a class="dropdown-item" href="blog.html" role="menuitem" tabindex="-1">Blog - Right Sidebar</a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="blog-left-sidebar.html" role="menuitem" tabindex="-1"
                        >Blog - Left Sidebar</a
                      >
                    </li>
                    <li>
                      <a class="dropdown-item" href="blog-full-width.html" role="menuitem" tabindex="-1">
                        Blog full width</a
                      >
                    </li>
                    <li>
                      <a class="dropdown-item" href="single-post.html" role="menuitem" tabindex="-1"
                        >Blog Single Post</a
                      >
                    </li>
                  </ul>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="contact.html" role="menuitem"> Contact </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="login.html" role="menuitem">Sign In</a>
                </li>
                <li class="button-group">
                  <a href="post-job.html" class="button btn btn-common" role="menuitem">Post a Job</a>
                </li>
              </ul>
            </div>
          </div>
        </div> -->
      </nav>
      <!-- Navbar End -->
    </header>
  </div>
</template>
<style scoped>
* {
  font-family: "neon";
}

.navbar-nav .nav-item {
  margin-right: -3px; /* 오른쪽 간격을 줄임 */
  margin-left: -3px; /* 왼쪽 간격을 줄임 */
}
</style>
