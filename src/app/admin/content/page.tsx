import { createClient } from "@/lib/supabase/server";
import ContentManager from "@/components/admin/ContentManager";

export default async function AdminContentPage() {
  const supabase = await createClient();

  const { data: paths } = await supabase
    .from("paths")
    .select("id, pillar, title, order")
    .order("order");

  const { data: modules } = await supabase
    .from("modules")
    .select("id, path_id, title, description, order")
    .order("order");

  const { data: lessons } = await supabase
    .from("lessons")
    .select("id, module_id, title, description, action_step, reflection_prompt, order")
    .order("order");

  return (
    <ContentManager
      paths={paths ?? []}
      modules={modules ?? []}
      lessons={lessons ?? []}
    />
  );
}
