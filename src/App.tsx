import MainLayout from "./layouts/MainLayout";
import { useGetBooksQuery } from "./redux/features/book/bookApi";
import { decrement, increment } from "./redux/features/count/counterSlice";
import { useAppDispatch, useAppSelector } from "./redux/hook";

function App() {
  const { value } = useAppSelector((state) => state.counter);
  const dispatch = useAppDispatch();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment

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
