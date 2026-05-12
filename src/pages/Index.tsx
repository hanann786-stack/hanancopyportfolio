import CustomCursor from '@/components/CustomCursor';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import StatsBar from '@/components/StatsBar';
import ProofStrip from '@/components/ProofStrip';
import CredibilityBar from '@/components/CredibilityBar';
import PainSection from '@/components/PainSection';
import OfferSection from '@/components/OfferSection';
import WorkShowcase from '@/components/WorkShowcase';
import ProcessSection from '@/components/ProcessSection';
import ManifestoSection from '@/components/ManifestoSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="bg-grain bg-dot-grid min-h-screen relative">
      <CustomCursor />
      <Navbar />
      <HeroSection />
      <StatsBar />
      <ProofStrip />
      <CredibilityBar />
      <PainSection />
      <OfferSection />
      <WorkShowcase />
      <ProcessSection />
      <ManifestoSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;