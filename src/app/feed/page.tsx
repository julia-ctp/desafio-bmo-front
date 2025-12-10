"use client";
import { useRouter } from "next/navigation";
import React from "react";
import NoticeCreateForm from "@/components/forms/notice/NoticeCreateForm";
import NoticeCard from "@/components/NoticeCard";
import { useAuth } from "@/hook/auth.hook";
import type { NoticeItemResponse } from "@/schemas/notice.schemas";

const initialNotices: NoticeItemResponse[] = [
  {
    id: "1",
    author: "Maria Santos",
    type: "importante",
    date: new Date("2025-12-05T14:00:00Z"),
    content:
      "Reunião de equipe amanhã às 14h na sala de conferências. Presença obrigatória de todos os departamentos.",
  },
  {
    id: "2",
    author: "João Silva",
    type: "nenhum",
    date: new Date("2025-12-05T14:00:00Z"),
    content:
      "Tem bolo de aniversário na geladeira do refeitório! Todos estão convidados a se servir.",
  },
  {
    id: "3",
    author: "Ana Oliveira",
    type: "informativo",
    date: new Date("2025-12-05T14:00:00Z"),
    content:
      "Lembrete: as solicitações de férias para janeiro devem ser enviadas até sexta-feira.",
  },
];

export default function Feed() {
  const router = useRouter();
  const { user } = useAuth();

  React.useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  return (
    <div className="h-full w-full flex flex-col items-center">
      <NoticeCreateForm />
      {initialNotices.map((notice) => (
        <NoticeCard key={notice.id} notice={notice} />
      ))}
    </div>
  );
}
