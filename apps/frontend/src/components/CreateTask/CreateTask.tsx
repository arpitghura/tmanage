// export const CreateTaskForm = () => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<TaskFormValues>();

//   const [editorValue, setEditorValue] = useState("");

//
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

"use client";
import React from "react";
import { useForm, Controller } from "react-hook-form";
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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { MarkdownEditor } from "../MarkDownEditor/MarkDownEditor";
import { useAppSelector } from "@/lib/hooks";
import cookies from "js-cookie";
import { COOKIE_AUTH_TOKEN_KEY } from "@/lib/constants";

import axios from "axios";
import { useCreateTaskMutation } from "@/redux/queries/task.query";
import { toast } from "react-toastify";

interface TaskFormData {
  title: string;
  description: string;
  status: string;
}

const initialValues: TaskFormData = {
  title: "",
  description: "",
  status: "pending",
};

export const CreateTaskForm: React.FC = () => {
  const form = useForm<TaskFormData>({
    defaultValues: initialValues,
  });

  const { control, handleSubmit } = form;
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
      } else if (response.statusCode === "1") {
        toast.error(response.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-[90%] mx-auto">
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
  );
};
