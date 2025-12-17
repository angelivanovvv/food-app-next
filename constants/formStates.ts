export type MealsFormState = {
  message?: string;
} | null;

export type AuthFormState = Record<string, string> | null;

export const defaultMealsFormState: { message: MealsFormState } = { message: null };
export const defaultAuthFormState: { errors: AuthFormState | null } = { errors: null };
