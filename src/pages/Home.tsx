import React from "react";
import HomeBooks from "../components/Home/HomeBooks";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="mx-auto">
      <HomeBooks />
      <Link className="btn " to="/allBooks">
        All Books
      </Link>
    </div>
  );
}
