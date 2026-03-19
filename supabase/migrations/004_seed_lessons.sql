-- 004_seed_lessons.sql
-- 100 Core Lessons: 4 pillars x 5 modules x 5 lessons
-- Requires modules from 002_seed_modules.sql

-- ============================================================
-- MONEY PILLAR
-- ============================================================

-- ────────────────────────────────────────────
-- Money > Financial Direction (Lessons 1-5)
-- ────────────────────────────────────────────

-- Money > Financial Direction > Lesson 1
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'Where Your Money Actually Goes',
  'Morgan Housel writes in The Psychology of Money that wealth is not about how much you earn, it is about the gap between what you earn and what you spend. Most people have never tracked this gap honestly. Before you can build any financial plan, you need a clear picture of your current cash flow. This is not about budgeting. It is about awareness.',
  'Open your phone right now. Look at your last 30 days of GCash or bank transactions. Write down your top 5 spending categories and the approximate amount for each. No judgment, just data.',
  'When you look at where your money went this month, does it reflect what you say matters most to you? Where is the biggest gap between what you value and what you spend on?',
  1
from public.modules m where m.title = 'Financial Direction';

-- Money > Financial Direction > Lesson 2
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'Your Real Hourly Rate',
  'Naval Ravikant often says you should know what your time is worth so you can outsource anything below that rate. But most salaried workers and freelancers never calculate their true hourly rate, the one that includes commute time, overtime, and preparation. A BPO agent earning 25,000 pesos monthly who spends 3 hours daily commuting via jeepney has a very different real rate than the number on their payslip. Knowing this number changes every spending decision you make.',
  'Calculate your real hourly rate. Take your monthly income, then divide by the actual total hours you invest in work, including commute, preparation, and unpaid overtime. Write that number down and tape it to your wallet or phone case.',
  'If you knew your exact hourly rate, what is one thing you currently do yourself that costs you more in time than it would cost to pay someone else?',
  2
from public.modules m where m.title = 'Financial Direction';

-- Money > Financial Direction > Lesson 3
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'The Two-Account System',
  'Robert Kiyosaki teaches that the first step to building wealth is paying yourself first, before bills, before wants, before anything. Research from behavioral economics confirms this: money that is separated is money that is saved. In the Philippines, this is easier than ever with digital banks like Maya and GCash savings features. The system is simple: one account for spending, one account you never touch. Automation removes willpower from the equation.',
  'Open a second savings account today using Maya, CIMB, or Tonik. Set up an automatic transfer of even just 500 pesos per payday from your main account. The amount matters less than the automation.',
  'Why do you think most people wait until the end of the month to save what is left, instead of saving first? What story about money did you grow up hearing that might be driving this pattern?',
  3
from public.modules m where m.title = 'Financial Direction';

-- Money > Financial Direction > Lesson 4
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'Setting a Financial North Star',
  'Ray Dalio describes in Principles that without clear goals, you are navigating without a compass. Financial direction is not about a vague desire to be rich, it is about a specific number tied to a specific lifestyle by a specific date. Research from Dominican University found that people who write down their goals are 42 percent more likely to achieve them. Your financial north star should be concrete enough that you can measure progress monthly.',
  'Write down one financial goal for 12 months from now. Make it specific: the exact peso amount, what it is for, and the date. Example: Save 60,000 pesos by March 2027 for emergency fund. Put this somewhere you will see it daily.',
  'If money were no object, what would your ideal Tuesday look like from morning to night? How far is your current financial trajectory from making that Tuesday real?',
  4
from public.modules m where m.title = 'Financial Direction';

-- Money > Financial Direction > Lesson 5
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'The Monthly Money Review Ritual',
  'Warren Buffett reads financial statements every single day. You do not need to go that far, but Morgan Housel emphasizes that the difference between people who build wealth and those who do not often comes down to one habit: regularly reviewing their numbers. A monthly money review, just 30 minutes, creates a feedback loop that keeps you on track. Without this loop, even the best financial plan drifts.',
  'Block 30 minutes on the last Sunday of this month. Review your income, expenses, savings rate, and progress toward your financial north star. Write three observations and one adjustment for next month. Repeat every month.',
  'What emotions come up when you sit down to look at your financial numbers? Do you feel anxiety, shame, pride, or numbness? What does that emotional response tell you about your relationship with money?',
  5
from public.modules m where m.title = 'Financial Direction';

-- ────────────────────────────────────────────
-- Money > Opportunity Thinking (Lessons 1-5)
-- ────────────────────────────────────────────

-- Money > Opportunity Thinking > Lesson 1
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'Seeing Problems as Peso Signs',
  'Naval Ravikant says that every time you hear someone complain, you are hearing a business opportunity. The best businesses in the Philippines started because someone noticed a daily frustration: Jollibee saw that Filipinos wanted fast food seasoned for local taste, GCash saw that millions were unbanked. Opportunity thinking is a skill you can train. It starts with listening differently to the complaints around you.',
  'For the next 24 hours, carry a small notebook or open a note on your phone. Every time you hear someone complain, including yourself, write it down. By tonight, you should have at least 5 complaints. Circle the one that the most people share.',
  'What problem do you face every single day that you have just accepted as normal? What would it be worth to you if someone solved it?',
  1
from public.modules m where m.title = 'Opportunity Thinking';

-- Money > Opportunity Thinking > Lesson 2
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'The Skill Stack Advantage',
  'Scott Adams, creator of Dilbert, argues you do not need to be the best in the world at one thing. You need to be good at two or three things that rarely combine. Naval Ravikant echoes this: build a unique skill stack that makes you irreplaceable. A BPO agent who also understands basic bookkeeping and speaks Mandarin is far more valuable than one who only answers phones. Your existing skills are more combinable than you think.',
  'List your top 5 skills, including soft skills like communication, technical skills, and even hobbies. Now write down 3 combinations of 2-3 of those skills that could create a unique service or side income. Ask one trusted friend if they would pay for any of those combinations.',
  'What skill do you have that your coworkers often ask you for help with? Have you ever considered that this help has real market value?',
  2
from public.modules m where m.title = 'Opportunity Thinking';

-- Money > Opportunity Thinking > Lesson 3
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'Testing Before Investing',
  'Robert Kiyosaki teaches that real entrepreneurs test small before going big. Morgan Housel adds that the biggest financial mistake is risking what you need for what you do not need. In the Philippines, you can test almost any business idea for under 5,000 pesos. Sell on Facebook Marketplace before renting a stall. Offer a service on Fiverr before quitting your job. The goal is not to make money on the test, it is to learn if anyone cares.',
  'Take one of your opportunity ideas from the previous lesson. Create a simple offer, a Facebook post, a Carousell listing, or a message to 10 people you know. Spend zero pesos. Just put the offer out and see if anyone responds within 48 hours.',
  'What is really stopping you from testing a small idea: lack of money, lack of time, or fear of what people might think? Which of those three is the honest answer?',
  3
from public.modules m where m.title = 'Opportunity Thinking';

-- Money > Opportunity Thinking > Lesson 4
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'Reading the Market Around You',
  'Warren Buffett says he does not invest in what he does not understand. The same applies to spotting opportunities: you need to understand the market right around you. Pay attention to what is trending on Shopee and TikTok Shop, what new stores are opening in your area, what your friends are spending on. Ray Dalio calls this radical open-mindedness, the willingness to observe reality as it is, not as you wish it were.',
  'Spend 15 minutes on Shopee or TikTok Shop right now. Look at the top-selling products in any category. Write down 3 products that surprise you with their sales volume. Then ask yourself: what need is this product fulfilling that I did not expect?',
  'When was the last time you were surprised by what people were willing to pay for? What did that teach you about the difference between what people say they want and what they actually buy?',
  4
from public.modules m where m.title = 'Opportunity Thinking';

-- Money > Opportunity Thinking > Lesson 5
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'Building an Opportunity Pipeline',
  'Naval Ravikant emphasizes that wealth is created by building systems, not by chasing individual wins. An opportunity pipeline means you always have 3 to 5 ideas at various stages: some you are observing, some you are testing, some you are scaling. This removes the desperation of needing any single idea to work. Ray Dalio built Bridgewater by systematically testing hundreds of hypotheses. You can apply the same principle to your financial life on any scale.',
  'Create a simple spreadsheet or note with three columns: Watching, Testing, and Growing. Place at least 2 ideas in the Watching column today. Commit to moving one idea from Watching to Testing within the next two weeks.',
  'Do you tend to go all-in on one idea and abandon it when it gets hard, or do you spread yourself too thin across too many? What would a balanced pipeline look like for your current life stage?',
  5
from public.modules m where m.title = 'Opportunity Thinking';

-- ────────────────────────────────────────────
-- Money > Decision Frameworks (Lessons 1-5)
-- ────────────────────────────────────────────

-- Money > Decision Frameworks > Lesson 1
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'The Regret Minimization Framework',
  'Jeff Bezos used what he calls the Regret Minimization Framework to decide to leave his Wall Street job and start Amazon. He projected himself to age 80 and asked which choice he would regret less. Daniel Kahneman''s research shows that humans feel the pain of losses twice as strongly as the pleasure of gains, which means we naturally avoid risk even when the upside far outweighs the downside. This framework counteracts that bias by shifting your perspective to the long term.',
  'Think of one financial decision you have been putting off, maybe a side business, an investment, or a career move. Write down: In 10 years, will I regret not doing this more than I will regret trying and failing? Let your honest answer guide your next step.',
  'What is a decision you avoided in the past that you now regret not taking? What was the real cost of inaction?',
  1
from public.modules m where m.title = 'Decision Frameworks';

-- Money > Decision Frameworks > Lesson 2
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'Reversible vs Irreversible Decisions',
  'Ray Dalio and Jeff Bezos both distinguish between two types of decisions: one-way doors and two-way doors. A two-way door decision is reversible, like testing a product on Shopee for 3,000 pesos. A one-way door decision is hard to undo, like signing a 2-year lease for a physical store. Most people treat every decision like a one-way door, which causes paralysis. In reality, 90 percent of financial decisions are two-way doors that you can walk back through.',
  'Write down 3 financial decisions you are currently facing. Label each one as either a one-way door or two-way door. For every two-way door decision, set a deadline to decide within 48 hours. Stop overthinking reversible choices.',
  'How much time and energy have you wasted agonizing over decisions that were easily reversible? What could you have done with that mental energy instead?',
  2
from public.modules m where m.title = 'Decision Frameworks';

-- Money > Decision Frameworks > Lesson 3
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'The 10/10/10 Rule for Money Decisions',
  'Suzy Welch created the 10/10/10 rule: before any decision, ask how you will feel about it in 10 minutes, 10 months, and 10 years. Daniel Kahneman''s work on temporal discounting shows that we massively overweight immediate feelings and underweight future consequences. That Shopee impulse buy feels great in 10 minutes, neutral in 10 months, and regrettable at 10 years when you calculate the compound interest you lost. This simple framework creates instant clarity.',
  'Apply the 10/10/10 rule to your next purchase over 500 pesos today. Before you tap GCash or hand over cash, pause and honestly answer: how will I feel about this in 10 minutes, 10 months, and 10 years? Write down your answers before deciding.',
  'Think of a purchase you made in the last year that felt amazing at the time but means nothing to you now. What pattern does that reveal about how you make spending decisions?',
  3
from public.modules m where m.title = 'Decision Frameworks';

-- Money > Decision Frameworks > Lesson 4
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'Opportunity Cost Is the Real Price',
  'Warren Buffett says the real cost of anything is what you give up to get it. Every peso spent on one thing is a peso that cannot be invested elsewhere. Morgan Housel illustrates this powerfully: a daily 150-peso milk tea habit costs 54,750 pesos per year, which invested at even modest returns over 10 years becomes significant capital. This is not about deprivation. It is about making invisible costs visible so you can choose consciously.',
  'Identify your one most frequent non-essential expense, maybe grab food delivery, milk tea, or cigarettes. Calculate what it costs you per month and per year. Then look up what that amount would become if invested in a UITF or MP2 account over 5 years. Write both numbers side by side.',
  'If you could redirect just one daily spending habit toward your financial north star, which habit would give you the most progress with the least felt sacrifice?',
  4
from public.modules m where m.title = 'Decision Frameworks';

