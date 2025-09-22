import {
  HandleForgotPassword,
  HandleResetPassword,
  HandleVerifyOTP,
} from "@/services/auth.service";
import { useLoading } from "@/widgets/layout/loading-context/LoadingContext";
import { Typography } from "@material-tailwind/react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const EnterEmailPage = ({ setStep, email, setEmail }) => {
  const { showLoading, hideLoading } = useLoading();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      toast("Please enter your email.");
      return;
    }

    try {
      showLoading();
      let response = await HandleForgotPassword(email);
      console.log("response: ", response);

      if (response && response.code === 200) {
        toast.success(response.message);
        setStep(2);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Failed to send OTP. Please try again.");
    } finally {
      hideLoading();
      return;
    }
  };

  return (
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <Typography
        variant="paragraph"
        color="blue-gray"
        className="mb-5 text-center text-lg font-normal"
      >
        Enter your email to receive a verification code.
      </Typography>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          id="email"
          autoComplete="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="block w-full rounded-md border bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
        />

        {/* Submit */}
        <button
          type="submit"
          className="shadow-xs flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Continue
        </button>
      </form>
    </div>
  );
};

const EnterCodePage = ({ setStep, email }) => {
  const { showLoading, hideLoading } = useLoading();

  const [arrCode, setArrCode] = useState(new Array(6).fill(""));
  const inputRefs = useRef([]);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    const newCode = [...arrCode];
    newCode[index] = element.value.slice(0, 1);
    setArrCode(newCode);

    if (element.value.length === 1 && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && index > 0 && arrCode[index] === "") {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let code = arrCode.join("");
    setArrCode(new Array(6).fill(""));

    if (code.length < 6) {
      toast.error("OTP is 6 characters");
    }

    switch (code) {
      case "":
        toast.error("OTP is not empty");
        break;
      default:
        try {
          showLoading();
          let response = await HandleVerifyOTP(email, code);
          if (response && response.code === 200) {
            toast.success("Verify OTP successfully");
            setStep(3);
          } else toast.error(response.message);
        } catch (error) {
          toast.error("Verify OTP Failed");
        }
        hideLoading();
        break;
    }
  };

  return (
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <Typography
        variant="paragraph"
        color="blue-gray"
        className="mb-5 text-center text-lg font-normal"
      >
        Enter the 6-digit code sent to your email.
      </Typography>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="flex justify-center space-x-2">
          {arrCode.map((data, index) => (
            <input
              key={index}
              type="tel"
              maxLength="1"
              value={data}
              onChange={(e) => handleChange(e.target, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              ref={(el) => (inputRefs.current[index] = el)}
              className="h-12 w-12 rounded-md border border-gray-300 text-center text-xl font-bold text-gray-900 shadow-sm outline-none transition-all duration-200 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
            />
          ))}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="shadow-xs flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Continue
        </button>
      </form>
    </div>
  );
};

const ResetPasswordPage = ({ email, navigate }) => {
  const { showLoading, hideLoading } = useLoading();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newPassword || !confirmPassword) {
      toast("Please fill in both password fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast("Passwords do not match.");
      return;
    }

    try {
      showLoading();
      let response = await HandleResetPassword(email, newPassword);
      if (response && response.code === 200) {
        toast("Password reset successfully!");
        navigate("/login");
      } else toast("Failed to reset password. Please try again.");
    } catch (error) {
      toast("Failed to reset password. Please try again.");
    } finally {
      hideLoading();
    }
  };

  return (
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <Typography
        variant="paragraph"
        color="blue-gray"
        className="mb-5 text-center text-lg font-normal"
      >
        Enter your new password below.
      </Typography>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <input
          type="password"
          name="new-password"
          id="new-password"
          autoComplete="new-password"
          placeholder="New password"
          minLength={6}
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="block w-full rounded-md border bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
        />

        <input
          type="password"
          name="confirm-password"
          id="confirm-password"
          autoComplete="confirm-password"
          placeholder="Re-enter new password"
          minLength={6}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="block w-full rounded-md border bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
        />

        {/* Submit */}
        <button
          type="submit"
          className="shadow-xs flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Continue
        </button>
      </form>
    </div>
  );
};

export function ForgotPassword() {
  let navigate = useNavigate();

  const [step, setStep] = useState(1); // useState phải đặt trong component
  const [email, setEmail] = useState("");

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
            Forgot Password
          </Typography>
        </div>
        <div>
          {step === 1 ? (
            <EnterEmailPage
              setStep={setStep}
              email={email}
              setEmail={setEmail}
            />
          ) : step === 2 ? (
            <EnterCodePage setStep={setStep} email={email} />
          ) : (
            <ResetPasswordPage email={email} navigate={navigate} />
          )}
        </div>
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

export default ForgotPassword;
