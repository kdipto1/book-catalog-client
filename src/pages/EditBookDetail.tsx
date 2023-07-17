/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useForm } from "react-hook-form";
import { PropagateLoader } from "react-spinners";
import {
  useEditBookDetailsMutation,
  useGetSingleBookQuery,
} from "../redux/features/book/bookApi";
import { useParams } from "react-router-dom";
import { IBook } from "../types/globalTypes";
import { SerializedError } from "@reduxjs/toolkit";
import { useState } from "react";

interface IBookDetail {
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

export default function EditBookDetail() {
  const { id } = useParams() as {
    id: string;
  };
  const { data, isLoading } = useGetSingleBookQuery(id) as {
    data: {
      success: boolean;
      statusCode: number;
      message: string;
      data: IBook;
    };
    isLoading: boolean;
  };
  const [editBookDetails, { isLoading: isEditing, isError, error }] =
    useEditBookDetailsMutation();
  const { register, handleSubmit } = useForm<IBookDetail>();
  const [selectedDate, setSelectedDate] = useState("2022-01-01");

  if (isLoading) return <PropagateLoader color="#36d7b7" />;
  const book = {
    title: data?.data.title,
    author: data?.data.author,
    genre: data?.data.genre,
    publicationDate: data?.data.publicationDate,
  };

  const format = new Date(book?.publicationDate);
  const formattedDate = format.toLocaleDateString("en-GB");
  console.log(format);
  const onSubmit = async (data: IBookDetail) => {
    try {
      const updatedBook: IBookDetail = {
        // publicationDate: data.publicationDate,
        ...book,
        ...data,
      };

      const response = await editBookDetails({
        id,
        book: updatedBook,
      }).unwrap();
      console.log("Edit book successful", response);
    } catch (error) {
      console.error("Edit book error");
    }
  };

  return (
    <div className="min-h-screen bg-green-400">
      <h1 className="text-center py-6 font-bold  text-4xl">Edit Book Detail</h1>
      <form className="w-96 mx-auto " onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Title: {book?.title}</label>
          <input
            defaultValue={book?.title}
            className="input input-bordered input-info w-full max-w-xs"
            type="text"
            {...register("title")}
          />
        </div>
        <div>
          <label>Author: {book?.author}</label>
          <input
            defaultValue={book?.author}
            className="input input-bordered input-info w-full max-w-xs"
            type="text"
            {...register("author")}
          />
        </div>
        <div>
          <label>Genre: {book?.genre}</label>
          <input
            defaultValue={book?.genre}
            className="input input-bordered input-info w-full max-w-xs"
            type="text"
            {...register("genre")}
          />
        </div>
        <div>
          <label>Publication Date: {formattedDate}</label>
          <input
            value={selectedDate}
            className="input input-bordered input-info w-full max-w-xs"
            type="date"
            {...register("publicationDate")}
          />
        </div>

        <div>
          <button className="btn btn-block" type="submit" disabled={isEditing}>
            {isEditing ? "Updating Book..." : "Update Book"}
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
  );
}
