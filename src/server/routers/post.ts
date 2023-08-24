import axios from 'axios';
import { z } from 'zod';
import { procedure, router } from '../trpc';
import { Prisma } from "@prisma/client";
import { prisma } from "../prisma";

export const postRouter = router({
  list: procedure
    .query(async () => {
      try {
        let response = await prisma.post.findMany();

        return {
          response: response.length > 0 ? response[0] : null,
        };
      } catch (error) {
        return {
          error: error,
          message: "Internal Server Error check connection",
        }
      }
    }),
});
