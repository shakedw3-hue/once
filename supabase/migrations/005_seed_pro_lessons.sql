-- Pro Income Tracks: 4 tracks × 5 modules × 5 lessons = 100 lessons
-- All modules go under the 'money' path since these are income skills
-- Existing money modules are orders 1-5, Pro modules start at order 6

-- ============================================================
-- TRACK 1: Social Media Management (modules 6-10)
-- ============================================================

insert into public.modules (path_id, title, description, "order")
select p.id, m.title, m.description, m.ord
from public.paths p
cross join (values
  ('Getting Your First Client', 'Find and land your first paying social media management client within 30 days using Facebook and local networking.', 6),
  ('Content Creation Systems', 'Build repeatable content creation workflows using Canva and free tools so you can manage multiple clients efficiently.', 7),
  ('Platform Mastery FB IG TikTok', 'Master the algorithms and best practices for Facebook, Instagram, and TikTok to deliver real results for clients.', 8),
  ('Analytics and Reporting', 'Learn to track metrics, create professional reports, and prove your value to clients so they never cancel.', 9),
  ('Scaling to 40K Per Month', 'Scale from one client to six or more, raise your rates, and build a sustainable social media management business.', 10)
) as m(title, description, ord)
where p.pillar = 'money';

-- ============================================================
-- TRACK 2: Shopee/Lazada E-Commerce (modules 11-15)
-- ============================================================

insert into public.modules (path_id, title, description, "order")
select p.id, m.title, m.description, m.ord
from public.paths p
cross join (values
  ('Finding Winning Products', 'Use data-driven research to find products that sell consistently on Shopee and Lazada in the Philippine market.', 11),
  ('Setting Up Your Store', 'Set up a professional Shopee and Lazada seller account with optimized branding that builds buyer trust.', 12),
  ('Listing Optimization', 'Create product listings that rank high in search results and convert browsers into buyers.', 13),
  ('Order Fulfillment Dropship and Warehouse', 'Master both dropshipping and warehouse fulfillment models to deliver orders fast and keep customers happy.', 14),
  ('Scaling with Ads', 'Use Shopee Ads and Lazada Sponsored Solutions to scale your store from side income to full-time revenue.', 15)
) as m(title, description, ord)
where p.pillar = 'money';

-- ============================================================
-- TRACK 3: Freelancing & Client Acquisition (modules 16-20)
-- ============================================================

insert into public.modules (path_id, title, description, "order")
select p.id, m.title, m.description, m.ord
from public.paths p
cross join (values
  ('Choosing Your Skill', 'Identify the freelance skill that matches your strengths and has strong demand from international and local clients.', 16),
  ('Building a Portfolio in 7 Days', 'Create a professional portfolio that wins clients even if you have zero experience or previous work.', 17),
  ('Finding Clients on Upwork and OnlineJobs', 'Master the platforms where Filipino freelancers earn the most: Upwork, OnlineJobs.ph, and direct outreach.', 18),
  ('Pricing and Negotiation', 'Set rates that reflect your value, negotiate confidently, and stop undercharging for your work.', 19),
  ('From Side Hustle to Full Income', 'Transition from part-time freelancing to a full-time income with systems, boundaries, and financial safety nets.', 20)
) as m(title, description, ord)
where p.pillar = 'money';

-- ============================================================
-- TRACK 4: Building Online Side Income (modules 21-25)
-- ============================================================

insert into public.modules (path_id, title, description, "order")
select p.id, m.title, m.description, m.ord
from public.paths p
cross join (values
  ('Digital Products You Can Create This Week', 'Create and sell digital products like templates, guides, and printables that earn money while you sleep.', 21),
  ('Content Monetization Basics', 'Turn your knowledge and content into income through YouTube, blogging, and social media platforms.', 22),
  ('Affiliate Marketing in PH', 'Earn commissions by recommending products Filipinos already buy on Shopee, Lazada, and other platforms.', 23),
  ('Email List Building', 'Build an email list of engaged subscribers who trust you and buy what you recommend.', 24),
  ('Automating Your Income Stream', 'Set up systems that generate income automatically so you can earn even when you are not actively working.', 25)
) as m(title, description, ord)
where p.pillar = 'money';


-- ============================================================
-- TRACK 1 LESSONS: Social Media Management
-- ============================================================

-- Module: Getting Your First Client
-- Lesson 1
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'The ₱15,000/Month Opportunity Nobody Sees',
  'There are over 900,000 small businesses in the Philippines. Most of them have a Facebook page that has not been updated in months. They know they need social media but they do not have time or knowledge to do it properly. This is your opportunity. A single client paying ₱5,000-₱8,000/month for basic social media management is realistic within your first 30 days. Three clients and you are earning ₱15,000-₱24,000 on top of your regular income.',
  'Open Facebook right now. Search for 10 local businesses in your city — restaurants, salons, clinics, fitness studios. Screenshot their Facebook pages. Note which ones have not posted in the last 2 weeks. These are your potential first clients. Save this list in your phone notes.',
  'Looking at these businesses with inactive pages, which 3 would you feel most confident approaching? What do you already know about their industry that could help you create content for them?',
  1
from public.modules m where m.title = 'Getting Your First Client';

-- Lesson 2
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'What Social Media Managers Actually Do Daily',
  'A social media manager creates 3-5 posts per week per client, responds to comments and messages, runs simple promotions, and sends a monthly report. That is it. You do not need to be a marketing genius. You need to be consistent and organized. Most small business owners will be thrilled if someone simply posts for them regularly. Your daily routine: 30 minutes of content creation in Canva, 15 minutes scheduling in Meta Business Suite, and 15 minutes responding to engagement. Per client, that is about 1 hour per day.',
  'Download Canva on your phone and laptop. Create a free account. Browse the social media templates section and find 5 templates that would work for a restaurant, salon, or clinic. Save them to a folder called "Client Templates." Also download Meta Business Suite — this is the free tool you will use to schedule posts.',
  'How does your current daily schedule look? Can you identify a 2-hour block each day — maybe early morning or after dinner — that you could dedicate to social media management work?',
  2
from public.modules m where m.title = 'Getting Your First Client';

-- Lesson 3
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'Your Free Sample That Sells Itself',
  'The fastest way to land your first client is to show, not tell. Create a free sample week of content for your top prospect. This means making 5 posts — ready to publish — for a business you identified in Lesson 1. When you approach the owner and say "I already made these for you," the conversion rate skyrockets. This is your audition. Use Canva templates, their existing photos from their page, and write simple captions. Spend 2 hours maximum on this sample pack.',
  'Pick the number one business from your list. Create 5 Facebook posts for them using Canva: 2 product/service highlights, 1 customer testimonial style post, 1 behind-the-scenes style post, and 1 promotional post. Save them as images. Write a caption for each post. Put everything in a folder ready to present.',
  'How did it feel to create content for a real business? Was it easier or harder than you expected? What skills did you use that you did not realize you had?',
  3
from public.modules m where m.title = 'Getting Your First Client';

-- Lesson 4
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'The Approach Script That Gets a Yes',
  'Most people fail at getting clients because they approach wrong. Do not say "I do social media management." Instead, lead with the value: "I noticed your Facebook page has great potential but has not been updated recently. I made some sample posts for you — can I show you?" Visit in person if local, or send a professional Facebook message. Your price for the first client should be ₱3,000-₱5,000/month — low enough that saying yes is easy, high enough that your time is respected. Offer a 2-week free trial if they hesitate.',
  'Write your approach message or script. Practice it out loud 3 times. Then send it to your top 3 prospects today — either visit them in person, send a Facebook message, or message them on Instagram. Attach or mention the sample content you created. Track who responds in your notes.',
  'What fears came up when you thought about approaching these businesses? How did it feel after you actually sent the messages? What is the worst that can realistically happen if they say no?',
  4
from public.modules m where m.title = 'Getting Your First Client';

-- Lesson 5
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'Closing the Deal and Setting Up for Success',
  'When a prospect says yes, you need a simple agreement. No complicated contracts — a clear GCash or bank transfer arrangement and a shared content calendar. Set expectations: you will post X times per week, respond to messages within Y hours, and send a monthly performance summary. Get the first payment via GCash before you start. Set up a shared Google Drive folder for their photos and brand assets. Add their Facebook page to your Meta Business Suite. You are now officially a social media manager.',
  'Create a one-page service agreement template in Google Docs. Include: services provided (number of posts per week, response time, monthly report), monthly fee, payment date and method (GCash/Maya/bank transfer), and a 30-day cancellation notice. Also create a Google Drive folder structure: Client Name > Photos, Content Calendar, Reports. Send this agreement to any prospect who said yes.',
  'Now that you have your first client (or are about to), how does earning ₱3,000-₱5,000 extra per month change your financial situation? What would you do with the first payment? How does this connect to your overall Money pillar goals?',
  5
from public.modules m where m.title = 'Getting Your First Client';

-- Module: Content Creation Systems
-- Lesson 1
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'The Batch Content Method That Saves You Hours',
  'The biggest mistake new social media managers make is creating content one post at a time. Professionals batch their content — they create an entire week of posts in one sitting. This takes 2-3 hours instead of 30 minutes every single day. The secret is having a content calendar template. For a typical Filipino small business, you need: Monday motivation or tip, Wednesday product/service highlight, Friday promotion or customer story. That is 3 posts per week, 12 per month, and you can create all 12 in one Sunday afternoon session.',
  'Open Google Sheets and create a content calendar template with these columns: Date, Post Type (tip/product/promo/story), Caption, Image Status (done/pending), Scheduled (yes/no). Fill in the next 4 weeks for one client using the Mon-Wed-Fri format. This template will be reused for every client you take on.',
  'How does having a system for content creation change how you think about managing multiple clients? If each client takes 3 hours per month to batch content, how many clients could you realistically handle?',
  1
from public.modules m where m.title = 'Content Creation Systems';

-- Lesson 2
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'Canva Mastery for Fast Professional Posts',
  'Canva is your primary tool and you need to be fast with it. A professional social media manager can create a polished post in under 10 minutes using Canva. The key is brand kits — save your client colors, fonts, and logo once, then apply them to any template instantly. Use Canva Brand Kit (free for up to 1 brand, Pro for more). For Filipino audiences, use warm colors, clear Tagalog or Taglish captions, and images that show real people. Avoid overly corporate or Western-looking designs — they feel disconnected.',
  'In Canva, set up a Brand Kit for your first client (or practice client). Add their logo, 2-3 brand colors from their existing page, and choose 2 fonts. Then create 5 posts in under 50 minutes — time yourself. Use these post types: quote graphic, product photo with text overlay, announcement post, customer review highlight, and a "Did you know?" educational post. Save all 5 as a template collection.',
  'Were you able to create 5 posts in under 50 minutes? If it took longer, what slowed you down? How can you get faster next time? Speed is profit — the faster you create, the more clients you can serve.',
  2
from public.modules m where m.title = 'Content Creation Systems';

-- Lesson 3
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'Writing Captions That Get Engagement in the PH Market',
  'Filipino Facebook users engage most with posts that feel personal, relatable, and conversational. Use Taglish — a mix of Tagalog and English — unless the brand is premium English-only. Start captions with a hook: a question, a surprising fact, or an emotional statement. Keep it under 3 sentences for product posts. Use emojis sparingly but strategically. Always end with a call to action: "Comment below," "Tag a friend who needs this," or "Message us to order." For Filipino audiences, humor, family references, and relatable struggles (traffic, weather, budget) perform extremely well.',
  'Write 10 captions right now — 2 for each of these 5 types: (1) product highlight with price in pesos, (2) customer testimonial style, (3) educational tip related to the business, (4) behind-the-scenes story, (5) promotional offer with urgency. Use Taglish for at least half of them. Save these as your caption swipe file.',
  'Which caption style came most naturally to you? Which felt forced? Understanding your writing strengths helps you develop a signature style that clients love and audiences engage with.',
  3
from public.modules m where m.title = 'Content Creation Systems';

-- Lesson 4
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'Photo and Video Content on a Zero Budget',
  'You do not need a DSLR camera or expensive equipment. A smartphone with good lighting is enough for 90% of small business social media. Teach your clients to take better photos: natural light near a window, clean background, and the rule of thirds. For video content — which gets 3x more reach on Facebook — use simple formats: 15-second product demos, customer reaction clips, or quick tips. Edit with CapCut (free) or InShot (free). Many Filipino small businesses already have decent product photos on their Shopee listings — ask permission to use those.',
  'Using only your phone, create 3 pieces of content: (1) a flat-lay product photo with natural lighting, (2) a 15-second video showing a product or service in action, and (3) a Boomerang or short loop clip. Edit the video in CapCut — add text overlay and background music from their free library. These 3 content types will cover 80% of what clients need.',
  'How comfortable are you with creating video content? Video is where social media is heading, especially on TikTok and Reels. What would help you feel more confident creating short videos?',
  4
from public.modules m where m.title = 'Content Creation Systems';

-- Lesson 5
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'Building Your Content Library and Reuse System',
  'Smart social media managers never start from zero. They build a content library — a collection of templates, captions, photos, and post ideas that they remix and reuse. Create a master Canva folder with 20 templates per industry (restaurant, salon, clinic, retail). Keep a Google Doc with 50 proven captions organized by type. Save every high-performing post as a template for future use. When you onboard a new client, you pull from your library, customize with their brand kit, and deliver a month of content in 3 hours instead of 10.',
  'Build your starter content library today. In Canva, create a folder called "SMM Library" with subfolders for Restaurant, Salon, Clinic, and Retail. Create at least 5 templates per industry — 20 templates total. Start a Google Doc called "Caption Swipe File" and organize it by: Hooks, CTAs, Testimonial Formats, Promo Templates, and Engagement Questions. Add at least 5 entries per category.',
  'How does having a reusable library change your confidence about taking on new clients? If you can onboard a new client in 3 hours instead of 10, what does that mean for your earning potential at ₱5,000-₱8,000 per client?',
  5
from public.modules m where m.title = 'Content Creation Systems';

-- Module: Platform Mastery FB IG TikTok
-- Lesson 1
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'Facebook Algorithm Decoded for Philippine Businesses',
  'Facebook is still the number one social media platform in the Philippines with over 87 million users. The algorithm prioritizes: meaningful interactions (comments over likes), video content (especially live and Reels), posts from Groups, and content that keeps people on the platform. For business pages, organic reach is typically 2-5% of followers — but you can push this to 10-15% with the right content strategy. Post when your audience is online: 12nn-1pm lunch break, 6pm-9pm evening scroll, and 9am-10am weekend mornings. Filipino users love reaction-based posts, polls, and share-worthy content.',
  'Log into Meta Business Suite for your client page (or create a test business page). Go to Insights and note: (1) when followers are most active, (2) which recent post got the most reach, (3) the page follower demographics. Schedule 3 posts for the upcoming week at the optimal times you discovered. Make one a video, one a photo with question, and one a shareable tip graphic.',
  'What surprised you about when the audience is most active? How does understanding the algorithm change your approach to creating content? Are you posting at the right times?',
  1
from public.modules m where m.title = 'Platform Mastery FB IG TikTok';

-- Lesson 2
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'Facebook Groups Strategy for Local Business Growth',
  'Facebook Groups are a goldmine for Philippine small businesses. Unlike business pages with declining organic reach, Groups get 5-10x more visibility. The strategy: create a community group around your client niche, not their brand. A salon creates "Makati Beauty Tips and Reviews." A gym creates "Fitness Motivation Manila." A restaurant creates "Foodie Finds in Cebu." Post helpful content 80% of the time, promote the business 20%. Grow the group by inviting existing customers and cross-promoting on the business page. Groups with 1,000+ members become a free marketing channel that competitors cannot replicate.',
  'Create a Facebook Group concept for your client. Write the group name, description, 5 group rules, and plan the first 10 posts (8 value posts, 2 subtle promotions). If your client agrees, create the group today. Invite their existing page followers and ask the client to invite their personal contacts. Set a goal: 100 members in the first 2 weeks.',
  'Why do you think community-based marketing works so well in the Philippines? How does the Filipino culture of community and bayanihan connect to Group marketing?',
  2
from public.modules m where m.title = 'Platform Mastery FB IG TikTok';

-- Lesson 3
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'Instagram Strategy for Visual Brands in PH',
  'Instagram has over 18 million Filipino users, growing fast especially among 18-34 year olds in Metro Manila, Cebu, and Davao. It works best for visual businesses: restaurants, cafes, salons, fashion, fitness, and lifestyle brands. The algorithm favors Reels (up to 10x the reach of static posts), carousel posts (highest save rate), and Stories with interactive stickers. Post 4-5 Reels per week, 2-3 carousel posts, and daily Stories. Use 20-30 hashtags mixing popular (#ManilaEats, #PhilippineBeauty) with niche-specific ones. Filipino Instagram users love aesthetic flat-lays, before-and-after transformations, and behind-the-scenes content.',
  'Audit your client Instagram presence (or create one). Optimize the bio: clear description, location, contact button, and a Linktree or direct link. Create 3 Reels under 30 seconds each using trending audio from the Reels tab. Make 1 carousel post with 5-7 slides (educational tip or product showcase). Schedule everything for the next 5 days using Meta Business Suite.',
  'How does the Instagram audience differ from the Facebook audience in the Philippines? Should every client be on both platforms, or are some businesses better suited to one? How do you advise clients on this?',
  3
from public.modules m where m.title = 'Platform Mastery FB IG TikTok';

