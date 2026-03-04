import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export interface CaseStudy {
  type: string;
  name: string;
  headline: string;
  body: string[];
  statLine: string;
}

interface CaseStudyModalProps {
  study: CaseStudy | null;
  onClose: () => void;
}

const highlightGold = (text: string) => {
  const parts = text.split(/(\d+[\d.,]*%?|\$[\d,]+K?)/g);
  return parts.map((part, i) =>
    /\d/.test(part) || /\$/.test(part) ? (
      <span key={i} className="text-gold font-semibold" style={{ textShadow: '0 0 20px rgba(201,168,76,0.4)' }}>{part}</span>
    ) : (
      <span key={i}>{part}</span>
    )
  );
};

const CaseStudyModal = ({ study, onClose }: CaseStudyModalProps) => {
  if (!study) return null;

  return (
    <AnimatePresence>
      {study && (
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
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.96 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 w-full max-w-3xl max-h-[90vh] overflow-y-auto mx-4 bg-[#0D0B08] border border-[hsla(43,52%,54%,0.18)] rounded-sm p-8 md:p-12 scrollbar-thin"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 text-cream/50 hover:text-gold transition-colors"
              data-clickable
            >
              <X size={24} />
            </button>

            {/* Type label */}
            <span className="font-accent text-[11px] uppercase tracking-[0.15em] text-gold mb-4 block">
              {study.type}
            </span>

            {/* Headline */}
            <h2
              className="font-display text-2xl sm:text-3xl md:text-4xl text-gold mb-8 leading-[1.2] tracking-[-0.02em]"
              style={{ textShadow: '0 0 30px rgba(201,168,76,0.3)' }}
            >
              {study.headline}
            </h2>

            {/* Body paragraphs */}
            <div className="space-y-6 mb-12">
              {study.body.map((paragraph, i) => {
                // Detect bold lead-in patterns like "The problem:" or "What we built:"
                const leadMatch = paragraph.match(/^(The problem|The insight|What we built|What we wrote|What we rebuilt|What we created|No .+?\.|The ads .+?\.):/);
                if (leadMatch) {
                  const colonIdx = paragraph.indexOf(':');
                  const lead = paragraph.slice(0, colonIdx + 1);
                  const rest = paragraph.slice(colonIdx + 1);
                  return (
                    <p key={i} className="font-body text-cream text-[17px] leading-[1.6] max-w-[68ch]">
                      <span className="text-white-headline font-semibold">{lead}</span>
                      {rest}
                    </p>
                  );
                }
                // Italic/emphasis lines (short philosophical lines)
                if (paragraph.length < 80 && !paragraph.includes('.') || paragraph.startsWith('No fluff') || paragraph.startsWith('Great copy') || paragraph.startsWith('Churn is') || paragraph.startsWith('The calendar')) {
                  return (
                    <p key={i} className="font-body text-gold/80 text-lg italic leading-[1.6] max-w-[68ch]">
                      {paragraph}
                    </p>
                  );
                }
                return (
                  <p key={i} className="font-body text-cream text-[17px] leading-[1.6] max-w-[68ch]">
                    {paragraph}
                  </p>
                );
              })}
            </div>

            {/* Stat line */}
            <div className="border-t border-[hsla(43,52%,54%,0.18)] pt-8">
              <p className="font-accent text-sm md:text-base uppercase tracking-[0.1em] text-gold leading-relaxed" style={{ textShadow: '0 0 20px rgba(201,168,76,0.4)' }}>
                {highlightGold(study.statLine)}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CaseStudyModal;
