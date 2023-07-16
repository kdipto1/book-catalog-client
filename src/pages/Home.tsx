import React from "react";
import HomeBooks from "../components/Home/HomeBooks";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="mx-auto">
      <HomeBooks />
      <div className="border-dotted border-2 border-green-400"></div>
      {/* <div className="bg-white p-0.5"></div> */}
      <div className="text-center bg-green-400 py-6">
        <Link className="btn " to="/allBooks">
          All Books
        </Link>
      </div>
    </div>
  );
}
