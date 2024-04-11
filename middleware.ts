import { authMiddleware } from "@clerk/nextjs";
 

export default authMiddleware({
  publicRoutes: ['/', '/pricing', '/api/webhooks/stripe'],
});
 
export const config = {
  matcher: [
    "/((?!.+\\.[\\w]+$|_next).*)",
    "/(api|trpc)(.*)"
  ]
};