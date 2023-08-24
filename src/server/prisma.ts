import { PrismaClient } from '@prisma/client';

const prismaGlobal = global as typeof global & {
  prisma?: PrismaClient;
};

export const prisma: PrismaClient =
  prismaGlobal.prisma ||
  new PrismaClient({
    log:
      process.env.VERCEL_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

if (process.env.VERCEL_ENV !== 'production') {
  prismaGlobal.prisma = prisma;
}


