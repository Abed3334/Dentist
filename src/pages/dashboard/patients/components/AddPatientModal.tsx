
import { useState, useEffect } from 'react';
import type React from 'react';

interface AddPatientModalProps {
  /** Existing patient data for edit mode (optional) */
  patient?: Record<string, any>;
  /** Callback to close the modal */
  onClose: () => void;
  /** Callback with the submitted form data */
  onSubmit: (data: Record<string, any>) => void;
}

/**
 * Modal component for adding or editing a patient.
 * Handles form state, validation and robust error handling.
 */
export function AddPatientModal({
  patient,
  onClose,
  onSubmit,
}: AddPatientModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    address: '',
    insurance: '',
    allergies: '',
    emergencyContact: '',
    notes: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  /** Populate form when editing an existing patient */
  useEffect(() => {
    if (patient) {
      setFormData({
        name: patient.name ?? '',
        email: patient.email ?? '',
        phone: patient.phone ?? '',
        dateOfBirth: patient.dateOfBirth ?? '',
        address: patient.address ?? '',
        insurance: patient.insurance ?? '',
        allergies: patient.allergies ?? '',
        emergencyContact: patient.emergencyContact ?? '',
        notes: patient.notes ?? '',
      });
    }
  }, [patient]);

  /** Validate form fields and set error messages */
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    } else if (!/^\+?[\d\s\-()]+$/.test(formData.phone)) {
      newErrors.phone = 'Invalid phone format';
    }

    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of birth is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /** Submit handler – validates then forwards data */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        onSubmit(formData);
      } catch (err) {
        console.error('Error submitting form:', err);
        // Fallback UI could be added here (e.g., toast notification)
      }
    }
  };

  /** Generic change handler for inputs & textarea */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear field‑specific error as user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-[#E5E7EB] px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-[#0B1F3B]">
            {patient ? 'Edit Patient' : 'Add New Patient'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[#F7FAFC] rounded-lg transition-colors duration-200 cursor-pointer"
            aria-label="Close modal"
          >
            <i className="ri-close-line text-2xl text-[#6B7280]" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-[#111827] mb-2">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors duration-200 ${
                  errors.name
                    ? 'border-red-500'
                    : 'border-[#E5E7EB] focus:border-[#0F766E]'
                }`}
                placeholder="Enter full name"
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? 'error-name' : undefined}
              />
              {errors.name && (
                <p id="error-name" className="text-red-500 text-sm mt-1">
                  {errors.name}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-[#111827] mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors duration-200 ${
                  errors.email
                    ? 'border-red-500'
                    : 'border-[#E5E7EB] focus:border-[#0F766E]'
                }`}
                placeholder="email@example.com"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'error-email' : undefined}
              />
              {errors.email && (
                <p id="error-email" className="text-red-500 text-sm mt-1">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-semibold text-[#111827] mb-2">
                Phone <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors duration-200 ${
                  errors.phone
                    ? 'border-red-500'
                    : 'border-[#E5E7EB] focus:border-[#0F766E]'
                }`}
                placeholder="+1 (555) 123-4567"
                aria-invalid={!!errors.phone}
                aria-describedby={errors.phone ? 'error-phone' : undefined}
              />
              {errors.phone && (
                <p id="error-phone" className="text-red-500 text-sm mt-1">
                  {errors.phone}
                </p>
              )}
            </div>

            {/* Date of Birth */}
            <div>
              <label className="block text-sm font-semibold text-[#111827] mb-2">
                Date of Birth <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors duration-200 cursor-pointer ${
                  errors.dateOfBirth
                    ? 'border-red-500'
                    : 'border-[#E5E7EB] focus:border-[#0F766E]'
                }`}
                aria-invalid={!!errors.dateOfBirth}
                aria-describedby={
                  errors.dateOfBirth ? 'error-dob' : undefined
                }
              />
              {errors.dateOfBirth && (
                <p id="error-dob" className="text-red-500 text-sm mt-1">
                  {errors.dateOfBirth}
                </p>
              )}
            </div>

            {/* Insurance */}
            <div>
              <label className="block text-sm font-semibold text-[#111827] mb-2">
                Insurance Provider
              </label>
              <input
                type="text"
                name="insurance"
                value={formData.insurance}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-[#E5E7EB] rounded-xl focus:border-[#0F766E] focus:outline-none transition-colors duration-200"
                placeholder="e.g., Blue Cross"
              />
            </div>

            {/* Address */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-[#111827] mb-2">
                Address
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-[#E5E7EB] rounded-xl focus:border-[#0F766E] focus:outline-none transition-colors duration-200"
                placeholder="Street address, city, state, zip"
              />
            </div>

            {/* Emergency Contact */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-[#111827] mb-2">
                Emergency Contact
              </label>
              <input
                type="text"
                name="emergencyContact"
                value={formData.emergencyContact}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-[#E5E7EB] rounded-xl focus:border-[#0F766E] focus:outline-none transition-colors duration-200"
                placeholder="Name - Phone"
              />
            </div>

            {/* Allergies */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-[#111827] mb-2">
                Allergies
              </label>
              <input
                type="text"
                name="allergies"
                value={formData.allergies}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-[#E5E7EB] rounded-xl focus:border-[#0F766E] focus:outline-none transition-colors duration-200"
                placeholder="List any known allergies"
              />
            </div>

            {/* Notes */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-[#111827] mb-2">
                Notes
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-3 border-2 border-[#E5E7EB] rounded-xl focus:border-[#0F766E] focus:outline-none transition-colors duration-200 resize-none"
                placeholder="Additional notes or preferences"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 mt-6 pt-6 border-t border-[#E5E7EB]">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border-2 border-[#E5E7EB] text-[#111827] rounded-xl hover:border-[#0F766E] hover:bg-[#F0FDF9] transition-all duration-200 font-medium whitespace-nowrap cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-[#0F766E] text-white rounded-xl hover:bg-[#0B5B54] transition-all duration-200 font-medium whitespace-nowrap cursor-pointer"
            >
              {patient ? 'Save Changes' : 'Add Patient'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
