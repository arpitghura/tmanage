// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
'use client';
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar } from "@/components/ui/avatar";
import { AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { EditIcon, PlusIcon, TrashIcon } from "lucide-react";

const DashboardTable: React.FC = () => {
  const [selectedTasks, setSelectedTasks] = useState<string[]>([]);
  const [tasks, setTasks] = useState([
    {
      id: "1",
      title: "Update User Authentication System",
      assignee: "Emily Parker",
      deadline: "2025-03-25",
      status: "IN PROGRESS",
      priority: "High",
    },
    {
      id: "2",
      title: "Implement New Dashboard Analytics",
      assignee: "Michael Chen",
      deadline: "2025-03-24",
      status: "TO DO",
      priority: "Medium",
    },
    {
      id: "3",
      title: "Optimize Database Performance",
      assignee: "Sarah Johnson",
      deadline: "2025-03-23",
      status: "TO DO",
      priority: "High",
    },
  ]);
  const taskStats = {
    total: 12,
    completed: 4,
    inProgress: 5,
    overdue: 3,
  };
  const chartOption = {
    animation: false,
    tooltip: {
      trigger: "item",
    },
    series: [
      {
        type: "pie",
        radius: ["70%", "90%"],
        avoidLabelOverlap: false,
        label: {
          show: false,
        },
        data: [
          {
            value: taskStats.completed,
            name: "Completed",
            itemStyle: { color: "#4CAF50" },
          },
          {
            value: taskStats.inProgress,
            name: "In Progress",
            itemStyle: { color: "#2196F3" },
          },
          {
            value: taskStats.overdue,
            name: "Overdue",
            itemStyle: { color: "#F44336" },
          },
        ],
      },
    ],
  };
  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Main Content */}
      <div className="flex">
        {/* Main Dashboard */}
        <main className="flex-1 p-3">
          {/* Welcome Section */}
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-1">
              Welcome back, Arpit!
            </h2>
            <p className="text-gray-500">Here's your task overview for today</p>
          </div>
          {/* Stats Overview */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="bg-gray-100 p-4 rounded-lg">
              <h3 className="text-gray-500 mb-2">Total Tasks</h3>
              <p className="text-3xl font-bold">{taskStats.total}</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg">
              <h3 className="text-gray-500 mb-2">Completed</h3>
              <p className="text-3xl font-bold text-green-500">
                {taskStats.completed}
              </p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg">
              <h3 className="text-gray-500 mb-2">In Progress</h3>
              <p className="text-3xl font-bold text-blue-500">
                {taskStats.inProgress}
              </p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg">
              <h3 className="text-gray-500 mb-2">Overdue</h3>
              <p className="text-3xl font-bold text-red-500">
                {taskStats.overdue}
              </p>
            </div>
          </div>

          {/* Task List */}
          <div className="bg-gray-100 rounded-lg">
            <div className="p-2 flex justify-between items-center">
              <h3 className="text-xl font-semibold">Task List</h3>
              <Button className="!rounded-button bg-blue-600 hover:bg-blue-700">
                <PlusIcon className="fas fa-plus mr-2"/>
                Add New Task
              </Button>
            </div>
            <ScrollArea className="">
              <table className="w-full">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="p-4 text-left">
                      <Checkbox />
                    </th>
                    <th className="p-2 text-left">Title</th>
                    <th className="p-2 text-left">Assignee</th>
                    <th className="p-2 text-left">Deadline</th>
                    <th className="p-2 text-left">Priority</th>
                    <th className="p-2 text-left">Status</th>
                    <th className="p-2 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.map((task) => (
                    <tr key={task.id} className="border-t border-gray-200">
                      <td className="p-4">
                        <Checkbox
                          checked={selectedTasks.includes(task.id)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedTasks([...selectedTasks, task.id]);
                            } else {
                              setSelectedTasks(
                                selectedTasks.filter((id) => id !== task.id)
                              );
                            }
                          }}
                        />
                      </td>
                      <td className="p-2">{task.title}</td>
                      <td className="p-2">
                        <div className="flex items-center gap-2">
                          <Avatar className="w-6 h-6">
                            <AvatarImage src="https://public.readdy.ai/ai/img_res/9f6e76bb1ec52bed467221711e40c0ee.jpg" />
                          </Avatar>
                          {task.assignee}
                        </div>
                      </td>
                      <td className="p-2">{task.deadline}</td>
                      <td className="p-2">
                        <span
                          className={`px-2 py-1 rounded text-xs ${
                            task.priority === "High"
                              ? "bg-red-500/20 text-red-500"
                              : task.priority === "Medium"
                                ? "bg-yellow-500/20 text-yellow-500"
                                : "bg-green-500/20 text-green-500"
                          }`}
                        >
                          {task.priority}
                        </span>
                      </td>
                      <td className="p-2">
                        <span
                          className={`px-2 py-1 rounded text-xs ${
                            task.status === "IN PROGRESS"
                              ? "bg-blue-500/20 text-blue-500"
                              : "bg-gray-500/20 text-gray-500"
                          }`}
                        >
                          {task.status}
                        </span>
                      </td>
                      <td className="p-2">
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="!rounded-button"
                          >
                            <EditIcon className="h-4 w-4"/>
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="!rounded-button text-red-500"
                          >
                            <TrashIcon className="h-4 w-4"/>
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </ScrollArea>
          </div>
        </main>
      </div>
    </div>
  );
};
export default DashboardTable;
