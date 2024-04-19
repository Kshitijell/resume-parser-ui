import { lazy } from 'react';
import { Outlet } from 'react-router-dom';
import CompactLayout from 'src/layouts/compact';

const NotFoundView = lazy(() => import('src/pages/error/not-found-view'));

export const mainRoutes = [
  {
    element: (
      <CompactLayout>
        <Outlet />
      </CompactLayout>
    ),
    children: [{ path: '404', element: <NotFoundView /> }],
  },
];
