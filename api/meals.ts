import sql from 'better-sqlite3';

import { getFileDetails, saveFile } from '@/utils/common';
import { generareSlug, sanitaze } from '@/utils/validation';

import { iMeal } from '@/types/meals.types';

const db = sql('meals.db');

export async function getMeals(): Promise<iMeal[]> {
  // Simulate async operation
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const statement = db.prepare('SELECT * FROM meals');
  // Simulate an error
  // throw new Error('Failed to load meals')
  return statement.all() as iMeal[];
}

export async function getMeal(slug: string): Promise<iMeal> {
  // Simulate async operation
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const statement = db.prepare('SELECT * FROM meals WHERE slug = ?');
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
    title: meal.title,
    slug: meal.slug,
    image: meal.image,
    summary: meal.summary,
    instructions: meal.instructions,
    creator: meal.creator,
    creator_email: meal.creator_email,
  };

  const statement = db.prepare(`
        INSERT INTO meals (
            title,
            slug,
            image, 
            summary,
            instructions, 
            creator, 
            creator_email
        ) 
        VALUES (
            @title,
            @slug,   
            @image, 
            @summary, 
            @instructions, 
            @creator, 
            @creator_email
        )`);
  statement.run(payload);
}

//TODO: COMPLETE DELETE METHOD
export async function deleteMeal(id: string | number): Promise<void> {
  console.log('delete meal with id: ', id);
}
