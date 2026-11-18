import React, { useCallback, useEffect, useState } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ECOSYSTEMS,
  getEcosystemBySlug,
} from './config/ecosystems.config';
import { RootLayout } from './app/layout';
import { HomePage } from './app/page';
import { EcosystemPage } from './app/ecosystems/[slug]/page';
import { CollaborationDrawer } from './components/views/CollaborationDrawer';

type View = 'home' | 'ecosystem';

function parseRouteFromPathname(pathname: string): {
  view: View;
  ecosystemSlug: string | null;
  collaboration: boolean;
} {
  const clean = pathname.replace(/\/+$/, '') || '/';
  if (clean.startsWith('/ecosystems/')) {
    const slug = clean.replace('/ecosystems/', '').trim();
    return {
      view: 'ecosystem',
      ecosystemSlug: getEcosystemBySlug(slug) ? slug : ECOSYSTEMS[0].slug,
      collaboration: false,
    };
  }
  if (clean === '/collaboration') {
    return { view: 'home', ecosystemSlug: null, collaboration: true };
  }
  return { view: 'home', ecosystemSlug: null, collaboration: false };
}

export default function App() {
  const initialRoute = parseRouteFromPathname(window.location.pathname);

  const [currentView, setCurrentView] = useState<View>(initialRoute.view);
  const [selectedEcosystemSlug, setSelectedEcosystemSlug] = useState<string | null>(
    initialRoute.ecosystemSlug
  );
  const [isCollaborationDrawerOpen, setIsCollaborationDrawerOpen] = useState<boolean>(
    initialRoute.collaboration
  );
  const [sectorPrefill, setSectorPrefill] = useState<string>('');

  // دکمه‌های Back / Forward مرورگر
  useEffect(() => {
    const handlePopState = () => {
      const parsed = parseRouteFromPathname(window.location.pathname);
      setCurrentView(parsed.view);
      setSelectedEcosystemSlug(parsed.ecosystemSlug);
      setIsCollaborationDrawerOpen(parsed.collaboration);
      if (!parsed.collaboration && parsed.view === 'home') {
        window.setTimeout(() => ScrollTriggerSafeRefresh(), 120);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleSelectEcosystem = useCallback((slug: string) => {
    setCurrentView('ecosystem');
    setSelectedEcosystemSlug(slug);
    try {
      window.history.pushState({}, '', `/ecosystems/${slug}`);
    } catch {
      /* fallback */
    }
    window.scrollTo({ top: 0 });
  }, []);

  const handleBackToMainDeck = useCallback(() => {
    setCurrentView('home');
    setSelectedEcosystemSlug(null);
    try {
      window.history.pushState({}, '', '/');
    } catch {
      /* fallback */
    }
  }, []);

  const handleOpenCollaboration = useCallback((prefillSector?: string) => {
    if (typeof prefillSector === 'string' && prefillSector) {
      setSectorPrefill(prefillSector);
    }
    setIsCollaborationDrawerOpen(true);
    try {
      window.history.pushState({}, '', '/collaboration');
    } catch {
      /* fallback */
    }
  }, []);

  const handleCloseCollaboration = useCallback(() => {
    setIsCollaborationDrawerOpen(false);
    try {
      const targetPath = selectedEcosystemSlug ? `/ecosystems/${selectedEcosystemSlug}` : '/';
      window.history.pushState({}, '', targetPath);
    } catch {
      /* fallback */
    }
  }, [selectedEcosystemSlug]);

  return (
    <RootLayout>
      {currentView === 'ecosystem' && selectedEcosystemSlug ? (
        <EcosystemPage
          slug={selectedEcosystemSlug}
          onBack={handleBackToMainDeck}
          onSwitchEcosystem={handleSelectEcosystem}
          onRequestAccess={(title) => handleOpenCollaboration(title)}
        />
      ) : (
        <HomePage
          isOverlayOpen={isCollaborationDrawerOpen}
          onSelectEcosystem={handleSelectEcosystem}
          onOpenCollaboration={handleOpenCollaboration}
        />
      )}

      <CollaborationDrawer
        isOpen={isCollaborationDrawerOpen}
        initialSectorPrefill={sectorPrefill}
        onClose={handleCloseCollaboration}
      />
    </RootLayout>
  );
}

/** بازمحاسبه امن تریگرهای اسکرول بعد از جابه‌جایی مسیر */
function ScrollTriggerSafeRefresh() {
  window.setTimeout(() => ScrollTrigger.refresh(), 80);
}
