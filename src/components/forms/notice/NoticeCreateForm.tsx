"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useNotices } from "@/hook/notices.hook";
import {
  type NoticeCreateInput,
  NoticeCreateInputSchema,
} from "@/schemas/notice.schemas";
import { Button } from "../../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import { FormField } from "../FormField";

export default function NoticeCreateForm() {
  const form = useForm<NoticeCreateInput>({
    resolver: zodResolver(NoticeCreateInputSchema),
    defaultValues: {
      type: "nenhum",
      content: "",
    },
  });
  const { handleSubmit, control, formState, reset } = form;
  const { isValid } = formState;
  const [isOpen, setIsOpen] = React.useState(false);

  const { createNotice } = useNotices();

  async function handleCreateNotice(data: NoticeCreateInput) {
    const result = await createNotice(data);
    reset();
    setIsOpen(false);

    if (result.success) {
      toast.success("Aviso criado com sucesso!");
      return;
    }

    toast.error(result.error);
    return;
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
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
