import { useLocation, useParams } from "react-router-dom";
import { useGetSingleBookQuery } from "../redux/features/book/bookApi";
import { PropagateLoader } from "react-spinners";
import { IBook } from "../types/globalTypes";
import BookReviews from "../components/BookDetails/BookReviews";
import BookDetailsCard from "../components/BookDetails/BookDetailsCard";
import { useEffect } from "react";

export default function BookDetails() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  const { id } = useParams();

  const { data, isLoading } = useGetSingleBookQuery(id as string) as {
    data: {
      success: boolean;
      statusCode: number;
      message: string;
      data: IBook;
    };
    isLoading: boolean;
  };
  if (isLoading)
    return (
      <div className="min-h-screen bg-green-400 flex justify-center items-center content-center">
        <PropagateLoader color="#ffffff" />
      </div>
    );
  const { _id, title, author, genre, publicationDate, addedBy, reviews } =
    data.data;

  const book = {
    _id,
    title,
    author,
    genre,
    publicationDate,
    addedBy,
  };

  return (
    <div className="min-h-screen bg-green-400 grid grid-cols-2">
      <BookDetailsCard book={book} />
      <BookReviews reviews={reviews} />
    </div>
  );
}
