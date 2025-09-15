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
      email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
        ? ""
        : "Invalid email",
      password:
        form.password.length >= 6
          ? ""
          : "Password must be at least 6 characters",
    };
    setErrors(newErrors);

    // true nếu không có lỗi
    return Object.values(newErrors).every((e) => e === "");
  };

  const handleRegister = async () => {
    if (validate()) {
      try {
        let response = await AuthRegister(form);
        if (response && +response.code === 201) {
          toast.success(response.message);
        } else {
          toast.error(response.message || "Registration failed");
        }

        // Clear form
        setForm({
          firstName: "",
          lastName: "",
          username: "",
          email: "",
          password: "",
        });
      } catch (error) {
        toast.error(error.message || "An error occurred during registration");
      }
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <section className="mx-8 my-2 flex">
      <div className="hidden h-full w-2/5 lg:block">
        <img
          src="/img/pattern.png"
          className="h-full w-full rounded-3xl object-cover"
        />
      </div>
      <div className="flex w-full flex-col items-center justify-center lg:w-3/5">
        <div className="text-center">
          <div className="flex items-center justify-center">
            <img
              src="/img/vietnomi_logo.png"
              alt="logo"
              className="mx-auto w-32"
            />
            <Typography variant="h2" className="mb-4 font-bold">
              Join Us Today
            </Typography>
          </div>

          <Typography
            variant="paragraph"
            color="blue-gray"
            className="text-lg font-normal"
          >
            Enter your information to register.
          </Typography>
        </div>

        <form
          className="mx-auto mb-2 mt-2 w-80 max-w-screen-lg lg:w-2/3"
          onSubmit={(e) => {
            e.preventDefault();
            handleRegister();
          }}
        >
          <div className="mb-1 flex justify-between gap-1">
            {/** First Name */}
            <div className="mb-1 mt-5 flex w-full flex-col gap-2">
              <Typography
                variant="small"
                color="blue-gray"
                className="-mb-1 font-medium"
              >
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
              {errors.firstName && (
                <p className="text-sm text-red-500">{errors.firstName}</p>
              )}
            </div>

            {/** Last Name */}
            <div className="mb-1 mt-5 flex w-full flex-col gap-2">
              <Typography
                variant="small"
                color="blue-gray"
                className="-mb-1 font-medium"
              >
                Last Name
              </Typography>
              <Input
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                placeholder="Tanjiro"
                size="lg"
              />
              {errors.lastName && (
                <p className="text-sm text-red-500">{errors.lastName}</p>
              )}
            </div>
          </div>

          {/** Username */}
          <div className="mb-1 mt-5 flex flex-col gap-2">
            <Typography
              variant="small"
              color="blue-gray"
              className="-mb-1 font-medium"
            >
              Username
            </Typography>
            <Input
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="tanjiro123"
              size="lg"
            />
            {errors.username && (
              <p className="text-sm text-red-500">{errors.username}</p>
            )}
          </div>

          {/** Email */}
          <div className="mb-1 mt-5 flex flex-col gap-2">
            <Typography
              variant="small"
              color="blue-gray"
              className="-mb-1 font-medium"
            >
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
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          {/** Password */}
          <div className="mb-1 mt-5 flex flex-col gap-2">
            <Typography
              variant="small"
              color="blue-gray"
              className="-mb-1 font-medium"
            >
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
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password}</p>
            )}
          </div>

          <Button type="submit" className="mt-6" fullWidth>
            Register Now
          </Button>

          <Typography
            variant="paragraph"
            className="mt-4 text-center font-medium text-blue-gray-500"
          >
            Already have an account?
            <Link to="/auth/sign-in" className="ml-1 text-gray-900">
              Sign in
            </Link>
          </Typography>
        </form>
      </div>
    </section>
  );
}

export default SignUp;