-- Money > Decision Frameworks > Lesson 5
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'Building Your Personal Decision Checklist',
  'Ray Dalio credits much of Bridgewater''s success to systematized decision-making. Atul Gawande''s research in The Checklist Manifesto proves that even experts make better decisions with simple checklists. For financial decisions above a certain threshold, you need a personal checklist that removes emotion from the process. This is not about being robotic. It is about creating a reliable system for your future self when emotions run high.',
  'Create a 5-item financial decision checklist for any purchase or investment over 5,000 pesos. Include questions like: Can I afford this without dipping into emergency savings? Have I waited at least 72 hours? Does this move me toward my financial north star? Save it as a note on your phone.',
  'When was the last time you made a financial decision purely based on emotion, excitement, fear, or social pressure? What would have changed if you had paused and run it through a checklist?',
  5
from public.modules m where m.title = 'Decision Frameworks';

-- ────────────────────────────────────────────
-- Money > Smart Money Management (Lessons 1-5)
-- ────────────────────────────────────────────

-- Money > Smart Money Management > Lesson 1
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'Why Most People Lose Money Trading',
  'Morgan Housel notes that the stock market is one of the few places where the product goes on sale and everyone runs out of the store. Daniel Kahneman''s prospect theory explains why: we feel losses about twice as intensely as equivalent gains, causing us to sell winners too early and hold losers too long. Before you learn any indicator, you need to understand the psychological traps that destroy most retail traders. Knowledge of these biases is your first real edge.',
  'Open a demo trading account on a platform like eToro or TradingView, using paper money only. Make 3 practice trades today based purely on gut feeling. Record your reasoning for each. You will revisit these in later lessons to see how your decisions compare to indicator-based approaches.',
  'Have you ever made an investment or trading decision based on a hot tip from a friend or social media? What happened, and what did it teach you about the difference between information and insight?',
  1
from public.modules m where m.title = 'Smart Money Management';

-- Money > Smart Money Management > Lesson 2
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'Reading Price Action Like a Story',
  'Warren Buffett famously said price is what you pay, value is what you get. But before you can assess value, you need to understand what a price chart is actually telling you. Japanese candlestick patterns, developed by rice traders in the 1700s, remain the foundation of technical analysis because they compress four data points, open, high, low, and close, into a single visual. Learning to read these is like learning to read a new language.',
  'Go to TradingView.com, which is free, and pull up the PSEi or any stock you are curious about. Switch to candlestick view. Identify 3 green candles and 3 red candles. For each one, write down what the open, close, high, and low were. Practice reading the story each candle tells.',
  'Do you tend to make decisions based on narratives and stories, or on data and patterns? How might this tendency affect your approach to reading markets?',
  2
from public.modules m where m.title = 'Smart Money Management';

-- Money > Smart Money Management > Lesson 3
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'Support and Resistance: Where Price Has Memory',
  'Ray Dalio''s principle of understanding cause and effect applies directly to market structure. Support and resistance levels exist because collective market psychology creates memory at certain price points. When thousands of traders bought at a specific level, they remember that level and act on it again. This is not mystical. It is behavioral economics playing out on a chart. Identifying these levels gives you a framework for when to enter and exit.',
  'On TradingView, pull up any Philippine stock or crypto asset. Draw horizontal lines at the two most obvious levels where price has bounced up from, which is support, and two levels where price has been rejected down from, which is resistance. Screenshot your chart and save it to review in one week.',
  'In your own life, what are the invisible support and resistance levels? What keeps pulling you back to a certain income level, and what ceiling do you keep hitting?',
  3
from public.modules m where m.title = 'Smart Money Management';

-- Money > Smart Money Management > Lesson 4
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'Moving Averages: Filtering the Noise',
  'The core problem in trading, as Daniel Kahneman describes it, is separating signal from noise. Moving averages are the simplest tool for this. A 20-day moving average smooths out daily fluctuations to show the short-term trend. A 200-day moving average shows the long-term trend. When short crosses above long, it signals momentum shifting up. This is not a magic formula but rather a way to see the trend your emotions would otherwise hide from you.',
  'Add a 20-period and 200-period simple moving average to your TradingView chart from the previous lesson. Find one point in the last 6 months where the 20-day crossed above the 200-day, a golden cross, and one point where it crossed below, a death cross. Note what happened to the price after each crossing.',
  'In what other areas of your life do you struggle to separate short-term noise from long-term trends? What would a moving average for your health or career look like?',
  4
from public.modules m where m.title = 'Smart Money Management';

-- Money > Smart Money Management > Lesson 5
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'Building a Simple Rules-Based Trading Plan',
  'Ray Dalio says that successful investing comes from systematizing your decision-making so that emotions do not override logic. A rules-based trading plan defines in advance: what you buy, when you enter, where you set your stop loss, and when you take profit. Warren Buffett adds that risk comes from not knowing what you are doing. Your plan does not need to be complex. It needs to be written, specific, and followed consistently even when it feels uncomfortable.',
  'Write a one-page trading plan with these five elements: what asset you will trade, what indicator signals your entry, where your stop loss goes, where you take profit, and how much of your capital you risk per trade, never more than 2 percent. Keep this plan next to your trading screen.',
  'What is your honest relationship with rules and discipline? Do you tend to follow systems or override them when emotions get strong? How might that pattern affect your trading results?',
  5
from public.modules m where m.title = 'Smart Money Management';

-- ────────────────────────────────────────────
-- Money > Risk Thinking (Lessons 1-5)
-- ────────────────────────────────────────────

-- Money > Risk Thinking > Lesson 1
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'The Emergency Fund Is Not Optional',
  'Morgan Housel writes that the ability to do nothing during a crisis is a financial superpower, but you can only do nothing if you have savings to fall back on. Research from BSP shows that nearly half of Filipino adults have no savings at all. Without an emergency fund, every unexpected expense, a hospital visit, a broken phone, a lost job, becomes a financial crisis that forces bad decisions. This is not about having a lot. It is about having enough to survive 3 months without income.',
  'Calculate your minimum monthly survival cost: rent, food, utilities, transportation. Multiply by 3. That is your emergency fund target. Open a separate high-yield digital savings account today and set up an automatic transfer of whatever you can afford, even 200 pesos per week.',
  'When was the last time an unexpected expense threw your finances into chaos? How would having 3 months of expenses saved have changed your stress level and your decisions during that time?',
  1
from public.modules m where m.title = 'Risk Thinking';

-- Money > Risk Thinking > Lesson 2
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'Understanding Risk vs Recklessness',
  'Ray Dalio distinguishes between calculated risk and blind risk. Calculated risk means you understand the downside, can survive it, and the potential upside justifies the exposure. Blind risk means you do not know what you could lose. Investing 5,000 pesos in a Shopee test product you researched is calculated risk. Lending your entire savings to a friend''s networking scheme because they promised 30 percent monthly returns is recklessness. The difference is not courage. It is homework.',
  'Think of the last financial risk you took. Write down three things: Did you understand the worst-case scenario? Could you survive that worst case? Did you do any research before deciding? If you answered no to any of these, you took a blind risk. Commit to passing all three tests before your next financial risk.',
  'Is there a financial risk you are avoiding right now that actually has a very small downside but could significantly improve your situation? What is really holding you back from taking it?',
  2
from public.modules m where m.title = 'Risk Thinking';

-- Money > Risk Thinking > Lesson 3
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'Never Risk What You Cannot Afford to Lose',
  'Warren Buffett''s first rule of investing is never lose money, and his second rule is never forget rule number one. This does not mean never take risks. It means never put essential money into uncertain bets. Naval Ravikant adds that you should only play games where the downside is capped but the upside is uncapped. In the Philippines, this means your emergency fund, rent money, and family support obligations are off-limits for any investment or business experiment.',
  'Draw a line down the middle of a page. On the left, list money you cannot afford to lose: rent, utilities, food, family support, emergency fund. On the right, list money you could invest or risk without it affecting your survival. Only the right column is available for opportunities. Know this number exactly.',
  'Have you ever risked money you could not afford to lose, maybe on a tip, a scheme, or a business that felt like a sure thing? What happened, and what did that experience cost you beyond just the pesos?',
  3
from public.modules m where m.title = 'Risk Thinking';

-- Money > Risk Thinking > Lesson 4
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'Diversification Is Not Just for the Rich',
  'Ray Dalio calls diversification the holy grail of investing because it is the only free lunch in finance. You do not need millions to diversify. A BPO worker earning 20,000 pesos monthly can diversify across Pag-IBIG MP2 for safety, a UITF or index fund for growth, and a small side business for active income. Morgan Housel adds that diversification is an admission that you do not know the future, and that admission is actually the smartest position you can take.',
  'List all your current sources of income and places where you keep money. If everything is in one basket, a single GCash account or one employer, identify one additional bucket you can open this week. Even moving 1,000 pesos into an MP2 or UITF account counts as diversifying.',
  'If your primary source of income disappeared tomorrow, how long could you survive? What does that answer tell you about how concentrated your financial risk currently is?',
  4
from public.modules m where m.title = 'Risk Thinking';

-- Money > Risk Thinking > Lesson 5
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'Protecting Against Scams and False Promises',
  'Warren Buffett says that when someone promises you high returns with no risk, it is because they are planning to take your money, not grow it. The Philippines has seen devastating scam cycles from pyramid schemes to crypto fraud. Daniel Kahneman''s research on cognitive biases explains why intelligent people fall for these: FOMO, social proof from friends who joined early, and the anchoring effect of promised returns. Your best protection is a simple rule: if the return sounds too good to be true, it is.',
  'Write down the red flags of a financial scam: guaranteed high returns, pressure to recruit others, no clear business model, unregistered with SEC, and urgency to invest now. Save this list on your phone. The next time someone pitches you an opportunity, check it against every item before responding.',
  'Has anyone in your family or friend circle ever lost money to a scam or scheme? What social or emotional pressure made them join, and how can you build immunity against those same pressures?',
  5
from public.modules m where m.title = 'Risk Thinking';


-- ============================================================
-- MIND PILLAR
-- ============================================================

-- ────────────────────────────────────────────
-- Mind > Focus Reset (Lessons 1-5)
-- ────────────────────────────────────────────

-- Mind > Focus Reset > Lesson 1
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'The True Cost of a Distraction',
  'Cal Newport''s research on deep work reveals that after a single interruption, it takes an average of 23 minutes to return to the same level of focus. Andrew Huberman''s neuroscience research shows that every time you switch tasks, your prefrontal cortex burns glucose and releases cortisol. This means checking your phone during work is not a harmless break. It is a metabolic and cognitive tax that compounds throughout the day, leaving you mentally exhausted by 3 PM despite feeling like you did nothing productive.',
  'Turn on your phone''s screen time tracker right now if it is not already on. At the end of today, check how many times you picked up your phone and your total screen time. Write both numbers down. Tomorrow, try to reduce your pickups by just 20 percent.',
  'If someone offered you 100 pesos every time you resisted checking your phone for 30 minutes, how much would you earn in a typical workday? What does that tell you about how fragmented your attention currently is?',
  1
from public.modules m where m.title = 'Focus Reset';

-- Mind > Focus Reset > Lesson 2
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'The 90-Minute Focus Block',
  'Andrew Huberman explains that the brain naturally cycles through 90-minute ultradian rhythms of high and low alertness. Working with these cycles instead of against them produces dramatically better output. Cal Newport structures his entire day around these blocks, calling them deep work sessions. The key is not willpower. It is removing all friction before the block starts: phone in another room, browser tabs closed, one task defined clearly.',
  'Schedule one 90-minute focus block tomorrow morning. Before you start: put your phone on airplane mode in another room, close all browser tabs except the one you need, write down the single task you will work on. When the 90 minutes end, take a genuine 20-minute break before your next block.',
  'When was the last time you were so absorbed in something that you lost track of time? What conditions made that possible, and how can you recreate them intentionally?',
  2
from public.modules m where m.title = 'Focus Reset';

