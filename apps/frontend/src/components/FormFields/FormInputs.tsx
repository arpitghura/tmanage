import React from "react";
import FormInputField, { FormInputFieldTypes } from "./FormInputField";
import { FormDropDownField } from "./FormDropDownField";

interface FormInputsInterface {
  fields: FormInputFieldTypes[];
  control: any;
}

export const FormInputs = ({ fields, control }: FormInputsInterface) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {fields.map((field, index) =>
        field?.hidden && !field?.required ? null : field?.type === "select" ? (
          <FormDropDownField key={index} control={control} {...field} />
        ) : (
          <FormInputField key={index} control={control} {...field} />
        )
      )}
    </div>
  );
};
