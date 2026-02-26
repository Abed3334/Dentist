import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LOGO_SRC } from '@/constants/assets';

interface UserLayoutProps {
  children: React.ReactNode;
}

const navItems = [
  { icon: 'ri-calendar-check-line', label: 'Book Appointment', path: '/book-appointment' },
  { icon: 'ri-file-list-3-line', label: 'My Appointments', path: '/my-appointments' },
  { icon: 'ri-user-line', label: 'Profile', path: '/profile' },
  { icon: 'ri-star-line', label: 'Reviews', path: '/reviews' },
];

export default function UserLayout({ children }: UserLayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[#F7FAFC]">
      <nav className="bg-white border-b border-[#E5E7EB] sticky top-0 z-50">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 cursor-pointer">
            <img src={LOGO_SRC} alt="Dentist Logo" className="h-8 w-8 object-contain" />
            <span className="text-xl font-bold text-[#0B1F3B]">Dentist</span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer whitespace-nowrap ${
                  location.pathname === item.path
                    ? 'bg-[#0F766E]/10 text-[#0F766E]'
                    : 'text-[#6B7280] hover:text-[#0F766E] hover:bg-[#F0FDF9]'
                }`}
              >
                <i className={`${item.icon} w-5 h-5 flex items-center justify-center`}></i>
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Link to="/profile" className="flex items-center gap-2 cursor-pointer">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face"
                alt="User"
                className="w-9 h-9 rounded-full object-cover border-2 border-[#E5E7EB]"
              />
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#6B7280] hover:text-[#0F766E] rounded-lg cursor-pointer"
            >
              <i className={`${mobileMenuOpen ? 'ri-close-line' : 'ri-menu-line'} text-xl`}></i>
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[#E5E7EB] bg-white px-4 py-3 space-y-1 animate-slide-up">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${
                  location.pathname === item.path
                    ? 'bg-[#0F766E]/10 text-[#0F766E]'
                    : 'text-[#6B7280] hover:text-[#0F766E] hover:bg-[#F0FDF9]'
                }`}
              >
                <i className={`${item.icon} w-5 h-5 flex items-center justify-center`}></i>
                {item.label}
              </Link>
            ))}
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-[#6B7280] hover:text-red-500 hover:bg-red-50 transition-colors duration-200 cursor-pointer"
            >
              <i className="ri-logout-box-line w-5 h-5 flex items-center justify-center"></i>
              Logout
            </Link>
          </div>
        )}
      </nav>

      <main className="max-w-[1280px] mx-auto px-4 sm:px-6 py-6 sm:py-8">{children}</main>
    </div>
  );
}
