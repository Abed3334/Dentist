
import * as React from 'react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface UserLayoutProps {
  children: React.ReactNode;
}

export default function UserLayout({ children }: UserLayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { icon: 'ri-calendar-check-line', label: 'Book Appointment', path: '/book-appointment' },
    { icon: 'ri-file-list-3-line', label: 'My Appointments', path: '/my-appointments' },
    { icon: 'ri-user-line', label: 'Profile', path: '/profile' },
    { icon: 'ri-star-line', label: 'Reviews', path: '/reviews' },
  ];

  // Simple safeguard: ensure navItems is an array before mapping
  if (!Array.isArray(navItems)) {
    console.error('navItems should be an array');
    return null;
  }

  return (
    <div className="min-h-screen bg-[#F7FAFC]">
      {/* Top Navigation */}
      <nav className="bg-white border-b border-[#E5E7EB] sticky top-0 z-50">
        <div className="max-w-[1280px] mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 cursor-pointer">
            <img
              src="https://public.readdy.ai/ai/img_res/36c4f334-3c41-4aab-914a-d6196bb4adcf.png"
              alt="Dentest Logo"
              className="h-8 w-8 object-contain"
            />
            <span className="text-xl font-bold text-[#0B1F3B]">Dentest</span>
          </Link>

          {/* Desktop Nav */}
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
            <button className="relative p-2 text-[#6B7280] hover:text-[#0F766E] hover:bg-[#F0FDF9] rounded-lg transition-all duration-200 cursor-pointer">
              <i className="ri-notification-3-line text-xl"></i>
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <Link to="/profile" className="flex items-center gap-2 cursor-pointer">
              <img
                src="https://readdy.ai/api/search-image?query=Professional%20headshot%20portrait%20of%20young%20woman%20with%20friendly%20smile%2C%20clean%20white%20background%2C%20modern%20professional%20photo&width=80&height=80&seq=patient-1&orientation=squarish"
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

        {/* Mobile Menu */}
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
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-[#6B7280] hover:text-red-500 hover:bg-red-50 transition-all duration-200 cursor-pointer"
            >
              <i className="ri-logout-box-line w-5 h-5 flex items-center justify-center"></i>
              Logout
            </Link>
          </div>
        )}
      </nav>

      <main className="max-w-[1280px] mx-auto px-6 py-8">{children}</main>
    </div>
  );
}
