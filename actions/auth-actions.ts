'use server';

import { isInvalidEmail, isInvalidPassword, isInvalidText } from '@/utils/validation';

import type { AuthFormState } from '@/constants/formStates';

export const signup = async function (
  _prevState: { errors: AuthFormState },
  formData: FormData,
): Promise<{ errors: AuthFormState }> {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const errors: AuthFormState = {};

  if (isInvalidText(email) || isInvalidEmail(email)) {
    errors.email = 'Please provide a valid email address.';
  }

  if (isInvalidText(password) || isInvalidPassword(password)) {
    errors.password =
      'Password must be at least 8 characters long and include a number and a special character.';
  }

  if (Object.keys(errors).length > 0) {
    return { errors: errors };
  }

  return { errors: null };

  // If no errors, proceed to create the account and
  // store it in the database (create a new user
};
