<script setup>
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import axiosInstance from "@/api/axiosInstance";

const router = useRouter();

// 대분류, 소분류, 카테고리 ref 생성
const selectedSido = ref("none");
const selectedGugun = ref("none");
const selectedCategory = ref("none");

// 소분류 데이터 배열을 위한 ref 생성
const guguns = ref([]);

// 카테고리 데이터 배열을 위한 ref 생성
const selectedCategories = ref([]);

// 대분류 선택 상태가 변경될 때 실행될 함수
watch(selectedSido, async (newSido) => {
  if (newSido === "none") {
    guguns.value = []; // 소분류 데이터 배열을 비움
    selectedGugun.value = "none";
  } else {
    try {
      const response = await axiosInstance.get(`/api/attraction/sido/${newSido}`);
      console.log(response);
      guguns.value = response.data; // 응답 데이터를 소분류 데이터 배열에 할당
    } catch (error) {
      console.error("소분류 데이터를 가져오는 데 실패했습니다.", error);
    }
  }
});

const search = () => {
  console.log("대분류:", selectedSido.value, "소분류:", selectedGugun.value, "카테고리:", selectedCategories.value);

  router.push({
    path: "/result",
    query: {
      selectedSido: selectedSido.value,
      selectedGugun: selectedGugun.value,
      selectedCategories: selectedCategories.value,
    },
  });
};
</script>
<template>
  <div>
    <div id="home" class="hero-area">
      <div class="container">
        <div class="row space-100 justify-content-center">
          <div class="col-lg-10 col-md-12 col-xs-12">
            <div class="contents">
              <h2 class="head-title" style="font-size: 40px">여기말고 저기어때</h2>
              <p style="font-size: 20px">원하는 관광지의 카테고리를 검색하세요~</p>
              <br />
              <p>by 최강 1팀 원석 태균</p>
              <div class="job-search-form">
                <form @submit.prevent="search">
                  <div class="row justify-content-center">
                    <div class="col-lg-3 col-md-6 col-xs-12">
                      <div class="form-group">
                        <div class="search-category-container">
                          <label class="styled-select">
                            <select v-model="selectedSido">
                              <option value="none">위치(대분류)</option>
                              <option value="1">서울</option>
                              <option value="2">인천</option>
                              <option value="3">대전</option>
                              <option value="4">대구</option>
                              <option value="5">광주</option>
                              <option value="6">부산</option>
                              <option value="7">울산</option>
                              <option value="8">세종</option>
                              <option value="31">경기</option>
                              <option value="32">강원</option>
                              <option value="33">충북</option>
                              <option value="34">충남</option>
                              <option value="35">경북</option>
                              <option value="36">경남</option>
                              <option value="37">전북</option>
                              <option value="38">전남</option>
                              <option value="39">제주</option>
                            </select>
                          </label>
                        </div>
                        <i class="lni-map-marker"></i>
                      </div>
                    </div>
                    <div class="col-lg-3 col-md-6 col-xs-12">
                      <div class="form-group">
                        <div class="search-category-container">
                          <label class="styled-select">
                            <select v-model="selectedGugun">
                              <option value="none">위치(소분류)</option>
                              <option v-for="gugun in guguns" :key="gugun.gugunName" :value="gugun.gugunCode">
                                {{ gugun.gugunName }}
                              </option>
                            </select>
                          </label>
                        </div>
                        <i class="lni-map-marker"></i>
                      </div>
                    </div>
                    <div class="col-lg-3 col-md-6 col-xs-12" style="">
                      <div class="form-group">
                        <div class="search-category-container">
                          <fieldset>
                            <label><input type="checkbox" value="12" v-model="selectedCategories" /> 관광지</label
                            >&nbsp;
                            <label><input type="checkbox" value="14" v-model="selectedCategories" /> 문화시설</label
                            ><br />
                            <label><input type="checkbox" value="15" v-model="selectedCategories" /> 축제공연</label
                            >&nbsp;
                            <label><input type="checkbox" value="25" v-model="selectedCategories" /> 여행코스</label
                            ><br />
                            <label><input type="checkbox" value="28" v-model="selectedCategories" /> 레포츠</label
                            >&nbsp; <label><input type="checkbox" value="32" v-model="selectedCategories" /> 숙박</label
                            ><br />
                            <label><input type="checkbox" value="38" v-model="selectedCategories" /> 쇼핑</label>&nbsp;
                            <label><input type="checkbox" value="39" v-model="selectedCategories" /> 음식점</label>
                          </fieldset>
                        </div>
                        <!-- <i class="lni-layers"></i> -->
                      </div>
                    </div>
                    <!-- <div class="col-lg-5 col-md-6 col-xs-12">
                      <div class="form-group">
                        <input class="form-control" type="text" placeholder="검색어를 입력하세요." />
                      </div>
                    </div> -->
                    <div class="col-lg-1 col-md-6 col-xs-12">
                      <button type="submit" class="button row" style="width: 110px">
                        &nbsp;<span>검색</span>&nbsp;
                        <i class="lni-search"></i>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
* {
  font-family: "neon";
}
</style>
