import CustomCursor from '@/components/CustomCursor';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import StatsBar from '@/components/StatsBar';
import ProofStrip from '@/components/ProofStrip';
import CredibilityBar from '@/components/CredibilityBar';
import PainSection from '@/components/PainSection';
import OfferSection from '@/components/OfferSection';
import WorkShowcase from '@/components/WorkShowcase';
import SocialProofSection from '@/components/SocialProofSection';
import AboutSection from '@/components/AboutSection';
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
      <SocialProofSection />
      <AboutSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;