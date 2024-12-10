"use client";

import { Control } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";
import { Input } from "./input";
import { FormFieldType } from "../forms/PatientForm";
import Image from "next/image";
import { useState } from "react";
import 'react-phone-number-input/style.css'
import PhoneInput from "react-phone-number-input/input";

interface CustomProps {
  control: Control<any>;
  fieldType: FormFieldType;
  name: string;
  label?: string;
  iconSrc?: string;
  iconAlt?: string;
  placeholder?: string;
  disabled?: boolean;
  dateFormat?: string;
  showTimeSelect?: boolean;
  children?: React.ReactNode;
  renderSkeleton?: (field: any) => React.ReactNode;
}

const RenderField = ({ field, props }: { field: any; props: CustomProps }) => {
  const { iconSrc, iconAlt, placeholder, fieldType, disabled } = props;
  const [value, setValue] = useState();
  switch (fieldType) {
    case FormFieldType.INPUT:
      return (
        <div className="flex rounded-md border border-dark-500 bg-dark-400">
          {iconSrc && (
            <Image
              src={iconSrc}
              alt={iconAlt || "icon"}
              width={24}
              height={24}
              className="ml-2"
            />
          )}
          <FormControl>
            <Input
              placeholder={placeholder}
              {...field}
              disabled={disabled}
              className="shad-input border-0"
            />
          </FormControl>
        </div>
      );
    case FormFieldType.CHECKBOX:
      return (
        <FormControl>
          <Input
            type="date"
            placeholder={placeholder}
            {...field}
            disabled={props.disabled}
            iconSrc={iconSrc}
            iconAlt={iconAlt}
            dateFormat={props.dateFormat}
          />
        </FormControl>
      );
    case FormFieldType.PHONE_INPUT:
      return (
        <FormControl>
          <PhoneInput
            defaultCountry="US"
            value={value}
            onChange={setValue}
            // placeholder={placeholder}
            className="shad-input border-0"

            // {...field}
          />
        </FormControl>
      );
  }
};

const CustomFormField = (props: CustomProps) => {
  const { control, fieldType, name, label, iconSrc, iconAlt, placeholder } =
    props;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex-1">
          {fieldType !== FormFieldType.CHECKBOX && label && (
            <FormLabel>{label}</FormLabel>
          )}
          <RenderField field={field} props={props} />
          <FormMessage className="shad-error" />
        </FormItem>
      )}
    />
  );
};

export default CustomFormField;
