/* eslint-disable @typescript-eslint/no-misused-promises */
import { SerializedError } from "@reduxjs/toolkit";
import { useForm } from "react-hook-form";
import { useUserSignupMutation } from "../../redux/features/user/userApi";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

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
    <div className="mr-auto my-auto">
      <h1 className="text-center font-bold text-4xl pb-4">Sign up</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>First Name</label>
          <input
            placeholder="your first name"
            className="input input-bordered input-info w-full max-w-xs"
            type="text"
            {...register("name.firstName", {
              required: "First name is required!",
            })}
          />
        </div>
        <div className="py-2">
          <label>Last Name</label>
          <input
            placeholder="your last name"
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
            placeholder="your address"
            className="input input-bordered input-info w-full max-w-xs"
            type="text"
            {...register("address", {
              required: "Address is required!",
            })}
          />
        </div>
        <div className="py-2">
          <label>Email</label>
          <input
            placeholder="your email"
            className="input input-bordered input-info w-full max-w-xs"
            type="email"
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
            {isLoading ? "Signing up..." : "Signup"}
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
        Already signed up!{" "}
        <Link className="font-bold" to="/login">
          Login
        </Link>
      </p>
    </div>
  );
}
