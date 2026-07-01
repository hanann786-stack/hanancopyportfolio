import CustomCursor from '@/components/CustomCursor';
import SideNav from '@/components/SideNav';
import HeroSection from '@/components/HeroSection';
import StatsBar from '@/components/StatsBar';
import ProofStrip from '@/components/ProofStrip';
import OfferSection from '@/components/OfferSection';
import WorkShowcase from '@/components/WorkShowcase';
import ProcessSection from '@/components/ProcessSection';
import ManifestoSection from '@/components/ManifestoSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import NotForYouSection from '@/components/NotForYouSection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="bg-dot-grid min-h-screen relative">
      <CustomCursor />
      <SideNav />
      <HeroSection />
      <StatsBar />
      <ProofStrip />
      <ManifestoSection />
      <OfferSection />
      <WorkShowcase />
      <ProcessSection />
      <TestimonialsSection />
      <NotForYouSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
