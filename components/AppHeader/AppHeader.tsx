import React, { Fragment } from 'react';

import { Image, Link } from '@/libs/next';

import AppHeaderBackground from '@/components/HeaderBackground';
import NavLink from '@/components/NavLink';

import logoImg from '@/assets/logo.png';

import { isAuthenticated, logout } from '@/actions/auth-actions';

import classes from './AppHeader.module.css';

import type { iProps } from './AppHeader.types';
import SubmitButton from '../SubmitButton';

const AppHeader: React.FC<iProps> = async function () {
  const { isUserAuthenticated } = await isAuthenticated();
  return (
    <Fragment>
      <AppHeaderBackground />
      <header className={classes.header}>
        <Link className={classes.logo} href="/">
          <Image
            src={logoImg}
            alt="Logo image"
            width={logoImg.width}
            height={logoImg.height}
            priority
          />
          NextLevel Food
        </Link>
        <nav className={classes.nav}>
          <ul>
            <li>
              <NavLink href="/meals"> Browse Meals</NavLink>
            </li>
            <li>
              <NavLink href="/community">Foodies Community</NavLink>
            </li>
            {!isUserAuthenticated ? (
              <li>
                <NavLink href="/auth?mode=login">Log in</NavLink>
              </li>
            ) : (
              <li>
                <form action={logout}>
                  <SubmitButton defaultText="logout" loadingText="Loading..." />
                </form>
              </li>
            )}
          </ul>
        </nav>
      </header>
    </Fragment>
  );
};

export default AppHeader;
