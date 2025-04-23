import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";

export const Navbar: React.FC = () => {
  const router = useRouter();

  const handlegotoSignIn = () => {
    router.push("/signin");
  };

  const handlegotoRegister = () => {
    router.push("/signup");
  };

  // const handleCreateTask = () => {
  //   router.push("/task/create");
  // };

  // const handleLogout = async () => {
  //   const data = await logoutUser(token).unwrap();
  //   if (data.statusCode === "0") {
  //     toast.success(data.message, {
  //       autoClose: 1000,
  //     });
  //     // 2. Update the state after successful logout
  //     dispatch(updateLoginDetails({ token: "", isLoggedIn: false }));
  //     cookies.remove(COOKIE_AUTH_TOKEN_KEY);
  //     // 3. Redirect to the login page
  //     router.push("/");
  //   } else {
  //     toast.error(data.message, {
  //       autoClose: 1000,
  //     });
  //   }
  // };

  return (
    <header className="mb-2 px-4 py-3 shadow-md sticky top-0 z-50 bg-white">
      <div className="container mx-auto flex justify-between items-center">
        <Link className="text-2xl font-bold" href="/">
          TManage
        </Link>
        <nav className="hidden md:flex space-x-4">
          <Link href="/" className="text-gray-600 hover:text-gray-900">
            Home
          </Link>
          <Link href="#features" className="text-gray-600 hover:text-gray-900">
            Features
          </Link>
          <Link
            href="#testimonials"
            className="text-gray-600 hover:text-gray-900"
          >
            Testimonials
          </Link>
          <Link href="#contact" className="text-gray-600 hover:text-gray-900">
            Contact
          </Link>
        </nav>
        <div className="flex items-center space-x-2">
          {/* {isLoggedIn && !userError ? (
            <>
              <Button onClick={handleCreateTask}>Create Task</Button>
              <DropdownMenu>
                <DropdownMenuTrigger className="outline-none">
                  <Avatar>
                    <AvatarImage src="" alt="User avatar" />
                    <AvatarFallback>
                      {userData?.data?.email?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="mr-2 select-none cursor-pointer">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuLabel className="flex gap-1 items-center font-normal pt-1 pb-0">
                    <User size={16} />
                    {`${userData?.data?.first_name} ${userData?.data?.last_name}`}
                  </DropdownMenuLabel>
                  <DropdownMenuLabel className="flex gap-1 items-center font-normal pt-1 pb-1">
                    <Mail size={16} />
                    {`${userData?.data?.email}`}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="flex gap-1 cursor-pointer"
                    onClick={() => router.push("/dashboard")}
                  >
                    <LayoutDashboard size={16} />
                    Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex gap-1 cursor-pointer">
                    <UserRoundPen size={16} />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex gap-1 cursor-pointer">
                    <Bolt size={16} />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="flex gap-1 text-destructive hover:cursor-pointer"
                  >
                    <LogOut size={16} />
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <> */}
          <Button variant="ghost" onClick={handlegotoSignIn}>
            Sign in
          </Button>
          <Button onClick={handlegotoRegister}>Register</Button>
          {/* </>
          )} */}
        </div>
      </div>
    </header>
  );
};
