import React from "react";
import { ReactNode } from "react";
import { Navbar } from "@/components/Navigation";
import Footer from "@/features/HomePage/Footer";

const PublicLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col h-screen w-full">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default PublicLayout;
