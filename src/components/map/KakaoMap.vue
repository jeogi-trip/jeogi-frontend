<script>
export default {
  name: "KakaoMap",
  data() {
    return {
      map: null,
      markers: [],
    };
  },
  setup() {},
  created() {},
  mounted() {
    if (window.kakao && window.kakao.maps) {
      this.loadMap();
    } else {
      this.loadScript();
    }
  },
  unmounted() {},
  methods: {
    // api 불러오기
    loadScript() {
      const script = document.createElement("script");
      script.src = "//dapi.kakao.com/v2/maps/sdk.js?appkey=a4a9c5431b18126885b519eb23158e7a&autoload=false";
      script.onload = () => {
        window.kakao.maps.load(this.loadMap);
      };

      document.head.appendChild(script);
    },
    // 맵 출력하기
    loadMap() {
      const container = document.getElementById("map");
      const options = {
        center: new window.kakao.maps.LatLng(36.355332, 127.298348),
        level: 5,
      };
      this.map = new window.kakao.maps.Map(container, options);
    },

    // 지정한 위치에 마커 불러오기
    loadMarker(position = new window.kakao.maps.LatLng(36.355332, 127.298348)) {
      const marker = new window.kakao.maps.Marker({
        position: position,
      });

      marker.setMap(this.map);
    },

    // 마커 추가
    addMarker(position = new window.kakao.maps.LatLng(36.355332, 127.298348)) {
      const marker = new window.kakao.maps.Marker({
        position: position,
        map: this.map,
        draggable: true, // 마커 드래그 가능하도록 설정
      });

      // 드래그 이벤트 리스너 수정
      window.kakao.maps.event.addListener(marker, "dragend", () => {
        const position = marker.getPosition();
        // 마커의 인덱스를 찾음
        const index = this.markers.indexOf(marker);
        this.$emit("updateMarkerPosition", {
          index: index, // 드래그된 마커의 인덱스를 추가
          latitude: position.getLat(),
          longitude: position.getLng(),
        });
      });

      this.markers.push(marker);
    },
    // 마커 삭제
    removeMarker(index) {
      // 인덱스를 매개변수로 받음
      if (this.markers[index]) {
        this.markers[index].setMap(null); // 해당 인덱스의 마커를 지도에서 제거
        this.markers.splice(index, 1); // 배열에서도 해당 마커를 제거
      }
    },
  },
};
</script>

<template>
  <div>
    <div id="map"></div>
  </div>
</template>

<style scoped>
#map {
  width: 100%;
  height: 700px;
}
</style>
