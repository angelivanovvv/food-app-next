import { ReactNode } from 'react';

export interface iProps {
  children: ReactNode;
  fallback?: ReactNode;
  className?: string;
}
