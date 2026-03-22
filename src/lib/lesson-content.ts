/**
 * Lesson Content Helpers — Rich Content Extraction
 *
 * Extracts hooks, key insights, takeaways, stats, quotes,
 * and visual data from lesson descriptions.
 */

// ─── Hook Generator ───

export function generateHook(title: string, description: string): string {
  const statMatch = description.match(/(\d+)\s*percent/i);
  const nameMatch = extractSourceName(description);

  if (statMatch) {
    const sentences = description.split(/\.\s+/);
    const statSentence = sentences.find(s => s.includes(statMatch[0]));
    if (statSentence) return statSentence.trim() + ".";
  }

  if (nameMatch) {
    const firstSentence = description.split(/\.\s+/)[0];
    return firstSentence.trim() + ".";
  }

  return `Most people approach ${title.toLowerCase()} completely wrong. Here is what actually works.`;
}

// ─── Source Attribution ───

const KNOWN_SOURCES: Record<string, { full: string; role: string }> = {
  "Morgan Housel": { full: "Morgan Housel", role: "Author, The Psychology of Money" },
  "Naval Ravikant": { full: "Naval Ravikant", role: "Entrepreneur & Philosopher" },
  "Robert Kiyosaki": { full: "Robert Kiyosaki", role: "Author, Rich Dad Poor Dad" },
  "Ray Dalio": { full: "Ray Dalio", role: "Founder, Bridgewater Associates" },
  "Warren Buffett": { full: "Warren Buffett", role: "Chairman, Berkshire Hathaway" },
  "Andrew Huberman": { full: "Andrew Huberman", role: "Neuroscientist, Stanford" },
  "James Clear": { full: "James Clear", role: "Author, Atomic Habits" },
  "Cal Newport": { full: "Cal Newport", role: "Author, Deep Work" },
  "Matthew Walker": { full: "Matthew Walker", role: "Sleep Researcher, UC Berkeley" },
  "BJ Fogg": { full: "BJ Fogg", role: "Behavior Scientist, Stanford" },
  "Daniel Kahneman": { full: "Daniel Kahneman", role: "Nobel Laureate, Psychology" },
  "Viktor Frankl": { full: "Viktor Frankl", role: "Author, Man's Search for Meaning" },
  "Dalai Lama": { full: "The Dalai Lama", role: "Spiritual Leader" },
  "Oprah Winfrey": { full: "Oprah Winfrey", role: "Media Pioneer" },
  "Ryan Holiday": { full: "Ryan Holiday", role: "Author, The Obstacle is the Way" },
  "Brené Brown": { full: "Brené Brown", role: "Researcher, Vulnerability & Courage" },
  "Kobe Bryant": { full: "Kobe Bryant", role: "The Mamba Mentality" },
  "LeBron James": { full: "LeBron James", role: "Athlete & Entrepreneur" },
  "Peter Attia": { full: "Peter Attia", role: "Author, Outlive" },
  "Martin Seligman": { full: "Martin Seligman", role: "Father of Positive Psychology" },
  "Nassim Taleb": { full: "Nassim Taleb", role: "Author, Antifragile" },
  "Jeff Bezos": { full: "Jeff Bezos", role: "Founder, Amazon" },
  "Scott Adams": { full: "Scott Adams", role: "Creator of Dilbert" },
  "Dave Ramsey": { full: "Dave Ramsey", role: "Personal Finance Expert" },
  "Dan Ariely": { full: "Dan Ariely", role: "Behavioral Economist, Duke" },
  "Elon Musk": { full: "Elon Musk", role: "CEO, Tesla & SpaceX" },
};

export function extractSourceName(description: string): string | null {
  for (const [name] of Object.entries(KNOWN_SOURCES)) {
    if (description.includes(name)) return name;
  }
  return null;
}

export function extractSourceInfo(description: string): { name: string; role: string } | null {
  for (const [name, info] of Object.entries(KNOWN_SOURCES)) {
    if (description.includes(name)) return { name: info.full, role: info.role };
  }
  return null;
}

// ─── Extract a quote from the description ───

export function extractQuote(description: string): { text: string; author: string } | null {
  const sourceInfo = extractSourceInfo(description);
  if (!sourceInfo) return null;

  // Find sentences that feel like quotes (mentions the person + says/teaches/writes/argues)
  const sentences = description.split(/\.\s+/);
  const quoteSentence = sentences.find(s =>
    s.includes(sourceInfo.name.split(" ").pop()!) &&
    /says|teaches|writes|argues|emphasizes|describes|found|discovered|calls/i.test(s)
  );

  if (quoteSentence) {
    return { text: quoteSentence.trim() + ".", author: sourceInfo.name };
  }
  return null;
}

// ─── Key Insight Extraction ───

export function extractKeyInsight(description: string): string {
  const sentences = description.split(/\.\s+/);
  const actionSentence = sentences.find(s =>
    /should|must|need|key|important|research|study|found|shows|proves|confirm/i.test(s)
    && s.length > 30
    && s.length < 200
  );
  if (actionSentence) return actionSentence.trim() + ".";

  const idx = sentences.length >= 3 ? 2 : sentences.length >= 2 ? 1 : 0;
  return (sentences[idx] || sentences[0]).trim() + ".";
}

// ─── Extract 3 Key Takeaways ───