-- Lesson 4
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'TikTok for Business: The Fastest Growing PH Platform',
  'TikTok has over 49 million Filipino users and is the platform where small businesses can go viral with zero ad budget. The algorithm does not care about follower count — a new account can get 100,000 views on its first video if the content is engaging. For Philippine businesses, what works: product demonstrations, transformation videos, "a day in the life" of the business, trending sound + business twist, and educational tips in 15-30 seconds. Post 1-3 times daily. Use 3-5 hashtags. The golden rule: hook viewers in the first 1 second or they scroll past. TikTok Shop is now available in the Philippines — products can be sold directly in the app.',
  'Create a TikTok business account for your client (or a practice account). Film 3 TikTok videos today: (1) a product demo with trending audio under 15 seconds, (2) a "3 things you did not know about [business/product]" educational clip, (3) a before-and-after or transformation video. Use CapCut to edit with text overlays and transitions. Post all 3 and track which gets the most views after 24 hours.',
  'How does TikTok content creation feel different from Facebook and Instagram? Which platform feels most natural to you? Your comfort level matters because clients will look to you for platform recommendations.',
  4
from public.modules m where m.title = 'Platform Mastery FB IG TikTok';

-- Lesson 5
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'Cross-Platform Content Strategy and Repurposing',
  'The secret to managing 3 platforms without burning out: create once, repurpose everywhere. Film one 60-second vertical video. Post the full version on TikTok. Cut a 30-second highlight for Instagram Reels. Post the same video natively on Facebook. Take a screenshot frame and make it a carousel post on Instagram. Extract the key tip and make it a text-based Facebook post. One piece of content becomes 5 posts across 3 platforms. Use a scheduling stack: Meta Business Suite for Facebook and Instagram, TikTok Studio for TikTok. Plan everything on Sunday, schedule for the week, and your daily work drops to 30 minutes of engagement and responding.',
  'Take the best performing content from the last 2 weeks across all platforms. Repurpose each piece into at least 2 other formats for different platforms. Create a repurposing workflow document: "When I create [type], I also make [format A] for [platform] and [format B] for [platform]." Set up your weekly content batching schedule: which day you create, which day you schedule, and daily engagement time blocks.',
  'Now that you understand all 3 platforms, which combination would you recommend for different types of Philippine businesses? A salon vs. a BPO company vs. a food stall — how would your strategy differ? This multi-platform thinking is what separates a ₱5,000/month manager from a ₱15,000/month strategist.',
  5
from public.modules m where m.title = 'Platform Mastery FB IG TikTok';

-- Module: Analytics and Reporting
-- Lesson 1
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'The 5 Metrics That Actually Matter to Filipino Business Owners',
  'Most small business owners do not care about impressions, reach, or engagement rate. They care about: (1) How many messages or inquiries did we get? (2) How many people visited the store or ordered online? (3) Is our follower count growing? (4) Are people saying good things about us? (5) Is social media making us money? These are the only 5 metrics you need to track and report. Everything else is noise. In Meta Business Suite, you can track messages, link clicks, follower growth, and post performance. For actual sales attribution, ask your client to have their staff ask customers "How did you find us?" and track the answers weekly.',
  'Set up a simple tracking spreadsheet in Google Sheets with these columns: Week, New Followers, Total Messages Received, Link Clicks, Top Post (and its reach), and Client-Reported Walk-ins or Orders from Social Media. Fill in last week data from Meta Business Suite Insights. This spreadsheet is the foundation of your monthly report.',
  'Think about the business owners you know or have met. What matters most to them — followers, engagement, or actual customers walking through the door? How does focusing on business outcomes instead of vanity metrics make you a more valuable social media manager?',
  1
from public.modules m where m.title = 'Analytics and Reporting';

-- Lesson 2
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'Reading Meta Business Suite Insights Like a Pro',
  'Meta Business Suite gives you free analytics for Facebook and Instagram. The key sections: Overview (quick snapshot of reach and engagement), Insights > Content (see which posts performed best and why), Insights > Audience (demographics, active times, locations), and Insights > Benchmarking (compare against similar pages). Check Insights every Monday morning. Look for patterns: Do video posts get more reach? Do posts at 7pm get more engagement than 12nn? Do promotional posts get fewer likes but more messages? These patterns tell you what to do more of and what to stop doing. Export data monthly for your reports.',
  'Spend 30 minutes in Meta Business Suite Insights right now. Answer these questions for your client page: (1) What was the top performing post this month and why? (2) What percentage of followers are male vs female? (3) What are the top 3 cities your audience is from? (4) What day and time gets the highest engagement? Write a half-page summary of your findings — this is the analysis section of your monthly report.',
  'What did the data reveal that surprised you? Were your assumptions about the audience correct? How will these insights change what you post next month?',
  2
from public.modules m where m.title = 'Analytics and Reporting';

-- Lesson 3
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'Creating Monthly Reports Clients Actually Read',
  'A professional monthly report takes 30 minutes to create and keeps clients paying you for years. Use Google Slides or Canva Presentation — never a plain spreadsheet. Structure: Page 1 — headline wins ("Your page grew 23% this month and generated 45 customer messages"). Page 2 — key metrics with month-over-month comparison. Page 3 — top 3 performing posts with screenshots. Page 4 — what we learned and what we will do differently next month. Page 5 — next month plan. Keep it visual, use screenshots, and always lead with positive results. Send it via email on the 1st of each month — consistency builds trust.',
  'Create a monthly report template in Canva or Google Slides. Design all 5 pages with placeholder text and your branding. Fill it in with real or sample data. Make it look professional — use the client brand colors, include their logo, and add screenshots of actual posts. Save this template so you can duplicate it for every client every month. It should take you no more than 30 minutes to customize each month.',
  'How does delivering a professional report change the perceived value of your service? If you charge ₱5,000/month and deliver a report showing you generated 50 customer inquiries, what is the cost-per-lead for your client? How does that compare to newspaper or flyer advertising?',
  3
from public.modules m where m.title = 'Analytics and Reporting';

-- Lesson 4
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'A/B Testing Content to Improve Results Every Month',
  'A/B testing means comparing two versions of the same content to see which performs better. Test one variable at a time: same image with two different captions, same caption with two different images, same post at two different times, Tagalog vs English vs Taglish captions. Run each test for at least one week with 2-3 posts per variation. Track results in your spreadsheet. Over 3 months of consistent testing, you will know exactly what works for each client audience. This data-driven approach is what justifies raising your rates from ₱5,000 to ₱10,000 per month — you are not guessing, you are optimizing.',
  'Design 3 A/B tests to run this week: (1) Test posting time — same content type posted at 12nn vs 7pm, (2) Test caption language — same image with Taglish caption vs pure English caption, (3) Test content format — same topic as a static image vs a Reel. Document your hypothesis, run the tests, and record the results at the end of the week.',
  'What did your A/B tests reveal? Were you surprised by any results? How does having data to back up your content decisions change how you communicate with clients about strategy?',
  4
from public.modules m where m.title = 'Analytics and Reporting';

-- Lesson 5
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'ROI Conversations That Lock In Long-Term Clients',
  'The number one reason clients cancel social media management is they do not see the return on investment. Your job is to make the ROI obvious every single month. Calculate it simply: if a salon client pays you ₱8,000/month and your social media efforts brought in 20 new customers who spent an average of ₱500 each, that is ₱10,000 in new revenue from an ₱8,000 investment. Frame every report around this: "For every ₱1 you invest in social media management, you are getting ₱X back." When clients see clear ROI, they never cancel — and they happily pay rate increases. Track customer acquisition from social media by using a simple "How did you find us?" system.',
  'Create an ROI calculator in Google Sheets. Inputs: monthly management fee, number of inquiries from social media, estimated conversion rate, average customer spend. Output: estimated revenue generated, ROI ratio, cost per acquisition. Fill it in with real or estimated data for your current client. Include this ROI page in your next monthly report. Practice explaining it verbally as if presenting to the client.',
  'How confident do you feel talking about ROI with business owners? What numbers do you need to track more carefully to make the ROI case stronger? How does proving ROI connect to your goal of raising rates and scaling your income?',
  5
from public.modules m where m.title = 'Analytics and Reporting';

-- Module: Scaling to 40K Per Month
-- Lesson 1
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'The Math Behind ₱40,000/Month From Social Media Management',
  'Let us break down exactly how to reach ₱40,000/month. Option A: 8 clients at ₱5,000 each. Option B: 5 clients at ₱8,000 each. Option C: 3 clients at ₱10,000 each plus 2 at ₱5,000. Option B or C is better because fewer clients means less work and higher quality output. To charge ₱8,000-₱10,000 per client, you need to offer more than basic posting: add content strategy, monthly reporting, community management, and basic ad management. At 3-4 hours per week per client and 5 clients, that is 15-20 hours per week — leaving plenty of time for a day job if you still have one. This is a realistic full side income or transition to full-time.',
  'Map out your scaling plan. Write down: (1) your current number of clients and monthly income, (2) your target — how many clients at what rate to reach ₱40,000, (3) what additional services you need to offer to justify higher rates, (4) your timeline — which month will you reach each milestone. Be specific: "By month 3, I will have 3 clients at ₱8,000 each. By month 6, I will have 5 clients at ₱8,000 each."',
  'What is your preferred path to ₱40,000 — more clients at lower rates or fewer clients at higher rates? What does each path require from you in terms of skills and time? Which aligns better with your lifestyle goals?',
  1
from public.modules m where m.title = 'Scaling to 40K Per Month';

-- Lesson 2
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'Raising Your Rates Without Losing Clients',
  'After 3 months of consistent results, you have earned the right to raise your rates. The conversation: "In the past 3 months, we have grown your page by X followers, generated Y inquiries, and your posts are reaching Z people monthly. Based on these results and the value I am delivering, I am adjusting my rate from ₱5,000 to ₱8,000/month starting next month. This includes [new service you are adding: monthly strategy call, competitor analysis, or basic ad management]." Always add something when you raise prices — it makes the increase feel justified. Most clients will say yes if you have been delivering results. If they say no, that is fine — replace them with a new client at the higher rate.',
  'Prepare your rate increase conversation for your longest-standing client. Write out: (1) the specific results you have delivered (use real numbers from your reports), (2) the new rate, (3) the additional service you are including, (4) the date it takes effect. Practice saying it out loud until it sounds confident, not apologetic. Schedule the conversation for this week.',
  'What emotions come up when you think about asking for more money? Where does that discomfort come from? How does proving your value through data make the conversation easier? Remember: undercharging is not humility, it is a disservice to your growth.',
  2
from public.modules m where m.title = 'Scaling to 40K Per Month';

-- Lesson 3
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'Client Acquisition Channels Beyond Your Personal Network',
  'Your first 2-3 clients probably came from personal connections. To scale beyond that, you need systematic acquisition channels. The top 5 for Filipino social media managers: (1) Facebook Groups for small business owners — join 10 and provide free value before pitching. (2) OnlineJobs.ph — create a profile as a social media manager, many local businesses post there too. (3) Referrals — ask every happy client to introduce you to one business owner friend. (4) Cold outreach on Instagram — DM businesses with bad social media and offer a free audit. (5) Local BNI or business networking events — one breakfast meeting can land a ₱10,000/month client. Aim for 2 new client inquiries per week from these channels.',
  'This week, take 3 actions: (1) Join 5 Facebook Groups for Filipino small business owners or entrepreneurs and introduce yourself with a helpful post, not a sales pitch. (2) Create or update your OnlineJobs.ph profile highlighting your social media management experience and results. (3) Ask your current clients for one referral each — send them a message template they can forward to their business owner friends.',
  'Which acquisition channel feels most natural to you? Which feels uncomfortable but potentially most effective? Growth usually happens just outside your comfort zone. How can you push yourself on the channel that feels hardest?',
  3
from public.modules m where m.title = 'Scaling to 40K Per Month';

-- Lesson 4
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'Hiring Your First Virtual Assistant at ₱3,000/Month',
  'Once you reach 4-5 clients, you will hit a time ceiling. The solution is not to work more hours — it is to hire help. A part-time virtual assistant can handle: scheduling posts in Meta Business Suite, responding to basic comments and messages, creating simple Canva posts from your templates, and compiling weekly metrics. Hire on OnlineJobs.ph or from your own network — a college student or stay-at-home parent looking for ₱3,000-₱5,000/month part-time work. You pay them ₱3,000, you charge each client ₱8,000, and you focus on strategy, client relationships, and getting new clients. This is how you go from freelancer to agency owner.',
  'Write a job description for a part-time social media assistant. Include: tasks (list specific daily and weekly tasks), required skills (Canva, Meta Business Suite, good written English/Taglish), hours (10-15 hours per week), and pay (₱3,000-₱5,000/month via GCash). Post it on OnlineJobs.ph or share it in a Facebook Group for job seekers. Create a simple training document using your existing content calendar templates and workflows.',
  'How does the idea of hiring someone change your view of this business? You are no longer just trading time for money — you are building a system. What other tasks could you eventually delegate to scale even further?',
  4
from public.modules m where m.title = 'Scaling to 40K Per Month';

-- Lesson 5
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'Building Your Social Media Management Agency Brand',
  'At ₱40,000/month and beyond, you are no longer a freelancer — you are running an agency. Give your business a name, create a simple logo in Canva, set up a Facebook Business Page showcasing client results (with permission), and create a one-page website using Canva Website or Google Sites (both free). Register your business with the DTI as a sole proprietorship for ₱200-₱1,000 — this lets you issue official receipts and builds client trust. Open a separate GCash business account or bank account for business income. You are now a legitimate business owner. Your next milestone: ₱80,000-₱100,000/month with a team of 2-3 assistants managing 12-15 clients.',
  'Take these branding steps today: (1) Choose a business name and check availability on DTI BNRS (bnrs.dti.gov.ph). (2) Create a logo in Canva. (3) Set up a Facebook Business Page with your logo, services offered, and pricing packages. (4) Write 3 case studies from your existing clients — before metrics, what you did, after metrics. (5) Create a simple one-page website on Google Sites with these case studies, your services, and a contact form. Share the page link on your personal Facebook.',
  'You started this track learning how to get your first ₱5,000/month client. Now you are building a brand and agency. How has your identity shifted? Do you see yourself as a business owner now? What does the next 12 months look like for your social media management agency?',
  5
from public.modules m where m.title = 'Scaling to 40K Per Month';


-- ============================================================
-- TRACK 2 LESSONS: Shopee/Lazada E-Commerce
-- ============================================================

-- Module: Finding Winning Products
-- Lesson 1
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'The ₱200-₱500 Sweet Spot That Drives Shopee Sales',
  'Products priced between ₱200 and ₱500 are the sweet spot on Shopee Philippines. Low enough for impulse purchases — most Filipinos will buy without overthinking at this price point. High enough to give you ₱50-₱150 profit per unit after Shopee fees (which are about 6-12% depending on your tier) and shipping costs. The bestselling categories in PH: beauty and personal care, home organization, phone accessories, health supplements, and pet supplies. Avoid electronics over ₱1,000 — returns are high and competition from official stores is fierce. Your first product should be small, lightweight (under 500g for cheap shipping), and solve a clear daily problem.',
  'Open Shopee Philippines right now. Go to the Daily Discover section and browse for 30 minutes. Screenshot 20 products in the ₱200-₱500 range that have over 1,000 units sold. For each, note: price, number of reviews, seller rating, and whether the seller seems like a big brand or a small reseller. Look for products where multiple small sellers are making sales — this means demand is proven and you can enter the market.',
  'Which of the 20 products surprised you with their sales volume? What daily problems do these products solve? Can you see patterns in what Filipino shoppers are buying?',
  1
from public.modules m where m.title = 'Finding Winning Products';

-- Lesson 2
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'Using Shopee Search Data to Validate Demand',
  'Before committing to any product, validate demand using Shopee search autocomplete. Type a broad keyword like "organizer" in the Shopee search bar and see what autocomplete suggests — these are real searches by real Filipino buyers. "Organizer for small room" tells you space-saving solutions are in demand. "Organizer aesthetic" tells you design matters. Check the search results: if the top 10 listings have 500+ sales each, demand is proven. If the top listings have fewer than 100 sales, the market might be too small. Also check Shopee Trending on the homepage — these categories are seeing rapid growth. Cross-reference with Lazada to see if the same products sell there too.',
  'Research 5 product ideas using this method. For each: (1) type the broad keyword in Shopee search and note the top 5 autocomplete suggestions, (2) check the top 10 listings — how many units sold for each, (3) note the price range of the top sellers, (4) check Lazada for the same product — is it selling there too? Score each product 1-10 on demand validation. Pick your top 2 candidates.',
  'What did the search autocomplete data reveal about Filipino buyer behavior? Were any of the popular search terms things you would not have thought of on your own? How does data-driven product research feel compared to just guessing?',
  2
from public.modules m where m.title = 'Finding Winning Products';

-- Lesson 3
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'Calculating Your Profit Margin Before You Source',
  'Never source a product without calculating margins first. The formula for Shopee: Selling Price minus Product Cost minus Shopee Commission (6-12%) minus Shipping Subsidy (if you offer free shipping) minus Packaging Cost (₱10-₱20 per order for bubble wrap, box, thank you card) equals your Profit. Example: selling at ₱399, product cost ₱120 from a local supplier, Shopee commission at 8% is ₱32, shipping you subsidize at ₱50, packaging ₱15. Profit = ₱399 - ₱120 - ₱32 - ₱50 - ₱15 = ₱182 per unit. That is a 46% margin — very healthy. For dropshipping from China, add ₱80-₱150 for international shipping per item. You need at least 30% net margin to survive price wars and promotions.',
  'Create a profit calculator in Google Sheets. Input cells: Selling Price, Product Cost, Shopee Commission Rate, Shipping Cost, Packaging Cost. Output: Profit per Unit, Margin Percentage. Run your top 2 product candidates through this calculator using estimated costs. Check product costs on 1688.com (use Google Translate) or local suppliers on Facebook Marketplace. Can you achieve at least 30% margin on either product?',
  'Does the margin calculation change which product you want to sell? Sometimes a product with lower demand but higher margins is better than a hot product with razor-thin margins. Which matters more to you at this stage — volume or margin?',
  3
