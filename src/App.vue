<script setup>
import Main from "@/views/Main.vue";
import Header from "@/views/Header.vue";
import Footer from "@/views/Footer.vue";
</script>

<template>
  <Header />
  <hr />
  <router-view></router-view>
  <hr />
  <Footer />
</template>

<style scoped></style>

<style>
@import "./assets/css/bootstrap.min.css";
@import "./assets/css/line-icons.css";
@import "./assets/css/owl.carousel.min.css";
@import "./assets/css/owl.theme.default.css";
@import "./assets/css/slicknav.min.css";
@import "./assets/css/animate.css";
@import "./assets/css/main.css";
@import "./assets/css/responsive.css";

@font-face {
  font-family: "neon";
  src: url("@/Jalnan2TTF.ttf") format("truetype");
}

* {
  font-family: "neon";
}
/* @import "./assets/css/colors/cyan.css";
@import "./assets/css/color-switcher.css"; */
</style>
