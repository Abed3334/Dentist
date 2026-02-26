import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

const PublicLayout = lazy(() => import('../layouts/PublicLayout'));
const DashboardLayout = lazy(() => import('../layouts/DashboardLayout'));
const HomePage = lazy(() => import('../pages/home/page'));
const PublicServicesPage = lazy(() => import('../pages/services/page'));
const AboutPage = lazy(() => import('../pages/about/page'));
const TestimonialsPage = lazy(() => import('../pages/testimonials/page'));
const ContactPage = lazy(() => import('../pages/contact/page'));
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
const NotFoundPage = lazy(() => import('../pages/NotFound'));

const routes: RouteObject[] = [
  {
    path: '/',
    element: <PublicLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'services', element: <PublicServicesPage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'testimonials', element: <TestimonialsPage /> },
      { path: 'contact', element: <ContactPage /> },
    ],
  },
  { path: '/login', element: <LoginPage /> },
  { path: '/register', element: <RegisterPage /> },
  { path: '/book-appointment', element: <BookAppointmentPage /> },
  { path: '/my-appointments', element: <MyAppointmentsPage /> },
  { path: '/profile', element: <ProfilePage /> },
  { path: '/reviews', element: <ReviewsPage /> },
  {
    path: '/dashboard',
    element: <DashboardLayout />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'patients', element: <PatientsPage /> },
      { path: 'appointments', element: <AppointmentsPage /> },
      { path: 'doctors', element: <DoctorsPage /> },
      { path: 'services', element: <ServicesPage /> },
      { path: 'payments', element: <PaymentsPage /> },
      { path: 'messages', element: <MessagesPage /> },
      { path: 'settings', element: <SettingsPage /> },
      { path: 'analytics', element: <AnalyticsPage /> },
      { path: 'inventory', element: <InventoryPage /> },
    ],
  },
  { path: '*', element: <NotFoundPage /> },
];

export default routes;
