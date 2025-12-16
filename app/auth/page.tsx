import react from 'react';

import { AuthForm } from '@/components';
import type { iProps } from './page.types';

const LoginPage: react.FC<iProps> = async function ({ searchParams }) {
  const { mode } = await searchParams;
  return <AuthForm mode={mode} />;
};

export default LoginPage;
