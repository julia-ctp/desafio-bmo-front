import Header from "@/components/Header";
import "./globals.css";
import { Toaster } from "sonner";
import { AuthProvider } from "@/contexts/auth.context";
import { NoticeProvider } from "@/contexts/notices.context";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="bg-muted min-h-screen w-full" suppressHydrationWarning>
        <AuthProvider>
          <NoticeProvider>
            <Header />
            <Toaster richColors position="top-center" />
            {children}
          </NoticeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
