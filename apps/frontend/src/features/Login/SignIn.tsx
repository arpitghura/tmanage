"use client";
import { useAppDispatch } from "@/lib/hooks";
import { useRouter } from "next/navigation";
import { updateLoginDetails } from "@/redux/slices/sessionSlice";
import { useLoginUserMutation } from "@/redux/queries/login.query";
import cookies from "js-cookie";
import { COOKIE_AUTH_TOKEN_KEY, COOKIE_EXPIRY, USER_ID } from "@/lib/constants";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { updateUserDetails } from "@/redux/slices/userSlice";

export function SignIn() {
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [loginError, setLoginError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loginUser] = useLoginUserMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((formData) => ({
      ...formData,
      [e.target.name]: e.target.value,
    }));
  };

  const validateInputs = () => {
    const email = formData.email;
    const password = formData.password;
    let isValid = true;

    if (email === "" || !/\S+@\S+\.\S+/.test(email)) {
      setEmailError(true);
      setEmailErrorMessage("Please enter a valid email address.");
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage("");
    }

    if (password === "" || password.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage("Password must be at least 6 characters long.");
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }

    return isValid;
  };

  const handleSubmit = async () => {
    //event.preventDefault();
    setIsLoading(true);
    if (!validateInputs()) {
      setIsLoading(false);
      return;
    }

    console.log(formData);

    try {
      const response = await loginUser(formData).unwrap();
      console.log(response, "res");

      if (response.statusCode === "0") {
        setLoginError(false);
        setErrorMessage("");
        const token:string = response.data.token;
        const userId:string = response.data.userId;
        const role:string = response.data.role;
        dispatch(updateLoginDetails({
          token: token,
          isLoggedIn: true
        }));
        cookies.set(COOKIE_AUTH_TOKEN_KEY, token, {
          expires: COOKIE_EXPIRY,
        })
        cookies.set(USER_ID, userId, {
          expires: COOKIE_EXPIRY,
        })
        dispatch(updateUserDetails({
          userId: userId,
          email: formData.email,
          role: role
        }));
        router.push("/dashboard");
      } else if (response.statusCode === "1") {
        setLoginError(true);
        setErrorMessage(response.message);
      }
    } catch (error) {
      console.log(error);
    }
    finally{
      setIsLoading(false);
    }
  };

  return (
    <Card className="mx-auto max-w-sm w-[400px]">
      <CardHeader>
        <CardTitle className="text-xl">Sign In</CardTitle>
        <CardDescription>Enter your information to Sign In</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              onChange={handleChange}
              placeholder="john.doe@example.com"
              required
            />
            {emailError && (
              <p className="text-destructive">{emailErrorMessage}</p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              name="password"
              onChange={handleChange}
              placeholder="Choose some strong password"
            />
            {passwordError && (
              <p className="text-destructive">{passwordErrorMessage}</p>
            )}
          </div>
          <div>
            {loginError && <p className="text-destructive">{errorMessage}</p>}
          </div>

          <Button type="button" className="w-full" onClick={handleSubmit} disabled={isLoading}>
            Sign In
          </Button>
          {/* <Button variant="outline" className="w-full">
            Sign In with Google
          </Button> */}
        </div>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="underline">
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
