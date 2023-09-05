import { useEffect } from 'react';
import { trpc } from '../utils/trpc';
import { useSession, signOut } from 'next-auth/react';
import {
  IconGauge,
  IconFingerprint,
  IconActivity,
  IconChevronRight,
  IconHome,
  IconCreditCard,
  IconMessageChatbot,
  IconApps,
  IconUsers,
  IconBrandBlogger,
  IconDetails,
  IconPhoneCall,
  IconNews,
  IconMessages,
  IconCategory,
} from '@tabler/icons-react';
import { Box, NavLink } from '@mantine/core';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { notifications } from '@mantine/notifications';

const nav_data = [
  {
    icon: IconHome,
    label: 'Home',
    description: 'Your Blog Info',
    rightSection: <IconChevronRight size={16} stroke={1.5} />,
    view: '/',
  },
  {
    icon: IconNews,
    label: 'About',
    description: 'About us',
    rightSection: <IconChevronRight size={16} stroke={1.5} />,
    view: '/about',
  },
  {
    icon: IconPhoneCall,
    label: 'Contact',
    description: 'Reach out to us',
    rightSection: <IconChevronRight size={16} stroke={1.5} />,
    view: '/contact',
  },
  {
    icon: IconCategory,
    label: 'Categories',
    description: 'More categories',
    rightSection: <IconChevronRight size={16} stroke={1.5} />,
    view: '/categories',
  },
  {
    icon: IconMessages,
    label: 'Testimonials',
    description: 'What others say about us',
    rightSection: <IconChevronRight size={16} stroke={1.5} />,
    view: '/testimonials',
  },
];

interface Account {
  email: string;
  balance: string;
  id: number;
  username: string;
  aid: string;
}
const NavBar = () => {
  const router = useRouter();
  // const { status, data } = useSession();
  // const account = trpc.account.list.useQuery({ method: "list_accounts", id: 1, cookie: `${data?.user?.image}` });
  //
  // const setID = useMantaStore((state) => state.setID)
  // const res = account?.data?.data?.result?.data.find((account: Account) => account.email === data?.user?.email);
  //
  // useEffect(() => {
  //   let sub = true
  //   if (sub) {
  //     setID(res?.cid)
  //     if (account?.data?.error) signOut();
  //   }
  //   return () => { sub = false }
  // }, [res?.cid, account?.data?.error])

  const items = nav_data.map((item, index) => (
    <Link key={index} href={`${item.view}`} style={{ textDecoration: 'none' }}>
      <NavLink
        style={{ borderRadius: '10px', marginTop: '10px' }}
        key={item.label}
        active={router.pathname === item.view}
        label={item.label}
        description={item.description}
        rightSection={item.rightSection}
        icon={<item.icon size={16} stroke={1.5} />}
        onClick={() => {
          notifications.show({
            title: 'Navigation',
            message: item.description,
          });
        }}
      />
    </Link>
  ));

  return <Box>{items}</Box>;
};
export default NavBar;
