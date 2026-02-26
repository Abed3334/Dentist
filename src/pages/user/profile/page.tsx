import { useState } from 'react';
import UserLayout from '@/layouts/UserLayout';
import { useToast } from '@/contexts/ToastContext';

const initialProfile = {
  name: 'Sarah Johnson',
  email: 'sarah.johnson@email.com',
  phone: '+1 (555) 123-4567',
  dob: '1985-03-15',
  address: '123 Main St, New York, NY 10001',
  allergies: 'Penicillin',
  conditions: 'None',
  insurance: 'Blue Cross Blue Shield',
  insuranceId: 'BCBS-2024-78901',
  emailNotifications: true,
  smsNotifications: true,
  appointmentReminders: true,
};

export default function ProfilePage() {
  const [profile, setProfile] = useState(initialProfile);
  const [editing, setEditing] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { showToast } = useToast();

  const handleSave = (section: string) => {
    const newErrors: Record<string, string> = {};
    if (!profile.name.trim()) newErrors.name = 'Name is required';
    if (!profile.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!profile.phone.trim()) newErrors.phone = 'Phone is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    setEditing(null);
    showToast(`${section} updated successfully!`);
  };

  const handleChange = (field: string, value: string | boolean) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const renderField = (label: string, field: string, type = 'text', icon = 'ri-edit-line') => {
    const isEditing = editing !== null;
    const value = profile[field as keyof typeof profile];
    return (
      <div>
        <label className="block text-xs font-medium text-[#6B7280] mb-1">{label}</label>
        {isEditing ? (
          <div>
            <div className="relative">
              <input
                type={type}
                value={value as string}
                onChange={(e) => handleChange(field, e.target.value)}
                className={`w-full px-4 py-2.5 border-2 rounded-lg text-sm focus:outline-none transition-colors duration-200 ${
                  errors[field] ? 'border-red-400 focus:border-red-500' : 'border-[#E5E7EB] focus:border-[#0F766E]'
                }`}
              />
            </div>
            {errors[field] && (
              <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                <i className="ri-error-warning-line"></i> {errors[field]}
              </p>
            )}
          </div>
        ) : (
          <p className="text-sm text-[#111827] flex items-center gap-2">
            <i className={`${icon} text-[#0F766E] w-4 h-4 flex items-center justify-center`}></i>
            {value as string || '—'}
          </p>
        )}
      </div>
    );
  };

  return (
    <UserLayout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-xl sm:text-2xl font-bold text-[#0B1F3B]">My Profile</h1>
          <p className="text-sm text-[#6B7280] mt-1">Manage your personal and medical information</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {/* Personal Info */}
          <div className="bg-white rounded-xl border border-[#E5E7EB] p-4 sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-5 sm:mb-6">
              <h2 className="text-base font-bold text-[#0B1F3B] flex items-center gap-2">
                <i className="ri-user-line text-[#0F766E] w-5 h-5 flex items-center justify-center"></i>
                Personal Information
              </h2>
              {editing === 'personal' ? (
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setEditing(null);
                      setErrors({});
                      setProfile(initialProfile);
                    }}
                    className="px-3 py-1.5 text-xs font-medium text-[#6B7280] border border-[#E5E7EB] rounded-lg hover:bg-[#F3F4F6] transition-all duration-200 cursor-pointer whitespace-nowrap"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleSave('Personal info')}
                    className="px-3 py-1.5 text-xs font-medium text-white bg-[#0F766E] rounded-lg hover:bg-[#0B5B54] transition-all duration-200 cursor-pointer whitespace-nowrap"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setEditing('personal')}
                  className="px-3 py-1.5 text-xs font-medium text-[#0F766E] bg-[#F0FDF9] rounded-lg hover:bg-[#A7F3D0]/30 transition-all duration-200 cursor-pointer whitespace-nowrap"
                >
                  <i className="ri-pencil-line mr-1"></i> Edit
                </button>
              )}
            </div>

            {/* Avatar */}
            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-[#E5E7EB]">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop&crop=face"
                alt="Profile"
                className="w-16 h-16 rounded-full object-cover border-2 border-[#E5E7EB]"
              />
              <div>
                <p className="text-sm font-semibold text-[#0B1F3B]">{profile.name}</p>
                <p className="text-xs text-[#6B7280]">Patient since Nov 2023</p>
              </div>
            </div>

            <div className="space-y-4">
              {renderField('Full Name', 'name', 'text', 'ri-user-line')}
              {renderField('Email Address', 'email', 'email', 'ri-mail-line')}
              {renderField('Phone Number', 'phone', 'tel', 'ri-phone-line')}
              {renderField('Date of Birth', 'dob', 'date', 'ri-cake-2-line')}
              {renderField('Address', 'address', 'text', 'ri-map-pin-line')}
            </div>
          </div>

          {/* Medical Info */}
          <div className="bg-white rounded-xl border border-[#E5E7EB] p-4 sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-5 sm:mb-6">
              <h2 className="text-base font-bold text-[#0B1F3B] flex items-center gap-2">
                <i className="ri-heart-pulse-line text-[#0F766E] w-5 h-5 flex items-center justify-center"></i>
                Medical Information
              </h2>
              {editing === 'medical' ? (
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setEditing(null);
                      setErrors({});
                    }}
                    className="px-3 py-1.5 text-xs font-medium text-[#6B7280] border border-[#E5E7EB] rounded-lg hover:bg-[#F3F4F6] transition-all duration-200 cursor-pointer whitespace-nowrap"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleSave('Medical info')}
                    className="px-3 py-1.5 text-xs font-medium text-white bg-[#0F766E] rounded-lg hover:bg-[#0B5B54] transition-all duration-200 cursor-pointer whitespace-nowrap"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setEditing('medical')}
                  className="px-3 py-1.5 text-xs font-medium text-[#0F766E] bg-[#F0FDF9] rounded-lg hover:bg-[#A7F3D0]/30 transition-all duration-200 cursor-pointer whitespace-nowrap"
                >
                  <i className="ri-pencil-line mr-1"></i> Edit
                </button>
              )}
            </div>

            <div className="space-y-4">
              {renderField('Allergies', 'allergies', 'text', 'ri-alert-line')}
              {renderField('Medical Conditions', 'conditions', 'text', 'ri-hospital-line')}
              {renderField('Insurance Provider', 'insurance', 'text', 'ri-shield-check-line')}
              {renderField('Insurance ID', 'insuranceId', 'text', 'ri-bank-card-line')}
            </div>

            {/* Documents */}
            <div className="mt-6 pt-6 border-t border-[#E5E7EB]">
              <h3 className="text-sm font-semibold text-[#0B1F3B] mb-3">Documents</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 bg-[#F7FAFC] rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[#0F766E]/10 flex items-center justify-center">
                      <i className="ri-file-text-line text-[#0F766E]"></i>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-[#0B1F3B]">Insurance Card</p>
                      <p className="text-xs text-[#6B7280]">Uploaded Dec 15, 2024</p>
                    </div>
                  </div>
                  <button className="text-[#0F766E] hover:text-[#0B5B54] cursor-pointer">
                    <i className="ri-download-line"></i>
                  </button>
                </div>
                <div className="flex items-center justify-between p-3 bg-[#F7FAFC] rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[#0F766E]/10 flex items-center justify-center">
                      <i className="ri-file-text-line text-[#0F766E]"></i>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-[#0B1F3B]">X-Ray Report</p>
                      <p className="text-xs text-[#6B7280]">Uploaded Jan 5, 2025</p>
                    </div>
                  </div>
                  <button className="text-[#0F766E] hover:text-[#0B5B54] cursor-pointer">
                    <i className="ri-download-line"></i>
                  </button>
                </div>
              </div>
              <button
                onClick={() => showToast('Upload feature coming soon!')}
                className="mt-3 w-full py-2.5 border-2 border-dashed border-[#E5E7EB] rounded-lg text-xs font-medium text-[#6B7280] hover:border-[#0F766E] hover:text-[#0F766E] transition-all duration-200 cursor-pointer whitespace-nowrap"
              >
                <i className="ri-upload-2-line mr-1"></i> Upload Document
              </button>
            </div>
          </div>

          {/* Preferences */}
          <div className="bg-white rounded-xl border border-[#E5E7EB] p-6 lg:col-span-2">
            <h2 className="text-base font-bold text-[#0B1F3B] flex items-center gap-2 mb-6">
              <i className="ri-settings-3-line text-[#0F766E] w-5 h-5 flex items-center justify-center"></i>
              Notification Preferences
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { field: 'emailNotifications', label: 'Email Notifications', desc: 'Receive updates via email', icon: 'ri-mail-line' },
                { field: 'smsNotifications', label: 'SMS Notifications', desc: 'Receive updates via text', icon: 'ri-message-2-line' },
                { field: 'appointmentReminders', label: 'Appointment Reminders', desc: 'Get reminded before visits', icon: 'ri-alarm-line' },
              ].map((pref) => (
                <div key={pref.field} className="flex items-center justify-between p-4 bg-[#F7FAFC] rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[#0F766E]/10 flex items-center justify-center">
                      <i className={`${pref.icon} text-[#0F766E]`}></i>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#0B1F3B]">{pref.label}</p>
                      <p className="text-xs text-[#6B7280]">{pref.desc}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      handleChange(pref.field, !profile[pref.field as keyof typeof profile]);
                      showToast(`${pref.label} ${!profile[pref.field as keyof typeof profile] ? 'enabled' : 'disabled'}`);
                    }}
                    className={`relative w-11 h-6 rounded-full transition-all duration-200 cursor-pointer flex-shrink-0 ${
                      profile[pref.field as keyof typeof profile] ? 'bg-[#0F766E]' : 'bg-[#D1D5DB]'
                    }`}
                  >
                    <div
                      className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all duration-200 ${
                        profile[pref.field as keyof typeof profile] ? 'left-[22px]' : 'left-0.5'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Toast */}
    </UserLayout>
  );
}
