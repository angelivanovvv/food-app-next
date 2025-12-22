import React, { Fragment } from 'react';

import { Link } from '@/libs/next';
import type { Metadata } from 'next';

import { AppSuspense, MealsGrid } from '@/components';
import { getAllMeals } from '@/actions/meals-actions';
import { isAuthenticated } from '@/actions/auth-actions';

import classes from './page.module.css';
import type { iProps } from './page.types';

export const metadata: Metadata = {
  title: 'All Meals',
  description: 'A list of all meals available in the Food App.',
};

const MealsPage: React.FC<iProps> = async function () {
  const { isAuth } = await isAuthenticated();
  const meals = await getAllMeals();
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>
          Delicious meals, created <span className={classes.highlight}> by you</span>
        </h1>
        <p>Choose your favorite recepie and cook it yourself, It is easy and fun!</p>
        <p className={classes.cta}>
          {isAuth && <Link href="/meals/share"> Share Your Favourite Recepie</Link>}
        </p>
      </header>
      <main className={classes.main}>
        <AppSuspense>
          <MealsGrid meals={meals} />
        </AppSuspense>
      </main>
    </Fragment>
  );
};

export default MealsPage;
