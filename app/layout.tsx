import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/NavBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "unCover",
  description: "Everything you need while applying for a job at one place.",
  icons: ["/logo.png"]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main>
          <div className="main">
            <div className="gradient" />
          </div>

          <Navbar />
          {children}
        </main>
      </body>
    </html>
  );
}
