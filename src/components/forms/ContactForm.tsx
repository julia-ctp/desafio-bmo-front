"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { type FieldErrors, useForm } from "react-hook-form";
import { Toaster, toast } from "sonner";
import { useMaskInput } from "use-mask-input";
import {
  type ContactFormInput,
  contactFormSchema,
} from "@/schemas/contact.schema";
import { useContact } from "../../hook/contact.hook";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { FormField } from "./FormField";

export default function ContactForm() {
  const { createContact } = useContact();
  const { handleSubmit, control, reset } = useForm<ContactFormInput>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  async function handleSubmitForm(data: ContactFormInput) {
    await createContact(data);

    reset();
    toast.success("Entraremos em contato em breve!");
  }

  const phoneMask = useMaskInput({
    mask: ["(99) 99999-9999"],
  });

  const fieldLabels: Record<string, string> = {
    name: "Nome",
    email: "E-mail",
    phone: "Telefone",
    message: "Mensagem",
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
    <Card className="w-full max-w-xl lg:max-w-3xl my-3 mx-auto">
      <Toaster richColors position="top-center" />
      <form onSubmit={handleSubmit(handleSubmitForm, handleError)}>
        <CardContent className="text-start text-sm font-medium flex flex-col gap-5">
          <FormField
            label="Nome completo"
            control={control}
            name="name"
            placeholder="Seu nome"
          />

          <FormField
            label="E-mail"
            name="email"
            control={control}
            placeholder="seu@email.com"
          />

          <FormField
            label="Telefone"
            control={control}
            name="phone"
            placeholder="(00) 00000-0000"
            maskRef={phoneMask}
          />

          <FormField
            as="textarea"
            name="message"
            control={control}
            label="Mensagem"
            placeholder="Sua mensagem..."
          />
        </CardContent>

        <CardFooter className="mt-5">
          <Button className="w-full" type="submit">
            Enviar Mensagem
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
