import "@repo/ui/styles.css";
import "./globals.css";
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import AppBar from "../components/AppBar";
import SideBar from "../components/SideBar";

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
      <body className={geist.className}>
        <AppBar />
        <div className="flex flex-row ">
          <SideBar />
          <div className="w-full pt-20">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
