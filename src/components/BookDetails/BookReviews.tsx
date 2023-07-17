import { IReviews } from "../../types/globalTypes";

interface IBookReviewsProps {
  reviews?: IReviews[];
}

export default function BookReviews({ reviews }: IBookReviewsProps) {
  return (
    <div>
      {reviews?.map((review: IReviews) => (
        <div
          className="bg-base-200 text-green-400 border-2 border-base-200 rounded p-4"
          key={review._id}
        >
          <div className=" flex justify-center items-center">
            <img
              className="w-8 mr-auto"
              src="/src/assets/icons8-person-60.png"
              alt=""
            />{" "}
            <p className="mr-auto">
              {review.reviewer.name.firstName} {review.reviewer.name.lastName}
            </p>
          </div>

          <div className="flex justify-center items-center">
            <img
              className="w-8 mr-auto"
              src="/src/assets/icons8-comment-96.png"
              alt=""
            />
            <p className="mr-auto">{review.comment}</p>
          </div>
          <div className="flex justify-center items-center">
            <img
              className="w-8 mr-auto"
              src="/src/assets/icons8-rating-100.png"
              alt=""
            />
            <p className="mr-auto">{review.rating}/5</p>
          </div>
        </div>
      ))}
    </div>
  );
}
