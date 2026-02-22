import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login
    console.log('Login:', formData);
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
                src="https://readdy.ai/api/search-image?query=Modern%20minimalist%20dental%20clinic%20illustration%20with%20friendly%20dentist%20and%20patient%2C%20clean%20white%20medical%20environment%20with%20teal%20accents%2C%20professional%20healthcare%20setting%2C%20flat%20design%20style%20with%20soft%20shadows%2C%20welcoming%20atmosphere%2C%20contemporary%20medical%20illustration&width=800&height=800&seq=login-illustration&orientation=squarish" 
                alt="Dental Care" 
                className="w-full h-auto rounded-3xl shadow-2xl"
              />
            </div>
            <h2 className="text-4xl font-bold text-white mb-4">Welcome Back to Dentest</h2>
            <p className="text-xl text-white/90 leading-relaxed">
              Continue your journey to a healthier, brighter smile with expert dental care.
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-[#F7FAFC]">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-3xl shadow-xl p-10">
            <div className="flex items-center gap-2 mb-8">
              <img 
                src="https://public.readdy.ai/ai/img_res/36c4f334-3c41-4aab-914a-d6196bb4adcf.png" 
                alt="Dentest Logo" 
                className="h-10 w-10 object-contain"
              />
              <span className="text-2xl font-bold text-[#0B1F3B]">Dentest</span>
            </div>

            <div className="mb-8">
              <h1 className="text-3xl font-bold text-[#0B1F3B] mb-2">Sign In</h1>
              <p className="text-[#6B7280]">Access your dental health dashboard</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
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
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className="w-4 h-4 text-[#0F766E] border-[#E5E7EB] rounded focus:ring-[#0F766E] cursor-pointer"
                  />
                  <span className="text-sm text-[#6B7280]">Remember me</span>
                </label>
                <a href="#" className="text-sm text-[#0F766E] hover:text-[#0B5B54] font-medium cursor-pointer">
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-[#0F766E] text-white rounded-xl font-semibold hover:bg-[#0B5B54] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 whitespace-nowrap cursor-pointer"
              >
                Sign In
              </button>
            </form>

            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[#E5E7EB]"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-[#6B7280]">Or continue with</span>
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
              Don't have an account?{' '}
              <Link to="/register" className="text-[#0F766E] hover:text-[#0B5B54] font-semibold cursor-pointer">
                Sign up
              </Link>
            </p>
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