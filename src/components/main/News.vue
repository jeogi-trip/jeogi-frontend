<script setup>
import { ref, onMounted, onUnmounted } from "vue";

// 뉴스 항목 데이터
const newsItems = ref([
  {
    id: 1,
    text: "국내여행 30% 할인 G마켓, '지역 여행상품 특별할인전' 열어",
    link: "https://www.newsis.com/view/?id=NISX20240522_0002743480&cID=13001&pID=13000",
  },
  { id: 2, text: "한국인 가족 여행객들, 올여름 OO으로 떠난다", link: "https://www.fnnews.com/news/202405220744097239" },
  {
    id: 3,
    text: "'2만~5만원' 숙박할인권 25만장 풀린다…6월 국내여행 가볼까",
    link: "https://view.asiae.co.kr/article/2024052013564206551",
  },
  {
    id: 4,
    text: "코레일관광개발, 여행가는 달 ‘6월엔 여기로’ 진행",
    link: "https://sports.donga.com/article/all/20240522/125049612/2",
  },
  {
    id: 5,
    text: "720억 투자한 해비치 제주···‘제주 여행=쉼’ 패러다임 전환 나선다",
    link: "https://www.khan.co.kr/travel/national/article/202405220947001",
  },
]);

// 현재 보여지고 있는 뉴스 항목의 인덱스
const currentIndex = ref(0);

// 다음 뉴스 항목으로 자동 전환하는 함수
const nextNewsItem = () => {
  currentIndex.value = (currentIndex.value + 1) % newsItems.value.length;
};

// 자동 전환을 위한 interval 설정
let intervalId;
onMounted(() => {
  intervalId = setInterval(nextNewsItem, 3000); // 3초마다 실행
});

// 컴포넌트 언마운트 시 interval 해제
onUnmounted(() => {
  clearInterval(intervalId);
});
</script>

<template>
  <div class="news-container">
    <p style="color: black; font-size: 25px; margin-bottom: 10px">- 오늘의 여행 News</p>
    <transition name="fade" mode="out-in">
      <div :key="newsItems[currentIndex].id">
        <a :href="newsItems[currentIndex].link" target="_blank" style="margin-left: 15px; font-size: 17px">{{
          newsItems[currentIndex].text
        }}</a>
      </div>
    </transition>
  </div>
</template>

<style scoped>
* {
  font-family: "neon";
}

.news-container {
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
