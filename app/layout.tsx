import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";

import { UploadModalProvider } from "@/components/providers/UploadModalProvider";
import { Toaster } from "@/components/ui/toaster";
import { getUserSubscriptionPlan } from "@/lib/actions/stripeActions";
import { cn, generateMetaData } from "@/lib/utils";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metaddata = generateMetaData();

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isSubscribed } = await getUserSubscriptionPlan()

  return (
    <ClerkProvider>
      <html lang="en">
        <body className={cn(inter.className, 'w-full min-h-screen')}>
          {children}

          <Toaster />
          <UploadModalProvider isSubscribed={isSubscribed} />
        </body>
      </html>
    </ClerkProvider>
  );
}
