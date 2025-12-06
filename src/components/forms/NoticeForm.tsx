"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  type NoticeCreateInput,
  NoticeCreateInputSchema,
} from "@/schemas/notice.schemas";
import SelectNoticeType from "../SelectNoticeType";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Toaster } from "../ui/sonner";
import { Textarea } from "../ui/textarea";

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
    toast.success("Aviso criado com sucesso!")
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
          <div>
            <Label className="mb-2" htmlFor="noticeType">
              Tipo de aviso
            </Label>
            <Controller
              name="type"
              control={control}
              render={({ field }) => (
                <SelectNoticeType
                  onChange={field.onChange}
                  value={field.value}
                />
              )}
            />
          </div>

          <div className="mt-5">
            <Label htmlFor="notice" className="mb-2">
              Aviso
            </Label>
            <Controller
              name="content"
              control={control}
              render={({ field }) => (
                <Textarea
                  id="notice"
                  placeholder="Digite seu aviso aqui."
                  onChange={field.onChange}
                  value={field.value}
                />
              )}
            />
          </div>
          <DialogFooter>
            <Button
              disabled={!isValid}
              type="submit"
              className="w-full my-5"
            >
              Enviar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
