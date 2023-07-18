/* eslint-disable @typescript-eslint/no-misused-promises */
import { useState } from "react";
import { IBook } from "../../types/globalTypes";
import { Link } from "react-router-dom";
import { DeleteConfirmationModal } from "./DeleteConfirmationModal";
import { useAppSelector } from "../../redux/hook";
import AddBookReview from "./AddBookReview";
import {
  useAddBookToReadingListMutation,
  useAddBookToWishlistMutation,
} from "../../redux/features/user/userApi";
import { toast } from "react-hot-toast";

interface IBookDetailsCardProps {
  book: IBook;
}

export default function BookDetailsCard({ book }: IBookDetailsCardProps) {
  const { userId } = useAppSelector((state) => state.userState);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const isBookAdder = book?.addedBy === userId;

  const formattedDate = new Date(book.publicationDate);
  const format = formattedDate.toDateString();

  const [wishlist, { isLoading, isError }] = useAddBookToWishlistMutation();

  const [readingList, { isLoading: readingListLoading }] =
    useAddBookToReadingListMutation();
  /**
   * !wish List
   */
  const handleWishlist = async () => {
    try {
      if (!userId) {
        toast("Please login to continue!");
        return;
      }

      const bookId = { bookId: book?._id };
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const response = await wishlist(bookId).unwrap();
      toast("Book added to wishlist");
    } catch (error) {
      toast("Error wishlist! Book already in wishlist");
    }
  };

  /**
   * ! Reading List
   */
  const handleReadingList = async () => {
    try {
      if (!userId) {
        toast("Please login to continue!");
        return;
      }

      const bookR = {
        bookId: book?._id,
        readingState: false,
        finishState: false,
      };
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const response = await readingList(bookR).unwrap();
      toast("Book added to reading list");
    } catch (error) {
      toast("Reading list error!, Book already in reading list");
    }
  };
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
      <button
        onClick={handleWishlist}
        disabled={isLoading}
        className="btn bg-blue-400 mt-4"
      >
        {isLoading ? "Adding Book..." : "Add to wishlist"}
      </button>
      <button
        onClick={handleReadingList}
        disabled={readingListLoading}
        className="btn bg-blue-400 m-4"
      >
        {readingListLoading ? "Adding Book..." : "Add to Reading List"}
      </button>
      <AddBookReview id={book._id} userId={userId} />
    </div>
  );
}
