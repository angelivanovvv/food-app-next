import react from 'react';

import { Link } from '@/libs/next';
import { SubmitButton } from '@/components';

import classes from '@/styles/authForm.module.css';

import type { iProps } from './page.types';

const LoginPage: react.FC<iProps> = function () {
  return (
    <div className={classes.formContainer}>
      <form className={classes.form} action="#">
        <h1 className={classes.pageTitle}>Login</h1>
        <div className={classes.row}>
          <label htmlFor="email">Email</label>
          <input type="text" id="email" name="email" required />
        </div>
        <div className={classes.row}>
          <label htmlFor="password">Password</label>
          <input type="text" id="password" name="password" required />
        </div>
      </form>
      <div className={classes.btnGroup}>
        <SubmitButton defaultText="Login" loadingText="Loading..." />
      </div>
      <div className="redirectLink">
        Don't have account yet.{' '}
        <Link className="link" href="/signup">
          Create new account.
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
