import { fonts } from "@/lib/fonts";
import "./globals.css";
import type { Metadata } from "next";

/**
 * Root layout component for the Arise My Manhwa application.
 *
 * This layout wraps all pages and provides:
 * - Global CSS styles
 * - Custom font configuration using the Action Man font
 * - HTML metadata for SEO including title and description
 * - Basic HTML structure with language setting
 *
 * The layout uses Next.js 13+ app directory conventions:
 * - Metadata export for page information
 * - RootLayout component for consistent page structure
 * - Global CSS imports
 * - Font configuration from @/lib/fonts
 *
 * @param {Object} props - Component properties
 * @param {React.ReactNode} props.children - Child components to render within layout
 */

export const metadata: Metadata = {
  title: "ARISE : Turn Your Ideas Into Stories! Powered By Generative AI 😊",
  description:
    "Create captivating manhwa panels using a Large Language Model and Image Generation Model, powered by Hugging Face 🤗.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={fonts.actionman.className}>{children}</body>
    </html>
  );
}
