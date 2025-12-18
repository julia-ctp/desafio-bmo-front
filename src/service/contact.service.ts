import type { AxiosInstance } from "axios";
import { api } from "@/config/axios.config";
import type { ContactFormInput } from "@/schemas/contact.schema";
import type { Result } from "@/types/Result";

export class ContactService {
  private instance: AxiosInstance = api;

  async postContact(data: ContactFormInput): Promise<Result<null>> {
    try {
      await this.instance.post("/contact", data);

      return { success: true, data: null };
    } catch (error: unknown) {
      const err = error as { status?: number; message: string };

      return {
        success: false,
        error: err.message ?? "Erro inesperado.",
      };
    }
  }
}

export const ContactServiceInstance = new ContactService();
