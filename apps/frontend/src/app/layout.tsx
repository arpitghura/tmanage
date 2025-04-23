import type { Metadata } from "next";
import "./globals.css";
import { GlobalProviders } from "../pages/Providers/GlobalProvider";
import { ToastContainer } from "react-toastify";

import "@fontsource/roboto/100.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "react-toastify/dist/ReactToastify.css";
import { TopLoader } from "@/components/TopLoader";
import OuterLayout from "@/pages/Layouts/OuterLayout";

export const metadata: Metadata = {
  title: "TManage",
  description:
    "A Platform to Manage task - espacially build for startups, companies focused on managing their team efficiently.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head></head>
      <body>
        <GlobalProviders>
          <TopLoader />
          <OuterLayout>{children}</OuterLayout>
          <ToastContainer position="top-right" />
        </GlobalProviders>
      </body>
    </html>
  );
}
