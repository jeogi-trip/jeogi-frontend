import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost", // 기본 URL 설정
});

export default axiosInstance;
