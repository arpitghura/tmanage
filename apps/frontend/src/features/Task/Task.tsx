"use client";
import * as React from "react";
import { useRouter } from "next/navigation";
import { useTaskByIdMutation } from "@/redux/queries/task.query";
import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "react-toastify";
import { AllTaskByUserType } from "../Dashboard/Dashboard";
import { getISTDateTimeFromUTC } from "@/utils/DateTime";

type TaskCardProp = {
  taskId: string;
};

const getStatusColor = (status: string | undefined) => {
  switch (status) {
    case "pending":
      return "bg-yellow-200 text-yellow-800";
    case "completed":
      return "bg-green-200 text-green-800";
    case "in-progress":
      return "bg-blue-200 text-blue-800";
    default:
      return "bg-gray-200 text-gray-800";
  }
};

export const TaskCard: React.FC<TaskCardProp> = ({ taskId }) => {
  const [taskDetails, setTaskDetails] = useState<AllTaskByUserType>();
  const router = useRouter();
  const [triggerTaskByIdMutation] = useTaskByIdMutation();

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await triggerTaskByIdMutation(taskId);
      if (data.statusCode === "0") {
        setTaskDetails(data.data);
      } else {
        toast.error(data.message);
        router.back();
      }
      console.log("api data", data);
    };
    fetchData();
  }, [taskId, triggerTaskByIdMutation]);

  return (
    <div className="p-4">
      {taskDetails ? (
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">
              {taskDetails?.title}
            </CardTitle>
            <div className="flex justify-between items-center mt-2">
              <Badge className={getStatusColor(taskDetails?.status)}>
                {taskDetails?.status}
              </Badge>
              <span className="text-sm text-gray-500">
                Task ID: {taskDetails?.id}
              </span>
            </div>
          </CardHeader>
          <CardContent>
            <h3 className="text-lg font-semibold mb-2">Description</h3>
            <p className="text-gray-700 mb-4">{taskDetails?.description}</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold">Assignee</h4>
                <p>{taskDetails?.assignedToId}</p>
              </div>
              <div>
                <h4 className="font-semibold">Created</h4>
                <p>
                  {getISTDateTimeFromUTC(taskDetails?.createdAt?.toString())}
                </p>
              </div>
              <div>
                <h4 className="font-semibold">Last Updated</h4>
                <p>
                  {getISTDateTimeFromUTC(taskDetails?.updatedAt?.toString())}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <Skeleton className="h-16 w-1/4" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-10 w-2/4 mb-2" />
            <Skeleton className="h-10 w-3/4 mb-2" />
            <Skeleton className="h-10 w-2/3" />
          </CardContent>
        </Card>
      )}
    </div>
  );
};
