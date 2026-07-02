import Nav from '@/components/Nav';
import HeroSection from '@/components/HeroSection';
import StatementSection from '@/components/StatementSection';
import WorkSection from '@/components/WorkSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import ServicesSection from '@/components/ServicesSection';
import ProcessSection from '@/components/ProcessSection';
import AboutSection from '@/components/AboutSection';
import ContactSection from '@/components/ContactSection';

const Index = () => (
  <div className="min-h-screen">
    <Nav />
    <HeroSection />
    <StatementSection />
    <WorkSection />
    <TestimonialsSection />
    <ServicesSection />
    <ProcessSection />
    <AboutSection />
    <ContactSection />
  </div>
);

export default Index;
