'use server';

import { isInvalidEmail, isInvalidPassword, isInvalidText } from '@/utils/validation';

import { createUser, getUserByEmail } from '@/api/auth';
import { hashPassword, verifyPassword } from '@/utils/cryptPassword';
import { verifyAuth, createAuthSession, destroySession } from '@/libs/auth';
import type { AuthFormState } from '@/constants/formStates';
import { redirect } from 'next/navigation';

// Check if user is authenticated
export const isAuthenticated = async function () {
  const isAuthenticated = await verifyAuth();
  return { isUserAuthenticated: isAuthenticated.user };
};

// Signup user
export const signup = async function (
  _prevState: { errors: AuthFormState },
  formData: FormData,
): Promise<{ errors: AuthFormState }> {
  const username = formData.get('username') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const errors: AuthFormState = {};

  if (isInvalidText(username)) {
    errors.username = 'Please provide a valid username.';
  }

  if (isInvalidText(email) || isInvalidEmail(email)) {
    errors.email = 'Please provide a valid email address.';
  }

  if (isInvalidText(password) || isInvalidPassword(password)) {
    errors.password = 'Password must be at least 8 characters long.';
  }

  if (Object.keys(errors).length > 0) {
    return { errors: errors };
  }

  const hashedPassword = hashPassword(password);

  try {
    const userId = await createUser(username, email, hashedPassword);
    await createAuthSession(userId);
    redirect('/');
  } catch (error) {
    if (error instanceof Object && 'code' in error && error.code === 'SQLITE_CONSTRAINT_UIQUE') {
      return {
        errors: {
          email: 'It seems like an account for this chosen user already exists.',
        },
      };
    }
    throw error;
  }
};

//Login user
export const login = async function (
  _prevState: { errors: AuthFormState },
  formData: FormData,
): Promise<{ errors: AuthFormState }> {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    return {
      errors: {
        email: 'Could not authenticate user, please check your credentials.',
      },
    };
  }

  const isValidPassoword = verifyPassword(existingUser.password, password);

  if (!isValidPassoword) {
    return {
      errors: {
        password: 'Could not authenticate user, please check your credentials.',
      },
    };
  }

  await createAuthSession(existingUser.id);
  redirect('/');
};

// Logout user
export const logout = async function () {
  await destroySession();
  redirect('/');
};

// Authenticate user
export const authenticate = async function (
  mode: string,
  prevState: { errors: AuthFormState },
  formData: FormData,
) {
  if (mode === 'login') {
    return login(prevState, formData);
  }
  return signup(prevState, formData);
};
