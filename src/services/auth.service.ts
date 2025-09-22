import instance from "../setup/axios";

const AuthLogin = (username: string, password: string) => {
  return instance.post("/auth/login", {
    username,
    password,
  });
};

const AuthRegister = (form: any) => {
  return instance.post("/auth/register", {
    first_name: form.firstName,
    last_name: form.lastName,
    username: form.username,
    email: form.email,
    password: form.password,
  });
};

const HandleForgotPassword = (email: string) => {
  return instance.post("/auth/forgot-password", {
    email,
  });
};

const HandleVerifyOTP = (email: string, otp: string) => {
  return instance.post("/auth/verify-otp", {
    email,
    otp,
  });
};

const HandleResetPassword = (email: string, newPassword: string) => {
  return instance.post("/auth/reset-password", {
    email,
    newPassword,
  });
};

export {
  AuthLogin,
  AuthRegister,
  HandleForgotPassword,
  HandleVerifyOTP,
  HandleResetPassword,
};
