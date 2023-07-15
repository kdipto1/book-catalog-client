import { useState } from "react";
import AllBooksPageBooks from "../components/AllBooks/AllBooksPageBooks";
import BooksSearchAndFiltering from "../components/AllBooks/BooksSearchAndFiltering";

interface SearchFormData {
  searchQuery: string;
  genre: string;
  publicationYear: string;
}

export default function AllBooks() {
  const [searchData, setSearchData] = useState<SearchFormData>({
    searchQuery: "",
    genre: "",
    publicationYear: "",
  });

  console.log(searchData);
  const handleSearch = (data: SearchFormData) => {
    if (data) setSearchData(data);
  };
  return (
    <div>
      AllBooks Page
      <div className="flex  bg-amber-800">
        <BooksSearchAndFiltering onSearch={handleSearch} />
        <AllBooksPageBooks searchData={searchData} />
      </div>
    </div>
  );
}
