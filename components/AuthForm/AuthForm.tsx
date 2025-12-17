'use client';

import React, { useActionState } from 'react';

import { Link } from '@/libs/next';
import { SubmitButton } from '@/components';

import { authenticate } from '@/actions/auth-actions';
import { defaultAuthFormState, AuthFormState } from '@/constants/formStates';

import classes from '@/components/AuthForm/AuthForm.module.css';
import { iProps } from '@/components/AuthForm/AuthForm.types';

const AuthForm: React.FC<iProps> = function ({ mode }) {
  const [formState, formAction] = useActionState(
    authenticate.bind(null, mode as string),
    defaultAuthFormState as { errors: AuthFormState },
  );

  return (
    <div className={classes.formContainer}>
      <form className={classes.form} action={formAction}>
        <h1 className={classes.pageTitle}>{mode === 'login' ? 'Login' : 'Create Account'} </h1>
        <div className={classes.row}>
          <label htmlFor="username">Username</label>
          <input type="username" id="username" name="username" required />
        </div>
        <div className={classes.row}>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div className={classes.row}>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" required />
        </div>
        {formState && formState.errors && (
          <div className={classes.errorContainer}>
            {Object.values(formState.errors).map((error, index) => (
              <p key={index} className={classes.errorText}>
                {error}
              </p>
            ))}
          </div>
        )}
        <div className={classes.btnGroup}>
          <SubmitButton
            defaultText={mode === 'login' ? 'Login' : 'Create Account'}
            loadingText="Loading..."
          />
        </div>
      </form>
      {mode === 'login' && (
        <div className="redirectLink">
          Don't have account yet.{' '}
          <Link className="link" href="/auth?mode=signup">
            Create new account.
          </Link>
        </div>
      )}
      {mode === 'signup' && (
        <div className="redirectLink">
          You already have an account.{' '}
          <Link className="link" href="/auth?mode=login">
            Login here.
          </Link>
        </div>
      )}
    </div>
  );
};

export default AuthForm;
