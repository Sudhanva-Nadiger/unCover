import { authMiddleware } from "@clerk/nextjs";
 

export default authMiddleware({
  publicRoutes: ['/', '/pricing'],
});
 
export const config = {
  matcher: [
    "/((?!.+\\.[\\w]+$|_next).*)",
    "/(api|trpc)(.*)"
  ]
};