/* eslint-disable @typescript-eslint/no-misused-promises */
import { useForm, SubmitHandler } from "react-hook-form";

interface SearchFormData {
  searchQuery: string;
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
    <div>
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <input {...register("searchQuery")} placeholder="Search books" />
        <select {...register("genre")} defaultValue="">
          <option value="">All Genres</option>
          <option value="fantasy">Fantasy</option>
          <option value="romance">Romance</option>
          <option value="mystery">Mystery</option>
          {/* Add more genre options */}
        </select>
        <select {...register("publicationYear")} defaultValue="">
          <option value="">All Years</option>
          <option value="2022">2022</option>
          <option value="2021">2021</option>
          <option value="2020">2020</option>
          {/* Add more publication year options */}
        </select>
        <button type="submit">Search</button>
      </form>
    </div>
  );
}
