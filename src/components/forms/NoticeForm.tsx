"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  type NoticeCreateInput,
  NoticeCreateInputSchema,
} from "@/schemas/notice.schemas";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Toaster } from "../ui/sonner";
import { FormField } from "./FormField";

export default function NoticeForm() {
  const form = useForm<NoticeCreateInput>({
    resolver: zodResolver(NoticeCreateInputSchema),
    defaultValues: {
      type: "nenhum",
      content: "",
    },
  });
  const { handleSubmit, control, formState, reset } = form;
  const { isValid } = formState;

  function handleCreateNotice(data: NoticeCreateInput) {
    console.log(data);
    reset();
    toast.success("Aviso criado com sucesso!");
  }

  return (
    <Dialog>
      <Toaster richColors position="top-center" />
      <DialogTrigger asChild>
        <Button type="button" className="my-3">
          <Plus />
          Criar novo aviso
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-xs my-3">
        <DialogHeader>
          <DialogTitle className="text-center">Novo Aviso</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleCreateNotice)}>
          <FormField
            name="type"
            control={control}
            label="Tipo de aviso"
            as="select"
          />

          <FormField
            name="content"
            label="Aviso"
            control={control}
            placeholder="Digite seu aviso"
            as="textarea"
          />

          <DialogFooter>
            <Button disabled={!isValid} type="submit" className="w-full my-5">
              Enviar
            </Button>
          </DialogFooter>
        </form>

      </DialogContent>
    </Dialog>
  );
}
