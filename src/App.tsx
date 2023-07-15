import MainLayout from "./layouts/MainLayout";
import { useGetBooksQuery } from "./redux/features/book/bookApi";
import { decrement, increment } from "./redux/features/count/counterSlice";
import { useAppDispatch, useAppSelector } from "./redux/hook";

type IReviews = {
  reviewer: string;
  rating: number;
  comment: string;
};

export type IBook = {
  title: string;
  author: string;
  genre: string;
  publicationDate: Date;
  addedBy: string;
  reviews: IReviews[];
};

function App() {
  const { value } = useAppSelector((state) => state.counter);
  const dispatch = useAppDispatch();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { data, isLoading } = useGetBooksQuery(undefined);
  if (isLoading) return;
  console.log(data);
  return (
    <>
      <MainLayout />
      <h1 className="text-2xl">{value}</h1>
      <button onClick={() => dispatch(increment())} className="btn btn-square">
        {" "}
        Button
      </button>
      <button onClick={() => dispatch(decrement())} className="btn btn-square">
        {" "}
        Button
      </button>
      <button className="btn btn-square"> Button</button>
    </>
  );
}

export default App;
