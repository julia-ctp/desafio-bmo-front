"use client";

import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useId, useState } from "react";
import {
  type Control,
  Controller,
  type FieldValues,
  type Path,
} from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface InputPasswordProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  placeholder?: string;
  required?: boolean;
}

export const InputPassword = <T extends FieldValues>({
  name,
  control,
  label = "Password",
  placeholder = "Password",
  required = false,
}: InputPasswordProps<T>) => {
  const [isVisible, setIsVisible] = useState(false);
  const id = useId();

  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: required ? `${label} is required` : false }}
      render={({ field, fieldState: { error } }) => (
        <div className="w-full space-y-2">
          <Label htmlFor={id}>
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </Label>
          <div className="relative">
            <Input
              id={id}
              {...field}
              type={isVisible ? "text" : "password"}
              placeholder={placeholder}
              className={`pr-9 ${error ? "border-red-500" : ""}`}
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => setIsVisible((prevState) => !prevState)}
              className="text-muted-foreground focus-visible:ring-ring/50 absolute inset-y-0 right-0 rounded-l-none hover:bg-transparent"
            >
              {isVisible ? <EyeOffIcon /> : <EyeIcon />}
              <span className="sr-only">
                {isVisible ? "Hide password" : "Show password"}
              </span>
            </Button>
          </div>
        </div>
      )}
    />
  );
};
