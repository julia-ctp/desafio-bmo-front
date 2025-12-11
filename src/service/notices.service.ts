import { AxiosError, type AxiosInstance } from "axios";
import { api } from "@/config/axios.config";
import {
  type NoticeCreateInput,
  type NoticeList,
  type NoticeUpdateInput,
  noticeListSchema,
} from "@/schemas/notice.schemas";
import type { Result } from "@/types/Result";

export class NoticesService {
  private instance: AxiosInstance = api;

  async postNotice(data: NoticeCreateInput): Promise<Result<null>> {
    try {
      await this.instance.post("/notices", data);

      return { success: true, data: null };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async listNotices(): Promise<Result<NoticeList>> {
    try {
      const response = await this.instance.get("/notices");
      const parsed = noticeListSchema.safeParse(response.data);

      if (parsed.success) {
        return { success: true, data: response.data };
      }

      console.warn("Retorno inválido da API");

      return {
        success: false,
        error: "Ops! Tente novamente mais tarde.",
      };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async updateNotice(
    id: string,
    data: NoticeUpdateInput
  ): Promise<Result<null>> {
    try {
      await this.instance.put(`/notices/${id}`, data);

      return { success: true, data: null };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async deleteNotice(id: string): Promise<Result<null>> {
    try {
      await this.instance.delete(`/notices/${id}`);

      return { success: true, data: null };
    } catch (error) {
      return this.handleError(error);
    }
  }

  private handleError(error: unknown): Result<never> {
    if (error instanceof AxiosError && error.response?.status === 401) {
      return {
        success: false,
        error: "Você não está autorizado.",
      };
    }

    const err = error as { status?: number; message: string };

    return {
      success: false,
      error: err.message ?? "Erro inesperado.",
    };
  }
}

export const NoticesServiceInstance = new NoticesService();
