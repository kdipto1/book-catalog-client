import React from "react";
import { useGetWishlistQuery } from "../redux/features/user/userApi";
import { IBook } from "../types/globalTypes";
import { Link } from "react-router-dom";

interface IWishlistBook {
  bookId: IBook;
  _id: string;
  id: string;
}

interface IUserWishlist {
  _id: string;
  wishlist: IWishlistBook[];
  id: string;
}

export default function Wishlist() {
  const { data, isLoading } = useGetWishlistQuery(undefined) as {
    data: {
      success: string;
      statusCode: number;
      message: string;
      data: IUserWishlist;
    };
    isLoading: boolean;
  };
  if (isLoading) return;
  const { wishlist } = data.data;
  const date = wishlist.map((book) => new Date(book.bookId.publicationDate));
  const format = date.toLocaleString();
  return (
    <div className="min-h-screen mt-4">
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Book Title</th>
              <th>Author</th>
              <th>Genre</th>
              <th>Publication Date</th>
              <th>Details</th>
            </tr>
          </thead>
          {wishlist.map((book) => (
            <tbody key={book._id}>
              <tr>
                <td>{book.bookId.title}</td>
                <td>{book.bookId.author}</td>
                <td>{book.bookId.genre}</td>
                <td>{format}</td>
                <th>
                  <Link
                    to={`/book-detail/${book.bookId._id}`}
                    className="btn btn-ghost btn-xs"
                  >
                    details
                  </Link>
                </th>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
}
