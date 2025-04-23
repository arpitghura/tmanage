import React, { Suspense } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  ListFilter,
  User,
  Cross,
  X,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { AllTaskByUserType } from "@/features/Dashboard/Dashboard";
import { getISTDateTimeFromUTC } from "@/utils/DateTime";
import { capitalizeFirstLetter } from "@/utils/stringFunctions";
import { useRouter } from "next/navigation";
import { TableSkeleton } from "./Loading";
import { CheckedState } from "@radix-ui/react-checkbox";
import { toast } from "react-toastify";

type TaskManagementProps = {
  allTasks: AllTaskByUserType[];
};

const TaskManagement: React.FC<TaskManagementProps> = ({ allTasks }) => {
  // Mock data for tasks
  // const tasks = [
  //   { id: '23be5d', title: 'First Task which is to design the table comp...', status: 'Pending', assignee: 'You', created: '12/10/2024 09:00', lastUpdated: 'Last Updated' },
  //   { id: '24ce5d', title: 'First Task which is to design the table comp...', status: 'Completed', assignee: 'You', created: '12/10/2024 09:00', lastUpdated: 'Last Updated' },
  //   { id: '33be5d', title: 'First Task which is to design the table comp...', status: 'Progress', assignee: 'You', created: '12/10/2024 09:00', lastUpdated: 'Last Updated' },
  //   ... add more mock tasks as needed
  // ];

  const router = useRouter();
  const [selectedTasks, setSelectedTasks] = React.useState<string[]>([]);

  const getStatusColor = (status: string) => {
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

  const handleNavigateToTask = (taskId: string) => {
    toast.success("Navigating to task");
    router.push(`/task/${taskId}`);
  };

  const handleCheckboxClick = (checked: CheckedState, value: string) => {
    if (checked) {
      const task = allTasks.find((task) => task.id === value);
      if (task) {
        setSelectedTasks([...selectedTasks, task.id]);
      }
    } else {
      const taskIndex = selectedTasks.findIndex((task) => task === value);
      if (taskIndex > -1) {
        const updatedTasks = [...selectedTasks];
        updatedTasks.splice(taskIndex, 1);
        setSelectedTasks(updatedTasks);
      }
    }
  };

  const handleEmptySelectedTasks = () => {
    setSelectedTasks([]);
  };

  return (
    <div className="p-4">
      {/* <h1 className="text-2xl font-semibold mb-2">Tasks</h1> */}
      <div>
        {selectedTasks?.length > 0 && (
          <div className="flex flex-row gap-4 items-center bg-gray-200 my-2 p-2 justify-between">
            <div className="flex flex-row gap-2 items-center">
              <Button variant="secondary" onClick={handleEmptySelectedTasks}>
                <X className="h-4 w-4" />
              </Button>
              <p>{selectedTasks.length} tasks selected</p>
            </div>

            <div className="flex flex-row items-center gap-2">
              <Select>
                <SelectTrigger className="w-[180px] border-gray-600">
                  <ListFilter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Change Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="destructive">Delete</Button>
            </div>
          </div>
        )}
      </div>
      <div className="mb-4 flex space-x-2 md:justify-between">
        <div className="relative max-w-md">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
          <Input type="text" placeholder="Search Task" className="pl-8" />
        </div>
        <div className="flex flex-row gap-2">
          <Select>
            <SelectTrigger className="w-[180px]">
              <ListFilter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-[180px]">
              <User className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Assignees" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="you">You</SelectItem>
              {/* Add more assignees as needed */}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Suspense fallback={<TableSkeleton />}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">
              <Checkbox/></TableHead>
              <TableHead>Task ID</TableHead>
              <TableHead className="flex-1">Task Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Assignee</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Last Updated</TableHead>
              {/* <TableHead>Actions</TableHead> */}
            </TableRow>
          </TableHeader>
          <TableBody>
            {allTasks?.map((task) => (
              <TableRow
                key={task?.id}
                className={`cursor-pointer hover:bg-gray-100 ${
                  selectedTasks.includes(task?.id) ? "bg-blue-100" : ""
                }`}
                onClick={() => handleNavigateToTask(task.id)}
              >
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <Checkbox
                    onCheckedChange={(checked: CheckedState) =>
                      handleCheckboxClick(checked, task.id)
                    }
                    checked={selectedTasks.includes(task.id)}
                  />
                </TableCell>
                <TableCell>{task?.id?.toString()?.substring(0, 8)}</TableCell>
                <TableCell>{task?.title}</TableCell>
                <TableCell>
                  <Badge
                    className={`${getStatusColor(
                      task?.status
                    )} cursor-pointer hover:bg-primary-foreground`}
                  >
                    {capitalizeFirstLetter(task.status)}
                  </Badge>
                </TableCell>
                <TableCell>
                  {/* {task?.assignee} */}
                  You
                </TableCell>
                <TableCell>
                  {getISTDateTimeFromUTC(task.createdAt?.toString())}
                </TableCell>
                <TableCell>{/* {task?.lastUpdated} */}</TableCell>
                {/* <TableCell>...</TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Suspense>
      <div className="my-4 flex justify-center items-center">
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <ChevronLeft className="h-4 w-4" />
            Prev
          </Button>
          <Button variant="outline" size="sm">
            1
          </Button>
          <Button variant="outline" size="sm">
            2
          </Button>
          <Button variant="outline" size="sm">
            ...
          </Button>
          <Button variant="outline" size="sm">
            5
          </Button>
          <Button variant="outline" size="sm">
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TaskManagement;
