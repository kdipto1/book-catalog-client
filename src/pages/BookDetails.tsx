/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useParams } from "react-router-dom";
import { useGetSingleBookQuery } from "../redux/features/book/bookApi";
import { PropagateLoader } from "react-spinners";
import { IBook } from "../types/globalTypes";
import BookDetailsAndEdit from "../components/BookDetails/BookDetailsAndEdit";
import { useAppSelector } from "../redux/hook";
import { useState } from "react";

export default function BookDetails() {
  const { id } = useParams();
  const { userId } = useAppSelector((state) => state.userState);
  const [editButtonState, setEditButtonState] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { data, isLoading } = useGetSingleBookQuery(id) as {
    data: {
      success: boolean;
      statusCode: number;
      message: string;
      data: IBook;
    };
    isLoading: boolean;
  };

  if (isLoading) return <PropagateLoader color="#36d7b7" />;
  console.log(data.data);
  const book = {
    _id: data?.data?._id,
    title: data?.data.title,
    author: data.data.author,
    genre: data.data.genre,
    publicationData: data.data.publicationDate,
    addedBy: data.data.addedBy,
  };

  const isBookAdder = book.addedBy === userId ? true : false;
  const formattedDate = new Date(book?.publicationData);
  const format = formattedDate.toDateString();

  return (
    <div>
      <div className="card w-96 bg-neutral text-neutral-content">
        <div className="card-body items-center text-center">
          <p>Title: {book.title}</p>
          <p>Author: {book.author}</p>
          <p>Genre: {book.genre}</p>
          <p>Publication Date: {format}</p>
          <div className="card-actions justify-end">
            {isBookAdder && <button className="btn btn-primary">Edit</button>}
            {isBookAdder && <button className="btn btn-primary">Delete</button>}
          </div>
        </div>
      </div>
    </div>
  );
}
