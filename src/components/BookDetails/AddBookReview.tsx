/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from "react";
import { CustomError } from "../../types/globalTypes";
import { SerializedError } from "@reduxjs/toolkit";
import { useForm } from "react-hook-form";
import { useAddBookReviewMutation } from "../../redux/features/book/bookApi";
import { toast } from "react-hot-toast";

interface IReviewFormValues {
  rating: number;
  comment: string;
}

interface IAddBookReviewProps {
  id: string;
  userId: string | null;
}

export default function AddBookReview({ id, userId }: IAddBookReviewProps) {
  const { register, handleSubmit, reset } = useForm<IReviewFormValues>();
  const [review, { isLoading, isError, error }] = useAddBookReviewMutation();

  const onSubmit = async (data: IReviewFormValues) => {
    try {
      if (!userId) {
        toast("Please login to submit a review");
        return;
      }
      const reviewData = {
        ...data,
      };

      const response = await review({ id, review: reviewData }).unwrap();

      toast("Review added");
      reset();
    } catch (error) {
      toast("Review error");
    }
  };
  return (
    <div className="mr-auto mt-20">
      <h1 className="text-center text-white font-bold text-4xl pb-4">
        Give review
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="pb-2 mr-auto">
          <label>Comment</label>
          <textarea
            className="textarea textarea-info w-full max-w-xs"
            placeholder="your comment"
            {...register("comment", { required: "Comment is required!" })}
          />
        </div>
        <div className="mr-auto flex flex-col">
          <label>Ratting</label>
          <input
            placeholder="your ratting"
            min="0"
            max="5"
            className="input input-bordered input-info w-full max-w-xs"
            type="number"
            {...register("rating", { required: "Rating is required" })}
          />
        </div>
        <div className="pt-4">
          <button className="btn" type="submit" disabled={isLoading}>
            {isLoading ? "Submitting..." : "Submit"}
          </button>
        </div>
        {isError && error && (
          <div>
            {(error as CustomError)?.data?.message ||
              (error as SerializedError).message}
          </div>
        )}
      </form>
    </div>
  );
}
