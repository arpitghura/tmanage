import React, { useEffect, useState } from "react";
import {
  Search,
  Plus,
  Share2,
  Trash2,
  MoreHorizontal,
  User,
  Mail,
  LayoutDashboard,
  UserRoundPen,
  Bolt,
  LogOut,
} from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { COOKIE_AUTH_TOKEN_KEY, USER_ID } from "@/lib/constants";
import cookies from "js-cookie";
import { resetLoginDetails, updateLoginDetails } from "@/redux/slices/sessionSlice";
import { useLogoutUserByTokenMutation } from "@/redux/queries/login.query";
import { TaskDialog } from "../CreateTask/CreateTaskDialog";
import { TaskFormData } from "../CreateTask/types";
import { useGetUserDataQuery } from "@/redux/queries/user.query";
import { resetUserDetails, updateUserDetails } from "@/redux/slices/userSlice";

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const store = makeStore();
//   const userId = cookies.get(USER_ID) || "";

//   await store.dispatch(UserQueries.endpoints.getUserData.initiate(userId));

//   return {
//     props: {
//       initialReduxState: store.getState(),
//       userId,
//     },
//   };
// };

const TopBar = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const token = cookies.get(COOKIE_AUTH_TOKEN_KEY);
  const [logoutUser] = useLogoutUserByTokenMutation();
  const storedUserData = useAppSelector((state) => state.user);

  if (!storedUserData.userId) {
    router.push("/");
  }

  const {
    data: userData,
    error,
    isLoading,
  } = useGetUserDataQuery(storedUserData.userId as string);

  useEffect(() => {
    if (userData && userData.statusCode === "0") {
      console.log("User Profile Data", userData);
      dispatch(
        updateUserDetails({
          userId: userData.data.userId,
          email: userData.data.email,
          role: userData.data.role,
          first_name: userData.data.first_name,
          last_name: userData.data.last_name,
        })
      );
    }
  }, [userData]);

  const handleLogout = async () => {
    const data = await logoutUser(token).unwrap();
    if (data.statusCode === "0") {
      toast.success(data.message, {
        autoClose: 1000,
      });
      // 2. Update the state after successful logout
      dispatch(resetLoginDetails());
      dispatch(resetUserDetails());
      cookies.remove(COOKIE_AUTH_TOKEN_KEY);
      cookies.remove(USER_ID);
      // 3. Redirect to the login page
      router.push("/");
    } else {
      toast.error(data.message, {
        autoClose: 1000,
      });
    }
  };

  const handleOpenTaskModal = () => {
    router.push("/task/create");
  };

  const [dialogOpen, setDialogOpen] = useState(false);

  const handleSubmit = (data: TaskFormData) => {
    console.log("Form submitted:", data);
    setDialogOpen(false);
  };

  const mockUsers = [
    { id: "1", name: "John Doe" },
    { id: "2", name: "Jane Smith" },
    { id: "3", name: "Bob Johnson" },
  ];
  return (
    <>
      <div className="h-16 border-b border-gray-200 bg-white flex items-center justify-between px-4">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search tasks or enter command..."
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-xs text-sm"
            />
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="default"
            className="flex items-center space-x-2"
            onClick={() => setDialogOpen(true)}
          >
            <Plus size={20} />
            <span>New Task</span>
          </Button>
          {/* <Button variant="ghost" size="icon">
          <Share2 size={20} />
        </Button>
        <Button variant="ghost" size="icon">
          <Trash2 size={20} />
        </Button>
        <Button variant="ghost" size="icon">
          <MoreHorizontal size={20} />
        </Button> */}
          <DropdownMenu>
            <DropdownMenuTrigger className="outline-none">
              <Avatar>
                <AvatarImage src="" alt="User avatar" />
                <AvatarFallback>
                  {storedUserData.first_name?.charAt(0).toUpperCase()}{storedUserData.last_name?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mr-4 select-none cursor-pointer">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuLabel className="flex gap-1 items-center font-normal pt-1 pb-0">
                <User size={16} />
                {`${storedUserData.first_name} ${storedUserData.last_name}`}
              </DropdownMenuLabel>
              <DropdownMenuLabel className="flex gap-1 items-center font-normal pt-1 pb-1">
                <Mail size={16} />
                {`${storedUserData.email}`}
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
        </div>
      </div>
      <TaskDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSubmit={handleSubmit}
        users={mockUsers}
      />
    </>
  );
};

export default TopBar;


{/* <header className="h-16 border-b border-gray-200 flex items-center px-6 justify-between">
<div className="flex items-center gap-4">
  <h1 className="text-xl font-semibold">TManage</h1>
</div>
<div className="flex items-center gap-4">
  <Input
    type="search"
    placeholder="Search tasks..."
    className="w-64 bg-gray-100 border-none text-sm"
  />
  <Button className="!rounded-button bg-blue-600 hover:bg-blue-700">
    Upgrade Pro
  </Button>
  <Avatar className="w-8 h-8">
    <AvatarImage src="https://public.readdy.ai/ai/img_res/09d8ad8e8bb948dfad44e0cfc2f5ac13.jpg" />
  </Avatar>
</div>
</header> */}