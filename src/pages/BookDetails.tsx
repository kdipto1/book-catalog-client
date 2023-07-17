/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Link, useParams } from "react-router-dom";
import { useGetSingleBookQuery } from "../redux/features/book/bookApi";
import { PropagateLoader } from "react-spinners";
import { IBook } from "../types/globalTypes";

import { useAppSelector } from "../redux/hook";
import { useState } from "react";
import { DeleteConfirmationModal } from "../components/BookDetails/DeleteConfirmationModal";

export default function BookDetails() {
  const { id } = useParams();
  const { userId } = useAppSelector((state) => state.userState);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { data, isLoading } = useGetSingleBookQuery(id as string) as {
    data: {
      success: boolean;
      statusCode: number;
      message: string;
      data: IBook;
    };
    isLoading: boolean;
  };

  if (isLoading) return <PropagateLoader color="#36d7b7" />;
  const book = {
    _id: data?.data?._id,
    title: data?.data.title,
    author: data.data.author,
    genre: data.data.genre,
    publicationData: data.data.publicationDate,
    addedBy: data.data.addedBy,
  };

  const isBookAdder = book.addedBy === userId ? true : false;
  const formattedDate = new Date(book?.publicationData);
  const format = formattedDate.toDateString();

  return (
    <div className="min-h-screen bg-green-400 flex items-center justify-center">
      <div className="card w-96 bg-white text-green-400">
        <div className="card-body items-center text-center">
          <p>Title: {book.title}</p>
          <p>Author: {book.author}</p>
          <p>Genre: {book.genre}</p>
          <p>Publication Date: {format}</p>
          <div className="card-actions justify-end">
            {isBookAdder && (
              <Link
                to={`/edit-book/${book._id}`}
                className="btn btn-block bg-green-400 text-green-100 hover:text-black font-bold"
              >
                Edit
              </Link>
            )}
            {isBookAdder && (
              <button
                onClick={() => setIsDeleteModalOpen(true)}
                className="btn btn-block bg-red-400 text-green-100  hover:text-black font-bold"
              >
                Delete
              </button>
            )}
            {isDeleteModalOpen && (
              <DeleteConfirmationModal
                bookId={book._id}
                onDelete={() => setIsDeleteModalOpen(false)}
                onCancel={() => setIsDeleteModalOpen(false)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
