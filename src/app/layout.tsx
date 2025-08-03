import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StoreInitializer from "@/components/StoreInitializer";

export const metadata: Metadata = {
  title: "인생 RE:cut",
  description: "인생을 다시 편집하는 커뮤니티 플랫폼",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="min-h-screen bg-gray-100">
        <div className="flex flex-col min-h-screen">
          {/* 스토어 초기화 컴포넌트 */}
          <StoreInitializer />
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
