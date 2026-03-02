import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, MouseEvent } from 'react';

const projects = [
  { name: 'SaaS Welcome Sequence', type: 'Email Campaign', result: 'Open rate jumped from 21% → 54%' },
  { name: 'DTC Brand Landing Page', type: 'Landing Page', result: 'Conversion rate: 2.1% → 7.3%' },
  { name: 'Fitness App Ad Campaign', type: 'Social Media Ads', result: 'Cut CPA by 62% in 30 days' },
  { name: 'FinTech Onboarding Flow', type: 'Email Sequence', result: 'Reduced churn by 28% in Q1' },
  { name: 'Fashion Brand Launch', type: 'Landing Page', result: 'Generated $127K in launch week' },
  { name: 'Coaching High-Ticket Funnel', type: 'Ad Copy + Landing Page', result: 'Booked 47 calls in 14 days' },
];

// Highlight numbers/stats in gold
const highlightStats = (text: string) => {
  const parts = text.split(/(\d+[\d.]*%?|\$[\d,]+K?)/g);
  return parts.map((part, i) =>
    /\d/.test(part) || /\$/.test(part) ? (
      <span key={i} className="text-gold font-semibold">{part}</span>
    ) : (
      <span key={i}>{part}</span>
    )
  );
};

const TiltCard = ({ project, index }: { project: typeof projects[0]; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-50px' });

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 300, damping: 30 });

  const handleMouse = (e: MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      ref={sectionRef}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouse}
        onMouseLeave={handleLeave}
        style={{ rotateX, rotateY, transformPerspective: 800 }}
        className="bg-glass-card border border-[hsla(43,52%,54%,0.18)] rounded-sm p-8 h-full group hover:border-primary/40 transition-colors duration-300"
        data-clickable
      >
        <span className="font-accent text-[11px] uppercase tracking-[0.15em] text-gold mb-3 block">
          {project.type}
        </span>
        <h3 className="font-display text-xl text-white-headline mb-3">{project.name}</h3>
        <p className="font-body text-cream text-sm mb-6 leading-relaxed">
          {highlightStats(project.result)}
        </p>
        <span className="font-accent text-[11px] uppercase tracking-[0.15em] text-gold group-hover:text-gold-bright transition-colors">
          View →
        </span>
      </motion.div>
    </motion.div>
  );
};

const WorkShowcase = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="work" className="py-20 md:py-32 relative z-10">
      <div className="container mx-auto px-6">
        <motion.span
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          className="section-label block text-center mb-4"
        >
          WORK
        </motion.span>
        <motion.h2
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-center mb-4 text-white-headline tracking-[-0.03em]"
        >
          Copy That Actually{' '}
          <span className="text-gradient-gold">Did Something</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          className="text-muted-foreground text-center mb-16 font-body text-sm"
        >
          Every project. One goal: make someone take action.
        </motion.p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {projects.map((p, i) => (
            <TiltCard key={p.name} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkShowcase;