import z from "zod";

const NoticeTypeEnum = z.enum(["informativo", "importante", "nenhum"]);

export const NoticeCreateInputSchema = z.object({
  type: NoticeTypeEnum,
  content: z.string().min(1, { message: "Por favor, digite seu aviso." }),
});

export const noticeUpdateSchema = NoticeCreateInputSchema.extend({});

export const NoticeItemResponseSchema = z.object({
  id: z.string(),
  employeeId: z.string(),
  type: NoticeTypeEnum,
  content: z.string(),
  createdAt: z.coerce.date().transform((d) => new Date(d)),
  updatedAt: z.string().transform((d) => new Date(d)),
  employee: z.object({
    id: z.string(),
    name: z.string(),
    lastName: z.string(),
  }),
});

export const noticeListSchema = z.array(NoticeItemResponseSchema);

export type NoticeCreateInput = z.infer<typeof NoticeCreateInputSchema>;
export type NoticeUpdateInput = z.infer<typeof noticeUpdateSchema>;
export type NoticeItemResponse = z.infer<typeof NoticeItemResponseSchema>;
export type NoticeList = z.infer<typeof noticeListSchema>;
