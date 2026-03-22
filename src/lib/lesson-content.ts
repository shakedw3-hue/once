/**
 * Lesson Content Helpers
 *
 * Extracts hooks, key insights, and source attributions from lesson descriptions.
 * Also provides tool spotlights and real earning numbers for Pro/AI lessons.
 */

// ─── Hook Generator ───
// Creates a compelling opening line from the lesson title and description

const HOOK_TEMPLATES = [
  (stat: string) => stat,
  (stat: string) => stat,
];

export function generateHook(title: string, description: string): string {
  // Try to extract a stat or surprising fact from the description
  const statMatch = description.match(/(\d+)\s*percent/i);
  const pesoMatch = description.match(/(₱[\d,]+|[\d,]+\s*pesos)/i);
  const nameMatch = extractSourceName(description);

  if (statMatch) {
    const sentences = description.split(/\.\s+/);
    const statSentence = sentences.find(s => s.includes(statMatch[0]));
    if (statSentence) return statSentence.trim() + ".";
  }

  if (pesoMatch && nameMatch) {
    return `${nameMatch} discovered something most people get wrong about ${title.toLowerCase()}. Here is what the research actually says.`;
  }

  if (nameMatch) {
    const firstSentence = description.split(/\.\s+/)[0];
    return firstSentence.trim() + ".";
  }

  return `Most people approach ${title.toLowerCase()} completely wrong. Here is what actually works.`;
}

// ─── Source Attribution ───
// Extracts researcher/author name from description

const KNOWN_SOURCES: Record<string, string> = {
  "Morgan Housel": "Morgan Housel, The Psychology of Money",
  "Naval Ravikant": "Naval Ravikant",
  "Robert Kiyosaki": "Robert Kiyosaki, Rich Dad Poor Dad",
  "Ray Dalio": "Ray Dalio, Principles",
  "Warren Buffett": "Warren Buffett",
  "Andrew Huberman": "Andrew Huberman, Huberman Lab",
  "James Clear": "James Clear, Atomic Habits",
  "Cal Newport": "Cal Newport, Deep Work",
  "Matthew Walker": "Matthew Walker, Why We Sleep",
  "BJ Fogg": "BJ Fogg, Tiny Habits",
  "Daniel Kahneman": "Daniel Kahneman, Thinking Fast and Slow",
  "Viktor Frankl": "Viktor Frankl, Man's Search for Meaning",
  "Dalai Lama": "The Dalai Lama",
  "Oprah Winfrey": "Oprah Winfrey",
  "Ryan Holiday": "Ryan Holiday, The Obstacle is the Way",
  "Brené Brown": "Brené Brown",
  "Kobe Bryant": "Kobe Bryant, The Mamba Mentality",
  "LeBron James": "LeBron James",
  "Peter Attia": "Peter Attia, Outlive",
  "Martin Seligman": "Martin Seligman, Learned Optimism",
  "Nassim Taleb": "Nassim Taleb, Antifragile",
  "Cristiano Ronaldo": "Cristiano Ronaldo",
  "Elon Musk": "Elon Musk",
};

export function extractSourceName(description: string): string | null {
  for (const [name, full] of Object.entries(KNOWN_SOURCES)) {
    if (description.includes(name)) return full;
  }
  return null;
}

// ─── Key Insight Extraction ───
// Pulls the core teaching from the description

export function extractKeyInsight(description: string): string {
  const sentences = description.split(/\.\s+/);
  // Look for sentences with actionable language
  const actionSentence = sentences.find(s =>
    /should|must|need|key|important|research|study|found|shows|proves|confirm/i.test(s)
    && s.length > 30
    && s.length < 200
  );
  if (actionSentence) return actionSentence.trim() + ".";

  // Fallback: second or third sentence (usually the insight)
  const idx = sentences.length >= 3 ? 2 : sentences.length >= 2 ? 1 : 0;
  return (sentences[idx] || sentences[0]).trim() + ".";
}

// ─── Action Step Splitter ───
// Splits a single action step into 2-3 checkable sub-steps

export function splitActionSteps(actionStep: string): string[] {
  // Try splitting by periods that separate distinct actions
  const parts = actionStep
    .split(/\.\s+/)
    .map(s => s.trim())
    .filter(s => s.length > 10);

  if (parts.length >= 2 && parts.length <= 4) {
    return parts.map(p => p.endsWith(".") ? p : p + ".");
  }

  // Try splitting by "then" or "and then" or numbered patterns
  const thenParts = actionStep
    .split(/\.\s*(?:Then|And then|Next|After that|Finally)/i)
    .map(s => s.trim())
    .filter(s => s.length > 10);

  if (thenParts.length >= 2) {
    return thenParts.map(p => p.endsWith(".") ? p : p + ".");
  }

  // Fallback: return as single step
  return [actionStep];
}