from public.modules m where m.title = 'Finding Winning Products';

-- Lesson 4
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'Sourcing Products Locally vs From China',
  'You have two main sourcing options. Local sourcing: faster shipping (1-3 days), no customs hassle, lower minimum orders, but higher product costs. Check Divisoria (Manila), Colon Street (Cebu), or Facebook supplier groups. Great for starting with zero capital risk — buy 10-20 units to test. China sourcing: much cheaper products (often 50-70% less), but slower shipping (7-21 days), minimum orders of 50-100 units, and customs fees for orders over $200. Use 1688.com for the cheapest prices or AliExpress for smaller orders. Third option: local China-sourced warehouses — suppliers who already imported in bulk and sell from Manila. Find them in Facebook Groups like "Shopee Sellers Philippines" or "China Sourcing PH." This is the best of both worlds for beginners.',
  'Explore all 3 sourcing options for your top product candidate. (1) Search Facebook Marketplace and Divisoria supplier groups for local pricing. (2) Search your product on AliExpress and 1688.com — screenshot the prices and minimum order quantities. (3) Search "Shopee Sellers Philippines" and "China Sourcing PH" Facebook Groups for local warehouses selling your product category. Compare pricing across all 3. Which gives you the best margin?',
  'What are the trade-offs you see between local and China sourcing? If you could only choose one sourcing method to start, which would it be and why? How does your available capital affect this decision?',
  4
from public.modules m where m.title = 'Finding Winning Products';

-- Lesson 5
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'Your First Product Decision: Commit and Order',
  'Analysis paralysis kills more e-commerce businesses than bad products. You have done the research. You have validated demand. You have calculated margins. Now choose your first product and commit. Order your initial test batch: 20-50 units if sourcing locally, 50-100 units if sourcing from China. Your total test investment should be ₱3,000-₱8,000 — treat this as tuition, not risk. If the product fails, you learned more in 2 weeks of real selling than in 6 months of research. When your inventory arrives, take quality photos immediately (next module covers store setup). Your goal: list the product and make your first sale within 7 days of receiving inventory.',
  'Make your final product decision right now. Place your first order today — contact the supplier, confirm pricing and quantity, arrange payment via GCash or bank transfer. While waiting for inventory, prepare: (1) take product photos if you have a sample, (2) write your product title and description, (3) research your top 5 competitor listings and note what you can do better. Set a launch date on your calendar — the day after inventory arrives.',
  'You just committed real money to your first product. How does it feel? What is your biggest fear? What is the minimum number of units you need to sell to break even? Having that break-even number in mind keeps you grounded and focused.',
  5
from public.modules m where m.title = 'Finding Winning Products';

-- Module: Setting Up Your Store
-- Lesson 1
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'Setting Up Your Shopee Seller Account Step by Step',
  'Creating a Shopee Seller account takes 15 minutes. Download the Shopee app, go to the Sell tab, and register using your phone number. You will need: a valid Philippine ID (national ID, passport, or driver license), your GCash or bank account details for payouts, and a phone number for verification. Choose a shop name that sounds professional and trustworthy — avoid random numbers or complicated names. Good examples: "OrganizeKo PH," "FreshGlow Beauty," "DeskMate Store." The name should hint at what you sell. Set your shop pickup address — this is where Shopee courier partners (J&T, Flash Express, Ninja Van) will collect your packages. Enable as many payment methods as possible: GCash, Maya, ShopeePay, credit card, and COD (cash on delivery — this is huge in the Philippines, about 60% of orders).',
  'Create your Shopee Seller account right now. Complete these steps: (1) Register and verify your phone number, (2) Upload your valid ID for seller verification, (3) Set your shop name, (4) Add your pickup address, (5) Connect your GCash or bank account for payouts, (6) Enable COD payment option. Take a screenshot of your completed seller dashboard. If you already have an account, audit these settings and make sure everything is optimized.',
  'How does having a real seller account feel? You are now part of the Shopee marketplace with millions of Filipino buyers. What would make a buyer choose your store over the hundreds of others?',
  1
from public.modules m where m.title = 'Setting Up Your Store';

-- Lesson 2
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'Branding Your Store for Trust and Repeat Buyers',
  'Filipino online shoppers are cautious — scam stores have made everyone wary. Your store branding needs to scream "trustworthy" from the first glance. Upload a professional shop logo (create one in Canva — use clean fonts and simple icons). Write a shop description that includes: what you sell, why buyers should trust you (fast shipping, quality checked, responsive seller), and a friendly Taglish tone. Set up shop categories to organize your products. Add a shop banner — Canva has Shopee banner templates at 1200x600 pixels. Most importantly: set your chat auto-reply to respond instantly to inquiries. Shopee rewards sellers with fast response times by boosting your listings in search results. The Chat Response Rate metric directly affects your seller ranking.',
  'Brand your store today: (1) Create a shop logo in Canva — keep it simple, professional, and related to your product category. (2) Write your shop description in Taglish — include what you sell, a trust statement, and a friendly closing. (3) Upload a shop banner designed in Canva at 1200x600 pixels. (4) Set up auto-reply in Shopee chat with a friendly message like "Salamat sa message! We will reply within 1 hour. Feel free to browse our products!" (5) Create 3-5 shop categories to organize your listings.',
  'If you were a buyer seeing your store for the first time, would you trust it? What makes you trust an online store when you shop? How can you apply those same trust signals to your own store?',
  2
from public.modules m where m.title = 'Setting Up Your Store';

-- Lesson 3
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'Setting Up Lazada as Your Second Marketplace',
  'Do not put all your eggs in one basket. Lazada Philippines has a different buyer demographic — slightly higher income, more brand-conscious, and comfortable with higher price points (₱300-₱800 sweet spot). Setting up a Lazada Seller Center account requires: DTI business registration or SEC registration (DTI costs ₱200-₱1,000 and takes 1-2 days online at bnrs.dti.gov.ph), valid ID, bank account, and product photos. Lazada commission rates are 2-5% depending on category — lower than Shopee. The seller interface is different: you manage everything through seller.lazada.com.ph on desktop. Lazada also has stronger marketing tools: sponsored products, flash sales, and brand stores. List the same products on both platforms to maximize your market reach.',
  'Register your DTI business name at bnrs.dti.gov.ph if you have not already — this is required for Lazada and good for business credibility anyway. Then create your Lazada Seller Center account at seller.lazada.com.ph. Complete the verification process. While waiting for approval (1-3 business days), familiarize yourself with the Lazada Seller Center dashboard — explore Products, Orders, Finance, and Marketing sections.',
  'How does having two sales channels change your risk profile? If Shopee suspended your store tomorrow, would you still have income? Why is platform diversification important for any online business?',
  3
from public.modules m where m.title = 'Setting Up Your Store';

-- Lesson 4
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'Shipping Setup and COD Configuration for Maximum Orders',
  'Shipping is where Filipino e-commerce sellers win or lose. Cash on Delivery (COD) accounts for about 60% of orders on Shopee — if you do not enable it, you lose over half your potential sales. Enable Shopee Supported Logistics: J&T Express, Flash Express, and Ninja Van are the most reliable. Set realistic shipping days — promise 3-5 days and deliver in 2-3 to get positive reviews. For packaging: use bubble wrap for fragile items, branded thank you cards increase repeat purchases by 15-20%, and always double-seal packages (Filipino weather and courier handling are rough). Weight and size matter — measure accurately because Shopee charges shipping based on these. A 500g package ships for about ₱80-₱120 within Luzon, more for Visayas and Mindanao.',
  'Set up your shipping configuration: (1) Enable J&T Express, Flash Express, and Ninja Van in Shopee Seller Center. (2) Enable COD for all courier options. (3) Measure and weigh your product with packaging — input accurate dimensions. (4) Order packaging supplies: poly mailers or boxes (check Shopee itself for bulk deals), bubble wrap, and packing tape. (5) Design and print 50 thank you cards in Canva — include your shop name, a QR code to your shop, and a line asking for a 5-star review.',
  'Have you ever had a bad delivery experience as an online buyer? What happened and how did it make you feel about the seller? How can you ensure your customers never have that experience?',
  4
from public.modules m where m.title = 'Setting Up Your Store';

-- Lesson 5
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'Store Policies and Customer Service Setup',
  'Professional store policies reduce disputes and build buyer confidence. Set up: return and refund policy (Shopee has a standard 7-day return policy — do not fight it, embrace it as a trust signal), response time commitment (reply to all chats within 2 hours during business hours), and shipping timeline commitment. For customer service, create message templates for common questions: "Is this available?" "Can you ship to [province]?" "What is the material?" Having templates saved in Shopee chat means you respond in seconds instead of minutes. The faster you respond, the higher your Shopee seller score, and the more your listings get boosted. Your goal: maintain a Chat Response Rate above 90% and a Ship On Time rate above 95%.',
  'Create your store systems today: (1) Write your return and refund policy and add it to your shop description. (2) Create 10 saved message templates in Shopee chat for common buyer questions. (3) Set your "business hours" for responding — commit to checking messages at 9am, 12nn, 3pm, 6pm, and 9pm daily. (4) Turn on push notifications for Shopee Seller so you never miss an order. (5) Create a simple order tracking spreadsheet: Order Number, Product, Customer City, Shipped Date, Courier, Tracking Number. Your store is now fully set up and ready for your first listing.',
  'Your store infrastructure is complete. How organized do you feel about running this business? What systems or habits do you need to maintain to keep operations smooth as orders increase?',
  5
from public.modules m where m.title = 'Setting Up Your Store';

-- Module: Listing Optimization
-- Lesson 1
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'Writing Product Titles That Rank on Shopee Search',
  'Your product title is the single most important factor for being found on Shopee. The formula: Brand (if applicable) + Product Name + Key Feature + Specification + Benefit. Example: "Desk Organizer Acrylic Clear 3-Tier Desktop Storage for Office and Home." Include keywords that Filipino buyers actually search for — use both English and Taglish terms. Shopee allows 100 characters for titles on the app and 120 on desktop — use as many as you can. Do not waste characters on "Sale!" or emoji — the algorithm cannot read those. Research competitor titles: search your product keyword and note the exact terms used by the top 10 bestselling listings. Your title should contain all those important keywords while still reading naturally.',
  'Optimize your product title following this process: (1) Search your main product keyword on Shopee and note the autocomplete suggestions — these are real buyer search terms. (2) List all the keywords from the top 10 bestselling competitor titles. (3) Write 3 title variations using the formula. (4) Pick the one that includes the most keywords while reading naturally. Compare your title to the top seller — are you missing any important search terms?',
  'How does thinking about your product title as a search engine optimization task change your approach? What keywords did you discover that you would not have thought to include on your own?',
  1
from public.modules m where m.title = 'Listing Optimization';

-- Lesson 2
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'Product Photos That Stop the Scroll and Convert',
  'On Shopee, you get 9 image slots — use all of them. Image 1 (the thumbnail) is the most important: show the product clearly on a white or light background, add a small badge like "Top Seller" or "Free Shipping" if applicable. Image 2-3: show the product from different angles. Image 4-5: show the product in use (lifestyle shots — a hand holding it, someone using it). Image 6-7: close-up details that show quality (stitching, material texture, size comparison with a common object). Image 8: size chart or specifications graphic. Image 9: packaging and what is included in the box. You do not need a professional camera — a smartphone with good lighting near a window and a white poster board background produces images that match top sellers. Edit in Canva: add brightness, remove background, add text overlay with key benefits.',
  'Take a complete set of 9 product photos today. Use natural window light and a white background (poster board or bedsheet works fine). Follow the exact sequence above. Edit all 9 in Canva — adjust brightness and contrast, add subtle text overlays for features. Compare your photos side by side with the top 3 competitors. Are yours equally professional? Upload all 9 to your Shopee listing.',
  'Which of the 9 images was hardest to create? How do your photos compare to top sellers in your category? Remember: buyers cannot touch your product — your photos are the only way they evaluate quality.',
  2
from public.modules m where m.title = 'Listing Optimization';

-- Lesson 3
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'Writing Product Descriptions That Answer Every Buyer Question',
  'A great Shopee product description has 3 sections: (1) Opening hook — the key benefit in one sentence. "Finally, a desk organizer that fits in small Filipino home offices and keeps everything within reach." (2) Feature-benefit bullets — list 5-8 features, each paired with a benefit. Not just "3-tier design" but "3-tier design: keeps pens, phone, and supplies organized without taking up desk space." (3) Specifications — material, dimensions in cm, weight, color options, what is in the box. Write in simple English or Taglish. Add a mini FAQ: "Will this fit on a small desk? Yes, it is only 15cm wide." Filipino buyers read descriptions before purchasing — especially for products over ₱300. A detailed description reduces returns and negative reviews because buyers know exactly what they are getting.',
  'Write your full product description following the 3-section format. Include: (1) A compelling opening hook sentence, (2) At least 6 feature-benefit bullet points, (3) Full specifications with measurements in centimeters, (4) A 3-question mini FAQ addressing the most common buyer concerns. Check your competitor listings — what questions do buyers ask in the reviews? Address those in your description proactively.',
  'Read through 20 buyer reviews on a competitor listing for your product. What questions and complaints come up most? How can your product description preemptively answer every concern?',
  3
from public.modules m where m.title = 'Listing Optimization';

-- Lesson 4
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'Pricing Strategy: Promotions, Vouchers, and Bundle Deals',
  'On Shopee, your listed price is not always what the buyer pays — and that is by design. The platform runs on promotions. Strategy 1: Set your "original price" 15-20% higher, then apply a shop discount to show a crossed-out price. Buyers love feeling like they got a deal. Strategy 2: Create shop vouchers — "₱30 off on orders over ₱300" drives larger basket sizes. Strategy 3: Bundle deals — sell 2 units at a 10% discount to increase average order value. Strategy 4: Free shipping vouchers — Shopee subsidizes part of the shipping cost during campaigns, and you can add a small subsidy too. Join every Shopee campaign (payday sale, mid-month sale, 7.7, 8.8, 9.9, etc.) — your products get extra visibility on campaign pages. These campaigns can 3-5x your normal daily sales volume.',
  'Set up your pricing strategy: (1) Adjust your "original price" to be 15-20% above your intended selling price. (2) Create a shop discount showing the reduced price. (3) Create 2 shop vouchers: a small discount (₱20 off ₱250) and a larger one (₱50 off ₱500). (4) If you have multiple products, create one bundle deal. (5) Go to Shopee Seller Center > Marketing Centre > Campaigns and register for the next upcoming sale campaign.',
  'How does the psychology of discounts affect you as a buyer? How can you use that same psychology ethically to increase your sales? What is the difference between manipulative pricing and smart promotional strategy?',
  4
from public.modules m where m.title = 'Listing Optimization';

-- Lesson 5
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'Getting Your First Reviews and Building Social Proof',
  'A product with zero reviews is almost invisible on Shopee. Your first 10 reviews determine your listing trajectory. Ethical strategies to get early reviews: (1) Ask friends and family to purchase at full price and leave honest reviews — give them the money via GCash afterward. (2) Include a thank you card in every package that says "Love your purchase? A 5-star review with photo helps us serve you better! Screenshot your review and message us for a ₱20 voucher on your next order." (3) Follow up with every buyer via Shopee chat 3 days after delivery: "Hi! Hope you are enjoying your [product]. If you have a moment, a review would really help our small shop. Salamat po!" (4) Respond to every review publicly — thank positive ones, professionally address negative ones. After 50 reviews with a 4.8+ rating, your listing will rank significantly higher in search results.',
  'Launch your review-building campaign: (1) Print or order thank you cards with a review request and small incentive. (2) Write a follow-up message template to send 3 days after delivery. (3) Reach out to 5 friends or family members who would genuinely purchase and review your product. (4) Respond to any existing reviews on your listing — thank each reviewer by name. Track your review count daily for the first 2 weeks.',
  'How important are reviews to you when you shop online? Have you ever decided not to buy something because of bad reviews or lack of reviews? How does this customer perspective inform your strategy as a seller?',
  5
from public.modules m where m.title = 'Listing Optimization';

-- Module: Order Fulfillment Dropship and Warehouse
-- Lesson 1
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'Dropshipping vs Warehouse: Choosing Your Fulfillment Model',
  'Two ways to fulfill orders. Dropshipping: you never touch the product. When a customer orders, you forward the order to your supplier who ships directly. Pros: zero inventory cost, no storage needed, unlimited product testing. Cons: slower shipping (3-7 days domestic, 7-21 days from China), no quality control, lower margins. Warehouse model: you buy inventory in bulk, store it at home or in a small space, and ship yourself. Pros: fast shipping (1-2 days), full quality control, better margins, and COD-friendly. Cons: upfront capital needed, storage space required, risk of unsold inventory. For beginners in the Philippines, the best approach is hybrid: dropship to test products, then warehouse the winners. Start with ₱5,000-₱10,000 worth of inventory for your proven products.',
  'Evaluate both models for your product. Calculate: (1) Dropship model — find a Philippine-based dropship supplier (check "Dropship Philippines" Facebook Groups), get their per-unit price and shipping timeline. Calculate your margin. (2) Warehouse model — price for a 50-unit bulk order, your cost per unit, and margin. Compare both side by side. Which gives better margin? Which can you start with given your current capital? Write your decision and reasoning.',
  'What is your current financial situation? Can you invest ₱5,000-₱10,000 in inventory, or do you need to start with zero-capital dropshipping? There is no wrong answer — the best model is the one you can actually start with today.',
  1
from public.modules m where m.title = 'Order Fulfillment Dropship and Warehouse';

