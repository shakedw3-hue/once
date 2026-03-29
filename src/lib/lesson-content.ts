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

// ─── Template Downloads ───

export interface TemplateData {
  name: string;
  description: string;
  items: string[];
  url: string;
  proOnly?: boolean;
}

const TEMPLATE_MAP: Record<string, TemplateData> = {
  // ── Money Core Modules ──
  "Financial Direction": {
    name: "30-Day Budget Tracker",
    description: "A simple daily tracker to see exactly where your money goes for one full month.",
    items: ["Daily expense log", "Category breakdown", "Weekly totals", "End-of-month summary"],
    url: "#",
  },
  "Opportunity Thinking": {
    name: "Savings Goal Planner",
    description: "Set clear savings targets and track your progress week by week.",
    items: ["Goal calculator", "Weekly savings tracker", "Milestone checkpoints", "Visual progress bar"],
    url: "#",
  },
  "Decision Frameworks": {
    name: "Net Worth Calculator",
    description: "Know your real financial position by listing everything you own and owe.",
    items: ["Asset inventory", "Liability tracker", "Net worth formula", "Monthly comparison"],
    url: "#",
  },
  "Smart Money Management": {
    name: "Investment Starter Checklist",
    description: "A step-by-step checklist to go from zero to your first investment in the Philippines.",
    items: ["Emergency fund check", "Account setup guide", "First investment steps", "Risk assessment"],
    url: "#",
  },
  "Risk Thinking": {
    name: "Money Emergency Plan",
    description: "Prepare for the unexpected so one bad month does not destroy your progress.",
    items: ["Emergency fund calculator", "Insurance checklist", "Income backup plan", "Critical contacts list"],
    url: "#",
  },

  // ── Mind Core Modules ──
  "Focus Reset": {
    name: "Weekly Reflection Journal",
    description: "A structured journal to review your week, celebrate wins, and plan ahead.",
    items: ["Weekly wins log", "Lessons learned section", "Next week intentions", "Gratitude prompts"],
    url: "#",
  },
  "Stress Control": {
    name: "Habit Tracker",
    description: "Track your daily habits with a simple visual system that builds momentum.",
    items: ["30-day grid tracker", "Habit stacking planner", "Streak counter", "Monthly review"],
    url: "#",
  },
  "Emotional Resilience": {
    name: "Focus Session Planner",
    description: "Plan deep work sessions that protect your most productive hours.",
    items: ["Time block template", "Distraction log", "Energy mapping", "Session review"],
    url: "#",
  },
  "Decision Clarity": {
    name: "Reading & Learning Log",
    description: "Capture key ideas from everything you read, watch, or listen to.",
    items: ["Book notes template", "Key insight cards", "Action items from learning", "Monthly reading goals"],
    url: "#",
  },
  "Habit Architecture": {
    name: "Personal Values Map",
    description: "Define what matters most to you and use it to guide every decision.",
    items: ["Values discovery exercise", "Priority ranking", "Decision filter", "Alignment check"],
    url: "#",
  },

  // ── Body Core Modules ──
  "Energy Reset": {
    name: "7-Day Meal Planner",
    description: "Plan affordable, healthy meals for one week — designed for Filipino ingredients.",
    items: ["7-day meal grid", "Grocery list generator", "Budget per meal", "Prep schedule"],
    url: "#",
  },
  "Training Consistency": {
    name: "Workout Log",
    description: "Track your exercises, sets, and progress over time with a simple log.",
    items: ["Exercise tracker", "Progressive overload log", "Weekly volume summary", "Personal records"],
    url: "#",
  },
  "Nutrition Simplicity": {
    name: "Sleep Quality Tracker",
    description: "Monitor your sleep patterns and find what actually helps you rest better.",
    items: ["Bedtime and wake time log", "Sleep quality rating", "Pre-sleep routine checklist", "Weekly sleep score"],
    url: "#",
  },
  "Recovery": {
    name: "Energy Audit Sheet",
    description: "Map your energy levels throughout the day to find your peak performance windows.",
    items: ["Hourly energy log", "Activity correlation", "Peak hours finder", "Optimization plan"],
    url: "#",
  },
  "Movement & Mobility": {
    name: "Health Check Checklist",
    description: "A comprehensive checklist to track key health markers and checkup schedules.",
    items: ["Vital stats tracker", "Annual checkup schedule", "Symptom log", "Health goals"],
    url: "#",
  },

  // ── Spirit Core Modules ──
  "Meaning & Direction": {
    name: "Daily Gratitude Journal",
    description: "A simple daily practice to shift your focus toward what is already good.",
    items: ["3 daily gratitudes", "Weekly gratitude review", "Gratitude letter template", "Monthly reflection"],
    url: "#",
  },
  "Gratitude Practice": {
    name: "Meditation Progress Log",
    description: "Track your meditation practice and watch your consistency grow.",
    items: ["Session duration log", "Technique notes", "Streak tracker", "Monthly insights"],
    url: "#",
  },
  "Daily Reflection": {
    name: "Relationship Health Check",
    description: "Assess and strengthen your most important relationships intentionally.",
    items: ["Relationship inventory", "Quality time tracker", "Communication checklist", "Monthly check-in prompts"],
    url: "#",
  },
  "Values Alignment": {
    name: "Life Purpose Worksheet",
    description: "Work through guided questions to find clarity on what gives your life meaning.",
    items: ["Purpose discovery questions", "Strengths inventory", "Impact statement builder", "Vision board template"],
    url: "#",
  },
  "Inner Peace & Stillness": {
    name: "Daily Intention Setter",
    description: "Start every day with a clear intention and end it with a brief review.",
    items: ["Morning intention prompt", "Evening review template", "Weekly intention tracker", "Alignment score"],
    url: "#",
  },

  // ── Pro: VA Track ──
  "Client Communication Mastery": {
    name: "Client Proposal Template",
    description: "A professional proposal template to win clients and set clear expectations.",
    items: ["Service overview section", "Pricing table", "Timeline template", "Terms and conditions"],
    url: "#",
    proOnly: true,
  },
  "Scaling to 40K Per Month": {
    name: "Weekly VA Report",
    description: "A professional report template to keep clients informed and impressed.",
    items: ["Task completion summary", "Hours breakdown", "Key achievements", "Next week plan"],
    url: "#",
    proOnly: true,
  },
  "Building Systems and SOPs": {
    name: "SOP Builder",
    description: "Create standard operating procedures that make your work repeatable and scalable.",
    items: ["Step-by-step template", "Screenshot placeholders", "Version control", "Training checklist"],
    url: "#",
    proOnly: true,
  },

  // ── Pro: Social Media Track ──
  "Content Creation Systems": {
    name: "30-Day Content Calendar",
    description: "Plan an entire month of social media content in one sitting.",
    items: ["Daily post planner", "Content pillars guide", "Hashtag strategy", "Engagement tracker"],
    url: "#",
    proOnly: true,
  },
  "Analytics and Reporting": {
    name: "Analytics Report Template",
    description: "A clean report template to show clients the results of your work.",
    items: ["KPI dashboard", "Growth metrics", "Top performing posts", "Recommendations section"],
    url: "#",
    proOnly: true,
  },

  // ── Pro: E-commerce Track ──
  "Finding Winning Products": {
    name: "Product Research Spreadsheet",
    description: "Evaluate products systematically before investing a single peso.",
    items: ["Product scoring matrix", "Competition analysis", "Demand indicators", "Supplier comparison"],
    url: "#",
    proOnly: true,
  },
  "Listing Optimization": {
    name: "Pricing & Margin Calculator",
    description: "Calculate your true profit per product including all fees and shipping.",
    items: ["Cost breakdown calculator", "Platform fee tracker", "Shipping cost matrix", "Profit per unit formula"],
    url: "#",
    proOnly: true,
  },

  // ── Pro: Freelance Track ──
  "Building a Portfolio in 7 Days": {
    name: "Portfolio Builder",
    description: "A structured template to showcase your skills even with zero client experience.",
    items: ["Project case study template", "Skills showcase section", "Testimonial placeholders", "Contact page layout"],
    url: "#",
    proOnly: true,
  },
  "Pricing and Negotiation": {
    name: "Rate Card Template",
    description: "A professional rate card that positions you as an expert, not a commodity.",
    items: ["Service tiers", "Package pricing", "Add-on menu", "Payment terms"],
    url: "#",
    proOnly: true,
  },

  // ── AI: Content Track ──
  "Claude as Your Creative Director": {
    name: "AI Prompt Library",
    description: "A collection of proven prompts for content creation, strategy, and client work.",
    items: ["Content writing prompts", "Strategy prompts", "Client communication prompts", "Research prompts"],
    url: "#",
    proOnly: true,
  },
  "The 30-Day Content Machine": {
    name: "Client Brief Template",
    description: "Gather everything you need from clients to deliver great AI-powered content.",
    items: ["Brand voice questionnaire", "Content goals worksheet", "Target audience profile", "Deliverables checklist"],
    url: "#",
    proOnly: true,
  },

  // ── AI: Customer Service Track ──
  "Setting Up ManyChat with AI Responses": {
    name: "Chatbot Flow Template",
    description: "A ready-made conversation flow for common customer service scenarios.",
    items: ["Welcome sequence", "FAQ decision tree", "Escalation paths", "Follow-up sequences"],
    url: "#",
    proOnly: true,
  },
  "Your First AI Service: The 2-Hour Project": {
    name: "Client Onboarding Checklist",
    description: "A step-by-step checklist to onboard new AI service clients professionally.",
    items: ["Discovery call questions", "Access requirements list", "Setup timeline", "Handoff checklist"],
    url: "#",
    proOnly: true,
  },
};

