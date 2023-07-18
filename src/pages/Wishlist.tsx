import { PropagateLoader } from "react-spinners";
import { useGetWishlistQuery } from "../redux/features/user/userApi";
import { IUserWishlist } from "../types/globalTypes";
import { Link } from "react-router-dom";

export default function Wishlist() {
  const { data, isLoading } = useGetWishlistQuery(undefined, {
    refetchOnMountOrArgChange: true,
  }) as {
    data: {
      success: string;
      statusCode: number;
      message: string;
      data: IUserWishlist;
    };
    isLoading: boolean;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <PropagateLoader color="#ADFF2F" />
      </div>
    );
  }

  if (
    !data ||
    !data.data ||
    !data.data.wishlist ||
    data.data.wishlist.length === 0
  ) {
    return (
      <div className="min-h-screen text-center mt-4">
        No books in the wishlist
      </div>
    );
  }

  return (
    <div className="min-h-screen mt-4">
      <div className="overflow-x-auto">
        <table className="table">
          <caption className="font-bold text-4xl">Wishlist</caption>
          <thead>
            <tr className="text-center">
              <th>Book Title</th>
              <th>Author</th>
              <th>Genre</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {data.data.wishlist.map((book) => (
              <tr className="text-center" key={book?._id}>
                <td>{book?.bookId?.title}</td>
                <td>{book?.bookId?.author}</td>
                <td>{book?.bookId?.genre}</td>
                <th>
                  <Link
                    to={`/book-detail/${book?.bookId?._id}`}
                    className="btn btn-ghost btn-xs"
                  >
                    Details
                  </Link>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
