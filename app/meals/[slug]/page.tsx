import { Fragment } from 'react';

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Image } from '@/libs/next';
import { getSingleMeal } from '@/actions/meals.actions';

import { iMealsDynamicPageProps } from '@/app/meals/[slug]/page.types';

import classes from './page.module.css';

export async function generateMetadata({ params }: iMealsDynamicPageProps): Promise<Metadata> {
  const { slug } = await params;
  const meal = await getSingleMeal(slug);

  if (!meal) {
    notFound();
  }

  return {
    title: meal.title,
    description: meal.summary,
  };
}

async function MealsDynamicPage({ params }: iMealsDynamicPageProps) {
  const { slug } = await params;
  const meal = await getSingleMeal(slug);
  const formattedMealInstructions = meal.instructions.replace(/\n/g, '<br />');

  if (!meal) {
    notFound();
  }

  return (
    <Fragment>
      <header className={classes.header}>
        <div className={classes.image}>
          <Image alt="Meal details image" src={meal.image as string} fill />
        </div>
        <div className={classes.headerText}>
          <h1>{meal.title}</h1>
          <p className={classes.creator}>
            by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
          </p>
          <p className={classes.summary}>{meal.summary}</p>
        </div>
      </header>
      <main>
        <p
          className={classes.instructions}
          dangerouslySetInnerHTML={{
            __html: formattedMealInstructions,
          }}
        ></p>
      </main>
    </Fragment>
  );
}

export default MealsDynamicPage;
