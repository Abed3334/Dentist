import { useState } from 'react';
import { useToast } from '@/contexts/ToastContext';

const tabs = [
  { id: 'clinic', label: 'Clinic Profile', icon: 'ri-hospital-line' },
  { id: 'hours', label: 'Working Hours', icon: 'ri-time-line' },
  { id: 'users', label: 'Users & Roles', icon: 'ri-team-line' },
  { id: 'notifications', label: 'Notifications', icon: 'ri-notification-3-line' },
  { id: 'security', label: 'Security', icon: 'ri-shield-check-line' },
];

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const initialHours = [
  { day: 'Monday', open: '08:00', close: '18:00', isOpen: true },
  { day: 'Tuesday', open: '08:00', close: '18:00', isOpen: true },
  { day: 'Wednesday', open: '08:00', close: '18:00', isOpen: true },
  { day: 'Thursday', open: '08:00', close: '18:00', isOpen: true },
  { day: 'Friday', open: '08:00', close: '17:00', isOpen: true },
  { day: 'Saturday', open: '09:00', close: '14:00', isOpen: true },
  { day: 'Sunday', open: '', close: '', isOpen: false },
];

const initialUsers = [
  { id: 1, name: 'Dr. Admin', email: 'admin@dentist.com', role: 'Admin', status: 'active' },
  { id: 2, name: 'Dr. Sarah Smith', email: 'sarah.smith@dentist.com', role: 'Doctor', status: 'active' },
  { id: 3, name: 'Dr. Michael Williams', email: 'michael.williams@dentist.com', role: 'Doctor', status: 'active' },
  { id: 4, name: 'Maria Lopez', email: 'maria.lopez@dentist.com', role: 'Receptionist', status: 'active' },
  { id: 5, name: 'Anna White', email: 'anna.white@dentist.com', role: 'Receptionist', status: 'active' },
  { id: 6, name: 'Dr. Robert Chen', email: 'robert.chen@dentist.com', role: 'Doctor', status: 'inactive' },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('clinic');
  const [mobileTabOpen, setMobileTabOpen] = useState(false);
  const { showToast } = useToast();

  // Clinic Profile
  const [clinicName, setClinicName] = useState('Dentist Dental Clinic');
  const [clinicAddress, setClinicAddress] = useState('123 Medical Center Blvd, Suite 200, New York, NY 10001');
  const [clinicPhone, setClinicPhone] = useState('+1 (555) 000-1234');
  const [clinicEmail, setClinicEmail] = useState('info@dentist.com');
  const [clinicWebsite, setClinicWebsite] = useState('https://dentist.com');

  // Working Hours
  const [workingHours, setWorkingHours] = useState(initialHours);

  // Users
  const [users, setUsers] = useState(initialUsers);
  const [showAddUser, setShowAddUser] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'Receptionist' });

  // Notifications
  const [emailAppt, setEmailAppt] = useState(true);
  const [emailReminder, setEmailReminder] = useState(true);
  const [emailBilling, setEmailBilling] = useState(false);
  const [smsAppt, setSmsAppt] = useState(true);
  const [smsReminder, setSmsReminder] = useState(false);
  const [smsBilling, setSmsBilling] = useState(false);

  // Security
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleSaveClinic = () => showToast('Clinic profile saved');
  const handleSaveHours = () => showToast('Working hours saved');
  const handleSaveNotifications = () => showToast('Notification preferences saved');

  const handleChangePassword = () => {
    setPasswordError('');
    if (!currentPassword) { setPasswordError('Current password is required'); return; }
    if (newPassword.length < 8) { setPasswordError('New password must be at least 8 characters'); return; }
    if (newPassword !== confirmPassword) { setPasswordError('Passwords do not match'); return; }
    setCurrentPassword(''); setNewPassword(''); setConfirmPassword('');
    showToast('Password changed successfully');
  };

  const handleAddUser = () => {
    if (!newUser.name || !newUser.email) return;
    setUsers(prev => [...prev, { id: Date.now(), ...newUser, status: 'active' }]);
    setNewUser({ name: '', email: '', role: 'Receptionist' });
    setShowAddUser(false);
    showToast('User added');
  };

  const handleUpdateUser = () => {
    if (!editingUser) return;
    setUsers(prev => prev.map(u => u.id === editingUser.id ? editingUser : u));
    setEditingUser(null);
    showToast('User updated');
  };

  const handleToggleHour = (idx: number) => {
    setWorkingHours(prev => prev.map((h, i) => i === idx ? { ...h, isOpen: !h.isOpen } : h));
  };

  const handleHourChange = (idx: number, field: 'open' | 'close', value: string) => {
    setWorkingHours(prev => prev.map((h, i) => i === idx ? { ...h, [field]: value } : h));
  };

  const activeTabLabel = tabs.find(t => t.id === activeTab)?.label || '';

  return (
    <>
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[#0B1F3B]">Settings</h1>
          <p className="text-sm text-[#6B7280]">Manage your clinic preferences and configuration</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Tab Navigation - Desktop */}
          <div className="hidden lg:block w-56 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-sm border border-[#E5E7EB] p-3">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all cursor-pointer mb-1 last:mb-0 ${
                    activeTab === tab.id ? 'bg-[#0F766E] text-white' : 'text-[#6B7280] hover:bg-[#F0FDF9] hover:text-[#0F766E]'
                  }`}
                >
                  <i className={`${tab.icon} text-lg w-5 h-5 flex items-center justify-center`}></i>
                  <span className="whitespace-nowrap">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Tab Navigation - Mobile Dropdown */}
          <div className="lg:hidden relative">
            <button
              onClick={() => setMobileTabOpen(!mobileTabOpen)}
              className="w-full flex items-center justify-between px-4 py-3 bg-white rounded-xl border-2 border-[#E5E7EB] text-sm font-medium text-[#111827] cursor-pointer"
            >
              <span>{activeTabLabel}</span>
              <i className={`ri-arrow-${mobileTabOpen ? 'up' : 'down'}-s-line text-[#6B7280]`}></i>
            </button>
            {mobileTabOpen && (
              <div className="absolute top-full mt-1 w-full bg-white rounded-xl shadow-xl border border-[#E5E7EB] z-20 py-2">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => { setActiveTab(tab.id); setMobileTabOpen(false); }}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm cursor-pointer ${
                      activeTab === tab.id ? 'text-[#0F766E] font-semibold bg-[#F0FDF9]' : 'text-[#6B7280] hover:bg-[#F9FAFB]'
                    }`}
                  >
                    <i className={`${tab.icon} text-lg w-5 h-5 flex items-center justify-center`}></i>
                    {tab.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* Clinic Profile */}
            {activeTab === 'clinic' && (
              <div className="bg-white rounded-2xl shadow-sm border border-[#E5E7EB] p-6">
                <h2 className="text-lg font-bold text-[#0B1F3B] mb-6">Clinic Profile</h2>
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-20 h-20 bg-[#F0FDF9] rounded-2xl flex items-center justify-center border-2 border-dashed border-[#0F766E]">
                    <i className="ri-hospital-line text-3xl text-[#0F766E]"></i>
                  </div>
                  <div>
                    <button className="px-4 py-2 bg-[#0F766E] text-white rounded-lg text-sm font-medium hover:bg-[#0B5B54] transition-colors cursor-pointer whitespace-nowrap">
                      Upload Logo
                    </button>
                    <p className="text-xs text-[#6B7280] mt-1">PNG, JPG up to 2MB</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-[#111827] mb-1.5">Clinic Name *</label>
                    <input value={clinicName} onChange={e => setClinicName(e.target.value)} className="w-full px-4 py-2.5 border-2 border-[#E5E7EB] rounded-xl focus:border-[#0F766E] focus:outline-none text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#111827] mb-1.5">Phone *</label>
                    <input value={clinicPhone} onChange={e => setClinicPhone(e.target.value)} className="w-full px-4 py-2.5 border-2 border-[#E5E7EB] rounded-xl focus:border-[#0F766E] focus:outline-none text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#111827] mb-1.5">Email *</label>
                    <input value={clinicEmail} onChange={e => setClinicEmail(e.target.value)} className="w-full px-4 py-2.5 border-2 border-[#E5E7EB] rounded-xl focus:border-[#0F766E] focus:outline-none text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#111827] mb-1.5">Website</label>
                    <input value={clinicWebsite} onChange={e => setClinicWebsite(e.target.value)} className="w-full px-4 py-2.5 border-2 border-[#E5E7EB] rounded-xl focus:border-[#0F766E] focus:outline-none text-sm" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-[#111827] mb-1.5">Address *</label>
                    <input value={clinicAddress} onChange={e => setClinicAddress(e.target.value)} className="w-full px-4 py-2.5 border-2 border-[#E5E7EB] rounded-xl focus:border-[#0F766E] focus:outline-none text-sm" />
                  </div>
                </div>
                <div className="flex justify-end mt-6">
                  <button onClick={handleSaveClinic} className="px-6 py-2.5 bg-[#0F766E] text-white rounded-xl text-sm font-medium hover:bg-[#0B5B54] transition-colors cursor-pointer whitespace-nowrap">
                    Save Changes
                  </button>
                </div>
              </div>
            )}

            {/* Working Hours */}
            {activeTab === 'hours' && (
              <div className="bg-white rounded-2xl shadow-sm border border-[#E5E7EB] p-6">
                <h2 className="text-lg font-bold text-[#0B1F3B] mb-6">Working Hours</h2>
                <div className="space-y-3">
                  {workingHours.map((h, idx) => (
                    <div key={h.day} className="flex flex-col sm:flex-row sm:items-center gap-3 p-4 rounded-xl border border-[#E5E7EB] bg-[#F9FAFB]">
                      <div className="flex items-center gap-3 sm:w-40">
                        <button
                          onClick={() => handleToggleHour(idx)}
                          className={`w-10 h-6 rounded-full transition-colors cursor-pointer relative ${h.isOpen ? 'bg-[#0F766E]' : 'bg-[#D1D5DB]'}`}
                        >
                          <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${h.isOpen ? 'left-[18px]' : 'left-0.5'}`}></div>
                        </button>
                        <span className={`text-sm font-medium ${h.isOpen ? 'text-[#111827]' : 'text-[#6B7280]'}`}>{h.day}</span>
                      </div>
                      {h.isOpen ? (
                        <div className="flex items-center gap-2 flex-1">
                          <input type="time" value={h.open} onChange={e => handleHourChange(idx, 'open', e.target.value)} className="px-3 py-2 border-2 border-[#E5E7EB] rounded-lg focus:border-[#0F766E] focus:outline-none text-sm cursor-pointer" />
                          <span className="text-sm text-[#6B7280]">to</span>
                          <input type="time" value={h.close} onChange={e => handleHourChange(idx, 'close', e.target.value)} className="px-3 py-2 border-2 border-[#E5E7EB] rounded-lg focus:border-[#0F766E] focus:outline-none text-sm cursor-pointer" />
                        </div>
                      ) : (
                        <span className="text-sm text-[#6B7280] italic">Closed</span>
                      )}
                    </div>
                  ))}
                </div>
                <div className="flex justify-end mt-6">
                  <button onClick={handleSaveHours} className="px-6 py-2.5 bg-[#0F766E] text-white rounded-xl text-sm font-medium hover:bg-[#0B5B54] transition-colors cursor-pointer whitespace-nowrap">
                    Save Hours
                  </button>
                </div>
              </div>
            )}

            {/* Users & Roles */}
            {activeTab === 'users' && (
              <div className="bg-white rounded-2xl shadow-sm border border-[#E5E7EB] p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-bold text-[#0B1F3B]">Users &amp; Roles</h2>
                  <button onClick={() => setShowAddUser(true)} className="flex items-center gap-2 px-4 py-2.5 bg-[#0F766E] text-white rounded-xl text-sm font-medium hover:bg-[#0B5B54] transition-colors cursor-pointer whitespace-nowrap">
                    <i className="ri-user-add-line text-base w-4 h-4 flex items-center justify-center"></i>
                    Add User
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-[#F7FAFC]">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-[#6B7280] uppercase whitespace-nowrap">Name</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-[#6B7280] uppercase whitespace-nowrap">Email</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-[#6B7280] uppercase whitespace-nowrap">Role</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-[#6B7280] uppercase whitespace-nowrap">Status</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-[#6B7280] uppercase whitespace-nowrap">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E5E7EB]">
                      {users.map(u => (
                        <tr key={u.id} className="hover:bg-[#F9FAFB]">
                          <td className="px-4 py-3 text-sm font-medium text-[#111827] whitespace-nowrap">{u.name}</td>
                          <td className="px-4 py-3 text-sm text-[#6B7280] whitespace-nowrap">{u.email}</td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                              u.role === 'Admin' ? 'bg-[#0B1F3B] text-white' :
                              u.role === 'Doctor' ? 'bg-[#A7F3D0] text-[#0F766E]' :
                              'bg-[#FEF3C7] text-[#D97706]'
                            }`}>{u.role}</span>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                              u.status === 'active' ? 'bg-[#A7F3D0] text-[#0F766E]' : 'bg-[#E5E7EB] text-[#6B7280]'
                            }`}>{u.status}</span>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <button onClick={() => setEditingUser({ ...u })} className="text-[#0F766E] hover:text-[#0B5B54] mr-3 cursor-pointer">
                              <i className="ri-edit-line text-base"></i>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Add User Modal */}
                {showAddUser && (
                  <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setShowAddUser(false)}>
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6" onClick={e => e.stopPropagation()}>
                      <h3 className="text-lg font-bold text-[#0B1F3B] mb-5">Add New User</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-[#111827] mb-1.5">Full Name *</label>
                          <input value={newUser.name} onChange={e => setNewUser(p => ({ ...p, name: e.target.value }))} className="w-full px-4 py-2.5 border-2 border-[#E5E7EB] rounded-xl focus:border-[#0F766E] focus:outline-none text-sm" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-[#111827] mb-1.5">Email *</label>
                          <input type="email" value={newUser.email} onChange={e => setNewUser(p => ({ ...p, email: e.target.value }))} className="w-full px-4 py-2.5 border-2 border-[#E5E7EB] rounded-xl focus:border-[#0F766E] focus:outline-none text-sm" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-[#111827] mb-1.5">Role *</label>
                          <select value={newUser.role} onChange={e => setNewUser(p => ({ ...p, role: e.target.value }))} className="w-full px-4 py-2.5 border-2 border-[#E5E7EB] rounded-xl focus:border-[#0F766E] focus:outline-none text-sm cursor-pointer">
                            <option value="Admin">Admin</option>
                            <option value="Doctor">Doctor</option>
                            <option value="Receptionist">Receptionist</option>
                          </select>
                        </div>
                      </div>
                      <div className="flex justify-end gap-3 mt-6">
                        <button onClick={() => setShowAddUser(false)} className="px-4 py-2.5 border-2 border-[#E5E7EB] rounded-xl text-sm font-medium hover:bg-[#F9FAFB] cursor-pointer whitespace-nowrap">Cancel</button>
                        <button onClick={handleAddUser} className="px-4 py-2.5 bg-[#0F766E] text-white rounded-xl text-sm font-medium hover:bg-[#0B5B54] cursor-pointer whitespace-nowrap">Add User</button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Edit User Modal */}
                {editingUser && (
                  <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setEditingUser(null)}>
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6" onClick={e => e.stopPropagation()}>
                      <h3 className="text-lg font-bold text-[#0B1F3B] mb-5">Edit User</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-[#111827] mb-1.5">Full Name *</label>
                          <input value={editingUser.name} onChange={e => setEditingUser((p: any) => ({ ...p, name: e.target.value }))} className="w-full px-4 py-2.5 border-2 border-[#E5E7EB] rounded-xl focus:border-[#0F766E] focus:outline-none text-sm" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-[#111827] mb-1.5">Email *</label>
                          <input type="email" value={editingUser.email} onChange={e => setEditingUser((p: any) => ({ ...p, email: e.target.value }))} className="w-full px-4 py-2.5 border-2 border-[#E5E7EB] rounded-xl focus:border-[#0F766E] focus:outline-none text-sm" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-[#111827] mb-1.5">Role *</label>
                          <select value={editingUser.role} onChange={e => setEditingUser((p: any) => ({ ...p, role: e.target.value }))} className="w-full px-4 py-2.5 border-2 border-[#E5E7EB] rounded-xl focus:border-[#0F766E] focus:outline-none text-sm cursor-pointer">
                            <option value="Admin">Admin</option>
                            <option value="Doctor">Doctor</option>
                            <option value="Receptionist">Receptionist</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-[#111827] mb-1.5">Status</label>
                          <select value={editingUser.status} onChange={e => setEditingUser((p: any) => ({ ...p, status: e.target.value }))} className="w-full px-4 py-2.5 border-2 border-[#E5E7EB] rounded-xl focus:border-[#0F766E] focus:outline-none text-sm cursor-pointer">
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                          </select>
                        </div>
                      </div>
                      <div className="flex justify-end gap-3 mt-6">
                        <button onClick={() => setEditingUser(null)} className="px-4 py-2.5 border-2 border-[#E5E7EB] rounded-xl text-sm font-medium hover:bg-[#F9FAFB] cursor-pointer whitespace-nowrap">Cancel</button>
                        <button onClick={handleUpdateUser} className="px-4 py-2.5 bg-[#0F766E] text-white rounded-xl text-sm font-medium hover:bg-[#0B5B54] cursor-pointer whitespace-nowrap">Save</button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Notifications */}
            {activeTab === 'notifications' && (
              <div className="bg-white rounded-2xl shadow-sm border border-[#E5E7EB] p-6">
                <h2 className="text-lg font-bold text-[#0B1F3B] mb-6">Notification Preferences</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-semibold text-[#111827] mb-3 flex items-center gap-2">
                      <i className="ri-mail-line text-[#0F766E] w-5 h-5 flex items-center justify-center"></i>
                      Email Notifications
                    </h3>
                    <div className="space-y-3 pl-7">
                      {[
                        { label: 'New appointment bookings', checked: emailAppt, onChange: setEmailAppt },
                        { label: 'Appointment reminders (24h before)', checked: emailReminder, onChange: setEmailReminder },
                        { label: 'Billing & payment updates', checked: emailBilling, onChange: setEmailBilling },
                      ].map((item, i) => (
                        <label key={i} className="flex items-center justify-between p-3 rounded-xl border border-[#E5E7EB] cursor-pointer hover:bg-[#F9FAFB]">
                          <span className="text-sm text-[#111827]">{item.label}</span>
                          <button
                            onClick={() => item.onChange(!item.checked)}
                            className={`w-10 h-6 rounded-full transition-colors cursor-pointer relative ${item.checked ? 'bg-[#0F766E]' : 'bg-[#D1D5DB]'}`}
                          >
                            <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${item.checked ? 'left-[18px]' : 'left-0.5'}`}></div>
                          </button>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-[#111827] mb-3 flex items-center gap-2">
                      <i className="ri-smartphone-line text-[#0F766E] w-5 h-5 flex items-center justify-center"></i>
                      SMS Notifications
                    </h3>
                    <div className="space-y-3 pl-7">
                      {[
                        { label: 'New appointment bookings', checked: smsAppt, onChange: setSmsAppt },
                        { label: 'Appointment reminders', checked: smsReminder, onChange: setSmsReminder },
                        { label: 'Billing updates', checked: smsBilling, onChange: setSmsBilling },
                      ].map((item, i) => (
                        <label key={i} className="flex items-center justify-between p-3 rounded-xl border border-[#E5E7EB] cursor-pointer hover:bg-[#F9FAFB]">
                          <span className="text-sm text-[#111827]">{item.label}</span>
                          <button
                            onClick={() => item.onChange(!item.checked)}
                            className={`w-10 h-6 rounded-full transition-colors cursor-pointer relative ${item.checked ? 'bg-[#0F766E]' : 'bg-[#D1D5DB]'}`}
                          >
                            <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${item.checked ? 'left-[18px]' : 'left-0.5'}`}></div>
                          </button>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex justify-end mt-6">
                  <button onClick={handleSaveNotifications} className="px-6 py-2.5 bg-[#0F766E] text-white rounded-xl text-sm font-medium hover:bg-[#0B5B54] transition-colors cursor-pointer whitespace-nowrap">
                    Save Preferences
                  </button>
                </div>
              </div>
            )}

            {/* Security */}
            {activeTab === 'security' && (
              <div className="bg-white rounded-2xl shadow-sm border border-[#E5E7EB] p-6">
                <h2 className="text-lg font-bold text-[#0B1F3B] mb-6">Change Password</h2>
                <div className="max-w-md space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[#111827] mb-1.5">Current Password *</label>
                    <input type="password" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} className="w-full px-4 py-2.5 border-2 border-[#E5E7EB] rounded-xl focus:border-[#0F766E] focus:outline-none text-sm" placeholder="Enter current password" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#111827] mb-1.5">New Password *</label>
                    <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} className="w-full px-4 py-2.5 border-2 border-[#E5E7EB] rounded-xl focus:border-[#0F766E] focus:outline-none text-sm" placeholder="At least 8 characters" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#111827] mb-1.5">Confirm New Password *</label>
                    <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className="w-full px-4 py-2.5 border-2 border-[#E5E7EB] rounded-xl focus:border-[#0F766E] focus:outline-none text-sm" placeholder="Re-enter new password" />
                  </div>
                  {passwordError && (
                    <p className="text-sm text-red-500 flex items-center gap-1">
                      <i className="ri-error-warning-line"></i>{passwordError}
                    </p>
                  )}
                  <button onClick={handleChangePassword} className="px-6 py-2.5 bg-[#0F766E] text-white rounded-xl text-sm font-medium hover:bg-[#0B5B54] transition-colors cursor-pointer whitespace-nowrap">
                    Update Password
                  </button>
                </div>

                <div className="mt-10 pt-6 border-t border-[#E5E7EB]">
                  <h3 className="text-lg font-bold text-[#0B1F3B] mb-4">Two-Factor Authentication</h3>
                  <div className="flex items-center justify-between p-4 rounded-xl border border-[#E5E7EB] bg-[#F9FAFB]">
                    <div>
                      <p className="text-sm font-medium text-[#111827]">Enable 2FA</p>
                      <p className="text-xs text-[#6B7280]">Add an extra layer of security to your account</p>
                    </div>
                    <button className="px-4 py-2 border-2 border-[#0F766E] text-[#0F766E] rounded-lg text-sm font-medium hover:bg-[#F0FDF9] transition-colors cursor-pointer whitespace-nowrap">
                      Enable
                    </button>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-[#E5E7EB]">
                  <h3 className="text-lg font-bold text-[#0B1F3B] mb-4">Active Sessions</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 rounded-xl border border-[#E5E7EB]">
                      <div className="flex items-center gap-3">
                        <i className="ri-computer-line text-xl text-[#0F766E] w-5 h-5 flex items-center justify-center"></i>
                        <div>
                          <p className="text-sm font-medium text-[#111827]">Chrome on Windows</p>
                          <p className="text-xs text-[#6B7280]">New York, US • Current session</p>
                        </div>
                      </div>
                      <span className="px-2.5 py-1 bg-[#A7F3D0] text-[#0F766E] rounded-full text-xs font-semibold">Active</span>
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-xl border border-[#E5E7EB]">
                      <div className="flex items-center gap-3">
                        <i className="ri-smartphone-line text-xl text-[#6B7280] w-5 h-5 flex items-center justify-center"></i>
                        <div>
                          <p className="text-sm font-medium text-[#111827]">Safari on iPhone</p>
                          <p className="text-xs text-[#6B7280]">New York, US • 2 hours ago</p>
                        </div>
                      </div>
                      <button className="text-xs text-red-500 font-medium hover:underline cursor-pointer whitespace-nowrap">Revoke</button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
