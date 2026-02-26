import { useState } from 'react';
import { Modal } from '@/components/ui/Modal';

interface RescheduleModalProps {
  appointment: any;
  onClose: () => void;
  onSubmit: (data: any) => void;
  existingAppointments: any[];
}

export function RescheduleModal({
  appointment,
  onClose,
  onSubmit,
  existingAppointments
}: RescheduleModalProps) {
  const [formData, setFormData] = useState({
    date: appointment.date,
    time: appointment.time
  });
  const [errors, setErrors] = useState<any>({});
  const [conflictWarning, setConflictWarning] = useState('');

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setErrors((prev: any) => ({ ...prev, [field]: '' }));

    // Check for conflicts
    checkConflict({ ...formData, [field]: value });
  };

  const checkConflict = (data: any) => {
    if (!data.date || !data.time) {
      setConflictWarning('');
      return;
    }

    const conflict = existingAppointments.find(
      apt =>
        apt.id !== appointment.id &&
        apt.date === data.date &&
        apt.time === data.time &&
        apt.doctor.id === appointment.doctor.id &&
        apt.status !== 'cancelled'
    );

    if (conflict) {
      setConflictWarning(
        `Warning: ${appointment.doctor.name} already has an appointment at this time with ${conflict.patient.name}`
      );
    } else {
      setConflictWarning('');
    }
  };

  const validate = () => {
    const newErrors: any = {};

    if (!formData.date) newErrors.date = 'Date is required';
    if (!formData.time) newErrors.time = 'Time is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    onSubmit(formData);
  };

  return (
    <Modal open onClose={onClose} title="Reschedule Appointment" size="sm">
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Current Appointment Info */}
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
            <div className="text-sm text-[#6B7280]">
              Current: {appointment.date} at {appointment.time}
            </div>
          </div>

          {/* Conflict Warning */}
          {conflictWarning && (
            <div className="p-4 bg-yellow-50 border-2 border-yellow-300 rounded-xl flex items-start gap-3">
              <i className="ri-error-warning-line text-xl text-yellow-600 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-yellow-800">{conflictWarning}</p>
              </div>
            </div>
          )}

          {/* New Date */}
          <div>
            <label className="block text-sm font-semibold text-[#0B1F3B] mb-2">
              New Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              value={formData.date}
              onChange={e => handleChange('date', e.target.value)}
              className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors duration-200 cursor-pointer ${
                errors.date
                  ? 'border-red-300 focus:border-red-500'
                  : 'border-[#E5E7EB] focus:border-[#0F766E]'
              }`}
            />
            {errors.date && <p className="text-sm text-red-500 mt-1">{errors.date}</p>}
          </div>

          {/* New Time */}
          <div>
            <label className="block text-sm font-semibold text-[#0B1F3B] mb-2">
              New Time <span className="text-red-500">*</span>
            </label>
            <input
              type="time"
              value={formData.time}
              onChange={e => handleChange('time', e.target.value)}
              className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors duration-200 cursor-pointer ${
                errors.time
                  ? 'border-red-300 focus:border-red-500'
                  : 'border-[#E5E7EB] focus:border-[#0F766E]'
              }`}
            />
            {errors.time && <p className="text-sm text-red-500 mt-1">{errors.time}</p>}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
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
              Reschedule
            </button>
          </div>
        </form>
    </Modal>
  );
}