import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import SaasEmailContent from './modal-content/SaasEmailContent';
import DTCLandingContent from './modal-content/DTCLandingContent';
import FitnessAdsContent from './modal-content/FitnessAdsContent';
import FinTechEmailContent from './modal-content/FinTechEmailContent';
import FashionLandingContent from './modal-content/FashionLandingContent';
import CoachingFunnelContent from './modal-content/CoachingFunnelContent';

export interface CaseStudy {
  type: string;
  name: string;
  headline: string;
  body: string[];
  statLine: string;
}

interface CaseStudyModalProps {
  study: CaseStudy | null;
  cardIndex: number;
  onClose: () => void;
}

const contentByIndex: Record<number, React.FC> = {
  0: SaasEmailContent,
  1: DTCLandingContent,
  2: FitnessAdsContent,
  3: FinTechEmailContent,
  4: FashionLandingContent,
  5: CoachingFunnelContent,
};

const CaseStudyModal = ({ study, cardIndex, onClose }: CaseStudyModalProps) => {
  const ContentComponent = contentByIndex[cardIndex];

  return (
    <AnimatePresence>
      {study && ContentComponent && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-[#080808]/95 backdrop-blur-md" />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 w-full max-w-[860px] max-h-[90vh] overflow-y-auto mx-4 bg-[#0D0B08] rounded-sm"
            style={{ borderTop: '2px solid #C9A84C' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 z-20 text-gold hover:text-white transition-colors"
              data-clickable
            >
              <X size={24} />
            </button>

            <div className="p-8 md:p-12">
              <ContentComponent />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CaseStudyModal;
