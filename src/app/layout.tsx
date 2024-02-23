import "@/styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nicholas Ly",
  description: "Nicholas Ly is a software developer based out of the greater Chicago area building performant web applications and open-source projects.",
  authors: [{ name: "Nicholas Ly", url: "https://nicholasly.com/" }],
  keywords: ["nicholas", "ly", "portfolio", "software", "developer", "engineer", "web", "nextjs", "react"],
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased dark:bg-neutral-900 dark:text-white m-6`}>
        {children}
      </body>
    </html>
  );
}
