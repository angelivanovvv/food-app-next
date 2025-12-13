'use client';

import React from 'react';
import { useFormStatus } from 'react-dom';

import classes from './SubmitButton.module.css';

import type { iProps } from './SubmitButton.types';

const SubmitButton: React.FC<iProps> = function ({
  loadingText = 'Submitting...',
  defaultText = 'Submit',
}) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className={classes.button}>
      {pending ? loadingText : defaultText}
    </button>
  );
};

export default SubmitButton;
