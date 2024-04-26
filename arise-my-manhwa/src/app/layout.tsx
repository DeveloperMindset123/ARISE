import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { fonts } from "@/lib/fonts";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ARISE : Turn Your Ideas Into Stories! Powered By Generative AI 😊",
  description: "Create captivating manhwa panels using a Large Language Model and Stable Diffusion XL, powered by Hugging Face 🤗.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={fonts.actionman.className}>{children}</body>
    </html>
  );
}