-- Lesson 2
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'Setting Up Domestic Dropship Suppliers',
  'Philippine-based dropship suppliers ship within 1-3 days — much better than China dropshipping. Find them in Facebook Groups: "Dropship Suppliers Philippines," "Shopee Sellers Support Group," and "Resellers and Dropshippers PH." Look for suppliers who offer: per-piece ordering (no minimums), product photos you can use, fast shipping (same day or next day), and packaging without their branding. Vet suppliers carefully: order a sample first, check their response time, and ask for references from other resellers. Agree on clear terms: how you send orders (usually via Viber or Google Forms), payment method (GCash daily or weekly), and return handling. Keep a backup supplier for your top product — if your main supplier runs out of stock, you can switch without missing orders.',
  'Join 3 Facebook Groups for Philippine dropship suppliers. Search for suppliers who carry products in your category. Contact at least 5 suppliers and ask: (1) Do you offer per-piece dropshipping? (2) What is the per-unit price for [your product]? (3) What is your shipping timeline? (4) How do I submit orders? (5) Can I order a sample? Order a sample from your top 2 suppliers. Compare quality, packaging, and delivery speed.',
  'How did the supplier search go? Were the suppliers responsive and professional? A reliable supplier is the backbone of your business — what qualities matter most to you in a business partner?',
  2
from public.modules m where m.title = 'Order Fulfillment Dropship and Warehouse';

-- Lesson 3
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'The Home Warehouse Setup for Under ₱2,000',
  'You do not need a warehouse — a corner of your bedroom or a small cabinet works for your first 100-500 units. What you need: a storage shelf or cabinet (₱500-₱1,000 on Shopee), packaging supplies (poly mailers ₱200 for 100 pieces, bubble wrap ₱150 per roll, packing tape ₱50), a kitchen scale for weighing packages (₱200-₱400), a thermal printer for shipping labels if volume exceeds 10 orders per day (₱1,500-₱3,000, but optional — you can print at a computer shop for ₱5 per label initially). Organize with the FIFO system: first in, first out — put new stock behind old stock so nothing expires or deteriorates. Label everything clearly. Keep your workspace clean and dedicated — mixing personal and business space leads to mistakes.',
  'Set up your home fulfillment station today: (1) Designate a specific corner or shelf for inventory and packing supplies. (2) Order packaging supplies on Shopee (search "poly mailer 100pcs" and "bubble wrap roll"). (3) Get a kitchen scale for weighing packages. (4) Create an inventory tracking spreadsheet: Product, Stock Count, Reorder Point (the minimum stock before you reorder), Last Reorder Date. (5) Practice packing 3 sample orders — time yourself. You should be able to pack and label an order in under 5 minutes.',
  'Is your living space suitable for a small fulfillment operation? If space is limited, what creative solutions could you use? At what order volume would you need to find external storage?',
  3
from public.modules m where m.title = 'Order Fulfillment Dropship and Warehouse';

-- Lesson 4
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'Processing Orders Fast: The Daily Shipping Routine',
  'Speed wins on Shopee. Sellers who ship within 24 hours get higher search rankings, better seller badges, and fewer cancellations. Your daily routine: Morning (9-10am) — check for new orders in Shopee Seller Center, print shipping labels, pack all orders. Afternoon (1-2pm) — schedule courier pickup through the Shopee app or drop off at the nearest J&T/Flash Express/Ninja Van partner shop. Evening (8-9pm) — check for new orders again, prepare for next morning shipment. For COD orders, track them closely — COD has a 15-20% failed delivery rate in the Philippines. Follow up with customers via chat if the courier cannot reach them. Every cancelled COD order costs you the return shipping fee. Mark all orders as shipped immediately after handing to the courier — this updates the customer tracking and reduces "Where is my order?" messages.',
  'Process your next batch of orders using this exact routine. If you have no orders yet, do a dry run: create a sample order, print the label, pack the product, and schedule a courier pickup. Time the entire process. Set up phone alarms for your daily order processing schedule: 9am, 1pm, 8pm. Create a daily checklist you can follow every day: Check Orders, Print Labels, Pack Products, Schedule Pickup, Update Inventory Count, Respond to Messages.',
  'How does the daily routine feel? Is it manageable alongside your current schedule? What would you need to adjust if you were processing 20-30 orders per day instead of 2-3?',
  4
from public.modules m where m.title = 'Order Fulfillment Dropship and Warehouse';

-- Lesson 5
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'Handling Returns, Refunds, and Difficult Customers',
  'Returns and complaints are part of the business — how you handle them determines your long-term success. Shopee standard: buyers can return within 7 days for a refund. Your policy: accept all returns gracefully, respond within 4 hours, and offer solutions before the buyer escalates to Shopee. Common scenarios: (1) Wrong item sent — apologize, send correct item immediately, let them keep the wrong one if it is under ₱200. (2) Damaged in transit — apologize, send replacement, file a claim with the courier. (3) Buyer remorse — accept the return, offer a voucher for next purchase. (4) COD refused — update your blacklist, consider removing COD for that area. Key metric: keep your dispute rate below 2%. One bad public response can hurt more than 10 positive reviews. Always respond publicly to negative reviews with empathy and a solution — future buyers will see how you treat customers.',
  'Prepare your customer service toolkit: (1) Write response templates for the 5 most common complaints (wrong item, damaged, late delivery, not as described, change of mind). (2) Create a returns tracking spreadsheet: Date, Order Number, Reason, Resolution, Cost to You. (3) Write a public review response template for negative reviews that shows empathy and professionalism. (4) Set your policy for when to offer a refund vs replacement vs voucher. Test this: have a friend pretend to be an angry customer and practice responding.',
  'How do you typically handle conflict or complaints in your personal life? Does that same approach work in business? What does professional customer service look like to you, and can you maintain it even when the complaint feels unfair?',
  5
from public.modules m where m.title = 'Order Fulfillment Dropship and Warehouse';

-- Module: Scaling with Ads
-- Lesson 1
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'Shopee Ads Basics: Your First ₱500 Ad Campaign',
  'Shopee Ads work like Google Ads — you bid on keywords and your product appears at the top of search results. There are 3 types: Search Ads (appear when buyers search for keywords), Discovery Ads (appear on the homepage and product detail pages), and Boost Ads (simple one-click boost for visibility). Start with Search Ads — they have the best return on investment because buyers are already searching for your product. Set a daily budget of ₱50-₱100 (about ₱1,500-₱3,000/month). Choose 10-15 keywords related to your product. Shopee will suggest bids — start with the suggested minimum bid. The key metric is ROAS (Return on Ad Spend): if you spend ₱100 on ads and generate ₱500 in sales, your ROAS is 5x. Aim for at least 3x ROAS to be profitable.',
  'Launch your first Shopee Ads campaign: (1) Go to Shopee Seller Center > Marketing Centre > Shopee Ads. (2) Create a Search Ads campaign. (3) Select your best-selling product. (4) Add 10-15 relevant keywords — use the ones from your product title and Shopee autocomplete suggestions. (5) Set a daily budget of ₱50. (6) Set the bid at Shopee suggested minimum. (7) Let it run for 3 days without changing anything. After 3 days, check your dashboard: impressions, clicks, click-through rate, and orders from ads.',
  'How does spending money on advertising feel? Do you see it as a cost or an investment? What ROAS would you need to feel comfortable scaling your ad budget from ₱50/day to ₱200/day?',
  1
from public.modules m where m.title = 'Scaling with Ads';

-- Lesson 2
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'Keyword Optimization: Finding What Buyers Actually Search',
  'The difference between a ₱50/day campaign that loses money and one that prints money is keyword selection. Use these research methods: (1) Shopee search autocomplete — type your product name and note every suggestion. (2) Competitor keywords — look at top seller product titles and descriptions. (3) Shopee Ads keyword tool — it shows search volume and competition for each keyword. (4) Buyer language — check reviews to see how buyers describe your product in their own words. Remove keywords that get clicks but no sales (high cost, low intent). Double down on keywords that convert. Filipino buyers often search in Taglish: "desk organizer malaki" or "face wash for oily skin." Include both English and Taglish keyword variations. Review and optimize keywords weekly.',
  'Optimize your keyword list: (1) Export your current ad performance data. (2) Remove any keyword with more than 50 clicks and zero orders. (3) Add 10 new keywords from Shopee autocomplete — include Taglish variations. (4) Create a separate campaign for your top 5 converting keywords with a slightly higher bid. (5) Create a keyword tracking spreadsheet: Keyword, Impressions, Clicks, CTR, Orders, ROAS. Update this weekly.',
  'What patterns do you see in which keywords convert versus which just get clicks? How does understanding buyer search behavior change the way you write product titles and descriptions?',
  2
from public.modules m where m.title = 'Scaling with Ads';

-- Lesson 3
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'Shopee Campaigns and Flash Sales for Explosive Growth',
  'Shopee runs major sale campaigns every month: monthly number sales (1.1, 2.2, 3.3 through 12.12), mid-month sales, payday sales (15th and 30th), and special events (Shopee Birthday, Christmas Sale). During these campaigns, traffic increases 3-10x. To participate: register through Seller Center > Marketing Centre > Campaigns at least 1-2 weeks before the event. You will need to offer a discount (usually 10-30% off) and commit to stock availability. Flash Sales are time-limited deals that appear on the Shopee homepage — they generate massive visibility but require deeper discounts (30-50% off). Use Flash Sales strategically: take a loss on one product to bring buyers to your store, then profit from other full-price items they buy. Top sellers generate 50-70% of their monthly revenue during campaign days.',
  'Check the Shopee campaign calendar for the next 30 days. Register for every available campaign with at least one product. For the next major sale: (1) Plan your discount — at least 15% off your bestseller. (2) Increase inventory by 50% before the sale. (3) Create campaign-specific product images with "SALE" badges. (4) Set up shop vouchers specifically for the campaign period. (5) Schedule social media posts announcing the sale. Track your campaign day sales versus normal day sales to measure the impact.',
  'How does participating in campaigns change your revenue pattern? Is it sustainable to depend on campaign spikes, or do you need strong daily sales too? How do you plan inventory and cash flow around these peaks?',
  3
from public.modules m where m.title = 'Scaling with Ads';

-- Lesson 4
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'Facebook and TikTok Ads to Drive External Traffic to Your Store',
  'Shopee rewards sellers who bring external traffic with higher search rankings through their Traffic Program. Run Facebook and TikTok ads pointing to your Shopee product links. Facebook Ads: start with ₱200/day targeting Filipino women 18-35 (the biggest Shopee demographic) interested in your product category. Use product video ads — they get 3x more engagement than static images. Include price and "Shop now on Shopee" in the ad copy. TikTok Ads: start with ₱300/day, create authentic-looking video ads that do not feel like ads (UGC-style: someone unboxing or using your product while talking to camera). TikTok Shop also allows you to sell directly — connect your product catalog and let TikTok creators promote your products through the affiliate program at 10-15% commission.',
  'Set up your first external traffic campaign: (1) Create a Facebook Business Manager account at business.facebook.com. (2) Create a simple video ad for your best-selling product — 15 seconds, showing the product in use, ending with "Available on Shopee" and the price. (3) Set a ₱200/day budget targeting your city, ages 18-35, interests related to your product. (4) Generate your Shopee product link with UTM tracking. (5) Let the ad run for 5 days and compare: orders from external traffic vs organic Shopee traffic.',
  'How does paid advertising on Facebook and TikTok feel different from Shopee Ads? Which platform do you think your target buyer spends more time on? How would you allocate a ₱10,000/month ad budget across Shopee, Facebook, and TikTok?',
  4
from public.modules m where m.title = 'Scaling with Ads';

-- Lesson 5
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'Scaling to ₱100,000/Month Revenue: The E-Commerce Growth Playbook',
  'Getting to ₱100,000/month in gross revenue on Shopee requires: 7-10 orders per day at an average of ₱400-₱500 per order. Here is the playbook: (1) Expand your product line — add 3-5 complementary products that your existing buyers would want. Cross-sell through bundle deals. (2) Scale your winning ads — increase budget by 20% every week on campaigns with ROAS above 4x. (3) Build repeat customers — include inserts with discount codes for next purchase, create a Viber or Telegram group for loyal customers. (4) Expand to Lazada and TikTok Shop — same products, new audiences. (5) Hire help — a packer for ₱3,000-₱5,000/month part-time, freeing you to focus on product sourcing and marketing. At ₱100,000/month revenue with 35-45% net margins, you are earning ₱35,000-₱45,000 profit — a solid full-time income in the Philippines.',
  'Create your 90-day scaling plan: (1) List 3-5 new products you could add to your store that complement your current bestseller. (2) Calculate your current daily revenue and how many additional orders you need to hit ₱100,000/month. (3) Set a weekly ad budget increase schedule. (4) Plan your Lazada and TikTok Shop expansion timeline. (5) Write a job description for a part-time packer/assistant. Set specific targets: by month 1, month 2, and month 3. Review and adjust this plan every Sunday.',
  'You started this track learning how to find your first product. Now you are planning a ₱100,000/month business. What has changed in how you see yourself and your earning potential? How does this e-commerce journey connect to your broader financial goals in the Money pillar?',
  5
from public.modules m where m.title = 'Scaling with Ads';


-- ============================================================
-- TRACK 3 LESSONS: Freelancing & Client Acquisition
-- ============================================================

-- Module: Choosing Your Skill
-- Lesson 1
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'The 10 Highest-Demand Freelance Skills for Filipinos in 2025',
  'Filipino freelancers are among the most sought after in the world. The top 10 skills by demand and earning potential: (1) Virtual Assistant — ₱15,000-₱35,000/month, lowest barrier to entry. (2) Social Media Management — ₱10,000-₱40,000/month. (3) Graphic Design — ₱15,000-₱50,000/month using Canva/Figma. (4) Content Writing — ₱10,000-₱40,000/month. (5) Video Editing — ₱15,000-₱60,000/month with CapCut/Premiere. (6) Web Development — ₱25,000-₱80,000/month. (7) Bookkeeping — ₱15,000-₱40,000/month with QuickBooks. (8) Customer Support — ₱12,000-₱25,000/month. (9) SEO Specialist — ₱20,000-₱50,000/month. (10) E-commerce Management — ₱15,000-₱45,000/month (Shopee/Amazon). The best skill for you is at the intersection of what you enjoy, what you are good at, and what the market pays well for.',
  'Rate each of the 10 skills on 3 dimensions (1-10 scale): (1) Enjoyment — would you like doing this daily? (2) Current ability — how close are you to being competent? (3) Market demand — how easy is it to find clients? Multiply the 3 scores. The top 3 skills by total score are your best bets. Research each of your top 3: look at Upwork job postings, OnlineJobs.ph listings, and YouTube "day in the life" videos. By the end of today, pick one skill to focus on.',
  'Which skill surprised you by scoring higher than expected? What does your top skill say about your natural strengths? How does this skill connect to your experiences and interests from your Once profile?',
  1
from public.modules m where m.title = 'Choosing Your Skill';

-- Lesson 2
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'The 30-Day Skill Building Roadmap',
  'You do not need months of training to start freelancing. Most in-demand freelance skills can be learned to a professional level in 30 days with focused effort — 2 hours per day. Week 1: Learn the fundamentals through free YouTube tutorials and courses (search "[skill] complete tutorial 2025"). Week 2: Practice by doing 3 small projects for free (for friends, family, or self-initiated). Week 3: Study what top freelancers in your skill do — analyze their portfolios, read their reviews, understand what clients praise. Week 4: Create your portfolio pieces and start applying for your first paid work. The key is not perfection — it is being competent enough to deliver value. A client paying ₱10,000/month does not need world-class work. They need reliable, decent-quality work delivered on time.',
  'Create your personal 30-day skill development plan. For your chosen skill, find: (1) 3 free YouTube tutorials or courses to complete in Week 1 (search on YouTube and write down the exact video titles). (2) 3 practice projects to complete in Week 2 (be specific — what will you create?). (3) 5 top freelancers on Upwork to study in Week 3 (find their profiles and bookmark them). (4) Your Week 4 portfolio plan — what 3 pieces will you create? Block 2 hours daily on your calendar for the next 30 days. Start Day 1 today.',
  'Does 30 days feel too short or too long? What is your biggest concern about learning a new skill? How have you successfully learned new skills in the past, and what methods worked best for you?',
  2
from public.modules m where m.title = 'Choosing Your Skill';

-- Lesson 3
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'Niche Down: The Specialist Advantage',
  'A "Virtual Assistant" competes with 500,000 other Filipino VAs. A "Virtual Assistant specializing in Shopee store management for Australian e-commerce brands" competes with maybe 200. The more specific your niche, the fewer competitors and the higher your rate. How to niche down: combine your skill with an industry (real estate + social media = real estate social media manager), a platform (Shopee + VA = Shopee Virtual Assistant), or a problem (content writing + health = health and wellness content writer). Research if your niche has demand: search it on Upwork and count job postings. If there are at least 20 active postings, the niche is viable. Specialist freelancers charge 50-100% more than generalists and get hired faster because clients trust someone who understands their specific world.',
  'Create 5 niche combinations using your chosen skill. Format: [Skill] + [Industry/Platform/Problem]. Example: "Video Editor for Filipino YouTube creators," "Bookkeeper for Australian small businesses using Xero," "Social Media Manager for Manila restaurants." Research each on Upwork — how many active job postings match? Pick the niche with the best combination of demand and low competition. Write a 2-sentence niche positioning statement: "I help [specific client] with [specific skill] so they can [specific outcome]."',
  'How does choosing a niche make you feel? Some people worry about limiting themselves. But does a heart surgeon earn more or less than a general doctor? How does being known for one thing create more opportunity, not less?',
  3
from public.modules m where m.title = 'Choosing Your Skill';

