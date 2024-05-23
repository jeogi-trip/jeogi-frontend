<script setup>
import { ref, watch } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const scrollLeft = () => {
  const container = document.querySelector(".card-container2");
  container.scrollBy({ left: -600, behavior: "smooth" });
};

const scrollRight = () => {
  const container = document.querySelector(".card-container2");
  container.scrollBy({ left: 600, behavior: "smooth" });
};

const selectedSido = ref("none");
const selectedGugun = ref("none");
// 카테고리 데이터 배열을 위한 ref 생성
const selectedCategories = ref([12, 14, 15, 25, 28, 32, 38, 39]);

const search = (sido, gugun) => {
  selectedSido.value = sido;
  selectedGugun.value = gugun;
  console.log("대분류:", selectedSido.value, "소분류:", selectedGugun.value, "카테고리:", selectedCategories.value);

  router.push({
    path: "/result",
    query: {
      selectedSido: selectedSido.value,
      selectedGugun: selectedGugun.value,
      selectedCategories: selectedCategories.value,
    },
  });
  window.scrollTo({ top: 0, behavior: "smooth" });
};
</script>

<template>
  <p style="color: black; font-size: 25px">- 전국 Hot Place</p>
  <div class="carousel">
    <button class="scroll-btn left" @click="scrollLeft"><</button>
    <div class="card-container2">
      <div class="row" style="margin-left: 0px">
        <div class="card" @click="search(39, 4)">
          <img src="@/assets/img/hotplace/jeju.jpeg" alt="관광지 1" />
        </div>
        <p style="text-align: justify; color: black; font-size: 17px">&nbsp;&nbsp;제주도</p>
      </div>
      <div class="row" style="margin-left: 15px">
        <div class="card" @click="search(1, 23)">
          <img src="@/assets/img/hotplace/seoul.jpeg" alt="관광지 2" />
        </div>
        <p style="text-align: justify; color: black; font-size: 17px">&nbsp;&nbsp;서울</p>
      </div>
      <div class="row" style="margin-left: 15px">
        <div class="card" @click="search(6, 12)">
          <img src="@/assets/img/hotplace/busan.jpeg" alt="관광지 3" />
        </div>
        <p style="text-align: justify; color: black; font-size: 17px">&nbsp;&nbsp;부산</p>
      </div>
      <div class="row" style="margin-left: 15px">
        <div class="card" @click="search(32, 1)">
          <img src="@/assets/img/hotplace/gangneung.jpeg" alt="관광지 4" />
        </div>
        <p style="text-align: justify; color: black; font-size: 17px">&nbsp;&nbsp;강릉</p>
      </div>
      <div class="row" style="margin-left: 15px">
        <div class="card" @click="search(2, 6)">
          <img src="@/assets/img/hotplace/incheon.jpeg" alt="관광지 5" />
        </div>
        <p style="text-align: justify; color: black; font-size: 17px">&nbsp;&nbsp;인천</p>
      </div>
      <div class="row" style="margin-left: 15px">
        <div class="card" @click="search(35, 2)">
          <img src="@/assets/img/hotplace/gyeongju.jpeg" alt="관광지 6" />
        </div>
        <p style="text-align: justify; color: black; font-size: 17px">&nbsp;&nbsp;경주</p>
      </div>
      <div class="row" style="margin-left: 15px">
        <div class="card" @click="search(6, 16)">
          <img src="@/assets/img/hotplace/haeundae.jpeg" alt="관광지 7" />
        </div>
        <p style="text-align: justify; color: black; font-size: 17px">&nbsp;&nbsp;해운대</p>
      </div>
      <div class="row" style="margin-left: 15px">
        <div class="card" @click="search(31, 1)">
          <img src="@/assets/img/hotplace/gapyeong.jpeg" alt="관광지 8" />
        </div>
        <p style="text-align: justify; color: black; font-size: 17px">&nbsp;&nbsp;가평</p>
      </div>
      <div class="row" style="margin-left: 15px">
        <div class="card" @click="search(38, 13)">
          <img src="@/assets/img/hotplace/yeosu.jpeg" alt="관광지 9" />
        </div>
        <p style="text-align: justify; color: black; font-size: 17px">&nbsp;&nbsp;여수</p>
      </div>
      <div class="row" style="margin-left: 15px">
        <div class="card" @click="search(32, 5)">
          <img src="@/assets/img/hotplace/sokcho.jpeg" alt="관광지 10" />
        </div>
        <p style="text-align: justify; color: black; font-size: 17px">&nbsp;&nbsp;속초</p>
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

.card-container2 {
  display: flex;
  overflow-x: auto;
  scroll-behavior: smooth;
}

.card-container2::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera 등을 위한 설정 */
}

.card {
  flex: 0 0 auto;
  width: 200px;
  height: 200px;
  margin-right: 20px;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  overflow: hidden;
}

.card img {
  width: 100%;
  height: auto;
  object-fit: cover; /* 이미지의 상단 모서리를 둥글게 */
}

.card p {
  margin: 10px 0 0 0; /* 텍스트의 위쪽 마진을 조정 */
  text-align: center; /* 텍스트를 중앙 정렬 */
}

.card-container2 p {
  width: 200px;
  text-align: center;
  margin: 0 20px 20px 0; /* 카드와 텍스트 사이의 간격 조정 */
}

.scroll-btn {
  position: absolute;
  top: 45%;
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
