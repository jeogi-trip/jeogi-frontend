<script setup>
import { onMounted, ref } from "vue";
import axiosInstance from "@/api/axiosInstance";
const latitude = ref(null);
const longitude = ref(null);

const getCurrentPosition = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        latitude.value = position.coords.latitude;
        longitude.value = position.coords.longitude;
        fetchAttractions(latitude.value, longitude.value);
      },
      (error) => {
        console.error("Error getting position:", error);
      }
    );
  } else {
    console.error("Geolocation is not supported by this browser.");
  }
};

onMounted(() => {
  getCurrentPosition();
});

const scrollLeft = () => {
  const container = document.querySelector(".card-container");
  container.scrollBy({ left: -600, behavior: "smooth" });
};

const scrollRight = () => {
  const container = document.querySelector(".card-container");
  container.scrollBy({ left: 600, behavior: "smooth" });
};

const attractions = ref([]);

const fetchAttractions = (latitude, longitude) => {
  axiosInstance
    .get("/api/attraction/test", {
      params: {
        mapxLat: latitude,
        mapyLon: longitude,
        range: 10,
      },
    })
    .then((response) => {
      attractions.value = response.data;
      console.log(attractions.value);
    })
    .catch((error) => {
      console.error("Attractions fetching error: ", error);
    });
};

const categories = ref({
  12: "관광지",
  14: "문화시설",
  15: "축제공연",
  25: "여행코스",
  28: "레포츠",
  32: "숙박",
  38: "쇼핑",
  39: "음식점",
});

const openNaver = (attraction) => {
  const query = attraction.title.replace(/\s+/g, "");
  window.open(`https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=0&ie=utf8&query=${query}`);
};

const openInsta = (attraction) => {
  const query = attraction.title.replace(/\s+/g, "");
  window.open(`https://www.instagram.com/explore/tags/${query}`);
};
</script>

<template>
  <div>
    <div v-if="latitude && longitude">
      <p style="color: black; font-size: 25px">- 내 주변 관광지 추천</p>
      <p style="margin-left: 10px">현 위치 - 위도: {{ latitude }} / 경도: {{ longitude }}</p>
    </div>
    <div v-else>현 위치 정보 불러오는 중...</div>
  </div>
  <div class="carousel">
    <button class="scroll-btn left" @click="scrollLeft"><</button>
    <div class="card-container">
      <div v-for="attraction in attractions" :key="attraction.title" class="card">
        <img :src="attraction.firstImage" style="width: 180px; height: 150px" alt="Image" />
        <p style="color: black">{{ attraction.title }}</p>
        <div class="row">
          <p style="color: #00bcd4; margin-left: 25px">{{ categories[attraction.contentTypeId] }}</p>
          <img
            src="@/assets/img/naver.png"
            style="width: 10%; margin-left: 5px; cursor: pointer"
            @click="openNaver(attraction)"
          />
          <img
            src="@/assets/img/Instagram.png"
            style="width: 10%; margin-left: 5px; cursor: pointer"
            @click="openInsta(attraction)"
          />
        </div>
        <p style="color: black; font-size: 12px">
          <img src="@/assets/img/pin.png" style="width: 6%" />{{ attraction.addr1 }}
        </p>
      </div>
    </div>
    <button class="scroll-btn right" @click="scrollRight">></button>
  </div>
</template>

<style scoped>
* {
  font-family: "neon";
}

.carousel {
  position: relative;
  overflow: hidden;
}

.card-container {
  display: flex;
  overflow-x: auto;
  scroll-behavior: smooth;
}

.card-container::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera 등을 위한 설정 */
}

.card {
  flex: 0 0 auto;
  width: 200px;
  height: 250px;
  margin-right: 20px;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
}

.scroll-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: #dcdcdc;
  border: none;
  font-size: 17px;
  cursor: pointer;
  z-index: 10;
  width: 33px; /* 버튼의 너비를 늘립니다 */
  height: 33px; /* 버튼의 높이를 늘립니다 */
  border-radius: 20px; /* 버튼의 모서리를 둥글게 만듭니다 (너비와 높이의 절반) */
}

.left {
  left: 0;
}

.right {
  right: 0;
}
</style>
