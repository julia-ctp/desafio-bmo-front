import { AxiosError, type AxiosInstance } from "axios";
import { api } from "@/config/axios.config";
import {
  type LoginFormInput,
  type LoginResponse,
  loginResponseSchema,
} from "@/schemas/auth.schema";
import type { Result } from "@/types/Result";

export class AuthService {
  private instance: AxiosInstance = api;

  async login(data: LoginFormInput): Promise<Result<LoginResponse>> {
    try {
      const response = await this.instance.post<LoginResponse>("/login", data);

      const parsed = loginResponseSchema.safeParse(response.data);

      if (parsed.success) {
        return {
          success: true,
          data: response.data,
        };
      }

      console.warn("Retorno inválido da API");

      return {
        success: false,
        error: "Ops! Tente novamente mais tarde.",
      };
    } catch (error: unknown) {
      if (error instanceof AxiosError && error.response?.status === 401) {
        return {
          success: false,
          error: "Credenciais inválidas. Verifique CPF e senha.",
        };
      }

      const err = error as { status?: number; message: string };

      if (err.status === 404) {
        return {
          success: false,
          error: "Usuário não cadastrado.",
        };
      }

      return {
        success: false,
        error: err.message ?? "Erro inesperado",
      };
    }
  }
}

export const AuthServiceInstance = new AuthService();
