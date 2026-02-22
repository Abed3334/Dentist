
import { useState, useMemo } from 'react';

interface StepDateProps {
  selectedDate: string;
  onSelect: (date: string) => void;
}

export default function StepDate({ selectedDate, onSelect }: StepDateProps) {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const calendarDays = useMemo(() => {
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const days: (number | null)[] = [];
    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let i = 1; i <= daysInMonth; i++) days.push(i);
    return days;
  }, [currentMonth, currentYear]);

  const isPast = (day: number) => {
    const date = new Date(currentYear, currentMonth, day);
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    return date < todayStart;
  };

  const isSunday = (day: number) => {
    return new Date(currentYear, currentMonth, day).getDay() === 0;
  };

  const isSelected = (day: number) => {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return selectedDate === dateStr;
  };

  const isToday = (day: number) => {
    return (
      day === today.getDate() &&
      currentMonth === today.getMonth() &&
      currentYear === today.getFullYear()
    );
  };

  const handleSelect = (day: number) => {
    if (isPast(day) || isSunday(day)) return;
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    onSelect(dateStr);
  };

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  };

  const canGoPrev =
    currentYear > today.getFullYear() ||
    (currentYear === today.getFullYear() && currentMonth > today.getMonth());

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#0B1F3B] mb-2">Choose Appointment Date</h2>
      <p className="text-[#6B7280] mb-8">Select your preferred date from available slots</p>

      <div className="max-w-md mx-auto bg-white rounded-2xl border border-[#E5E7EB] p-6 shadow-sm">
        {/* Month Navigation */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={prevMonth}
            disabled={!canGoPrev}
            className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 cursor-pointer ${
              canGoPrev ? 'text-[#0F766E] hover:bg-[#F0FDF9]' : 'text-[#D1D5DB] cursor-not-allowed'
            }`}
          >
            <i className="ri-arrow-left-s-line text-xl"></i>
          </button>
          <h3 className="text-lg font-semibold text-[#0B1F3B]">
            {monthNames[currentMonth]} {currentYear}
          </h3>
          <button
            onClick={nextMonth}
            className="w-9 h-9 rounded-lg flex items-center justify-center text-[#0F766E] hover:bg-[#F0FDF9] transition-all duration-200 cursor-pointer"
          >
            <i className="ri-arrow-right-s-line text-xl"></i>
          </button>
        </div>

        {/* Day Headers */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {dayNames.map((d) => (
            <div key={d} className="text-center text-xs font-medium text-[#6B7280] py-2">
              {d}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1">
          {calendarDays.map((day, idx) => (
            <div key={idx} className="aspect-square flex items-center justify-center">
              {day !== null ? (
                <button
                  onClick={() => handleSelect(day)}
                  disabled={isPast(day) || isSunday(day)}
                  className={`w-full h-full rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center ${
                    isSelected(day)
                      ? 'bg-[#0F766E] text-white shadow-md'
                      : isToday(day)
                      ? 'border-2 border-[#0F766E] text-[#0F766E]'
                      : isPast(day) || isSunday(day)
                      ? 'text-[#D1D5DB] cursor-not-allowed line-through'
                      : 'text-[#111827] hover:bg-[#F0FDF9] hover:text-[#0F766E] cursor-pointer'
                  }`}
                >
                  {day}
                </button>
              ) : null}
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 mt-6 pt-4 border-t border-[#E5E7EB]">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm bg-[#0F766E]"></div>
            <span className="text-xs text-[#6B7280]">Selected</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm border-2 border-[#0F766E]"></div>
            <span className="text-xs text-[#6B7280]">Today</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm bg-[#E5E7EB]"></div>
            <span className="text-xs text-[#6B7280]">Unavailable</span>
          </div>
        </div>
      </div>
    </div>
  );
}
