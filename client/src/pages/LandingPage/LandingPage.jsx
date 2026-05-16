import LandingNavbar from './landingNavbar.jsx';
import HeroSection from './heroSection.jsx';
import StatsSection from './statsSection.jsx';
import FeaturesSection from './featureSection.jsx';
import CTASection from './CTASection.jsx';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-battle-bg overflow-hidden">
      <LandingNavbar />
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <CTASection />
    </div>
  );
}