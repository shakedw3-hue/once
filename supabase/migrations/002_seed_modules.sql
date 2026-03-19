-- Seed 5 modules per pillar (20 total)
-- Requires paths from 001_initial_schema.sql

-- Money modules
insert into public.modules (path_id, title, description, "order")
select p.id, m.title, m.description, m.ord
from public.paths p
cross join (values
  ('Financial Direction', 'Understand where you stand financially and create a clear direction for growth.', 1),
  ('Opportunity Thinking', 'Learn to identify and evaluate opportunities that align with your financial goals.', 2),
  ('Decision Frameworks', 'Build structured frameworks for making better financial decisions under uncertainty.', 3),
  ('Smart Money Management', 'Learn practical money management strategies that help you build wealth steadily over time.', 4),
  ('Risk Thinking', 'Develop a healthy relationship with risk and learn to manage it across all financial decisions.', 5)
) as m(title, description, ord)
where p.pillar = 'money';

-- Mind modules
insert into public.modules (path_id, title, description, "order")
select p.id, m.title, m.description, m.ord
from public.paths p
cross join (values
  ('Focus Reset', 'Reclaim your attention and build deep focus habits that compound over time.', 1),
  ('Stress Control', 'Practical techniques to regulate stress before it controls your decisions and energy.', 2),
  ('Emotional Resilience', 'Build the mental toughness to bounce back from setbacks and stay on course.', 3),
  ('Decision Clarity', 'Cut through mental fog and make clear, confident decisions in any situation.', 4),
  ('Habit Architecture', 'Design and install lasting habits using behavioral science principles.', 5)
) as m(title, description, ord)
where p.pillar = 'mind';

-- Body modules (expanded to 5)
insert into public.modules (path_id, title, description, "order")
select p.id, m.title, m.description, m.ord
from public.paths p
cross join (values
  ('Energy Reset', 'Rebuild your daily energy through sleep, hydration, and recovery fundamentals.', 1),
  ('Training Consistency', 'Create a sustainable training routine that fits your lifestyle and sticks.', 2),
  ('Nutrition Simplicity', 'Simplify your nutrition with practical rules — no complicated diets or calorie counting.', 3),
  ('Recovery', 'Master active recovery, rest days, and injury prevention for long-term health.', 4),
  ('Movement & Mobility', 'Improve daily movement patterns and flexibility to prevent pain and increase vitality.', 5)
) as m(title, description, ord)
where p.pillar = 'body';

-- Spirit modules (expanded to 5)
insert into public.modules (path_id, title, description, "order")
select p.id, m.title, m.description, m.ord
from public.paths p
cross join (values
  ('Meaning & Direction', 'Discover your personal sense of purpose and align your daily actions with it.', 1),
  ('Gratitude Practice', 'Build a gratitude habit that rewires your perspective and increases life satisfaction.', 2),
  ('Daily Reflection', 'Develop a reflection practice that turns everyday experiences into growth lessons.', 3),
  ('Values Alignment', 'Identify your core values and learn to make decisions that honor them.', 4),
  ('Inner Peace & Stillness', 'Cultivate calm through mindfulness, breathing, and presence practices.', 5)
) as m(title, description, ord)
where p.pillar = 'spirit';
