import type { ContactFormInput } from "@/schemas/contact.schema";
import { ContactServiceInstance } from "@/service/contact.service";

export const useContact = () => {
  async function createContact(data: ContactFormInput) {
    return await ContactServiceInstance.postContact(data)
  }

  return {
    createContact
  }
};
