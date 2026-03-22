"use client";

import { useRef, useState, useEffect } from "react";

const reviews = [
  {
    name: "Mica Reyes",
    age: 26,
    city: "Makati",
    stars: 5,
    text: "Nag-try lang ako kasi mura. Then yung assessment results ko, grabe, ang accurate. Na-realize ko na yung problem ko hindi pera, focus pala. Two weeks in, iba na yung mornings ko.",
    pillar: "Mind",
    pillarColor: "#A78BFA",
  },
  {
    name: "JR Villanueva",
    age: 31,
    city: "Cebu",
    stars: 5,
    text: "Dalawang trabaho ko para sa family ko. Pagod na pagod na ko. Once yung una na nag-ask sa akin kung ano ba talaga kailangan ko. Hindi yung binenta lang agad.",
    pillar: "Body",
    pillarColor: "#34D399",
  },
  {
    name: "Aira Santos",
    age: 24,
    city: "Manila",
    stars: 5,
    text: "Naubos ko na siguro ₱40,000 sa courses in 2 years. Wala naman natapos. Ito ₱1,499 lang, worksheet format so hindi mo pwedeng i-skip. Natapos ko Module 1 in 5 days. First time.",
    pillar: "Money",
    pillarColor: "#F59E0B",
  },
  {
    name: "Mark Dela Cruz",
    age: 29,
    city: "Davao",
    stars: 5,
    text: "Akala ko okay na ako kasi may promotion na. Pero parang walang meaning. Yung Spirit score ko 34 lang pala. Ngayon nag-reflect na ako every day. May direction na ulit.",
    pillar: "Spirit",
    pillarColor: "#60A5FA",
  },
  {
    name: "Bea Gonzales",
    age: 27,
    city: "Quezon City",
    stars: 4,
    text: "Solb yung action steps kasi specific. Hindi yung 'set your goals' lang. May actual na gagawin ka today. Yun ang nagustuhan ko, hindi lang theory.",
    pillar: "Mind",
    pillarColor: "#A78BFA",
  },
  {
    name: "Carlo Mercado",
    age: 33,
    city: "Taguig",
    stars: 5,
    text: "Binigay ko rin sa asawa ko. Magkaiba kami ng primary path. Ako Money, siya Spirit. Ngayon may sarili kaming worksheet each. Mas may usapan kami tungkol sa future namin.",
    pillar: "Money",
    pillarColor: "#F59E0B",
  },
  {
    name: "Trisha Lim",
    age: 25,
    city: "Pasig",
    stars: 5,
    text: "Hindi siya course, hindi siya lecture. Parang journal na may structure. Yun yung nakatulong sa akin. ₱1,499 for lifetime? No brainer talaga.",
    pillar: "Spirit",
    pillarColor: "#60A5FA",
  },
  {
    name: "Dennis Aquino",
    age: 30,
    city: "Mandaluyong",
    stars: 5,
    text: "Dati puro YouTube videos na '10 ways to be productive.' Walang nagstick. Dito may isang action step per lesson na kaya mo gawin today. Simple pero effective.",
    pillar: "Mind",
    pillarColor: "#A78BFA",
  },
  {
    name: "Kat Flores",
    age: 22,
    city: "Antipolo",
    stars: 5,
    text: "Fresh grad ako, walang direction. Yung assessment pinakita sa akin na Spirit yung pinakaweak ko. Hindi ko siya inexpect. Pero tama pala. Ngayon alam ko na kung saan ako pupunta.",
    pillar: "Spirit",
    pillarColor: "#60A5FA",
  },
  {
    name: "Paolo Ramos",
    age: 35,
    city: "Iloilo",
    stars: 5,
    text: "Nagbabayad ako ng ₱15,000 per month sa gym at supplements. Tapos ito ₱1,499 na assessment sinabi sa akin na Body ko okay na. Yung money pillar ko ang need ng help. Nakatipid pa ko.",
    pillar: "Money",
    pillarColor: "#F59E0B",
  },
  {
    name: "Jen Torres",
    age: 28,
    city: "Paranaque",
    stars: 4,
    text: "Na-share ko sa GC namin ng workmates. Lima sa amin nag-take ng assessment. Magkakaiba ng primary path. Ngayon may accountability group kami. Best ₱1,499 na ginastos ko.",
    pillar: "Body",
    pillarColor: "#34D399",
  },
  {
    name: "Ryan Bautista",
    age: 32,
    city: "Caloocan",
    stars: 5,
    text: "BPO worker ako 8 years na. Feeling ko stuck na ko. Once pinakita sa akin exactly kung ano yung kulang. Hindi motivation. System. Now may system na ko.",
    pillar: "Mind",
    pillarColor: "#A78BFA",
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
      <style>{`
        @keyframes testimonialFadeIn {
          from {
            opacity: 0;
            transform: translateY(15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .testimonial-card {
          animation: testimonialFadeIn 0.4s ease both;
        }
        .testimonial-card:hover {
          transform: translateY(-3px) !important;
          box-shadow: 0 8px 32px rgba(0,0,0,0.10), 0 2px 4px rgba(0,0,0,0.06) !important;
        }
      `}</style>

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
          <div
            key={review.name}
            className="testimonial-card group w-[280px] shrink-0 snap-start rounded-xl bg-white p-5 sm:w-[320px]"
            style={{
              boxShadow: "0 4px 24px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
              transition: "transform 0.25s ease, box-shadow 0.25s ease",
              overflow: "hidden",
              position: "relative",
              animationDelay: `${i * 0.05}s`,
            }}
          >
            {/* Top accent line */}
            <div
              className="absolute top-0 left-0 right-0"
              style={{
                height: "2px",
                background: `linear-gradient(90deg, ${review.pillarColor}, ${review.pillarColor}80)`,
              }}
            />

            {/* Stars + pillar tag */}
            <div className="flex items-center justify-between">
              <Stars count={review.stars} />
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

            {/* Review text */}
            <p className="mt-3 text-sm leading-relaxed text-foreground">
              &ldquo;{review.text}&rdquo;
            </p>

            {/* Reviewer info */}
            <div className="mt-4 flex items-center gap-3">
              <div
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[11px] font-bold tracking-tight"
                style={{
                  backgroundColor: review.pillarColor,
                  color: "#fff",
                }}
              >
                {review.name.split(" ").map(n => n[0]).join("")}
              </div>
              <div className="min-w-0">
                <p className="flex items-center gap-1.5 text-sm font-semibold">
                  {review.name}
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="#10B981"
                    className="shrink-0"
                    aria-label="Verified"
                  >
                    <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </p>
                <p className="text-xs text-muted-foreground">
                  {review.age}, {review.city}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile hint */}
      <p className="mt-2 text-center text-[10px] text-muted-foreground sm:hidden">
        Swipe to see more →
      </p>
    </div>
  );
}
