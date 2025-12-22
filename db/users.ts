export const CREATE_USERS_TABLE = `
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY,
    username TEXT,
    email TEXT UNIQUE,
    password TEXT
  );
`;

export const CREATE_USER = `'INSERT INTO users (username, email, password) VALUES (?, ?, ?)'`;

export const GET_USER_BY_EMAIL = `SELECT * FROM users WHERE email = ?`;
