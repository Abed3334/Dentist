import { useState } from 'react';
import { Modal } from '@/components/ui/Modal';

interface ManageAvailabilityModalProps {
  doctor: any;
  onClose: () => void;
  onSubmit: (availability: any, blockedDates: string[]) => void;
}

const daysOfWeek = [
  { key: 'monday', label: 'Monday' },
  { key: 'tuesday', label: 'Tuesday' },
  { key: 'wednesday', label: 'Wednesday' },
  { key: 'thursday', label: 'Thursday' },
  { key: 'friday', label: 'Friday' },
  { key: 'saturday', label: 'Saturday' },
  { key: 'sunday', label: 'Sunday' }
];

export function ManageAvailabilityModal({ doctor, onClose, onSubmit }: ManageAvailabilityModalProps) {
  const [availability, setAvailability] = useState(doctor.availability || {});
  const [blockedDates, setBlockedDates] = useState<string[]>(doctor.blockedDates || []);
  const [newBlockedDate, setNewBlockedDate] = useState('');

  const handleDayToggle = (day: string) => {
    setAvailability((prev: any) => ({
      ...prev,
      [day]: prev[day] ? null : { start: '09:00', end: '17:00', break: { start: '12:00', end: '13:00' } }
    }));
  };

  const handleTimeChange = (day: string, field: string, value: string) => {
    setAvailability((prev: any) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [field]: value
      }
    }));
  };

  const handleBreakChange = (day: string, field: string, value: string) => {
    setAvailability((prev: any) => ({
      ...prev,
      [day]: {
        ...prev[day],
        break: prev[day]?.break ? { ...prev[day].break, [field]: value } : { start: '12:00', end: '13:00' }
      }
    }));
  };

  const handleAddBlockedDate = () => {
    if (newBlockedDate && !blockedDates.includes(newBlockedDate)) {
      setBlockedDates(prev => [...prev, newBlockedDate].sort());
      setNewBlockedDate('');
    }
  };

  const handleRemoveBlockedDate = (date: string) => {
    setBlockedDates(prev => prev.filter(d => d !== date));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(availability, blockedDates);
  };

  return (
    <Modal open onClose={onClose} title="Manage Availability" size="lg">
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Weekly Schedule */}
          <div>
            <h3 className="text-lg font-semibold text-[#0B1F3B] mb-4">Weekly Schedule</h3>
            <div className="space-y-4">
              {daysOfWeek.map(({ key, label }) => (
                <div key={key} className="p-4 bg-[#F7FAFC] rounded-xl">
                  <div className="flex items-center gap-4 mb-3">
                    <input
                      type="checkbox"
                      checked={!!availability[key]}
                      onChange={() => handleDayToggle(key)}
                      className="w-5 h-5 text-[#0F766E] rounded focus:ring-[#0F766E] cursor-pointer"
                    />
                    <label className="text-sm font-semibold text-[#0B1F3B] w-24">{label}</label>
                    {!availability[key] && (
                      <span className="text-sm text-[#6B7280]">Unavailable</span>
                    )}
                  </div>

                  {availability[key] && (
                    <div className="ml-9 grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Working Hours */}
                      <div>
                        <label className="block text-xs font-medium text-[#6B7280] mb-2">
                          Working Hours
                        </label>
                        <div className="flex items-center gap-2">
                          <input
                            type="time"
                            value={availability[key]?.start || '09:00'}
                            onChange={e => handleTimeChange(key, 'start', e.target.value)}
                            className="flex-1 px-3 py-2 border-2 border-[#E5E7EB] rounded-lg focus:border-[#0F766E] focus:outline-none text-sm cursor-pointer"
                          />
                          <span className="text-[#6B7280]">to</span>
                          <input
                            type="time"
                            value={availability[key]?.end || '17:00'}
                            onChange={e => handleTimeChange(key, 'end', e.target.value)}
                            className="flex-1 px-3 py-2 border-2 border-[#E5E7EB] rounded-lg focus:border-[#0F766E] focus:outline-none text-sm cursor-pointer"
                          />
                        </div>
                      </div>

                      {/* Break Time */}
                      <div>
                        <label className="block text-xs font-medium text-[#6B7280] mb-2">
                          Break Time
                        </label>
                        <div className="flex items-center gap-2">
                          <input
                            type="time"
                            value={availability[key]?.break?.start || '12:00'}
                            onChange={e => handleBreakChange(key, 'start', e.target.value)}
                            className="flex-1 px-3 py-2 border-2 border-[#E5E7EB] rounded-lg focus:border-[#0F766E] focus:outline-none text-sm cursor-pointer"
                          />
                          <span className="text-[#6B7280]">to</span>
                          <input
                            type="time"
                            value={availability[key]?.break?.end || '13:00'}
                            onChange={e => handleBreakChange(key, 'end', e.target.value)}
                            className="flex-1 px-3 py-2 border-2 border-[#E5E7EB] rounded-lg focus:border-[#0F766E] focus:outline-none text-sm cursor-pointer"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Blocked Dates */}
          <div>
            <h3 className="text-lg font-semibold text-[#0B1F3B] mb-4">Blocked Dates (Vacation)</h3>
            <div className="flex items-center gap-2 mb-4">
              <input
                type="date"
                value={newBlockedDate}
                onChange={e => setNewBlockedDate(e.target.value)}
                className="flex-1 px-4 py-3 border-2 border-[#E5E7EB] rounded-xl focus:border-[#0F766E] focus:outline-none cursor-pointer"
              />
              <button
                type="button"
                onClick={handleAddBlockedDate}
                className="px-6 py-3 bg-[#0F766E] text-white rounded-xl hover:bg-[#0B5B54] transition-colors duration-200 font-medium whitespace-nowrap cursor-pointer"
              >
                Add Date
              </button>
            </div>

            {blockedDates.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {blockedDates.map(date => (
                  <div
                    key={date}
                    className="flex items-center gap-2 px-4 py-2 bg-red-50 border border-red-200 rounded-lg"
                  >
                    <i className="ri-calendar-close-line text-red-600" />
                    <span className="text-sm font-medium text-red-800">{date}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveBlockedDate(date)}
                      className="ml-2 text-red-600 hover:text-red-800 cursor-pointer"
                    >
                      <i className="ri-close-line" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border-2 border-[#E5E7EB] text-[#6B7280] rounded-xl hover:bg-[#F7FAFC] transition-colors duration-200 font-medium whitespace-nowrap cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-[#0F766E] text-white rounded-xl hover:bg-[#0B5B54] transition-colors duration-200 font-medium whitespace-nowrap cursor-pointer"
            >
              Save Availability
            </button>
          </div>
        </form>
    </Modal>
  );
}