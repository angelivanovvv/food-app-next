'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { isAuthenticated } from './auth.actions';
import { isInvalidText, isInvalidEmail, isInvalidFile, clearProperty } from '@/utils/validation';
import { getMeals, getMeal, createMeal, deleteMeal } from '@/api/meals';

import {
  invalidImageErrorMessage,
  invalidEmailErrorMessage,
  invalidInputErrorMessage,
} from '@/constants/errorMessages';

import type { MealsFormState } from '@/constants/formStates';
import type { iMeal } from '@/types/meals.types';

// Get all meals
export const getAllMeals = async function (): Promise<iMeal[]> {
  return await getMeals();
};

// Get single meal
export const getSingleMeal = async function (slug: string): Promise<iMeal> {
  return await getMeal(slug);
};

// Save meal
export const saveMeal = async function (
  _prevState: MealsFormState,
  formData: FormData,
): Promise<MealsFormState> {
  const { user } = await isAuthenticated();

  const meal = {
    user_id: user?.id,
    title: clearProperty(formData.get('title')),
    image: formData.get('image') as File | string,
    summary: clearProperty(formData.get('summary')),
    instructions: clearProperty(formData.get('instructions')),
    creator: clearProperty(formData.get('name')),
    creator_email: clearProperty(formData.get('email')),
  };

  // Validate inputs
  if (
    isInvalidText(meal.title as string) ||
    isInvalidText(meal.summary as string) ||
    isInvalidText(meal.instructions as string) ||
    isInvalidText(meal.creator as string)
  ) {
    return {
      message: invalidInputErrorMessage,
    };
  }

  // Validate email
  if (isInvalidText(meal.creator_email as string) || isInvalidEmail(meal.creator_email as string)) {
    return {
      message: invalidEmailErrorMessage,
    };
  }

  // Validate image
  if (isInvalidFile(meal.image as File)) {
    return {
      message: invalidImageErrorMessage,
    };
  }

  await createMeal(meal as iMeal);
  revalidatePath('/meals');
  redirect('/meals');
};

// Delete meal
//TODO: COMPLETE DELETE MEAL ACTION
export const removeMeal = async function (id: number) {
  await deleteMeal(id);
};
