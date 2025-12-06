import { Calendar } from "lucide-react";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";

export interface Notice {
  id: string;
  name: string;
  type: "importante" | "informativo";
  date: string;
  content: string;
}

interface NoticeCardProps {
  notice: Notice;
}

export default function NoticeCard({ notice }: NoticeCardProps) {
  return (
    <Card className="w-full max-w-xl lg:max-w-3xl my-3 mx-auto">
      <CardHeader className="flex gap-2">
        <Badge>{notice.type}</Badge>
        <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
          <Calendar className="w-3.5 h-3.5" />
          {notice.date}
        </span>
      </CardHeader>

      <CardContent>
        <p className="text-sm sm:text-base wrap-break-words">
          {notice.content}
        </p>
      </CardContent>
      <CardFooter>
        <span className="text-sm font-medium text-muted-foreground">
          {notice.name}
        </span>
      </CardFooter>
    </Card>
  );
}