-- Mind > Focus Reset > Lesson 3
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'Designing Your Environment for Focus',
  'James Clear writes in Atomic Habits that motivation is overrated and environment design is underrated. If your phone is on your desk, you will check it. If junk food is on the counter, you will eat it. If Facebook is one click away, you will open it. The same principle works in reverse: make focused work the easiest option by designing your physical and digital environment. BPO workers who remove social media apps during shift hours report significantly better performance reviews.',
  'Identify your top 3 digital distractions, probably social media apps, group chats, or news sites. Move those apps to the last page of your phone or into a folder called Later. Set app timers for 30 minutes daily on each one. Do this right now while you are motivated.',
  'What would your ideal focus environment look like? How different is it from your current workspace, and what is the smallest change you could make today to move closer to it?',
  3
from public.modules m where m.title = 'Focus Reset';

-- Mind > Focus Reset > Lesson 4
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'Single-Tasking: The Forgotten Superpower',
  'Daniel Kahneman''s research definitively proves that multitasking is a myth. What we call multitasking is actually rapid task-switching, and each switch costs cognitive resources. Cal Newport argues that the ability to do deep, single-focused work is becoming both rarer and more valuable in the economy. People who can focus on one thing for extended periods produce disproportionately better results, whether they are coding, writing, studying, or negotiating.',
  'Choose the most important task on your plate right now. Set a timer for 25 minutes, the Pomodoro technique. Work on only that one task. If another thought or urge arises, write it on a piece of paper and return to your task. When the timer rings, take a 5-minute break. Repeat twice.',
  'Be honest: when you sit down to do important work, how many minutes pass before you switch to something else? What is the self-talk that happens right before you switch?',
  4
from public.modules m where m.title = 'Focus Reset';

-- Mind > Focus Reset > Lesson 5
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'Building a Daily Shutdown Ritual',
  'Cal Newport practices a complete shutdown ritual at the end of every workday. Andrew Huberman''s neuroscience research supports this: your brain needs a clear signal that work is over in order to shift into recovery mode. Without this signal, your mind continues churning on work problems during dinner, family time, and sleep, reducing the quality of all three. A proper shutdown only takes 5 minutes but transforms your evenings and your next morning.',
  'At the end of your workday today, do this 5-minute ritual: review your task list, write down the top 3 priorities for tomorrow, close all work apps and tabs, and say out loud or write down the phrase shutdown complete. Do not check work messages after this point tonight.',
  'Do you carry work stress into your evenings and weekends even when you are not physically working? What is that costing you in terms of relationships, rest, and the quality of your non-work life?',
  5
from public.modules m where m.title = 'Focus Reset';

-- ────────────────────────────────────────────
-- Mind > Stress Control (Lessons 1-5)
-- ────────────────────────────────────────────

-- Mind > Stress Control > Lesson 1
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'The Physiological Sigh: Instant Calm in 30 Seconds',
  'Andrew Huberman''s lab at Stanford discovered that the physiological sigh, a double inhale through the nose followed by an extended exhale through the mouth, is the fastest way to reduce stress in real time. This is not meditation or theory. It works because the double inhale reinflates the tiny air sacs in your lungs, and the long exhale activates the parasympathetic nervous system. You can do this in a meeting, on a jeepney, or during a difficult phone call at the BPO floor.',
  'Practice the physiological sigh right now: take a quick inhale through your nose, then immediately another short inhale on top of it without exhaling, then do a long slow exhale through your mouth. Repeat 3 times. Notice how your heart rate feels before and after. Use this technique the next time you feel stress rising today.',
  'What physical sensations do you first notice when stress starts building? Tight shoulders, clenched jaw, shallow breathing? Knowing your early warning signals lets you intervene before stress takes over.',
  1
from public.modules m where m.title = 'Stress Control';

-- Mind > Stress Control > Lesson 2
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'Stress Is Not the Enemy, Chronic Stress Is',
  'Andrew Huberman explains that acute stress, short bursts of adrenaline and cortisol, actually improves performance and focus. It is chronic stress, the kind that never turns off, that destroys sleep, relationships, and health. Kelly McGonigal''s research at Stanford found that people who viewed stress as helpful actually had better health outcomes than those who tried to avoid stress entirely. The goal is not to eliminate stress but to cycle between stress and recovery.',
  'Write down your current stressors in two columns: acute, things with a clear end date or solution, and chronic, things that have been grinding on you for weeks or months with no resolution. For one item in the chronic column, write down the smallest possible action you could take this week to move it toward resolution.',
  'What stress in your life have you been treating as permanent and unchangeable? What if you could reframe it as a problem to solve rather than a condition to endure?',
  2
from public.modules m where m.title = 'Stress Control';

-- Mind > Stress Control > Lesson 3
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'The Stress Audit: Finding Your Hidden Triggers',
  'Daniel Kahneman''s research shows that we are remarkably bad at predicting what will stress us and even worse at identifying what already does. Many people are so accustomed to chronic stress that they cannot feel it until it manifests as headaches, insomnia, or rage over small things. Viktor Frankl observed that between stimulus and response there is a space, and in that space lies our freedom. But first, you need to identify your stimuli.',
  'For the next 24 hours, set an alarm for every 3 hours. When it goes off, rate your stress from 1 to 10, write down where you are, who you are with, and what you are doing. By tomorrow, you will have a stress map showing your actual triggers versus what you assumed they were.',
  'Is there a person, place, or recurring situation that consistently elevates your stress but that you have been tolerating because it feels unavoidable? What would change if you stopped accepting it as normal?',
  3
from public.modules m where m.title = 'Stress Control';

-- Mind > Stress Control > Lesson 4
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'Building a Stress Recovery Toolkit',
  'Andrew Huberman recommends building a personal toolkit of stress recovery practices rather than relying on a single technique. What works when you are stuck in traffic on EDSA is different from what works when you cannot sleep at 2 AM. James Clear''s habit stacking principle applies here: attach recovery practices to existing routines. Cold water on your wrists after a tense meeting. A 5-minute walk after lunch. The physiological sigh before bed. The toolkit should be diverse, portable, and practiced.',
  'Create a Stress Toolkit note on your phone with 5 techniques matched to 5 situations: one for work stress, one for commute stress, one for family conflict, one for financial worry, and one for trouble sleeping. For each, write the specific technique and how long it takes. Test at least one today.',
  'What is your current default response to stress? Scrolling your phone, eating, shutting down, getting irritable? No judgment, just awareness. Would you choose that response if you had better options readily available?',
  4
from public.modules m where m.title = 'Stress Control';

-- Mind > Stress Control > Lesson 5
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'Stress-Proofing Your Daily Routine',
  'Cal Newport argues that a structured routine is not constraining, it is liberating, because it reduces the number of decisions you need to make each day. Daniel Kahneman calls this reducing decision fatigue. Andrew Huberman adds that consistent wake times, meal times, and sleep times regulate cortisol rhythms naturally, making you more resilient to stress without any extra effort. The goal is to build a daily structure that handles stress prevention automatically.',
  'Write down your ideal morning routine, just the first 60 minutes after waking. Include a specific wake time, and at least one stress-prevention element: 2 minutes of physiological sighs, 5 minutes of sunlight, or a cold face splash. Follow this exact routine tomorrow morning and note how your stress levels compare to a typical morning.',
  'How much of your daily stress comes from the structure of your day, or lack of it, rather than from the events themselves? What would a stress-proof day look like if you designed it intentionally?',
  5
from public.modules m where m.title = 'Stress Control';

-- ────────────────────────────────────────────
-- Mind > Emotional Resilience (Lessons 1-5)
-- ────────────────────────────────────────────

-- Mind > Emotional Resilience > Lesson 1
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'The Gap Between Event and Reaction',
  'Viktor Frankl, who survived the Nazi concentration camps, wrote that between stimulus and response there is a space, and in that space is our power to choose our response. Andrew Huberman''s neuroscience confirms this: the amygdala fires an emotional reaction in milliseconds, but the prefrontal cortex, which governs rational thought, takes 6 to 10 seconds to engage. That gap is where resilience lives. Lengthening that gap by even a few seconds can completely change the outcome of any difficult moment.',
  'The next time you feel a strong negative emotion today, whether frustration in traffic, annoyance at a coworker, or anger at a message, pause and count slowly to 10 before responding. During those 10 seconds, take one physiological sigh. Notice how your response differs from what you would have said immediately.',
  'Think of a recent moment when you reacted instantly to something and later wished you had responded differently. What would have changed if you had given yourself 10 seconds before acting?',
  1
from public.modules m where m.title = 'Emotional Resilience';

-- Mind > Emotional Resilience > Lesson 2
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'Labeling Emotions to Defuse Them',
  'Neuroscience research from UCLA, referenced extensively by Andrew Huberman, shows that simply naming an emotion reduces its intensity. When you say I am angry, your brain treats anger as your identity. When you say I notice I am feeling anger, the prefrontal cortex activates and the amygdala calms. Daniel Kahneman calls this stepping out of System 1, your automatic emotional brain, into System 2, your deliberate thinking brain. This is not suppression. It is precise self-awareness.',
  'Set 3 random alarms on your phone for today. When each alarm goes off, pause and complete this sentence out loud or in writing: Right now I am feeling... and then name the specific emotion. Not just good or bad but specific: anxious, hopeful, bored, irritated, grateful. Build the vocabulary of your inner life.',
  'Do you tend to suppress emotions, explode with them, or observe them calmly? Which of these three patterns did you learn from your family growing up, and is it still serving you?',
  2
from public.modules m where m.title = 'Emotional Resilience';

-- Mind > Emotional Resilience > Lesson 3
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'Reframing Setbacks as Data',
  'James Clear writes that failure is not the opposite of success, it is part of the process. Ray Dalio systematized this at Bridgewater through what he calls pain plus reflection equals progress. Viktor Frankl found that even in the worst suffering imaginable, meaning could be constructed. The Philippine concept of diskarte, creative resourcefulness in the face of obstacles, is a cultural expression of this same principle. Resilient people do not avoid failure. They extract value from it.',
  'Write down one recent failure or setback, something that did not go as planned. Now reframe it by completing these three sentences: The data this failure gave me is... The skill I was forced to develop because of this is... The direction this is pointing me toward is... Keep this reframe somewhere visible.',
  'What is the most valuable lesson you have ever learned from something that went wrong? Would you have learned it any other way?',
  3
from public.modules m where m.title = 'Emotional Resilience';

-- Mind > Emotional Resilience > Lesson 4
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'Building Your Resilience Baseline',
  'Andrew Huberman''s research shows that resilience is not purely psychological, it is physiological. Sleep quality, exercise, nutrition, and social connection all directly impact your ability to handle emotional challenges. James Clear calls these keystone habits because improving one tends to improve all others. A person who slept 7 hours handles a difficult conversation completely differently than the same person running on 4 hours. Resilience is built in the calm before the storm, not during it.',
  'Rate these four resilience pillars from 1 to 10 for your current life: sleep quality, physical activity, nutrition quality, and social connection. Identify the one with the lowest score. Write down one specific improvement you will make to that pillar this week, something small enough that you cannot say no to it.',
  'When you are at your most emotionally reactive, exhausted, short-tempered, easily upset, which of the four resilience pillars has usually been neglected? Is there a pattern you have been ignoring?',
  4
from public.modules m where m.title = 'Emotional Resilience';

-- Mind > Emotional Resilience > Lesson 5
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'The Resilience of Meaning',
  'Viktor Frankl''s core insight from Man''s Search for Meaning is that those who had a why to live could endure almost any how. This is not motivational poster material. Frankl watched it play out in the concentration camps: prisoners with a clear sense of purpose survived situations that broke others. Modern research from the University of Michigan confirms that people with a strong sense of purpose show faster recovery from negative emotional events and lower inflammatory biomarkers during stress.',
  'Write a personal purpose statement in one sentence. It does not need to be grand. It can be as specific as I am building a better life so my children never have to choose between school supplies and food. Put this sentence as the lock screen on your phone for the next week. Read it every time you pick up your phone.',
  'When life hits you hardest, what is the thing that makes you get back up? Is it a person, a goal, a belief, or a responsibility? How consciously are you connected to that why on a daily basis?',
  5
from public.modules m where m.title = 'Emotional Resilience';

-- ────────────────────────────────────────────
-- Mind > Decision Clarity (Lessons 1-5)
-- ────────────────────────────────────────────

