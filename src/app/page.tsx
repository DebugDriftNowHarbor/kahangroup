import React, { useEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Navbar } from '../components/home/Navbar';
import { HeroSection } from '../components/home/HeroSection';
import { FounderSection } from '../components/home/FounderSection';
import { PillarsSection } from '../components/home/PillarsSection';
import { BusinessesSection } from '../components/home/BusinessesSection';
import { MetricsSection } from '../components/home/MetricsSection';
import { ProcessSection } from '../components/home/ProcessSection';
import { ContactSection } from '../components/home/ContactSection';

interface HomePageProps {
  isOverlayOpen?: boolean;
  onSelectEcosystem: (slug: string) => void;
  onOpenCollaboration: (sectorPrefill?: string) => void;
}

/**
 * صفحه اصلی — اسکرول آزاد سینمایی با بخش‌های تیره و روشن متناوب.
 */
export const HomePage: React.FC<HomePageProps> = ({
  isOverlayOpen = false,
  onSelectEcosystem,
  onOpenCollaboration,
}) => {
  // بازمحاسبه تریگرهای اسکرول پس از باز/بسته شدن اورلی‌ها
  useEffect(() => {
    const t = window.setTimeout(() => ScrollTrigger.refresh(), 350);
    return () => window.clearTimeout(t);
  }, [isOverlayOpen]);

  const openCollab = () => onOpenCollaboration();

  return (
    <>
      <Navbar onOpenCollaboration={openCollab} />
      <HeroSection onOpenCollaboration={openCollab} />
      <FounderSection />
      <PillarsSection />
      <BusinessesSection onSelectEcosystem={onSelectEcosystem} />
      <MetricsSection />
      <ProcessSection />
      <ContactSection onOpenCollaboration={openCollab} onSelectEcosystem={onSelectEcosystem} />
    </>
  );
};

export default HomePage;
