import { useState } from 'react';
import { Link } from 'react-router-dom';
import { LOGO_SRC } from '@/constants/assets';

export default function RegisterPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    dateOfBirth: '',
    address: '',
    city: '',
    zipCode: '',
    agreeToTerms: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Handle registration
      console.log('Register:', formData);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Illustration */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#0F766E] to-[#0B5B54] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
        </div>
        
        <div className="relative z-10 flex flex-col items-center justify-center w-full p-12">
          <div className="max-w-md text-center">
            <div className="mb-8">
              <img 
                src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=800&h=800&fit=crop" 
                alt="Join Dentist" 
                className="w-full h-auto rounded-3xl shadow-2xl"
              />
            </div>
            <h2 className="text-4xl font-bold text-white mb-4">Join Dentist Today</h2>
            <p className="text-xl text-white/90 leading-relaxed">
              Start your journey to a healthier smile with our expert dental care team.
            </p>
            
            <div className="mt-12 flex justify-center gap-3">
              {[1, 2, 3].map((s) => (
                <div
                  key={s}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    s === step ? 'w-12 bg-white' : 'w-2 bg-white/40'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Registration Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-[#F7FAFC] min-h-screen">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-6 sm:p-8 lg:p-10">
            <div className="flex items-center gap-2 mb-8">
              <img 
                src={LOGO_SRC} 
                alt="Dentist Logo" 
                className="h-10 w-10 object-contain"
              />
              <span className="text-2xl font-bold text-[#0B1F3B]">Dentist</span>
            </div>

            <div className="mb-8">
              <h1 className="text-3xl font-bold text-[#0B1F3B] mb-2">Create Account</h1>
              <p className="text-[#6B7280]">Step {step} of 3: {step === 1 ? 'Personal Info' : step === 2 ? 'Contact Details' : 'Security'}</p>
            </div>

            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex gap-2">
                {[1, 2, 3].map((s) => (
                  <div
                    key={s}
                    className={`h-2 flex-1 rounded-full transition-all duration-300 ${
                      s <= step ? 'bg-[#0F766E]' : 'bg-[#E5E7EB]'
                    }`}
                  />
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Step 1: Personal Info */}
              {step === 1 && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-[#111827] mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border-2 border-[#E5E7EB] rounded-xl focus:border-[#0F766E] focus:outline-none transition-colors duration-200 text-[#111827]"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-[#111827] mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border-2 border-[#E5E7EB] rounded-xl focus:border-[#0F766E] focus:outline-none transition-colors duration-200 text-[#111827]"
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="dateOfBirth" className="block text-sm font-medium text-[#111827] mb-2">
                      Date of Birth
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <i className="ri-calendar-line text-[#6B7280] text-lg"></i>
                      </div>
                      <input
                        type="date"
                        id="dateOfBirth"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                        required
                        className="w-full pl-12 pr-4 py-3 border-2 border-[#E5E7EB] rounded-xl focus:border-[#0F766E] focus:outline-none transition-colors duration-200 text-[#111827]"
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Step 2: Contact Details */}
              {step === 2 && (
                <>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-[#111827] mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <i className="ri-mail-line text-[#6B7280] text-lg"></i>
                      </div>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full pl-12 pr-4 py-3 border-2 border-[#E5E7EB] rounded-xl focus:border-[#0F766E] focus:outline-none transition-colors duration-200 text-[#111827]"
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-[#111827] mb-2">
                      Phone Number
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <i className="ri-phone-line text-[#6B7280] text-lg"></i>
                      </div>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full pl-12 pr-4 py-3 border-2 border-[#E5E7EB] rounded-xl focus:border-[#0F766E] focus:outline-none transition-colors duration-200 text-[#111827]"
                        placeholder="(555) 123-4567"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-[#111827] mb-2">
                      Street Address
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-[#E5E7EB] rounded-xl focus:border-[#0F766E] focus:outline-none transition-colors duration-200 text-[#111827]"
                      placeholder="123 Main St"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="city" className="block text-sm font-medium text-[#111827] mb-2">
                        City
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border-2 border-[#E5E7EB] rounded-xl focus:border-[#0F766E] focus:outline-none transition-colors duration-200 text-[#111827]"
                        placeholder="New York"
                      />
                    </div>
                    <div>
                      <label htmlFor="zipCode" className="block text-sm font-medium text-[#111827] mb-2">
                        ZIP Code
                      </label>
                      <input
                        type="text"
                        id="zipCode"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border-2 border-[#E5E7EB] rounded-xl focus:border-[#0F766E] focus:outline-none transition-colors duration-200 text-[#111827]"
                        placeholder="10001"
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Step 3: Security */}
              {step === 3 && (
                <>
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-[#111827] mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <i className="ri-lock-line text-[#6B7280] text-lg"></i>
                      </div>
                      <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="w-full pl-12 pr-4 py-3 border-2 border-[#E5E7EB] rounded-xl focus:border-[#0F766E] focus:outline-none transition-colors duration-200 text-[#111827]"
                        placeholder="••••••••"
                      />
                    </div>
                    <p className="mt-2 text-xs text-[#6B7280]">Must be at least 8 characters</p>
                  </div>

                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#111827] mb-2">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <i className="ri-lock-line text-[#6B7280] text-lg"></i>
                      </div>
                      <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        className="w-full pl-12 pr-4 py-3 border-2 border-[#E5E7EB] rounded-xl focus:border-[#0F766E] focus:outline-none transition-colors duration-200 text-[#111827]"
                        placeholder="••••••••"
                      />
                    </div>
                  </div>

                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onChange={handleChange}
                      required
                      className="mt-1 w-4 h-4 text-[#0F766E] border-[#E5E7EB] rounded focus:ring-[#0F766E] cursor-pointer"
                    />
                    <span className="text-sm text-[#6B7280]">
                      I agree to the{' '}
                      <a href="#" className="text-[#0F766E] hover:text-[#0B5B54] font-medium">
                        Terms of Service
                      </a>{' '}
                      and{' '}
                      <a href="#" className="text-[#0F766E] hover:text-[#0B5B54] font-medium">
                        Privacy Policy
                      </a>
                    </span>
                  </label>
                </>
              )}

              <div className="flex gap-4">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className="flex-1 py-4 border-2 border-[#E5E7EB] text-[#111827] rounded-xl font-semibold hover:border-[#0F766E] hover:bg-[#F0FDF9] transition-all duration-200 whitespace-nowrap cursor-pointer"
                  >
                    Back
                  </button>
                )}
                <button
                  type="submit"
                  className="flex-1 py-4 bg-[#0F766E] text-white rounded-xl font-semibold hover:bg-[#0B5B54] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 whitespace-nowrap cursor-pointer"
                >
                  {step === 3 ? 'Create Account' : 'Continue'}
                </button>
              </div>
            </form>

            {step === 1 && (
              <>
                <div className="mt-8">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-[#E5E7EB]"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-4 bg-white text-[#6B7280]">Or sign up with</span>
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-4">
                    <button className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-[#E5E7EB] rounded-xl hover:border-[#0F766E] hover:bg-[#F0FDF9] transition-all duration-200 cursor-pointer">
                      <i className="ri-google-fill text-xl text-[#DB4437]"></i>
                      <span className="font-medium text-[#111827] whitespace-nowrap">Google</span>
                    </button>
                    <button className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-[#E5E7EB] rounded-xl hover:border-[#0F766E] hover:bg-[#F0FDF9] transition-all duration-200 cursor-pointer">
                      <i className="ri-facebook-fill text-xl text-[#1877F2]"></i>
                      <span className="font-medium text-[#111827] whitespace-nowrap">Facebook</span>
                    </button>
                  </div>
                </div>

                <p className="mt-8 text-center text-[#6B7280]">
                  Already have an account?{' '}
                  <Link to="/login" className="text-[#0F766E] hover:text-[#0B5B54] font-semibold cursor-pointer">
                    Sign in
                  </Link>
                </p>
              </>
            )}
          </div>

          <div className="mt-6 text-center">
            <Link to="/" className="inline-flex items-center gap-2 text-[#6B7280] hover:text-[#0F766E] transition-colors duration-200 cursor-pointer">
              <i className="ri-arrow-left-line"></i>
              Back to home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}