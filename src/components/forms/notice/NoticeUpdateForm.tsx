"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useNotices } from "@/hook/notices.hook";
import {
  type NoticeCreateInput,
  NoticeCreateInputSchema,
  type NoticeItemResponse,
  type NoticeUpdateInput,
} from "@/schemas/notice.schemas";
import { FormField } from "../FormField";

interface NoticeUpdateFormProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  noticeId: string;
  initialData: NoticeItemResponse;
}

export default function NoticeUpdateForm({
  isOpen,
  setIsOpen,
  noticeId,
  initialData,
}: NoticeUpdateFormProps) {
  const form = useForm<NoticeCreateInput>({
    resolver: zodResolver(NoticeCreateInputSchema),
    defaultValues: {
      type: initialData.type,
      content: initialData.content,
    },
  });
  const { handleSubmit, control, formState } = form;
  const { isValid } = formState;

  const { updateNotice } = useNotices();

  React.useEffect(() => {
    if (isOpen) {
      form.reset({
        type: initialData.type,
        content: initialData.content,
      });
    }
  }, [isOpen, initialData, form]);

  async function handleUpdateNotice(data: NoticeUpdateInput) {
    const result = await updateNotice( noticeId, data );
    setIsOpen(false);

     if (result.success) {
        toast.success("Aviso atualizado com sucesso!");
        return;
      }
  
      toast.error(result.error);
      return;
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-xs my-3" aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle className="text-center">Editar Aviso</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleUpdateNotice)}>
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
              Atualizar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
