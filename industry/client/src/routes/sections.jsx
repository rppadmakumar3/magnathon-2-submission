import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import ListingsPage from 'src/pages/listings';
import DashboardLayout from 'src/layouts/dashboard';

import { OrderView } from 'src/sections/orders/view';
import { ResourcesView } from 'src/sections/blog/view';
import { BiddingsView } from 'src/sections/biddings/view';
import { AnalyticsView } from 'src/sections/analytics/view';
import { Chat } from 'src/sections/chat';
import { SettingsPage } from 'src/sections/settings/Settings';
import { SignupView } from 'src/sections/signup';
import { LoginView } from 'src/sections/login';
import { LandingApp } from 'src/sections/landingpage';
import { AuctionsView } from 'src/sections/auctions/view';
import { PaymentView } from 'src/sections/payments/view';


export const IndexPage = lazy(() => import('src/pages/app'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const UserPage = lazy(() => import('src/pages/listings'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const ProductsPage = lazy(() => import('src/pages/biddings'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: 'signup',
      element: <SignupView />,
    },
    {
      element: (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { path: '/', element: <Navigate to="/signup" replace /> },
        { path: 'dashboard', element: <IndexPage /> },
        { path: 'listings', element: <ListingsPage /> },
        { path: 'biddings', element: <BiddingsView /> },
        { path: 'orders', element: <OrderView /> },
        { path: 'resources', element: <ResourcesView /> },
        { path: 'analytics', element: <AnalyticsView /> },
        { path: 'chat', element: <Chat /> },
        { path: 'settings', element: <SettingsPage /> },
        { path: 'auctions', element: <AuctionsView /> },
        { path: 'payments', element: <PaymentView /> },
      ],
    },
    {
      path: 'login',
      element: <LoginView />,
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
    {
      path: 'landing',
      element: < LandingApp/>,
    },
  ]);

  return routes;
}
