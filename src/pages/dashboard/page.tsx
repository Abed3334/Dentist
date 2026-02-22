import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState('overview');
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
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
    { id: 'overview', icon: 'ri-dashboard-line', label: 'Overview' },
    { id: 'patients', icon: 'ri-user-line', label: 'Patients' },
    { id: 'appointments', icon: 'ri-calendar-line', label: 'Appointments' },
    { id: 'doctors', icon: 'ri-stethoscope-line', label: 'Doctors' },
    { id: 'services', icon: 'ri-service-line', label: 'Services' },
    { id: 'payments', icon: 'ri-money-dollar-circle-line', label: 'Payments' },
    { id: 'messages', icon: 'ri-message-3-line', label: 'Messages' },
    { id: 'settings', icon: 'ri-settings-3-line', label: 'Settings' }
  ];

  const kpiData = [
    { label: "Today's Appointments", value: '24', change: '+12%', icon: 'ri-calendar-check-line', color: 'bg-[#0F766E]' },
    { label: 'New Patients', value: '8', change: '+5%', icon: 'ri-user-add-line', color: 'bg-[#A7F3D0]' },
    { label: 'Revenue', value: '$12,450', change: '+18%', icon: 'ri-money-dollar-circle-line', color: 'bg-[#0B1F3B]' },
    { label: 'Cancellations', value: '3', change: '-2%', icon: 'ri-close-circle-line', color: 'bg-[#6B7280]' }
  ];

  const appointments = [
    { id: 1, patient: 'Sarah Johnson', time: '09:00 AM', service: 'Teeth Cleaning', doctor: 'Dr. Smith', status: 'confirmed' },
    { id: 2, patient: 'Michael Chen', time: '10:30 AM', service: 'Dental Implant', doctor: 'Dr. Williams', status: 'in-progress' },
    { id: 3, patient: 'Emily Davis', time: '11:00 AM', service: 'Teeth Whitening', doctor: 'Dr. Brown', status: 'confirmed' },
    { id: 4, patient: 'James Wilson', time: '02:00 PM', service: 'Braces Adjustment', doctor: 'Dr. Johnson', status: 'pending' },
    { id: 5, patient: 'Lisa Anderson', time: '03:30 PM', service: 'Root Canal', doctor: 'Dr. Smith', status: 'confirmed' },
    { id: 6, patient: 'Robert Taylor', time: '04:00 PM', service: 'Dental Checkup', doctor: 'Dr. Williams', status: 'confirmed' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-[#A7F3D0] text-[#0F766E]';
      case 'in-progress': return 'bg-[#FEF3C7] text-[#D97706]';
      case 'pending': return 'bg-[#E5E7EB] text-[#6B7280]';
      default: return 'bg-[#E5E7EB] text-[#6B7280]';
    }
  };

  return (
    <div className="min-h-screen bg-[#F7FAFC] flex">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-[#0B1F3B] transition-all duration-300 flex flex-col`}>
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

        <nav className="flex-1 px-3 py-6">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => setActiveMenu(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 cursor-pointer ${
                    activeMenu === item.id
                      ? 'bg-[#0F766E] text-white'
                      : 'text-white/70 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <i className={`${item.icon} text-xl w-6 h-6 flex items-center justify-center`}></i>
                  {sidebarOpen && <span className="font-medium whitespace-nowrap">{item.label}</span>}
                </button>
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
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="bg-white border-b border-[#E5E7EB] px-8 py-4">
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

        {/* Dashboard Content */}
        <main className="flex-1 p-8 overflow-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-[#0B1F3B] mb-2">Dashboard Overview</h1>
            <p className="text-[#6B7280]">Welcome back! Here's what's happening today.</p>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {kpiData.map((kpi, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-[#E5E7EB] hover:shadow-lg transition-shadow duration-200">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 ${kpi.color} rounded-xl flex items-center justify-center`}>
                    <i className={`${kpi.icon} text-2xl text-white`}></i>
                  </div>
                  <span className={`text-sm font-semibold px-2 py-1 rounded-full ${
                    kpi.change.startsWith('+') ? 'bg-[#A7F3D0] text-[#0F766E]' : 'bg-[#FEE2E2] text-[#DC2626]'
                  }`}>
                    {kpi.change}
                  </span>
                </div>
                <h3 className="text-3xl font-bold text-[#111827] mb-1">{kpi.value}</h3>
                <p className="text-sm text-[#6B7280]">{kpi.label}</p>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Appointments Table */}
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-[#E5E7EB]">
              <div className="p-6 border-b border-[#E5E7EB] flex items-center justify-between">
                <h2 className="text-xl font-bold text-[#0B1F3B]">Today's Appointments</h2>
                <button className="px-4 py-2 text-sm font-medium text-[#0F766E] hover:bg-[#F0FDF9] rounded-lg transition-all duration-200 whitespace-nowrap cursor-pointer">
                  View All
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#F7FAFC]">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-[#6B7280] uppercase tracking-wider whitespace-nowrap">Patient</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-[#6B7280] uppercase tracking-wider whitespace-nowrap">Time</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-[#6B7280] uppercase tracking-wider whitespace-nowrap">Service</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-[#6B7280] uppercase tracking-wider whitespace-nowrap">Doctor</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-[#6B7280] uppercase tracking-wider whitespace-nowrap">Status</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-[#6B7280] uppercase tracking-wider whitespace-nowrap">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E5E7EB]">
                    {appointments.map((apt) => (
                      <tr key={apt.id} className="hover:bg-[#F7FAFC] transition-colors duration-200">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-medium text-[#111827]">{apt.patient}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-[#6B7280]">{apt.time}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-[#111827]">{apt.service}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-[#6B7280]">{apt.doctor}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(apt.status)} whitespace-nowrap`}>
                            {apt.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button className="text-[#0F766E] hover:text-[#0B5B54] cursor-pointer">
                            <i className="ri-more-2-fill text-xl"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Calendar & Quick Actions */}
            <div className="space-y-6">
              {/* Calendar Widget */}
              <div className="bg-white rounded-2xl shadow-sm border border-[#E5E7EB] p-6">
                <h3 className="text-lg font-bold text-[#0B1F3B] mb-4">Calendar</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <button className="p-2 hover:bg-[#F0FDF9] rounded-lg transition-colors duration-200 cursor-pointer">
                      <i className="ri-arrow-left-s-line text-[#6B7280]"></i>
                    </button>
                    <span className="font-semibold text-[#111827] whitespace-nowrap">January 2025</span>
                    <button className="p-2 hover:bg-[#F0FDF9] rounded-lg transition-colors duration-200 cursor-pointer">
                      <i className="ri-arrow-right-s-line text-[#6B7280]"></i>
                    </button>
                  </div>
                  <div className="grid grid-cols-7 gap-2 text-center text-xs">
                    {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
                      <div key={day} className="font-semibold text-[#6B7280] py-2">{day}</div>
                    ))}
                    {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                      <button
                        key={day}
                        className={`py-2 rounded-lg hover:bg-[#F0FDF9] transition-colors duration-200 cursor-pointer ${
                          day === 15 ? 'bg-[#0F766E] text-white font-semibold' : 'text-[#111827]'
                        }`}
                      >
                        {day}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-2xl shadow-sm border border-[#E5E7EB] p-6">
                <h3 className="text-lg font-bold text-[#0B1F3B] mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button className="w-full flex items-center gap-3 px-4 py-3 bg-[#0F766E] text-white rounded-xl hover:bg-[#0B5B54] transition-all duration-200 cursor-pointer">
                    <i className="ri-add-line text-xl w-6 h-6 flex items-center justify-center"></i>
                    <span className="font-medium whitespace-nowrap">New Appointment</span>
                  </button>
                  <button className="w-full flex items-center gap-3 px-4 py-3 border-2 border-[#E5E7EB] text-[#111827] rounded-xl hover:border-[#0F766E] hover:bg-[#F0FDF9] transition-all duration-200 cursor-pointer">
                    <i className="ri-user-add-line text-xl w-6 h-6 flex items-center justify-center"></i>
                    <span className="font-medium whitespace-nowrap">Add Patient</span>
                  </button>
                  <button className="w-full flex items-center gap-3 px-4 py-3 border-2 border-[#E5E7EB] text-[#111827] rounded-xl hover:border-[#0F766E] hover:bg-[#F0FDF9] transition-all duration-200 cursor-pointer">
                    <i className="ri-file-text-line text-xl w-6 h-6 flex items-center justify-center"></i>
                    <span className="font-medium whitespace-nowrap">Generate Report</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}