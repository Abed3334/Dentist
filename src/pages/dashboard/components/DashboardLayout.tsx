import { useState, useRef, useEffect, ReactNode } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
    { icon: 'ri-settings-3-line', label: 'Settings', path: '/dashboard/settings' }
  ];

  return (
    <div className="min-h-screen bg-[#F7FAFC] flex">
      {/* Sidebar */}
      <aside
        className={`
          ${sidebarOpen ? 'w-64' : 'w-20'} 
          bg-[#0B1F3B] transition-all duration-300 flex flex-col 
          fixed h-full z-30
        `}
      >
        <div className="p-6 flex items-center justify-between">
          {sidebarOpen && (
            <div className="flex items-center gap-2">
              <img
                src="https://public.readdy.ai/ai/img_res/36c4f334-3c41-4aab-914a-d6196bb4adcf.png"
                alt="Dentest Logo"
                className="h-8 w-8 object-contain brightness-0 invert"
              />
              <span className="text-xl font-bold text-white">Dentest</span>
            </div>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-white hover:bg-white/10 p-2 rounded-lg transition-colors duration-200 cursor-pointer"
          >
            <i className={`ri-${sidebarOpen ? 'menu-fold' : 'menu-unfold'}-line text-xl`}></i>
          </button>
        </div>

        <nav className="flex-1 px-3 py-6 overflow-y-auto">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all 
                    duration-200 cursor-pointer 
                    ${location.pathname === item.path
                      ? 'bg-[#0F766E] text-white'
                      : 'text-white/70 hover:bg-white/10 hover:text-white'}
                  `}
                >
                  <i className={`${item.icon} text-xl w-6 h-6 flex items-center justify-center`}></i>
                  {sidebarOpen && <span className="font-medium whitespace-nowrap">{item.label}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-white/10">
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-3 text-white/70 hover:bg-white/10 hover:text-white rounded-xl transition-all duration-200 cursor-pointer"
          >
            <i className="ri-logout-box-line text-xl w-6 h-6 flex items-center justify-center"></i>
            {sidebarOpen && <span className="font-medium whitespace-nowrap">Logout</span>}
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`flex-1 flex flex-col ${sidebarOpen ? 'ml-64' : 'ml-20'} transition-all duration-300`}>
        {/* Top Bar */}
        <header className="bg-white border-b border-[#E5E7EB] px-8 py-4 sticky top-0 z-20">
          <div className="flex items-center justify-between">
            <div className="flex-1 max-w-xl">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <i className="ri-search-line text-[#6B7280] text-lg"></i>
                </div>
                <input
                  type="text"
                  placeholder="Search patients, appointments..."
                  className="w-full pl-12 pr-4 py-3 border-2 border-[#E5E7EB] rounded-xl focus:border-[#0F766E] focus:outline-none transition-colors duration-200 text-sm"
                />
              </div>
            </div>

            <div className="flex items-center gap-4 ml-6">
              <button className="relative p-2 text-[#6B7280] hover:text-[#0F766E] hover:bg-[#F0FDF9] rounded-lg transition-all duration-200 cursor-pointer">
                <i className="ri-notification-3-line text-2xl"></i>
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className={`flex items-center gap-3 p-2 rounded-xl transition-all duration-200 cursor-pointer ${profileOpen ? 'bg-[#F0FDF9]' : 'hover:bg-[#F0FDF9]'}`}
                >
                  <img
                    src="https://readdy.ai/api/search-image?query=Professional%20portrait%20of%20confident%20medical%20administrator%20or%20doctor%20in%20white%20coat%2C%20clean%20white%20background%2C%20friendly%20smile%2C%20modern%20healthcare%20professional%20headshot&width=80&height=80&seq=admin-profile&orientation=squarish"
                    alt="Admin"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="text-left">
                    <p className="text-sm font-semibold text-[#111827] whitespace-nowrap">Dr. Admin</p>
                    <p className="text-xs text-[#6B7280] whitespace-nowrap">Administrator</p>
                  </div>
                  <i className={`ri-arrow-down-s-line text-[#6B7280] transition-transform duration-200 ${profileOpen ? 'rotate-180' : ''}`}></i>
                </button>

                {profileOpen && (
                  <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-lg border border-[#E5E7EB] py-2 z-50 animate-fade-in">
                    <div className="px-4 py-3 border-b border-[#E5E7EB]">
                      <p className="text-sm font-semibold text-[#111827]">Dr. Admin</p>
                      <p className="text-xs text-[#6B7280]">admin@dentest.com</p>
                    </div>
                    <div className="py-1">
                      <button
                        onClick={() => { setProfileOpen(false); navigate('/dashboard/settings'); }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-[#374151] hover:bg-[#F0FDF9] hover:text-[#0F766E] transition-colors duration-150 cursor-pointer"
                      >
                        <i className="ri-settings-3-line text-lg w-5 h-5 flex items-center justify-center"></i>
                        <span className="whitespace-nowrap">Settings</span>
                      </button>
                      <button
                        onClick={() => { setProfileOpen(false); navigate('/profile'); }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-[#374151] hover:bg-[#F0FDF9] hover:text-[#0F766E] transition-colors duration-150 cursor-pointer"
                      >
                        <i className="ri-user-line text-lg w-5 h-5 flex items-center justify-center"></i>
                        <span className="whitespace-nowrap">My Profile</span>
                      </button>
                      <button
                        onClick={() => { setProfileOpen(false); navigate('/dashboard/messages'); }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-[#374151] hover:bg-[#F0FDF9] hover:text-[#0F766E] transition-colors duration-150 cursor-pointer"
                      >
                        <i className="ri-message-3-line text-lg w-5 h-5 flex items-center justify-center"></i>
                        <span className="whitespace-nowrap">Messages</span>
                      </button>
                    </div>
                    <div className="border-t border-[#E5E7EB] py-1">
                      <button
                        onClick={() => { setProfileOpen(false); navigate('/'); }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-[#DC2626] hover:bg-[#FEF2F2] transition-colors duration-150 cursor-pointer"
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

        {/* Page Content */}
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
