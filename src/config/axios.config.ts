import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3000",
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    switch (status) {
      case 400:
        return Promise.reject({
          status,
          message: "Dados inválidos. Verifique os campos enviados.",
        });

      case 404:
        return Promise.reject({
          status,
          message: "Recurso não encontrado.",
        });

      case 500:
        return Promise.reject({
          status,
          message: "Erro interno no servidor. Tente novamente mais tarde.",
        });

      default:
        return Promise.reject(error);
    }
  }
);
