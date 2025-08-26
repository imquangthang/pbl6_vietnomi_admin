import axios from "axios";

// Lấy URL API từ biến môi trường
// const apiUrl = import.meta.env.VITE_API_BASE_URL;

// Tạo một instance Axios riêng
const instance = axios.create({
  baseURL: "http://localhost:5000",
  timeout: 10000,
  // withCredentials: true,
});

// Hàm xử lý lỗi chung cho interceptor
const handleAxiosError = (error: any) => {
  const status = error?.response?.status;
  const message = error?.message;

  switch (status) {
    case 401:
      console.error("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
      window.location.href = "/login";
      break;
    case 403:
      console.error("Bạn không có quyền truy cập tài nguyên này.");
      window.location.href = "/login";
      break;
    default:
      if (message === "Network Error") {
        console.error(
          "🌐 Không thể kết nối tới máy chủ. Kiểm tra mạng hoặc CORS."
        );
      } else if (error.code === "ECONNABORTED") {
        console.error("Hết thời gian kết nối tới máy chủ.");
      } else {
        console.error(`Lỗi: ${message || "Đã xảy ra lỗi không xác định."}`);
      }
      break;
  }

  return Promise.reject(error);
};

// Hàm gắn interceptor cho instance
const applyInterceptors = (axiosInstance: typeof instance) => {
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("jwt");
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  axiosInstance.interceptors.response.use((response) => {
    try {
      return response.data;
    } catch (e) {
      console.error("Lỗi khi đọc response:", e, response);
      throw e;
    }
  }, handleAxiosError);
};

// Áp dụng interceptor vào instance
applyInterceptors(instance);

// Export để dùng trong toàn bộ project
export default instance;
