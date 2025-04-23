"use client";
import { FormInputs } from "@/components/FormFields/FormInputs";
import { MarkdownEditor } from "@/components/MarkDownEditor/MarkDownEditor";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { COOKIE_AUTH_TOKEN_KEY } from "@/lib/constants";
import { useCreateTaskMutation } from "@/redux/queries/task.query";
import Cookies from "js-cookie";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface TeamFormData {
  team_name: string;
  team_lead_name: string;
  team_lead_email: string;
  team_members: string;
  team_email: string;
  status: string;
  team_description: string;
  team_org: string;
  team_location: string;
  team_type: string;
}

const initialValues: TeamFormData = {
  team_name: "",
  team_lead_name: "",
  team_lead_email: "",
  team_members: "",
  team_email: "",
  status: "pending",
  team_description: "",
  team_org: "",
  team_location: "",
  team_type: "",
};

const fields = [
  {
    name: "team_lead_name",
    label: "Team Lead Name",
    placeholder: "Enter team lead name",
    type: "text",
    required: true,
  },
  {
    name: "team_lead_email",
    label: "Team Lead Email",
    placeholder: "Enter team lead email",
    type: "email",
    required: true,
  },
  {
    name: "team_members",
    label: "Team Members",
    placeholder: "Enter team members",
    type: "text",
    required: true,
  },
  {
    name: "team_email",
    label: "Team Email",
    placeholder: "Enter team email",
    type: "email",
    required: false,
    hidden: true,
  },
  {
    name: "team_org",
    label: "Team Organization",
    placeholder: "Enter team organization",
    type: "text",
    required: false,
    hidden: true,
  },
  {
    name: "team_location",
    label: "Team Location",
    placeholder: "Enter team location",
    type: "text",
    required: true,
  },
  {
    name: "team_type",
    label: "Team Type",
    placeholder: "Enter team type",
    type: "text",
    required: true,
  },
];

export const CreateTeam: React.FC = () => {
  const form = useForm<TeamFormData>({
    defaultValues: initialValues,
  });

  const { control, handleSubmit } = form;
  const token = Cookies.get(COOKIE_AUTH_TOKEN_KEY);
  const [createTask] = useCreateTaskMutation();

  const onSubmit = async (data: TeamFormData) => {
    const payload = {
      team_name: data.team_name,
      team_lead_name: data.team_lead_name,
      team_lead_email: data.team_lead_email,
      team_members: data.team_members,
      team_email: data.team_email,
      status: data.status,
      team_description: data.team_description,
      team_org: data.team_org,
      team_location: data.team_location,
      team_type: data.team_type,
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
    <div className="max-w-[90%] mx-auto py-4">
        <h1 className="text-xl font-semibold w-full py-4">Create Team</h1>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <FormInputs fields={fields} control={control} />

          <Button type="submit" className="w-full">
            Create Team
          </Button>
        </form>
      </Form>
    </div>
  );
};