-- Mind > Decision Clarity > Lesson 1
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'Why Your Brain Fogs Under Pressure',
  'Daniel Kahneman''s groundbreaking work explains that under stress, your brain shifts from System 2, slow and deliberate thinking, to System 1, fast and automatic thinking. This is why you make impulsive decisions when you are tired, hungry, or emotionally charged. Andrew Huberman adds that elevated cortisol literally impairs prefrontal cortex function, the brain region responsible for planning and judgment. Understanding this is the first step to protecting your decision-making from your own biology.',
  'Identify the three worst decisions you made in the last year. For each one, write down your physical and emotional state at the time: Were you tired? Angry? Rushed? Hungry? Anxious? Look for the pattern. Create a personal rule: I will not make decisions about X when I am feeling Y.',
  'Do you trust yourself to make good decisions when you are stressed or exhausted? If not, what systems could you put in place to protect yourself from your own worst moments?',
  1
from public.modules m where m.title = 'Decision Clarity';

-- Mind > Decision Clarity > Lesson 2
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'The Power of Sleeping On It',
  'Andrew Huberman''s neuroscience research confirms what grandmothers have always known: sleeping on a decision genuinely improves its quality. During sleep, your brain replays the day''s information and integrates it with existing knowledge, often producing insights that were impossible during waking hours. Daniel Kahneman adds that this delay also allows emotional intensity to fade, letting your rational brain evaluate the decision more clearly. The 24-hour rule is not procrastination. It is neurological optimization.',
  'For the next week, implement a 24-hour rule for any decision that involves spending more than 2,000 pesos, making a commitment that lasts more than one week, or responding to a message that triggered a strong emotion. Write the decision down, sleep on it, and decide tomorrow morning. Track how many decisions change overnight.',
  'How many decisions in your life were made in the heat of the moment that you would have made differently after a night of sleep? What patterns do you notice about the type of decisions you rush?',
  2
from public.modules m where m.title = 'Decision Clarity';

-- Mind > Decision Clarity > Lesson 3
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'Thinking in Probabilities, Not Certainties',
  'Daniel Kahneman''s Nobel Prize-winning research shows that humans are terrible at estimating probabilities. We think in absolutes: this will definitely work or this will definitely fail. Reality is probabilistic. Ray Dalio trains his team to assign percentage likelihoods to outcomes, which forces more honest thinking. Instead of saying this business idea will succeed, say there is a 30 percent chance of good returns and a 70 percent chance I lose my initial investment. This clarity changes everything.',
  'Take a decision you are currently facing and write down three possible outcomes: best case, most likely case, and worst case. Assign a percentage probability to each, making sure they add up to 100 percent. Then ask: given these probabilities, does the expected value still justify the decision?',
  'Are you someone who tends toward overconfidence, assuming things will work out, or toward excessive caution, assuming things will go wrong? How has this default tendency shaped the major decisions in your life?',
  3
from public.modules m where m.title = 'Decision Clarity';

-- Mind > Decision Clarity > Lesson 4
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'The Pre-Mortem: Killing Bad Decisions Before They Happen',
  'Gary Klein developed the pre-mortem technique, which Daniel Kahneman calls the single best way to improve decisions. Instead of asking will this work, you imagine it is one year from now and the decision has failed catastrophically. Then you ask why did it fail. This trick bypasses the optimism bias that prevents us from seeing flaws in our own plans. It is much easier to explain a failure that has already happened, even an imaginary one, than to predict a failure that might happen.',
  'Choose one plan or decision you are currently excited about. Now imagine it is March 2027 and it has completely failed. Spend 10 minutes writing down every reason it could have failed. Be specific and honest. Then review your list and address the top 3 most likely failure points before you proceed.',
  'When you make plans, do you naturally think about what could go wrong, or do you get caught up in the excitement of what could go right? How has this tendency served or hurt you?',
  4
from public.modules m where m.title = 'Decision Clarity';

-- Mind > Decision Clarity > Lesson 5
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'Decision Journaling: Learning From Your Own Track Record',
  'Daniel Kahneman advocates for keeping a decision journal to combat hindsight bias, the tendency to believe after the fact that you knew all along how things would turn out. Ray Dalio does this systematically at Bridgewater, recording predictions and checking them against outcomes. A decision journal creates an honest record of what you thought, why you decided, and what actually happened. Over time, this reveals your systematic blind spots and gradually improves your judgment.',
  'Start a decision journal today. Use a simple note on your phone. For any significant decision, record: the date, the decision, your reasoning, your confidence level from 1 to 10, and what you expect to happen. Review this journal monthly and compare your predictions to reality. Start with 3 past decisions you can still evaluate.',
  'If you could go back and review the reasoning behind every major decision you have made in the last 5 years, what pattern do you think would emerge? What would that reveal about your decision-making that you cannot see in real time?',
  5
from public.modules m where m.title = 'Decision Clarity';

-- ────────────────────────────────────────────
-- Mind > Habit Architecture (Lessons 1-5)
-- ────────────────────────────────────────────

-- Mind > Habit Architecture > Lesson 1
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'The Habit Loop: Cue, Craving, Response, Reward',
  'James Clear breaks down every habit into four components: cue, craving, response, and reward. Understanding this loop is like understanding the source code of your behavior. When your phone buzzes, that is a cue. The craving is the curiosity about who messaged you. The response is picking up the phone. The reward is the dopamine hit of social connection. Andrew Huberman confirms that dopamine is not about pleasure but about anticipation, which is why the craving stage is the most powerful lever for change.',
  'Choose one habit you want to build and one you want to break. For each, write out all four stages of the habit loop: cue, craving, response, reward. For the habit you want to build, make the cue more visible. For the one you want to break, remove or hide the cue. Implement both changes today.',
  'What habit do you have that runs on complete autopilot, something you do without thinking? Can you trace back to the original cue that triggers it, and the reward that keeps it locked in?',
  1
from public.modules m where m.title = 'Habit Architecture';

-- Mind > Habit Architecture > Lesson 2
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'The Two-Minute Rule: Starting Small Enough to Stick',
  'Stanford behavior scientist BJ Fogg and James Clear both champion the same principle: a new habit must be so small that it is almost impossible to fail. James Clear calls it the two-minute rule: scale any new habit down to two minutes or less. Want to exercise daily? Start with putting on your workout shoes. Want to read more? Start with reading one page. This works because the hardest part of any habit is starting. Once you start, the momentum often carries you further, but the two minutes are all you commit to.',
  'Take the habit you want to build from the previous lesson and shrink it to a two-minute version. If you want to meditate, your two-minute version is sitting down and taking 5 breaths. If you want to study, it is opening your book to the right page. Do your two-minute version right now, and commit to it daily for the next 7 days.',
  'What habit have you tried and failed to build in the past? Looking back, was the version you attempted too ambitious? What would the ridiculously small two-minute version have looked like?',
  2
from public.modules m where m.title = 'Habit Architecture';

-- Mind > Habit Architecture > Lesson 3
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'Habit Stacking: Piggybacking on What Already Works',
  'BJ Fogg''s Tiny Habits method and James Clear''s habit stacking both use the same insight: the most reliable cue for a new habit is an existing habit. The formula is: After I do current habit, I will do new habit. After I pour my morning coffee, I will write down today''s top priority. After I sit down at my desk at work, I will take 3 deep breaths. This works because your existing habits already have strong neural pathways. You are borrowing their reliability for your new behavior.',
  'Write down 5 habits you already do every day without thinking: brushing your teeth, drinking coffee, arriving at work, eating lunch, getting into bed. Now attach one small new behavior to each one using the format: After I... I will... Choose the one that feels most natural and start it today.',
  'Which of your existing daily routines has been the most consistent over the years? What makes that particular routine so automatic, and what can you learn from its strength to build new habits?',
  3
from public.modules m where m.title = 'Habit Architecture';

-- Mind > Habit Architecture > Lesson 4
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'Identity-Based Habits: Becoming the Person Who',
  'James Clear argues that the most effective way to change your habits is to change your identity first. Instead of I want to run every morning, say I am the kind of person who moves their body daily. Instead of I need to save money, say I am a person who builds wealth. Andrew Huberman''s research on neuroplasticity supports this: when you repeatedly act in alignment with a new identity, your brain physically rewires to support that identity. Each small action becomes a vote for the person you are becoming.',
  'Write down three identity statements for the person you want to become. Use the format: I am the kind of person who... For example: I am the kind of person who keeps their promises to themselves. Choose one of these and identify the smallest daily action that would cast a vote for that identity. Do it today.',
  'When you think about the kind of person you want to be in five years, what habits does that person have that you do not have yet? What identity shift needs to happen first before those habits become natural?',
  4
from public.modules m where m.title = 'Habit Architecture';

-- Mind > Habit Architecture > Lesson 5
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'Tracking, Streaks, and the Never Miss Twice Rule',
  'James Clear''s most practical rule for habit maintenance is simple: never miss twice. Missing once is an accident. Missing twice is the start of a new habit. Jerry Seinfeld used a wall calendar to track his writing streak, and the visual chain of completed days became its own motivation. Research from the American Psychological Association confirms that visual habit tracking increases consistency by over 40 percent. The key is that tracking itself is the reward: seeing your streak grow creates a dopamine loop that sustains the habit.',
  'Get a calendar, either a paper one on your wall or a habit tracking app like Habitica or Streaks. Mark today as Day 1 of one habit you have been building in this module. Your only goal for the next 30 days: never miss two days in a row. If you miss one day, that is fine, but the next day is mandatory.',
  'What does your relationship with consistency look like? Do you tend to start strong and fade, or do you struggle to start but maintain once you do? What does this pattern tell you about where to focus your energy?',
  5
from public.modules m where m.title = 'Habit Architecture';


-- ============================================================
-- BODY PILLAR
-- ============================================================

-- ────────────────────────────────────────────
-- Body > Energy Reset (Lessons 1-5)
-- ────────────────────────────────────────────

-- Body > Energy Reset > Lesson 1
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'Why You Are Tired All the Time',
  'Matthew Walker''s research in Why We Sleep reveals that chronic sleep deprivation is the number one cause of daytime fatigue, and most people do not realize they are sleep-deprived because they have forgotten what fully rested feels like. Andrew Huberman adds that inconsistent sleep and wake times disrupt your circadian rhythm even if you get enough hours. In the Philippines, the BPO night-shift culture makes this especially dangerous, with studies showing that rotating shifts can reduce life expectancy by up to 10 years.',
  'Tonight, set an alarm for 30 minutes before you want to be asleep, not before your wake time. That alarm means screens off and bedroom lights dimmed. Track your actual sleep time for 3 nights. Most people discover they are getting 1 to 2 hours less than they think.',
  'When was the last time you woke up without an alarm feeling genuinely refreshed? If you cannot remember, what does that tell you about the sleep debt you have been carrying?',
  1
from public.modules m where m.title = 'Energy Reset';

-- Body > Energy Reset > Lesson 2
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'Morning Sunlight: The Free Energy Hack',
  'Andrew Huberman''s most-cited protocol is simple: get 10 minutes of sunlight within the first hour of waking. This triggers a cortisol pulse that sets your circadian clock, improves alertness for the entire day, and makes it easier to fall asleep that night. This is not optional wellness advice. It is fundamental neurobiology. In the Philippines, with abundant morning sunshine, this is one of the easiest high-impact health practices available. No supplements, no cost, just step outside.',
  'Tomorrow morning, within 30 minutes of waking up, go outside and spend 10 minutes in direct sunlight. No sunglasses. You do not need to stare at the sun, just be in it. If you work night shift, do this at the start of your waking period. Notice your energy levels compared to a normal morning.',
  'How do you typically start your morning? Are you reaching for your phone in a dark room, or are you getting natural light and movement? What would it take to make sunlight the very first thing you experience each day?',
  2
from public.modules m where m.title = 'Energy Reset';

-- Body > Energy Reset > Lesson 3
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'Hydration: The Energy Lever Everyone Ignores',
  'Peter Attia frequently highlights that even mild dehydration, as little as 2 percent of body weight, reduces cognitive performance by up to 25 percent and physical performance by up to 30 percent. Most people in tropical climates like the Philippines are chronically dehydrated because they wait until they feel thirsty to drink, but thirst is a late signal that you are already depleted. Andrew Huberman recommends drinking a large glass of water with a pinch of salt first thing in the morning to restore hydration lost during sleep.',
  'Buy a one-liter water bottle and keep it with you all day. Your goal is to finish it twice: once by lunch and once by dinner. Tomorrow morning, drink a full glass of water with a small pinch of salt before anything else, even before coffee. Track your energy at noon compared to a normal day.',
  'Do you tend to substitute water with coffee, soda, or energy drinks? What would change if you hydrated properly before reaching for caffeine?',
  3
