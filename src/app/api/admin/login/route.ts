import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { password } = await request.json();

  if (password !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: "Invalid" }, { status: 401 });
  }

  const res = NextResponse.json({ success: true });
  res.cookies.set("admin_token", process.env.ADMIN_SECRET!, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  return res;
}
