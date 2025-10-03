import axios from "axios";

const URL_API = "https://pbl6-vietnomi-be.onrender.com";

const instance = axios.create({
  baseURL: URL_API,
  timeout: 10000,
});

// Hàm xử lý lỗi từ axios
const handleAxiosError = async (error: any) => {
  const status = error?.response?.status;
  const message = error?.message;
  const originalRequest = error.config;

  switch (status) {
    case 401:
      console.error("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
      originalRequest._retry = true;
      try {
        // Gọi API refresh token
        const refreshResponse: any = await axios.post(
          URL_API + "/auth/refresh",
          { withCredentials: true },
        );

        const newAccessToken = refreshResponse.refreshToken;

        // Lưu token mới (ví dụ localStorage)
        localStorage.setItem("token", newAccessToken);
        let user: any = localStorage.getItem("user");
        if (user) {
          user = JSON.parse(user);
          user.token = newAccessToken;
          localStorage.setItem("user", JSON.stringify(user));
        }

        // Update header cho request cũ
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

        // Retry request cũ với token mới
        return instance(originalRequest);
      } catch (refreshError) {
        // Nếu refresh cũng fail → logout
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/login";
      }
      break;
    case 403:
      console.error("Bạn không có quyền truy cập tài nguyên này.");
      window.location.href = "/login";
      break;
    default:
      if (message === "Network Error") {
        console.error(
          "🌐 Không thể kết nối tới máy chủ. Kiểm tra mạng hoặc CORS.",
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
    (error) => Promise.reject(error),
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
