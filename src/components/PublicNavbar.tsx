import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LOGO_SRC } from '@/constants/assets';

const navItems = [
  { to: '/services', label: 'Services' },
  { to: '/about', label: 'About' },
  { to: '/testimonials', label: 'Testimonials' },
  { to: '/contact', label: 'Contact' },
] as const;

export default function PublicNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const closeMobile = () => setMobileMenuOpen(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-sm z-50">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-2">
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <img
              src={LOGO_SRC}
              alt="Dentist Logo"
              className="h-8 w-8 sm:h-10 sm:w-10 object-contain"
            />
            <span className="text-xl sm:text-2xl font-bold text-[#0B1F3B]">Dentist</span>
          </Link>

          <div className="hidden md:flex items-center gap-8 lg:gap-10">
            {navItems.map(({ to, label }) => {
              const active = location.pathname === to;
              return (
                <Link
                  key={to}
                  to={to}
                  className={`font-medium cursor-pointer transition-colors duration-200 ${
                    active ? 'text-[#0F766E]' : 'text-[#6B7280] hover:text-[#0F766E]'
                  }`}
                >
                  {label}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <Link
              to="/login"
              className="hidden sm:inline-flex px-4 sm:px-6 py-2.5 sm:py-3 border-2 border-[#0F766E] text-[#0F766E] rounded-full text-sm font-medium hover:bg-[#0F766E] hover:text-white transition-all duration-200 whitespace-nowrap cursor-pointer min-h-[44px] items-center justify-center"
            >
              Login
            </Link>
            <Link
              to="/book-appointment"
              className="px-4 sm:px-6 py-2.5 sm:py-3 bg-[#0F766E] text-white rounded-full text-sm font-medium hover:bg-[#0B5B54] hover:shadow-lg transition-all duration-200 whitespace-nowrap cursor-pointer min-h-[44px] flex items-center justify-center"
            >
              Book
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-[#0B1F3B] hover:bg-[#F0FDF9] cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
            >
              <i className={mobileMenuOpen ? 'ri-close-line text-2xl' : 'ri-menu-line text-2xl'} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu – side drawer */}
      <div className="md:hidden fixed inset-0 z-40 pointer-events-none">
        <div
          className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${
            mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0'
          }`}
          onClick={closeMobile}
          aria-hidden="true"
        />
        <div
          className={`fixed top-0 left-0 h-full w-[min(280px,85vw)] max-w-[280px] bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-out ${
            mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          } ${mobileMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
          role="dialog"
          aria-label="Mobile menu"
        >
          <div className="flex items-center justify-between px-4 h-16 border-b border-[#E5E7EB] shrink-0">
            <Link to="/" onClick={closeMobile} className="flex items-center gap-2">
              <img src={LOGO_SRC} alt="Dentist Logo" className="h-8 w-8 object-contain" />
              <span className="text-xl font-bold text-[#0B1F3B]">Dentist</span>
            </Link>
            <button
              type="button"
              onClick={closeMobile}
              className="p-2 -mr-2 text-[#6B7280] hover:bg-[#F0FDF9] rounded-lg cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Close menu"
            >
              <i className="ri-close-line text-2xl" />
            </button>
          </div>
          <div className="px-4 py-4 space-y-1 overflow-y-auto">
            {navItems.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                onClick={closeMobile}
                className={`block py-3 px-2 font-medium cursor-pointer ${
                  location.pathname === to ? 'text-[#0F766E]' : 'text-[#6B7280] hover:text-[#0F766E]'
                }`}
              >
                {label}
              </Link>
            ))}
            <div className="border-t border-[#E5E7EB] my-3" />
            <Link
              to="/login"
              onClick={closeMobile}
              className="block py-3 px-2 text-[#6B7280] hover:text-[#0F766E] font-medium cursor-pointer"
            >
              Login
            </Link>
            <Link
              to="/book-appointment"
              onClick={closeMobile}
              className="block py-3.5 px-2 bg-[#0F766E] text-white rounded-xl text-center font-medium cursor-pointer"
            >
              Book Appointment
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
