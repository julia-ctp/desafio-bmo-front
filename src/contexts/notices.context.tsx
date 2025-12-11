"use client";

import React from "react";
import type {
  NoticeCreateInput,
  NoticeItemResponse,
  NoticeUpdateInput,
} from "@/schemas/notice.schemas";
import { NoticesServiceInstance } from "@/service/notices.service";
import type { Result } from "@/types/Result";

interface NoticeContextProps {
  notices: NoticeItemResponse[];
  fetchNotices: () => Promise<void>;
  createNotice: (data: NoticeCreateInput) => Promise<Result<null>>;
  updateNotice: (
    id: string,
    data: NoticeUpdateInput
  ) => Promise<Result<null>>;
  deleteNotice: (id: string) => Promise<Result<null>>;
}

export const NoticeContext = React.createContext<NoticeContextProps | null>(
  null
);

export const NoticeProvider = ({ children }: { children: React.ReactNode }) => {
  const [notices, setNotices] = React.useState<NoticeItemResponse[]>([]);

  const fetchNotices = React.useCallback(async () => {
    const result = await NoticesServiceInstance.listNotices();

    if (result.success) {
      setNotices(result.data);
    }
  }, []);

  async function createNotice(data: NoticeCreateInput) {
    const result = await NoticesServiceInstance.postNotice(data);
    await fetchNotices();
    return result;
  }

  async function updateNotice(id: string, data: NoticeUpdateInput) {
    const result = await NoticesServiceInstance.updateNotice(id, data);
    await fetchNotices();
    return result;
  }

  async function deleteNotice(id: string) {
    const result = await NoticesServiceInstance.deleteNotice(id);
    await fetchNotices();
    return result ;
  }

  return (
    <NoticeContext.Provider
      value={{
        notices,
        fetchNotices,
        createNotice,
        updateNotice,
        deleteNotice
      }}
    >
      {children}
    </NoticeContext.Provider>
  );
};
