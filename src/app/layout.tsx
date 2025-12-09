import Header from "@/components/Header";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="bg-muted" suppressHydrationWarning>
        <Header />
        {children}
      </body>
    </html>
  );
}
