import { useState } from "react";
import { IBook } from "../../types/globalTypes";
import { Link } from "react-router-dom";
import { DeleteConfirmationModal } from "./DeleteConfirmationModal";
import { useAppSelector } from "../../redux/hook";
import AddBookReview from "./AddBookReview";

interface IBookDetailsCardProps {
  book: IBook;
}

export default function BookDetailsCard({ book }: IBookDetailsCardProps) {
  const { userId } = useAppSelector((state) => state.userState);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const isBookAdder = book.addedBy === userId;

  const formattedDate = new Date(book.publicationDate);
  const format = formattedDate.toDateString();
  return (
    <div className="mx-auto mt-6">
      <p className="font-bold text-4xl pb-4 text-white">Book Details:</p>
      <div className="card w-96 bg-white text-black font-bold">
        <div className="card-body items-center text-center ">
          <p className="mr-auto">Title: {book.title}</p>
          <p className="mr-auto">Author: {book.author}</p>
          <p className="mr-auto">Genre: {book.genre}</p>
          <p className="mr-auto">Publication Date: {format}</p>
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
      <AddBookReview id={book._id} userId={userId} />
    </div>
  );
}
