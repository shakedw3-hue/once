"use client";

import { motion } from "framer-motion";

const faqs = [
  {
    q: "Is this another online course?",
    a: "No. There are no video lectures. BetterLife is an assessment tool that identifies what you should actually focus on, then gives you structured worksheets to work through. Think of it as a diagnostic + workbook, not a course.",
  },
  {
    q: "What happens after I take the assessment?",
    a: "You see your scores across Money, Mind, Body, and Spirit. You get a primary path recommendation. If you want to access the full set of modules and lessons, you pay ₱649. If you don't, you keep your scores for free.",
  },
  {
    q: "Why should I trust this?",
    a: "You shouldn't, not until you try the free assessment. See if the results match what you already know about yourself. If they do, the structured path will probably help you. If they don't, you haven't paid anything.",
  },
  {
    q: "Is there a refund policy?",
    a: "The assessment is free, so you can judge the quality before paying. Once you see your profile and it makes sense, then you decide. We built it this way so nobody feels tricked.",
  },
  {
    q: "₱649 seems cheap. What's the catch?",
    a: "No catch. We kept the price low so it's a no-brainer for anyone who's serious. The content is text-based worksheets, so we don't have video production costs. That savings goes to you.",
  },
];

export default function FAQ() {
  return (
    <section className="border-t px-5 py-16 sm:py-20">
      <div className="mx-auto max-w-2xl">
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mb-10 font-display text-2xl font-semibold tracking-tight sm:text-3xl"
        >
          Common questions
        </motion.h2>

        <div className="space-y-6">
          {faqs.map((faq, i) => (
            <motion.div
              key={faq.q}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <h3 className="mb-1 text-base font-semibold">{faq.q}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {faq.a}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
