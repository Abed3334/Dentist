import { useState } from 'react';
import UserLayout from '@/layouts/UserLayout';
import StepService from './components/StepService';
import StepDoctor from './components/StepDoctor';
import StepDate from './components/StepDate';
import StepTime from './components/StepTime';
import StepDetails from './components/StepDetails';
import ConfirmationScreen from './components/ConfirmationScreen';
import { services } from '../../../mocks/services';
import { doctors } from '../../../mocks/doctors';

const steps = [
  { label: 'Service', icon: 'ri-service-line' },
  { label: 'Doctor', icon: 'ri-stethoscope-line' },
  { label: 'Date', icon: 'ri-calendar-line' },
  { label: 'Time', icon: 'ri-time-line' },
  { label: 'Details', icon: 'ri-user-line' },
];

export default function BookAppointmentPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const [selectedDoctor, setSelectedDoctor] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [patientDetails, setPatientDetails] = useState({
    name: '',
    phone: '',
    email: '',
    notes: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return selectedService !== null;
      case 1:
        return selectedDoctor !== null;
      case 2:
        return selectedDate !== '';
      case 3:
        return selectedTime !== '';
      case 4:
        // Don't validate here - only check if fields have values
        return patientDetails.name.trim() !== '' && 
               patientDetails.phone.trim() !== '' && 
               patientDetails.email.trim() !== '';
      default:
        return false;
    }
  };

  const validateDetails = () => {
    const newErrors: Record<string, string> = {};
    if (!patientDetails.name.trim()) newErrors.name = 'Full name is required';
    if (!patientDetails.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[+]?[\d\s()-]{7,}$/.test(patientDetails.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    if (!patientDetails.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(patientDetails.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (currentStep === 4) {
      if (!validateDetails()) return;
      handleSubmit();
      return;
    }
    if (canProceed()) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setErrors({});
    }
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    const serviceObj = services.find((s) => s.id === selectedService);
    const doctorObj = doctors.find((d) => d.id === selectedDoctor);

    try {
      const formData = new URLSearchParams();
      formData.append('name', patientDetails.name);
      formData.append('phone', patientDetails.phone);
      formData.append('email', patientDetails.email);
      formData.append('notes', patientDetails.notes);
      formData.append('service', serviceObj?.name || '');
      formData.append('doctor', doctorObj?.name || '');
      formData.append('date', selectedDate);
      formData.append('time', selectedTime);

      // Replace with your booking API endpoint when ready
      // await fetch('/api/book', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: formData.toString() });
    } catch (error) {
      // Log the error for debugging but continue execution
      console.error('Booking submission failed:', error);
    }

    const ref = `DNT-${Date.now().toString(36).toUpperCase().slice(-6)}`;
    setBookingRef(ref);
    setSubmitting(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    const serviceObj = services.find((s) => s.id === selectedService);
    const doctorObj = doctors.find((d) => d.id === selectedDoctor);
    return (
      <UserLayout>
        <div className="max-w-2xl mx-auto">
          <ConfirmationScreen
            bookingRef={bookingRef}
            serviceName={serviceObj?.name || ''}
            doctorName={doctorObj?.name || ''}
            date={selectedDate}
            time={selectedTime}
          />
        </div>
      </UserLayout>
    );
  }

  return (
    <UserLayout>
      <div className="max-w-4xl mx-auto pb-24 sm:pb-8">
        {/* Progress: mobile compact, desktop full stepper */}
        <div className="sm:hidden mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-[#6B7280]">
              Step {currentStep + 1} of {steps.length}
            </span>
            <span className="text-sm font-semibold text-[#0F766E]">{steps[currentStep].label}</span>
          </div>
          <div className="h-1.5 w-full bg-[#E5E7EB] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#0F766E] rounded-full transition-all duration-300 ease-out"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>
        <div className="hidden sm:block overflow-x-auto overflow-y-hidden pb-2 -mx-1">
          <div className="flex items-center justify-center mb-8 min-w-[320px]">
            {steps.map((step, idx) => (
              <div key={idx} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                      idx < currentStep
                        ? 'bg-[#0F766E] text-white'
                        : idx === currentStep
                        ? 'bg-[#0F766E] text-white ring-4 ring-[#0F766E]/20'
                        : 'bg-[#E5E7EB] text-[#6B7280]'
                    }`}
                  >
                    {idx < currentStep ? (
                      <i className="ri-check-line"></i>
                    ) : (
                      <i className={`${step.icon}`}></i>
                    )}
                  </div>
                  <span
                    className={`text-xs mt-2 font-medium whitespace-nowrap ${
                      idx <= currentStep ? 'text-[#0F766E]' : 'text-[#6B7280]'
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
                {idx < steps.length - 1 && (
                  <div
                    className={`w-12 lg:w-20 h-0.5 mx-1 lg:mx-2 transition-all duration-300 ${
                      idx < currentStep ? 'bg-[#0F766E]' : 'bg-[#E5E7EB]'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content with transition */}
        <div className="bg-white rounded-2xl border border-[#E5E7EB] p-4 sm:p-6 lg:p-8 shadow-sm mb-6">
          <form id="book-appointment-form" onSubmit={(e) => e.preventDefault()}>
            <div key={currentStep} className="animate-fade-in">
              {currentStep === 0 && (
                <StepService selectedService={selectedService} onSelect={setSelectedService} />
              )}
              {currentStep === 1 && (
                <StepDoctor selectedDoctor={selectedDoctor} onSelect={setSelectedDoctor} />
              )}
              {currentStep === 2 && (
                <StepDate selectedDate={selectedDate} onSelect={setSelectedDate} />
              )}
              {currentStep === 3 && (
                <StepTime
                  selectedTime={selectedTime}
                  onSelect={setSelectedTime}
                  selectedDate={selectedDate}
                />
              )}
              {currentStep === 4 && (
                <StepDetails details={patientDetails} onChange={setPatientDetails} errors={errors} />
              )}
            </div>
          </form>
        </div>

        {/* Sticky bottom nav on mobile, inline on desktop */}
        <div className="fixed bottom-0 left-0 right-0 sm:relative sm:bottom-auto bg-white border-t border-[#E5E7EB] sm:border-0 sm:bg-transparent p-4 sm:p-0 z-30">
          <div className="max-w-4xl mx-auto flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleBack}
              disabled={currentStep === 0}
              className={`flex items-center justify-center gap-2 px-6 py-3.5 min-h-[52px] sm:min-h-[48px] rounded-xl font-medium text-sm transition-all duration-200 whitespace-nowrap ${
                currentStep === 0
                  ? 'text-[#D1D5DB] cursor-not-allowed'
                  : 'border-2 border-[#0F766E] text-[#0F766E] hover:bg-[#F0FDF9] active:bg-[#E6F9F5] cursor-pointer'
              }`}
            >
              <i className="ri-arrow-left-line text-lg"></i>
              Back
            </button>

            <button
              type="button"
              onClick={handleNext}
              disabled={!canProceed() || submitting}
              className={`flex items-center justify-center gap-2 px-8 py-3.5 min-h-[52px] sm:min-h-[48px] rounded-xl font-medium text-sm transition-all duration-200 whitespace-nowrap ${
                canProceed() && !submitting
                  ? 'bg-[#0F766E] text-white hover:bg-[#0B5B54] active:bg-[#0A534C] shadow-md hover:shadow-lg cursor-pointer'
                  : 'bg-[#E5E7EB] text-[#9CA3AF] cursor-not-allowed'
              }`}
            >
              {submitting ? (
                <>
                  <i className="ri-loader-4-line animate-spin text-lg"></i>
                  Booking...
                </>
              ) : currentStep === 4 ? (
                <>
                  Confirm Booking
                  <i className="ri-check-line text-lg"></i>
                </>
              ) : (
                <>
                  Next
                  <i className="ri-arrow-right-line text-lg"></i>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Summary Bar */}
        {(selectedService || selectedDoctor || selectedDate || selectedTime) && (
          <div className="mt-6 bg-[#F0FDF9] rounded-xl p-4 flex flex-wrap items-center gap-2 sm:gap-3 text-sm">
            <span className="text-[#6B7280] font-medium w-full sm:w-auto">Summary:</span>
            {selectedService && (
              <span className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-1.5 bg-white rounded-lg text-[#0B1F3B] border border-[#E5E7EB]">
                <i className="ri-service-line text-[#0F766E]"></i>
                <span className="truncate max-w-[120px] sm:max-w-none">{services.find((s) => s.id === selectedService)?.name}</span>
              </span>
            )}
            {selectedDoctor && (
              <span className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-1.5 bg-white rounded-lg text-[#0B1F3B] border border-[#E5E7EB]">
                <i className="ri-stethoscope-line text-[#0F766E]"></i>
                <span className="truncate max-w-[100px] sm:max-w-none">{doctors.find((d) => d.id === selectedDoctor)?.name}</span>
              </span>
            )}
            {selectedDate && (
              <span className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-1.5 bg-white rounded-lg text-[#0B1F3B] border border-[#E5E7EB]">
                <i className="ri-calendar-line text-[#0F766E]"></i>
                {new Date(selectedDate + 'T00:00:00').toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                })}
              </span>
            )}
            {selectedTime && (
              <span className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-1.5 bg-white rounded-lg text-[#0B1F3B] border border-[#E5E7EB]">
                <i className="ri-time-line text-[#0F766E]"></i>
                {selectedTime}
              </span>
            )}
          </div>
        )}
      </div>
    </UserLayout>
  );
}
