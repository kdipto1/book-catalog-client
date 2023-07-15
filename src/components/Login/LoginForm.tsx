/* eslint-disable @typescript-eslint/no-misused-promises */
import React from "react";
import { useForm } from "react-hook-form";
import { useUserLoginMutation } from "../../redux/features/user/userApi";

interface LoginFormValues {
  email: string;
  password: string;
}

export default function LoginForm() {
  const { register, handleSubmit } = useForm<LoginFormValues>();
  const [login, { isLoading, isError }] = useUserLoginMutation();

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
            {...register("email")}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            className="input input-bordered input-info w-full max-w-xs"
            type="password"
            {...register("password")}
          />
        </div>
        <button className="btn btn-accent" type="submit" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Log in"}
        </button>
        {isError && <div>Error occurred while logging in</div>}
      </form>
    </div>
  );
}
