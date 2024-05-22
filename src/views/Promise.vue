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
    };
  },
  methods: {
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

              // 마커에 클릭 이벤트 추가 (선택 사항)
              kakao.maps.event.addListener(marker, "click", () => {
                alert(`${attraction.title} 클릭됨`); // 예: attraction.name이 관광지 이름이라고 가정
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
        평균 위도: {{ averageLat.toFixed(6) }}<br />
        평균 경도: {{ averageLng.toFixed(6) }}
      </p>
    </div>
    <KakaoMap class="kakao-map" ref="kakaoMap" @updateMarkerPosition="handleMarkerPositionUpdate" />
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
</style>
