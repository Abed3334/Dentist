import { useState } from 'react';

interface AppointmentCalendarViewProps {
  appointments: any[];
  onAppointmentClick: (appointment: any) => void;
}

export function AppointmentCalendarView({
  appointments,
  onAppointmentClick
}: AppointmentCalendarViewProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Get week dates
  const getWeekDates = () => {
    const dates = [];
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());

    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const weekDates = getWeekDates();
  const hours = Array.from({ length: 10 }, (_, i) => i + 8); // 8 AM to 5 PM

  // Get appointments for a specific date and hour
  const getAppointmentsForSlot = (date: Date, hour: number) => {
    const dateStr = date.toISOString().split('T')[0];
    return appointments.filter(apt => {
      const aptHour = parseInt(apt.time.split(':')[0]);
      return apt.date === dateStr && aptHour === hour;
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-[#0F766E] border-[#0F766E] text-white';
      case 'pending':
        return 'bg-yellow-50 border-yellow-300 text-yellow-800';
      case 'completed':
        return 'bg-green-50 border-green-300 text-green-800';
      case 'cancelled':
        return 'bg-red-50 border-red-300 text-red-800';
      case 'in-progress':
        return 'bg-blue-50 border-blue-300 text-blue-800';
      default:
        return 'bg-gray-50 border-gray-300 text-gray-800';
    }
  };

  const goToPreviousWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() - 7);
    setCurrentDate(newDate);
  };

  const goToNextWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + 7);
    setCurrentDate(newDate);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  // Mobile: Show only current day
  const currentDayDate = isMobile ? [currentDate] : weekDates;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-[#E5E7EB] overflow-hidden">
      {/* Calendar Header */}
      <div className="p-6 border-b border-[#E5E7EB]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={goToPreviousWeek}
              className="p-2 hover:bg-[#F7FAFC] rounded-lg transition-colors duration-200 cursor-pointer"
            >
              <i className="ri-arrow-left-s-line text-xl text-[#0B1F3B]" />
            </button>
            <h2 className="text-xl font-semibold text-[#0B1F3B]">
              {weekDates[0].toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </h2>
            <button
              onClick={goToNextWeek}
              className="p-2 hover:bg-[#F7FAFC] rounded-lg transition-colors duration-200 cursor-pointer"
            >
              <i className="ri-arrow-right-s-line text-xl text-[#0B1F3B]" />
            </button>
          </div>
          <button
            onClick={goToToday}
            className="px-4 py-2 bg-[#F7FAFC] text-[#0F766E] rounded-lg hover:bg-[#A7F3D0] transition-colors duration-200 font-medium whitespace-nowrap cursor-pointer"
          >
            Today
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="overflow-x-auto">
        <div className="min-w-[800px]">
          {/* Day Headers */}
          <div className="grid grid-cols-8 border-b border-[#E5E7EB]">
            <div className="p-4 bg-[#F7FAFC]">
              <span className="text-sm font-medium text-[#6B7280]">Time</span>
            </div>
            {currentDayDate.map((date, idx) => {
              const isToday = date.toDateString() === new Date().toDateString();
              return (
                <div
                  key={idx}
                  className={`p-4 text-center ${isToday ? 'bg-[#A7F3D0]' : 'bg-[#F7FAFC]'}`}
                >
                  <div className="text-sm font-medium text-[#0B1F3B]">
                    {date.toLocaleDateString('en-US', { weekday: 'short' })}
                  </div>
                  <div
                    className={`text-lg font-semibold mt-1 ${
                      isToday ? 'text-[#0F766E]' : 'text-[#0B1F3B]'
                    }`}
                  >
                    {date.getDate()}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Time Slots */}
          <div className="divide-y divide-[#E5E7EB]">
            {hours.map(hour => (
              <div key={hour} className="grid grid-cols-8">
                <div className="p-4 bg-[#F7FAFC] border-r border-[#E5E7EB]">
                  <span className="text-sm font-medium text-[#6B7280]">
                    {hour.toString().padStart(2, '0')}:00
                  </span>
                </div>
                {currentDayDate.map((date, idx) => {
                  const slotAppointments = getAppointmentsForSlot(date, hour);
                  return (
                    <div
                      key={idx}
                      className="p-2 border-r border-[#E5E7EB] min-h-[80px] hover:bg-[#F7FAFC] transition-colors duration-150"
                    >
                      {slotAppointments.map(apt => (
                        <div
                          key={apt.id}
                          onClick={() => onAppointmentClick(apt)}
                          className={`p-2 rounded-lg border-2 mb-2 cursor-pointer hover:shadow-md transition-all duration-200 ${getStatusColor(
                            apt.status
                          )}`}
                        >
                          <div className="text-xs font-semibold mb-1">{apt.time}</div>
                          <div className="text-xs font-medium mb-1">{apt.patient.name}</div>
                          <div className="text-xs opacity-90">{apt.service.name}</div>
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}