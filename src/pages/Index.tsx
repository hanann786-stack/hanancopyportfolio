import ParticleBackground from '@/components/ParticleBackground';
import CustomCursor from '@/components/CustomCursor';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import PainSection from '@/components/PainSection';
import SocialProofSection from '@/components/SocialProofSection';
import WorkShowcase from '@/components/WorkShowcase';
import OfferSection from '@/components/OfferSection';
import AboutSection from '@/components/AboutSection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="bg-grain min-h-screen relative">
      <ParticleBackground />
      <CustomCursor />
      <Navbar />
      <HeroSection />
      <PainSection />
      <SocialProofSection />
      <WorkShowcase />
      <OfferSection />
      <AboutSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
