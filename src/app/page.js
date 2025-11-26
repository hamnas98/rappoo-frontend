import Header from '@/components/landing/Header';
import Hero from '@/components/landing/Hero';
import BrandSection from '@/components/landing/BrandSection';
import About from '@/components/landing/About';
import Testimonials from '@/components/landing/Testimonials';
import FAQ from '@/components/landing/FAQ';
// import CTA from '@/components/landing/CTA';
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
        {/* <CTA />
        <Footer/> */}
    </main>
  );
};