import Footer from '@/components/landing/Footer';
import Navbar from '@/components/navbar';
export default function LandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
