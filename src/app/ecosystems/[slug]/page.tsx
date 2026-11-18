import React from 'react';
import {
  getEcosystemBySlug,
  ECOSYSTEMS,
  type EcosystemConfig,
} from '../../../config/ecosystems.config';
import { EcosystemDetailView } from '../../../components/views/EcosystemDetailView';

interface EcosystemPageProps {
  slug?: string;
  onBack: () => void;
  onSwitchEcosystem: (slug: string) => void;
  onRequestAccess: (ecosystemTitle: string) => void;
}

export const EcosystemPage: React.FC<EcosystemPageProps> = ({
  slug,
  onBack,
  onSwitchEcosystem,
  onRequestAccess,
}) => {
  const currentSlug = slug || ECOSYSTEMS[0].slug;
  const ecosystem: EcosystemConfig =
    getEcosystemBySlug(currentSlug) || ECOSYSTEMS[0];

  return (
    <EcosystemDetailView
      ecosystem={ecosystem}
      onBack={onBack}
      onSwitchEcosystem={onSwitchEcosystem}
      onRequestAccess={onRequestAccess}
    />
  );
};

export default EcosystemPage;
