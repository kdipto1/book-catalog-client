import React from "react";
import { useParams } from "react-router-dom";
import { useGetSingleBookQuery } from "../redux/features/book/bookApi";
import { PropagateLoader } from "react-spinners";

export default function BookDetails() {
  const id = useParams();

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { data, isLoading, isError } = useGetSingleBookQuery(id.id);
  if (isLoading) return <PropagateLoader color="#36d7b7" />;
  console.log(data);
  return <div></div>;
}
