"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { LogIn } from "lucide-react";
import { type FieldErrors, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useMaskInput } from "use-mask-input";
import { useAuth } from "@/hook/auth.hook";
import { type LoginFormInput, loginFormSchema } from "@/schemas/auth.schema";
import type { ContactFormInput } from "@/schemas/contact.schema";
import { InputPassword } from "../shadcn-studio/input/input-26";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { FormField } from "./FormField";

export default function LoginForm() {
  const { handleSubmit, control, reset } = useForm<LoginFormInput>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      cpf: "",
      password: "",
    },
  });

  const { login } = useAuth();

  async function handleSubmitForm(data: LoginFormInput) {
    const result = await login(data);
    reset();

    if (result.success) {
      toast.success("Seja bem vindo!");
      return;
    }

    toast.error(result.error);
    return;
  }

  const cpfMask = useMaskInput({
    mask: ["999.999.999-99"],
  });

  const fieldLabels: Record<string, string> = {
    cpf: "CPF",
    password: "Senha",
  };

  function handleError(errors: FieldErrors<ContactFormInput>) {
    const errorFields = Object.keys(errors)
      .map((field) => fieldLabels[field])
      .join(", ");

    toast.error(`Erro no(s) campo(s): ${errorFields}`, {
      icon: null,
    });
  }

  return (
    <Card className="w-full max-w-md px-4 block py-8">

      <form onSubmit={handleSubmit(handleSubmitForm, handleError)}>
        <CardContent className="text-start text-sm font-medium flex flex-col gap-5">
          <FormField
            label="CPF"
            control={control}
            name="cpf"
            placeholder="000.000.000-00"
            maskRef={cpfMask}
          />

          <InputPassword
            name="password"
            label="Senha"
            placeholder="Digite sua senha"
            control={control}
          />
        </CardContent>

        <CardFooter className="mt-5">
          <Button className="w-full flex gap-2 items-center" type="submit">
            <LogIn className="w-4 h-4" />
            Entrar
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
