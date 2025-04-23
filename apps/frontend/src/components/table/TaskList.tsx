import React, { useState } from "react";
import { Calendar, Clock, MessageSquare } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import TaskDetailDrawer from "../Dashboard/TaskDetailDrawer";

interface Task {
title: string;
duration: string;
comments: number;
priority: string;
dueDate: string;
description: string;
status: string;
project: string;
assignee: Assignees;
}

interface Assignees {
  name: string;
  avatar: string;
}

interface TaskListProps {
  tasks: Task[];
}

const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  const [selectedTask, setSelectedTask] = useState<Task>();
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setIsDrawerOpen(true);
  };

  return (
    <>
      <div className="space-y-4">
        {tasks.map((task, index) => (
          <Card
            key={index}
            className="p-4 cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => handleTaskClick(task)}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-medium">{task.title}</h3>
                <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Clock size={16} />
                    <span>{task.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MessageSquare size={16} />
                    <span>{task.comments}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar size={16} />
                    <span>{task.dueDate}</span>
                  </div>
                </div>
              </div>
              <Badge
                variant={task.priority === "High" ? "destructive" : "secondary"}
              >
                {task.priority} Priority
              </Badge>
            </div>
          </Card>
        ))}
      </div>
      <TaskDetailDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        task={selectedTask}
      />
    </>
  );
};

export default TaskList;
