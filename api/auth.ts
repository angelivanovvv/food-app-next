import sql from 'better-sqlite3';
import { iUser } from '@/types/user.types';

const db = sql('meals.db');

export const createUser = async function (
  username: string,
  email: string,
  password: string,
): Promise<string> {
  // Simulate async operation
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const user = db
    .prepare('INSERT INTO users (username, email, password) VALUES (?, ?, ?)')
    .run(username, email, password);
  return user.lastInsertRowid.toString();
};

export const getUserByEmail = async function (email: string): Promise<iUser> {
  // Simulate async operation
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
  return user as iUser;
};
