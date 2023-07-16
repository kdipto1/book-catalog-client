/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { useForm } from "react-hook-form";
import { PropagateLoader } from "react-spinners";
import {
  useEditBookDetailsMutation,
  useGetSingleBookQuery,
} from "../redux/features/book/bookApi";
import { useParams } from "react-router-dom";
import { IBook } from "../types/globalTypes";
import { SerializedError } from "@reduxjs/toolkit";

interface IBookDetail {
  title: string;
  author: string;
  genre: string;
  publicationData: Date;
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

  if (isLoading) return <PropagateLoader color="#36d7b7" />;

  const book = {
    _id: data?.data?._id,
    title: data?.data.title,
    author: data?.data.author,
    genre: data?.data.genre,
    publicationData: data?.data.publicationDate,
    addedBy: data?.data.addedBy,
  };

  const formattedDate = new Date(book?.publicationData);
  const format = formattedDate.toLocaleDateString("en-GB"); // Convert to DD-MM-YYYY format

  const onSubmit = async (data: IBookDetail) => {
    try {
      const updatedBook: IBook = {
        publicationDate: data.publicationData,
        ...book,
        ...data,
      };

      // Pass the 'id' and 'book' properties in the mutation call
      const response = await editBookDetails({
        id,
        book: updatedBook,
      }).unwrap();
      console.log("Edit book successful", response);
    } catch (error) {
      console.error("Edit book error", error);
    }
  };

  return (
    <div>
      <h1>Edit Book Detail</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
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
          <label>Publication Date: {format}</label>
          <input
            defaultValue={format} // Set the formatted date as the default value
            className="input input-bordered input-info w-full max-w-xs"
            type="date"
            {...register("publicationData")}
          />
        </div>

        <button className="btn btn-accent" type="submit" disabled={isEditing}>
          {isEditing ? "Updating Book..." : "Update Book"}
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