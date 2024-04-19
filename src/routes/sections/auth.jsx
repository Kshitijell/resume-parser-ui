import { Suspense, lazy } from 'react';
import { SplashScreen } from 'src/components/loading-screen';
import AuthModernLayout from 'src/layouts/auth/morden';

const LoginPage = lazy(() => import('src/pages/auth/Login'));

export const authRoutes = [
  {
    path: 'login',
    element: (
      <AuthModernLayout>
        <Suspense fallback={<SplashScreen />}>
          <LoginPage />
        </Suspense>
      </AuthModernLayout>
    ),
  },
];
