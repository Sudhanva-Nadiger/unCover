import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default function ViewResumeLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { userId } = auth();

    if(!userId) {
        redirect('/sign-in')
    }

    return (
        <div className="flex flex-col items-center justify-center">
            {children}
        </div>
    );
}