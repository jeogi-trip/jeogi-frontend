<script>
import axiosInstance from "@/api/axiosInstance";

export default {
  name: "KakaoMap2",
  props: {
    searchResults: Array,
  },
  data() {
    return {
      map: null,
      markers: [],
      showModal: false, // 모달창 표시 여부
      modalContent: { title: "", firstImage: "", contentId: "", contentTypeId: "", addr1: "", overview: "" }, // 모달창에 표시될 내용
      mapLoaded: false,
      categories: {
        12: "관광지",
        14: "문화시설",
        15: "축제공연",
        25: "여행코스",
        28: "레포츠",
        32: "숙박",
        38: "쇼핑",
        39: "음식점",
      },
    };
  },
  mounted() {
    if (window.kakao && window.kakao.maps) {
      this.loadMap();
    } else {
      this.loadScript();
    }
  },
  watch: {
    searchResults: {
      handler: "loadMarkers",
      immediate: true,
    },
  },
  methods: {
    loadScript() {
      const script = document.createElement("script");
      script.src = "//dapi.kakao.com/v2/maps/sdk.js?appkey=a4a9c5431b18126885b519eb23158e7a&autoload=false";
      script.onload = () => {
        window.kakao.maps.load(() => this.loadMap());
      };
      document.head.appendChild(script);
    },
    loadMap() {
      const container = this.$refs.map; // ref 사용하여 직접 접근
      const options = {
        center: new window.kakao.maps.LatLng(36.355332, 127.298348), // 기본 중심 좌표
        level: 6,
      };
      this.map = new window.kakao.maps.Map(container, options);
      if (window.kakao && window.kakao.maps) {
        this.mapLoaded = true;
        this.loadMarkers(); // 지도가 로딩된 후 마커 로딩
      }
    },

    loadMarkers() {
      if (!this.mapLoaded) {
        // 맵이 로드되지 않았으면 함수 종료
        // console.warn("Kakao Maps is not loaded yet.");
        return;
      }
      let latSum = 0,
        lngSum = 0,
        avgLat,
        avgLng;

      // 기존 마커 제거
      this.markers.forEach((marker) => marker.setMap(null));
      this.markers = [];

      if (this.searchResults && this.searchResults.length > 0) {
        // 새로운 마커 추가
        this.searchResults.forEach((result) => {
          const position = new window.kakao.maps.LatLng(result.latitude, result.longitude);
          this.addMarker(position, result);

          latSum += result.latitude;
          lngSum += result.longitude;
        });

        avgLat = latSum / this.searchResults.length;
        avgLng = lngSum / this.searchResults.length;

        // 지도의 중심을 마커들의 평균 위치로 업데이트
        this.map.setCenter(new window.kakao.maps.LatLng(avgLat, avgLng));
      }
    },
    addMarker(position, result) {
      let markerImageUrl = "";

      // 카테고리에 따라 마커 이미지 설정
      switch (result.contentTypeId) {
        case 12:
          markerImageUrl = "https://ifh.cc/g/wM9f6X.png"; // 관광지
          break;
        case 14:
          markerImageUrl = "https://ifh.cc/g/yt8lkS.png"; // 문화시설
          break;
        case 15:
          markerImageUrl = "https://ifh.cc/g/y6gtDb.png"; // 축제공연
          break;
        case 25:
          markerImageUrl = "https://ifh.cc/g/y6gtDb.png"; // 여행코스
          break;
        case 28:
          markerImageUrl = "https://ifh.cc/g/KkgGRB.png"; // 레포츠
          break;
        case 32:
          markerImageUrl = "https://ifh.cc/g/mkh7rM.png"; // 숙박
          break;
        case 38:
          markerImageUrl = "https://ifh.cc/g/sDFN3X.png"; // 쇼핑
          break;
        case 39:
          markerImageUrl = "https://ifh.cc/g/7kTAJ6.png"; // 음식점
          break;
      }

      const imageSize = new window.kakao.maps.Size(30, 30); // 마커 이미지 크기
      const markerImage = new window.kakao.maps.MarkerImage(markerImageUrl, imageSize);

      const marker = new window.kakao.maps.Marker({
        position: position,
        image: markerImage, // 마커 이미지 설정
      });

      marker.setMap(this.map); // 마커를 지도에 추가

      // 커스텀 오버레이에 표시될 내용
      const content = `<div class="customOverlay" style="padding:5px; color: black; background-color: white; border: 1px solid blue; font-size:12px;">${result.title}</div>`;

      // 커스텀 오버레이 생성
      const customOverlay = new window.kakao.maps.CustomOverlay({
        position: position,
        content: content,
        yAnchor: 0, // 커스텀 오버레이가 표시될 Y 위치 조정 (기본값은 0.5)
      });

      // 마커 위에 커스텀 오버레이를 표시
      customOverlay.setMap(this.map);

      // 마커 클릭 이벤트 리스너 추가
      window.kakao.maps.event.addListener(marker, "click", () => {
        this.modalContent = { ...result }; // 모달창에 표시될 내용 업데이트
        console.log(this.modalContent);
        this.fetchAttractionDetails(result.contentId);
        this.showModal = true; // 모달창 표시
      });

      this.markers.push(marker);
    },

    fetchAttractionDetails(contentId) {
      axiosInstance
        .get(`/api/attraction/list/${contentId}`)
        .then((response) => {
          this.modalContent = { ...this.modalContent, ...response.data }; // 기존 modalContent에 추가 정보를 병합
          console.log(this.modalContent);
        })
        .catch((error) => {
          console.error("There was an error fetching the attraction details:", error);
        });
    },

    openNaver() {
      // modalContent.title의 공백을 제거
      const query = this.modalContent.title.replace(/\s+/g, "");
      // 새 창으로 네이버 검색 결과 페이지 열기
      window.open(`https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=0&ie=utf8&query=${query}`);
    },

    openInsta() {
      // modalContent.title의 공백을 제거
      const query = this.modalContent.title.replace(/\s+/g, "");
      // 새 창으로 네이버 검색 결과 페이지 열기
      window.open(`https://www.instagram.com/explore/tags/${query}`);
    },
  },
};
</script>

