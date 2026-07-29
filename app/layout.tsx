import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "José Rizal | Personal & Professional Social Profiles",
  description:
    "A fact-checked educational reconstruction of José Rizal's Facebook-style personal profile and LinkedIn-style professional profile.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
