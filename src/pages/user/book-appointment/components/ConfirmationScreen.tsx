
import React from 'react';
import { Link } from 'react-router-dom';

interface ConfirmationScreenProps {
  bookingRef: string;
  serviceName: string;
  doctorName: string;
  date: string;
  time: string;
}

export default function ConfirmationScreen({
  bookingRef,
  serviceName,
  doctorName,
  date,
  time,
}: ConfirmationScreenProps) {
  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const d = new Date(dateStr + 'T00:00:00');
    return d.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="text-center py-8">
      {/* Success Icon */}
      <div className="w-20 h-20 rounded-full bg-[#A7F3D0] flex items-center justify-center mx-auto mb-6 animate-bounce">
        <i className="ri-check-line text-4xl text-[#0F766E]"></i>
      </div>

      <h2 className="text-3xl font-bold text-[#0B1F3B] mb-2">Appointment Confirmed!</h2>
      <p className="text-[#6B7280] mb-8">Your booking has been successfully scheduled</p>

      {/* Booking Details */}
      <div className="max-w-md mx-auto bg-[#F0FDF9] rounded-2xl p-6 mb-8 text-left">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#0F766E]/10 flex items-center justify-center flex-shrink-0">
              <i className="ri-calendar-line text-[#0F766E]"></i>
            </div>
            <div>
              <p className="text-xs text-[#6B7280]">Date &amp; Time</p>
              <p className="text-sm font-semibold text-[#0B1F3B]">
                {formatDate(date)} at {time}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#0F766E]/10 flex items-center justify-center flex-shrink-0">
              <i className="ri-stethoscope-line text-[#0F766E]"></i>
            </div>
            <div>
              <p className="text-xs text-[#6B7280]">Doctor</p>
              <p className="text-sm font-semibold text-[#0B1F3B]">{doctorName}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#0F766E]/10 flex items-center justify-center flex-shrink-0">
              <i className="ri-service-line text-[#0F766E]"></i>
            </div>
            <div>
              <p className="text-xs text-[#6B7280]">Service</p>
              <p className="text-sm font-semibold text-[#0B1F3B]">{serviceName}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#0F766E]/10 flex items-center justify-center flex-shrink-0">
              <i className="ri-map-pin-line text-[#0F766E]"></i>
            </div>
            <div>
              <p className="text-xs text-[#6B7280]">Location</p>
              <p className="text-sm font-semibold text-[#0B1F3B]">
                123 Dental Ave, Suite 200, New York, NY
              </p>
            </div>
          </div>

          <div className="pt-3 border-t border-[#0F766E]/10 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#0F766E]/10 flex items-center justify-center flex-shrink-0">
              <i className="ri-hashtag text-[#0F766E]"></i>
            </div>
            <div>
              <p className="text-xs text-[#6B7280]">Booking Reference</p>
              <p className="text-sm font-bold text-[#0F766E] font-mono">{bookingRef}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="max-w-md mx-auto space-y-3">
        <Link
          to="/my-appointments"
          className="block w-full py-3.5 bg-[#0F766E] text-white rounded-xl font-medium hover:bg-[#0B5B54] transition-all duration-200 cursor-pointer text-center whitespace-nowrap"
        >
          View My Appointments
        </Link>
        <button
          onClick={() => {
            // Mock add to calendar – can be expanded with proper calendar integration
            try {
              console.log('Add to calendar clicked');
            } catch (err) {
              console.error('Failed to add to calendar:', err);
            }
          }}
          className="block w-full py-3.5 border-2 border-[#0F766E] text-[#0F766E] rounded-xl font-medium hover:bg-[#F0FDF9] transition-all duration-200 cursor-pointer whitespace-nowrap"
        >
          <i className="ri-calendar-event-line mr-2"></i>
          Add to Calendar
        </button>
      </div>
    </div>
  );
}
