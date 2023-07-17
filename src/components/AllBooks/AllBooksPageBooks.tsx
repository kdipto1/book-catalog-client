import { useGetBooksQuery } from "../../redux/features/book/bookApi";
import { ApiResponse, IBook } from "../../types/globalTypes";
import { PropagateLoader } from "react-spinners";
import BookCard from "../Shared/BookCard";

interface SearchFormData {
  searchTerm: string;
  genre: string;
  publicationYear: string;
}

interface AllBooksPageBooksProps {
  searchData: SearchFormData;
}

export default function AllBooksPageBooks({
  searchData,
}: AllBooksPageBooksProps) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { data, isLoading, isError } = useGetBooksQuery(searchData) as {
    data: ApiResponse;
    isLoading: boolean;
    isError: unknown;
  };
  if (isLoading)
    return (
      <div className="min-h-screen bg-green-400 flex justify-center items-center content-center">
        <PropagateLoader color="#ffffff" />
      </div>
    );
  if (isError) return null;

  const books: IBook[] =
    data?.data?.map((item: IBook) => ({
      ...item,
      publicationDate: new Date(item.publicationDate),
    })) || [];
  return (
    <div className="min-h-screen bg-green-400">
      <p className="text-center font-semibold text-4xl pt-4">
        {!books.length ? "No book found" : "All Books"}
      </p>
      <div className="grid grid-cols-3 gap-4  pt-4 bg-green-400">
        {books?.map((book: IBook) => (
          <BookCard key={book._id} book={book} />
        ))}
      </div>
    </div>
  );
}