from public.modules m where m.title = 'Energy Reset';

-- Body > Energy Reset > Lesson 4
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'The Caffeine Strategy: Timing Is Everything',
  'Andrew Huberman explains that caffeine works by blocking adenosine receptors, the molecule that makes you feel sleepy. But adenosine builds up naturally in the first 90 minutes after waking, so drinking coffee immediately actually interferes with your natural wake-up process and leads to a harder crash later. His recommendation: delay caffeine by 90 to 120 minutes after waking and stop caffeine intake at least 8 hours before sleep. Matthew Walker adds that caffeine has a half-life of 5 to 6 hours, meaning half the caffeine from a 3 PM coffee is still in your brain at 9 PM.',
  'Tomorrow, delay your first coffee or energy drink by 90 minutes after waking. Drink water and get sunlight first. Set a caffeine cutoff time 8 hours before your target bedtime and stick to it today. Notice whether your energy is more stable throughout the afternoon and whether you sleep better tonight.',
  'How dependent are you on caffeine to function? If you could not have coffee for a week, how would your energy and mood change? What does that dependency tell you about your underlying sleep and energy fundamentals?',
  4
from public.modules m where m.title = 'Energy Reset';

-- Body > Energy Reset > Lesson 5
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'The Energy Audit: Mapping Your Daily Rhythm',
  'Peter Attia teaches that optimizing energy requires understanding your personal chronotype, your biological pattern of alertness and fatigue throughout the day. Andrew Huberman adds that most people have a peak focus window about 2 to 4 hours after waking and a natural energy dip about 7 to 8 hours after waking. Matthew Walker confirms that this afternoon dip is biological, not laziness. Working with your rhythm instead of against it means scheduling demanding tasks during your peak and recovery tasks during your dip.',
  'Track your energy level every 2 hours today from waking to sleeping, rating it from 1 to 10. Plot these numbers on a simple graph. Identify your peak energy window and your lowest dip. Starting tomorrow, schedule your most important work during your peak and routine tasks during your dip.',
  'Are you currently doing your most important work during your highest energy hours, or are you wasting your peak on emails, commuting, and routine tasks? What would it take to restructure your day around your natural energy rhythm?',
  5
from public.modules m where m.title = 'Energy Reset';

-- ────────────────────────────────────────────
-- Body > Training Consistency (Lessons 1-5)
-- ────────────────────────────────────────────

-- Body > Training Consistency > Lesson 1
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'The Minimum Effective Dose of Exercise',
  'Peter Attia argues that the gap between zero exercise and some exercise is the single biggest health gain available to any human being. Andrew Huberman cites research showing that just 150 minutes of moderate exercise per week, about 20 minutes per day, reduces all-cause mortality by 50 percent. You do not need a gym membership or fancy equipment. A brisk walk around your barangay, bodyweight exercises in your room, or taking the stairs instead of the elevator all count. The enemy is not imperfect exercise. It is no exercise.',
  'Commit to the smallest possible exercise habit for the next 7 days: 10 minutes of walking after dinner. No gym needed, no equipment, no preparation. Just put on shoes and walk around your neighborhood for 10 minutes. If it rains, walk in place or do 10 minutes of bodyweight exercises in your room. Track every day.',
  'What story do you tell yourself about why you cannot exercise regularly? Is it truly about time and resources, or is it about identity and priority? What would change if you saw movement as non-negotiable as eating?',
  1
from public.modules m where m.title = 'Training Consistency';

-- Body > Training Consistency > Lesson 2
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'Finding Your Exercise That Does Not Feel Like Exercise',
  'BJ Fogg''s behavior research shows that you will only sustain activities you genuinely enjoy. Andrew Huberman adds that the best exercise program is the one you will actually do consistently. Forcing yourself to do exercises you hate is a recipe for quitting within 3 weeks. In the Philippines, this might mean basketball at the barangay court, dancing to TikTok videos, swimming, hiking, or even active play with your kids. The goal is to find movement that feels like play, not punishment.',
  'Write down 5 forms of movement you genuinely enjoy or enjoyed as a child. Circle the one that is most accessible to you right now, requiring the least money, travel, and preparation. Do that activity for at least 15 minutes this week. If you cannot think of 5, try something new: a YouTube dance workout, a walk with a friend, or shooting hoops.',
  'When you were a child, how did you move your body? Running, swimming, climbing, dancing? At what point did movement become exercise, something you should do rather than something you want to do? Can you reconnect with that original joy?',
  2
from public.modules m where m.title = 'Training Consistency';

-- Body > Training Consistency > Lesson 3
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'The Schedule Is the Strategy',
  'James Clear writes that professionals stick to a schedule while amateurs wait for motivation. Peter Attia schedules his training sessions like medical appointments: non-negotiable and in the calendar. Andrew Huberman does the same, training at the same time every day because the consistency of timing builds a neural expectation that makes starting easier over time. You do not need motivation. You need a time slot, a location, and a plan that is already decided.',
  'Open your calendar right now. Block 3 specific 30-minute time slots for exercise this week. Treat them like meetings that cannot be cancelled. Write down exactly what you will do in each slot, even if it is just a walk. Be specific: Tuesday 6:30 AM, 30-minute walk around the park.',
  'When your schedule gets busy, what is the first thing you drop? If exercise is usually the first casualty, what does that reveal about where physical health sits in your real, not stated, priorities?',
  3
from public.modules m where m.title = 'Training Consistency';

-- Body > Training Consistency > Lesson 4
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'Progressive Overload: Getting Better Not Just Busy',
  'Peter Attia emphasizes that exercise without progression is just movement. To build strength, endurance, and resilience, you need to gradually increase the challenge. This could mean walking farther, doing one more push-up, holding a plank 5 seconds longer, or adding a kilo to your weights. Andrew Huberman explains that the brain adapts when it encounters a challenge slightly beyond its current capacity, triggering neuroplasticity. The key word is slightly. Progress should be small enough to sustain but real enough to measure.',
  'Whatever exercise you did this week, add one small increment. If you walked 10 minutes, walk 12. If you did 10 push-ups, do 11. If you ran 1 kilometer, run 1.1. Write down your current baseline numbers for your primary exercise and set a goal for next week that is exactly 10 percent more.',
  'In what areas of your physical fitness have you plateaued because you keep doing the same thing at the same level? What would it look like to introduce just enough challenge to grow without burning out?',
  4
from public.modules m where m.title = 'Training Consistency';

-- Body > Training Consistency > Lesson 5
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'The Power of an Accountability Partner',
  'Research from the American Society of Training and Development found that having an accountability partner increases your likelihood of completing a goal from 65 percent to 95 percent. BJ Fogg''s work confirms that social commitment is one of the strongest forces in behavior change. In Filipino culture, where relationships are central to daily life, training with a friend, a tropa, or a family member adds both accountability and enjoyment. You are far less likely to skip a session when someone is waiting for you.',
  'Message one friend or family member right now and propose a simple commitment: let us walk together three times this week, or let us check in daily about our workouts. Agree on specific days and times. If no one is available in person, join a free fitness group on Facebook or Telegram where members post daily check-ins.',
  'Who in your life would benefit from exercising with you? What is stopping you from reaching out to them? Is it pride, shyness, or the assumption that they would say no?',
  5
from public.modules m where m.title = 'Training Consistency';

-- ────────────────────────────────────────────
-- Body > Nutrition Simplicity (Lessons 1-5)
-- ────────────────────────────────────────────

-- Body > Nutrition Simplicity > Lesson 1
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'The Only Nutrition Rule You Need to Start',
  'Peter Attia spent years studying complex nutritional biochemistry before arriving at a simple insight: for most people, the single most impactful dietary change is increasing protein intake. Andrew Huberman agrees that protein is the most satiating macronutrient, reducing cravings and supporting muscle maintenance. In the Filipino diet, which tends to be heavy on rice and light on protein, this one shift can be transformative. You do not need to count calories. You need to count your protein sources per meal.',
  'For your next 3 meals, make sure each one contains at least one palm-sized serving of protein: eggs, chicken, fish, tofu, or monggo. If you normally eat rice with a small amount of ulam, flip the ratio this week: more ulam, less rice. Take a photo of each meal to build awareness of your protein-to-rice ratio.',
  'Look at what you ate yesterday. How many of your meals had a genuine protein source as the main component versus rice or bread being the star? What would it take to flip that ratio starting today?',
  1
from public.modules m where m.title = 'Nutrition Simplicity';

-- Body > Nutrition Simplicity > Lesson 2
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'Eating Real Food in a Fast Food World',
  'Peter Attia draws a line between whole foods and ultra-processed foods, arguing that the processing matters more than the specific macronutrient ratio. Andrew Huberman points to research showing that ultra-processed foods dysregulate hunger hormones, making you eat more without feeling full. In the Philippines, the convenience of fast food and instant noodles makes this especially challenging, but the local food system also offers incredible whole foods: fresh fish, vegetables from the palengke, eggs, bananas, and monggo. Cost is not always the barrier. Habit is.',
  'Go to your nearest palengke or wet market this week and buy ingredients for 3 home-cooked meals. Calculate the per-meal cost and compare it to your typical fast food or grab food spending. Most people discover that real food from the market is actually cheaper than their delivery habit.',
  'How often do you eat meals made from real, unprocessed ingredients versus meals from packets, cans, or fast food chains? What drives that choice: time, taste, habit, or the belief that healthy food is more expensive?',
  2
from public.modules m where m.title = 'Nutrition Simplicity';

-- Body > Nutrition Simplicity > Lesson 3
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'The Sugar Trap: What Your Merienda Is Doing to Your Brain',
  'Andrew Huberman explains that sugar creates a dopamine spike followed by a crash, which triggers cravings for more sugar, creating a cycle that looks almost identical to addiction at the neurological level. Peter Attia considers excessive sugar the primary driver of metabolic disease. In the Philippines, the merienda culture of sweet bread, milk tea, and sugar-laden drinks can silently add 500 to 1,000 calories of pure sugar to your daily intake. This is not about eliminating merienda. It is about choosing what fuels you versus what crashes you.',
  'Track your sugar intake for one day. Write down every sweet drink, snack, and dessert, including the sugar in your coffee, milk tea, and merienda. Count the total. Then identify your single biggest sugar source and replace it with a lower-sugar alternative for the rest of the week. Swap milk tea for black coffee or barley tea. Swap pandesal with condensed milk for eggs.',
  'What sugary food or drink do you consume so habitually that you barely notice it anymore? What would happen if you went one week without it?',
  3
from public.modules m where m.title = 'Nutrition Simplicity';

-- Body > Nutrition Simplicity > Lesson 4
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'Meal Prep: Removing Decisions to Improve Nutrition',
  'James Clear''s principle that environment design beats willpower applies powerfully to nutrition. Peter Attia pre-plans his meals not because he enjoys cooking but because he knows that hunger plus no plan equals poor choices. When you are starving after a long shift and there is nothing prepared at home, the Jollibee drive-through wins every time. Meal prep is not about being a health fanatic. It is about making the healthy choice the easy choice by removing the decision point when you are tired and hungry.',
  'This Sunday, cook a large batch of one protein, like adobo chicken or hard-boiled eggs, and one vegetable side. Portion them into containers for 3 to 4 weekday meals. Calculate the time spent: usually under 90 minutes for 4 meals. Compare that to the time you spend deciding, ordering, and waiting for delivery each day.',
  'How many of your unhealthy food choices happen not because you wanted junk food but because you had no other option ready? What would your nutrition look like if the healthy option were always the most convenient one?',
  4
from public.modules m where m.title = 'Nutrition Simplicity';

