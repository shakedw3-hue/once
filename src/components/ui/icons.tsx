/**
 * Once Unified Icon System — Brand Language Icons
 *
 * Every icon tells a story. Not generic UI — each visually represents its concept.
 *
 * Spec: indigo circle background (#4F46E5 at 15% opacity),
 * indigo stroke inside (2px, round caps, line-art only).
 * Default: 48×48 circle, 24×24 icon. Mobile (390px): 40×40 circle.
 */

interface IconProps {
  size?: "sm" | "md" | "lg";
  color?: string;
  className?: string;
}

function iconSize(size: IconProps["size"] = "md") {
  switch (size) {
    case "sm": return { outer: "h-8 w-8 sm:h-10 sm:w-10", inner: 18 };
    case "md": return { outer: "h-10 w-10 sm:h-12 sm:w-12", inner: 22 };
    case "lg": return { outer: "h-12 w-12 sm:h-14 sm:w-14", inner: 26 };
  }
}

function Wrap({ size = "md", color, className, children }: IconProps & { children: React.ReactNode }) {
  const s = iconSize(size);
  const bg = color ? `${color}26` : undefined;
  const stroke = color || "#4F46E5";
  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-full ${s.outer} ${className || ""}`}
      style={{ backgroundColor: bg || "rgba(79,70,229,0.15)", color: stroke }}
    >
      {children}
    </div>
  );
}

function Svg({ size = "md", children }: { size?: IconProps["size"]; children: React.ReactNode }) {
  const s = iconSize(size);
  return (
    <svg width={s.inner} height={s.inner} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {children}
    </svg>
  );
}

// ─── Pillar Icons (Brand Language) ───

/** Money: upward arrow breaking through a line — breakthrough */
export function IconMoney(props: IconProps) {
  return (
    <Wrap {...props} color={props.color || "#F59E0B"}><Svg size={props.size}>
      <line x1="3" y1="12" x2="10" y2="12" />
      <line x1="14" y1="12" x2="21" y2="12" />
      <path d="M12 19V5" />
      <path d="m8 9 4-4 4 4" />
    </Svg></Wrap>
  );
}

/** Mind: infinity loop — endless thinking and mental patterns */
export function IconMind(props: IconProps) {
  return (
    <Wrap {...props} color={props.color || "#A78BFA"}><Svg size={props.size}>
      <path d="M12 12c-2-2.67-4-4-6-4a4 4 0 1 0 0 8c2 0 4-1.33 6-4z" />
      <path d="M12 12c2-2.67 4-4 6-4a4 4 0 1 1 0 8c-2 0-4-1.33-6-4z" />
    </Svg></Wrap>
  );
}

/** Body: lightning bolt — energy and vitality */
export function IconBody(props: IconProps) {
  return (
    <Wrap {...props} color={props.color || "#34D399"}><Svg size={props.size}>
      <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
    </Svg></Wrap>
  );
}

/** Spirit: flame — inner fire and meaning */
export function IconSpirit(props: IconProps) {
  return (
    <Wrap {...props} color={props.color || "#60A5FA"}><Svg size={props.size}>
      <path d="M12 22c-4 0-7-3-7-7 0-3 2-5.5 4-8l3-4 3 4c2 2.5 4 5 4 8 0 4-3 7-7 7z" />
      <path d="M12 22c-1.5 0-3-1.5-3-4 0-2 1-3 2-4.5l1-1.5 1 1.5c1 1.5 2 2.5 2 4.5 0 2.5-1.5 4-3 4z" />
    </Svg></Wrap>
  );
}

// ─── How It Works / Method Icons ───

/** Diagnose: magnifying glass over a person silhouette */
export function IconCompass(props: IconProps) {
  return (
    <Wrap {...props}><Svg size={props.size}>
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
      <circle cx="11" cy="9" r="2.5" />
      <path d="M7 15a4 4 0 0 1 8 0" />
    </Svg></Wrap>
  );
}

/** Match: two puzzle pieces clicking together */
export function IconMatch(props: IconProps) {
  return (
    <Wrap {...props}><Svg size={props.size}>
      <path d="M4 6h4v2a2 2 0 1 0 4 0V6h4v4h-2a2 2 0 1 0 0 4h2v4H4z" />
      <path d="M20 6v4h-2" />
      <path d="M20 14v4h-4" />
    </Svg></Wrap>
  );
}

/** Learn: open book with lightbulb spark above */
export function IconLearn(props: IconProps) {
  return (
    <Wrap {...props}><Svg size={props.size}>
      <path d="M2 6h6a4 4 0 0 1 4 4v11a3 3 0 0 0-3-3H2z" />
      <path d="M22 6h-6a4 4 0 0 0-4 4v11a3 3 0 0 1 3-3h7z" />
      <circle cx="12" cy="3" r="1.5" />
      <path d="M10 1.5 12 0l2 1.5" />
    </Svg></Wrap>
  );
}

/** Launch: rocket leaving ground */
export function IconRocket(props: IconProps) {
  return (
    <Wrap {...props}><Svg size={props.size}>
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </Svg></Wrap>
  );
}

// Keep legacy alias
export { IconLearn as IconBookSpark };

// ─── Pricing Tier Icons ───

/** Core: single road stretching to horizon — one clear path */
export function IconPath(props: IconProps) {
  return (
    <Wrap {...props}><Svg size={props.size}>
      <path d="M9 22 11 2" />
      <path d="M15 22 13 2" />
      <line x1="5" y1="18" x2="19" y2="18" />
      <line x1="7" y1="12" x2="17" y2="12" />
      <line x1="9" y1="6" x2="15" y2="6" />
    </Svg></Wrap>
  );
}

/** Pro: road splitting into multiple income streams */
export function IconGrowth(props: IconProps) {
  return (
    <Wrap {...props}><Svg size={props.size}>
      <path d="M12 22v-8" />
      <path d="M12 14 6 4" />
      <path d="M12 14l6-10" />
      <path d="M12 14 3 8" />
      <path d="M12 14l9-6" />
      <circle cx="6" cy="4" r="1.5" />
      <circle cx="18" cy="4" r="1.5" />
      <circle cx="3" cy="8" r="1.5" />
      <circle cx="21" cy="8" r="1.5" />
    </Svg></Wrap>
  );
}

/** AI Careers: circuit with human brain shape — human + AI */
export function IconCircuitBrain(props: IconProps) {
  return (
    <Wrap {...props}><Svg size={props.size}>
      <path d="M12 2C8 2 5 5 5 9c0 2.5 1.5 5 3.5 6.5L12 22l3.5-6.5C17.5 14 19 11.5 19 9c0-4-3-7-7-7z" />
      <circle cx="9.5" cy="9" r="1" />
      <circle cx="14.5" cy="9" r="1" />
      <path d="M9.5 9h5" />
      <path d="M12 9v3" />
      <line x1="5" y1="9" x2="3" y2="9" />
      <line x1="19" y1="9" x2="21" y2="9" />
      <line x1="12" y1="2" x2="12" y2="0" />
    </Svg></Wrap>
  );
}

// ─── Journey / Timeline Icons ───

/** Step 1: Target (reuse Diagnose) */
export { IconCompass as IconTarget };

/** Step 2: Person profile */
export function IconPerson(props: IconProps) {
  return (
    <Wrap {...props}><Svg size={props.size}>
      <circle cx="12" cy="8" r="4" />
      <path d="M20 21a8 8 0 0 0-16 0" />
    </Svg></Wrap>
  );
}

/** Step 3: Three stacked cards */
export function IconCards(props: IconProps) {
  return (
    <Wrap {...props}><Svg size={props.size}>
      <rect x="4" y="8" width="16" height="12" rx="2" />
      <path d="M6 8V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2" />
      <path d="M8 4V3a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1" />
    </Svg></Wrap>
  );
}

/** Step 5: Coins with arrow up */
export function IconCoinsUp(props: IconProps) {
  return (
    <Wrap {...props}><Svg size={props.size}>
      <circle cx="9" cy="15" r="5" />
      <circle cx="15" cy="9" r="5" />
      <path d="M19 3v4h-4" />
      <path d="m19 3-4 4" />
    </Svg></Wrap>
  );
}

/** Step 6: Chart going up */
export function IconChartUp(props: IconProps) {
  return (
    <Wrap {...props}><Svg size={props.size}>
      <path d="M3 20h18" />
      <path d="M7 16V10" /><path d="M11 16V8" /><path d="M15 16V6" /><path d="M19 16V4" />
    </Svg></Wrap>
  );
}
