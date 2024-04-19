import { Navigate, useRoutes } from 'react-router-dom';
import { mainRoutes } from './main';
import { authRoutes } from './auth';
import { DashboardRoutes} from './dashboard';

export default function Router() {
  return useRoutes([
    ...authRoutes,

    ...DashboardRoutes(),

    ...mainRoutes,

    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
