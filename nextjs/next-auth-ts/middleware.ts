export { default } from "next-auth/middleware";

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/dashboard', '/dashboard/:path*'],
}