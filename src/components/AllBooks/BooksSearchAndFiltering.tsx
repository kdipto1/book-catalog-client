/* eslint-disable @typescript-eslint/no-misused-promises */
import { useForm, SubmitHandler } from "react-hook-form";

interface SearchFormData {
  searchTerm: string;
  genre: string;
  publicationYear: string;
}

interface BookSearchFormProps {
  onSearch: (data: SearchFormData) => void;
}

export default function BooksSearchAndFiltering({
  onSearch,
}: BookSearchFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SearchFormData>();

  const onSubmit: SubmitHandler<SearchFormData> = (data) => {
    onSearch(data);
  };

  return (
    <div className="pl-4">
      <form
        className="grid grid-cols-1 gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label className="text-center font-semibold pt-4" htmlFor="searchBook">
          Search Book{" "}
        </label>
        <input
          id="searchBook"
          {...register("searchTerm")}
          type="text"
          placeholder="Search books"
          className="input input-bordered input-info w-full max-w-xs "
        />
        <button className="btn btn-success text-white " type="submit">
          Search
        </button>
      </form>

      <p className="text-center font-semibold pt-6">
        Filter Books By Genre And Publication Year:
      </p>
      <form className="py-3" onChange={handleSubmit(onSubmit)}>
        <input
          {...register("genre")}
          className="input input-bordered input-info w-full max-w-xs"
          type="text"
          placeholder="Genre"
        />
      </form>
      <form className="" onChange={handleSubmit(onSubmit)}>
        <input
          {...register("publicationYear")}
          className="input input-bordered input-info w-full max-w-xs"
          type="number"
          placeholder="Year"
          min="0"
          max="2023"
        />
      </form>
    </div>
  );
}
