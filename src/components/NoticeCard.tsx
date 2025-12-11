"use client";

import { Calendar, Pencil, Trash } from "lucide-react";
import { useState } from "react";
import { useNotices } from "@/hook/notices.hook";
import type { NoticeItemResponse } from "@/schemas/notice.schemas";
import { formatDateTime } from "@/utils/formatDateTime";
import NoticeUpdateForm from "./forms/notice/NoticeUpdateForm";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";

interface NoticeCardProps {
  notice: NoticeItemResponse;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export default function NoticeCard({ notice }: NoticeCardProps) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const { deleteNotice } = useNotices();

  const handleEditClick = () => {
    setIsEditOpen(true);
  };

  async function handleDelete(id: string) {
    await deleteNotice(id);
  }

  return (
    <>
      <Card className="w-full max-w-xl lg:max-w-3xl my-3 mx-auto">
        <CardHeader className="flex justify-between items-start gap-2">
          <div className="flex items-center gap-2">
            {notice.type !== "nenhum" && (
              <Badge variant={notice.type}>{notice.type}</Badge>
            )}

            <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
              <Calendar className="w-3.5 h-3.5" />
              {formatDateTime(notice.updatedAt)}
            </span>
          </div>
        </CardHeader>

        <CardContent>
          <p className="text-sm sm:text-base wrap-break-words">
            {notice.content}
          </p>
        </CardContent>

        <CardFooter className="flex justify-between items-center">
          <span className="text-sm font-medium text-muted-foreground">
            {notice.employee.name} {notice.employee.lastName}
          </span>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleEditClick}
              className="flex items-center gap-1"
            >
              <Pencil className="w-4 h-4" />
              Editar
            </Button>

            <Button
              variant="destructive"
              size="sm"
              onClick={() => handleDelete(notice.id)}
              className="flex items-center gap-1"
            >
              <Trash className="w-4 h-4" />
              Excluir
            </Button>
          </div>
        </CardFooter>
      </Card>

      <NoticeUpdateForm
        isOpen={isEditOpen}
        setIsOpen={setIsEditOpen}
        noticeId={notice.id}
        initialData={notice}
      />
    </>
  );
}
