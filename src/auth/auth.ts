import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import dotenv from 'dotenv';
dotenv.config();
// If your Prisma file is located elsewhere, you can change the path
import { prisma } from '../prisma.js';
import { userAc } from 'better-auth/plugins/admin/access';
export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql', // or "mysql", "postgresql", ...etc
  }),
  user: {
    additionalFields: {
      role: {
        type: 'string',
        defaultValue: 'User',
      },
    },
  },
  secretKeyBase: process.env.SECRET_KEY_BASE || '',
  trustedOrigins: [process.env.ORIGIN_URL || ''],
  emailAndPassword: {
    enabled: true,
  },
});
