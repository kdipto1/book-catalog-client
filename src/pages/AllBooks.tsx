import { useState } from "react";
import AllBooksPageBooks from "../components/AllBooks/AllBooksPageBooks";
import BooksSearchAndFiltering from "../components/AllBooks/BooksSearchAndFiltering";
import { Link } from "react-router-dom";

interface SearchFormData {
  searchTerm: string;
  genre: string;
  publicationYear: string;
}

export default function AllBooks() {
  const [searchData, setSearchData] = useState<SearchFormData>({
    searchTerm: "",
    genre: "",
    publicationYear: "",
  });

  console.log(searchData);
  const handleSearch = (data: SearchFormData) => {
    if (data) setSearchData(data);
  };
  return (
    <div>
      <div className="grid  grid-cols-5 gap-4 bg-yellow-400">
        <div className="col-start-1 col-end-1">
          <BooksSearchAndFiltering onSearch={handleSearch} />
          <div className="text-center mt-6">
            <Link className="btn btn-success text-white" to="/addNewBook">
              Add New Book
            </Link>
          </div>
        </div>
        <div className="col-start-2 col-end-6">
          <AllBooksPageBooks
            // setSearchData={setSearchData}
            searchData={searchData}
          />
        </div>
      </div>
    </div>
  );
}
