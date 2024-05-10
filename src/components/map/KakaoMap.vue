<script>
export default {
  name: "KakaoMap",
  data() {
    return {
      map: null,
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
        center: new window.kakao.maps.LatLng(33.450701, 126.570667),
        level: 3,
      };
      this.map = new window.kakao.maps.Map(container, options);
      this.loadMarker();
    },
    // 지정한 위치에 마커 불러오기
    loadMarker() {
      const markerPosition = new window.kakao.maps.LatLng(33.450701, 126.570667);
      const marker = new window.kakao.maps.Marker({
        position: markerPosition,
      });

      marker.setMap(this.map);
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
