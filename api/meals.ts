import sql from 'better-sqlite3';

import { getFileDetails, saveFile } from '@/utils/common';
import { generareSlug, sanitaze } from '@/utils/validation';

import { GET_MEALS, GET_MEAL, CREATE_MEAL } from '@/db/meals';

import { iMeal } from '@/types/meals.types';

const db = sql('meals.db');

export async function getMeals(): Promise<iMeal[]> {
  // Simulate async operation
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const statement = db.prepare(GET_MEALS);
  // Simulate an error
  // throw new Error('Failed to load meals')
  return statement.all() as iMeal[];
}

export async function getMeal(slug: string): Promise<iMeal> {
  // Simulate async operation
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const statement = db.prepare(GET_MEAL);
  return statement.get(slug) as iMeal;
}

export async function createMeal(meal: iMeal): Promise<void> {
  const file = meal.image as File;

  meal.slug = generareSlug(meal.title);
  meal.instructions = sanitaze(meal.instructions);

  const { filename } = getFileDetails(meal.slug, file);

  await saveFile(file, filename);
  meal.image = `/meals/${filename}`;

  const payload = {
    user_id: meal.user_id,
    title: meal.title,
    slug: meal.slug,
    image: meal.image,
    summary: meal.summary,
    instructions: meal.instructions,
    creator: meal.creator,
    creator_email: meal.creator_email,
  };

  const statement = db.prepare(CREATE_MEAL);
  statement.run(payload);
}

//TODO: COMPLETE DELETE METHOD
export async function deleteMeal(id: string | number): Promise<void> {
  console.log('delete meal with id: ', id);
}
