import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const url = new URL(req.url);

  const cookie = cookies();

  const formData = await req.formData();

  const email = String(formData.get("email"));
  const password = String(formData.get("password"));

  const supabase = createRouteHandlerClient({
    cookies: () => cookie,
  });

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (data) console.log(data);
  if (error) console.log(error);

  return NextResponse.redirect(url.origin, {
    status: 301,
  });
}
