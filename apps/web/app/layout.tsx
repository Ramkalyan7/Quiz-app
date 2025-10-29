import "@repo/ui/styles.css";
import "./globals.css";
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import AppBar from "../components/AppBar";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Free AI Quiz Generator",
  description: "Free AI Quiz Generator",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geist.className} bg-slate-100`}>
        <AppBar />
        <div>{children}</div>
      </body>
    </html>
  );
}
