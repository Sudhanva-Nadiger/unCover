import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";

import { UploadModalProvider } from "@/components/providers/UploadModalProvider";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import { generateMetaData } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metaddata = generateMetaData();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          {children}

          <Toaster />
          <UploadModalProvider />
        </body>
      </html>
    </ClerkProvider>
  );
}
