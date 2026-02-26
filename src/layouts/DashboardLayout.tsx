import { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { LOGO_SRC } from '@/constants/assets';

const menuItems = [
  { icon: 'ri-dashboard-line', label: 'Overview', path: '/dashboard' },
  { icon: 'ri-user-line', label: 'Patients', path: '/dashboard/patients' },
  { icon: 'ri-calendar-check-line', label: 'Appointments', path: '/dashboard/appointments' },
  { icon: 'ri-stethoscope-line', label: 'Doctors', path: '/dashboard/doctors' },
  { icon: 'ri-service-line', label: 'Services', path: '/dashboard/services' },
  { icon: 'ri-money-dollar-circle-line', label: 'Payments', path: '/dashboard/payments' },
  { icon: 'ri-message-3-line', label: 'Messages', path: '/dashboard/messages' },
  { icon: 'ri-bar-chart-box-line', label: 'Analytics', path: '/dashboard/analytics' },
  { icon: 'ri-archive-line', label: 'Inventory', path: '/dashboard/inventory' },
  { icon: 'ri-settings-3-line', label: 'Settings', path: '/dashboard/settings' },
];

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const closeMobileMenu = () => setMobileMenuOpen(false);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  return (
    <div className="min-h-screen bg-background flex">
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={closeMobileMenu}
          aria-hidden
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 h-full z-50 bg-navy flex flex-col transition-all duration-300 ease-out w-64
          ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
          ${sidebarOpen ? 'lg:w-64' : 'lg:w-20'}
        `}
      >
        <div className="p-4 lg:p-6 flex items-center justify-between shrink-0">
          {(sidebarOpen || mobileMenuOpen) && (
            <div className="flex items-center gap-2 min-w-0">
              <img
                src={LOGO_SRC}
                alt="Dentist Logo"
                className="h-8 w-8 object-contain brightness-0 invert shrink-0"
              />
              <span className="text-xl font-bold text-white truncate">Dentist</span>
            </div>
          )}
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="hidden lg:flex text-white hover:bg-white/10 p-2 rounded-lg transition-colors duration-200 cursor-pointer"
              aria-label="Toggle sidebar"
            >
              <i className={`ri-${sidebarOpen ? 'menu-fold' : 'menu-unfold'}-line text-xl`}></i>
            </button>
            <button
              type="button"
              onClick={closeMobileMenu}
              className="lg:hidden text-white hover:bg-white/10 p-2 rounded-lg transition-colors duration-200 cursor-pointer"
              aria-label="Close menu"
            >
              <i className="ri-close-line text-xl"></i>
            </button>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 lg:py-6 overflow-y-auto">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  onClick={closeMobileMenu}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all
                    duration-200 cursor-pointer
                    ${location.pathname === item.path
                      ? 'bg-primary text-white'
                      : 'text-white/70 hover:bg-white/10 hover:text-white'}
                  `}
                >
                  <i className={`${item.icon} text-xl w-6 h-6 flex items-center justify-center shrink-0`}></i>
                  {(sidebarOpen || mobileMenuOpen) && <span className="font-medium whitespace-nowrap">{item.label}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-white/10">
          <Link
            to="/"
            onClick={closeMobileMenu}
            className="flex items-center gap-3 px-4 py-3 text-white/70 hover:bg-white/10 hover:text-white rounded-xl transition-all duration-200 cursor-pointer"
          >
            <i className="ri-logout-box-line text-xl w-6 h-6 flex items-center justify-center shrink-0"></i>
            <span className="font-medium whitespace-nowrap">Logout</span>
          </Link>
        </div>
      </aside>

      <div className={`flex-1 flex flex-col min-w-0 w-full transition-all duration-300 ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-20'}`}>
        <header className="bg-card border-b border-border px-4 sm:px-6 lg:px-8 py-3 sm:py-4 sticky top-0 z-20">
          <div className="flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 -ml-1 text-muted hover:text-primary hover:bg-teal-tint rounded-lg transition-colors cursor-pointer"
              aria-label="Open menu"
            >
              <i className="ri-menu-line text-2xl"></i>
            </button>
            <div className="flex-1 min-w-0 max-w-xl hidden sm:block">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <i className="ri-search-line text-muted text-lg"></i>
                </div>
                <input
                  type="text"
                  placeholder="Search patients, appointments..."
                  aria-label="Search patients, appointments"
                  className="w-full pl-12 pr-4 py-2.5 sm:py-3 border-2 border-border rounded-xl focus:border-primary focus:outline-none transition-colors duration-200 text-sm"
                />
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-4 shrink-0">
              <button
                type="button"
                className="relative p-2 text-muted hover:text-primary hover:bg-teal-tint rounded-lg transition-all duration-200 cursor-pointer"
                aria-label="Notifications"
              >
                <i className="ri-notification-3-line text-2xl"></i>
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              <div className="relative" ref={profileRef}>
                <button
                  type="button"
                  onClick={() => setProfileOpen(!profileOpen)}
                  className={`flex items-center gap-3 p-2 rounded-xl transition-all duration-200 cursor-pointer ${profileOpen ? 'bg-teal-tint' : 'hover:bg-teal-tint'}`}
                  aria-label="Open profile menu"
                >
                  <img
                    src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=80&h=80&fit=crop&crop=face"
                    alt="Admin"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="text-left min-w-0 hidden sm:block">
                    <p className="text-sm font-semibold text-text truncate">Dr. Admin</p>
                    <p className="text-xs text-muted truncate">Administrator</p>
                  </div>
                  <i className={`ri-arrow-down-s-line text-muted transition-transform duration-200 ${profileOpen ? 'rotate-180' : ''}`}></i>
                </button>

                {profileOpen && (
                  <div className="absolute right-0 top-full mt-2 w-56 bg-card rounded-xl shadow-lg border border-border py-2 z-50 animate-fade-in">
                    <div className="px-4 py-3 border-b border-border">
                      <p className="text-sm font-semibold text-text">Dr. Admin</p>
                      <p className="text-xs text-muted">admin@dentist.com</p>
                    </div>
                    <div className="py-1">
                      <button
                        type="button"
                        onClick={() => { setProfileOpen(false); navigate('/dashboard/settings'); }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-text hover:bg-teal-tint hover:text-primary transition-colors duration-150 cursor-pointer"
                      >
                        <i className="ri-settings-3-line text-lg w-5 h-5 flex items-center justify-center"></i>
                        <span className="whitespace-nowrap">Settings</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => { setProfileOpen(false); navigate('/profile'); }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-text hover:bg-teal-tint hover:text-primary transition-colors duration-150 cursor-pointer"
                      >
                        <i className="ri-user-line text-lg w-5 h-5 flex items-center justify-center"></i>
                        <span className="whitespace-nowrap">My Profile</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => { setProfileOpen(false); navigate('/dashboard/messages'); }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-text hover:bg-teal-tint hover:text-primary transition-colors duration-150 cursor-pointer"
                      >
                        <i className="ri-message-3-line text-lg w-5 h-5 flex items-center justify-center"></i>
                        <span className="whitespace-nowrap">Messages</span>
                      </button>
                    </div>
                    <div className="border-t border-border py-1">
                      <button
                        type="button"
                        onClick={() => { setProfileOpen(false); navigate('/'); }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors duration-150 cursor-pointer"
                      >
                        <i className="ri-logout-box-line text-lg w-5 h-5 flex items-center justify-center"></i>
                        <span className="whitespace-nowrap">Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
