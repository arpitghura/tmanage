// import React from 'react';
// import { Layout, MessageSquare, FileText, Receipt, Settings, HelpCircle } from 'lucide-react';
// import { ScrollArea } from '@/components/ui/scroll-area';

// const Sidebar = () => {
//   const menuItems = [
//     { icon: Layout, label: 'Dashboard', active: true },
//     { icon: Layout, label: 'Projects' },
//     { icon: Layout, label: 'Meal Planner' },
//     { icon: MessageSquare, label: 'Chats' },
//     { icon: FileText, label: 'Documents' },
//     { icon: Receipt, label: 'Receipts' },
//   ];

//   const projects = [
//     { label: 'Event Planning', color: 'bg-pink-200' },
//     { label: 'Breakfast Plan', color: 'bg-cyan-200' },
//   ];

//   return (
//     <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
//       <div className="p-4 border-b border-gray-200">
//         <h1 className="text-xl font-semibold">Mondays</h1>
//       </div>
//       <ScrollArea className="flex-1">
//         <nav className="p-4">
//           {menuItems.map((item, index) => (
//             <div
//               key={index}
//               className={`flex items-center space-x-3 p-2 rounded-lg mb-1 ${
//                 item.active ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'
//               }`}
//             >
//               <item.icon size={20} />
//               <span>{item.label}</span>
//             </div>
//           ))}

//           <div className="mt-6">
//             <h2 className="text-sm font-semibold mb-2">Projects</h2>
//             {projects.map((project, index) => (
//               <div
//                 key={index}
//                 className="flex items-center space-x-3 p-2 rounded-lg mb-1 hover:bg-gray-100"
//               >
//                 <div className={`w-3 h-3 rounded ${project.color}`} />
//                 <span>{project.label}</span>
//               </div>
//             ))}
//           </div>
//         </nav>
//       </ScrollArea>
//       <div className="p-4 border-t border-gray-200">
//         <div className="flex items-center space-x-3 p-2 text-gray-700 hover:bg-gray-100 rounded-lg">
//           <Settings size={20} />
//           <span>Settings</span>
//         </div>
//         <div className="flex items-center space-x-3 p-2 text-gray-700 hover:bg-gray-100 rounded-lg">
//           <HelpCircle size={20} />
//           <span>Help & Support</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;

// components/Sidebar.jsx
import React, { useState } from "react";
import {
  Layout,
  MessageSquare,
  FileText,
  Receipt,
  Settings,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  Notebook,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [activeItem, setActiveItem] = useState("Dashboard");

  const menuItems = [
    { icon: Layout, label: "Dashboard" },
    { icon: Layout, label: "Projects" },
    { icon: Layout, label: "Meal Planner" },
    { icon: MessageSquare, label: "Chats" },
    { icon: FileText, label: "Documents" },
    { icon: Receipt, label: "Receipts" },
  ];

  const projects = [
    { label: "Event Planning", color: "bg-pink-200" },
    { label: "Breakfast Plan", color: "bg-cyan-200" },
  ];

  const handleItemClick = (label: string) => {
    setActiveItem(label);
  };

  return (
    <div
      className={cn(
        "bg-white border-r border-gray-200 flex flex-col transition-all duration-300",
        isCollapsed ? "w-16" : "w-44"
      )}
    >
      <div className="h-16 p-4 border-b border-gray-200 flex justify-between items-center">
        {!isCollapsed ? (
          <h1 className="text-xl font-semibold tracking-wide">TManage</h1>
        ) : (
          <Notebook size={24} />
        )}
      </div>

      <ScrollArea className="flex-1">
        <nav
          className={cn(
            "p-2",
            isCollapsed && "flex flex-col items-center gap-2"
          )}
        >
          {menuItems.map((item, index) => (
            <div
              key={index}
              onClick={() => handleItemClick(item.label)}
              className={cn(
                "flex items-center space-x-3 p-2 rounded-lg cursor-pointer transition-colors",
                activeItem === item.label
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-gray-100",
                isCollapsed && "justify-center w-10 h-10 p-0"
              )}
              title={isCollapsed ? item.label : undefined}
            >
              <item.icon size={isCollapsed ? 18 : 20} />
              {!isCollapsed && <span>{item.label}</span>}
            </div>
          ))}

          {!isCollapsed && (
            <div className="mt-6">
              <h2 className="text-sm font-semibold mb-2">Projects</h2>
              {projects.map((project, index) => (
                <div
                  key={index}
                  onClick={() => handleItemClick(project.label)}
                  className={cn(
                    "flex items-center space-x-3 p-2 rounded-lg mb-1 cursor-pointer hover:bg-gray-100",
                    activeItem === project.label && "bg-blue-600 text-white"
                  )}
                >
                  <div
                    className={cn(
                      "w-3 h-3 rounded",
                      project.color,
                      activeItem === project.label && "opacity-75"
                    )}
                  />
                  <span>{project.label}</span>
                </div>
              ))}
            </div>
          )}
        </nav>
      </ScrollArea>

      <div
        className={cn(
          "border-t border-gray-200 flex flex-col ",
          isCollapsed ? "p-0" : "p-4"
        )}
      >
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={cn("hover:bg-gray-100", isCollapsed && "mx-auto")}
        >
          {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </Button>
        {["Settings", "Support"].map((item, index) => (
          <div
            key={index}
            onClick={() => handleItemClick(item)}
            className={cn(
              "flex items-center space-x-3 p-2 rounded-lg my-1 cursor-pointer",
              activeItem === item
                ? "bg-blue-600 text-white"
                : "text-gray-700 hover:bg-gray-100",
              isCollapsed && "justify-center w-10 h-10 p-0 mx-auto"
            )}
            title={isCollapsed ? item : undefined}
          >
            {index === 0 ? (
              <Settings size={isCollapsed ? 18 : 20} />
            ) : (
              <HelpCircle size={isCollapsed ? 18 : 20} />
            )}
            {!isCollapsed && <span>{item}</span>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;


{/* <aside className="w-48 border-r border-gray-200 h-[calc(100vh-4rem)] p-4">
          <nav className="space-y-2">
            <Button
              variant="ghost"
              className="w-full justify-start gap-2 !rounded-button"
            >
              <i className="fas fa-home"></i>
              Dashboard
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start gap-2 !rounded-button"
            >
              <i className="fas fa-tasks"></i>
              My Tasks
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start gap-2 !rounded-button"
            >
              <i className="fas fa-calendar"></i>
              Calendar
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start gap-2 !rounded-button"
            >
              <i className="fas fa-chart-bar"></i>
              Reports
            </Button>
          </nav>
        </aside> */}