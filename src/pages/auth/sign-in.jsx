import { AuthLogin } from "@/services/auth.service";
import { useLoading } from "@/widgets/layout/loading-context/LoadingContext";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export function SignIn() {
  const { showLoading, hideLoading } = useLoading();
  let navigate = useNavigate();

  const [valueLogin, setValueLogin] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    showLoading();
    try {
      let response = await AuthLogin(valueLogin, password);

      if (response && +response.code === 200) {
        toast.success(response.message);
        const {
          id,
          first_name,
          last_name,
          username,
          email,
          avatar_url,
          role,
          token,
        } = response.data;

        // Validate name
        const name =
          `${first_name} ${last_name}`.trim() || username || "New User";
        if (!name) {
          throw new Error("Tên người dùng không hợp lệ.");
        }

        try {
          // Store data in Redux and localStorage
          const data = {
            isAuthenticated: true,
            token,
            account: {
              id,
              email,
              username,
              role,
              first_name,
              last_name,
              avatar_url,
            },
          };

          localStorage.setItem("jwt", token);
          localStorage.setItem("user", JSON.stringify(data));
          navigate("/dashboard/home");
          // dispatch(loginUserRedux(data));

          // Navigate based on role
          // switch (role) {
          //   case "admin":
          //     navigate("/admin");
          //     break;
          //   case "teacher":
          //     navigate("/teacher");
          //     break;
          //   case "student":
          //     navigate("/student");
          //     break;
          //   default:
          //     navigate("/");
          //     break;
          // }
        } catch (err) {
          toast.error(`Lỗi Firebase: ${err.message}`);
        }
      } else {
        toast.error(response.message || "Lỗi đăng nhập. Vui lòng thử lại.");
      }
    } catch (err) {
      toast.error(`Lỗi đăng nhập: ${err.message}`);
    } finally {
      hideLoading();
    }

    console.log(auth);
  };

  const handlePressEnter = (event) => {
    if (event.code === "Enter") {
      handleLogin();
    }
  };
  return (
    <section className="mx-8 my-2 flex gap-4">
      <div className="w-full lg:w-3/5">
        <div className="text-center">
          <img
            src="/img/vietnomi_logo.png"
            alt="logo"
            className="mx-auto w-32"
          />
          <Typography variant="h2" className="mb-4 font-bold">
            Sign In
          </Typography>
          <Typography
            variant="paragraph"
            color="blue-gray"
            className="text-lg font-normal"
          >
            Enter your email and password to Sign In.
          </Typography>
        </div>
        <form className="mx-auto mb-2 mt-8 w-80 max-w-screen-lg lg:w-1/2">
          <div className="mb-1 flex flex-col gap-6">
            <Typography
              variant="small"
              color="blue-gray"
              className="-mb-3 font-medium"
            >
              Username
            </Typography>
            <Input
              size="lg"
              placeholder="name@mail.com"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={valueLogin}
              onChange={(e) => setValueLogin(e.target.value)}
            />
            <Typography
              variant="small"
              color="blue-gray"
              className="-mb-3 font-medium"
            >
              Password
            </Typography>
            <Input
              type="password"
              size="lg"
              placeholder="********"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handlePressEnter}
            />
          </div>
          <Button className="mt-6" fullWidth onClick={handleLogin}>
            Sign In
          </Button>

          <div className="mt-6 flex items-center justify-between gap-2">
            <Checkbox
              label="Remember Me"
              className="font-medium text-gray-900"
            />
            <Typography variant="small" className="font-medium text-gray-900">
              <a href="forgot-password">Forgot Password</a>
            </Typography>
          </div>
          <Typography
            variant="paragraph"
            className="mt-4 text-center font-medium text-blue-gray-500"
          >
            Not registered?
            <Link to="/auth/sign-up" className="ml-1 text-gray-900">
              Create account
            </Link>
          </Typography>
        </form>
      </div>
      <div className="hidden h-full w-2/5 lg:block">
        <img
          src="/img/pattern.png"
          className="h-full w-full rounded-3xl object-cover"
        />
      </div>
    </section>
  );
}

export default SignIn;
