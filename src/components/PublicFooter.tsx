import { useState } from 'react';
import { Link } from 'react-router-dom';
import { LOGO_SRC } from '@/constants/assets';

export default function PublicFooter() {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setEmail('');
  };

  return (
    <footer className="mt-16 bg-[#1a2a38] relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 pt-12 sm:pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 mb-12">
          {/* Branding + newsletter */}
          <div className="md:col-span-4 lg:col-span-4">
            <div className="flex items-center gap-2 mb-6">
              <img
                src={LOGO_SRC}
                alt="Dentist Logo"
                className="h-10 w-10 object-contain brightness-0 invert"
              />
              <span className="text-xl sm:text-2xl font-bold text-white">Dentist</span>
            </div>
            <form onSubmit={handleSubscribe} className="flex gap-2 mb-6">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 min-w-0 px-4 py-3 bg-transparent border border-white rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-[#28a745] focus:border-[#28a745]"
                aria-label="Email for newsletter"
              />
              <button
                type="submit"
                className="shrink-0 w-12 h-12 bg-[#0F766E] hover:bg-[#0B5B54] rounded-lg flex items-center justify-center text-white transition-colors duration-200 cursor-pointer"
                aria-label="Subscribe"
              >
                <i className="ri-search-line text-lg" />
              </button>
            </form>
            <p className="text-white text-base sm:text-lg leading-relaxed">
              Your trusted partner in dental health.
            </p>
          </div>

          {/* Link columns */}
          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white text-sm font-semibold uppercase tracking-wide mb-4">Services</h3>
              <ul className="space-y-3">
                <li><Link to="/services" className="text-white/80 hover:text-white transition-colors cursor-pointer">Our Services</Link></li>
                <li><Link to="/services" className="text-white/80 hover:text-white transition-colors cursor-pointer">Cleaning</Link></li>
                <li><Link to="/services" className="text-white/80 hover:text-white transition-colors cursor-pointer">Whitening & Implants</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white text-sm font-semibold uppercase tracking-wide mb-4">Company</h3>
              <ul className="space-y-3">
                <li><Link to="/about" className="text-white/80 hover:text-white transition-colors cursor-pointer">About</Link></li>
                <li><Link to="/testimonials" className="text-white/80 hover:text-white transition-colors cursor-pointer">Testimonials</Link></li>
                <li><Link to="/contact" className="text-white/80 hover:text-white transition-colors cursor-pointer">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white text-sm font-semibold uppercase tracking-wide mb-4">Support</h3>
              <ul className="space-y-3">
                <li><Link to="/contact" className="text-white/80 hover:text-white transition-colors cursor-pointer">Contact</Link></li>
                <li><Link to="/book-appointment" className="text-white/80 hover:text-white transition-colors cursor-pointer">Book Appointment</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white text-sm font-semibold uppercase tracking-wide mb-4">Legal</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-white/80 hover:text-white transition-colors cursor-pointer">Privacy</a></li>
                <li><a href="#" className="text-white/80 hover:text-white transition-colors cursor-pointer">Terms</a></li>
                <li><a href="#" className="text-white/80 hover:text-white transition-colors cursor-pointer">Cookies</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Copyright + social */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/70 text-sm">© 2025 Dentist. All rights reserved.</p>
          <div className="flex items-center gap-3">
            <a href="#" className="w-10 h-10 rounded-lg border border-white/30 flex items-center justify-center text-white hover:bg-[#0F766E] hover:border-[#0F766E] transition-all duration-200 cursor-pointer" aria-label="Facebook">
              <i className="ri-facebook-fill" />
            </a>
            <a href="#" className="w-10 h-10 rounded-lg border border-white/30 flex items-center justify-center text-white hover:bg-[#0F766E] hover:border-[#0F766E] transition-all duration-200 cursor-pointer" aria-label="Instagram">
              <i className="ri-instagram-line" />
            </a>
            <a href="#" className="w-10 h-10 rounded-lg border border-white/30 flex items-center justify-center text-white hover:bg-[#0F766E] hover:border-[#0F766E] transition-all duration-200 cursor-pointer" aria-label="X (Twitter)">
              <i className="ri-twitter-x-line" />
            </a>
            <a href="#" className="w-10 h-10 rounded-lg border border-white/30 flex items-center justify-center text-white hover:bg-[#0F766E] hover:border-[#0F766E] transition-all duration-200 cursor-pointer" aria-label="LinkedIn">
              <i className="ri-linkedin-fill" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