export function extractTakeaways(description: string): string[] {
  const sentences = description.split(/\.\s+/).filter(s => s.length > 20 && s.length < 150);

  const takeaways: string[] = [];

  // Find sentences with actionable language
  const patterns = [
    /the (?:key|secret|truth|difference|problem|solution|first step|best)/i,
    /you (?:should|need|can|must|will)/i,
    /most people|research shows|studies show|the data|evidence/i,
  ];

  for (const pattern of patterns) {
    const match = sentences.find(s => pattern.test(s) && !takeaways.includes(s.trim() + "."));
    if (match) takeaways.push(match.trim() + ".");
    if (takeaways.length >= 3) break;
  }

  // Fill remaining with other meaningful sentences
  while (takeaways.length < 3 && sentences.length > takeaways.length) {
    const s = sentences[takeaways.length + 1];
    if (s && !takeaways.includes(s.trim() + ".")) {
      takeaways.push(s.trim() + ".");
    } else break;
  }

  return takeaways;
}

// ─── Estimated Read Time ───

export function estimateReadTime(description: string, actionStep: string): number {
  const wordCount = (description + " " + actionStep).split(/\s+/).length;
  return Math.max(3, Math.ceil(wordCount / 200)); // ~200 words per minute, minimum 3 min
}

// ─── Action Step Splitter ───

export function splitActionSteps(actionStep: string): string[] {
  const parts = actionStep
    .split(/\.\s+/)
    .map(s => s.trim())
    .filter(s => s.length > 10);

  if (parts.length >= 2 && parts.length <= 5) {
    return parts.map(p => p.endsWith(".") ? p : p + ".");
  }

  const thenParts = actionStep
    .split(/\.\s*(?:Then|And then|Next|After that|Finally)/i)
    .map(s => s.trim())
    .filter(s => s.length > 10);

  if (thenParts.length >= 2) {
    return thenParts.map(p => p.endsWith(".") ? p : p + ".");
  }

  return [actionStep];
}

// ─── "Did You Know?" Stat ───

export function extractStat(description: string): string | null {
  const patterns = [
    /(\d+)\s*percent[^.]*\./i,
    /(\d+)\s*%[^.]*\./i,
    /₱[\d,]+[^.]*\./,
    /\d+\s*(?:hours?|days?|weeks?|months?|years?)[^.]*\./i,
  ];

  for (const pattern of patterns) {
    const match = description.match(pattern);
    if (match) return match[0].trim();
  }
  return null;
}

// ─── Module Opener ───

export function isModuleOpener(lessonOrder: number): boolean {
  return lessonOrder === 1;
}

// ─── Tool Spotlights (Pro/AI) ───

export interface ToolSpotlight {
  name: string;
  description: string;
  cost: string;
  url: string;
}

const TOOL_MAP: Record<string, ToolSpotlight[]> = {
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
  "Finding Winning Products": [
    { name: "Shopee Seller Center", description: "Research trending products and competitor prices", cost: "Free", url: "https://seller.shopee.ph" },
  ],
  "Setting Up Your Store": [
    { name: "Shopee Seller Center", description: "Set up, manage, and optimize your store", cost: "Free", url: "https://seller.shopee.ph" },
  ],
  "Listing Optimization": [
    { name: "Canva", description: "Create product photos that convert", cost: "Free plan available", url: "https://canva.com" },
  ],
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
  // AI Track tools
  "What is Claude and Why It Changes Everything": [
    { name: "Claude", description: "AI assistant by Anthropic — your business partner", cost: "Free tier available", url: "https://claude.ai" },
  ],
  "How to Think With AI: The Prompt Framework": [
    { name: "Claude", description: "Practice the RICE framework here", cost: "Free tier available", url: "https://claude.ai" },
  ],
  "Setting Up ManyChat with AI Responses": [
    { name: "ManyChat", description: "Automate Facebook and Instagram messaging", cost: "Free up to 1,000 contacts", url: "https://manychat.com" },
  ],
  "Claude as Your Creative Director": [
    { name: "Claude", description: "Your AI creative partner for copy and strategy", cost: "Free tier available", url: "https://claude.ai" },
    { name: "Canva", description: "Design tool with AI features", cost: "Free plan available", url: "https://canva.com" },
  ],
  "What is Claude Code and Why It Matters": [
    { name: "Claude Code", description: "AI that writes code for you — zero experience needed", cost: "Requires Claude Pro ($20/mo)", url: "https://claude.ai" },
    { name: "Vercel", description: "Deploy websites for free in one click", cost: "Free tier", url: "https://vercel.com" },
  ],
};

export function getToolSpotlight(lessonTitle: string): ToolSpotlight[] | null {
  return TOOL_MAP[lessonTitle] || null;
}

// ─── Real Numbers ───

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
  "Your First AI Service: The 2-Hour Project": "AI FAQ systems sell for ₱3,000–₱8,000. Takes 2 hours to build. That is ₱1,500–₱4,000/hour.",
  "The Complete AI Customer Service Package": "Full chatbot + automation package: ₱20,000–₱35,000 setup + ₱3,000–₱5,000/month maintenance.",
  "The 30-Day Content Machine": "Content retainers: ₱8,000–₱18,000/month per client. 5 clients = ₱40,000–₱90,000/month.",
  "Your First Website in 60 Minutes": "Simple landing pages sell for ₱15,000–₱25,000. Built in 2–4 hours with Claude Code.",
  "Building a Booking System": "Custom booking systems sell for ₱25,000–₱40,000. Salons and clinics need them desperately.",
};

export function getRealNumbers(lessonTitle: string): string | null {
  return EARNINGS_MAP[lessonTitle] || null;
}
