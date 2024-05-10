<script setup></script>
<template>
  <div>
    <div id="home" class="hero-area">
      <div class="container">
        <div class="row space-100 justify-content-center">
          <div class="col-lg-10 col-md-12 col-xs-12">
            <div class="contents">
              <h2 class="head-title">관광지 검색은 저기어때</h2>
              <p style="font-size: 20px">원하는 관광지의 카테고리를 검색하세요~</p>
              <br />
              <p>by 최강 8팀 원석 태균</p>
              <div class="job-search-form">
                <form>
                  <div class="row justify-content-center">
                    <div class="col-lg-3 col-md-6 col-xs-12">
                      <div class="form-group">
                        <div class="search-category-container">
                          <label class="styled-select">
                            <select>
                              <option value="none">위치(대분류)</option>
                              <option value="none">서울</option>
                              <option value="none">인천</option>
                              <option value="none">대전</option>
                              <option value="none">광주</option>
                              <option value="none">부산</option>
                              <option value="none">울산</option>
                              <option value="none">세종</option>
                              <option value="none">경기</option>
                              <option value="none">강원</option>
                              <option value="none">충북</option>
                              <option value="none">충남</option>
                              <option value="none">전북</option>
                              <option value="none">전남</option>
                              <option value="none">제주</option>
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
                            <select>
                              <option value="none">위치(소분류)</option>
                            </select>
                          </label>
                        </div>
                        <i class="lni-map-marker"></i>
                      </div>
                    </div>
                    <div class="col-lg-3 col-md-6 col-xs-12" style="">
                      <div class="form-group">
                        <div class="search-category-container">
                          <label class="styled-select">
                            <select>
                              <option>카테고리</option>
                              <option>관광지</option>
                              <option>문화시설</option>
                              <option>축제공연행사</option>
                              <option>여행코스</option>
                              <option>레포츠</option>
                              <option>숙박</option>
                              <option>쇼핑</option>
                              <option>음식점</option>
                            </select>
                          </label>
                        </div>
                        <i class="lni-layers"></i>
                      </div>
                    </div>
                    <!-- <div class="col-lg-5 col-md-6 col-xs-12">
                      <div class="form-group">
                        <input class="form-control" type="text" placeholder="검색어를 입력하세요." />
                      </div>
                    </div> -->
                    <div class="col-lg-1 col-md-6 col-xs-12">
                      <button type="submit" class="button">
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
