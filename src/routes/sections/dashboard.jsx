import { Suspense, lazy } from 'react';
import { Outlet } from 'react-router-dom';
import { AuthGuard } from 'src/auth/guard';
import DashboardLayout from 'src/layouts/dashboard';
import { LoadingScreen } from 'src/components/loading-screen';

const ResumeParser = lazy(() => import('src/pages/dashboard/login_main'));
const TableComponent = lazy(() => import('src/pages/dashboard/table'));
const SelectionPage = lazy(() => import('src/pages/selectionwindow/selection_page'));
const PowerAppsPage = lazy(() => import('src/pages/dashboard/power-app-page'));
const ConfigPage = lazy(() => import('src/pages/config/config-page'));
// Import child components for the config route
const UserCreationPage = lazy(() => import('src/pages/config/user'));
const AgencyCreationPage = lazy(() => import('src/pages/config/agency'));
const OrganizationCreationPage = lazy(() => import('src/pages/config/organization'))

export const DashboardRoutes = () => [
  {
    path: '/',
    element: (
      <AuthGuard>
        <DashboardLayout>
          <Suspense fallback={<LoadingScreen />}>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      </AuthGuard>
    ),
    children: [
      {
        path: 'home',
        element: <SelectionPage />,
      },
      {
        path: 'parser',
        element: <PowerAppsPage />,
      },
      {
        path: 'table',
        element: <TableComponent />,
      },
      {
        path: 'ranker',
        element: <ResumeParser />,
      },
      {
        path: 'admin',
        element: <ConfigPage />,
      },
    ],
  },
];
