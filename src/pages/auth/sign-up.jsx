import { AuthRegister } from "@/services/auth.service";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


export function SignUp() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  });

  const validate = () => {
    const newErrors = {
      firstName: form.firstName ? "" : "First name is required",
      lastName: form.lastName ? "" : "Last name is required",
      username: form.username ? "" : "Username is required",
      email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) ? "" : "Invalid email",
      password: form.password.length >= 6 ? "" : "Password must be at least 6 characters",
    };
    setErrors(newErrors);

    // true nếu không có lỗi
    return Object.values(newErrors).every((e) => e === "");
  };

  const handleRegister = async () => {
    if (validate()) {
      try {
        let response = await AuthRegister(form);
        if(response && +response.code === 201) {
          toast.success(response.message);
        }else {
          toast.error(response.message || "Registration failed");
        }
      } catch (error) {
        toast.error(error.message || "An error occurred during registration");
      }
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <section className="m-8 flex">
            <div className="w-2/5 h-full hidden lg:block">
        <img
          src="/img/pattern.png"
          className="h-full w-full object-cover rounded-3xl"
        />
      </div>
      <div className="w-full lg:w-3/5 flex flex-col items-center justify-center">
        <div className="text-center">
          <Typography variant="h2" className="font-bold mb-4">Join Us Today</Typography>
          <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">Enter your email and password to register.</Typography>
        </div>

        <form
          className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2"
          onSubmit={(e) => { e.preventDefault(); handleRegister(); }}
        >
          {/** First Name */}
          <div className="mb-1 mt-5 flex flex-col gap-2">
            <Typography variant="small" color="blue-gray" className="-mb-1 font-medium">
              First Name
            </Typography>
            <Input
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              placeholder="Kamado"
              size="lg"
              error={!!errors.firstName}
            />
            {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
          </div>

          {/** Last Name */}
          <div className="mb-1 mt-5 flex flex-col gap-2">
            <Typography variant="small" color="blue-gray" className="-mb-1 font-medium">
              Last Name
            </Typography>
            <Input
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              placeholder="Tanjiro"
              size="lg"
            />
            {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
          </div>

          {/** Username */}
          <div className="mb-1 mt-5 flex flex-col gap-2">
            <Typography variant="small" color="blue-gray" className="-mb-1 font-medium">
              Username
            </Typography>
            <Input
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="tanjiro123"
              size="lg"
            />
            {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
          </div>

          {/** Email */}
          <div className="mb-1 mt-5 flex flex-col gap-2">
            <Typography variant="small" color="blue-gray" className="-mb-1 font-medium">
              Email
            </Typography>
            <Input
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="tanjiro123@gmail.com"
              size="lg"
              type="email"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          {/** Password */}
          <div className="mb-1 mt-5 flex flex-col gap-2">
            <Typography variant="small" color="blue-gray" className="-mb-1 font-medium">
              Password
            </Typography>
            <Input
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="********"
              type="password"
              size="lg"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>

          <Button type="submit" className="mt-6" fullWidth>
            Register Now
          </Button>

          <Typography variant="paragraph" className="text-center text-blue-gray-500 font-medium mt-4">
            Already have an account?
            <Link to="/auth/sign-in" className="text-gray-900 ml-1">Sign in</Link>
          </Typography>
        </form>

      </div>
    </section>
  );
}

export default SignUp;