-- Body > Nutrition Simplicity > Lesson 5
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'The 80/20 Rule of Eating Well',
  'Peter Attia is not a dietary perfectionist, and neither is Andrew Huberman. Both advocate for roughly 80 percent whole, nutrient-dense food and 20 percent whatever you enjoy. This sustainable approach prevents the binge-restrict cycle that destroys most diets. In Filipino culture, where food is deeply social, refusing to eat at a handaan or a family gathering creates unnecessary friction. The goal is a baseline of good nutrition that is strong enough to absorb the occasional celebration without guilt or derailment.',
  'Plan your meals for the next 3 days. Make 80 percent of them whole-food based: protein, vegetables, fruit, rice in moderation. Leave 20 percent for whatever you want, whether that is lechon, halo-halo, or your favorite fast food. Notice that this approach removes guilt while still dramatically improving your average nutrition quality.',
  'Do you tend toward all-or-nothing with nutrition, either strictly dieting or completely giving up? What would it feel like to accept that good enough consistently beats perfect occasionally?',
  5
from public.modules m where m.title = 'Nutrition Simplicity';

-- ────────────────────────────────────────────
-- Body > Recovery (Lessons 1-5)
-- ────────────────────────────────────────────

-- Body > Recovery > Lesson 1
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'Sleep Is Not Lazy, It Is Recovery',
  'Matthew Walker''s research is unequivocal: sleep is the single most effective thing you can do for your brain and body. Every major health outcome, from heart disease to Alzheimer''s to obesity, is worsened by inadequate sleep. Andrew Huberman adds that growth hormone, critical for tissue repair and fat burning, is released primarily during deep sleep. Peter Attia considers sleep optimization the highest-leverage health intervention available. Treating sleep as a luxury rather than a necessity is one of the most expensive mistakes you can make.',
  'Set a non-negotiable sleep target of 7 hours for tonight. Calculate backwards from your wake time to determine your lights-out time. Dim all lights in your room 30 minutes before that time. Put your phone outside your bedroom or at least on the far side of the room. Tomorrow, rate your energy compared to a typical morning.',
  'Do you wear your lack of sleep as a badge of honor, telling people how busy you are? What if the most productive thing you could do for tomorrow is to sleep 30 minutes more tonight?',
  1
from public.modules m where m.title = 'Recovery';

-- Body > Recovery > Lesson 2
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'The Science of Rest Days',
  'Peter Attia explains that muscles do not grow during exercise. They grow during recovery. Exercise creates controlled damage to muscle fibers, and rest allows them to rebuild stronger. Andrew Huberman adds that the nervous system also needs recovery: after an intense workout, your sympathetic nervous system, the fight-or-flight system, is elevated, and it takes 24 to 48 hours to fully restore parasympathetic balance. Skipping rest days does not make you tougher. It makes you weaker, slower, and more injury-prone.',
  'If you have been exercising, schedule at least 2 rest days this week where you do zero intense training. On rest days, only do light movement: a gentle walk, stretching, or light yoga. If you have not been exercising, this lesson is your permission to start slow and build rest in from the beginning.',
  'Do you feel guilty when you take a rest day, like you should be doing more? Where does that guilt come from, and does it actually make you more productive or just more stressed?',
  2
from public.modules m where m.title = 'Recovery';

-- Body > Recovery > Lesson 3
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'Cold and Heat Exposure for Recovery',
  'Wim Hof popularized cold exposure, and Andrew Huberman''s research explains why it works: cold water triggers a massive release of norepinephrine and dopamine that lasts for hours, improving mood, alertness, and recovery. You do not need an ice bath. A cold shower for the last 30 to 60 seconds of your regular shower provides significant benefits. Peter Attia also advocates for heat exposure through sauna or hot baths, which increases growth hormone and improves cardiovascular health. In the Philippines, cold showers are culturally common but rarely appreciated for their recovery benefits.',
  'Tomorrow morning, at the end of your regular shower, turn the water to cold for 30 seconds. Focus on breathing slowly through the discomfort. Do this for 5 consecutive days, gradually increasing to 60 seconds. Notice the energy and alertness boost that follows for the next 2 to 3 hours.',
  'What is your relationship with physical discomfort? Do you avoid it automatically, or can you distinguish between pain that signals damage and discomfort that signals growth?',
  3
from public.modules m where m.title = 'Recovery';

-- Body > Recovery > Lesson 4
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'Breathing for Recovery: The Non-Sleep Deep Rest Protocol',
  'Andrew Huberman developed what he calls Non-Sleep Deep Rest, or NSDR, a 10 to 20-minute protocol that combines deep breathing with body scanning to put your nervous system into a state of deep recovery without actually sleeping. Research shows that NSDR restores mental and physical energy comparable to a short nap but without the grogginess. This is especially useful for BPO workers on break, students between classes, or anyone who needs a midday reset without the downsides of actual napping.',
  'Search for Huberman NSDR on YouTube and find his free 10-minute guided protocol. Do it once today, ideally during your afternoon energy dip. Lie down if possible, or sit comfortably with your eyes closed. Follow the instructions completely. Rate your energy before and after on a scale of 1 to 10.',
  'How do you currently handle the afternoon energy dip? Reaching for coffee, sugar, or your phone? What if you had a 10-minute recovery tool that genuinely restored your energy without any of those costs?',
  4
from public.modules m where m.title = 'Recovery';

-- Body > Recovery > Lesson 5
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'Building a Weekly Recovery Rhythm',
  'Peter Attia structures his week with a deliberate balance of stress and recovery that he compares to interval training: push days and pull-back days. Matthew Walker adds that sleep debt is cumulative but so is sleep credit, meaning consistent good sleep across a week matters more than one perfect night. Wim Hof integrates daily cold exposure with breathwork as a recovery ritual. The key insight is that recovery should not be accidental. It should be designed into your weekly rhythm with the same intentionality as your work and training.',
  'Design your ideal recovery week on paper. Mark which days are training days and which are rest days. Add your sleep target for each night, one recovery practice per day such as NSDR, cold shower, or stretching, and one full rest day where you do nothing intense. Follow this template for one week and adjust based on how you feel.',
  'If you looked at your last week, how much of your time was devoted to pushing and producing versus genuinely recovering? What does that ratio tell you about your sustainability?',
  5
from public.modules m where m.title = 'Recovery';

-- ────────────────────────────────────────────
-- Body > Movement & Mobility (Lessons 1-5)
-- ────────────────────────────────────────────

-- Body > Movement & Mobility > Lesson 1
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'Sitting Is the New Smoking',
  'Kelly Starrett, author of Deskbound, presents research showing that prolonged sitting, more than 6 hours daily, is an independent risk factor for early death regardless of how much you exercise. Peter Attia calls it a metabolic disaster in slow motion. For BPO workers and desk workers in the Philippines, this is especially relevant: an 8-hour shift plus a 2-hour commute can mean 10 or more hours of sitting daily. The solution is not quitting your job. It is interrupting sitting patterns throughout the day.',
  'Set a timer on your phone to go off every 45 minutes during your work hours. When it rings, stand up, reach your arms overhead, do 5 bodyweight squats, and sit back down. This takes less than 60 seconds and breaks the metabolic damage cycle of prolonged sitting. Do this for one full workday and notice how your back and energy feel by end of shift.',
  'How many hours per day do you spend sitting? Have you noticed any chronic pain, stiffness, or postural changes that you have been attributing to aging but might actually be caused by too much sitting?',
  1
from public.modules m where m.title = 'Movement & Mobility';

-- Body > Movement & Mobility > Lesson 2
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'The Daily Mobility Routine That Takes 5 Minutes',
  'Kelly Starrett argues that mobility is not something you do before a workout. It is something you do every single day, like brushing your teeth. Andrew Huberman adds that consistent mobility work improves proprioception, your brain''s sense of where your body is in space, which reduces injury risk in all activities. A simple 5-minute daily routine targeting your hips, shoulders, and thoracic spine addresses 80 percent of common mobility issues and is short enough that there is no valid excuse to skip it.',
  'Do this 5-minute routine right now: 1 minute of deep squat hold, holding onto a door frame if needed; 1 minute of arm circles, 30 seconds each direction; 1 minute of hip circles, 30 seconds each direction; 1 minute of cat-cow stretches on all fours; 1 minute of standing forward fold with bent knees. Do this every morning for 7 days.',
  'Where in your body do you feel the most stiffness or restriction? How long have you been ignoring it, and what activities has it started to limit?',
  2
from public.modules m where m.title = 'Movement & Mobility';

-- Body > Movement & Mobility > Lesson 3
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'Fixing Your Posture From the Ground Up',
  'Kelly Starrett teaches that posture is not about standing up straight through willpower. It is about creating the structural conditions that make good posture the default. Andrew Huberman adds that poor posture compresses the diaphragm, reducing oxygen intake by up to 30 percent, which directly impacts energy and cognitive function. The most common posture problem in the modern world is forward head posture from looking at phones and laptops, which puts up to 27 kilograms of extra force on your neck and upper spine.',
  'Stand against a wall with your heels, butt, shoulder blades, and the back of your head touching the wall. Hold this for 60 seconds. Notice which points of contact feel difficult to maintain. That difficulty shows you where your posture has drifted. Practice this wall check twice daily, morning and evening, for one week. Also, raise your phone to eye level instead of dropping your head to look at it.',
  'Take a photo of yourself from the side right now, standing naturally. Is your head forward of your shoulders? Are your shoulders rounded? What story does your posture tell about how you spend most of your day?',
  3
from public.modules m where m.title = 'Movement & Mobility';

-- Body > Movement & Mobility > Lesson 4
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'Hip Mobility: The Key to Everything',
  'Kelly Starrett calls the hips the engine of the body: nearly every movement pattern, from walking to squatting to climbing stairs, runs through the hip joint. Peter Attia considers hip mobility one of his key longevity markers because loss of hip function is strongly correlated with falls and loss of independence in later life. In the Philippines, where many people squat comfortably as part of daily life, this natural mobility is an asset worth preserving. If you have already lost it from years of desk work, the good news is it comes back faster than you expect.',
  'Test your hip mobility right now: try to sit in a deep squat with your feet flat on the ground for 30 seconds. If you cannot do this without your heels lifting or falling backwards, your hip mobility needs work. Spend 2 minutes practicing deep squat holds daily, using a door frame for support, for the next 2 weeks. Retest at the end.',
  'Can you still squat comfortably the way most Filipino children do naturally? If not, at what point in your life did you lose that ability, and what changed?',
  4
from public.modules m where m.title = 'Movement & Mobility';

-- Body > Movement & Mobility > Lesson 5
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'Moving More Without Exercising More',
  'Peter Attia distinguishes between structured exercise and NEAT, Non-Exercise Activity Thermogenesis, which includes all movement outside of formal workouts: walking, standing, fidgeting, taking stairs, and doing household chores. Research shows that NEAT can account for 15 to 50 percent of your daily calorie burn and has independent health benefits from formal exercise. Kelly Starrett advocates for movement snacks: brief bursts of movement scattered throughout the day. In the Philippines, choosing to walk to the nearby sari-sari store instead of riding, or taking stairs instead of the elevator at the mall, adds up dramatically.',
  'Identify 3 opportunities to add movement to your existing day without going to a gym: take the stairs at work, walk to lunch instead of having it delivered, stand during phone calls, or do a 5-minute stretch while waiting for the rice cooker. Implement all 3 starting today and track them for a week.',
  'How much of your daily movement has been engineered out of your life by convenience? Elevators, delivery apps, online shopping, and ride-hailing. What would happen if you deliberately chose the less convenient but more active option in 3 situations per day?',
  5
from public.modules m where m.title = 'Movement & Mobility';


-- ============================================================
-- SPIRIT PILLAR
-- ============================================================

-- ────────────────────────────────────────────
-- Spirit > Meaning & Direction (Lessons 1-5)
-- ────────────────────────────────────────────

-- Spirit > Meaning & Direction > Lesson 1
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'The Question That Changes Everything',
  'Viktor Frankl survived Auschwitz and concluded that the primary human drive is not pleasure or power but meaning. His logotherapy framework asks not what do I want from life but what does life want from me. Ryan Holiday, drawing from Stoic philosophy, echoes this: purpose is not found in comfort but in contribution. Modern research from the Journal of Positive Psychology confirms that people with a clear sense of purpose live longer, earn more, and report dramatically higher life satisfaction regardless of income level.',
  'Sit down with a blank piece of paper and spend 15 minutes writing your answer to this question: If I could not fail and money were not a factor, what would I spend my days doing? Write without editing or judging. Then look at what you wrote and circle the themes that repeat. Those themes are clues to your purpose.',
  'What would you do even if no one paid you and no one was watching? What does that answer reveal about where your deepest sense of meaning lives?',
  1
