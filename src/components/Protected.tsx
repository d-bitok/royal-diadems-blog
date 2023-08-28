import React, { FC, useEffect } from 'react';
import Router from 'next/router';
import { signIn, useSession } from 'next-auth/react';

interface Props {
  children: React.ReactNode;
}

const Protected: FC<Props> = ({ children }): JSX.Element => {
  const { status, data } = useSession();
  /* console.log(status) */

  useEffect(() => {
    /* if (status === "unauthenticated") signIn(); */
    if (status === 'unauthenticated') Router.replace('/auth/sign-in');
  }, [status]);

  return <>{status === 'authenticated' && <>{children}</>}</>;
};

export default Protected;
