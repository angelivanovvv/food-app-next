import sql from 'better-sqlite3';

const db = sql('meals.db');

import { CREATE_USERS_TABLE } from './users';
import { CREATE_SESSIONS_TABLE } from './sessions';
import { CREATE_MEALS_TABLE, CREATE_MEAL } from './meals';
import { Meals } from './mealsList';

db.exec(CREATE_USERS_TABLE);
db.exec(CREATE_SESSIONS_TABLE);
db.prepare(CREATE_MEALS_TABLE).run();

const statement = db.prepare(CREATE_MEAL);

const insertMany = db.transaction((meals) => {
  for (const meal of meals) {
    statement.run(meal);
  }
});

insertMany(Meals);
