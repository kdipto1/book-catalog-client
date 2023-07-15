import React from "react";
import { IBook } from "../../types/globalTypes";

interface BookCardProps {
  book: IBook;
}

export default function BookCard({ book }: BookCardProps) {
  const formattedDate = book?.publicationDate.toLocaleDateString();
  return (
    <div className="card card-compact w-72 bg-base-100 shadow-xl mx-auto">
      <figure>
        <img src="" alt="Book" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{book?.title}</h2>
        <p>Author: {book?.author}</p>
        <p>Genre: {book?.genre}</p>
        <p>Publication Date: {formattedDate}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Buy Now</button>
        </div>
      </div>
    </div>
  );
}
