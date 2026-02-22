
import React from 'react';

interface PatientDetails {
  name: string;
  phone: string;
  email: string;
  notes: string;
}

interface StepDetailsProps {
  details: PatientDetails;
  onChange: (details: PatientDetails) => void;
  errors: Record<string, string>;
}

/**
 * StepDetails – Renders a form section for patient information.
 *
 * The component is now defensive:
 *  - It validates the `details` prop shape at runtime (useful in JS environments).
 *  - It guards `onChange` calls with a try/catch to avoid breaking the parent
 *    component if an unexpected error occurs.
 *  - It ensures the `notes` length never exceeds the defined limit.
 */
export default function StepDetails({
  details,
  onChange,
  errors,
}: StepDetailsProps) {
  // Runtime guard – helps catch accidental prop mismatches in plain‑JS projects.
  const safeDetails: PatientDetails = {
    name: details?.name ?? '',
    phone: details?.phone ?? '',
    email: details?.email ?? '',
    notes: details?.notes ?? '',
  };

  const handleChange = (field: keyof PatientDetails, value: string) => {
    try {
      onChange({ ...safeDetails, [field]: value });
    } catch (err) {
      // Fail‑soft: log the error but keep the UI functional.
      console.error('StepDetails: onChange failed', err);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#0B1F3B] mb-2">
        Patient Information
      </h2>
      <p className="text-[#6B7280] mb-8">
        Please provide your details to complete booking
      </p>

      <div className="max-w-lg mx-auto space-y-5">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-[#111827] mb-1.5">
            Full Name <span className="text-[#0F766E]">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <i className="ri-user-line text-[#6B7280]" />
            </div>
            <input
              type="text"
              name="name"
              value={safeDetails.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="Enter your full name"
              className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl text-sm focus:outline-none transition-colors duration-200 ${
                errors.name
                  ? 'border-red-400 focus:border-red-500'
                  : 'border-[#E5E7EB] focus:border-[#0F766E]'
              }`}
            />
          </div>
          {errors.name && (
            <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
              <i className="ri-error-warning-line" /> {errors.name}
            </p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-[#111827] mb-1.5">
            Phone Number <span className="text-[#0F766E]">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <i className="ri-phone-line text-[#6B7280]" />
            </div>
            <input
              type="tel"
              name="phone"
              value={safeDetails.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              placeholder="+1 (555) 123-4567"
              className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl text-sm focus:outline-none transition-colors duration-200 ${
                errors.phone
                  ? 'border-red-400 focus:border-red-500'
                  : 'border-[#E5E7EB] focus:border-[#0F766E]'
              }`}
            />
          </div>
          {errors.phone && (
            <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
              <i className="ri-error-warning-line" /> {errors.phone}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-[#111827] mb-1.5">
            Email Address <span className="text-[#0F766E]">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <i className="ri-mail-line text-[#6B7280]" />
            </div>
            <input
              type="email"
              name="email"
              value={safeDetails.email}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="you@example.com"
              className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl text-sm focus:outline-none transition-colors duration-200 ${
                errors.email
                  ? 'border-red-400 focus:border-red-500'
                  : 'border-[#E5E7EB] focus:border-[#0F766E]'
              }`}
            />
          </div>
          {errors.email && (
            <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
              <i className="ri-error-warning-line" /> {errors.email}
            </p>
          )}
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm font-medium text-[#111827] mb-1.5">
            Additional Notes
          </label>
          <textarea
            name="notes"
            value={safeDetails.notes}
            onChange={(e) => {
              // Enforce max length both via UI and logic safety.
              const newVal = e.target.value;
              if (newVal.length <= 500) {
                handleChange('notes', newVal);
              }
            }}
            placeholder="Any specific concerns or requirements?"
            rows={4}
            maxLength={500}
            className="w-full px-4 py-3 border-2 border-[#E5E7EB] rounded-xl text-sm focus:outline-none focus:border-[#0F766E] transition-colors duration-200 resize-none"
          />
          <p className="text-right text-xs text-[#6B7280] mt-1">
            {safeDetails.notes.length}/500
          </p>
        </div>
      </div>
    </div>
  );
}
