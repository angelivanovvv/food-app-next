'use client';

import React from 'react';
import { Suspense } from 'react';

import classes from './AppSuspense.module.css';
import type { iProps } from './AppSuspense.types';

const DefaultFallback: React.FC = () => (
  <div>
    <p className={classes.loading}>Loading meals...</p>
  </div>
);

const AppSuspense: React.FC<iProps> = function ({ children, fallback = null, className }) {
  return (
    <Suspense fallback={fallback ?? <DefaultFallback />}>
      <div className={className}>{children}</div>
    </Suspense>
  );
};

export default AppSuspense;
