import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AdminShell from "@/components/admin/AdminShell";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const adminToken = cookieStore.get("admin_token")?.value;

  if (!adminToken || adminToken !== process.env.ADMIN_SECRET) {
    redirect("/admin-login");
  }

  return (
    <AdminShell adminName="Admin">
      {children}
    </AdminShell>
  );
}
