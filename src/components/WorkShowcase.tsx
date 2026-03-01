import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, MouseEvent } from 'react';

const projects = [
  {
    name: 'Velostra Landing Page',
    type: 'Landing Page',
    result: 'Took conversion rate from 2.1% → 6.8%',
  },
  {
    name: 'NovaBrand Email Sequence',
    type: 'Email Marketing',
    result: 'Took open rate from 18% → 47%',
  },
  {
    name: 'Arcline Brand Messaging',
    type: 'Brand Strategy',
    result: 'Increased demo bookings by 340%',
  },
  {
    name: 'PulseStack Ad Campaign',
    type: 'Paid Ads',
    result: 'Cut CPA by 62% in 30 days',
  },
  {
    name: 'FitForge Sales Page',
    type: 'Sales Page',
    result: 'Generated $127K in launch week',
  },
  {
    name: 'Meridian SaaS Onboarding',
    type: 'UX Copy',
    result: 'Reduced churn by 28% in Q1',
  },
];

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

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

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
        className="bg-card border border-border rounded-sm p-8 h-full group hover:border-primary/40 transition-colors duration-300"
        data-clickable
      >
        <span className="font-body text-xs uppercase tracking-widest text-primary mb-3 block">
          {project.type}
        </span>
        <h3 className="font-display text-2xl text-foreground mb-3">{project.name}</h3>
        <p className="font-body text-muted-foreground text-sm mb-6">{project.result}</p>
        <span className="font-body text-xs uppercase tracking-widest text-accent group-hover:text-gold transition-colors">
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
    <section id="work" className="py-32 relative z-10">
      <div className="container mx-auto px-6">
        <motion.h2
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="font-display text-5xl md:text-6xl text-center mb-4 text-foreground"
        >
          Copy That Actually <span className="text-gradient-crimson">Did Something</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          className="text-muted-foreground text-center mb-16 font-body"
        >
          Real projects. Real results. No fluff.
        </motion.p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {projects.map((p, i) => (
            <TiltCard key={p.name} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkShowcase;
