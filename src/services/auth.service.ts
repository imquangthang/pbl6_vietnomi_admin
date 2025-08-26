import instance from "../setup/axios";

const AuthLogin = (username: string, password: string) => {
  return instance.post("/auth/login", {      
    username,
    password
  });
};

const AuthRegister = (form: any) => {
  return instance.post("/auth/register", {      
    first_name: form.firstName,
    last_name: form.lastName,
    username: form.username,
    email: form.email,
    password: form.password
  });
};


export {AuthLogin, AuthRegister}