<script>
import KakaoMap from "@/components/map/KakaoMap.vue";

export default {
  name: "App",
  components: {
    KakaoMap,
  },
};
</script>

<template>
  <br />
  <div class="container">
    <div class="search-view">
      <h3 style="font-family: 'neon'">좌표 클릭과 생성<br />구현 예정</h3>
    </div>
    <KakaoMap class="kakao-map" />
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: row;
}

.search-view {
  flex: 2;
}

.kakao-map {
  flex: 5;
}
</style>
