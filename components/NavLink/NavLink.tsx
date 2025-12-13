'use client';

import { usePathname } from 'next/navigation';

import { Link } from '@/libs/next';

import classes from './NavLink.module.css';

import type { iProps } from './NavLink.types';

const NavLink: React.FC<iProps> = ({ href, children }) => {
  const path = usePathname();

  const isActive = (href: string): string =>
    path.startsWith(href) ? `${classes.link} ${classes.active}` : classes.link;

  return (
    <Link href={href} className={isActive(href)}>
      {children}
    </Link>
  );
};

export default NavLink;
