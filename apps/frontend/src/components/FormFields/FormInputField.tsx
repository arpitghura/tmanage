import React from "react";
import { FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { FormControl } from "@mui/material";
import { Input } from "../ui/input";

export interface FormInputFieldTypes {
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
  customComponent?: any;
}

const FormInputField = ({
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
  customComponent,
  ...rest
}: FormInputFieldTypes) => {
  return (
    <FormField
      control={control}
      name={name}
      rules={rules}
      defaultValue={defaultValue}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>
            {label}
            {required && <span className="text-red-500 ml-0.5">*</span>}
          </FormLabel>
          <FormControl>
            {type === "custom" && customComponent ? (
              customComponent
            ) : (
              <Input
                placeholder={placeholder}
                type={type}
                required={required}
                hidden={hidden}
                {...field}
              />
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormInputField;
