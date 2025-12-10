import type { AxiosInstance } from "axios";
import { api } from "@/config/axios.config";
import type { ContactFormInput } from "@/schemas/contact.schema";

export class ContactService {
  private instance: AxiosInstance = api;

  async postContact(data: ContactFormInput) {
    try {
      const response = await this.instance.post("/contact", data);
      console.log(response);

      return response;
    } catch (error) {
      console.log(error);
    }
  }
}

export const ContactServiceInstance = new ContactService();
