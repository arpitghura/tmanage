import React from 'react'
import cookies from 'js-cookie';
import { COOKIE_AUTH_TOKEN_KEY, USER_ID } from '@/lib/constants';
import { ReactNode } from 'react';

import Sidebar from '@/components/Navigation/Sidebar';
import TopBar from '@/components/Navigation/TopMenu';
import { useAppSelector } from '@/lib/hooks';
import { usePathname } from "next/navigation";
import useRoleAccess from "@/hooks/useRoleAccess";
import Unauthorized from '@/app/unauthorized/page';
import OuterLayout from './OuterLayout';

// const ProtectedLayout = ({ children }: { children: ReactNode }) => {

//   const token = cookies.get(COOKIE_AUTH_TOKEN_KEY);
//   const userId = cookies.get(USER_ID) || "";
  
//   return (
//     <div className="flex h-screen bg-gray-50">
//       <Sidebar />
//       <div className="flex-1 flex flex-col overflow-hidden">
//         <TopBar />
//         <main className="flex-1 overflow-auto p-4">
//           {children}
//         </main>
//       </div>
//     </div>
//   );
// };

// CHatGPT Version

// const ProtectedLayout = ({ children }: { children: ReactNode }) => {
//   const role = useAppSelector((state) => state.user.role);

//   const allowedRoles = ["admin", "manager", "user"];

//   // if (!allowedRoles.includes(role)) {
//   //   redirect("/unauthorized");
//   //   return null;
//   // }

//   return (
//     <div className="flex h-screen bg-gray-50">
//       <Sidebar />
//       <div className="flex-1 flex flex-col overflow-hidden">
//         <TopBar />
//         <main className="flex-1 overflow-auto p-4">{children}</main>
//       </div>
//     </div>
//   );
// };

const ProtectedLayout = ({ children }: { children: ReactNode }) => {
  // const { checkAccess } = useRoleAccess();
  // const path = usePathname();

  // const isAccessible = checkAccess(path as string);

  // if (!isAccessible) return (
  //   <OuterLayout>
  //     <Unauthorized />
  //   </OuterLayout>
  // )
  
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar />
        <main className="flex-1 overflow-auto p-1">{children}</main>
      </div>
    </div>
  );
};


export default ProtectedLayout;