from public.modules m where m.title = 'Meaning & Direction';

-- Spirit > Meaning & Direction > Lesson 2
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'Purpose Is a Direction, Not a Destination',
  'Ryan Holiday writes in The Obstacle Is the Way that purpose is not a single grand revelation. It is a direction you walk toward through daily action. Marcus Aurelius, Roman emperor and Stoic philosopher, wrote in his private journal that the impediment to action advances action, meaning every obstacle you face while pursuing your purpose actually refines it. Viktor Frankl adds that meaning can be found in three ways: through work, through love, and through suffering. You do not need to find your one purpose. You need to find today''s purpose.',
  'Based on your writing from the previous lesson, define a one-sentence purpose statement that focuses on direction, not destination. Use this format: I am moving toward a life where I... followed by how you contribute to others. Write it on a card and carry it in your wallet. Read it every morning this week.',
  'Do you feel pressure to find one grand life purpose? What if purpose were something smaller and more immediate, like what specific problem can I help solve for the people around me today?',
  2
from public.modules m where m.title = 'Meaning & Direction';

-- Spirit > Meaning & Direction > Lesson 3
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'Aligning Daily Actions With Long-Term Meaning',
  'Marcus Aurelius wrote each morning in his Meditations about the kind of person he wanted to be that day, not someday, but that specific day. Brene Brown''s research shows that the gap between our values and our daily behaviors is the primary source of shame and dissatisfaction. Viktor Frankl taught that meaning is not abstract: it shows up in what you actually do hour by hour. The test is simple: does how you spent today move you closer to or further from the person you want to become?',
  'At the end of today, review how you spent your time. Divide your activities into three categories: aligned with my purpose, neutral, and misaligned with my purpose. Calculate the percentage of your day in each category. Your goal for next week is to shift just 30 minutes from misaligned to aligned.',
  'If someone watched how you spent the last 7 days without knowing anything about your stated values or goals, what would they conclude your real purpose is? Does that match what you say matters most?',
  3
from public.modules m where m.title = 'Meaning & Direction';

-- Spirit > Meaning & Direction > Lesson 4
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'Finding Meaning in Work You Did Not Choose',
  'Viktor Frankl observed that even in forced labor, prisoners who found meaning in their work survived at higher rates than those who saw it as meaningless. Ryan Holiday writes about amor fati, the Stoic practice of loving your fate, not just accepting it. For many Filipinos working in BPOs, OFW jobs, or roles they took out of necessity rather than passion, this reframe is powerful. You may not have chosen the job, but you can choose the meaning you bring to it while you build toward something more aligned.',
  'Write down 3 ways your current work, even if it is not your dream job, serves a purpose larger than a paycheck. Maybe it supports your family, builds a skill you will need later, or connects you to people who matter. Post these 3 reasons where you will see them before your next shift.',
  'What would change in how you show up to work tomorrow if you saw it not as a dead end but as a chapter in a longer story that you are writing on purpose?',
  4
from public.modules m where m.title = 'Meaning & Direction';

-- Spirit > Meaning & Direction > Lesson 5
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'Legacy: What You Leave Behind',
  'Marcus Aurelius was the most powerful man in the world, yet he wrote to himself that time is a river and soon everything you know will be swept away. This was not depressing to him. It was clarifying. Ryan Holiday explains that the Stoics used mortality as a tool for prioritization: if your time is limited, what actually matters? Brene Brown adds that legacy is not about monuments but about how you made people feel. In Filipino culture, where family is central, your legacy is often the values and habits you pass to the next generation.',
  'Write a letter to someone you love, a child, a sibling, a partner, a parent, that they would find after you are gone. In it, describe the 3 most important lessons you have learned in your life so far. You do not have to send it. The exercise of writing it will clarify what you truly believe matters.',
  'If you had one year left, what would you stop doing immediately and what would you start doing tomorrow? What is stopping you from making those changes now?',
  5
from public.modules m where m.title = 'Meaning & Direction';

-- ────────────────────────────────────────────
-- Spirit > Gratitude Practice (Lessons 1-5)
-- ────────────────────────────────────────────

-- Spirit > Gratitude Practice > Lesson 1
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'Gratitude Is Not Positive Thinking, It Is Rewiring',
  'Andrew Huberman''s neuroscience research shows that gratitude practice physically changes the brain: consistent gratitude increases activity in the prefrontal cortex and reduces activity in the amygdala, literally making you less reactive to stress and more oriented toward opportunity. Brene Brown''s research found that the most joyful people she studied were not the luckiest but the most intentionally grateful. This is not about pretending life is perfect. It is about training your brain to notice what is working alongside what is not.',
  'Before bed tonight, write down 3 specific things you are grateful for from today. The key word is specific: not I am grateful for my family but I am grateful that my daughter laughed when I picked her up from school today. Specificity activates the neural pathways that create lasting change. Do this every night for 7 days.',
  'What is one thing in your life right now that you completely take for granted but that would devastate you if it were suddenly gone? When was the last time you consciously appreciated it?',
  1
from public.modules m where m.title = 'Gratitude Practice';

-- Spirit > Gratitude Practice > Lesson 2
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'Gratitude for Difficult Things',
  'Ryan Holiday writes in The Obstacle Is the Way that the Stoics did not just practice gratitude for good things. They practiced gratitude for obstacles because obstacles reveal character and create growth. Brene Brown''s research shows that people who can find gratitude even in difficulty demonstrate significantly higher resilience. Viktor Frankl found meaning in suffering itself. This is the advanced practice: not being grateful despite hardship, but being grateful for what hardship teaches and reveals.',
  'Write down one difficult situation you are currently facing or recently faced. Now write 3 things that this difficulty has given you: a lesson, a strength, a perspective, or a connection you would not have otherwise. This is not about minimizing the pain. It is about refusing to let pain be the only story.',
  'What is the hardest thing you have ever been through? Looking back, did it give you anything, strength, empathy, clarity, direction, that you could not have gained any other way?',
  2
from public.modules m where m.title = 'Gratitude Practice';

-- Spirit > Gratitude Practice > Lesson 3
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'Expressing Gratitude to Others',
  'Research from the University of Pennsylvania found that writing a gratitude letter and delivering it in person produced the largest boost in happiness of any positive psychology intervention, with effects lasting up to a month. Brene Brown emphasizes that unexpressed gratitude communicates indifference. In Filipino culture, utang na loob, the debt of gratitude, runs deep, but often the people closest to us, the ones we owe the most, hear our gratitude the least. Telling someone specific what they mean to you costs nothing but changes everything.',
  'Think of one person who has positively impacted your life but whom you have never properly thanked. Send them a message right now. Not a generic thank you but a specific message: I am grateful for the time you... and it mattered because... This can be a text, a call, or even better, face to face.',
  'Who is the person who has given you the most but heard your gratitude the least? What is holding you back from telling them exactly what they mean to you?',
  3
from public.modules m where m.title = 'Gratitude Practice';

-- Spirit > Gratitude Practice > Lesson 4
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'Gratitude as an Antidote to Comparison',
  'Thich Nhat Hanh teaches that the root of most suffering is wanting what you do not have while ignoring what you do. Andrew Huberman''s research confirms that social media comparison triggers dopamine deficiency states, literally making you feel worse the more you scroll through highlight reels of other people''s lives. Brene Brown calls this scarcity thinking, the belief that you are never enough. Gratitude is the direct antidote: it shifts your brain from scanning for what is missing to registering what is present.',
  'The next time you catch yourself scrolling social media and feeling envious or inadequate, stop immediately. Put the phone down and write 3 things in your life right now that the person you envy might not have. Do this every time the comparison trap activates this week. Track how many times it happens.',
  'Whose life do you most often compare yours to? If you could see their private struggles, the ones they never post, do you think you would still want to trade places entirely?',
  4
from public.modules m where m.title = 'Gratitude Practice';

-- Spirit > Gratitude Practice > Lesson 5
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'Building a Sustainable Gratitude Ritual',
  'James Clear''s habit architecture applies directly to gratitude: it needs a cue, a routine, and a reward to become automatic. Andrew Huberman recommends pairing gratitude with an existing daily anchor. Thich Nhat Hanh suggests using ordinary moments, like washing dishes or waiting in line, as gratitude triggers. The goal is not to add another task to your to-do list but to weave gratitude into the fabric of your existing day so naturally that it becomes how you see the world, not something extra you do.',
  'Choose one daily anchor moment, maybe your morning coffee, your jeepney ride, or brushing your teeth at night, and pair a 60-second gratitude practice with it. During that 60 seconds, mentally list 3 specific things you are grateful for. Use habit stacking: After I pour my morning coffee, I will think of 3 things I am grateful for before taking the first sip. Start today.',
  'After practicing gratitude for these 5 lessons, has anything shifted in how you see your daily life? What would your life look like in one year if you kept this practice going every single day?',
  5
from public.modules m where m.title = 'Gratitude Practice';

-- ────────────────────────────────────────────
-- Spirit > Daily Reflection (Lessons 1-5)
-- ────────────────────────────────────────────

-- Spirit > Daily Reflection > Lesson 1
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'The Unexamined Life Is Running on Autopilot',
  'Socrates said the unexamined life is not worth living. Marcus Aurelius practiced daily reflection as the cornerstone of his leadership of the Roman Empire. Modern research from Harvard Business School found that employees who spent 15 minutes at the end of the day reflecting on their work performed 23 percent better than those who did not. Reflection is not journaling for the sake of journaling. It is the deliberate practice of extracting lessons from experience, which is the difference between 10 years of experience and 1 year repeated 10 times.',
  'Tonight before bed, spend 5 minutes answering these 3 questions in writing: What went well today? What did not go well? What will I do differently tomorrow? Use a notebook, your phone notes, or a piece of paper. Keep it simple. The power is in the consistency, not the length.',
  'How often do you pause to reflect on your day before it blurs into the next one? What lessons might you be missing by moving too fast to notice them?',
  1
from public.modules m where m.title = 'Daily Reflection';

-- Spirit > Daily Reflection > Lesson 2
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'Morning Intention Setting',
  'Marcus Aurelius wrote in his Meditations every morning, preparing himself for the day by reminding himself of his values and anticipating challenges. Ryan Holiday calls this the Stoic morning ritual: deciding in advance who you want to be before the world starts pushing you around. Thich Nhat Hanh teaches that the first moments of the day set the tone for everything that follows. Research on implementation intentions from NYU confirms that people who set specific intentions in the morning are 2 to 3 times more likely to follow through.',
  'Tomorrow morning, before checking your phone, spend 3 minutes writing your answers to: What is my one most important task today? How do I want to show up today, what kind of person do I want to be? What is one thing I will not do today, such as complaining, scrolling, or eating junk? Do this every morning for one week.',
  'What is the first thing you currently do each morning? Is it intentional and aligned with who you want to be, or is it reactive and driven by notifications and habit?',
  2
from public.modules m where m.title = 'Daily Reflection';

-- Spirit > Daily Reflection > Lesson 3
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'Journaling Through Difficult Emotions',
  'James Pennebaker''s research at the University of Texas found that expressive writing about difficult experiences for just 15 minutes over 4 days improved immune function, reduced anxiety, and increased emotional clarity. Brene Brown advocates for what she calls the SFD, the stormy first draft, where you write out your emotional reaction to a situation without filtering, then examine it for accuracy. Viktor Frankl used reflection to create meaning from unspeakable suffering. You can use the same tool for everyday struggles: frustration at work, conflict with family, or uncertainty about the future.',
  'Think of something that is bothering you right now, something unresolved or emotionally charged. Set a timer for 15 minutes and write about it freely. Do not edit, do not worry about grammar, just let the thoughts flow. When the timer ends, read what you wrote and underline the one sentence that feels most true. That sentence is your insight.',
  'What emotions are you carrying right now that you have not expressed to anyone? What might happen, good or bad, if you put them into words?',
  3
from public.modules m where m.title = 'Daily Reflection';

