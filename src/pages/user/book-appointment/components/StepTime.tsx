
import { useState, useEffect } from 'react';

interface StepTimeProps {
  selectedTime: string;
  onSelect: (time: string) => void;
  selectedDate: string;
}

const allSlots = [
  '08:00 AM', '08:30 AM', '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
  '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM',
  '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM',
];

export default function StepTime({ selectedTime, onSelect, selectedDate }: StepTimeProps) {
  const [loading, setLoading] = useState(true);
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      // Mock: randomly disable some slots based on date
      const dateNum = selectedDate ? parseInt(selectedDate.split('-')[2], 10) : 1;
      const available = allSlots.filter((_, i) => {
        const seed = (dateNum * 7 + i * 3) % 10;
        return seed > 2;
      });
      setAvailableSlots(available);
      setLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, [selectedDate]);

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const d = new Date(dateStr + 'T00:00:00');
    return d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
  };

  if (loading) {
    return (
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-[#0B1F3B] mb-1.5 sm:mb-2">Choose Appointment Time</h2>
        <p className="text-sm sm:text-base text-[#6B7280] mb-6 sm:mb-8">
          Available time slots for{' '}
          <span className="text-[#0F766E] font-medium">{formatDate(selectedDate)}</span>
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="h-12 sm:h-12 rounded-xl bg-[#F3F4F6] animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  if (availableSlots.length === 0) {
    return (
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-[#0B1F3B] mb-1.5 sm:mb-2">Choose Appointment Time</h2>
        <p className="text-sm sm:text-base text-[#6B7280] mb-6 sm:mb-8">
          Available time slots for{' '}
          <span className="text-[#0F766E] font-medium">{formatDate(selectedDate)}</span>
        </p>
        <div className="text-center py-12 sm:py-16">
          <div className="w-20 h-20 rounded-full bg-[#FEF3C7] flex items-center justify-center mx-auto mb-4">
            <i className="ri-calendar-close-line text-3xl text-[#D97706]"></i>
          </div>
          <h3 className="text-lg font-semibold text-[#0B1F3B] mb-2">No Available Slots</h3>
          <p className="text-[#6B7280] mb-6">There are no available time slots for this date.</p>
          <div className="inline-flex items-center gap-2 px-5 py-3 bg-[#FEF3C7] rounded-xl text-sm text-[#92400E]">
            <i className="ri-lightbulb-line"></i>
            Try selecting a different date or doctor
          </div>
        </div>
      </div>
    );
  }

  const slotBtnClass = (isAvailable: boolean, isActive: boolean) =>
    `min-h-[48px] rounded-xl text-sm font-medium transition-all duration-200 whitespace-nowrap flex items-center justify-center gap-1 ${
      isActive
        ? 'bg-[#0F766E] text-white shadow-md ring-2 ring-[#0F766E]/20'
        : isAvailable
        ? 'bg-white border-2 border-[#E5E7EB] text-[#111827] hover:border-[#0F766E] hover:text-[#0F766E] active:bg-[#F0FDF9] cursor-pointer'
        : 'bg-[#F3F4F6] text-[#D1D5DB] line-through cursor-not-allowed border-2 border-transparent'
    }`;

  return (
    <div>
      <h2 className="text-xl sm:text-2xl font-bold text-[#0B1F3B] mb-1.5 sm:mb-2">Choose Appointment Time</h2>
      <p className="text-sm sm:text-base text-[#6B7280] mb-6 sm:mb-8">
        Available time slots for{' '}
        <span className="text-[#0F766E] font-medium">{formatDate(selectedDate)}</span>
      </p>

      <div className="mb-6">
        <h3 className="text-sm font-medium text-[#6B7280] mb-2 sm:mb-3 flex items-center gap-2">
          <i className="ri-sun-line w-4 h-4 flex items-center justify-center"></i> Morning
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3">
          {allSlots.filter((s) => s.includes('AM')).map((slot) => {
            const isAvailable = availableSlots.includes(slot);
            const isActive = selectedTime === slot;
            return (
              <button
                type="button"
                key={slot}
                onClick={() => isAvailable && onSelect(slot)}
                disabled={!isAvailable}
                className={slotBtnClass(isAvailable, isActive)}
              >
                {isActive && <i className="ri-check-line"></i>}
                {slot}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-[#6B7280] mb-2 sm:mb-3 flex items-center gap-2">
          <i className="ri-moon-line w-4 h-4 flex items-center justify-center"></i> Afternoon
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3">
          {allSlots.filter((s) => s.includes('PM')).map((slot) => {
            const isAvailable = availableSlots.includes(slot);
            const isActive = selectedTime === slot;
            return (
              <button
                type="button"
                key={slot}
                onClick={() => isAvailable && onSelect(slot)}
                disabled={!isAvailable}
                className={slotBtnClass(isAvailable, isActive)}
              >
                {isActive && <i className="ri-check-line"></i>}
                {slot}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
