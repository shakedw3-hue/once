import { cookies } from "next/headers";
import AdminShell from "@/components/admin/AdminShell";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const adminToken = cookieStore.get("admin_token")?.value;
  const isAuthed = adminToken === process.env.ADMIN_SECRET;

  // Login page renders without AdminShell
  if (!isAuthed) {
    return <>{children}</>;
  }

  return (
    <AdminShell adminName="Admin">
      {children}
    </AdminShell>
  );
}
