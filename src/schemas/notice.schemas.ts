import z from "zod";

const NoticeTypeEnum = z.enum(["informativo", "importante", "nenhum"]);

export const NoticeCreateInputSchema = z.object({
  type: NoticeTypeEnum,
  content: z.string().min(1, { message: "Por favor, digite seu aviso." }),
});

export const NoticeItemResponseSchema = z.object({
  id: z.string(),
  type: NoticeTypeEnum,
  content: z.string(),
  date: z.date(),
  author: z.string(),
});

export type NoticeCreateInput = z.infer<typeof NoticeCreateInputSchema>;
export type NoticeItemResponse = z.infer<typeof NoticeItemResponseSchema>;
