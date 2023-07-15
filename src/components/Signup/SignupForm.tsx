/* eslint-disable @typescript-eslint/no-misused-promises */
import { SerializedError } from "@reduxjs/toolkit";
import { useForm } from "react-hook-form";
import { useUserSignupMutation } from "../../redux/features/user/userApi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface SignupFormValues {
  name: {
    firstName: string;
    lastName: string;
  };
  address: string;
  email: string;
  password: string;
}

interface CustomError extends SerializedError {
  data?: {
    message: string;
  };
}

export default function SignupForm() {
  const { register, handleSubmit } = useForm<SignupFormValues>();
  const [login, { isLoading, isError, error }] = useUserSignupMutation();
  const navigate = useNavigate();

  const onSubmit = async (data: SignupFormValues) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const response = await login(data).unwrap();
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      navigate("/login");
    } catch (error) {
      console.error("Signup error");
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>First Name</label>
          <input
            className="input input-bordered input-info w-full max-w-xs"
            type="text"
            {...register("name.firstName", {
              required: "First name is required!",
            })}
          />
        </div>
        <div>
          <label>Last Name</label>
          <input
            className="input input-bordered input-info w-full max-w-xs"
            type="text"
            {...register("name.lastName", {
              required: "Last name is required!",
            })}
          />
        </div>
        <div>
          <label>Address</label>
          <input
            className="input input-bordered input-info w-full max-w-xs"
            type="text"
            {...register("address", {
              required: "Address is required!",
            })}
          />
        </div>
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
          {isLoading ? "Signing up..." : "Signup"}
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
