"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SignIn } from "./SignIn";
import { SignUp } from "./SignUp";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export const SignInSignUp = () => {

  const searchParam = useSearchParams();
  const [currentTab, setCurrentTab] = useState("signin");

  useEffect(() => {
    const tab = searchParam?.get("tab") || "signin";
    setCurrentTab(tab);
  }, [searchParam]);

  const handleChangeTab = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setCurrentTab(e.currentTarget.name);
  }

  return (
    <div className="w-full lg:grid lg:min-h-[400px] lg:grid-cols-2 xl:min-h-[600px]">
      <div className="hidden bg-muted lg:block">
        {/* <Image
          src="https://placehold.co/1920x1080"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        /> */}
        <img
          src="https://placehold.co/1920x1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
      <div className="flex justify-center mt-10">
        <Tabs value={currentTab} className="flex flex-col items-center">
          <TabsList className="h-[50px] border mb-5">
            <TabsTrigger value="signin" className="w-[150px] h-[40px]" name="signin" onClick={handleChangeTab}>
              Sign In
            </TabsTrigger>
            <TabsTrigger value="signup" className="w-[150px] h-[40px]" name="signup" onClick={handleChangeTab}>
              Sign Up
            </TabsTrigger>
          </TabsList>
          <TabsContent value="signin">
            <SignIn />
          </TabsContent>
          <TabsContent value="signup">
            <SignUp />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
