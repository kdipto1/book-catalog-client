/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { useForm } from "react-hook-form";

interface IBookDetail {
  _id: string;
  title: string;
  author: string;
  genre: string;
  publicationData: Date;
}

interface IBookDetailProp {
  book: IBookDetail;
}

export default function BookDetailsAndEdit({ book }: IBookDetailProp) {
  const { register, handleSubmit } = useForm<IBookDetail>();

  const formattedDate = new Date(book?.publicationData);
  const format = formattedDate.toDateString();
  // const [login, { isLoading, isError, error }] = useUserLoginMutation();
  // const dispatch = useAppDispatch();

  const onSubmit = (data: IBookDetail) => {
    try {
      console.log(data);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      // const response = await login(data).unwrap();
      // dispatch(loginUser(userState));
      // console.log("Login successful", response);
    } catch (error) {
      console.error("Login error", error);
    }
  };
  return (
    <div>
      <h1>Edit Book Detail</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Title: {book?.title}</label>
          <input
            className="input input-bordered input-info w-full max-w-xs"
            type="text"
            {...register("title")}
          />
        </div>
        <div>
          <label>Author: {book?.author}</label>
          <input
            className="input input-bordered input-info w-full max-w-xs"
            type="text"
            {...register("author")}
          />
        </div>
        <div>
          <label>Genre: {book?.genre}</label>
          <input
            className="input input-bordered input-info w-full max-w-xs"
            type="text"
            {...register("genre")}
          />
        </div>
        <div>
          <label>Publication Data: {format}</label>
          <input
            className="input input-bordered input-info w-full max-w-xs"
            type="date"
            {...register("publicationData")}
          />
        </div>

        {/* <button className="btn btn-accent" type="submit" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Log in"}
        </button> */}
        {/* {isError && error && (
          <div>
            {(error as CustomError)?.data?.message ||
              (error as SerializedError).message}
          </div>
        )} */}
      </form>
    </div>
  );
}