// ─── Tool Spotlights (Pro/AI Lessons) ───

export interface ToolSpotlight {
  name: string;
  description: string;
  cost: string;
  url: string;
}

const TOOL_MAP: Record<string, ToolSpotlight[]> = {
  // Social Media Management
  "Getting Your First Client": [
    { name: "Canva", description: "Design professional social media content without a designer", cost: "Free plan available", url: "https://canva.com" },
  ],
  "Content Creation Systems": [
    { name: "Canva Pro", description: "Templates, brand kits, and scheduled posting", cost: "₱500/month", url: "https://canva.com" },
    { name: "CapCut", description: "Edit short-form video for Reels and TikTok", cost: "Free", url: "https://capcut.com" },
  ],
  "Platform Mastery FB IG TikTok": [
    { name: "Meta Business Suite", description: "Manage Facebook and Instagram from one dashboard", cost: "Free", url: "https://business.facebook.com" },
  ],
  "Analytics and Reporting": [
    { name: "Google Analytics", description: "Track website traffic and user behavior", cost: "Free", url: "https://analytics.google.com" },
  ],
  // Shopee/Lazada
  "Finding Winning Products": [
    { name: "Shopee Seller Center", description: "Research trending products and competitor prices", cost: "Free", url: "https://seller.shopee.ph" },
  ],
  "Setting Up Your Store": [
    { name: "Shopee Seller Center", description: "Set up, manage, and optimize your store", cost: "Free", url: "https://seller.shopee.ph" },
  ],
  "Listing Optimization": [
    { name: "Canva", description: "Create product photos that convert", cost: "Free plan available", url: "https://canva.com" },
  ],
  // Freelancing
  "Choosing Your Skill": [
    { name: "OnlineJobs.ph", description: "The #1 platform for Filipino freelancers", cost: "Free for workers", url: "https://onlinejobs.ph" },
  ],
  "Building a Portfolio in 7 Days": [
    { name: "Notion", description: "Build a clean portfolio page in minutes", cost: "Free", url: "https://notion.so" },
  ],
  "Finding Clients on Upwork and OnlineJobs": [
    { name: "Upwork", description: "Global freelance marketplace with escrow protection", cost: "Free to join", url: "https://upwork.com" },
    { name: "OnlineJobs.ph", description: "Filipino-focused job board, direct hiring", cost: "Free for workers", url: "https://onlinejobs.ph" },
  ],
  "Pricing and Negotiation": [
    { name: "PayPal", description: "Receive international payments securely", cost: "Free to receive", url: "https://paypal.com" },
  ],
};

export function getToolSpotlight(lessonTitle: string): ToolSpotlight[] | null {
  return TOOL_MAP[lessonTitle] || null;
}

// ─── Real Numbers (Pro/AI Lessons) ───

const EARNINGS_MAP: Record<string, string> = {
  "Getting Your First Client": "Social media managers in Metro Manila charge ₱3,000–₱8,000 per month per client. With 3 clients, that is ₱9,000–₱24,000/month.",
  "Content Creation Systems": "Content creators on Fiverr charge ₱1,500–₱5,000 per batch of 10 posts. Regular clients pay monthly retainers.",
  "Scaling to 40K Per Month": "Experienced social media managers with 5+ clients earn ₱25,000–₱50,000/month in the Philippines.",
  "Finding Winning Products": "Top Shopee sellers in the Philippines earn ₱20,000–₱100,000/month. Most start profitable within 30 days.",
  "Setting Up Your Store": "Average Shopee store setup to first sale: 7–14 days. First month revenue for active sellers: ₱5,000–₱15,000.",
  "Choosing Your Skill": "Filipino freelancers on Upwork earn ₱15,000–₱60,000/month depending on skill. Virtual assistants start at ₱15,000.",
  "Building a Portfolio in 7 Days": "Freelancers with portfolios get 3x more client responses than those without.",
  "Finding Clients on Upwork and OnlineJobs": "OnlineJobs.ph has 300,000+ employer accounts. Average response rate for well-written profiles: 15–25%.",
  "Pricing and Negotiation": "Filipino freelancers who negotiate their first rate earn 30–50% more over their first year than those who accept the first offer.",
};

export function getRealNumbers(lessonTitle: string): string | null {
  return EARNINGS_MAP[lessonTitle] || null;
}

// ─── Module Opener ───
// Returns intro data for the first lesson of each module

export function isModuleOpener(lessonOrder: number): boolean {
  return lessonOrder === 1;
}
