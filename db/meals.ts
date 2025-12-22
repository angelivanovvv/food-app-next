export const CREATE_MEALS_TABLE = `
  CREATE TABLE IF NOT EXISTS meals (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    image TEXT NOT NULL,
    summary TEXT NOT NULL,
    instructions TEXT NOT NULL,
    creator TEXT NOT NULL,
    creator_email TEXT NOT NULL
  );
`;
export const GET_MEALS = `SELECT * FROM meals`;
export const GET_MEAL = `SELECT * FROM meals WHERE slug = ?`;
export const CREATE_MEAL = `
  INSERT INTO meals (
    user_id,
    slug,
    title,
    image,
    summary,
    instructions,
    creator,
    creator_email
  ) VALUES (
    @user_id,
    @slug,
    @title,
    @image,
    @summary,
    @instructions,
    @creator,
    @creator_email
  );
`;
export const DELETE_MEAL = `DELETE FROM meals WHERE id = @id`;
