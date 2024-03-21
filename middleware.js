import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function middleware(request) {
  const supabaseUrl = "https://upymmfywkjqrllpxgvhg.supabase.co";
  const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVweW1tZnl3a2pxcmxscHhndmhnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA4NTE2MjgsImV4cCI6MjAyNjQyNzYyOH0.jO-hMLeQySdpTZ-Ony4tTcrgMadwnvB8EDjopKV5s6A";

  async function updateSession(request) {
    let response = NextResponse.next({
      request: {
        headers: request.headers,
      },
    });

    const db = createClient(supabaseUrl, supabaseKey, {
      cookies: {
        get(name) {
          return request.cookies.get(name)?.value;
        },
        set(name, value, options) {
          request.cookies.set({
            name,
            value,
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove(name, options) {
          request.cookies.set({
            name,
            value: "",
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value: "",
            ...options,
          });
        },
      },
    });

    await db.auth.getUser();

    return response;
  }

  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
