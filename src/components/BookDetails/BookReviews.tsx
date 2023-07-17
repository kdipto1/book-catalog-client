import { IReviews } from "../../types/globalTypes";

interface IBookReviewsProps {
  reviews?: IReviews[];
}

export default function BookReviews({ reviews }: IBookReviewsProps) {
  return (
    <div className="mr-auto">
      <p className="font-bold text-4xl mt-4 text-white">Reviews:</p>
      {!reviews?.length && (
        <p className="text-white font-bold">No review found!</p>
      )}
      <div className="grid grid-cols-2">
        {reviews?.map((review: IReviews) => (
          <div className="bg-white text-black rounded p-4 m-4" key={review._id}>
            <div className=" flex items-start justify-start">
              <img
                className="w-6 mr-auto"
                src="/src/assets/icons8-person-60.png"
                alt=""
              />{" "}
              <p className="mr-auto">
                {review.reviewer.name.firstName} {review.reviewer.name.lastName}
              </p>
            </div>
            <div className="flex justify-center items-center">
              <img
                className="w-6 mr-auto"
                src="/src/assets/icons8-comment-96.png"
                alt=""
              />
              <p
                title={review.comment}
                className="mr-auto whitespace-normal truncate"
              >
                {review.comment}
              </p>
            </div>
            <div className="flex justify-center items-center">
              <img
                className="w-6 mr-auto"
                src="/src/assets/icons8-rating-100.png"
                alt=""
              />
              <p className="mr-auto">{review.rating}/5</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
