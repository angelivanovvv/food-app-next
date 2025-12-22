'use client';

import React, { useActionState } from 'react';

import { ImagePicker, SubmitButton } from '@/components';
import { saveMeal } from '@/actions/meals.actions';
import { defaultMealsFormState, MealsFormState } from '@/constants/formStates';

import classes from '@/components/ShareMealForm/ShareMealForm.module.css';

import type { iProps } from '@/components/ShareMealForm/ShareMealForm.types';

const ShareMealForm: React.FC<iProps> = function () {
  const [state, formAction] = useActionState(saveMeal, defaultMealsFormState as MealsFormState);
  return (
    <form className={classes.form} action={formAction}>
      <div className={classes.row}>
        <p>
          <label htmlFor="name">Your name</label>
          <input type="text" id="name" name="name" required />
        </p>
        <p>
          <label htmlFor="email">Your email</label>
          <input type="email" id="email" name="email" required />
        </p>
      </div>
      <p>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" name="title" required />
      </p>
      <p>
        <label htmlFor="summary">Short Summary</label>
        <input type="text" id="summary" name="summary" required />
      </p>
      <p>
        <label htmlFor="instructions">Instructions</label>
        <textarea id="instructions" name="instructions" rows={10} required></textarea>
      </p>
      <ImagePicker label="Your Image" name="image" />
      {state?.message && <p className={'error'}>{state.message}</p>}
      <p className={classes.actions}>
        <SubmitButton defaultText="Share Meal" loadingText="Sharing..." />
      </p>
    </form>
  );
};

export default ShareMealForm;
