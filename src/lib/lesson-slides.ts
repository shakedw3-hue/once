/**
 * Lesson Slides — Transforms lesson data into typed slide arrays
 * for the swipeable slide-based lesson experience.
 */

import {
  generateHook,
  extractStat,
  extractTakeaways,
  extractQuote,
  extractKeyInsight,
  splitActionSteps,
  getToolSpotlight,
  getRealNumbers,
  extractSourceInfo,
} from "@/lib/lesson-content";

export type SlideType =
  | "hook"
  | "stat"
  | "takeaways"
  | "content"
  | "quote"
  | "insight"
  | "tool"
  | "realNumbers"
  | "action"
  | "reflection"
  | "complete"
  | "calculator";

export interface Slide {
  type: SlideType;
  data: Record<string, any>;
}

/**
 * Split text into chunks of roughly maxWords each,
 * breaking at sentence boundaries.
 */
function splitIntoContentSlides(text: string, maxWords: number = 150): string[] {
  const sentences = text.split(/\.\s+/).filter((s) => s.trim().length > 0);
  if (sentences.length === 0) return [text];

  const chunks: string[] = [];
  let current: string[] = [];
  let wordCount = 0;

  for (const sentence of sentences) {
    const sWords = sentence.trim().split(/\s+/).length;
    if (wordCount + sWords > maxWords && current.length > 0) {
      const chunk = current.join(". ").trim();
      chunks.push(chunk.endsWith(".") ? chunk : chunk + ".");
      current = [];
      wordCount = 0;
    }
    current.push(sentence.trim());
    wordCount += sWords;
  }

  if (current.length > 0) {
    const chunk = current.join(". ").trim();
    chunks.push(chunk.endsWith(".") ? chunk : chunk + ".");
  }

  // Cap at 2 content slides
  return chunks.slice(0, 2);
}

export function buildSlides(
  lesson: {
    title: string;
    description: string;
    action_step: string;
    reflection_prompt: string;
    order: number;
  },
  isPro: boolean
): Slide[] {
  const slides: Slide[] = [];

  // 1. Always start with hook
  const hook = generateHook(lesson.title, lesson.description);
  slides.push({ type: "hook", data: { text: hook } });

  // 2. Stat slide if available
  const stat = extractStat(lesson.description);
  if (stat) {
    // Try to extract just the number for animation
    const numMatch = stat.match(/([\d,.]+)/);
    const number = numMatch ? numMatch[1] : null;
    const suffix = stat.match(/(%|percent)/i) ? "%" : "";
    slides.push({
      type: "stat",
      data: { text: stat, number, suffix },
    });
  }

  // 3. Takeaways
  const takeaways = extractTakeaways(lesson.description);
  if (takeaways.length > 0) {
    slides.push({ type: "takeaways", data: { items: takeaways } });
  }

  // 4. Content slides (1-2)
  const contentChunks = splitIntoContentSlides(lesson.description);
  contentChunks.forEach((chunk, i) => {
    slides.push({
      type: "content",
      data: {
        text: chunk,
        part: contentChunks.length > 1 ? i + 1 : null,
        totalParts: contentChunks.length > 1 ? contentChunks.length : null,
      },
    });
  });

  // 5. Quote if available
  const quote = extractQuote(lesson.description);
  const sourceInfo = extractSourceInfo(lesson.description);
  if (quote && sourceInfo) {
    slides.push({
      type: "quote",
      data: {
        text: quote.text,
        author: sourceInfo.name,
        role: sourceInfo.role,
      },
    });
  }

  // 6. Key Insight
  const insight = extractKeyInsight(lesson.description);
  slides.push({ type: "insight", data: { text: insight } });

  // 7. Tool spotlight (Pro only)
  if (isPro) {
    const tools = getToolSpotlight(lesson.title);
    if (tools && tools.length > 0) {
      slides.push({ type: "tool", data: { tools } });
    }
  }

  // 8. Real Numbers (Pro only)
  if (isPro) {
    const realNumbers = getRealNumbers(lesson.title);
    if (realNumbers) {
      slides.push({ type: "realNumbers", data: { text: realNumbers } });
    }
  }

  // 9. Action steps
  const actionSteps = splitActionSteps(lesson.action_step);
  slides.push({ type: "action", data: { steps: actionSteps } });

  // 10. Reflection
  slides.push({
    type: "reflection",
    data: { prompt: lesson.reflection_prompt },
  });

  // 11. Complete
  slides.push({ type: "complete", data: {} });

  return slides;
}
