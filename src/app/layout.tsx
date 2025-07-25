import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PayDown",
  description: "A tool to help you plan your student loan payments.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        {children}
      </body>
    </html>
  );
}
