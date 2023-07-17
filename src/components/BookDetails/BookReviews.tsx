import { IReviews } from "../../types/globalTypes";

interface IBookReviewsProps {
  reviews?: IReviews[];
}

export default function BookReviews({ reviews }: IBookReviewsProps) {
  return (
    <div>
      {reviews?.map((review: IReviews) => (
        <div key={review._id}>
          <p>{review.reviewer.name.firstName}</p>
          <p>{review.comment}</p>
          <p>{review.rating}</p>
        </div>
      ))}
    </div>
  );
}
