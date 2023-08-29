import axios from 'axios';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { procedure, router } from '../trpc';
import { Prisma } from '@prisma/client';
import { prisma } from '../prisma';

export const userRouter = router({
  register: procedure
    .input(
      z.object({
        username: z.string(),
        firstName: z.string(),
        lastName: z.string(),
        password: z.string(),
        email: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      if (!input.username) return;

      const user = await prisma.user.create({
        data: {
          username: input.username,
          firstName: input.firstName,
          lastName: input.lastName,
          password: input.password,
          email: input.email,
          state: 'offline',
        },
      });

      if (!user) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `users.register not found`,
        });
      }
      return user;
    }),
  list: procedure.query(async () => {
    try {
      let response = await prisma.user.findMany();

      return {
        response: response.length > 0 ? response : null,
      };
    } catch (error) {
      return {
        error: error,
        message: 'Internal Server Error check connection',
      };
    }
  }),
});
