/**
 * Once Illustration System
 *
 * Decorative SVG illustrations for pillars, modules, and lessons.
 * Each pillar has a unique visual language. All illustrations are
 * line-art with soft gradients — premium, not clipart.
 */

import type { Pillar } from "@/types/database";

const PILLAR_COLORS: Record<Pillar, { primary: string; secondary: string; bg: string }> = {
  money: { primary: "#F59E0B", secondary: "#D97706", bg: "#FEF3C7" },
  mind: { primary: "#A78BFA", secondary: "#7C3AED", bg: "#EDE9FE" },
  body: { primary: "#34D399", secondary: "#059669", bg: "#D1FAE5" },
  spirit: { primary: "#60A5FA", secondary: "#2563EB", bg: "#DBEAFE" },
};

interface IllustrationProps {
  pillar: Pillar;
  variant?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}

function getSize(size: IllustrationProps["size"] = "md") {
  switch (size) {
    case "sm": return { w: 80, h: 80 };
    case "md": return { w: 120, h: 120 };
    case "lg": return { w: 180, h: 180 };
  }
}

/** Module card illustration — decorative abstract shape per pillar */
export function ModuleIllustration({ pillar, variant = 0, size = "md", className }: IllustrationProps) {
  const c = PILLAR_COLORS[pillar];
  const s = getSize(size);
  const id = `mod-${pillar}-${variant}`;

  return (
    <svg width={s.w} height={s.h} viewBox="0 0 120 120" fill="none" className={className}>
      <defs>
        <linearGradient id={`${id}-g`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={c.primary} stopOpacity="0.15" />
          <stop offset="100%" stopColor={c.secondary} stopOpacity="0.05" />
        </linearGradient>
      </defs>

      {pillar === "money" && (
        <>
          <circle cx="60" cy="60" r="50" fill={`url(#${id}-g)`} />
          {/* Peso/Dollar sign */}
          <text x="60" y="72" textAnchor="middle" fontSize="48" fontWeight="700" fontFamily="Georgia, serif" fill={c.primary} opacity="0.5">₱</text>
          <circle cx="85" cy="35" r="8" fill={c.primary} opacity="0.1" />
          <circle cx="35" cy="85" r="12" fill={c.primary} opacity="0.08" />
        </>
      )}

      {pillar === "mind" && (
        <>
          <circle cx="60" cy="60" r="50" fill={`url(#${id}-g)`} />
          <path d="M40 60c0-11 9-20 20-20s20 9 20 20" stroke={c.primary} strokeWidth="2" strokeLinecap="round" opacity="0.6" />
          <path d="M40 60c0 11 9 20 20 20s20-9 20-20" stroke={c.secondary} strokeWidth="2" strokeLinecap="round" opacity="0.4" />
          <circle cx="52" cy="55" r="3" fill={c.primary} opacity="0.5" />
          <circle cx="68" cy="55" r="3" fill={c.primary} opacity="0.5" />
          <path d="M55 65c3 3 7 3 10 0" stroke={c.primary} strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
          <path d="M30 40l-8-8M90 40l8-8M60 25v-10" stroke={c.primary} strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
        </>
      )}

      {pillar === "body" && (
        <>
          <circle cx="60" cy="60" r="50" fill={`url(#${id}-g)`} />
          <path d="M60 30l-5 15h10l-5-15z" stroke={c.primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" fill={c.primary} fillOpacity="0.1" />
          <path d="M60 45v25M60 70l-15 20M60 70l15 20M45 55l15-5M75 55l-15-5" stroke={c.primary} strokeWidth="2" strokeLinecap="round" opacity="0.5" />
          <circle cx="60" cy="25" r="8" stroke={c.primary} strokeWidth="2" opacity="0.5" fill={c.primary} fillOpacity="0.1" />
          <path d="M35 35c5 0 10 3 10 3M85 35c-5 0-10 3-10 3" stroke={c.primary} strokeWidth="1" strokeLinecap="round" opacity="0.3" />
        </>
      )}

      {pillar === "spirit" && (
        <>
          <circle cx="60" cy="60" r="50" fill={`url(#${id}-g)`} />
          <path d="M60 85c-15 0-25-12-25-25 0-10 5-18 10-24l15-18 15 18c5 6 10 14 10 24 0 13-10 25-25 25z" stroke={c.primary} strokeWidth="2" strokeLinecap="round" opacity="0.5" fill={c.primary} fillOpacity="0.08" />
          <path d="M60 85c-6 0-10-6-10-14 0-6 3-10 6-14l4-6 4 6c3 4 6 8 6 14 0 8-4 14-10 14z" stroke={c.secondary} strokeWidth="1.5" strokeLinecap="round" opacity="0.4" fill={c.primary} fillOpacity="0.1" />
          <circle cx="40" cy="40" r="3" fill={c.primary} opacity="0.2" />
          <circle cx="80" cy="45" r="2" fill={c.primary} opacity="0.15" />
          <circle cx="45" cy="70" r="2" fill={c.primary} opacity="0.1" />
        </>
      )}
    </svg>
  );
}

/** Lesson header illustration — smaller, horizontal decorative bar */
export function LessonIllustration({ pillar, className }: { pillar: Pillar; className?: string }) {
  const c = PILLAR_COLORS[pillar];
  const id = `les-${pillar}`;

  return (
    <svg width="100%" height="6" viewBox="0 0 400 6" preserveAspectRatio="none" className={className}>
      <defs>
        <linearGradient id={`${id}-bar`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={c.primary} stopOpacity="0.8" />
          <stop offset="50%" stopColor={c.secondary} stopOpacity="0.4" />
          <stop offset="100%" stopColor={c.primary} stopOpacity="0.1" />
        </linearGradient>
      </defs>
      <rect width="400" height="6" rx="3" fill={`url(#${id}-bar)`} />
    </svg>
  );
}

/** Pillar badge — small colored icon for lists */
export function PillarBadge({ pillar, label }: { pillar: Pillar; label?: string }) {
  const c = PILLAR_COLORS[pillar];
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold"
      style={{ backgroundColor: `${c.primary}15`, color: c.primary }}
    >
      <span className="h-2 w-2 rounded-full" style={{ backgroundColor: c.primary }} />
      {label || pillar.charAt(0).toUpperCase() + pillar.slice(1)}
    </span>
  );
}

/** Section divider with pillar-themed dots */
export function PillarDivider({ pillar }: { pillar: Pillar }) {
  const c = PILLAR_COLORS[pillar];
  return (
    <div className="flex items-center gap-2 py-4">
      <div className="h-px flex-1" style={{ backgroundColor: `${c.primary}20` }} />
      <div className="flex gap-1">
        <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: `${c.primary}40` }} />
        <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: `${c.primary}60` }} />
        <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: `${c.primary}40` }} />
      </div>
      <div className="h-px flex-1" style={{ backgroundColor: `${c.primary}20` }} />
    </div>
  );
}
