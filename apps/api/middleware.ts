// import { type NextFunction,type  Request, type Response } from "express";
// export function authMiddleware(req: Request, res:Response, next:NextFunction) {
//  const authHeader = req.headers['authorization'];
//  req.userId = "1";
// next();

// }
import { type NextFunction, type Request, type Response } from "express";
const clerk = require('@clerk/clerk-sdk-node');

// Define interface to extend Express Request
declare global {
  namespace Express {
    interface Request {
      userId?: string;
      auth?: {
        userId: string;
        sessionId: string;
        getToken: () => Promise<string | null>;
      };
    }
  }
}

// Wrap Clerk's middleware and add userId to req
const clerkMiddleware = clerk.ClerkExpressWithAuth();

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  clerkMiddleware(req, res, (err?: any) => {
    if (err) {
      console.error('Clerk authentication error:', err);
      return res.status(401).json({ error: 'Authentication failed' });
    }

    if (req.auth?.userId) {
      req.userId = req.auth.userId;
      next();
    } else {
      res.status(401).json({ error: 'User ID not found in authenticated request' });
    }
  });
}

// import { clerkMiddleware } from '@clerk/nextjs/server';

// export default clerkMiddleware();

// export const config = {
//   matcher: [
//     // Skip Next.js internals and all static files, unless found in search params
//     '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
//     // Always run for API routes
//     '/(api|trpc)(.*)',
//   ],
// };