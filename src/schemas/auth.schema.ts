import z from "zod";

export const loginFormSchema = z.object({
  cpf: z
    .string()
    .transform((cpf) => cpf.replace(/\D/g, ""))
    .refine((cpf) => cpf.length === 11, {
      message: "CPF deve ter 11 dígitos",
    }),
  password: z.string().min(1, "Senha obrigatória"),
});

export type LoginFormInput = z.infer<typeof loginFormSchema>;

export const loginResponseSchema = z.object({
  message: z.string(),
  response: z.object({
    token: z.string(),
    employee: z.object({
      id: z.string(),
      name: z.string(),
      lastName: z.string(),
    }),
  }),
});

export type LoginResponse = z.infer<typeof loginResponseSchema>;
