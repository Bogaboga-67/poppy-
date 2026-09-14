import type { Metadata } from "next";
import "./globals.css";
import { AppShell } from "@/presentation/components/AppShell";

export const metadata: Metadata = {
  title: "YouTube",
  description: "YouTube clone built with Next.js and clean architecture",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
