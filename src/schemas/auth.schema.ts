import z from "zod";

export const loginFormSchema = z.object({
  cpf: z.string().min(1),
  password: z.string(),
});

export type LoginFormInput = z.infer<typeof loginFormSchema>;