-- Lesson 4
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'Free Tools Every Filipino Freelancer Needs',
  'You can start freelancing with zero investment using free tools. Communication: Zoom (free 40-minute meetings), Google Meet (unlimited for 1-on-1), Slack (client communication). Project Management: Trello or Notion (organize tasks and deadlines). Design: Canva (free tier is powerful enough), Figma (free for individuals). Writing: Google Docs, Grammarly (free tier for grammar checking). Video: CapCut (free editing), OBS Studio (free screen recording). Finance: GCash and Maya for receiving payments, Google Sheets for invoicing and expense tracking. Time Tracking: Toggl (free, shows clients exactly how long tasks take). Cloud Storage: Google Drive (15GB free). Internet: you need at least 25 Mbps — Globe and PLDT fiber plans start at ₱1,299/month. Total startup cost for a freelance business: ₱0 if you already have a laptop and internet.',
  'Set up your freelance toolkit today. Download and create accounts for: (1) Zoom or Google Meet, (2) Trello or Notion — set up a board with columns: To Do, In Progress, Done, (3) Canva (if not already set up), (4) Grammarly, (5) Toggl time tracker, (6) Google Drive with a folder structure: Clients > [Client Name] > Projects/Invoices/Communication. Test your internet speed at speedtest.net — is it above 25 Mbps? If not, research upgrade options with your ISP.',
  'Looking at your current tools and setup, what is the one thing that might slow you down when you start taking on clients? How can you solve that before your first project starts?',
  4
from public.modules m where m.title = 'Choosing Your Skill';

-- Lesson 5
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'Setting Your Minimum Viable Rate',
  'Your first freelance rate should not be your dream rate — it should be your proof-of-concept rate. Calculate your minimum: what is the lowest hourly rate where you would still feel motivated to do great work? For most Filipino freelancers starting out: ₱250-₱500/hour is a strong start for local clients, $5-$10/hour (₱290-₱580/hour) for international clients on Upwork. Compare this to call center pay: BPO agents earn about ₱15,000-₱25,000/month for 160 hours — that is ₱94-₱156/hour. Even at your starter rate, you are earning 2-3x more per hour than a call center job, with freedom and flexibility. As you build reviews and reputation over 3-6 months, raise your rate by 20-30% every quarter. Your 12-month goal should be double your starting rate.',
  'Calculate your personal rates: (1) What is your monthly income need (rent, food, bills, savings)? (2) How many hours per week can you freelance? (3) Divide monthly need by monthly available hours — this is your absolute minimum rate. (4) Now add 30% — this is your starting rate. (5) Set your 6-month and 12-month rate targets. Create a simple rate card: "[Skill] — ₱X per hour / ₱Y per project / ₱Z per month retainer." Having all 3 options gives clients flexibility.',
  'How does it feel to put a peso amount on your time and skills? Is the number higher or lower than you expected? What would need to change for you to confidently charge double your current rate in 12 months?',
  5
from public.modules m where m.title = 'Choosing Your Skill';

-- Module: Building a Portfolio in 7 Days
-- Lesson 1
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'Why You Do Not Need Experience to Build a Portfolio',
  'The biggest myth stopping aspiring freelancers: "I need experience to get clients, but I need clients to get experience." Wrong. You can build a professional portfolio in 7 days with zero clients using these sources: (1) Self-initiated projects — create sample work for imaginary or real brands (redesign a logo for a local cafe, write a blog post about a topic you know, edit a video from free stock footage). (2) Pro bono work — do one small project for a friend business for free in exchange for a testimonial. (3) Personal projects — your own social media, blog, or YouTube channel counts as portfolio work. (4) Course projects — if you completed any online course, the final project belongs in your portfolio. Clients care about quality, not whether the work was paid. A stunning Canva design for a made-up brand is just as impressive as one for a real client.',
  'Plan your 7-day portfolio sprint. You need 3-5 portfolio pieces. Day 1-2: Create 2 self-initiated projects (design, write, edit, or build something for a real or imaginary brand). Day 3-4: Reach out to a friend or family member with a small business and offer to do a small free project. Day 5-6: Create 1 more project and refine all pieces. Day 7: Assemble everything into your portfolio. Write down exactly what you will create for each piece — be specific.',
  'What holds you back from creating work without a client asking for it? How does giving yourself permission to create "practice" work change your mindset about what qualifies as experience?',
  1
from public.modules m where m.title = 'Building a Portfolio in 7 Days';

-- Lesson 2
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'Creating Portfolio Pieces That Win Clients',
  'Not all portfolio pieces are equal. Winning pieces show: the problem (what the client needed), your process (how you approached it), and the result (the finished work plus any measurable impact). Structure each portfolio piece like a mini case study: "Challenge: This cafe needed a social media presence to attract younger customers. Solution: I created a content calendar and 12 Instagram posts using Canva with a warm, modern aesthetic. Result: The posts were designed to increase engagement through interactive stories and trending hashtags." Even if the project was self-initiated, frame it as a real business problem you solved. Add context about the tools you used and your creative decisions. This storytelling approach makes clients think "This person understands business problems, not just design or writing."',
  'Create your first 2 portfolio pieces today following the Problem-Process-Result format. For each piece: (1) Write a 3-sentence project brief (the problem). (2) Describe your approach in 2-3 sentences (the process). (3) Create the actual work — spend 2-3 hours making it as polished as possible. (4) Write the results statement (even if estimated). Take screenshots or export the final deliverables. You should have 2 complete case studies by the end of today.',
  'How does framing your work as a case study change how you see the value of what you create? Which of your portfolio pieces are you most proud of so far, and why?',
  2
from public.modules m where m.title = 'Building a Portfolio in 7 Days';

-- Lesson 3
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'Building Your Portfolio Website for Free',
  'A portfolio website separates you from 90% of freelancers who only have a Upwork profile. Free options that look professional: (1) Canva Website — drag and drop, beautiful templates, free custom domain connecting. (2) Google Sites — simple, clean, loads fast. (3) Notion — create a public page with your portfolio (increasingly popular in the freelance world). (4) Behance — if you are a designer, this is the industry standard. Structure: Homepage with your name, niche positioning statement, and a professional photo. Portfolio page with 3-5 case studies. About page with your story and skills. Contact page with email and scheduling link (use Calendly free tier). Include a testimonial section — even if you only have one from your free project. A simple, clean site beats a complex one.',
  'Build your portfolio website today using Canva Website or Google Sites. Follow this structure: (1) Header with your name and one-line positioning statement. (2) Portfolio section with your 3-5 case studies (Problem-Process-Result format with images). (3) About section — a friendly paragraph about who you are and what you specialize in. (4) Skills and tools list. (5) Testimonials (from your free project or a character reference). (6) Contact section with your email. Share the link with 3 friends and ask for honest feedback on first impressions.',
  'How does having a professional website change how you see yourself as a freelancer? When you look at your portfolio site, do you see someone a client would trust and hire? What would make you even more confident?',
  3
from public.modules m where m.title = 'Building a Portfolio in 7 Days';

-- Lesson 4
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'Getting Your First Testimonial Through Strategic Free Work',
  'One real testimonial is worth more than 10 portfolio pieces. The strategy: offer one free or heavily discounted project to someone who will give you a detailed, written testimonial. Choose someone whose business title sounds impressive — "Owner, Fresh Bake Cafe Makati" carries more weight than "my friend Maria." The project should take you 3-5 hours maximum. After delivery, send them a specific request: "Could you write 2-3 sentences about working with me? Specifically, what was the problem you needed solved, how was the experience, and would you recommend me?" A specific prompt gets a useful testimonial instead of a vague "Great work!" Add this testimonial to your Upwork profile, portfolio website, and LinkedIn.',
  'Reach out to 3 people today and offer a free mini-project in exchange for a testimonial. Choose people with business titles or professional roles. Send a message like: "I am building my freelance portfolio in [skill] and would love to do a small project for you at no cost. In return, I would appreciate a short written testimonial I can use. Would you be interested?" For anyone who says yes, deliver within 48 hours and follow up with your specific testimonial request template.',
  'Was it easier or harder to ask for a testimonial than you expected? How does having social proof from a real person change the way a potential client might view your profile?',
  4
from public.modules m where m.title = 'Building a Portfolio in 7 Days';

-- Lesson 5
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'Polishing and Presenting: Your Portfolio Launch Day',
  'Your portfolio is your sales tool — every detail matters. Final polish checklist: (1) Proofread everything — no typos, no grammar errors. Run all text through Grammarly. (2) Ensure all images are high quality — no blurry screenshots or pixelated logos. (3) Test your website on mobile — over 80% of Filipino internet users browse on phones. (4) Make sure your contact method is prominent and works — send yourself a test message. (5) Add your portfolio link to: your Facebook profile, LinkedIn headline, Upwork profile overview, email signature, and phone contact card. Your portfolio is a living document — update it with every new project. Replace weaker pieces with stronger ones over time. The goal is that by month 6 of freelancing, every piece in your portfolio is from real paid work.',
  'Do your final portfolio launch today. Complete every item on the polish checklist. Then share your portfolio with: (1) Post it on your Facebook wall with a brief announcement that you are offering [skill] freelance services. (2) Share it in 2-3 relevant Facebook Groups (freelancer groups, your skill community). (3) Send it directly to 5 people in your network who might know someone who needs your skill. (4) Update your LinkedIn profile with your portfolio link and new headline. Track who views and responds over the next 7 days.',
  'Your portfolio is live. How does it feel to have put yourself out there publicly? What was the hardest part of the 7-day portfolio sprint? How has your confidence in your freelance ability changed since you started this module?',
  5
from public.modules m where m.title = 'Building a Portfolio in 7 Days';

-- Module: Finding Clients on Upwork and OnlineJobs
-- Lesson 1
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'Setting Up an Upwork Profile That Gets Noticed',
  'Upwork is the world biggest freelance marketplace and Filipinos are the second-largest nationality on the platform. Your profile is your resume, portfolio, and sales pitch combined. Critical elements: (1) Professional photo — face clearly visible, good lighting, friendly smile, plain background. (2) Title — not "Freelancer" but your niche: "Shopee E-Commerce Virtual Assistant | Product Listing & Store Management." (3) Overview — 3 paragraphs: paragraph 1 is your hook (what you do and who you help), paragraph 2 is your credentials and experience, paragraph 3 is a call to action ("Let us discuss your project"). (4) Skills tags — add all relevant skills, Upwork uses these for search matching. (5) Portfolio — upload your 3-5 best pieces. (6) Rate — start at $5-$8/hour to land your first 3 jobs, then raise. The first 3 reviews on Upwork are everything — they determine your trajectory.',
  'Create or completely optimize your Upwork profile today. Follow each step: (1) Take a professional headshot — use portrait mode on your phone with natural light. (2) Write your niche-specific title (under 70 characters). (3) Write your 3-paragraph overview — have someone proofread it. (4) Add at least 10 relevant skills. (5) Upload 3-5 portfolio pieces. (6) Set your hourly rate. (7) Complete the "Employment History" and "Education" sections. Complete the Upwork Readiness Test if prompted. Your profile should be 100% complete before you send a single proposal.',
  'Read through 5 profiles of successful Filipino freelancers in your niche on Upwork. What do they do well that you can learn from? How does your profile compare? What is the one thing you would improve?',
  1
from public.modules m where m.title = 'Finding Clients on Upwork and OnlineJobs';

-- Lesson 2
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'Writing Proposals That Win Jobs on Upwork',
  'On Upwork, the average job post receives 20-50 proposals. Most proposals are generic templates that clients skip instantly. Winning proposals follow a formula: (1) Open with a specific reference to their job post — prove you read it. "I noticed you need someone to manage your Shopee store and you mentioned struggling with product listings — I have done this for 3 other stores." (2) State your relevant experience — 2-3 sentences, specific to their needs. (3) Propose a plan — "Here is how I would approach this: Week 1 I would audit your current listings, Week 2 I would optimize the top 10 products." (4) Include a question — this starts a conversation. "Could you share which product categories are underperforming?" (5) Close with confidence — "I am available to start this week. Let us set up a quick call to discuss." Keep proposals under 200 words. Send 3-5 targeted proposals daily, not 20 generic ones.',
  'Find 5 active job postings on Upwork that match your skill and niche. For each one, write a personalized proposal following the formula above. Before submitting, read each proposal aloud — does it sound like a real person who understands the job, or a template? Submit all 5 proposals today. Track them in a spreadsheet: Job Title, Date Submitted, Client Name, Response (yes/no/pending). Commit to submitting 3-5 proposals every weekday for the next 2 weeks.',
  'How did writing personalized proposals feel compared to using a template? Were you tempted to copy-paste the same message? What specific detail in each job post did you use to customize your proposal?',
  2
from public.modules m where m.title = 'Finding Clients on Upwork and OnlineJobs';

-- Lesson 3
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'OnlineJobs.ph: The Filipino Freelancer Secret Weapon',
  'OnlineJobs.ph is the largest job board specifically for Filipino remote workers, with over 10,000 active job postings. Unlike Upwork, there are no platform fees — you keep 100% of your earnings. Employers range from small business owners in the US and Australia to growing startups. Most jobs are full-time or part-time remote positions paying ₱15,000-₱45,000/month. Creating a worker profile is free. Key differences from Upwork: employers search for you (so your profile keywords matter), communication often moves to email or Skype quickly, and payment is usually via direct bank transfer, Payoneer, or Wise (formerly TransferWise). Include your hourly and monthly rate, your available hours (specify Philippine time and overlap with US/AU time zones), and your internet speed. Many employers specifically search for Filipino VAs because of the English proficiency, work ethic, and cultural compatibility.',
  'Create or optimize your OnlineJobs.ph profile: (1) Sign up at onlinejobs.ph as a worker (free). (2) Complete every profile section — the more complete, the higher you rank in employer searches. (3) Add your portfolio link. (4) Write a compelling "About Me" section using your niche positioning. (5) Add all relevant skills and software proficiencies. (6) Specify your available hours including time zone overlap. (7) Start browsing active job listings — apply to 5 that match your skill. The application is usually an email, so use the same proposal formula from Lesson 2.',
  'How does the OnlineJobs.ph model (employers find you) differ from the Upwork model (you apply to jobs)? Which feels more comfortable to you? How can you use both platforms simultaneously to maximize your chances?',
  3
from public.modules m where m.title = 'Finding Clients on Upwork and OnlineJobs';

-- Lesson 4
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'Direct Client Outreach: Finding Clients Without Platforms',
  'Platform freelancing is great for starting, but the highest-paying clients often do not post on Upwork or OnlineJobs.ph. Direct outreach means finding businesses that need your skill and contacting them yourself. Methods: (1) LinkedIn — search for business owners in your niche industry, connect with a personalized note, and offer your services. (2) Facebook Groups — join groups where your ideal clients hang out (not freelancer groups, but business owner groups). Provide free value first, then mention your services when relevant. (3) Cold email — find businesses with weak online presence, email them a specific observation and an offer to help. (4) Referrals — ask every client, friend, and family member: "Do you know any business that needs help with [your skill]?" One warm referral converts 10x better than a cold proposal.',
  'Take 3 direct outreach actions today: (1) Optimize your LinkedIn profile with your freelance niche positioning and portfolio link. Connect with 10 business owners or marketing managers in your target industry. (2) Join 3 Facebook Groups where your ideal clients are (not freelancer groups). Introduce yourself with a helpful post. (3) Write a cold outreach email template that includes: a specific observation about their business, what you could do for them, and a soft call to action. Send it to 5 businesses whose online presence you could improve.',
  'Which outreach method felt most natural and which felt most uncomfortable? The uncomfortable one is probably the one with the most untapped potential. How can you push yourself to do more of it?',
  4
from public.modules m where m.title = 'Finding Clients on Upwork and OnlineJobs';

-- Lesson 5
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'Landing Your First Paid Client: The Final Push',
  'By now you have proposals out on Upwork, a profile on OnlineJobs.ph, and direct outreach in progress. Your first client is a numbers game: on average, you need 30-50 proposals or outreach messages to land your first job. Common reasons for not getting responses: profile not complete enough, proposals too generic, rate too high for zero reviews, or wrong job fit. Troubleshoot: (1) Ask for feedback — message a freelancer community and share your profile for critique. (2) Lower your rate temporarily — your first 3 jobs are about reviews, not income. Even $3-$4/hour for a small project is worth it for the 5-star review. (3) Apply to "less glamorous" jobs that others skip — data entry, email management, simple formatting tasks. These are easy wins that build your reputation. (4) Respond to interviews within 1 hour — speed matters on platforms.',
  'Launch a 7-day first client blitz: (1) Send 5 Upwork proposals per day for 7 days (35 total). (2) Apply to 3 OnlineJobs.ph listings per day. (3) Send 2 direct outreach messages per day. (4) Follow up on every unanswered proposal after 48 hours with a brief, polite message. (5) Join the Filipino Freelancers Facebook Group and post your portfolio asking for profile feedback. Track everything in your spreadsheet. By the end of 7 days, you should have at least 2-3 conversations going with potential clients.',
  'What emotions are you experiencing during this outreach sprint? Excitement? Anxiety? Frustration? All of these are normal. How do you handle rejection, and how can you reframe a "no" or silence as just one step closer to a "yes"?',
  5
from public.modules m where m.title = 'Finding Clients on Upwork and OnlineJobs';

