import { NextRequest, NextResponse } from "next/server";
import {
  getSession,
  withMiddlewareAuthRequired,
} from "@auth0/nextjs-auth0/edge";

async function middleware(req: NextRequest) {
  const baseUrl = req.nextUrl.origin;
  const path = req.nextUrl.pathname;

  if (path === "/verify-email") {
    return NextResponse.next();
  }

  const res = NextResponse.next();
  const session = await getSession(req, res);
  const user = session?.user;
  console.log("🚀 ~ file: middleware.ts:15 ~ path:", path);
  console.log("🚀 ~ file: middleware.ts:19 ~ middleware ~ user:", user);
  if (path !== "/api/auth/logout" && user && !user.email_verified) {
    return NextResponse.redirect(`${baseUrl}/verify-email`);
  }
  return res;
}

export default withMiddlewareAuthRequired(middleware);

export const config = {
  matcher: ["/((?!(?:_next/static|_next/image)(?:/|$))(?!.*\\.[^.]*$).*/?)"],
};