-- Spirit > Daily Reflection > Lesson 4
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'The Weekly Review: Zooming Out',
  'Ryan Holiday practices a weekly review inspired by the Stoics, who believed that regular self-examination was essential to living well. Cal Newport structures his weekly review around a simple question: what worked, what did not, and what do I want to change? This zoomed-out view prevents the tunnel vision that comes from being trapped in day-to-day reactivity. Marcus Aurelius governed an empire by regularly stepping back from the urgent to reconnect with the important. You can do the same with your life.',
  'Block 30 minutes this coming Sunday. Review your week by answering: What were my 3 biggest wins? What was my biggest lesson? What am I avoiding that I need to face? What is my one priority for next week? Do this weekly review every Sunday for a month and notice how it changes your Mondays.',
  'When you zoom out and look at the last month of your life, are you making progress on what matters most, or are you spending most of your time putting out fires and reacting to other people''s priorities?',
  4
from public.modules m where m.title = 'Daily Reflection';

-- Spirit > Daily Reflection > Lesson 5
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'Making Reflection a Lifelong Practice',
  'Marcus Aurelius wrote his Meditations not for publication but as a private practice that he maintained throughout his life, even while leading military campaigns. Thich Nhat Hanh taught that reflection becomes most powerful when it moves from an activity you do to a quality of attention you bring to everything. Brene Brown describes this as living wholehearted, where self-awareness is not a separate practice but an integrated way of being. The goal of this module is not to add another chore but to develop a reflective mind that operates automatically.',
  'Design your personal reflection system that combines the morning intention, evening review, and weekly review into one simple routine. Write it down on one page: what you do in the morning in 3 minutes, what you do at night in 5 minutes, and what you do on Sundays in 30 minutes. Commit to this system for the next 30 days. Adjust as needed, but do not quit.',
  'Looking back over these five lessons, how has your self-awareness changed? What have you noticed about yourself through reflection that you had been blind to before? How will you ensure this awareness continues to grow?',
  5
from public.modules m where m.title = 'Daily Reflection';

-- ────────────────────────────────────────────
-- Spirit > Values Alignment (Lessons 1-5)
-- ────────────────────────────────────────────

-- Spirit > Values Alignment > Lesson 1
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'Discovering Your Non-Negotiable Values',
  'Brene Brown''s research across thousands of interviews found that people who live in alignment with their values experience less anxiety, stronger relationships, and greater resilience. But most people have never articulated their values explicitly. They operate on inherited values from family, culture, and society without questioning which ones they actually chose. Marcus Aurelius wrote his values down daily. Ray Dalio built an entire company around explicit principles. The first step is knowing what you actually stand for, not what you think you should stand for.',
  'Look up Brene Brown''s list of values online, which contains about 100 options. Read through the entire list and select your top 10. Then narrow those 10 down to your core 3, the ones that are truly non-negotiable. Write those 3 values on a card and carry it with you. These are your decision-making compass.',
  'If you asked the 5 people closest to you what your core values are, what would they say based on your actions? Would their answers match what you believe your values to be?',
  1
from public.modules m where m.title = 'Values Alignment';

-- Spirit > Values Alignment > Lesson 2
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'When Your Values and Your Calendar Disagree',
  'Brene Brown says that values without action are just words. Ryan Holiday writes that the Stoics measured virtue not by what people said but by what they did. The most honest audit of your real values is not what you write on a card but how you spend your time and money. If you say family is your top value but work 12 hours a day and spend your free time on your phone, your calendar is telling a different story. This gap between stated values and lived values is the source of most inner conflict.',
  'Pull up your phone''s screen time report and your calendar or a typical week''s schedule. Map how your time was actually spent against your 3 core values. For each value, calculate roughly how many hours per week you actively invest in it. If any value gets less than 5 hours per week, that is your misalignment to fix first.',
  'Where is the biggest gap between what you say matters most and how you actually spend your days? What would it take to close that gap by even 20 percent this week?',
  2
from public.modules m where m.title = 'Values Alignment';

-- Spirit > Values Alignment > Lesson 3
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'Saying No to Protect Your Yes',
  'Ryan Holiday writes that every time you say yes to something unimportant, you are saying no to something important. Marcus Aurelius practiced the discipline of refusal, understanding that an emperor who said yes to everything would accomplish nothing. Brene Brown adds that the most compassionate people she studied were also the most boundaried, because boundaries are what allow you to be generous without being depleted. In Filipino culture, where pakikisama, going along with the group, is valued, learning to say no gracefully is both essential and difficult.',
  'Identify one commitment in your current life that drains your energy and does not align with your core values. This week, practice declining or reducing that commitment. You can say: I appreciate you thinking of me, but I need to focus on other priorities right now. Saying no once makes it easier every time after.',
  'What are you currently saying yes to out of guilt, obligation, or fear of disappointing others that is actively pulling you away from your core values? What would change if you stopped?',
  3
from public.modules m where m.title = 'Values Alignment';

-- Spirit > Values Alignment > Lesson 4
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'Values Under Pressure: The Integrity Test',
  'Marcus Aurelius wrote that the true test of character is not how you behave when things are going well but how you behave when they are not. Brene Brown calls this practicing your values, not just professing them. Viktor Frankl observed that in the concentration camps, some people maintained their integrity and humanity while others did not, and the difference was not intelligence or strength but the depth of their connection to their values. Your values mean nothing if they only hold in comfortable conditions.',
  'Think of a recent situation where you were under pressure, anger, financial stress, social pressure, or exhaustion. Write down what you actually did versus what your core values would have guided you to do. If there is a gap, write down a specific plan for how you will respond differently next time that same pressure arises.',
  'When was the last time you compromised a core value because of pressure, convenience, or the fear of standing alone? How did that feel afterward, and what did it teach you about the cost of misalignment?',
  4
from public.modules m where m.title = 'Values Alignment';

-- Spirit > Values Alignment > Lesson 5
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'Living Your Values Out Loud',
  'Brene Brown''s research shows that vulnerability, the willingness to be seen for who you really are, is the birthplace of connection, creativity, and belonging. Marcus Aurelius lived his philosophy publicly, not as performance but as practice. Ryan Holiday writes that your life is your message: the way you live teaches more than anything you say. When your values are visible in your actions, you give others permission to live their values too. This creates a ripple effect that starts with one person and transforms communities.',
  'Choose one of your core values and identify one visible action you can take this week that demonstrates it publicly. If your value is honesty, have one conversation where you speak a truth you have been avoiding. If it is generosity, do something kind for a stranger. If it is growth, share something you are learning with someone who could benefit from it. Act on your values where others can see.',
  'What would your community, your family, your workplace, your barangay, look like if everyone lived by the values you believe in? What role can you play in making that vision a little more real, starting today?',
  5
from public.modules m where m.title = 'Values Alignment';

-- ────────────────────────────────────────────
-- Spirit > Inner Peace & Stillness (Lessons 1-5)
-- ────────────────────────────────────────────

-- Spirit > Inner Peace & Stillness > Lesson 1
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'Stillness Is Not Doing Nothing, It Is Everything',
  'Ryan Holiday dedicated an entire book, Stillness Is the Key, to the argument that the greatest leaders, artists, and thinkers in history all cultivated inner stillness. Marcus Aurelius governed the Roman Empire while maintaining a daily stillness practice. Thich Nhat Hanh taught that stillness is not the absence of activity but the presence of awareness. Andrew Huberman''s neuroscience confirms that periods of stillness allow the default mode network to activate, which is where insight, creativity, and self-understanding emerge. In a world that worships busyness, stillness is a radical act.',
  'Find a quiet spot right now. Sit comfortably, close your eyes, and do nothing for 5 minutes. No phone, no music, no mantra. Just sit and breathe. Notice what happens in your mind: the restlessness, the urge to check something, the racing thoughts. Do not fight them. Just observe. This is the beginning of stillness practice.',
  'When was the last time you sat in complete silence with nothing to do and nowhere to be? How quickly does discomfort arise when there is no stimulation, and what does that tell you about your relationship with your own mind?',
  1
from public.modules m where m.title = 'Inner Peace & Stillness';

-- Spirit > Inner Peace & Stillness > Lesson 2
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'The Art of Conscious Breathing',
  'Thich Nhat Hanh''s most fundamental teaching is that conscious breathing is the bridge between body and mind. Breathing in, I know I am breathing in. Breathing out, I know I am breathing out. Andrew Huberman confirms that slow, controlled breathing at about 6 breaths per minute activates the parasympathetic nervous system, reduces blood pressure, and improves heart rate variability, one of the best predictors of overall health and resilience. Wim Hof''s breathing methods show that breath can even influence the immune system. Your breath is the one bodily function that is both automatic and controllable, making it the perfect gateway to inner peace.',
  'Practice box breathing right now: inhale for 4 counts, hold for 4 counts, exhale for 4 counts, hold for 4 counts. Repeat this cycle 6 times. That takes about 2 minutes. Do this twice today, once in the morning and once before bed. Notice the shift in your mental state after each session.',
  'How often are you aware of your breathing during a normal day? What happens to your breath when you are stressed, and what happens to your stress when you consciously slow your breath?',
  2
from public.modules m where m.title = 'Inner Peace & Stillness';

-- Spirit > Inner Peace & Stillness > Lesson 3
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'Letting Go of What You Cannot Control',
  'The Stoic dichotomy of control, central to both Marcus Aurelius and Ryan Holiday, divides everything in life into two categories: what is within your control and what is not. Your actions, attitudes, and responses are within your control. Other people''s behavior, traffic, the weather, and the economy are not. Thich Nhat Hanh adds that suffering comes from grasping at things we cannot hold and pushing away things we cannot escape. Peace comes from knowing the difference and directing all your energy toward what you can actually influence.',
  'Draw two circles on a piece of paper. Label one Things I Can Control and the other Things I Cannot Control. Write your current worries and stressors into the appropriate circle. For everything in the Cannot Control circle, practice saying out loud: This is not mine to carry. For everything in the Can Control circle, write one action you will take today.',
  'How much of your mental energy on an average day is spent worrying about things you have absolutely no control over? What would you do with that energy if you could redirect it toward things you can actually change?',
  3
from public.modules m where m.title = 'Inner Peace & Stillness';

-- Spirit > Inner Peace & Stillness > Lesson 4
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'Mindfulness in Ordinary Moments',
  'Thich Nhat Hanh teaches that mindfulness is not something you do on a meditation cushion. It is something you bring to washing dishes, eating rice, walking down the street, and waiting in line. Marcus Aurelius practiced presence during senate meetings, military campaigns, and even while dealing with difficult people. Andrew Huberman''s research on interoception, the brain''s ability to sense the body, shows that mindful attention to ordinary activities strengthens the neural circuits of self-awareness and emotional regulation. Every mundane moment is an opportunity to practice.',
  'Choose one ordinary activity you do every day: eating lunch, washing your hands, or walking to the jeepney stop. For the next 3 days, do that activity with complete attention. Notice every sensation: the temperature of the water, the taste of each bite, the feeling of your feet on the ground. When your mind wanders, gently bring it back. This is meditation in action.',
  'How much of your life passes by on autopilot while your mind is somewhere else, replaying the past or rehearsing the future? What are you missing in the present moment right now?',
  4
from public.modules m where m.title = 'Inner Peace & Stillness';

-- Spirit > Inner Peace & Stillness > Lesson 5
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'Creating a Daily Stillness Practice',
  'Thich Nhat Hanh maintained a daily practice for over 60 years, through war, exile, and illness. Marcus Aurelius wrote his meditations even on the battlefield. Ryan Holiday argues that stillness is not a luxury for monks and philosophers but a necessity for anyone navigating a chaotic world. The research is overwhelming: consistent mindfulness practice reduces anxiety, improves focus, strengthens relationships, and increases life satisfaction. The key is consistency over intensity: 5 minutes daily beats 60 minutes once a week.',
  'Design your personal 5-minute daily stillness practice. Choose a specific time, right after waking is ideal, a specific place, and a specific method: sitting in silence, box breathing, body scan, or simply watching your breath. Write it down as a commitment: Every day at this time, in this place, I will practice stillness for 5 minutes. Start tomorrow and track your streak for 30 days.',
  'What kind of person would you become if you practiced 5 minutes of stillness every single day for the next year? What problems in your life might dissolve not because you solved them but because your relationship with them changed?',
  5
from public.modules m where m.title = 'Inner Peace & Stillness';
