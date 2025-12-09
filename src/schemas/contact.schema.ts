import z from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(1),
  email: z.email(),
  phone: z
    .string()
    .min(12)
    .transform((val) => val.replace(/\D/g, "")),
  message: z.string().min(1),
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;