<template>
  <div>
    <div id="map" ref="map" style="width: 100%; height: 700px"></div>
  </div>
  <div v-if="showModal" class="modal">
    <div class="modal-content">
      <span class="close" @click="showModal = false">&times;</span>
      <p style="font-size: 25px">{{ modalContent.title }}</p>
      <img :src="modalContent.firstImage" alt="Image" />
      <!-- <p>Content ID: {{ modalContent.contentId }}</p> -->
      <!-- <p>Content Type ID: {{ modalContent.contentTypeId }}</p>
       -->
      <div class="row">
        <p style="color: #00bcd4; margin-left: 15px">{{ categories[modalContent.contentTypeId] }}</p>
        <img src="@/assets/img/naver.png" style="width: 7%; margin-left: 5px; cursor: pointer" @click="openNaver" />
        <img src="@/assets/img/Instagram.png" style="width: 7%; margin-left: 5px; cursor: pointer" @click="openInsta" />
      </div>

      <p><img src="@/assets/img/pin.png" style="width: 5%" />{{ modalContent.addr1 }}</p>
      <br />

      <p style="font-size: 11px" v-if="modalContent.overview">{{ modalContent.overview }}</p>
    </div>
  </div>
</template>

<style scoped>
* {
  font-family: "neon";
}

p {
  color: black;
}
.modal {
  display: block; /* 모달을 화면에 표시 */
  position: fixed; /* 모달을 화면 중앙에 고정 */
  z-index: 1; /* 모달이 다른 요소들 위에 표시되도록 설정 */
  left: 0;
  top: 0;
  width: 100%; /* 전체 너비 */
  height: 100%; /* 전체 높이 */
  overflow: auto; /* 내용이 넘칠 경우 스크롤 가능하도록 설정 */
  background-color: rgb(0, 0, 0); /* 배경색 설정 */
  background-color: rgba(0, 0, 0, 0.4); /* 약간의 투명도를 가진 검은색 */
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto; /* 페이지 중앙에 위치 */
  padding: 20px;
  border: 1px solid #888;
  width: 40%; /* 모달 내용의 너비 */
  max-height: 60%;
  overflow-y: auto;
}

.close {
  color: #aaaaaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
  position: absolute; /* 절대 위치 지정 */
  right: 10px; /* 오른쪽에서 10px 떨어진 곳에 위치 */
  top: 10px; /* 상단에서 10px 떨어진 곳에 위치 */
}

.close:hover,
.close:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}
</style>
