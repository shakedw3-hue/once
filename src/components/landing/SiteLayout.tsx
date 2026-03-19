import Header from "./Header";
import Footer from "./Footer";

export default function SiteLayout({ children, wide }: { children: React.ReactNode; wide?: boolean }) {
  return (
    <>
      <Header />
      <main className={`mx-auto px-5 pt-20 pb-12 sm:pt-24 sm:pb-16 ${wide ? "max-w-6xl" : "max-w-3xl"}`}>
        {children}
      </main>
      <Footer />
    </>
  );
}
