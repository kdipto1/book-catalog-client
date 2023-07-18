import { useGetBooksQuery } from "../../redux/features/book/bookApi";
import { ApiResponse, IBook } from "../../types/globalTypes";
import { PropagateLoader } from "react-spinners";
import BookCard from "../Shared/BookCard";
import { useState } from "react";

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
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { data, isLoading, isError } = useGetBooksQuery({
    page: currentPage.toString(),
    limit: pageSize.toString(),
    ...searchData,
  }) as {
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

  const totalPages = Math.ceil(data?.meta.count / pageSize);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const handlePageSizeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newPageSize = parseInt(event.target.value, 10);
    setPageSize(newPageSize);
    setCurrentPage(1);
  };

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
      <div className="flex justify-start items-center mt-4 ml-4">
        <label className="mr-2">Books per page:</label>
        <select
          value={pageSize}
          onChange={handlePageSizeChange}
          className="border border-gray-300 px-2 py-1 rounded-md"
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={30}>30</option>
          <option value={100}>100</option>
        </select>
      </div>
      <div className="grid grid-cols-3 gap-4  py-6 bg-green-400">
        {books?.map((book: IBook) => (
          <BookCard key={book._id} book={book} />
        ))}
      </div>
      {totalPages > 1 && (
        <div className="flex justify-center items-center py-4">
          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (page) => (
              <button
                key={page}
                className={`px-2 py-1 mx-1 ${
                  currentPage === page
                    ? "bg-green-600 text-white"
                    : "bg-green-200 text-black"
                }`}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
            )
          )}
        </div>
      )}
    </div>
  );
}
