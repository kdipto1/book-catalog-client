/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-misused-promises */

import { useForm } from "react-hook-form";
import { useUserLoginMutation } from "../../redux/features/user/userApi";
import { SerializedError } from "@reduxjs/toolkit";

interface LoginFormValues {
  email: string;
  password: string;
}

interface CustomError extends SerializedError {
  data?: {
    message: string;
  };
}

export default function LoginForm() {
  const { register, handleSubmit } = useForm<LoginFormValues>();
  const [login, { isLoading, isError, error }] = useUserLoginMutation();

  const onSubmit = async (data: LoginFormValues) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const response = await login(data).unwrap();
      console.log("Login successful", response);
    } catch (error) {
      console.error("Login error", error);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Email</label>
          <input
            className="input input-bordered input-info w-full max-w-xs"
            type="email"
            {...register("email", { required: "Email is required!" })}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            className="input input-bordered input-info w-full max-w-xs"
            type="password"
            {...register("password", { required: "Password is required" })}
          />
        </div>
        <button className="btn btn-accent" type="submit" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Log in"}
        </button>
        {isError && error && (
          <div>
            {(error as CustomError)?.data?.message ||
              (error as SerializedError).message}
          </div>
        )}
      </form>
    </div>
  );
}
