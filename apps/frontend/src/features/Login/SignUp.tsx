"use client";
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
import { useRouter } from "next/navigation";
import { useState } from "react";
import {toast} from "react-toastify";
import { useSignupUserMutation } from "@/redux/queries/login.query";

export function SignUp() {
  const [nameError, setNameError] = useState(false);
  const [nameErrorMessage, setNameErrorMessage] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [loginError, setLoginError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [signupUser] = useSignupUserMutation();
  const router = useRouter();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((formData) => ({
      ...formData,
      [e.target.name]: e.target.value,
    }));
  };

  const validateInputs = () => {
    const fName = formData.first_name;
    const lName = formData.last_name;
    const email = formData.email;
    const password = formData.password;
    let isValid = true;

    if(fName === "" || lName === ""){
      setNameError(true);
      setNameErrorMessage("Enter Your Name");
      isValid = false;
    }
    else {
      setNameError(false);
      setNameErrorMessage("");
    }

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
    if (!validateInputs()) {
      return;
    }

    console.log(formData);

    try {
      const response = await signupUser(formData).unwrap();
      console.log(response, "res");

      if (response.statusCode === "0") {
        setLoginError(false);
        setErrorMessage("");
        toast.success(response.message);
        router.push("/");
      } else if (response.statusCode === "1") {
        setLoginError(true);
        setErrorMessage(response.message);
      }

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card className="mx-auto max-w-sm w-[400px]">
      <CardHeader>
        <CardTitle className="text-xl">Sign Up</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="first_name">First name</Label>
              <Input
                id="first_name"
                name="first_name"
                placeholder="John"
                required
                onChange={handleChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="last_name">Last name</Label>
              <Input
                id="last_name"
                name="last_name"
                placeholder="Doe"
                required
                onChange={handleChange}
              />
            </div>
            {nameError && (
              <p className="text-destructive">{nameErrorMessage}</p>
            )}
          </div>
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
          <Button type="button" className="w-full" onClick={handleSubmit}>
            Create an account
          </Button>
          {/* <Button variant="outline" className="w-full">
            Sign up with GitHub
          </Button> */}
        </div>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link href="/signin" className="underline">
            Sign in
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
