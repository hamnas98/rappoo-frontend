import Header from '@/components/landing/Header';
import Hero from '@/components/landing/Hero';
import BrandSection from '@/components/landing/BrandSection';
import About from '@/components/landing/About';
import Testimonials from '@/components/landing/Testimonials';
import FAQ from '@/components/landing/FAQ';
import Offer from '@/components/landing/Offer';
// import Footer from '@/components/landing/Footer';


export default function Home() {
  return (
    <main className="min-h-screen bg-[#f8f8f8]">
      <Header/>
       <Hero />
        <BrandSection />
        <About />
        <Testimonials />
        <FAQ />
        <Offer/>
    </main>
  );
};