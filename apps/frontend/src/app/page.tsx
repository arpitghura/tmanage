"use client";
import HomePage from "@/features/HomePage/Home";
import React from "react";
import cookies from "js-cookie";
import { COOKIE_AUTH_TOKEN_KEY } from "@/lib/constants";
import MainDashboard from "@/components/Dashboard/Dashboard";
import DashboardTable from "@/components/Dashboard/DashboardTable";

export default function Home() {
  const token = cookies.get(COOKIE_AUTH_TOKEN_KEY);
  const isLogin = token !== null && token !== undefined;
  return isLogin ? <DashboardTable /> : <HomePage />;
}