-- Module: Pricing and Negotiation
-- Lesson 1
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'Understanding Your Market Value as a Filipino Freelancer',
  'Filipino freelancers often undercharge because they compare to local salaries instead of global rates. Reality check: a VA in the Philippines charging $6/hour is a bargain for a US business owner who would pay a local $25-$35/hour for the same work. You are not competing on price — you are offering excellent value. Research the market: check Upwork average rates for your skill and experience level. Check salary ranges on OnlineJobs.ph. Ask in freelancer communities what others charge. The global range for Filipino freelancers by experience: Entry level (0-1 year): $4-$8/hour. Intermediate (1-3 years): $8-$15/hour. Expert (3+ years): $15-$35/hour. Your rate should be based on the value you deliver, not the cost of living in the Philippines.',
  'Research your market rate thoroughly: (1) On Upwork, search for 10 freelancers with your skill at a similar experience level — note their hourly rates. (2) Check 10 job postings on OnlineJobs.ph for your skill — note the salary ranges offered. (3) Ask in 2 Filipino freelancer Facebook Groups: "What is the going rate for [your specific skill] with [your experience level]?" (4) Calculate your average from all this data. Compare it to your current or planned rate. Are you charging too low?',
  'Were you surprised by the rates other Filipino freelancers charge? How does knowing the market rate change your confidence about your own pricing? What would it take for you to charge at the higher end of the range?',
  1
from public.modules m where m.title = 'Pricing and Negotiation';

-- Lesson 2
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'Hourly vs Project-Based vs Retainer Pricing',
  'Three pricing models, each with strategic advantages. Hourly: you get paid for every hour worked. Best when scope is unclear or tasks are ongoing. Downside: your income is capped by your hours. Use for VA work, ongoing support, and new client relationships where trust is building. Project-based: a fixed price for a defined deliverable. "I will create 10 product listings for ₱5,000." Best when you can estimate the work accurately. Advantage: as you get faster, your effective hourly rate increases. Use for design, writing, and one-time projects. Retainer: a fixed monthly fee for ongoing services. "₱15,000/month for 20 hours of social media management." Best for long-term relationships and predictable income. This is the holy grail — recurring revenue you can count on every month. Always try to convert project clients into retainer clients.',
  'For your skill, create pricing packages using all 3 models: (1) Hourly rate for ad-hoc tasks (₱X/hour). (2) A project package for a common deliverable (example: "Website copywriting — 5 pages for ₱8,000"). (3) A monthly retainer package (example: "Social media management — 12 posts/month, daily engagement, monthly report for ₱10,000/month"). Write each as a one-paragraph offer you could send to a client. Having all 3 ready means you can match the right pricing model to each client situation.',
  'Which pricing model would give you the most financial stability? Which would maximize your earnings if you became very efficient? How does each model affect your daily work routine and lifestyle?',
  2
from public.modules m where m.title = 'Pricing and Negotiation';

-- Lesson 3
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'Negotiation Scripts for Common Client Conversations',
  'Negotiation does not have to be uncomfortable. Most clients expect some back and forth. Common scenarios and scripts: (1) Client says your rate is too high — "I understand budget is a consideration. Based on the value I deliver and the time this project requires, my rate reflects the quality you will receive. I could adjust the scope to fit your budget — which deliverables are highest priority for you?" (2) Client asks for a discount — "I appreciate you asking. For this project, I can offer a 10% discount if we agree to a 3-month retainer commitment. This gives you cost savings and gives me income stability." (3) Client wants to pay below market rate — "Thank you for the offer. My standard rate for this work is ₱X, which is competitive in the market. I would not be able to deliver the quality you deserve at a lower rate." Never negotiate against yourself. State your rate and wait. Silence is your friend.',
  'Practice these negotiations out loud: (1) Ask a friend to play the client role and push back on your rate using the 3 scenarios above. (2) Practice your response each time — the goal is to sound confident, not defensive. (3) Record yourself if possible and listen back — do you sound like a professional who knows their value? (4) Write out your personal "walk-away number" — the lowest rate where you would still deliver quality work. Knowing this number gives you confidence in any negotiation.',
  'How did role-playing negotiations feel? Which scenario was hardest? The discomfort of negotiation is temporary — the money you lose by not negotiating affects you every month. What is one phrase you can memorize to use when a client pushes back on price?',
  3
from public.modules m where m.title = 'Pricing and Negotiation';

-- Lesson 4
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'Scope Creep Protection: Never Do Free Work Again',
  'Scope creep is when a client gradually asks for more work without increasing your pay. "Can you also do this small thing?" turns into hours of unpaid work every week. Prevention strategies: (1) Clear project scope — document exactly what is included and what is not before starting. (2) Change request process — "Absolutely, I can add that. It falls outside our original scope, so I will send you a quick quote for the additional work." (3) Monthly reviews — if you are on retainer, review hours and tasks monthly. If you are consistently working beyond the agreed scope, it is time for a rate adjustment. (4) The sandwich response — "Great idea! (positive) That was not in our original agreement, so it would be an additional ₱X. (boundary) Would you like me to include it in next month scope or as a one-off project? (options)" Be warm but firm. Clients who respect your boundaries become long-term partners. Clients who constantly push boundaries are not worth keeping.',
  'Create your scope protection toolkit: (1) Write a project scope template you can use for every new client — services included, number of revisions, response time, and explicitly note what is NOT included. (2) Write 3 response templates for scope creep requests (using the sandwich method). (3) Review your current client arrangements — is any client getting more than they are paying for? (4) If yes, draft a conversation to realign the scope. Practice delivering it with confidence.',
  'Have you experienced scope creep before — in freelancing or even in your day job? How did it make you feel? What is the connection between setting professional boundaries and your self-worth?',
  4
from public.modules m where m.title = 'Pricing and Negotiation';

-- Lesson 5
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'Quarterly Rate Reviews: Always Be Growing Your Income',
  'If you are not raising your rates, you are effectively taking a pay cut every year due to inflation. Schedule a rate review every 3 months. Questions to ask yourself: (1) Have I gained new skills or certifications? (2) Have I delivered measurable results for clients? (3) Are new freelancers in my niche charging more than me? (4) Am I fully booked — do I need to raise rates to manage demand? If you answer yes to 2 or more, it is time to raise rates. How much: 10-20% per increase is standard. How to communicate: give 30 days notice, cite your results, and add a new service to sweeten the increase. For new clients, simply quote your new rate — no explanation needed. Your income trajectory should look like this: Month 1-3: ₱15,000-₱20,000. Month 4-6: ₱20,000-₱30,000. Month 7-12: ₱30,000-₱50,000. Year 2: ₱50,000-₱80,000.',
  'Conduct your first rate review right now, even if you just started: (1) Document all skills you have developed. (2) List all results you have delivered (or practice work you have completed). (3) Research current market rates again — has anything changed? (4) Set your rate for next quarter — write it down and commit to it. (5) Create a calendar reminder for your next quarterly review — 3 months from today. (6) Write the rate increase email you will send to existing clients at that time.',
  'Imagine yourself 12 months from now, earning ₱50,000-₱80,000/month from freelancing. What would your life look like? What decisions would be easier? How does this vision connect to the financial goals you set when you started the Money pillar?',
  5
from public.modules m where m.title = 'Pricing and Negotiation';

-- Module: From Side Hustle to Full Income
-- Lesson 1
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'The Full-Time Freelancer Transition Checklist',
  'Transitioning from employed to full-time freelance is exciting and terrifying. Do not quit your job until you check these boxes: (1) Your freelance income has been at least 80% of your salary for 3 consecutive months — not one lucky month, three consistent months. (2) You have 3 months of expenses saved as an emergency fund (rent, food, bills, contributions). In the Philippines, this is typically ₱30,000-₱60,000. (3) You have at least 2 retainer clients — not project-based, but monthly recurring income you can count on. (4) You have a system for finding new clients consistently — not relying on one platform or one client. (5) You have health insurance — PhilHealth is mandatory, but consider a private HMO plan (₱8,000-₱15,000/year for basic coverage). Missing even one of these means you are not ready yet. Build steadily while employed — the pressure of needing to pay rent with no safety net kills creativity and leads to bad client decisions.',
  'Complete the transition checklist honestly: (1) What is your current monthly freelance income over the last 3 months? (2) How much do you have in emergency savings? How much do you need? (3) How many retainer clients do you have? (4) What is your client acquisition system — where do clients come from consistently? (5) Do you have health insurance? For each gap, write a specific plan and timeline to close it. Set a realistic target date for your transition — or decide that staying employed while freelancing is the right choice for now.',
  'Where are you on the transition checklist? What is the biggest gap? Is the goal to go full-time freelance, or is a hybrid model (part-time job + freelancing) more aligned with your risk tolerance and lifestyle goals?',
  1
from public.modules m where m.title = 'From Side Hustle to Full Income';

-- Lesson 2
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'Financial Systems for Self-Employed Filipinos',
  'When you are self-employed, you are your own HR, finance, and benefits department. Set up these financial systems: (1) Separate business and personal money — open a dedicated GCash account or bank savings account for business income. All client payments go here. Pay yourself a fixed "salary" monthly and leave the rest as business reserve. (2) Tax registration — register with BIR as a self-employed professional. You can choose 8% flat tax rate on gross income over ₱250,000 annually — much simpler than itemized deductions. A tax consultant costs ₱5,000-₱10,000 per year and saves you from penalties. (3) Government contributions — continue paying SSS (₱1,000-₱3,000/month for good coverage), PhilHealth (₱400/month minimum), and Pag-IBIG (₱200/month minimum). These are not optional. (4) Invoicing — use Google Sheets to create professional invoices. Include your DTI business name, TIN, and payment details.',
  'Set up your financial systems today: (1) Open a separate bank account or GCash number for business income. (2) Research BIR self-employed registration — visit the nearest BIR office or check bir.gov.ph for requirements. (3) Calculate your SSS, PhilHealth, and Pag-IBIG contributions as a voluntary/self-employed member. (4) Create an invoice template in Google Sheets with: your business name, TIN, client details, services, amount, payment instructions. (5) Create a monthly income and expense tracker. Even if you are not going full-time yet, having these systems ready saves stress later.',
  'How organized are your finances currently? Does the thought of managing taxes and contributions feel overwhelming or empowering? What is one financial habit you need to build before going full-time?',
  2
from public.modules m where m.title = 'From Side Hustle to Full Income';

-- Lesson 3
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'Building a Client Pipeline That Never Runs Dry',
  'The feast-or-famine cycle is the biggest challenge for freelancers: busy month, dry month, panic, take bad clients, repeat. The solution is a consistent client pipeline — always marketing yourself even when you are fully booked. The 30-minute daily pipeline habit: spend 10 minutes improving your Upwork/OnlineJobs profile or portfolio, 10 minutes engaging in client-facing communities (LinkedIn, Facebook Groups), and 10 minutes sending outreach or following up on past conversations. Keep a CRM (customer relationship management) spreadsheet: Prospect Name, Last Contact, Status (cold/warm/hot/client), Next Action. Nurture warm leads weekly — a simple "Just checking in, hope your project is going well" keeps you top of mind. When a client leaves, your replacement is already in the pipeline. This is how you go from freelancer to business owner.',
  'Build your client pipeline system: (1) Create a Google Sheet CRM with columns: Name, Company, Contact Method, Last Contact Date, Status, Notes, Next Action. (2) Add everyone you have ever contacted about freelance work — past proposals, outreach, conversations. (3) Categorize each as Cold, Warm, or Hot. (4) For every Warm lead, schedule a follow-up this week. (5) Set a daily alarm for your 30-minute pipeline habit. Block it in your calendar. Start today and commit to doing it every weekday for the next month.',
  'How does having a pipeline system change your emotional relationship with client acquisition? Does it feel less desperate and more strategic? How would having 5-10 warm leads at all times affect your confidence in negotiations with current clients?',
  3
from public.modules m where m.title = 'From Side Hustle to Full Income';

-- Lesson 4
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'Managing Your Energy and Avoiding Burnout',
  'Freelance burnout is real and common — especially for Filipinos who tend to say yes to everything and work extra hard to please clients. Warning signs: dreading work you used to enjoy, making careless mistakes, feeling exhausted despite sleeping enough, irritability with clients. Prevention: (1) Set working hours and stick to them — just because you can work at midnight does not mean you should. A typical healthy schedule: 8am-12nn deep work, 1-3pm client calls and admin, 3-5pm light tasks and pipeline work. Stop at 5pm. (2) Take weekends off — at least one full day with no work. (3) Set client expectations — your response time is within 4 business hours, not 4 minutes. (4) Take a vacation — even 3 days every quarter helps. (5) Say no to clients who drain your energy — money is not worth your mental health. Replace them with better clients from your pipeline.',
  'Do an honest energy audit: (1) Rate your current energy level 1-10. (2) List the tasks and clients that energize you vs drain you. (3) Check your actual working hours this past week — are you overworking? (4) Set your official business hours and communicate them to all clients. (5) Block one full day this weekend as a no-work day. (6) Schedule a 3-day break sometime in the next 3 months. (7) If any client is consistently draining, write a plan to either set boundaries or transition them out.',
  'How sustainable is your current work routine? What would your ideal work day look like? The point of freelancing is freedom — if you are just recreating the stress of a 9-to-5 without the stability, something needs to change. What adjustment would make the biggest difference?',
  4
from public.modules m where m.title = 'From Side Hustle to Full Income';

-- Lesson 5
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'Your 12-Month Freelance Business Plan',
  'Successful freelancers think in years, not weeks. Your 12-month plan should cover: Months 1-3 (Foundation): land 2-3 clients, build portfolio, establish daily routines. Income target: ₱15,000-₱25,000/month. Months 4-6 (Growth): raise rates, add 2-3 more clients, start turning project clients into retainers. Income target: ₱25,000-₱40,000/month. Months 7-9 (Optimization): specialize deeper in your niche, create systems and templates that make you faster, consider hiring a sub-contractor for overflow work. Income target: ₱40,000-₱60,000/month. Months 10-12 (Scale): build a personal brand, launch a service package, explore passive income from your expertise (digital products, courses, coaching). Income target: ₱60,000-₱80,000/month. This is not a dream — this is a plan. Hundreds of Filipino freelancers have followed this trajectory. The difference between those who made it and those who did not? The ones who made it did not stop after Month 2 when things got hard.',
  'Write your personal 12-month freelance business plan. For each quarter, specify: (1) Income target (be specific — not a range, a number). (2) Number of clients and rate per client. (3) Key skills to develop or certify. (4) Marketing and pipeline activities. (5) Systems to build. (6) One stretch goal that scares you a little. Print this plan and put it where you see it every day — above your desk, as your phone wallpaper, or on your bathroom mirror. Review and update it on the 1st of every month.',
  'Looking at your 12-month plan, which quarter excites you most? Which scares you most? How does having a written plan change your psychology compared to just hoping things work out? Where does this freelance income fit in your overall Money pillar goals from your Once profile?',
  5
from public.modules m where m.title = 'From Side Hustle to Full Income';


-- ============================================================
-- TRACK 4 LESSONS: Building Online Side Income
-- ============================================================

-- Module: Digital Products You Can Create This Week
-- Lesson 1
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'The Power of Sell Once, Earn Forever',
  'Digital products are the ultimate leverage play: you create something once and sell it unlimited times with zero additional production cost. No inventory, no shipping, no returns. The best digital products for the Philippine market: Canva templates (social media, resume, business cards), Google Sheets templates (budget trackers, content calendars, inventory systems), printable planners and journals, e-books and guides on specific topics, preset filters for photos, and educational checklists. Products that sell best solve a specific, urgent problem. "Social Media Content Calendar Template for Filipino Small Business Owners" will outsell "Generic Planner Template" 10 to 1. Price range for the PH market: ₱99-₱499 for individual products, ₱499-₱1,499 for bundles. Even at ₱149 per sale, 100 sales is ₱14,900 of nearly pure profit.',
  'Brainstorm 10 digital product ideas based on your skills and knowledge. For each, write: (1) The product name, (2) Who it is for (be specific — "Shopee sellers who struggle with inventory tracking"), (3) The price you would charge, (4) How long it would take you to create it. Pick the one that you could create fastest and that solves the most specific problem. This is your first digital product — you will build it this week.',
  'What knowledge do you have that others would pay for? Think about problems you have solved for yourself or others. What templates, systems, or frameworks do you use daily that could be productized?',
  1
from public.modules m where m.title = 'Digital Products You Can Create This Week';

-- Lesson 2
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'Creating Your First Digital Product in Canva',
  'Canva is your digital product factory. You can create templates, e-books, planners, social media kits, presentation decks, and more — all within Canva and all sellable. For templates that you sell: design the template, then share it as a Canva Template Link. Buyers click the link, get a copy in their own Canva account, and customize it. No file downloads needed. For printable products (planners, checklists, wall art): design in Canva, export as PDF, and sell the PDF file. For e-books: use Canva A4 portrait template, design each page with consistent branding, export as PDF. Pro tip: create a "bundle" by grouping 3-5 related products — bundles have a higher perceived value and sell at 2-3x the price of individual products. A "Filipino Business Starter Kit" with a business plan template, budget tracker, social media calendar, and invoice template could sell for ₱499.',
  'Create your first digital product today. Spend 3-4 hours in Canva building it. If it is a template: design at least 10 pages or variations. If it is a planner: design a full month with daily, weekly, and monthly layouts. If it is an e-book: write and design at least 15 pages. Make it professional — use consistent fonts, colors, and spacing. Export it and test it yourself: if you received this as a buyer, would you feel it was worth the price? Get feedback from 2-3 people before listing it for sale.',
  'How did it feel to create something you can sell? What was the hardest part — the design, the content, or the confidence that someone would pay for it? How long did it actually take? Could you create a similar product faster now that you have done it once?',
  2
from public.modules m where m.title = 'Digital Products You Can Create This Week';

