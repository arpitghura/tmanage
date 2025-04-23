"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { X } from "lucide-react";
import { MarkdownEditor } from "../MarkDownEditor/MarkDownEditor";
import { useCreateTaskMutation } from "@/redux/queries/task.query";
import { toast } from "react-toastify";
import cookies from "js-cookie";
import { COOKIE_AUTH_TOKEN_KEY } from "@/lib/constants";

interface TaskFormData {
  title: string;
  description: string;
  status: string;
}

interface CreateTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const initialValues: TaskFormData = {
  title: "",
  description: "",
  status: "pending",
};

export const CreateTaskModal: React.FC<CreateTaskModalProps> = ({
  isOpen,
  onClose,
}) => {
  const form = useForm<TaskFormData>({
    defaultValues: initialValues,
  });

  const { control, handleSubmit, reset } = form;
  const token = cookies.get(COOKIE_AUTH_TOKEN_KEY);
  const [createTask] = useCreateTaskMutation();

  const onSubmit = async (data: TaskFormData) => {
    const payload = {
      title: data.title,
      description: data.description,
      status: data.status || "pending",
    };

    try {
      const response = await createTask(payload).unwrap();
      if (response.statusCode === "0") {
        toast.success(response.message);
        reset();
        onClose();
      } else if (response.statusCode === "1") {
        toast.error(response.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[90vw] h-[90vh] max-w-[90vw] max-h-[90vh]">
        <DialogHeader className="relative">
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0 top-0"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
          <DialogTitle className="text-xl font-semibold">Create New Task</DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto mt-4 pr-4">
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={control}
                name="title"
                rules={{ required: "Title is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter task title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="description"
                rules={{ required: "Description is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <MarkdownEditor
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="status"
                rules={{ required: "Status is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="progress">In Progress</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">
                Create Task
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Example usage in parent component:
/*
import { CreateTaskModal } from './CreateTaskModal';

const ParentComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsModalOpen(true)}>Create New Task</Button>
      <CreateTaskModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
};
*/