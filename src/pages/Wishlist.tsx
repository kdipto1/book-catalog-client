import React from "react";
import { useGetWishlistQuery } from "../redux/features/user/userApi";

export default function Wishlist() {
  const { data } = useGetWishlistQuery(undefined);
  console.log(data);
  return <div>Wishlist</div>;
}
