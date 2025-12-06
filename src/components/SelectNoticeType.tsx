import type { NoticeCreateInput } from "@/schemas/notice.schemas";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface SelectNoticeTypeProps {
  onChange: (value: NoticeCreateInput["type"]) => void;
  value: NoticeCreateInput["type"];
}
<SelectItem value={"nenhum"} />;
export default function SelectNoticeType({
  onChange,
  value,
}: SelectNoticeTypeProps) {
  return (
    <Select
      onValueChange={(v) => onChange?.(v as NoticeCreateInput["type"])}
      value={value !== "nenhum" ? value : ""}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Selecione um tipo" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup className="mb-2">
          <SelectItem value={"importante"}>Importante</SelectItem>
          <SelectItem value={"informativo"}>Informativo</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
