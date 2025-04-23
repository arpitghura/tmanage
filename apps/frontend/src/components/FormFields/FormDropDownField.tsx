import React from "react";
import { FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { FormControl } from "@mui/material";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export interface DropDownOptionTypes {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface FormDropDownFieldTypes {
  name: string;
  label: string;
  placeholder: string;
  type: string;
  error?: any;
  control?: any;
  defaultValue?: any;
  rules?: any;
  required?: boolean;
  hidden?: boolean;
  options?: DropDownOptionTypes[];
}

export const FormDropDownField = ({
  name,
  label,
  placeholder,
  type,
  error,
  control,
  defaultValue,
  rules,
  required,
  hidden,
  options,
  ...rest
}: FormDropDownFieldTypes) => {
  return (
    <FormField
      control={control}
      name={name}
      rules={rules}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value} required={required}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options?.map((option, index) => (
                <SelectItem key={index} value={option.value} disabled={option?.disabled || false}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
