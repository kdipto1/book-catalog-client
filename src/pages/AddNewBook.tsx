/* eslint-disable @typescript-eslint/no-misused-promises */
import React from "react";
import { useForm } from "react-hook-form";
import { useAddNewBookMutation } from "../redux/features/book/bookApi";
import { IBook } from "../types/globalTypes";
import { useAppSelector } from "../redux/hook";
import { SerializedError } from "@reduxjs/toolkit";

interface IBookFormValues {
  title: string;
  author: string;
  genre: string;
  publicationDate: Date;
}
interface CustomError extends SerializedError {
  data?: {
    message: string;
  };
}

export default function AddNewBook() {
  const { register, handleSubmit } = useForm<IBookFormValues>();
  const { userId } = useAppSelector((state) => state.userState);

  const [addBook, { isLoading, isError, error }] = useAddNewBookMutation();
  // const dispatch = useAppDispatch();

  const onSubmit = async (data: IBookFormValues) => {
    try {
      const bookData: IBook = {
        ...data,
        addedBy: userId,
      };

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const response = await addBook(bookData).unwrap();

      console.log("Book added successfully", response);
    } catch (error) {
      console.error("Login error", error);
    }
  };
  return (
    <div>
      <div>
        <h1>Add New Book</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label>Title:</label>
            <input
              className="input input-bordered input-info w-full max-w-xs"
              type="text"
              {...register("title", { required: "Title is required" })}
            />
          </div>
          <div>
            <label>Author:</label>
            <input
              className="input input-bordered input-info w-full max-w-xs"
              type="text"
              {...register("author", { required: "Author is required" })}
            />
          </div>
          <div>
            <label>Genre:</label>
            <input
              className="input input-bordered input-info w-full max-w-xs"
              type="text"
              {...register("genre", { required: "Genre is required" })}
            />
          </div>
          <div>
            <label>Publication Data:</label>
            <input
              className="input input-bordered input-info w-full max-w-xs"
              type="date"
              {...register("publicationDate", {
                required: "Publication date is required",
              })}
            />
          </div>
          <button className="btn btn-accent" type="submit" disabled={isLoading}>
            {isLoading ? "Adding Book..." : "Add Book"}
          </button>
          {isError && error && (
            <div>
              {(error as CustomError)?.data?.message ||
                (error as SerializedError).message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
