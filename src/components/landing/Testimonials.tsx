"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

const reviews = [
  {
    name: "Mica Reyes",
    age: 26,
    city: "Makati",
    role: "BPO Quality Analyst",
    stars: 5,
    text: "Nag-try lang ako kasi mura. Then yung assessment results ko, grabe, ang accurate. Na-realize ko na yung problem ko hindi pera, focus pala. Two weeks into the Mind path, iba na yung mornings ko.",
    pillar: "Mind",
    pillarColor: "#A78BFA",
  },
  {
    name: "JR Villanueva",
    age: 31,
    city: "Cebu",
    role: "Grab Driver / Part-time VA",
    stars: 5,
    text: "Dalawang trabaho ko para sa family ko. Pagod na pagod na ko. Itong Once, siya yung una na nag-ask sa akin kung ano ba talaga kailangan ko. Hindi yung binenta lang agad. Na-gets ko na need ko munang ayusin yung Body pillar ko bago lahat.",
    pillar: "Body",
    pillarColor: "#34D399",
  },
  {
    name: "Aira Santos",
    age: 24,
    city: "Manila",
    role: "Freelance Graphic Designer",
    stars: 5,
    text: "Naubos ko na siguro ₱40,000 sa courses in 2 years. Wala naman natapos. Ito ₱649 lang, tapos worksheet format so hindi mo pwedeng i-skip. Actually natapos ko yung Module 1 in 5 days. First time.",
    pillar: "Money",
    pillarColor: "#F59E0B",
  },
  {
    name: "Mark Dela Cruz",
    age: 29,
    city: "Davao",
    role: "Call Center Team Lead",
    stars: 5,
    text: "Akala ko okay na ako kasi may promotion na. Pero parang walang meaning. Yung Spirit score ko 34 lang pala. Ngayon nag-reflect na ako every day, kahit 5 minutes lang. May direction na ulit.",
    pillar: "Spirit",
    pillarColor: "#60A5FA",
  },
  {
    name: "Bea Gonzales",
    age: 27,
    city: "Quezon City",
    role: "Admin Assistant",
    stars: 4,
    text: "Solb yung action steps kasi specific. Hindi yung 'set your goals' lang. May actual na gagawin ka today. Yun ang nagustuhan ko, hindi lang theory.",
    pillar: "Mind",
    pillarColor: "#A78BFA",
  },
  {
    name: "Carlo Mercado",
    age: 33,
    city: "Taguig",
    role: "Small Business Owner",
    stars: 5,
    text: "Binigay ko rin sa asawa ko. Magkaiba kami ng primary path. Ako Money, siya Spirit. Ngayon may sarili kaming worksheet each. Mas may usapan kami tungkol sa future namin.",
    pillar: "Money",
    pillarColor: "#F59E0B",
  },
  {
    name: "Trisha Lim",
    age: 25,
    city: "Pasig",
    role: "Social Media Manager",
    stars: 5,
    text: "Hindi siya course, hindi siya lecture. Parang journal na may structure. Yun yung nakatulong sa akin. ₱649 for lifetime? No brainer talaga.",
    pillar: "Body",
    pillarColor: "#34D399",
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill={i < count ? "#F59E0B" : "none"}
          stroke={i < count ? "#F59E0B" : "currentColor"}
          strokeWidth="2"
          className={i >= count ? "text-muted-foreground/30" : ""}
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  function checkScroll() {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  }

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (el) el.addEventListener("scroll", checkScroll, { passive: true });
    return () => el?.removeEventListener("scroll", checkScroll);
  }, []);

  function scroll(direction: "left" | "right") {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: direction === "left" ? -300 : 300, behavior: "smooth" });
  }

  return (
    <div>
      {/* Header with arrows */}
      <div className="mb-5 flex items-end justify-between">
        <div>
          <h2 className="text-section text-xl text-foreground sm:text-2xl">
            What people are saying
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            From Filipinos who completed their Once path.
          </p>
        </div>
        <div className="hidden gap-1 sm:flex">
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className="flex h-8 w-8 items-center justify-center rounded-full border bg-card transition-colors hover:bg-muted disabled:opacity-30"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className="flex h-8 w-8 items-center justify-center rounded-full border bg-card transition-colors hover:bg-muted disabled:opacity-30"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>

      {/* Scrollable cards */}
      <div
        ref={scrollRef}
        className="-mx-5 flex gap-3 overflow-x-auto px-5 pb-4 scrollbar-none snap-x snap-mandatory sm:gap-4"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {reviews.map((review, i) => (
          <motion.div
            key={review.name}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="w-[280px] shrink-0 snap-start rounded-xl border bg-card p-5 sm:w-[320px]"
          >
            {/* Stars */}
            <Stars count={review.stars} />

            {/* Review text */}
            <p className="mt-3 text-sm leading-relaxed text-foreground">
              &ldquo;{review.text}&rdquo;
            </p>

            {/* Reviewer info */}
            <div className="mt-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold">{review.name}</p>
                <p className="text-xs text-muted-foreground">
                  {review.age}, {review.city} · {review.role}
                </p>
              </div>
              <div
                className="rounded-full px-2 py-0.5 text-[10px] font-semibold"
                style={{
                  backgroundColor: `${review.pillarColor}15`,
                  color: review.pillarColor,
                }}
              >
                {review.pillar}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Mobile hint */}
      <p className="mt-2 text-center text-[10px] text-muted-foreground sm:hidden">
        Swipe to see more →
      </p>
    </div>
  );
}
