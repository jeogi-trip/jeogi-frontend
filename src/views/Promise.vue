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
      <h2>좌표 클릭, 생성</h2>
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