-- Lesson 3
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'Selling Digital Products on Philippine Platforms',
  'You do not need a website to sell digital products. The best platforms for the PH market: (1) Shopee — yes, you can sell digital products. List it as "digital delivery," send the product link or file via Shopee chat after purchase. (2) Facebook Marketplace and Facebook Groups — post in niche communities, accept payment via GCash, and send the file via Messenger. (3) Instagram and TikTok — showcase the product in Reels and Stories, direct buyers to your GCash payment link. (4) Gumroad — international platform, accepts GCash via PayPal, handles delivery automatically. (5) Your own Google Forms + GCash setup — create an order form, buyers pay via GCash, you send the download link. For beginners, start with Facebook Groups and GCash — zero platform fees and direct access to your target audience. As you scale, move to Gumroad or your own website for automation.',
  'Set up 2 sales channels for your digital product: (1) Create a Gumroad account (gumroad.com) — upload your product, set the price in PHP equivalent, write a compelling product description. (2) Create a sales post for Facebook — write a caption that highlights the problem your product solves, include 3-4 preview images, and mention the price and GCash payment method. Post it in 3-5 relevant Facebook Groups today. Set up a GCash QR code you can quickly share when someone wants to buy.',
  'Which sales channel feels most natural to you — social media direct selling or a platform like Gumroad? What are the advantages of each? How important is automation vs personal connection in selling digital products?',
  3
from public.modules m where m.title = 'Digital Products You Can Create This Week';

-- Lesson 4
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'Marketing Your Digital Product to Your First 50 Customers',
  'The first 50 sales are the hardest — and the most important. They validate your product and generate reviews and testimonials. Strategies: (1) Launch discount — offer 50% off for the first 20 buyers. "First 20 customers get this ₱299 template for only ₱149." Creates urgency and rewards early adopters. (2) Freebie funnel — give away a simpler version of your product for free, then upsell the full version. Give a free 1-page checklist, sell the full 30-page planner. (3) Social proof loop — ask every buyer for a screenshot review, post these reviews on your page, which attracts more buyers. (4) Collaboration — find someone with an audience in your niche and offer them 30% commission for every sale they drive. Filipino micro-influencers on TikTok with 5,000-20,000 followers will promote your product for ₱500-₱1,000 or a commission deal. (5) Create short video content showing the product in use — TikTok and Reels demos convert better than static images.',
  'Execute a launch campaign this week: (1) Create a launch post with a 50% early bird discount and post it in 5 Facebook Groups. (2) Create a free sample version of your product to use as a lead magnet. (3) Film a 30-second Reel or TikTok showing how your product works — screen record yourself using the template or flipping through the planner. (4) Send a personal message to 20 people in your network who might benefit from the product. (5) Ask every buyer for a screenshot testimonial within 24 hours of purchase.',
  'How did the launch go? How many people showed interest? How many actually purchased? What was the gap between interest and purchase — and what could close that gap? Is the product the problem, the price, or the marketing?',
  4
from public.modules m where m.title = 'Digital Products You Can Create This Week';

-- Lesson 5
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'Building a Digital Product Line for Recurring Revenue',
  'One product is a start. A product line is a business. Think about what your first product buyers need next. If they bought a content calendar template, they probably need caption templates, hashtag lists, and analytics trackers too. Create a product ladder: (1) Free product — lead magnet to attract potential buyers. (2) Low-price product (₱99-₱199) — easy first purchase to build trust. (3) Core product (₱299-₱499) — your main offering. (4) Premium bundle (₱799-₱1,499) — everything packaged together at a discount. Plan to release one new product per month. Each new product brings previous buyers back and attracts new ones. After 6 months, you could have 6 products generating ₱5,000-₱20,000 per month in mostly passive income. The time investment per month decreases as your product catalog grows — old products keep selling while you create new ones.',
  'Plan your 6-month digital product line: (1) Map out 6 products that logically connect to each other — each solving a related problem for the same audience. (2) Create your product ladder — free, low, core, premium. (3) Set a release schedule — which product will you create each month? (4) Design a bundle offer combining 3-4 products at a 25-30% discount. (5) Start creating product number 2 — you already have the skills and systems from product number 1.',
  'How does the idea of passive income change your relationship with time and money? If your product line generates ₱15,000/month with only a few hours of maintenance, what would you do with the freed-up time? How does building digital assets connect to long-term financial independence?',
  5
from public.modules m where m.title = 'Digital Products You Can Create This Week';

-- Module: Content Monetization Basics
-- Lesson 1
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'Choosing Your Content Platform Based on Your Strengths',
  'Not every content platform suits every person. Match your natural strengths: If you are comfortable on camera and can talk naturally — YouTube and TikTok. Filipino YouTube creators earn ₱50-₱200 per 1,000 views through AdSense, and the top Filipino YouTubers earn ₱100,000-₱500,000/month. If you write well — blogging with Google AdSense. Philippine-focused blogs earn ₱5-₱30 per 1,000 pageviews. A blog with 50,000 monthly visitors earns ₱10,000-₱50,000/month. If you are good with visuals — Instagram with brand partnerships. Filipino micro-influencers with 10,000+ followers earn ₱2,000-₱10,000 per sponsored post. You do not need to be on every platform. Pick one, master it, then expand. The money follows expertise, not platform-hopping.',
  'Evaluate your content strengths honestly: (1) Record a 60-second video of yourself talking about something you know well. Watch it back — do you look natural and engaging? (2) Write 500 words about a topic you care about. Time yourself — was it easy or painful? (3) Create a visual Instagram-style post in Canva. Does it come naturally? Based on this exercise, rank the platforms: YouTube/TikTok, Blog/Writing, Instagram/Visual. Commit to your number one platform. Research 5 successful Filipino creators on that platform in a niche you could cover.',
  'Which content format felt most natural? Were you surprised by the result? How does your chosen platform connect to the skills and interests from your Once profile?',
  1
from public.modules m where m.title = 'Content Monetization Basics';

-- Lesson 2
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'Finding Your Content Niche in the Philippine Market',
  'Your content niche should be at the intersection of what you know, what people search for, and what advertisers pay for. High-paying niches in the Philippine market (ranked by ad revenue potential): personal finance and investing, technology reviews, health and fitness, food and cooking, real estate, education and career advice, beauty and skincare, and travel. But you do not need a "big" niche — micro-niches can be very profitable. "Budget meal prep for Filipino families" is a micro-niche within food that has less competition but a very engaged audience. The key: your niche should be specific enough that you can become the go-to creator, but broad enough that you do not run out of content ideas after 20 posts. Test: can you write 50 content titles right now? If yes, you have a viable niche.',
  'Validate your content niche: (1) Write 50 content titles/ideas for your niche — video titles, blog post titles, or post concepts. If you struggle after 20, your niche might be too narrow. (2) Search your niche on YouTube/Google/Facebook — who are the existing creators? Are there 3-10 established creators (good — proven demand) or 100+ (might be too saturated) or 0 (might be no demand)? (3) Check Google Trends Philippines for your niche keywords — is interest growing, stable, or declining? (4) Ask 10 friends: "Would you follow a page/channel about [your niche]?" Their honest reaction tells you a lot.',
  'Were you able to come up with 50 content ideas? Which ones excited you most? What does that excitement tell you about where your passion and knowledge intersect?',
  2
from public.modules m where m.title = 'Content Monetization Basics';

-- Lesson 3
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'Creating Your First 30 Days of Content',
  'Consistency beats quality in the first 30 days. Your goal is not to go viral — it is to build the habit of creating and publishing regularly. Your 30-day plan: publish 5 times per week on your chosen platform. Batch content on weekends — create 5 pieces in one session. For YouTube: short-form (under 60 seconds) 3 times per week and long-form (8-15 minutes) twice per week. For blogging: one 1,000-word post 3 times per week. For Instagram/TikTok: one post or Reel per day. Use the AIDA framework for every piece: Attention (hook in first 3 seconds or first sentence), Interest (make them curious), Desire (show the benefit), Action (tell them what to do next — follow, comment, subscribe). Do not obsess over analytics in the first month. Focus only on consistency and improving your creation speed.',
  'Create your 30-day content calendar in Google Sheets. For each day: content title, format (short/long/post), topic category. Then batch your first week of content right now — create and schedule 5 pieces. Publish the first one today. Set a daily reminder to publish at your chosen time. Commit publicly — tell 3 friends about your content project and ask them to hold you accountable. One post per day for 30 days. No excuses.',
  'What is your biggest obstacle to publishing consistently? Time? Perfectionism? Fear of judgment? How can you address that obstacle before it derails your 30-day commitment?',
  3
from public.modules m where m.title = 'Content Monetization Basics';

-- Lesson 4
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'Monetization Paths: Ads, Sponsors, Products, and Tips',
  'Content monetization has multiple streams — smart creators stack them. (1) Ad Revenue: YouTube Partner Program (1,000 subscribers + 4,000 watch hours), Google AdSense for blogs (apply after 20+ quality posts). Passive income that grows with your audience. (2) Sponsorships: brands pay you to feature their product. Filipino micro-influencers can start pitching at 5,000 followers. Charge ₱2,000-₱5,000 per sponsored post initially. (3) Your own products: sell digital products, courses, or services to your audience. This is the highest margin — 100% goes to you. (4) Tips and donations: GCash donations during live streams, Ko-fi, or Buy Me a Coffee. Effective for building community and earning from super fans. (5) Affiliate marketing: recommend products and earn commission on every sale (covered in depth in the next module). For beginners, focus on growing your audience first, then monetize through products and affiliates before you qualify for ad revenue.',
  'Map your monetization timeline: (1) Month 1-3: grow audience, monetize with affiliate links and tip jar (GCash or Ko-fi). (2) Month 4-6: launch your first digital product for your audience, pitch first brand sponsorship. (3) Month 7-12: apply for YouTube Partner Program or Google AdSense, increase sponsorship rates, launch premium product. For each phase, estimate your income. Set up your first monetization right now: create a Ko-fi page (ko-fi.com) and add the link to your content bio. Research 3 brands in your niche you could pitch for a sponsored post.',
  'Which monetization stream excites you most — passive ad revenue, the thrill of a sponsorship deal, or selling your own products? How does your choice reflect your personality and business style?',
  4
from public.modules m where m.title = 'Content Monetization Basics';

-- Lesson 5
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'Growing From 0 to 1,000 Followers: The Organic Strategy',
  'The first 1,000 followers are the hardest but most important. After 1,000, growth accelerates because algorithms start favoring your content. Organic growth strategies for Filipino creators: (1) Collaborations — find creators at your level and do joint content, shoutouts, or duets. You share each other audiences. (2) Community engagement — spend 15 minutes daily commenting meaningfully on larger creators posts in your niche. Their audience starts recognizing you. (3) Trending content — put your unique spin on trending audio, hashtags, and topics. This is how TikTok creators go from 0 to 10,000 followers in a month. (4) Value-first content — every post should teach, entertain, or inspire. If someone sees your content and thinks "That was useful," they follow. (5) Cross-promote — share your content across platforms. Your TikTok video becomes an Instagram Reel, a YouTube Short, and a Facebook post. (6) Engage every single commenter — in the early days, reply to every comment to build relationships and signal to algorithms that your content generates engagement.',
  'Execute your growth plan this week: (1) Identify 5 creators at a similar level in your niche — reach out and propose a collaboration (dual content, shoutout exchange, or a simple tag-and-mention). (2) Spend 15 minutes daily commenting on 10 posts from larger creators in your niche — add value, not just "nice post." (3) Create 2 pieces of content using current trends — trending audio or viral formats with your niche twist. (4) Cross-post one piece of content to every platform you have an account on. (5) Reply to every comment and message you receive today. Track your follower count daily to see which activities drive the most growth.',
  'How does approaching growth systematically feel compared to just posting and hoping for the best? Which growth strategy came most naturally to you? At your current growth rate, when would you reach 1,000 followers? What could you do to accelerate that?',
  5
from public.modules m where m.title = 'Content Monetization Basics';

-- Module: Affiliate Marketing in PH
-- Lesson 1
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'Affiliate Marketing Explained: Earn From Products You Already Recommend',
  'Affiliate marketing means recommending products and earning a commission when someone buys through your link. You already do this for free — every time you tell a friend "You should buy this product from Shopee, it is great!" Affiliate marketing simply adds a tracking link so you get paid for that recommendation. In the Philippines, the main affiliate programs: (1) Shopee Affiliate Program — earn 4-10% commission on all products. If someone clicks your link and buys anything on Shopee within 7 days, you earn commission — not just on the product you recommended, on everything they buy. (2) Lazada Affiliate Program — similar structure, 4-12% commission. (3) Amazon Associates — if your audience buys from Amazon, 1-10% commission. (4) Individual brand programs — many Philippine brands have their own affiliate programs with higher commissions (15-50%). The beauty: zero risk, zero investment, zero customer service. Just recommend good products to the right audience.',
  'Sign up for your first affiliate programs today: (1) Apply to the Shopee Affiliate Program — search "Shopee Affiliate" in the Shopee app or go to affiliate.shopee.com.ph. (2) Apply to the Lazada Affiliate Program at lazada.com.ph/affiliate. (3) Once approved, generate your first affiliate link for a product you genuinely use and love. (4) Share that link in a social media post, blog, or message to friends with an honest recommendation. Track clicks and commissions in your affiliate dashboard.',
  'How does the concept of earning commissions from recommendations feel? Does it feel like a natural extension of what you already do, or does it feel awkward? What products do you already recommend to friends that could become affiliate income?',
  1
from public.modules m where m.title = 'Affiliate Marketing in PH';

-- Lesson 2
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'Choosing Affiliate Products That Actually Convert',
  'Not all affiliate products are equal. The highest converting products share these traits: (1) Under ₱1,000 — impulse purchase range, buyers do not overthink. (2) Solves an obvious problem — people buy solutions, not features. (3) Has strong reviews — 4.5+ stars with 100+ reviews on Shopee or Lazada. (4) Visual appeal — products that look good in photos and videos get more clicks. (5) You have personally used it — authenticity converts. Buyers can tell when someone genuinely loves a product versus just pushing links for commission. Best affiliate categories in PH: beauty and skincare products (Filipinas spend heavily on beauty), kitchen gadgets, phone accessories, fitness gear, and organizational products for small spaces. Avoid: expensive electronics (low conversion), fashion (high return rate affects commissions), and consumables with low margins.',
  'Curate your first affiliate product list: (1) Pick 10 products you have personally used and would genuinely recommend. (2) For each product, check: Is it available on Shopee or Lazada? Does it have 4.5+ stars? Is it under ₱1,000? Does it photograph well? (3) Generate affiliate links for your top 5 products. (4) For each product, write a one-paragraph honest review covering: what problem it solves, what you like about it, and any drawbacks. These reviews will be the foundation of your affiliate content.',
  'How important is authenticity to you when recommending products? Would you promote something you do not personally use just for the commission? Where do you draw the line between honest recommendations and sales pitches?',
  2
from public.modules m where m.title = 'Affiliate Marketing in PH';

-- Lesson 3
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'Creating Content That Drives Affiliate Sales',
  'The best affiliate content does not feel like selling — it feels like helping. Content formats that drive the most affiliate clicks: (1) "Best [product type] for [specific person]" — "Best budget wireless earbuds for BPO workers under ₱500." (2) Product reviews — honest, detailed, with pros and cons. (3) Comparison content — "Product A vs Product B: Which is better for Filipino homes?" (4) Tutorial content — "How I organize my small Manila apartment" naturally featuring affiliate products. (5) Unboxing and first impressions — especially effective on TikTok and YouTube. (6) "What I ordered on Shopee this month" haul videos — consistently high performing in the PH market. Always disclose affiliate links — say "This post contains affiliate links, which means I earn a small commission at no extra cost to you." Filipino audiences appreciate honesty and it builds trust.',
  'Create 3 pieces of affiliate content this week using different formats: (1) A "Top 5" list post or video for your niche (include 5 affiliate products with honest mini-reviews). (2) A detailed single-product review — written or video — for your most-loved affiliate product. (3) A casual "Shopee haul" or "monthly favorites" post featuring 3-5 affiliate products naturally. For each, include your affiliate links. Post them on your strongest platform and track clicks and commissions over the next 7 days.',
  'Which content format generated the most clicks? Which felt most authentic to create? How can you create more of the format that works best while keeping it genuine and not over-promotional?',
  3
from public.modules m where m.title = 'Affiliate Marketing in PH';

-- Lesson 4
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'Scaling Affiliate Income: From ₱500 to ₱20,000 Per Month',
  'Getting your first ₱500 in affiliate commissions proves the model works. Scaling to ₱20,000 requires volume and strategy. Math: at 6% average commission and ₱400 average product price, each sale earns you ₱24. To earn ₱20,000/month, you need about 833 product purchases through your links — roughly 28 per day. Sounds like a lot, but remember: when someone clicks your Shopee affiliate link and buys anything in the next 7 days, you earn commission on all of it. Scaling strategies: (1) Post affiliate content daily — every post is a new entry point. (2) Evergreen content — blog posts and YouTube videos that rank on Google and drive traffic for months or years. (3) Seasonal campaigns — 11.11 sale, Christmas shopping guides, back to school lists. (4) Build a Telegram or Viber group for deal alerts — share daily Shopee deals with your affiliate links. Filipino deal-hunting communities grow fast and generate consistent commission income.',
  'Build your affiliate scaling system: (1) Create a Telegram or Viber group called "[Your Niche] PH Deals" — invite friends and family as founding members. (2) Post 3 product deals daily with your affiliate links. (3) Plan content for the next Shopee sale campaign (check the Shopee calendar) — create a "Top Deals to Watch" post or video. (4) Identify 5 evergreen content pieces you can create (blog posts or YouTube videos that will rank on Google and drive traffic long-term). (5) Set a monthly affiliate income goal and break it down into daily sales needed.',
  'How does the math of scaling change your perspective? Does earning ₱24 per sale feel small, or does the potential of 28 sales per day feel achievable once your audience and content library grow? What is the key bottleneck between where you are now and consistent affiliate income?',
  4
