'use client';

import React, { useActionState } from 'react';
import { Link } from '@/libs/next';
import { SubmitButton } from '@/components';

import { signup } from '@/actions/auth-actions';
import { defaultAuthFormState, AuthFormState } from '@/constants/formStates';
import classes from '@/styles/authForm.module.css';

import type { iProps } from './page.types';

const SignupPage: React.FC<iProps> = function () {
  const [formState, formAction] = useActionState(
    signup,
    defaultAuthFormState as { errors: AuthFormState },
  );

  return (
    <div className={classes.formContainer}>
      <form className={classes.form} action={formAction}>
        <h1 className={classes.pageTitle}>Create account</h1>
        <div className={classes.row}>
          <label htmlFor="email">Email</label>
          <input type="text" id="email" name="email" required />
        </div>
        <div className={classes.row}>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" required />
        </div>
        {/* <div className={classes.row}>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input type="password" id="confirmPassword" name="confirmPassword" required />
        </div> */}
      </form>
      <div className={classes.errorContainer}>
        {formState &&
          formState.errors &&
          Object.values(formState.errors).map((error, index) => (
            <p key={index} className={classes.errorText}>
              {error}
            </p>
          ))}
      </div>
      <div className={classes.btnGroup}>
        <SubmitButton defaultText="Create account" loadingText="Loading..." />
      </div>
      <div className="redirectLink">
        You already have an account.{' '}
        <Link className="link" href="/login">
          Login here.
        </Link>
      </div>
    </div>
  );
};

export default SignupPage;
