import { Header } from "@/widgets/header/Header";
import { Footer } from "@/widgets/footer/Footer";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="p-[15px]">
        <Header />
        <main className="min-h-screen max-w-[1250px] w-full mx-auto px-[15px]">{children}</main>
      </div>
      <Footer />
    </>
  );
}
