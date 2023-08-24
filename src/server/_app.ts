import {
  userRouter,
  postRouter,
} from './routers';
import { router } from './trpc';

export const appRouter = router({
  user: userRouter,
  post: postRouter,
});

export type AppRouter = typeof appRouter;
