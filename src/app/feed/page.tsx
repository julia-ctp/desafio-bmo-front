import NoticeForm from "@/components/forms/NoticeForm";
import NoticeCard, { type Notice } from "@/components/NoticeCard";

const initialNotices: Notice[] = [
  {
    id: "1",
    name: "Maria Santos",
    type: "importante",
    date: "05/12/2024",
    content:
      "Reunião de equipe amanhã às 14h na sala de conferências. Presença obrigatória de todos os departamentos.",
  },
  {
    id: "2",
    name: "João Silva",
    type: "informativo",
    date: "05/12/2024",
    content:
      "Tem bolo de aniversário na geladeira do refeitório! Todos estão convidados a se servir.",
  },
  {
    id: "3",
    name: "Ana Oliveira",
    type: "informativo",
    date: "04/12/2024",
    content:
      "Lembrete: as solicitações de férias para janeiro devem ser enviadas até sexta-feira.",
  },
];

export default function Feed() {
  return (
    <div className="h-screen flex flex-col items-center mx-3">
      <NoticeForm />
      {initialNotices.map((notice) => (
        <NoticeCard key={notice.id} notice={notice} />
      ))}
    </div>
  );
}
