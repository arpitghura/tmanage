"use client";
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TaskList from "../table/TaskList";
import { CreateTaskModal } from "../CreateTask/CreateTaskModal";

const tasks = [
  {
    title: "Schedule An Appointment With My Endocrinologist",
    duration: "2 Days left",
    comments: 17,
    priority: "High",
    dueDate: "Jul 14, 24",
    description:
      "Schedule and attend an appointment with an endocrinologist to evaluate and address any issues related to hormonal imbalances or endocrine disorders.",
    status: "In Progress",
    project: "Event Planning",
    assignee: {
      name: "Jenifer Anniston",
      avatar: "/avatars/01.png",
    },
  },
  // Add more tasks as needed
];

const MainDashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  // onClick={() => setIsModalOpen(true)}
  return (
    <div className="mx-auto">
      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="list">List</TabsTrigger>
          <TabsTrigger value="board">Board</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="mt-6">
          <TaskList tasks={tasks} />
        </TabsContent>
        {/* Add other tab contents as needed */}
      </Tabs>

      <CreateTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default MainDashboard;
