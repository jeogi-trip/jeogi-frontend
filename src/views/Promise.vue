<script>
import KakaoMap from "@/components/map/KakaoMap.vue";
import axiosInstance from "@/api/axiosInstance";

export default {
  name: "App",
  components: {
    KakaoMap,
  },
  data() {
    return {
      coordinates: [],
      averageLat: null,
      averageLng: null,
      centerMarker: null,
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
  methods: {
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
    addMarker() {
      const center = this.$refs.kakaoMap.map.getCenter();
      this.$refs.kakaoMap.addMarker(new window.kakao.maps.LatLng(center.getLat(), center.getLng()));

      const newCoordinate = {
        latitude: center.getLat(), // 중심 위도
        longitude: center.getLng(), // 중심 경도
      };
      this.coordinates.push(newCoordinate);
      console.log(this.coordinates);
    },
    removeMarker(index) {
      this.$refs.kakaoMap.removeMarker(index); // 인덱스를 전달
      this.coordinates.splice(index, 1);
      console.log(this.coordinates);
    },
    handleMarkerPositionUpdate(payload) {
      // 드래그된 마커의 인덱스와 새 위치를 받음
      const { index, latitude, longitude } = payload;
      if (this.coordinates.length > 0 && this.coordinates[index]) {
        const coordinate = this.coordinates[index];
        coordinate.latitude = latitude;
        coordinate.longitude = longitude;
        this.coordinates.splice(index, 1, coordinate);
        console.log(index + 1, "드래그", this.coordinates);
      }
    },

    centerMapOnAverage() {
      if (this.coordinates.length === 0) {
        return; // 좌표가 없으면 아무것도 하지 않음
      }

      // 이전에 생성된 중심 좌표의 마커가 있으면 제거
      if (this.centerMarker) {
        this.centerMarker.setMap(null); // 지도에서 마커 제거
        this.centerMarker = null; // 참조 초기화
      }

      let totalLat = 0;
      let totalLng = 0;

      this.coordinates.forEach((coordinate) => {
        totalLat += coordinate.latitude;
        totalLng += coordinate.longitude;
      });

      this.averageLat = totalLat / this.coordinates.length;
      this.averageLng = totalLng / this.coordinates.length;

      // 지도의 중심을 평균 좌표로 이동
      const center = new window.kakao.maps.LatLng(this.averageLat, this.averageLng);
      this.$refs.kakaoMap.map.setCenter(center);

      // 다른 이미지의 마커를 추가하기 위한 마커 이미지 정보
      // const imageSrc = "https://ifh.cc/g/6gWFKz.png"; // 마커 이미지의 주소입니다
      const imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
      const imageSize = new window.kakao.maps.Size(24, 35); // 마커 이미지의 크기입니다
      const imageOption = { offset: new window.kakao.maps.Point(11, 32) }; // 마커 이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

      // 마커의 이미지 정보를 가지고 있는 마커 이미지를 생성합니다
      const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);
      const markerPosition = center; // 마커가 표시될 위치입니다 (평균 좌표)

      // 마커를 생성합니다
      this.centerMarker = new window.kakao.maps.Marker({
        position: markerPosition,
        image: markerImage, // 마커 이미지 설정
      });

      // 여기에 클릭 이벤트 리스너를 추가합니다.
      window.kakao.maps.event.addListener(this.centerMarker, "click", () => {
        console.log("주변 관광지 조회");
        const lat = this.averageLat.toFixed(6);
        const lng = this.averageLng.toFixed(6);
        console.log(lat, lng);

        axiosInstance
          .get("/api/attraction/test", {
            params: {
              mapxLat: lat,
              mapyLon: lng,
              range: 10,
            },
          })
          .then((response) => {
            console.log("추천 관광지 데이터:", response.data);

            const attractions = response.data;
            attractions.forEach((attraction) => {
              const markerPosition = new kakao.maps.LatLng(attraction.latitude, attraction.longitude);

              // 마커 이미지 설정
              let markerImageUrl = "";
              switch (attraction.contentTypeId) {
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

              // 마커 이미지 생성
              const markerImage = new kakao.maps.MarkerImage(
                markerImageUrl,
                new kakao.maps.Size(30, 30) // 마커 이미지 크기
              );

              // 마커 생성
              const marker = new kakao.maps.Marker({
                position: markerPosition,
                image: markerImage,
                map: this.$refs.kakaoMap.map,
              });

              // 커스텀 오버레이에 표시될 내용
              const content = `<div class="customOverlay" style="padding:5px; color: black; background-color: white; border: 1px solid blue; font-size:12px;">${attraction.title}</div>`;

              // 커스텀 오버레이 생성
              const customOverlay = new window.kakao.maps.CustomOverlay({
                position: markerPosition,
                content: content,
                yAnchor: 0, // 커스텀 오버레이가 표시될 Y 위치 조정 (기본값은 0.5)
              });
              customOverlay.setMap(this.$refs.kakaoMap.map);

              // 마커에 클릭 이벤트 추가 (선택 사항)
              kakao.maps.event.addListener(marker, "click", () => {
                this.modalContent = { ...attraction };
                this.fetchAttractionDetails(attraction.contentId);
                this.showModal = true; // 모달창 표시
              });
            });
          })
          .catch((error) => {
            console.error("데이터 가져오기 실패:", error);
          });
      });

      // 마커가 지도 위에 표시되도록 설정합니다
      this.centerMarker.setMap(this.$refs.kakaoMap.map);
    },
  },
};
</script>

<template>
  <br />
  <div class="container">
    <div class="search-view">
      <p style="color: black; font-size: 30px; margin-top: 10px; font-family: 'neon'">약속잡기!</p>
      <p style="color: black; font-family: 'neon'">어디서 만날지 모르겠다면?!</p>
      <p style="color: black; font-size: 20px; margin-top: 10px; font-family: 'neon'">좌표를 생성해주세요</p>
      <button @click="addMarker" style="font-size: 15px">좌표 추가</button>
      <hr style="margin: 0px" />
      <ul>
        <li v-for="(coordinate, index) in coordinates" :key="index">
          좌표 {{ index + 1 }} &nbsp;<button style="font-size: 15px" @click="removeMarker(index)">삭제</button><br />
          위도 {{ coordinate.latitude.toFixed(6) }}, 경도 {{ coordinate.longitude.toFixed(6) }}
        </li>
        <hr style="margin: 0px" />
      </ul>

      <button @click="centerMapOnAverage" style="font-size: 15px">가운데로 모여라!</button>
      <p style="font-family: 'neon'" v-if="averageLat && averageLng">
        <!-- 평균 위도: {{ averageLat.toFixed(6) }}<br />
        평균 경도: {{ averageLng.toFixed(6) }}<br /> -->
        <p style="color: black">
          노란 별 마커를 클릭하면<br />
        주변 관광지를 확인할 수 있어요!
        </p>
      </p>
    </div>
    <KakaoMap class="kakao-map" ref="kakaoMap" @updateMarkerPosition="handleMarkerPositionUpdate" />
  </div>
  <div v-if="showModal" class="modal">
    <div class="modal-content">
      <span class="close" @click="showModal = false">&times;</span>
      <p style="font-size: 25px; color: black">{{ modalContent.title }}</p>
      <img :src="modalContent.firstImage" alt="Image" />
      <!-- <p>Content ID: {{ modalContent.contentId }}</p> -->
      <!-- <p>Content Type ID: {{ modalContent.contentTypeId }}</p>
       -->
      <div class="row">
        <p style="color: #00bcd4; margin-left: 15px">{{ categories[modalContent.contentTypeId] }}</p>
        <img src="@/assets/img/naver.png" style="width: 7%; margin-left: 5px; cursor: pointer" @click="openNaver" />
        <img src="@/assets/img/Instagram.png" style="width: 7%; margin-left: 5px; cursor: pointer" @click="openInsta" />
      </div>

      <p style="color: black"><img src="@/assets/img/pin.png" style="width: 5%" />{{ modalContent.addr1 }}</p>
      <br />

      <p style="font-size: 11px; color: black" v-if="modalContent.overview">{{ modalContent.overview }}</p>
    </div>
  </div>
</template>

<style scoped>
* {
  font-family: "neon";
}

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

button {
  font-size: 17px;
  margin-top: 10px;
  margin-right: 10px;
  margin-bottom: 10px;
  color: #00bcd4;
  background-color: rgb(246, 246, 246);
  cursor: pointer;
  border-color: #05defb;
  border-radius: 5px;
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
