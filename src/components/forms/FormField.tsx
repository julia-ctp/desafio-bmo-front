"use client";

import {
  type Control,
  Controller,
  type FieldValues,
  type Path,
} from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import SelectNoticeType from "../SelectNoticeType";

type FieldProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  label: string;
  placeholder?: string;
  as?: "input" | "textarea" | "select";
  // maskRef?: React.RefCallback<HTMLInputElement>;
  maskRef?: React.Ref<HTMLInputElement>;
};

export function FormField<T extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  as = "input",
  maskRef
}: FieldProps<T>) {
  return (
    <div>
      <label htmlFor={name} className="block mb-1.5 ml-0.5">
        {label}
      </label>

      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          if (as === "textarea") {
            return (
              <Textarea
                id={name}
                placeholder={placeholder}
                {...field}
              />
            );
          }

          if (as === "select") {
            return <SelectNoticeType {...field} />;
          }

          return (
            <Input id={name} placeholder={placeholder} {...field} ref={maskRef} />
          );
        }}
      />
    </div>
  );
}
