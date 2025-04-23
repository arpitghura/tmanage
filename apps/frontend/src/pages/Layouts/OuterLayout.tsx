"use client";
import React from "react";
import { COOKIE_AUTH_TOKEN_KEY, USER_ID } from "@/lib/constants";
import cookies from "js-cookie";
import PublicLayout from "./PublicLayout";
import { useAppSelector } from "@/lib/hooks";
import ProtectedLayout from "./ProtectedLayout";

interface Props {
  children: React.ReactNode;
}

// const OuterLayout: React.FC<Props> = ({ children }) => {
//   let userId;
//   let isLogin = false;

//   const token = useAppSelector((state) => state.session.token);
//   const isLoggedIn = useAppSelector((state) => state.session.isLoggedIn);

//   useEffect(() => {
//     userId = cookies.get(USER_ID) || "";
//     isLogin =
//       token !== null &&
//       token !== undefined &&
//       token !== "" &&
//       userId !== "" &&
//       userId !== null &&
//       userId !== undefined;
//   }, [isLoggedIn, token]);

//   // useEffect(() => {
//   //   token = cookies.get(COOKIE_AUTH_TOKEN_KEY);
//   //   userId = cookies.get(USER_ID) || "";
//   //   isLogin = token !== null && token !== undefined && token !== "" && userId !== "" && userId !== null && userId !== undefined;
//   // }, [isLogin, cookies, token, userId]);

//   return isLoggedIn ? (
//     <ProtectedLayout>{children}</ProtectedLayout>
//   ) : (
//     <PublicLayout>{children}</PublicLayout>
//   );
// };

// New Below Version is written by ChatGPT

const OuterLayout: React.FC<Props> = ({ children }) => {
  const token = useAppSelector((state) => state.session.token);
  const isLoggedIn = useAppSelector((state) => state.session.isLoggedIn);

  return token && isLoggedIn ? (
    <ProtectedLayout>{children}</ProtectedLayout>
  ) : (
    <PublicLayout>{children}</PublicLayout>
  );
};


export default OuterLayout;