from public.modules m where m.title = 'Affiliate Marketing in PH';

-- Lesson 5
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'Advanced Affiliate: Brand Deals and Higher Commission Programs',
  'Once you have proven affiliate results, you can negotiate better terms. Brands often offer 15-30% commission for creators who can demonstrate traffic and conversion. How to approach brands: find the product you already promote successfully, email their marketing department with your stats ("I drove X sales of your product last month through my channel of Y followers"), and propose a partnership with a custom affiliate rate, exclusive discount code for your audience, and potentially free product for reviews. Direct brand partnerships pay 3-5x more than standard Shopee commissions. Philippine brands particularly looking for affiliates: beauty brands (Careline, Happy Skin, Sunnies Face), health brands (Myra, Belo, Glutathione brands), and tech accessories. Also explore international programs: Hostinger (web hosting) pays ₱3,000+ per referral, online courses like Udemy and Skillshare pay ₱500-₱1,500 per sign-up, and finance apps like GCash Invest and Maya Invest have referral programs.',
  'Take your affiliate game to the next level: (1) Identify the brand you have sold the most through affiliate links. (2) Find their marketing contact (check their website, Instagram, or LinkedIn). (3) Draft a partnership pitch email including: who you are, your audience demographics, your current sales of their product, and your proposal (higher commission, exclusive code, free product). (4) Research 5 high-commission affiliate programs (Hostinger, Canva Pro, etc.) and sign up for the ones relevant to your audience. (5) Create a dedicated "Recommended Tools" page on your website or link-in-bio with all your affiliate links organized by category.',
  'How does the shift from being one of many affiliates to having a direct brand partnership change your positioning? What would it take for a brand to want to work with you specifically? How does building genuine influence connect to your broader goal of financial independence?',
  5
from public.modules m where m.title = 'Affiliate Marketing in PH';

-- Module: Email List Building
-- Lesson 1
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'Why Your Email List Is Your Most Valuable Business Asset',
  'Social media followers are rented — Facebook, TikTok, or YouTube can change algorithms or suspend your account overnight. Your email list is owned. You control it completely. No algorithm decides who sees your message — everyone on your list gets your email. In the Philippines, email marketing has a 25-35% open rate (meaning 1 in 4 people reads your email), and email converts to sales at 3-5x the rate of social media. Even a small list of 500 engaged subscribers can generate ₱5,000-₱15,000/month through product sales, affiliate recommendations, and sponsored emails. The math: 500 subscribers × 30% open rate = 150 people reading your email. If 5% buy a ₱299 product = 7.5 sales = ₱2,243 per email. Send 4 product emails per month = ₱8,970. That is from just 500 subscribers.',
  'Set up your email marketing system today: (1) Create a free account on MailerLite (mailerlite.com) — free for up to 1,000 subscribers and includes automation. (2) Create a simple sign-up form. (3) Write your first "welcome email" — introduce yourself, tell subscribers what to expect, and deliver immediate value (a tip, resource, or freebie). (4) Add your sign-up link to all your social media bios, your website, and your link-in-bio page. Your email list has started — even if it is just you as the first subscriber.',
  'How does the concept of "owning" your audience change how you think about your online presence? If Instagram disappeared tomorrow, would your business survive? What role does email play in that safety net?',
  1
from public.modules m where m.title = 'Email List Building';

-- Lesson 2
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'Lead Magnets: The Free Gift That Builds Your List',
  'Nobody gives their email for nothing. You need a lead magnet — a free, valuable resource people get in exchange for subscribing. The best lead magnets for the PH market: (1) Checklists — "The 10-Step Checklist for Setting Up Your Shopee Store." Simple, useful, quick to create. (2) Templates — "Free Monthly Budget Tracker for Filipino Families." Provide real value. (3) Mini-guides — "5 Ways to Save ₱5,000 This Month Without Feeling Deprived." Specific and actionable. (4) Swipe files — "30 Proven Facebook Post Templates for Small Businesses." Save people time. (5) Discount codes — if you sell products, "Get 20% off your first order." The key: your lead magnet should be so good that people would pay ₱100-₱200 for it. If the free thing is amazing, they will trust that your paid products are even better.',
  'Create your lead magnet today — spend 2-3 hours making something genuinely valuable. Use Canva to design it as a professional PDF. It should be: (1) Specific to a problem your target audience has, (2) Deliverable in a PDF or template link, (3) Quick to consume — 2-5 pages maximum, (4) Actionable — the reader should be able to use it immediately. Once created, upload it to Google Drive and set up automatic delivery in MailerLite (when someone subscribes, they automatically receive the lead magnet email with the download link).',
  'Would you personally subscribe for the lead magnet you created? If not, what would make it more compelling? What problem does your target audience have that is painful enough to trade their email address for a solution?',
  2
from public.modules m where m.title = 'Email List Building';

-- Lesson 3
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'Growing Your List from 0 to 500 Subscribers',
  'Your first 500 subscribers will come from: (1) Social media CTAs — end every post, video, and Reel with "Get my free [lead magnet] — link in bio." Do this consistently for 30 days. (2) Facebook Group strategy — share valuable tips in niche groups and mention "I have a free [lead magnet] on this topic — drop a comment if you want the link." This works extremely well in Filipino Facebook Groups. (3) Content upgrades — when you publish a blog post or YouTube video on a topic, offer a bonus resource as a content upgrade. "I have a detailed checklist version of everything in this video — subscribe to get it free." (4) Collaborations — do email list swaps with creators at your level. They promote your lead magnet to their list, you promote theirs to yours. (5) Paid traffic — once you know your lead magnet converts, spend ₱100-₱200/day on Facebook Ads driving to your sign-up page. At ₱10-₱30 per subscriber, ₱3,000 gets you 100-300 targeted subscribers.',
  'Launch your 30-day list building campaign: (1) Add "Get my free [lead magnet]" to every social media bio and every piece of content you publish for the next 30 days. (2) Post in 5 Facebook Groups this week offering your lead magnet to anyone who comments. (3) Create a sign-up landing page in MailerLite with your lead magnet image, 3 bullet points of what they get, and the subscribe button. (4) Share the landing page link with 20 people personally today via Messenger or Viber. (5) Set a goal: 500 subscribers in 90 days. Track your weekly growth in a spreadsheet.',
  'How many subscribers did you gain in the first week? Which source drove the most sign-ups? What would you need to adjust to hit your 500-subscriber goal on time?',
  3
from public.modules m where m.title = 'Email List Building';

-- Lesson 4
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'Writing Emails That Get Opened, Read, and Clicked',
  'A great email has 3 elements: a subject line that gets opened, content that gets read, and a call to action that gets clicked. Subject lines: use curiosity ("The ₱200 product that changed my morning routine"), urgency ("Last chance: 50% off expires tonight"), or personal ("I made this mistake so you do not have to"). Keep under 50 characters for mobile. Content: write like you are messaging a friend, not writing an essay. Short paragraphs, 2-3 sentences each. Use Taglish if your audience responds to it. Tell stories — personal anecdotes about how a product helped you or a lesson you learned. Every email should provide value even if the reader does not click anything. CTA: one clear action per email. Not "check out my blog AND buy my product AND follow me on TikTok." Just one: "Click here to get the template" or "Reply and tell me your biggest struggle with budgeting." Send emails 2-3 times per week. Tuesday and Thursday mornings (8-10am PH time) tend to have the highest open rates.',
  'Write and schedule 4 emails for the next 2 weeks: (1) A personal story email — share a relevant experience and a lesson learned, ending with a call to action. (2) A value email — teach something useful in 300 words with no selling. (3) A product recommendation email — honestly review and recommend one product with your affiliate link. (4) An engagement email — ask your subscribers a question and invite them to reply. Schedule them in MailerLite for Tuesday and Thursday mornings. After sending, check your open rates and click rates for each.',
  'Which email got the highest open rate? Which got the most clicks? What does that tell you about what your subscribers value? How does writing to an email list feel different from posting on social media?',
  4
from public.modules m where m.title = 'Email List Building';

-- Lesson 5
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'Email Automation: Making Money While You Sleep',
  'Email automation is the true passive income machine. An automated email sequence runs without you — once set up, it delivers the right email at the right time to every new subscriber forever. The essential automation: a Welcome Sequence of 5-7 emails that new subscribers receive over 2 weeks. Email 1 (immediate): deliver lead magnet + introduce yourself. Email 2 (day 2): share your best piece of content + your story. Email 3 (day 4): provide a valuable tip or resource (no selling). Email 4 (day 7): recommend a product with your affiliate link — first soft sell. Email 5 (day 10): share a customer success story or personal result. Email 6 (day 12): present your main offer (digital product or service). Email 7 (day 14): final reminder with a limited-time bonus or discount. This sequence nurtures trust before asking for a sale. It runs 24 hours a day, 7 days a week, converting new subscribers into customers automatically. Once optimized, a good welcome sequence converts 5-15% of subscribers into paying customers.',
  'Build your automated welcome sequence in MailerLite: (1) Create all 7 emails following the structure above. Write each one — spend 30 minutes per email. (2) Set up the automation: Email 1 triggers immediately on subscribe, Email 2 sends 2 days later, and so on. (3) Test the entire sequence by subscribing with a personal email — check that every email arrives on time with correct formatting. (4) Add your affiliate links to Email 4 and your product link to Email 6. (5) Once live, every new subscriber will automatically receive this sales funnel. Monitor the sequence metrics weekly: open rate for each email, click rate, and unsubscribe rate.',
  'You now have a system that works without you. How does that feel? Every new subscriber enters your automated sequence and has a chance of becoming a customer — while you are sleeping, at the gym, or spending time with family. How does this concept of leveraged income change your view of what is possible?',
  5
from public.modules m where m.title = 'Email List Building';

-- Module: Automating Your Income Stream
-- Lesson 1
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'The Automation Mindset: Systems Over Hustle',
  'Most people earn money by trading time — every peso requires an hour of work. Automation means building systems that earn money whether you are working or not. You have already built automation pieces in previous modules: digital products sell while you sleep, email sequences nurture and convert automatically, affiliate links earn commission from old content. Now it is time to think systematically about connecting these pieces. The automation stack: Content attracts audience, Lead magnet captures emails, Welcome sequence builds trust, Product offers convert subscribers, Affiliate links generate passive income, Old content continues driving new traffic. Every piece you have built feeds the next. Your job shifts from doing the work to improving the system — optimizing subject lines, testing new products, creating better content. This is how creators in the Philippines earn ₱50,000-₱200,000/month with just a few hours of work per day.',
  'Map your current automation stack on paper. Draw boxes for each element you have built: content channels, lead magnet, email list, welcome sequence, products, affiliate links. Draw arrows showing how they connect. Identify the gaps — which connections are missing or weak? For each gap, write one specific action to close it this week. Your goal: a complete system where a stranger can discover your content, join your email list, receive your welcome sequence, and buy your product — all without you lifting a finger.',
  'Looking at your automation map, where is the weakest link? Is it traffic (not enough people discovering your content), capture (not enough converting to email subscribers), or monetization (not enough subscribers buying)? Fixing the weakest link produces the biggest income jump.',
  1
from public.modules m where m.title = 'Automating Your Income Stream';

-- Lesson 2
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'Scheduling and Batching: Work 4 Hours, Earn All Week',
  'The most productive online entrepreneurs batch their work into focused blocks. The 4-hour work day for content creators: Hour 1 (Monday morning): plan and outline all content for the week. Hour 2-3 (Monday/Tuesday): batch create all content — write all posts, record all videos, design all graphics. Hour 4 (Tuesday/Wednesday): schedule everything using Meta Business Suite (Facebook/Instagram), TikTok Studio, MailerLite (emails), and WordPress (blog). Rest of the week: 30 minutes daily for engagement (replying to comments, answering emails, monitoring analytics). This means your "production" work is 4 focused hours. The rest is maintenance. Use Canva bulk create to make multiple social media posts from one design. Use MailerLite scheduling to send emails at optimal times. Use Google Sheets to manage your content calendar and batch plan a month at a time.',
  'Implement the batching system this week: (1) Block 4 hours on Monday or Tuesday — this is your production time. (2) In those 4 hours, create and schedule all your content for the week: social media posts, emails, and any blog or video content. (3) For the rest of the week, limit your work to 30 minutes of engagement per day. (4) Track your results: did scheduled content perform differently from manually posted content? (5) At the end of the week, assess: how many hours did you actually work, and how does it compare to your normal week?',
  'How does batching change your experience of work? Do you feel more or less productive? What did you do with the time you freed up? How would this system scale if you were managing multiple income streams?',
  2
from public.modules m where m.title = 'Automating Your Income Stream';

-- Lesson 3
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'Free Automation Tools for Filipino Online Entrepreneurs',
  'You do not need expensive software to automate. Free tools that handle the heavy lifting: (1) Zapier (free for 100 tasks/month) — connect apps automatically. Example: when someone buys on Gumroad, automatically send them a welcome email via MailerLite. (2) MailerLite automation (free for up to 1,000 subscribers) — email sequences, automations, and landing pages. (3) Canva content planner (free) — schedule social media posts directly from Canva. (4) Meta Business Suite (free) — schedule Facebook and Instagram posts and stories. (5) Google Sheets + Google Forms — create order forms that auto-populate a spreadsheet. (6) GCash auto-payment links — create payment links you can reuse. (7) Linktree or Beacons (free) — one link in your bio that houses all your important links. (8) ChatGPT — automate content ideation, email drafts, and response templates. Combine these tools into a workflow where content posts automatically, emails send automatically, and payments process automatically.',
  'Connect your automation tools: (1) If you have not already, set up Linktree or Beacons — add links to your lead magnet, products, and social profiles. (2) Set up one Zapier automation: when someone subscribes to your MailerLite list, automatically add them to a Google Sheet for tracking. (3) Schedule one week of social media posts directly from Canva content planner. (4) Create a GCash payment link for your digital product that you can share repeatedly. (5) Test the entire automated flow: someone sees your social post, clicks bio link, downloads your lead magnet, gets added to your email sequence, and eventually sees your product offer.',
  'How does it feel to have technology doing work for you? Which automation had the biggest impact on freeing up your time? What other repetitive tasks in your business could be automated?',
  3
from public.modules m where m.title = 'Automating Your Income Stream';

-- Lesson 4
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'Evergreen Content: Traffic That Compounds Over Time',
  'Social media posts have a lifespan of hours. Blog posts and YouTube videos have a lifespan of years. Evergreen content is content that stays relevant and drives traffic months or years after you publish it. Examples: "How to Set Up a Shopee Store in 2025" ranks on Google and gets views continuously. "Best Budget Wireless Earbuds Under ₱500" attracts buyers actively searching to purchase. "Monthly Budget Template for Filipino Families" gets downloaded year-round. The compound effect: if you publish 1 evergreen piece per week and each generates 10 visits per day after ranking, in 6 months you have 26 pieces generating 260 visits per day — 7,800 per month — all on autopilot. With affiliate links and lead magnets embedded in each piece, this traffic converts to income automatically. This is the ultimate "work once, earn forever" strategy. Focus 50% of your content effort on evergreen topics.',
  'Create your evergreen content plan: (1) Brainstorm 20 evergreen topics in your niche — topics people will search for a year from now. (2) Research keywords for your top 5 using Google "People also ask" and YouTube autocomplete. (3) Create your first evergreen piece this week — a detailed blog post (1,500+ words) or YouTube video (10+ minutes) targeting a specific search query. (4) Embed your lead magnet and at least 2 affiliate links within the content. (5) After publishing, do basic SEO: optimize the title, add a meta description, include keyword variations naturally. Track organic traffic to this piece monthly.',
  'How does thinking in terms of compounding content change your content strategy? If every piece of content you create today could generate income for the next 2-3 years, how would that change what you choose to create? Which of your existing content could be made more evergreen?',
  4
from public.modules m where m.title = 'Automating Your Income Stream';

-- Lesson 5
insert into public.lessons (module_id, title, description, action_step, reflection_prompt, "order")
select m.id,
  'Your Complete Income Automation Blueprint',
  'You have built all the pieces. Now let us assemble your complete automated income machine. The blueprint: Layer 1 — Traffic (automated content posting, evergreen content ranking on Google, social media presence attracting new followers daily). Layer 2 — Capture (lead magnets converting visitors to email subscribers, sign-up forms on every platform and piece of content). Layer 3 — Nurture (automated welcome sequence building trust, weekly emails maintaining relationship). Layer 4 — Monetize (digital products selling through email and content, affiliate links generating commissions from recommendations, brand partnerships for sponsored content). Layer 5 — Optimize (monthly review of metrics, improve weakest performing layer, test new products and content formats). Your income should come from at least 3 sources: product sales, affiliate commissions, and client work or sponsorships. This diversification means no single source failing can destroy your income. You are no longer dependent on one job, one client, or one platform.',
  'Build your master automation dashboard: (1) Create a Google Sheet with tabs for each income stream: Products, Affiliates, Client/Sponsor work, and Email metrics. (2) Set up monthly tracking for total income by source, traffic by platform, email list growth, and conversion rates. (3) Write your weekly maintenance routine — the 2-3 hours per week needed to keep all systems running. (4) Identify the one metric that, if improved by 20%, would have the biggest impact on your income. Focus your optimization effort there this month. (5) Set your 6-month income target and break it down: how much from each source? Print this dashboard and review it every Sunday.',
  'You started this track as a beginner exploring side income ideas. Now you have a multi-layered automated income system. How has your relationship with money changed throughout these modules? What does financial independence look like to you now versus when you started? How will you use this newfound earning power to improve not just your Money pillar, but your Mind, Body, and Spirit as well?',
  5
from public.modules m where m.title = 'Automating Your Income Stream';
