import { Fragment } from "react";

import { notFound } from "next/navigation";
import { Image } from "@/libs/next";
import { getMeal } from "@/libs/meals";

import { iMealsDynamicPageProps } from "@/app/meals/[slug]/page.types";

import classes from "./page.module.css";

async function MealsDynamicPage({ params }: iMealsDynamicPageProps) {
  const { slug } = await params;
  const meal = await getMeal(slug);

  if (!meal) {
    notFound();
  }

  const formattedMealInstructions = meal.instructions.replace(/\n/g, "<br />");

  return (
    <Fragment>
      <header className={classes.header}>
        <div className={classes.image}>
          <Image alt="Meal details image" src={meal.image} fill />
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
