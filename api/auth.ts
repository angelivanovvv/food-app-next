import sql from 'better-sqlite3';
import { iUser } from '@/types/user.types';

import { CREATE_USER, GET_USER_BY_EMAIL, GET_USER_BY_ID } from '@/db/users';

const db = sql('meals.db');

export const createUser = async function (
  username: string,
  email: string,
  password: string,
): Promise<string> {
  // Simulate async operation
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const user = db.prepare(CREATE_USER).run({ username, email, password });
  return user.lastInsertRowid.toString();
};

export const getUserByEmail = async function (email: string): Promise<iUser> {
  // Simulate async operation
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const user = db.prepare(GET_USER_BY_EMAIL).get({ email });
  return user as iUser;
};

export const getUserById = async function (id: string): Promise<iUser> {
  // Simulate async operation
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const user = db.prepare(GET_USER_BY_ID).get({ id });
  return user as iUser;
};
