'use client';

import React from 'react';

import MealItem from '../MealItem';

import classes from './MealsGrid.module.css';

import type { iMeal } from '@/types/meals.types';
import type { iProps } from './MealsGrid.types';

const MealsGrid: React.FC<iProps> = function ({ meals }) {
  return (
    <ul className={classes.meals}>
      {meals.map((meal: iMeal) => (
        <li key={meal.id}>
          <MealItem {...meal} />
        </li>
      ))}
    </ul>
  );
};

export default MealsGrid;
