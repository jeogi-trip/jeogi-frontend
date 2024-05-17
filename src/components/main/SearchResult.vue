<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";

import KakaoMap2 from "@/components/map/KakaoMapByResult.vue";

const route = useRoute();
const searchResults = ref([]);
const loading = ref(true);
const error = ref(null);

const fetchSearchResults = async () => {
  const { selectedSido, selectedGugun, selectedCategories } = route.query;
  console.log("check", selectedSido, selectedGugun, selectedCategories);

  try {
    // 모든 검색 결과를 저장할 배열 초기화
    let allSearchResults = [];

    // selectedCategories 배열의 각 항목에 대해 요청을 반복
    for (let categoryId of selectedCategories) {
      const response = await axios.get("http://localhost/api/attraction/list/search", {
        params: {
          sidoCode: selectedSido,
          gugunCode: selectedGugun,
          contentTypeId: categoryId,
        },
      });

      // 각 요청의 응답을 allSearchResults 배열에 추가
      allSearchResults.push(...response.data);
    }

    console.log(allSearchResults);
    // 모든 요청의 결과를 searchResults.value에 저장
    searchResults.value = allSearchResults;
  } catch (err) {
    error.value = err;
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchSearchResults();
});
</script>

<template>
  <div class="search-results">
    <br />
    <h2>검색 결과</h2>
    <div v-if="loading">로딩 중...</div>
    <div v-if="error">에러 발생: {{ error.message }}</div>
    <!-- <ul v-if="!loading && !error">
      <li v-for="result in searchResults" :key="result.title">
        {{ result.title }}{{ result.addr1 }}{{ result.firstImage }} {{ result.latitude }} {{ result.longitude }}
      </li>
    </ul> -->
  </div>
  <KakaoMap2 :searchResults="searchResults" />
</template>

<style scoped>
* {
  font-family: "neon";
}
</style>
