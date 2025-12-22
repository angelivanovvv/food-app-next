import React, { Fragment } from 'react';

import { ShareMealForm } from '@/components';

import { isAuthenticated } from '@/actions/auth.actions';

import classes from './page.module.css';

import type { iProps } from '@/app/meals/share/page.types';
import { redirect } from 'next/navigation';

const ShareMealPage: React.FC<iProps> = async function () {
  const { isAuth } = await isAuthenticated();

  if (!isAuth) {
    return redirect('/');
  }

  return (
    <Fragment>
      <header className={classes.header}>
        <h1>
          Share your <span className={classes.highlight}>favorite meal</span>
        </h1>
        <p>Or any other meal you feel needs sharing!</p>
      </header>
      <main className={classes.main}>
        <ShareMealForm />
      </main>
    </Fragment>
  );
};

export default ShareMealPage;
