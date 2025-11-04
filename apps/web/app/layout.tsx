import "@repo/ui/styles.css";
import "./globals.css";
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import AppBar from "../components/AppBar";
import { Providers } from "./providers";
import { ToastContainer } from "react-toastify";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Free AI Quiz Generator",
  description: "Free AI Quiz Generator",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geist.className} `}>
        <ToastContainer />
        <Providers>
          <AppBar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
