// ─────────────────────────────────────────────────────────────
// Income & AI Career Tracks — metadata + module-title mapping.
// Each track is 5 modules × 5 lessons = 25 lessons.
// Modules are stored under the Money pillar in DB; we group them
// into tracks here by their title (because of order-slot collisions
// in legacy seed migrations).
// ─────────────────────────────────────────────────────────────

export type TrackTier = "pro" | "ai";

export interface TrackMeta {
  id: string;
  name: string;
  tagline: string;
  description: string;
  earning: string;
  tier: TrackTier;
  /** Visual accent color used for the track card */
  color: string;
  /** Module titles in canonical learning order — must match DB exactly */
  moduleTitles: string[];
}

export const TRACKS: TrackMeta[] = [
  // ───────── PRO TIER (4 tracks) ─────────
  {
    id: "social-media",
    name: "Social Media Management",
    tagline: "Manage local businesses on Facebook & Instagram",
    description: "Find your first paying client in 30 days. Build a content system that scales to multiple clients without burning out.",
    earning: "₱15,000–₱40,000 / month",
    tier: "pro",
    color: "#7C5BD9",
    moduleTitles: [
      "Getting Your First Client",
      "Content Creation Systems",
      "Platform Mastery FB IG TikTok",
      "Analytics and Reporting",
      "Scaling to 40K Per Month",
    ],
  },
  {
    id: "ecommerce",
    name: "Shopee & Lazada E-Commerce",
    tagline: "Sell physical products without inventory risk",
    description: "Research winning products, set up a professional store, and scale with platform ads — both dropship and warehouse models.",
    earning: "₱10,000–₱50,000 / month",
    tier: "pro",
    color: "#C9A227",
    moduleTitles: [
      "Finding Winning Products",
      "Setting Up Your Store",
      "Listing Optimization",
      "Order Fulfillment Dropship and Warehouse",
      "Scaling with Ads",
    ],
  },
  {
    id: "freelancing",
    name: "Freelancing",
    tagline: "Earn from international clients on your terms",
    description: "Pick a skill that pays, build a portfolio in 7 days, win clients on Upwork and OnlineJobs.ph, and grow into a full income.",
    earning: "₱15,000–₱60,000 / month",
    tier: "pro",
    color: "#2F8F6F",
    moduleTitles: [
      "Choosing Your Skill",
      "Building a Portfolio in 7 Days",
      "Finding Clients on Upwork and OnlineJobs",
      "Pricing and Negotiation",
      "From Side Hustle to Full Income",
    ],
  },
  {
    id: "side-income",
    name: "Online Side Income",
    tagline: "Digital products, affiliate, content monetization",
    description: "Build income streams that earn while you sleep — digital products, affiliate marketing, email lists, and automation.",
    earning: "₱5,000–₱30,000 / month",
    tier: "pro",
    color: "#3B7DD8",
    moduleTitles: [
      "Digital Products You Can Create This Week",
      "Content Monetization Basics",
      "Affiliate Marketing in PH",
      "Email List Building",
      "Automating Your Income Stream",
    ],
  },

  // ───────── AI CAREERS TIER (6 tracks) ─────────
  {
    id: "ai-business",
    name: "AI Business Partner",
    tagline: "Run a business with Claude as your operator",
    description: "Use AI to handle customer service, automation, and client acquisition. The new way to run a service business.",
    earning: "₱25,000–₱80,000 / month",
    tier: "ai",
    color: "#4F46E5",
    moduleTitles: [
      "Meet Claude: Your AI Business Partner",
      "AI Customer Service Systems",
      "AI Automation and Follow-ups",
      "Finding AI Business Clients",
      "Scaling Your AI Business",
    ],
  },
  {
    id: "virtual-assistant",
    name: "Virtual Assistant",
    tagline: "Build a full VA practice for international clients",
    description: "From foundations to scaling — communication, operations, client acquisition, and pricing for a sustainable VA career.",
    earning: "₱20,000–₱60,000 / month",
    tier: "ai",
    color: "#7C5BD9",
    moduleTitles: [
      "VA Foundations",
      "Client Communication Mastery",
      "Core VA Operations",
      "Finding and Landing Clients",
      "Scaling to Full-Time VA Income",
    ],
  },
  {
    id: "ai-content",
    name: "AI Content Creation",
    tagline: "Build a content agency powered by AI tools",
    description: "Write, design, film, and post content at scale using the best AI tools. Turn creativity into a business.",
    earning: "₱20,000–₱70,000 / month",
    tier: "ai",
    color: "#C9A227",
    moduleTitles: [
      "AI Writing and Copywriting",
      "AI Visual Content",
      "AI Video and Shorts",
      "AI Social Media Management",
      "Building an AI Content Agency",
    ],
  },
  {
    id: "ai-customer-service",
    name: "AI Customer Service",
    tagline: "Build chatbot and automation services",
    description: "Master Tidio, ManyChat, and AI-powered support. Sell automation services to local businesses for recurring revenue.",
    earning: "₱30,000–₱90,000 / month",
    tier: "ai",
    color: "#2F8F6F",
    moduleTitles: [
      "Chatbot Foundations",
      "Building with Tidio and ManyChat",
      "AI-Powered Smart Support",
      "Analytics and Optimization",
      "Selling Automation Services",
    ],
  },
  {
    id: "ai-creative",
    name: "AI Creative Studio",
    tagline: "Logo, brand, marketing content with AI",
    description: "Run a one-person creative studio. Logos, brand identity, social content, and full marketing campaigns at premium rates.",
    earning: "₱25,000–₱75,000 / month",
    tier: "ai",
    color: "#3B7DD8",
    moduleTitles: [
      "Your AI Creative Studio",
      "Logo and Brand Identity with AI",
      "Social Media Content Factory",
      "Marketing Materials and Campaigns",
      "Building Your Creative Business",
    ],
  },
  {
    id: "ai-web-dev",
    name: "AI Web Development",
    tagline: "Build websites and apps with Claude Code",
    description: "The highest-earning AI career. Build professional websites, web apps, and client projects using Claude as your developer.",
    earning: "₱40,000–₱150,000 / month",
    tier: "ai",
    color: "#0A0A0F",
    moduleTitles: [
      "Claude Code: Your AI Developer",
      "Building Professional Websites",
      "Web Apps and Dashboards",
      "Client Projects and Delivery",
      "Your Web Development Business",
    ],
  },
];

/** All track titles flattened (used for DB query filter) */
export const ALL_TRACK_MODULE_TITLES: string[] = TRACKS.flatMap((t) => t.moduleTitles);

/** Find which track a module belongs to (by title) */
export function findTrackByModuleTitle(title: string): TrackMeta | undefined {
  return TRACKS.find((t) => t.moduleTitles.includes(title));
}

export function tracksForPlan(plan: string | null | undefined): TrackMeta[] {
  // Each plan tier gets its OWN set of tracks. AI is not a superset of Pro.
  if (plan === "ai") return TRACKS.filter((t) => t.tier === "ai");
  if (plan === "pro") return TRACKS.filter((t) => t.tier === "pro");
  return [];
}

/** Find a track by id */
export function findTrackById(id: string | null | undefined): TrackMeta | undefined {
  if (!id) return undefined;
  return TRACKS.find((t) => t.id === id);
}
