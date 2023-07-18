/* eslint-disable @typescript-eslint/no-misused-promises */
import {
  useBookReadingFinishStateChangeMutation,
  useBookReadingReadStateChangeMutation,
  useGetReadingListQuery,
} from "../redux/features/user/userApi";
import { PropagateLoader } from "react-spinners";
import { IUserReadingList } from "../types/globalTypes";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function ReadingList() {
  const { data, isLoading } = useGetReadingListQuery(undefined, {
    refetchOnMountOrArgChange: true,
  }) as {
    data: {
      success: string;
      statusCode: number;
      message: string;
      data: IUserReadingList;
    };
    isLoading: boolean;
  };
  const [readState] = useBookReadingReadStateChangeMutation();
  const [finishState] = useBookReadingFinishStateChangeMutation();

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
    !data.data.readingList ||
    data.data.readingList.length === 0
  ) {
    return (
      <div className="min-h-screen text-center mt-4">
        No books in the reading list
      </div>
    );
  }

  const handleBookReadState = async (id: string) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const response = await readState(id).unwrap();
      toast("You have started reading this book");
    } catch (error) {
      toast("Error");
    }
  };
  const handleBookFinishState = async (id: string) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const response = await finishState(id);
      toast("You have finished reading this book");
    } catch (error) {
      toast("Error");
    }
  };
  return (
    <div className="min-h-screen mt-4">
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr className="text-center">
              <th>Book Title</th>
              <th>Author</th>
              <th>Genre</th>
              <th>Start Reading</th>
              <th>Finished Reading</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {data?.data.readingList.map((book) => (
              <tr className="text-center" key={book?._id}>
                <td>{book?.bookId?.title}</td>
                <td>{book?.bookId?.author}</td>
                <td>{book?.bookId?.genre}</td>
                <td>
                  {!book?.readingState && !book?.finishState && (
                    <button
                      onClick={() => handleBookReadState(book?.bookId?._id)}
                      className="btn btn-xs"
                    >
                      Start Reading
                    </button>
                  )}
                  {book.readingState && !book.finishState && "Started reading"}
                  {book.readingState && book.finishState && "Finished reading"}
                  {!book.readingState && book.finishState && "Finished reading"}
                </td>
                <td>
                  {!book?.finishState ? (
                    <input
                      type="checkbox"
                      onChange={() => handleBookFinishState(book?.bookId?._id)}
                      className="checkbox-xs"
                    />
                  ) : (
                    "Finished reading"
                  )}
                </td>
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
