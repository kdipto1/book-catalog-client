/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-misused-promises */

import { useForm } from "react-hook-form";
import { useUserLoginMutation } from "../../redux/features/user/userApi";
import { SerializedError } from "@reduxjs/toolkit";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { loginUser } from "../../redux/features/user/userSlice";
import { Link, useLocation, useNavigate } from "react-router-dom";

interface LoginFormValues {
  email: string;
  password: string;
}

interface CustomError extends SerializedError {
  data?: {
    message: string;
  };
}

interface ILoginResponse {
  data: {
    accessToken: string;
    userId: string;
  };
  message: string;
  statusCode: number;
  success: string;
}

export default function LoginForm() {
  const { register, handleSubmit } = useForm<LoginFormValues>();
  const [login, { isLoading, isError, error }] = useUserLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location?.state?.path || "/";

  const onSubmit = async (data: LoginFormValues) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const response: ILoginResponse = await login(data).unwrap();

      const userState = {
        accessToken: response.data.accessToken,
        userId: response.data.userId,
      };

      dispatch(loginUser(userState));
      navigate(from, { replace: true });
      console.log("Login successful", response);
    } catch (error) {
      console.error("Login error", error);
    }
  };

  return (
    <div className="mr-auto mt-20">
      <h1 className="text-center font-bold text-4xl pb-4">Login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="pb-2">
          <label>Email</label>
          <input
            className="input input-bordered input-info w-full max-w-xs"
            type="email"
            placeholder="your email"
            {...register("email", { required: "Email is required!" })}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            placeholder="your password"
            className="input input-bordered input-info w-full max-w-xs"
            type="password"
            {...register("password", { required: "Password is required" })}
          />
        </div>
        <div className="text-center pt-4">
          <button className="btn btn-block" type="submit" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Log in"}
          </button>
        </div>
        {isError && error && (
          <div>
            {(error as CustomError)?.data?.message ||
              (error as SerializedError).message}
          </div>
        )}
      </form>
      <p className="pt-2">
        Don't have account!{" "}
        <Link className="font-bold" to="/signup">
          Sign up
        </Link>
      </p>
    </div>
  );
}
