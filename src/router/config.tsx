import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

const HomePage = lazy(() => import('../pages/home/page'));
const LoginPage = lazy(() => import('../pages/auth/login/page'));
const RegisterPage = lazy(() => import('../pages/auth/register/page'));
const DashboardPage = lazy(() => import('../pages/dashboard/page'));
const PatientsPage = lazy(() => import('../pages/dashboard/patients/page'));
const AppointmentsPage = lazy(() => import('../pages/dashboard/appointments/page'));
const DoctorsPage = lazy(() => import('../pages/dashboard/doctors/page'));
const ServicesPage = lazy(() => import('../pages/dashboard/services/page'));
const PaymentsPage = lazy(() => import('../pages/dashboard/payments/page'));
const MessagesPage = lazy(() => import('../pages/dashboard/messages/page'));
const SettingsPage = lazy(() => import('../pages/dashboard/settings/page'));
const AnalyticsPage = lazy(() => import('../pages/dashboard/analytics/page'));
const InventoryPage = lazy(() => import('../pages/dashboard/inventory/page'));
const BookAppointmentPage = lazy(() => import('../pages/user/book-appointment/page'));
const MyAppointmentsPage = lazy(() => import('../pages/user/my-appointments/page'));
const ProfilePage = lazy(() => import('../pages/user/profile/page'));
const ReviewsPage = lazy(() => import('../pages/user/reviews/page'));
const ContactPage = lazy(() => import('../pages/contact/page'));
const NotFoundPage = lazy(() => import('../pages/NotFound'));

const routes: RouteObject[] = [
  {
    path: '/',
    element: <HomePage />
  },
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path: '/register',
    element: <RegisterPage />
  },
  {
    path: '/book-appointment',
    element: <BookAppointmentPage />
  },
  {
    path: '/my-appointments',
    element: <MyAppointmentsPage />
  },
  {
    path: '/profile',
    element: <ProfilePage />
  },
  {
    path: '/reviews',
    element: <ReviewsPage />
  },
  {
    path: '/contact',
    element: <ContactPage />
  },
  {
    path: '/dashboard',
    element: <DashboardPage />
  },
  {
    path: '/dashboard/patients',
    element: <PatientsPage />
  },
  {
    path: '/dashboard/appointments',
    element: <AppointmentsPage />
  },
  {
    path: '/dashboard/doctors',
    element: <DoctorsPage />
  },
  {
    path: '/dashboard/services',
    element: <ServicesPage />
  },
  {
    path: '/dashboard/payments',
    element: <PaymentsPage />
  },
  {
    path: '/dashboard/messages',
    element: <MessagesPage />
  },
  {
    path: '/dashboard/settings',
    element: <SettingsPage />
  },
  {
    path: '/dashboard/analytics',
    element: <AnalyticsPage />
  },
  {
    path: '/dashboard/inventory',
    element: <InventoryPage />
  },
  {
    path: '*',
    element: <NotFoundPage />
  }
];

export default routes;
