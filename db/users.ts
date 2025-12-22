export const CREATE_USERS_TABLE = `
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY,
    username TEXT,
    email TEXT UNIQUE,
    password TEXT
  );
`;
export const CREATE_USER = `INSERT INTO users (username, email, password) VALUES (@username, @email, @password);`;
export const GET_USER_BY_EMAIL = `SELECT * FROM users WHERE email = @email`;
export const GET_USER_BY_ID = `SELECT id, username, email FROM users WHERE id = @id`;
