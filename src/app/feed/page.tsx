"use client";
import { useRouter } from "next/navigation";
import React from "react";
import NoticeCreateForm from "@/components/forms/notice/NoticeCreateForm";
import NoticeCard from "@/components/NoticeCard";
import { useAuth } from "@/hook/auth.hook";
import { useNotices } from "@/hook/notices.hook";

export default function Feed() {
  const router = useRouter();
  const { user } = useAuth();
  const { notices, fetchNotices } = useNotices();

    React.useEffect(() => {
    fetchNotices()
  }, [fetchNotices])

  React.useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  return (
    <div className="h-full w-full flex flex-col items-center">
      <NoticeCreateForm />
      {notices.map((notice) => (
        <NoticeCard key={notice.id} notice={notice} />
      ))}
    </div>
  );
}
