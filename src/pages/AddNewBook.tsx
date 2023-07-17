/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useForm } from "react-hook-form";
import { useAddNewBookMutation } from "../redux/features/book/bookApi";
import { SerializedError } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

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
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IBookFormValues>();

  const [addBook, { isLoading, isError, error }] = useAddNewBookMutation();

  const onSubmit = async (data: IBookFormValues) => {
    try {
      const response = await addBook(data).unwrap();
      reset();
      toast("Book added successfully");
    } catch (error) {
      toast("Add book error");
    }
  };

  return (
    <div className="mx-auto font-semibold text-center h-screen bg-green-400">
      <h1 className="text-center mr-8 text-4xl py-4">Add New Book</h1>
      <div className="mx-auto my-auto card w-96">
        <form
          className="text-center card w-auto mr-auto"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <label>Title:</label>
            <input
              className="input input-bordered input-info w-full max-w-xs"
              type="text"
              {...register("title", { required: "Title is required" })}
            />
            {errors.title && <div>{errors.title.message}</div>}
          </div>
          <div className="py-3">
            <label>Author:</label>
            <input
              className="input input-bordered input-info w-full max-w-xs"
              type="text"
              {...register("author", { required: "Author is required" })}
            />
            {errors.author && <div>{errors.author.message}</div>}
          </div>
          <div>
            <label>Genre:</label>
            <input
              className="input input-bordered input-info w-full max-w-xs"
              type="text"
              {...register("genre", { required: "Genre is required" })}
            />
            {errors.genre && <div>{errors.genre.message}</div>}
          </div>
          <div className="py-3">
            <label>Publication Date:</label>
            <input
              className="input input-bordered input-info w-full max-w-xs text-black"
              type="date"
              {...register("publicationDate", {
                required: "Publication date is required",
              })}
            />
            {errors.publicationDate && (
              <div>{errors.publicationDate.message}</div>
            )}
          </div>
          <div>
            <button className="btn " type="submit" disabled={isLoading}>
              {isLoading ? "Adding Book..." : "Add Book"}
            </button>
          </div>
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
