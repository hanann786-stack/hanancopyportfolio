import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ResultsBar from '@/components/ResultsBar';
import WorkSamples from '@/components/WorkSamples';
import PracticeWork from '@/components/PracticeWork';
import ServicesList from '@/components/ServicesList';
import TestimonialsSection from '@/components/TestimonialsSection';
import AboutSection from '@/components/AboutSection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';

const Index = () => (
  <div className="min-h-screen">
    <Helmet>
      <link rel="canonical" href="https://hanancopyportfolio.lovable.app/" />
    </Helmet>
    <Navbar />

    <main>
      <HeroSection />
      <ResultsBar />
      <WorkSamples />
      <PracticeWork />
      <ServicesList />
      <TestimonialsSection />
      <AboutSection />
      <CTASection />
    </main>
    <Footer />
  </div>
);

export default Index;
