import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/proxy";

function redirectRecoveryTokens(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;
  if (
    pathname.startsWith("/auth/reset") ||
    pathname.startsWith("/auth/callback") ||
    pathname.startsWith("/auth/confirm")
  ) {
    return null;
  }

  const code = searchParams.get("code");
  const tokenHash = searchParams.get("token_hash");
  const type = searchParams.get("type");

  if (tokenHash) {
    const url = request.nextUrl.clone();
    url.pathname = "/auth/confirm";
    if (!url.searchParams.get("type")) {
      url.searchParams.set("type", "recovery");
    }
    return NextResponse.redirect(url);
  }

  if (code) {
    const url = request.nextUrl.clone();
    url.pathname = "/auth/reset";
    return NextResponse.redirect(url);
  }

  if (type === "recovery" && pathname !== "/reset-password") {
    const url = request.nextUrl.clone();
    url.pathname = "/reset-password";
    return NextResponse.redirect(url);
  }

  return null;
}

export async function proxy(request: NextRequest) {
  const recovery = redirectRecoveryTokens(request);
  if (recovery) {
    return recovery;
  }

  try {
    return await updateSession(request);
  } catch {
    return NextResponse.next({ request });
  }
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|mp4|webm|glb|gltf|exr|hdr)$).*)",
  ],
};
