import { useState } from 'react';

interface CancelAppointmentModalProps {
  appointment: any;
  onClose: () => void;
  onConfirm: (reason: string) => void;
}

export function CancelAppointmentModal({
  appointment,
  onClose,
  onConfirm
}: CancelAppointmentModalProps) {
  const [reason, setReason] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!reason.trim()) {
      setError('Please provide a cancellation reason');
      return;
    }

    onConfirm(reason);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
        {/* Header */}
        <div className="p-6 border-b border-[#E5E7EB]">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <i className="ri-error-warning-line text-2xl text-red-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#0B1F3B]">Cancel Appointment</h2>
              <p className="text-sm text-[#6B7280] mt-1">This action cannot be undone</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Appointment Info */}
          <div className="p-4 bg-[#F7FAFC] rounded-xl">
            <div className="flex items-center gap-3 mb-3">
              <img
                src={appointment.patient.avatar}
                alt={appointment.patient.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <div className="font-semibold text-[#0B1F3B]">{appointment.patient.name}</div>
                <div className="text-sm text-[#6B7280]">{appointment.service.name}</div>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm text-[#6B7280]">
              <div className="flex items-center gap-2">
                <i className="ri-calendar-line" />
                <span>{appointment.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <i className="ri-time-line" />
                <span>{appointment.time}</span>
              </div>
            </div>
          </div>

          {/* Reason */}
          <div>
            <label className="block text-sm font-semibold text-[#0B1F3B] mb-2">
              Cancellation Reason <span className="text-red-500">*</span>
            </label>
            <textarea
              value={reason}
              onChange={e => {
                setReason(e.target.value);
                setError('');
              }}
              rows={4}
              placeholder="Please provide a reason for cancellation..."
              className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors duration-200 resize-none ${
                error
                  ? 'border-red-300 focus:border-red-500'
                  : 'border-[#E5E7EB] focus:border-[#0F766E]'
              }`}
            />
            {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border-2 border-[#E5E7EB] text-[#6B7280] rounded-xl hover:bg-[#F7FAFC] transition-colors duration-200 font-medium whitespace-nowrap cursor-pointer"
            >
              Keep Appointment
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors duration-200 font-medium whitespace-nowrap cursor-pointer"
            >
              Cancel Appointment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}