export function getTemplate(moduleTitle: string): TemplateData | null {
  return TEMPLATE_MAP[moduleTitle] || null;
}

// ─── Quiz Questions ───

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const QUIZ_MAP: Record<string, QuizQuestion> = {
  // ============================================================
  // MONEY PILLAR — Financial Direction (5)
  // ============================================================
  "Where Your Money Actually Goes": {
    question: "What is the most common reason people overspend according to behavioral economics?",
    options: [
      "They earn too little",
      "They lack awareness of their spending patterns",
      "They have too many expenses",
      "They don't use budgeting apps",
    ],
    correctIndex: 1,
    explanation: "Research shows that lack of awareness — not income level — is the primary driver of overspending. Tracking makes the invisible visible.",
  },
  "Your Real Hourly Rate": {
    question: "A BPO agent earns 25,000/month and commutes 3 hours daily. What does the real hourly rate account for that the payslip does not?",
    options: [
      "Tax deductions only",
      "Benefits and bonuses",
      "Commute time, overtime, and preparation",
      "Cost of meals at work",
    ],
    correctIndex: 2,
    explanation: "Your real hourly rate includes all hidden time investments — commute, prep, and unpaid overtime. This number reveals the true cost of your job.",
  },
  "The Two-Account System": {
    question: "What is the core principle behind the two-account system?",
    options: [
      "Keep one account for savings and one for investments",
      "Separate money so you pay yourself first before spending",
      "Use two banks for better interest rates",
      "Keep one account secret from your family",
    ],
    correctIndex: 1,
    explanation: "The two-account system automates paying yourself first. When saving is automatic, willpower is removed from the equation.",
  },
  "Setting a Financial North Star": {
    question: "According to Dominican University research, how much more likely are you to achieve goals you write down?",
    options: [
      "10 percent more likely",
      "25 percent more likely",
      "42 percent more likely",
      "60 percent more likely",
    ],
    correctIndex: 2,
    explanation: "People who write specific goals are 42 percent more likely to achieve them. Vague wishes rarely become reality — specific numbers do.",
  },
  "The Monthly Money Review Ritual": {
    question: "What is the most important outcome of a monthly money review?",
    options: [
      "Feeling guilty about spending",
      "Creating a feedback loop that keeps you on track",
      "Calculating your net worth precisely",
      "Finding ways to cut all non-essential spending",
    ],
    correctIndex: 1,
    explanation: "The review creates a feedback loop. Without regular check-ins, even the best financial plan drifts over time.",
  },

  // ============================================================
  // MONEY — Opportunity Thinking (5)
  // ============================================================
  "Seeing Problems as Peso Signs": {
    question: "What is the first step in developing opportunity thinking?",
    options: [
      "Research trending businesses online",
      "Listen differently to complaints around you",
      "Ask wealthy people for advice",
      "Read business books",
    ],
    correctIndex: 1,
    explanation: "Every complaint is a potential business. Jollibee, GCash — the biggest Philippine success stories started by solving a daily frustration.",
  },
  "The Skill Stack Advantage": {
    question: "What makes a skill stack more valuable than a single specialized skill?",
    options: [
      "It looks more impressive on a resume",
      "Combining 2-3 good skills creates a rare, hard-to-replace combination",
      "Employers prefer generalists over specialists",
      "It allows you to switch careers more easily",
    ],
    correctIndex: 1,
    explanation: "You do not need to be world-class at one thing. Being good at 2-3 complementary skills creates a combination that very few people have.",
  },
  "Testing Before Investing": {
    question: "What is the safest way to validate a business idea before investing serious money?",
    options: [
      "Ask friends and family for their opinion",
      "Create a business plan and get a loan",
      "Run a small, cheap test to see if people actually pay",
      "Research competitors and copy what works",
    ],
    correctIndex: 2,
    explanation: "Opinions are free and unreliable. The only test that matters is whether strangers will pay real money for your solution.",
  },
  "Reading the Market Around You": {
    question: "Which signal best indicates real market demand in your area?",
    options: [
      "A product is trending on social media",
      "Your neighbor started the same business",
      "People are already paying for an imperfect version of the solution",
      "A celebrity endorsed the product",
    ],
    correctIndex: 2,
    explanation: "When people already pay for an imperfect solution, the demand is proven. Your job is to offer something slightly better, not to create demand from scratch.",
  },
  "Building an Opportunity Pipeline": {
    question: "Why should you maintain multiple potential opportunities instead of betting everything on one idea?",
    options: [
      "Because it impresses investors",
      "Because most ideas fail and you need backup options",
      "Because it is fun to have many projects",
      "Because you can work on all of them at once",
    ],
    correctIndex: 1,
    explanation: "A pipeline protects you from putting all your eggs in one basket. When one idea fails, you already have the next one ready to test.",
  },

  // ============================================================
  // MONEY — Smart Decisions (5)
  // ============================================================
  "The Regret Minimization Framework": {
    question: "When using the regret minimization framework, which version of yourself should you consult?",
    options: [
      "Your present self",
      "Your 80-year-old self looking back",
      "Your parents or mentors",
      "Your most successful friend",
    ],
    correctIndex: 1,
    explanation: "Jeff Bezos asks: will my 80-year-old self regret NOT trying this? This perspective cuts through short-term fear and reveals what truly matters.",
  },
  "Reversible vs Irreversible Decisions": {
    question: "Why is it important to distinguish between reversible and irreversible decisions?",
    options: [
      "Irreversible decisions are always the best ones",
      "Reversible decisions should be made slowly and carefully",
      "Reversible decisions can be made quickly since you can undo them",
      "All financial decisions are irreversible",
    ],
    correctIndex: 2,
    explanation: "Most decisions are reversible — treat them like two-way doors. Move fast, learn, and adjust. Save your careful analysis for the truly irreversible ones.",
  },
  "The 10/10/10 Rule for Money Decisions": {
    question: "What does the 10/10/10 Rule ask you to consider?",
    options: [
      "Invest 10% in stocks, 10% in bonds, 10% in savings",
      "How you will feel about this decision in 10 minutes, 10 months, and 10 years",
      "Save 10,000 pesos for 10 months to reach 100,000",
      "Compare 10 products, 10 prices, and 10 reviews",
    ],
    correctIndex: 1,
    explanation: "The 10/10/10 rule breaks you out of emotional decision-making by forcing you to consider three different time horizons.",
  },
  "Opportunity Cost Is the Real Price": {
    question: "What is opportunity cost?",
    options: [
      "The fees you pay when investing",
      "The price of the most expensive option",
      "What you give up by choosing one option over another",
      "The cost of waiting too long to decide",
    ],
    correctIndex: 2,
    explanation: "Every peso spent has a hidden price: the best alternative you could have used it for. Thinking in opportunity costs reveals the true price of every choice.",
  },
  "Building Your Personal Decision Checklist": {
    question: "Why is a personal decision checklist more effective than intuition alone?",
    options: [
      "Because intuition is always wrong",
      "Because checklists prevent you from skipping steps when emotions run high",
      "Because successful people never trust their gut",
      "Because it impresses others when you show your process",
    ],
    correctIndex: 1,
    explanation: "Even experts make worse decisions under stress. A checklist ensures you cover the basics even when emotions cloud your judgment.",
  },

  // ============================================================
  // MONEY — Market Awareness (5)
  // ============================================================
  "Why Most People Lose Money Trading": {
    question: "What is the number one reason most retail traders lose money?",
    options: [
      "They do not have enough capital",
      "The market is rigged against small traders",
      "They trade based on emotion instead of a rules-based plan",
      "They pick the wrong stocks",
    ],
    correctIndex: 2,
    explanation: "Emotional trading — buying on hype, selling on fear — is the primary wealth destroyer. A rules-based plan removes emotion from the equation.",
  },
  "Reading Price Action Like a Story": {
    question: "What does a price chart fundamentally represent?",
    options: [
      "Random mathematical patterns",
      "The collective psychology and decisions of all market participants",
      "What big institutions want the price to be",
      "Historical data that cannot predict the future",
    ],
    correctIndex: 1,
    explanation: "Every candle on a chart tells a story of buyers and sellers making decisions. Learning to read this story gives you an edge over emotional traders.",
  },
  "Support and Resistance: Where Price Has Memory": {
    question: "What creates a support level in a market?",
    options: [
      "A government agency sets minimum prices",
      "Enough buyers consistently step in at that price, preventing further drops",
      "Trading algorithms automatically buy at round numbers",
      "News reports create support through positive sentiment",
    ],
    correctIndex: 1,
    explanation: "Support forms where buyers collectively agree that a price is good value. Price has memory — levels that held before tend to hold again.",
  },
  "Moving Averages: Filtering the Noise": {
    question: "What is the primary purpose of a moving average?",
    options: [
      "To predict exactly where price will go next",
      "To smooth out price data and reveal the underlying trend direction",
      "To calculate the average profit of all traders",
      "To determine the correct buy price",
    ],
    correctIndex: 1,
    explanation: "Moving averages filter out day-to-day noise so you can see the real trend. They do not predict the future — they clarify the present.",
  },
  "Building a Simple Rules-Based Trading Plan": {
    question: "What must every rules-based trading plan include BEFORE entering a trade?",
    options: [
      "A tip from a trusted source",
      "A feeling that the market will go up",
      "Pre-defined entry, exit, and stop-loss levels",
      "Confirmation from at least three indicators",
    ],
    correctIndex: 2,
    explanation: "Pre-defined rules for entry, exit, and stop-loss remove emotion from trading. If you do not know when to get out before you get in, you are gambling.",
  },

  // ============================================================
  // MONEY — Financial Protection (5)
  // ============================================================
  "The Emergency Fund Is Not Optional": {
    question: "How many months of expenses should an emergency fund cover at minimum?",
    options: [
      "1 month",
      "3 months",
      "6 months",
      "12 months",
    ],
    correctIndex: 1,
    explanation: "Three months of expenses is the minimum safety net. Without it, a single emergency — hospital, job loss, typhoon — can destroy years of financial progress.",
  },
  "Understanding Risk vs Recklessness": {
    question: "What is the key difference between calculated risk and recklessness?",
    options: [
      "Risk involves money; recklessness does not",
      "Risk has a researched upside and a survivable downside; recklessness ignores the downside",
      "Recklessness always leads to failure",
      "There is no real difference, risk is risk",
    ],
    correctIndex: 1,
    explanation: "Smart risk-takers always ask: can I survive the worst case? If the downside is not survivable, it is not a risk — it is recklessness.",
  },
  "Never Risk What You Cannot Afford to Lose": {
    question: "Before investing in any opportunity, what question should you ask yourself first?",
    options: [
      "How much can I earn?",
      "What are other people investing in?",
      "If I lose this money entirely, will it affect my ability to pay bills and eat?",
      "Is this a trending investment?",
    ],
    correctIndex: 2,
    explanation: "The first rule of investing is survival. Never put essential money — rent, food, emergency fund — into any investment, no matter how promising.",
  },
  "Diversification Is Not Just for the Rich": {
    question: "Why is diversification important even with small amounts of money?",
    options: [
      "Because it guarantees higher returns",
      "Because putting everything in one place means one failure wipes you out",
      "Because banks require you to have multiple accounts",
      "Because it is a legal requirement for investments",
    ],
    correctIndex: 1,
    explanation: "Diversification is not about maximizing returns — it is about ensuring survival. One bad bet should never be able to destroy everything you built.",
  },
  "Protecting Against Scams and False Promises": {
    question: "What is the biggest red flag that an investment opportunity is likely a scam?",
    options: [
      "It requires a minimum investment",
      "It uses complicated financial terminology",
      "It promises guaranteed high returns with no risk",
      "It is offered by someone you know personally",
    ],
    correctIndex: 2,
    explanation: "No legitimate investment can guarantee high returns with zero risk. If someone promises this, they are either lying or do not understand what they are selling.",
  },

  // ============================================================
  // MIND PILLAR — Focused Attention (5)
  // ============================================================
  "The True Cost of a Distraction": {
    question: "How long does it take on average to fully refocus after a phone notification interrupts deep work?",
    options: [
      "About 30 seconds",
      "About 5 minutes",
      "About 23 minutes",
      "About 1 hour",
    ],
    correctIndex: 2,
    explanation: "Research from UC Irvine found it takes an average of 23 minutes to fully return to a task after an interruption. A single notification costs far more than you think.",
  },
  "The 90-Minute Focus Block": {
    question: "Why is 90 minutes considered the optimal length for a deep focus session?",
    options: [
      "It is a convenient round number",
      "It matches the brain's natural ultradian rhythm cycle",
      "Most meetings last 90 minutes",
      "Research shows productivity drops after exactly 90 minutes",
    ],
    correctIndex: 1,
    explanation: "The brain operates in 90-minute ultradian cycles of high and low alertness. Working with this rhythm instead of against it produces better results with less fatigue.",
  },
  "Designing Your Environment for Focus": {
    question: "What is the most effective way to avoid phone distractions during deep work?",
    options: [
      "Turn on Do Not Disturb mode",
      "Put the phone face down on the desk",
      "Place the phone in another room entirely",
      "Delete social media apps",
    ],
    correctIndex: 2,
    explanation: "Studies show that the mere presence of your phone on the desk reduces cognitive capacity — even when it is face down and silent. Physical distance is the only reliable solution.",
  },
  "Single-Tasking: The Forgotten Superpower": {
    question: "What happens in the brain when you try to multitask?",
    options: [
      "It processes both tasks simultaneously and efficiently",
      "It rapidly switches between tasks, losing performance on both",
      "It prioritizes the more important task automatically",
      "It enters a heightened state of productivity",
    ],
    correctIndex: 1,
    explanation: "The brain cannot truly multitask on cognitive work. What feels like multitasking is actually rapid task-switching, which reduces quality and increases errors on both tasks.",
  },
  "Building a Daily Shutdown Ritual": {
    question: "What is the primary benefit of a daily shutdown ritual?",
    options: [
      "It helps you finish work faster",
      "It creates a clear boundary between work and rest so your brain can truly recover",
      "It makes your boss think you are more organized",
      "It helps you plan tomorrow's outfit",
    ],
    correctIndex: 1,
    explanation: "Without a shutdown ritual, your brain keeps processing work problems in the background. A clear ending allows genuine recovery, which improves tomorrow's performance.",
  },

  // ============================================================
  // MIND — Stress Mastery (5)
  // ============================================================
  "The Physiological Sigh: Instant Calm in 30 Seconds": {
    question: "How does the physiological sigh work to reduce stress?",
    options: [
      "It distracts you from stressful thoughts",
      "Two short inhales through the nose followed by a long exhale activates the parasympathetic nervous system",
      "It increases oxygen to the brain making you think more clearly",
      "It is a form of meditation that takes 30 minutes to master",
    ],
    correctIndex: 1,
    explanation: "The double inhale maximally inflates the alveoli, and the long exhale triggers the calming parasympathetic response. It is the fastest evidence-based way to reduce stress in real time.",
  },
  "Stress Is Not the Enemy, Chronic Stress Is": {
    question: "What is the key difference between acute stress and chronic stress?",
    options: [
      "Acute stress is physical while chronic stress is mental",
      "Acute stress is short-term and can improve performance; chronic stress is ongoing and damages health",
      "Chronic stress only affects older people",
      "There is no meaningful difference between them",
    ],
    correctIndex: 1,
    explanation: "Short bursts of stress sharpen focus and build resilience. But when stress never turns off, it damages your immune system, sleep, and cognitive function.",
  },
  "The Stress Audit: Finding Your Hidden Triggers": {
    question: "Why do you need to identify your specific stress triggers?",
    options: [
      "So you can avoid all stressful situations",
      "Because knowing your triggers allows you to prepare responses before they hit",
      "So your doctor can prescribe the right medication",
      "Because stress triggers are the same for everyone",
    ],
    correctIndex: 1,
    explanation: "You cannot manage what you have not identified. When you know your specific triggers, you can build targeted strategies instead of reacting blindly every time.",
  },
  "Building a Stress Recovery Toolkit": {
    question: "Why should a stress recovery toolkit include MULTIPLE techniques?",
    options: [
      "Because one technique is never enough",
      "Because different types of stress require different recovery approaches",
      "Because you need to practice each one for 30 days",
      "Because therapists recommend at least 5 techniques",
    ],
    correctIndex: 1,
    explanation: "Physical stress needs physical recovery. Emotional stress needs connection or expression. Mental stress needs rest or play. Matching the tool to the type of stress is key.",
  },
  "Stress-Proofing Your Daily Routine": {
    question: "What is the most effective way to reduce daily stress long-term?",
    options: [
      "Avoid all stressful situations",
      "Take medication for anxiety",
      "Build stress-recovery habits into your daily routine before stress hits",
      "Work harder so you finish tasks faster",
    ],
    correctIndex: 2,
    explanation: "Proactive stress management — building recovery into your routine — is far more effective than reactive coping. Prevention always beats treatment.",
  },

  // ============================================================
  // MIND — Emotional Intelligence (5)
  // ============================================================
  "The Gap Between Event and Reaction": {
    question: "What exists between a triggering event and your emotional reaction?",
    options: [
      "Nothing — reactions are automatic and unavoidable",
      "A space where you can choose your response",
      "A physical delay caused by nerve signals",
      "A gap that only meditators can access",
    ],
    correctIndex: 1,
    explanation: "Viktor Frankl taught that between stimulus and response there is a space. In that space lies your freedom and your power to choose. Training widens this gap.",
  },
  "Labeling Emotions to Defuse Them": {
    question: "What does neuroscience research show happens when you name an emotion you are feeling?",
    options: [
      "It makes the emotion stronger because you focus on it",
      "It activates the prefrontal cortex and reduces amygdala intensity",
      "It has no measurable effect on brain activity",
      "It only works if you say the name out loud",
    ],
    correctIndex: 1,
    explanation: "Brain imaging shows that the simple act of labeling an emotion — 'I am feeling frustrated' — reduces activity in the emotional brain and increases prefrontal regulation.",
  },
  "Reframing Setbacks as Data": {
    question: "What is the most productive way to view a failure or setback?",
    options: [
      "As proof that you are not good enough",
      "As something to forget and move past quickly",
      "As data that tells you what to adjust next time",
      "As a sign that you should try something completely different",
    ],
    correctIndex: 2,
    explanation: "Setbacks are information, not identity. When you treat failure as feedback, you extract the lesson and keep moving forward instead of spiraling into self-doubt.",
  },
  "Building Your Resilience Baseline": {
    question: "What builds resilience most effectively?",
    options: [
      "Avoiding difficult situations",
      "Repeatedly facing and recovering from manageable challenges",
      "Reading books about resilience",
      "Having a naturally tough personality",
    ],
    correctIndex: 1,
    explanation: "Resilience is built like a muscle — through progressive exposure to challenge followed by recovery. Avoiding difficulty makes you fragile; facing it makes you stronger.",
  },
  "The Resilience of Meaning": {
    question: "According to Viktor Frankl, what is the strongest source of resilience?",
    options: [
      "Physical strength and health",
      "Financial security and wealth",
      "Having a purpose that is bigger than your suffering",
      "A strong social network",
    ],
    correctIndex: 2,
    explanation: "Frankl survived the concentration camps and concluded: those who had a 'why' could endure almost any 'how.' Purpose makes suffering bearable.",
  },

  // ============================================================
  // MIND — Clear Thinking (5)
  // ============================================================
  "Why Your Brain Fogs Under Pressure": {
    question: "What causes brain fog when you are under pressure?",
    options: [
      "Lack of caffeine",
      "The amygdala hijacks resources from the prefrontal cortex, reducing clear thinking",
      "Your brain runs out of glucose",
      "Pressure has no effect on brain function",
    ],
    correctIndex: 1,
    explanation: "Under threat, the amygdala diverts resources from the prefrontal cortex — your thinking brain — to the survival brain. This is why you cannot think clearly when stressed.",
  },
  "The Power of Sleeping On It": {
    question: "Why does 'sleeping on it' often lead to better decisions?",
    options: [
      "Because you forget about the problem",
      "Because sleep consolidates information and allows the subconscious to process solutions",
      "Because morning people make better decisions",
      "It does not — it is just a way to procrastinate",
    ],
    correctIndex: 1,
    explanation: "During sleep, the brain reorganizes information, strengthens relevant connections, and prunes noise. The solution that 'comes to you' in the morning is real neuroscience, not magic.",
  },
  "Thinking in Probabilities, Not Certainties": {
    question: "Why is thinking in probabilities better than thinking in certainties?",
    options: [
      "It makes you sound smarter in conversations",
      "It protects you from overconfidence and helps you prepare for multiple outcomes",
      "Probabilities are always more accurate than gut feelings",
      "It eliminates all risk from decisions",
    ],
    correctIndex: 1,
    explanation: "Certainty thinking leads to surprise when things go wrong. Probability thinking — 'there is a 70% chance this works' — prepares you for reality and reduces emotional shock.",
  },
  "The Pre-Mortem: Killing Bad Decisions Before They Happen": {
    question: "What is a pre-mortem?",
    options: [
      "An autopsy performed on a failed project",
      "A technique where you imagine a decision has failed and work backward to find why",
      "A checklist you complete before starting any project",
      "A meeting where the team votes on the best option",
    ],
    correctIndex: 1,
    explanation: "A pre-mortem asks: assume this failed. Why? By imagining failure before it happens, you identify and fix vulnerabilities that optimism would have hidden.",
  },
  "Decision Journaling: Learning From Your Own Track Record": {
    question: "What should a decision journal entry capture BEFORE you know the outcome?",
    options: [
      "Only the final decision",
      "The decision, your reasoning, what you expected, and your confidence level",
      "A list of pros and cons",
      "What other people advised you to do",
    ],
    correctIndex: 1,
    explanation: "Recording your reasoning and confidence before the outcome prevents hindsight bias. You can later see if you were right for the right reasons — or just lucky.",
  },

  // ============================================================
  // MIND — Habit Design (5)
  // ============================================================
  "The Habit Loop: Cue, Craving, Response, Reward": {
    question: "What are the four components of the habit loop?",
    options: [
      "Goal, Plan, Action, Result",
      "Cue, Craving, Response, Reward",
      "Trigger, Behavior, Outcome, Repeat",
      "Start, Continue, Evaluate, Finish",
    ],
    correctIndex: 1,
    explanation: "Every habit follows this loop: a cue triggers a craving, which drives a response, which delivers a reward. Understanding this loop lets you design habits intentionally.",
  },
  "The Two-Minute Rule: Starting Small Enough to Stick": {
    question: "What does the Two-Minute Rule say about starting a new habit?",
    options: [
      "You should only do habits that take 2 minutes or less",
      "Scale down any new habit to a version that takes 2 minutes or less to start",
      "Do each habit for exactly 2 minutes and stop",
      "Wait 2 minutes before starting any habit to build anticipation",
    ],
    correctIndex: 1,
    explanation: "The Two-Minute Rule removes the barrier of starting. 'Read 30 pages' becomes 'open the book.' Once you start, continuing is easy. The hardest part is the first step.",
  },
  "Habit Stacking: Piggybacking on What Already Works": {
    question: "What is habit stacking?",
    options: [
      "Doing as many habits as possible in the morning",
      "Linking a new habit to an existing habit using 'After I [current habit], I will [new habit]'",
      "Stacking rewards to motivate yourself",
      "Replacing bad habits with good ones simultaneously",
    ],
    correctIndex: 1,
    explanation: "Habit stacking leverages existing neural pathways. The existing habit becomes the cue for the new one, making it far more likely to stick.",
  },
  "Identity-Based Habits: Becoming the Person Who": {
    question: "According to James Clear, what is the most powerful driver of lasting habit change?",
    options: [
      "Setting bigger goals",
      "Using willpower and discipline",
      "Changing your identity — becoming the type of person who does the habit",
      "Finding an accountability partner",
    ],
    correctIndex: 2,
    explanation: "Outcome-based habits ask 'what do I want to achieve?' Identity-based habits ask 'who do I want to become?' The second approach creates habits that last because they align with self-image.",
  },
  "Tracking, Streaks, and the Never Miss Twice Rule": {
    question: "What is the 'never miss twice' rule for habit streaks?",
    options: [
      "If you miss once, the streak is broken forever",
      "Missing one day is human; missing two days is the start of a new bad habit",
      "You should never miss a habit, even when sick",
      "If you miss twice, start a completely new habit",
    ],
    correctIndex: 1,
    explanation: "One miss is an accident. Two misses is the beginning of a pattern. The 'never miss twice' rule gives you grace while preventing a slip from becoming a slide.",
  },

  // ============================================================
  // BODY PILLAR — Energy Foundation (5)
  // ============================================================
  "Why You Are Tired All the Time": {
    question: "What is the most overlooked cause of chronic tiredness in young Filipino adults?",
    options: [
      "Not drinking enough coffee",
      "Working too many hours",
      "Poor sleep quality, dehydration, and irregular light exposure",
      "A medical condition that requires medication",
    ],
    correctIndex: 2,
    explanation: "Before blaming your schedule, fix the basics: sleep quality, hydration, and sunlight exposure. These three factors account for most unexplained fatigue.",
  },
  "Morning Sunlight: The Free Energy Hack": {
    question: "Why does viewing morning sunlight boost energy and mood?",
    options: [
      "Vitamin D is instantly absorbed through the eyes",
      "Sunlight triggers cortisol release and sets the circadian clock for better sleep that night",
      "The warmth of the sun physically energizes the body",
      "It is a placebo effect from the morning routine",
    ],
    correctIndex: 1,
    explanation: "Morning light hitting the retina triggers a healthy cortisol spike for alertness and sets a timer for melatonin release 14-16 hours later. It is the single most powerful free tool for energy and sleep.",
  },
  "Hydration: The Energy Lever Everyone Ignores": {
    question: "At what level of dehydration does cognitive performance measurably decline?",
    options: [
      "5 percent dehydration",
      "When you feel thirsty",
      "As little as 1-2 percent dehydration",
      "Only when you have a headache",
    ],
    correctIndex: 2,
    explanation: "Even 1-2 percent dehydration — before you feel thirsty — reduces focus, memory, and mood. In Philippine heat, most people are mildly dehydrated by 10 AM without knowing it.",
  },
  "The Caffeine Strategy: Timing Is Everything": {
    question: "When is the worst time to drink your first coffee according to chronobiology?",
    options: [
      "Right after waking up, when cortisol is naturally high",
      "After lunch, around 1 PM",
      "Mid-morning, around 10 AM",
      "Before a workout",
    ],
    correctIndex: 0,
    explanation: "Cortisol peaks 30-45 minutes after waking. Drinking coffee during this window wastes caffeine on an already-alert brain and builds tolerance. Wait 90-120 minutes for maximum effect.",
  },
  "The Energy Audit: Mapping Your Daily Rhythm": {
    question: "What is the purpose of mapping your energy throughout the day?",
    options: [
      "To find out if you are a morning person or night owl",
      "To schedule your hardest tasks during your natural peak energy periods",
      "To know when to drink coffee",
      "To prove to your boss that you need a schedule change",
    ],
    correctIndex: 1,
    explanation: "Everyone has predictable high and low energy periods. Matching your most demanding tasks to your peak windows and easy tasks to your lows dramatically increases output.",
  },

  // ============================================================
  // BODY — Movement (5)
  // ============================================================
  "The Minimum Effective Dose of Exercise": {
    question: "What does research say about the minimum amount of exercise needed for significant health benefits?",
    options: [
      "At least 1 hour daily",
      "30 minutes of intense exercise 5 days a week",
      "As little as 20-30 minutes of moderate movement most days",
      "Exercise only matters if you do it every single day",
    ],
    correctIndex: 2,
    explanation: "You do not need to train like an athlete. 20-30 minutes of moderate movement most days delivers 80 percent of the health benefits. Consistency beats intensity.",
  },
  "Finding Your Exercise That Does Not Feel Like Exercise": {
    question: "Why is it important to find movement you enjoy rather than forcing yourself to do exercises you hate?",
    options: [
      "Because enjoyable exercise burns more calories",
      "Because the best exercise is the one you will actually do consistently",
      "Because intense exercise is dangerous for beginners",
      "Because all exercise provides the same benefits regardless of type",
    ],
    correctIndex: 1,
    explanation: "The gym is not the only answer. Basketball, dancing, hiking, swimming — the best exercise is whatever you will actually show up for week after week.",
  },
  "The Schedule Is the Strategy": {
    question: "What is the most reliable predictor of whether someone will exercise consistently?",
    options: [
      "How motivated they feel",
      "Whether they have a gym membership",
      "Whether the exercise is scheduled at a specific time on specific days",
      "How much they enjoy the exercise",
    ],
    correctIndex: 2,
    explanation: "Motivation fades. Schedules persist. People who exercise at the same time on the same days are 3x more likely to maintain the habit than those who exercise 'when they feel like it.'",
  },
  "Progressive Overload: Getting Better Not Just Busy": {
    question: "What is progressive overload?",
    options: [
      "Exercising until you cannot move the next day",
      "Gradually increasing the challenge over time so your body keeps adapting",
      "Changing your entire workout every week",
      "Doing as many repetitions as possible in every session",
    ],
    correctIndex: 1,
    explanation: "The body adapts to whatever you give it. Without gradually increasing difficulty — more weight, more reps, more distance — you plateau. Small increases compound into massive change.",
  },
  "The Power of an Accountability Partner": {
    question: "How does having an accountability partner affect exercise consistency?",
    options: [
      "It has no significant effect",
      "It doubles the likelihood of sticking to a fitness plan",
      "It only helps if the partner is a professional trainer",
      "It helps initially but the effect fades after a month",
    ],
    correctIndex: 1,
    explanation: "Research shows accountability partners roughly double follow-through on fitness commitments. The social contract — knowing someone expects you — is more powerful than personal motivation alone.",
  },

  // ============================================================
  // SPIRIT PILLAR — Purpose (5)
  // ============================================================
  "The Question That Changes Everything": {
    question: "What type of question is most effective for discovering your sense of purpose?",
    options: [
      "What career pays the most money?",
      "What would I do if money were no object and I could not fail?",
      "What do my parents want me to do?",
      "What skills are most in-demand right now?",
    ],
    correctIndex: 1,
    explanation: "Removing the constraints of money and fear reveals what you genuinely care about. Purpose is found at the intersection of what moves you and what the world needs.",
  },
  "Purpose Is a Direction, Not a Destination": {
    question: "Why is it a mistake to think of purpose as a fixed destination?",
    options: [
      "Because you might change your mind",
      "Because purpose evolves as you grow, and treating it as fixed creates unnecessary pressure",
      "Because nobody really finds their purpose",
      "Because destinations are overrated",
    ],
    correctIndex: 1,
    explanation: "Purpose is a compass heading, not a GPS coordinate. It guides your direction but evolves with experience. Waiting to find the 'perfect' purpose keeps you stuck.",
  },
  "Aligning Daily Actions With Long-Term Meaning": {
    question: "What happens when your daily actions consistently contradict your stated values?",
    options: [
      "Nothing — actions and values are separate things",
      "Chronic dissatisfaction, burnout, and a feeling that life lacks meaning",
      "You naturally adjust your values over time",
      "It only matters if other people notice the contradiction",
    ],
    correctIndex: 1,
    explanation: "The gap between what you value and what you actually do daily is the primary source of existential dissatisfaction. Closing this gap is the fastest path to meaning.",
  },
  "Finding Meaning in Work You Did Not Choose": {
    question: "How can you find meaning in work that does not align with your passion?",
    options: [
      "You cannot — you should quit immediately",
      "Just be grateful you have a job",
      "By connecting your daily tasks to how they serve others or build toward your larger goals",
      "By working harder until you learn to love it",
    ],
    correctIndex: 2,
    explanation: "Viktor Frankl taught that meaning can be found in any situation. A call center agent who sees their work as providing for their family transforms the same job into something purposeful.",
  },
  "Legacy: What You Leave Behind": {
    question: "What is the most meaningful way to think about personal legacy?",
    options: [
      "How much money you leave to your children",
      "How many awards and achievements you collect",
      "How your daily actions and character influence the people around you",
      "What people write about you on social media",
    ],
    correctIndex: 2,
    explanation: "Legacy is not built in grand gestures — it is built in daily interactions. The way you treat people, the example you set, and the values you live create ripples that outlast any achievement.",
  },

  // ============================================================
  // SPIRIT — Gratitude (5)
  // ============================================================
  "Gratitude Is Not Positive Thinking, It Is Rewiring": {
    question: "What does neuroscience show about the effect of regular gratitude practice on the brain?",
    options: [
      "It has no measurable physical effect",
      "It temporarily makes you happier but changes nothing long-term",
      "It physically rewires neural pathways, making the brain more attuned to positive patterns",
      "It only works for people who are already naturally optimistic",
    ],
    correctIndex: 2,
    explanation: "Brain scans show that consistent gratitude practice increases activity in the prefrontal cortex and produces lasting changes in how the brain processes experiences.",
  },
  "Gratitude for Difficult Things": {
    question: "What is the benefit of practicing gratitude for challenges and setbacks?",
    options: [
      "There is no benefit — gratitude should only be for good things",
      "It teaches your brain to extract growth and lessons from adversity instead of only pain",
      "It minimizes real suffering, which is unhealthy",
      "It makes difficult situations go away faster",
    ],
    correctIndex: 1,
    explanation: "Gratitude for difficulty is not denial — it is reframing. 'This was hard AND I learned something' is more powerful than 'this was hard.' It builds antifragility.",
  },
  "Expressing Gratitude to Others": {
    question: "Research shows that expressing gratitude to others benefits whom the most?",
    options: [
      "Only the person receiving it",
      "Only the person expressing it",
      "Both the giver and receiver, but the giver benefits more",
      "Neither person — it is just social politeness",
    ],
    correctIndex: 2,
    explanation: "Studies consistently show that expressing gratitude boosts wellbeing more for the person giving thanks than receiving it. The act of articulating appreciation rewires your own brain.",
  },
  "Gratitude as an Antidote to Comparison": {
    question: "Why is gratitude the most effective antidote to the comparison trap of social media?",
    options: [
      "Because it makes you forget what others have",
      "Because it redirects attention from what you lack to what you already have",
      "Because it makes you feel superior to others",
      "It is not — deleting social media is the only solution",
    ],
    correctIndex: 1,
    explanation: "Comparison focuses on gaps. Gratitude focuses on abundance. You cannot feel deprived and grateful simultaneously — gratitude literally overwrites the comparison signal.",
  },
  "Building a Sustainable Gratitude Ritual": {
    question: "Why does writing down gratitude work better than just thinking about it?",
    options: [
      "Writing is faster than thinking",
      "Writing forces specificity, engages more brain regions, and creates a record you can revisit",
      "Thinking about gratitude has zero effect",
      "Writing makes it easier to share on social media",
    ],
    correctIndex: 1,
    explanation: "Writing engages the motor cortex, forces you to be specific, and creates an external record. 'I am grateful for my health' is vague. Writing forces you to say exactly what and why.",
  },

  // ============================================================
  // PRO — Social Media Management
  // ============================================================
  "Getting Your First Client": {
    question: "What is the most effective way to land your first social media management client in the Philippines?",
    options: [
      "Post an ad on Facebook Marketplace",
      "Offer a free 1-week sample to a local business you already patronize",
      "Wait until you have a professional website and portfolio",
      "Apply to digital marketing agencies",
    ],
    correctIndex: 1,
    explanation: "A free sample removes all risk for the business owner. They see results before paying anything. Most free samples convert to paid clients because the business cannot go back to doing it themselves.",
  },
  "Content Creation Systems": {
    question: "What is the biggest time-saver for consistent content creation?",
    options: [
      "Hiring a full-time content creator",
      "Using AI to write all your content",
      "Batch creating content in dedicated sessions instead of creating daily",
      "Only posting when inspiration strikes",
    ],
    correctIndex: 2,
    explanation: "Batching — creating a week or month of content in one focused session — eliminates the daily 'what should I post?' decision fatigue and ensures consistency.",
  },
  "Finding Winning Products": {
    question: "What is the safest way to validate a product idea before ordering inventory?",
    options: [
      "Ask your friends if they would buy it",
      "Check if the product is trending on TikTok",
      "Look at actual Shopee search volume and sales data for similar products",
      "Order 100 units and see if they sell",
    ],
    correctIndex: 2,
    explanation: "Real marketplace data — search volume, number of sellers, sales velocity — tells you what people actually buy, not what they say they would buy.",
  },
  "Choosing Your Skill": {
    question: "What should guide your choice of freelance skill?",
    options: [
      "Whatever pays the highest hourly rate",
      "The intersection of market demand, your existing strengths, and what you can tolerate doing daily",
      "Whatever your friends are doing successfully",
      "The skill that is easiest to learn",
    ],
    correctIndex: 1,
    explanation: "High pay means nothing if you burn out in 3 months. The best freelance skill is one the market wants, you are naturally decent at, and you can sustain doing every day.",
  },
  "Building a Portfolio in 7 Days": {
    question: "What is the fastest way to build a credible freelance portfolio when you have zero clients?",
    options: [
      "Wait until you get your first real client",
      "Lie about previous experience",
      "Create sample projects for fictional or real businesses to demonstrate your skill",
      "Get a certification from an online course",
    ],
    correctIndex: 2,
    explanation: "Clients care about what you can DO, not who you have done it for. Creating sample projects for real local businesses shows skill and initiative — even without being hired.",
  },

  // ============================================================
  // PRO — AI Track
  // ============================================================
  "What is Claude and Why It Changes Everything": {
    question: "What makes AI tools like Claude fundamentally different from traditional software?",
    options: [
      "They are faster at processing data",
      "They can understand context, generate original content, and adapt to any task without programming",
      "They replace all human workers",
      "They are free to use",
    ],
    correctIndex: 1,
    explanation: "Traditional software does one thing. AI understands language, adapts to context, and handles tasks it was never specifically programmed for. This flexibility is what changes everything.",
  },
  "How to Think With AI: The Prompt Framework": {
    question: "What is the most important element of an effective AI prompt?",
    options: [
      "Using polite language",
      "Writing very long, detailed instructions",
      "Providing clear context about what you need, why, and in what format",
      "Using technical vocabulary",
    ],
    correctIndex: 2,
    explanation: "AI output quality is directly proportional to input quality. Context (who you are, what you need, why, and the desired format) transforms generic responses into genuinely useful ones.",
  },
  "Your First Website in 60 Minutes": {
    question: "What is the biggest advantage of using AI-assisted tools like Claude Code to build websites?",
    options: [
      "The websites look better than professionally designed ones",
      "You can create a functional website without knowing how to code",
      "They are completely free with no limitations",
      "The websites never need updating",
    ],
    correctIndex: 1,
    explanation: "AI code tools democratize web development. You describe what you want in plain language, and the AI writes the code. This turns a service worth thousands of pesos into something you can offer after one lesson.",
  },
};

export function getQuiz(lessonTitle: string): QuizQuestion | null {
  return QUIZ_MAP[lessonTitle] || null;
}
