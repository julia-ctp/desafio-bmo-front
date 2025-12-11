import React from "react";
import { NoticeContext } from "@/contexts/notices.context";

export const useNotices = () => {
  const useNoticesContext = React.useContext(NoticeContext);

  if (!useNoticesContext) {
    throw new Error("Notices context error");
  }
  return useNoticesContext;
};
