import React, { ReactNode } from "react";
import { useAppSelector } from "../redux/hook";
import { Navigate, useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";

interface IProps {
  children: ReactNode;
}

export default function PrivateRoutes({ children }: IProps) {
  const { accessToken } = useAppSelector((state) => state.userState);
  const { pathname } = useLocation();
  if (!accessToken) {
    return (
      toast("Please login, to continue"),
      (<Navigate to="/login" state={{ path: pathname }} />)
    );
  }

  return <>{children}</>;
}
