"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { PILLARS, PILLAR_ORDER } from "@/lib/constants";

const pillarIcons: Record<string, React.ReactNode> = {
  DollarSign: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  ),
  Brain: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a7 7 0 0 0-7 7c0 3 2 5.5 4 7l3 3 3-3c2-1.5 4-4 4-7a7 7 0 0 0-7-7z" />
      <path d="M12 2v10" /><path d="M8 6c1 1 3 1 4 0" /><path d="M12 6c1 1 3 1 4 0" />
    </svg>
  ),
  Heart: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  ),
  Sparkles: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    </svg>
  ),
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Pillars() {
  return (
    <section id="pillars" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Four Pillars of Growth
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Your personalized path focuses on where you need it most, but all
            four pillars work together to create lasting change.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {PILLAR_ORDER.map((key) => {
            const pillar = PILLARS[key];
            return (
              <motion.div key={key} variants={cardVariants}>
                <Card className="group relative overflow-hidden border-border/50 bg-card transition-all duration-300 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1">
                  <div className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${pillar.color} transition-all duration-300 group-hover:h-2`} />
                  <CardContent className="pt-8 pb-6">
                    <div className={`mb-4 inline-flex rounded-xl bg-gradient-to-br ${pillar.color} p-3 text-white shadow-lg transition-transform duration-300 group-hover:scale-110`}>
                      {pillarIcons[pillar.icon]}
                    </div>
                    <h3 className="mb-2 text-xl font-semibold">{pillar.title}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {pillar.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
