import { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { patients, doctors, services } from '../../../../mocks/appointments';

interface CreateAppointmentModalProps {
  onClose: () => void;
  onSubmit: (data: any) => void;
  existingAppointments: any[];
}

export function CreateAppointmentModal({
  onClose,
  onSubmit,
  existingAppointments
}: CreateAppointmentModalProps) {
  const [formData, setFormData] = useState({
    patientId: '',
    serviceId: '',
    doctorId: '',
    date: '',
    time: '',
    notes: ''
  });
  const [errors, setErrors] = useState<any>({});
  const [conflictWarning, setConflictWarning] = useState('');

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setErrors((prev: any) => ({ ...prev, [field]: '' }));

    // Check for conflicts when date, time, or doctor changes
    if ((field === 'date' || field === 'time' || field === 'doctorId') && formData.doctorId) {
      checkConflict({ ...formData, [field]: value });
    }
  };

  const checkConflict = (data: any) => {
    if (!data.date || !data.time || !data.doctorId) {
      setConflictWarning('');
      return;
    }

    const conflict = existingAppointments.find(
      apt =>
        apt.date === data.date &&
        apt.time === data.time &&
        apt.doctor.id.toString() === data.doctorId &&
        apt.status !== 'cancelled'
    );

    if (conflict) {
      const doctor = doctors.find(d => d.id.toString() === data.doctorId);
      setConflictWarning(
        `Warning: ${doctor?.name} already has an appointment at this time with ${conflict.patient.name}`
      );
    } else {
      setConflictWarning('');
    }
  };

  const validate = () => {
    const newErrors: any = {};

    if (!formData.patientId) newErrors.patientId = 'Patient is required';
    if (!formData.serviceId) newErrors.serviceId = 'Service is required';
    if (!formData.doctorId) newErrors.doctorId = 'Doctor is required';
    if (!formData.date) newErrors.date = 'Date is required';
    if (!formData.time) newErrors.time = 'Time is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    const patient = patients.find(p => p.id.toString() === formData.patientId);
    const service = services.find(s => s.id.toString() === formData.serviceId);
    const doctor = doctors.find(d => d.id.toString() === formData.doctorId);

    onSubmit({
      patient,
      service,
      doctor,
      date: formData.date,
      time: formData.time,
      notes: formData.notes,
      amount: service?.duration ? service.duration * 2 : 100
    });
  };

  return (
    <Modal open onClose={onClose} title="Create Appointment" size="md">
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        <p className="text-sm text-muted -mt-2">Schedule a new patient appointment</p>
        {/* Conflict Warning */}
          {conflictWarning && (
            <div className="p-4 bg-yellow-50 border-2 border-yellow-300 rounded-xl flex items-start gap-3">
              <i className="ri-error-warning-line text-xl text-yellow-600 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-yellow-800">{conflictWarning}</p>
              </div>
            </div>
          )}

          {/* Patient */}
          <div>
            <label className="block text-sm font-semibold text-[#0B1F3B] mb-2">
              Patient <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.patientId}
              onChange={e => handleChange('patientId', e.target.value)}
              className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors duration-200 cursor-pointer ${
                errors.patientId
                  ? 'border-red-300 focus:border-red-500'
                  : 'border-[#E5E7EB] focus:border-[#0F766E]'
              }`}
            >
              <option value="">Select patient</option>
              {patients.map(patient => (
                <option key={patient.id} value={patient.id}>
                  {patient.name}
                </option>
              ))}
            </select>
            {errors.patientId && (
              <p className="text-sm text-red-500 mt-1">{errors.patientId}</p>
            )}
          </div>

          {/* Service */}
          <div>
            <label className="block text-sm font-semibold text-[#0B1F3B] mb-2">
              Service <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.serviceId}
              onChange={e => handleChange('serviceId', e.target.value)}
              className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors duration-200 cursor-pointer ${
                errors.serviceId
                  ? 'border-red-300 focus:border-red-500'
                  : 'border-[#E5E7EB] focus:border-[#0F766E]'
              }`}
            >
              <option value="">Select service</option>
              {services.map(service => (
                <option key={service.id} value={service.id}>
                  {service.name} ({service.duration} min)
                </option>
              ))}
            </select>
            {errors.serviceId && (
              <p className="text-sm text-red-500 mt-1">{errors.serviceId}</p>
            )}
          </div>

          {/* Doctor */}
          <div>
            <label className="block text-sm font-semibold text-[#0B1F3B] mb-2">
              Doctor <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.doctorId}
              onChange={e => handleChange('doctorId', e.target.value)}
              className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors duration-200 cursor-pointer ${
                errors.doctorId
                  ? 'border-red-300 focus:border-red-500'
                  : 'border-[#E5E7EB] focus:border-[#0F766E]'
              }`}
            >
              <option value="">Select doctor</option>
              {doctors.map(doctor => (
                <option key={doctor.id} value={doctor.id}>
                  {doctor.name}
                </option>
              ))}
            </select>
            {errors.doctorId && (
              <p className="text-sm text-red-500 mt-1">{errors.doctorId}</p>
            )}
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-[#0B1F3B] mb-2">
                Date <span className="text-red-500">*</span>
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

            <div>
              <label className="block text-sm font-semibold text-[#0B1F3B] mb-2">
                Time <span className="text-red-500">*</span>
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
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-semibold text-[#0B1F3B] mb-2">Notes</label>
            <textarea
              value={formData.notes}
              onChange={e => handleChange('notes', e.target.value)}
              rows={4}
              placeholder="Add any special notes or instructions..."
              className="w-full px-4 py-3 border-2 border-[#E5E7EB] rounded-xl focus:border-[#0F766E] focus:outline-none transition-colors duration-200 resize-none"
            />
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
              Create Appointment
            </button>
          </div>
        </form>
    </Modal>
  );
}