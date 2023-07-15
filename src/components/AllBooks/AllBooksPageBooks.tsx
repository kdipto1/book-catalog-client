import React, { Dispatch, SetStateAction } from "react";
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
  setSearchData: Dispatch<SetStateAction<SearchFormData>>;
  searchData: SearchFormData;
}

export default function AllBooksPageBooks({
  setSearchData,
  searchData,
}: AllBooksPageBooksProps) {
  console.log(searchData, "All bosks");
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { data, isLoading, isError } = useGetBooksQuery(searchData) as {
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
    <div className="grid grid-cols-3 gap-4  pt-4 bg-lime-400">
      {books?.map((book: IBook) => (
        <BookCard key={book._id} book={book} />
      ))}
    </div>
  );
}
