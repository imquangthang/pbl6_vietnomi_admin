import { AuthLogin } from "@/services/auth.service";
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
  // const dispatch = useDispatch();

  let navigate = useNavigate();

  const [valueLogin, setValueLogin] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    // dispatch(setLoading());
    try {
      // Try backend login
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
              avatar_url
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
        toast.error(response.message ||"Lỗi đăng nhập. Vui lòng thử lại.");
      }
    } catch (err) {
      toast.error(`Lỗi đăng nhập: ${err.message}`);
    } finally {
      // dispatch(setUnLoading());
    }

    console.log(auth);
  };

  const handlePressEnter = (event) => {
    if (event.code === "Enter") {
      handleLogin();
    }
  };
  return (
    <section className="m-8 flex gap-4">
      <div className="w-full lg:w-3/5 mt-24">
        <div className="text-center">
          <Typography variant="h2" className="font-bold mb-4">Sign In</Typography>
          <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">Enter your email and password to Sign In.</Typography>
        </div>
        <form className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2">
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Username
            </Typography>
            <Input
              size="lg"
              placeholder="name@mail.com"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={valueLogin}
              onChange={(e) => setValueLogin(e.target.value)}
            />
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Password
            </Typography>
            <Input
              type="password"
              size="lg"
              placeholder="********"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
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

          <div className="flex items-center justify-between gap-2 mt-6">
            <Checkbox label="Remember Me" className="font-medium text-gray-900"/>
            <Typography variant="small" className="font-medium text-gray-900">
              <a href="#">
                Forgot Password
              </a>
            </Typography>
          </div>
          <Typography variant="paragraph" className="text-center text-blue-gray-500 font-medium mt-4">
            Not registered?
            <Link to="/auth/sign-up" className="text-gray-900 ml-1">Create account</Link>
          </Typography>
        </form>

      </div>
      <div className="w-2/5 h-full hidden lg:block">
        <img
          src="/img/pattern.png"
          className="h-full w-full object-cover rounded-3xl"
        />
      </div>

    </section>
  );
}

export default SignIn;
