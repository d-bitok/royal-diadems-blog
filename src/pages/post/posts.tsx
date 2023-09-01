import React from 'react';
import { trpc } from '../../utils/trpc';

const Page = () => {
  const posts = trpc.post.list.useQuery();
  return (
    <>
      <pre>{JSON.stringify(posts, null, 2)}</pre>
    </>
  );
};

export default Page;
