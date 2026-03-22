import { Resend } from "resend";

let _resend: Resend | null = null;
function getResend(): Resend {
  if (!_resend) {
    _resend = new Resend(process.env.RESEND_API_KEY);
  }
  return _resend;
}

const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "Once <hello@onceph.com>";
const MESSENGER_LINK = "https://m.me/onceph"; // placeholder

// ─── Design Tokens ───
const BG = "#080808";
const CARD_BG = "#111111";
const TEXT_PRIMARY = "#FFFFFF";
const TEXT_SECONDARY = "#9CA3AF";
const INDIGO = "#4F46E5";
const AMBER = "#F59E0B";
const FONT = "system-ui, -apple-system, sans-serif";

const CTA_STYLE = `display:inline-block;background:${INDIGO};color:#fff;padding:16px 32px;border-radius:8px;font-weight:600;font-size:16px;text-decoration:none;`;

function ctaButton(text: string, href: string): string {
  return `<div style="text-align:center;margin:32px 0;">
    <a href="${href}" style="${CTA_STYLE}">${text}</a>
  </div>`;
}

function emailWrapper(content: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
  <title>Once.</title>
</head>
<body style="margin:0;padding:0;background:${BG};font-family:${FONT};-webkit-font-smoothing:antialiased;">
  <div style="max-width:600px;margin:0 auto;padding:40px 20px;">
    <!-- Logo -->
    <div style="text-align:center;margin-bottom:40px;">
      <span style="font-size:28px;font-weight:700;color:${TEXT_PRIMARY};">Once</span><span style="font-size:28px;font-weight:700;color:${INDIGO};">.</span>
    </div>

    <!-- Card -->
    <div style="background:${CARD_BG};border-radius:12px;padding:40px 32px;">
      ${content}
    </div>

    <!-- Tagline -->
    <div style="text-align:center;margin-top:32px;">
      <p style="color:${TEXT_SECONDARY};font-size:14px;font-style:italic;margin:0;">Once. The decision that changes everything.</p>
    </div>

    <!-- Footer -->
    <div style="text-align:center;margin-top:24px;">
      <p style="color:${TEXT_SECONDARY};font-size:13px;margin:0 0 8px 0;">
        Questions? <a href="${MESSENGER_LINK}" style="color:${INDIGO};text-decoration:underline;">Talk to us on Messenger</a>
      </p>
      <p style="color:${TEXT_SECONDARY};font-size:12px;margin:0;">&copy; 2025 Once. All rights reserved.</p>
    </div>
  </div>
</body>
</html>`;
}

function p(text: string, opts?: { secondary?: boolean; bold?: boolean; size?: string }): string {
  const color = opts?.secondary ? TEXT_SECONDARY : TEXT_PRIMARY;
  const weight = opts?.bold ? "font-weight:700;" : "";
  const size = opts?.size ? `font-size:${opts.size};` : "font-size:16px;";
  return `<p style="color:${color};${size}${weight}line-height:1.6;margin:0 0 16px 0;">${text}</p>`;
}

// ─── Email Functions ───

export async function sendWelcomeEmail({ email, firstName }: { email: string; firstName: string }) {
  const content = `
    ${p(`Hey ${firstName},`)}
    ${p("You just did something most people never do.", { bold: true, size: "20px" })}
    ${p("They think about changing. They scroll past opportunities. They tell themselves &ldquo;someday.&rdquo;", { secondary: true })}
    ${p("You didn&rsquo;t.")}
    ${p("You&rsquo;re here. That already makes you different.")}
    ${p("Now finish what you started.", { bold: true })}
    ${ctaButton("Complete Your Assessment &rarr;", "https://onceph.com/questionnaire")}
    ${p("This takes 10 minutes. It will show you exactly where you are and what to do about it.", { secondary: true })}
  `;

  return getResend().emails.send({
    from: FROM_EMAIL,
    to: email,
    subject: "You made the first move.",
    html: emailWrapper(content),
    headers: {
      "X-Entity-Ref-ID": `welcome-${Date.now()}`,
    },
  });
}

export async function sendProfileReadyEmail({
  email,
  firstName,
  primaryPillar,
  planName,
  trackName,
  earning,
}: {
  email: string;
  firstName: string;
  primaryPillar: string;
  planName: string;
  trackName?: string;
  earning?: string;
}) {
  const earningLine = earning
    ? p(`People with your profile earn <span style="color:${AMBER};font-weight:700;">${earning}</span> within 90 days.`)
    : "";

  const content = `
    ${p(`${firstName},`)}
    ${p("Your profile is ready.", { bold: true, size: "20px" })}

    <div style="background:${BG};border:1px solid #222;border-radius:8px;padding:20px 24px;margin:24px 0;">
      ${p(`Your primary focus: <span style="color:${AMBER};font-weight:700;">${primaryPillar}</span>`)}
      ${p(`Your recommended path: <span style="color:${INDIGO};font-weight:700;">${planName}</span>`)}
    </div>

    ${p(`Based on your answers, Once recommends <strong>${trackName || planName}</strong> &mdash; built specifically for where you are right now.`)}
    ${earningLine}
    ${ctaButton("See Your Full Profile &rarr;", "https://onceph.com/profile")}
  `;

  return getResend().emails.send({
    from: FROM_EMAIL,
    to: email,
    subject: `${firstName}, your Once Profile is ready.`,
    html: emailWrapper(content),
    headers: {
      "X-Entity-Ref-ID": `profile-ready-${Date.now()}`,
    },
  });
}

export async function sendPurchaseConfirmationEmail({
  email,
  firstName,
  planName,
  primaryPillar,
  trackName,
  price,
  lessonCount,
}: {
  email: string;
  firstName: string;
  planName: string;
  primaryPillar: string;
  trackName?: string;
  price: number;
  lessonCount: number;
}) {
  const trackLine = trackName
    ? `<tr><td style="color:${TEXT_SECONDARY};padding:8px 0;">Income track</td><td style="color:${TEXT_PRIMARY};text-align:right;padding:8px 0;">${trackName}</td></tr>`
    : "";

  const content = `
    ${p(`${firstName}.`)}
    ${p(`Your <span style="color:${INDIGO};font-weight:700;">${planName}</span> is active.`, { bold: true, size: "20px" })}
    ${p(`Your path: <strong>${primaryPillar}</strong>`)}
    ${trackName ? p(`Your income track: <strong>${trackName}</strong>`) : ""}
    ${p("Everything is ready. Your first lesson is waiting.")}
    ${p("One rule: don&rsquo;t stop.", { bold: true })}
    ${ctaButton("Start Your First Lesson &rarr;", "https://onceph.com/dashboard")}

    <div style="background:${BG};border:1px solid #222;border-radius:8px;padding:20px 24px;margin:24px 0;">
      <table style="width:100%;border-collapse:collapse;">
        <tr><td style="color:${TEXT_SECONDARY};padding:8px 0;">Plan</td><td style="color:${TEXT_PRIMARY};text-align:right;padding:8px 0;">${planName} &mdash; &#8369;${price.toLocaleString()}</td></tr>
        <tr><td style="color:${TEXT_SECONDARY};padding:8px 0;">Access</td><td style="color:${TEXT_PRIMARY};text-align:right;padding:8px 0;">Lifetime</td></tr>
        <tr><td style="color:${TEXT_SECONDARY};padding:8px 0;">Lessons</td><td style="color:${TEXT_PRIMARY};text-align:right;padding:8px 0;">${lessonCount}</td></tr>
        ${trackLine}
      </table>
    </div>
  `;

  return getResend().emails.send({
    from: FROM_EMAIL,
    to: email,
    subject: "You made the decision. Once.",
    html: emailWrapper(content),
    headers: {
      "X-Entity-Ref-ID": `purchase-${Date.now()}`,
    },
  });
}

export async function sendWeeklyProgressEmail({
  email,
  firstName,
  weekNumber,
  lessonsThisWeek,
  currentStreak,
  overallProgress,
}: {
  email: string;
  firstName: string;
  weekNumber: number;
  lessonsThisWeek: number;
  currentStreak: number;
  overallProgress: number;
}) {
  const streakMessage =
    currentStreak > 0
      ? p(`${currentStreak} days in a row. Keep going.`, { bold: true })
      : "";

  const inactiveMessage =
    lessonsThisWeek === 0
      ? p("Life gets busy. We get it. Your path is still here, waiting.", { secondary: true })
      : "";

  const content = `
    ${p(`${firstName}, Week ${weekNumber} with Once.`, { bold: true, size: "20px" })}

    <div style="background:${BG};border:1px solid #222;border-radius:8px;padding:20px 24px;margin:24px 0;">
      <table style="width:100%;border-collapse:collapse;">
        <tr><td style="color:${TEXT_SECONDARY};padding:8px 0;">Lessons this week</td><td style="color:${TEXT_PRIMARY};text-align:right;padding:8px 0;font-weight:700;">${lessonsThisWeek}</td></tr>
        <tr><td style="color:${TEXT_SECONDARY};padding:8px 0;">Current streak</td><td style="color:${TEXT_PRIMARY};text-align:right;padding:8px 0;font-weight:700;">${currentStreak} days 🔥</td></tr>
        <tr><td style="color:${TEXT_SECONDARY};padding:8px 0;">Overall progress</td><td style="color:${TEXT_PRIMARY};text-align:right;padding:8px 0;font-weight:700;">${overallProgress}%</td></tr>
      </table>
    </div>

    ${streakMessage}
    ${inactiveMessage}
    ${ctaButton("Continue Your Path &rarr;", "https://onceph.com/dashboard")}
  `;

  return getResend().emails.send({
    from: FROM_EMAIL,
    to: email,
    subject: `Your week with Once, ${firstName}.`,
    html: emailWrapper(content),
    headers: {
      "X-Entity-Ref-ID": `weekly-${Date.now()}`,
    },
  });
}

export async function sendStreakMilestoneEmail({
  email,
  firstName,
  streakDays,
}: {
  email: string;
  firstName: string;
  streakDays: number;
}) {
  const content = `
    ${p(`${streakDays} days.`, { bold: true, size: "28px" })}
    ${p(`Most people quit before day 3. You&rsquo;re on day ${streakDays}.`)}
    ${p("That&rsquo;s not motivation. That&rsquo;s discipline.", { bold: true })}
    ${p("Keep it going.")}
    ${ctaButton("Continue &rarr;", "https://onceph.com/dashboard")}
  `;

  return getResend().emails.send({
    from: FROM_EMAIL,
    to: email,
    subject: `${streakDays} days straight. ${firstName}, that's rare.`,
    html: emailWrapper(content),
    headers: {
      "X-Entity-Ref-ID": `streak-${Date.now()}`,
    },
  });
}
