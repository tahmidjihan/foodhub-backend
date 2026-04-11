import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import dotenv from 'dotenv';
dotenv.config();
// If your Prisma file is located elsewhere, you can change the path
import { prisma } from '../prisma.js';
import { userAc } from 'better-auth/plugins/admin/access';

const isProd = process.env.NODE_ENV === 'production';

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql', // or "mysql", "postgresql", ...etc
  }),
  user: {
    additionalFields: {
      role: {
        type: 'string',
        defaultValue: 'Customer',
      },
    },
  },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // 5 minutes
    },
  },
  advanced: {
    cookiePrefix: 'better-auth',
    useSecureCookies: isProd,
    crossSubDomainCookies: {
      enabled: false, // Different domains (netlify.app and vercel.app), not subdomains
    },
    disableCSRFCheck: true, // Allow requests without Origin header (Postman, mobile apps, etc.)
    defaultCookieAttributes: {
      sameSite: isProd ? 'none' : 'lax',
      secure: isProd,
      path: '/',
      // Don't set domain - let it default to the requesting domain
    },
  },
  trustedOrigins: [
    process.env.FRONTEND_URL || 'http://localhost:5000',
    process.env.ORIGIN_URL || 'http://localhost:5000',
    'https://foodhub-frontend-blush.vercel.app',
    'https://foodhub-by-tahmid.netlify.app',
    'http://localhost:3000',
    'http://localhost:5000',
  ].filter((url, index, self) => self.indexOf(url) === index), // Remove duplicates
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    },
  },
});
