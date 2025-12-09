import fs from 'node:fs'

import sql from 'better-sqlite3';
import slugify from 'slugify';
import xss from 'xss';

import { iMeal } from '@/types/meals.types';

const db = sql('meals.db')

// Utility functions 
const generareSlug = (str: string) => {
    return slugify(str, { lower: true });
}

const sanitaze = (str: string) => {
    return xss(str);
}

const getFileDetails = (slug: string, file: any) => {
    const extension = file.name.split('.').pop();
    const filename = `${slug}.${extension}`;
    return { filename, extension };

}

const saveFile = async (file: any, filename: string): Promise<void> => {
    const stream = fs.createWriteStream(`/public/images/meals/${filename}`);
    const bufferedImage = await file.arrayBuffer();
    stream.write(Buffer.from(bufferedImage), (error: Error | null | undefined) => {
        if (error) {
            throw new Error('Saving image failed!');
        }
        stream.end();
    })
}

export async function getAllMeals(): Promise<iMeal[]> {
    // Simulate async operation
    await new Promise((resolve) => setTimeout(resolve, 5000))
    const statement = db.prepare('SELECT * FROM meals')
    // Simulate an error
    // throw new Error('Failed to load meals') 
    return statement.all() as iMeal[]
}

export async function getMeal(slug: string): Promise<iMeal> {
    // Simulate async operation
    await new Promise((resolve) => setTimeout(resolve, 5000));
    const statement = db.prepare('SELECT * FROM meals WHERE slug = ?');
    return statement.get(slug) as iMeal;
}

export async function saveMeal(meal: iMeal): Promise<void> {
    const { filename } = getFileDetails(meal.slug, meal.image);

    meal.slug = generareSlug(meal.title);
    meal.instructions = sanitaze(meal.instructions);

    await saveFile(meal.image, filename);
    meal.image = `/images/meals/${filename}`;


    const statement = db.prepare(
        'INSERT INTO meals (title, summary, instructions, image, slug, creator, creator_email) VALUES (?, ?, ?, ?, ?, ?, ?)'
    );
    statement.run(
        meal.title,
        meal.summary,
        meal.instructions,
        meal.image,
        meal.slug,
        meal.creator,
        meal.creator_email
    );
}