import { Calendar } from "lucide-react";
import type { NoticeItemResponse } from "@/schemas/notice.schemas";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";

interface NoticeCardProps {
  notice: NoticeItemResponse;
}

export default function NoticeCard({ notice }: NoticeCardProps) {
  return (
    <Card className="w-full max-w-xl lg:max-w-3xl my-3 mx-auto">
      <CardHeader className="flex gap-2">
        {notice.type !== "nenhum" && <Badge variant={notice.type}>{notice.type}</Badge>}
        <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
          <Calendar className="w-3.5 h-3.5" />
          {notice.date.toLocaleDateString("pt-BR")}
        </span>
      </CardHeader>

      <CardContent>
        <p className="text-sm sm:text-base wrap-break-words">
          {notice.content}
        </p>
      </CardContent>
      <CardFooter>
        <span className="text-sm font-medium text-muted-foreground">
          {notice.author}
        </span>
      </CardFooter>
    </Card>
  );
}
