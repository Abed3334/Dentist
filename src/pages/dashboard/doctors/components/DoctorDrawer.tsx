import { useState } from 'react';

interface DoctorDrawerProps {
  doctor: any;
  onClose: () => void;
}

export function DoctorDrawer({ doctor, onClose }: DoctorDrawerProps) {
  const [activeTab, setActiveTab] = useState<'bio' | 'schedule' | 'appointments' | 'reviews'>('bio');

  const mockAppointments = [
    { id: 1, patient: 'Sarah Johnson', service: 'Teeth Cleaning', date: '2025-01-15', time: '09:00', status: 'confirmed' },
    { id: 2, patient: 'Michael Chen', service: 'Root Canal', date: '2025-01-15', time: '14:00', status: 'completed' },
    { id: 3, patient: 'Emily Davis', service: 'Checkup', date: '2025-01-16', time: '10:00', status: 'pending' }
  ];

  const mockReviews = [
    { id: 1, patient: 'Sarah Johnson', rating: 5, comment: 'Excellent service! Very professional and caring.', date: '2025-01-10' },
    { id: 2, patient: 'Michael Chen', rating: 5, comment: 'Best dentist I have ever been to. Highly recommend!', date: '2025-01-08' },
    { id: 3, patient: 'Emily Davis', rating: 4, comment: 'Great experience overall. Very gentle and thorough.', date: '2025-01-05' }
  ];

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full md:w-[600px] bg-white shadow-2xl z-50 overflow-y-auto animate-slide-in-right">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-[#E5E7EB] p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onClose}
              className="md:hidden p-2 hover:bg-[#F7FAFC] rounded-lg transition-colors duration-200 cursor-pointer"
            >
              <i className="ri-arrow-left-line text-xl text-[#6B7280]" />
            </button>
            <div>
              <h2 className="text-2xl font-bold text-[#0B1F3B]">Doctor Details</h2>
              <p className="text-sm text-[#6B7280] mt-1">{doctor.name}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="hidden md:block p-2 hover:bg-[#F7FAFC] rounded-lg transition-colors duration-200 cursor-pointer"
          >
            <i className="ri-close-line text-2xl text-[#6B7280]" />
          </button>
        </div>

        {/* Doctor Info */}
        <div className="p-6 border-b border-[#E5E7EB]">
          <div className="flex items-start gap-4">
            <img
              src={doctor.avatar}
              alt={doctor.name}
              className="w-24 h-24 rounded-full object-cover border-4 border-[#A7F3D0]"
            />
            <div className="flex-1">
              <h3 className="text-xl font-bold text-[#0B1F3B] mb-1">{doctor.name}</h3>
              <p className="text-sm text-[#6B7280] mb-3">{doctor.specialty}</p>
              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <i
                      key={i}
                      className={`ri-star-${i < Math.floor(doctor.rating) ? 'fill' : 'line'} text-yellow-400`}
                    />
                  ))}
                </div>
                <span className="text-sm font-medium text-[#0B1F3B]">{doctor.rating}</span>
                <span className="text-sm text-[#6B7280]">({doctor.reviewCount} reviews)</span>
              </div>
              <span
                className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                  doctor.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}
              >
                {doctor.status === 'active' ? 'Active' : 'Inactive'}
              </span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-[#E5E7EB]">
          <div className="flex overflow-x-auto">
            {[
              { key: 'bio', label: 'Bio', icon: 'ri-user-line' },
              { key: 'schedule', label: 'Schedule', icon: 'ri-calendar-line' },
              { key: 'appointments', label: 'Appointments', icon: 'ri-calendar-check-line' },
              { key: 'reviews', label: 'Reviews', icon: 'ri-star-line' }
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`flex items-center gap-2 px-6 py-4 border-b-2 transition-colors duration-200 whitespace-nowrap cursor-pointer ${
                  activeTab === tab.key
                    ? 'border-[#0F766E] text-[#0F766E]'
                    : 'border-transparent text-[#6B7280] hover:text-[#0F766E]'
                }`}
              >
                <i className={`${tab.icon} text-lg`} />
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'bio' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-semibold text-[#0B1F3B] mb-2">About</h4>
                <p className="text-sm text-[#6B7280]">{doctor.bio}</p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-[#0B1F3B] mb-2">Education</h4>
                <p className="text-sm text-[#6B7280]">{doctor.education}</p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-[#0B1F3B] mb-2">Languages</h4>
                <div className="flex flex-wrap gap-2">
                  {doctor.languages.map((lang: string) => (
                    <span
                      key={lang}
                      className="px-3 py-1 bg-[#A7F3D0] text-[#0F766E] rounded-full text-sm font-medium"
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-[#0B1F3B] mb-2">Contact</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-[#6B7280]">
                    <i className="ri-phone-line text-[#0F766E]" />
                    <span>{doctor.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#6B7280]">
                    <i className="ri-mail-line text-[#0F766E]" />
                    <span>{doctor.email}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'schedule' && (
            <div className="space-y-4">
              {Object.entries(doctor.availability).map(([day, schedule]: [string, any]) => (
                <div key={day} className="p-4 bg-[#F7FAFC] rounded-xl">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-[#0B1F3B] capitalize">{day}</span>
                    {schedule ? (
                      <div className="text-sm text-[#6B7280]">
                        {schedule.start} - {schedule.end}
                        {schedule.break && (
                          <span className="ml-2 text-xs">
                            (Break: {schedule.break.start} - {schedule.break.end})
                          </span>
                        )}
                      </div>
                    ) : (
                      <span className="text-sm text-red-600">Unavailable</span>
                    )}
                  </div>
                </div>
              ))}
              {doctor.blockedDates.length > 0 && (
                <div className="mt-6">
                  <h4 className="text-sm font-semibold text-[#0B1F3B] mb-3">Blocked Dates</h4>
                  <div className="flex flex-wrap gap-2">
                    {doctor.blockedDates.map((date: string) => (
                      <span
                        key={date}
                        className="px-3 py-1 bg-red-50 text-red-800 rounded-lg text-sm font-medium"
                      >
                        {date}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'appointments' && (
            <div className="space-y-4">
              {mockAppointments.map(apt => (
                <div key={apt.id} className="p-4 bg-[#F7FAFC] rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-[#0B1F3B]">{apt.patient}</span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        apt.status === 'confirmed'
                          ? 'bg-[#0F766E] text-white'
                          : apt.status === 'completed'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {apt.status}
                    </span>
                  </div>
                  <p className="text-sm text-[#6B7280] mb-2">{apt.service}</p>
                  <div className="flex items-center gap-4 text-xs text-[#6B7280]">
                    <span>{apt.date}</span>
                    <span>{apt.time}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-4">
              {mockReviews.map(review => (
                <div key={review.id} className="p-4 bg-[#F7FAFC] rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-[#0B1F3B]">{review.patient}</span>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <i
                          key={i}
                          className={`ri-star-${i < review.rating ? 'fill' : 'line'} text-yellow-400 text-sm`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-[#6B7280] mb-2">{review.comment}</p>
                  <span className="text-xs text-[#6B7280]">{review.date}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}