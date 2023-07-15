import React from "react";
import { useGetBooksQuery } from "../../redux/features/book/bookApi";
import { ApiResponse, IBook } from "../../types/globalTypes";
import { PropagateLoader } from "react-spinners";
import BookCard from "../Shared/BookCard";

interface SearchFormData {
  searchQuery: string;
  genre: string;
  publicationYear: string;
}

interface AllBooksPageBooksProps {
  searchData: SearchFormData;
}

export default function AllBooksPageBooks({
  searchData,
}: AllBooksPageBooksProps) {
  console.log(searchData, "All bosks");
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { data, isLoading, isError } = useGetBooksQuery(undefined) as {
    data: ApiResponse;
    isLoading: boolean;
    isError: any;
  };
  if (isLoading) return <PropagateLoader color="#36d7b7" />;
  if (isError) return null;
  console.log(data, "iii");

  const books: IBook[] =
    data?.data?.map((item: IBook) => ({
      ...item,
      publicationDate: new Date(item.publicationDate),
    })) || [];
  return (
    <div className="grid grid-cols-3 gap-3 pt-4 bg-lime-400">
      {books?.map((book: IBook) => (
        <BookCard key={book._id} book={book} />
      ))}
    </div>
  );
}
