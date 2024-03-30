import Navbar from "@/components/NavBar";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main>
            <div className="main">
                <div className="gradient" />
            </div>

            <Navbar />
            {children}
        </main>
    );
}