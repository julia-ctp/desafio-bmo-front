import { format } from "date-fns";
import { toZonedTime } from "date-fns-tz";

const TIMEZONE = "America/Sao_Paulo";

export function formatDateTime(input: string | Date): string {
  const date = input instanceof Date ? input : new Date(input);

  if (Number.isNaN(date.getTime())) {
    return "Data inválida";
  }

  const zoned = toZonedTime(date, TIMEZONE);

  return format(zoned, "dd/MM/yy HH:mm");
}
