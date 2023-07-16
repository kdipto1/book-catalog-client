import { useGetHomeBooksQuery } from "../../redux/features/book/bookApi";
import { PropagateLoader } from "react-spinners";
import { ApiResponse, IBook } from "../../types/globalTypes";
import BookCard from "../Shared/BookCard";

export default function HomeBooks() {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { data, isLoading, isError } = useGetHomeBooksQuery(undefined) as {
    data: ApiResponse;
    isLoading: boolean;
    isError: any;
  };
  if (isLoading) return <PropagateLoader color="#36d7b7" />;
  if (isError) return null;

  const books: IBook[] =
    data?.data?.map((item: IBook) => ({
      ...item,
      publicationDate: new Date(item.publicationDate),
    })) || [];
  return (
    <div className="grid grid-cols-4 gap-3 pt-4 bg-green-400">
      {books?.map((book: IBook) => (
        <BookCard key={book._id} book={book} />
      ))}
    </div>
  );
}
