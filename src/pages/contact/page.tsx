
import { Link } from 'react-router-dom';
import ContactHero from './components/ContactHero';
import ContactForm from './components/ContactForm';
import ClinicInfoCard from './components/ClinicInfoCard';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#F7FAFC]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-sm z-50">
        <div className="max-w-[1440px] mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 cursor-pointer">
            <img
              src="https://public.readdy.ai/ai/img_res/36c4f334-3c41-4aab-914a-d6196bb4adcf.png"
              alt="Dentest Logo"
              className="h-10 w-10 object-contain"
            />
            <span className="text-2xl font-bold text-[#0B1F3B]">Dentest</span>
          </Link>

          <div className="hidden md:flex items-center gap-10">
            <Link to="/#services" className="text-[#6B7280] hover:text-[#0F766E] transition-colors duration-200 font-medium cursor-pointer">Services</Link>
            <Link to="/#about" className="text-[#6B7280] hover:text-[#0F766E] transition-colors duration-200 font-medium cursor-pointer">About</Link>
            <Link to="/#testimonials" className="text-[#6B7280] hover:text-[#0F766E] transition-colors duration-200 font-medium cursor-pointer">Testimonials</Link>
            <Link to="/contact" className="text-[#0F766E] font-medium cursor-pointer">Contact</Link>
          </div>

          <div className="flex items-center gap-4">
            <Link
              to="/login"
              className="px-6 py-3 border-2 border-[#0F766E] text-[#0F766E] rounded-full font-medium hover:bg-[#0F766E] hover:text-white transition-all duration-200 whitespace-nowrap cursor-pointer"
            >
              Login
            </Link>
            <Link
              to="/book-appointment"
              className="px-6 py-3 bg-[#0F766E] text-white rounded-full font-medium hover:bg-[#0B5B54] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 whitespace-nowrap cursor-pointer"
            >
              Book Appointment
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <ContactHero />

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Left – Form */}
            <div className="w-full lg:w-[58%]">
              <ContactForm />
            </div>
            {/* Right – Info */}
            <div className="w-full lg:w-[42%]">
              <ClinicInfoCard />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Mini Section */}
      <section className="pb-20">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="bg-white rounded-2xl shadow-sm border border-[#E5E7EB]/60 p-8 md:p-12">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold text-[#0B1F3B] mb-2">Frequently Asked Questions</h2>
              <p className="text-sm text-[#6B7280]">Quick answers to common questions</p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  q: 'How do I schedule an appointment?',
                  a: 'You can book online through our appointment page, call us directly, or fill out the contact form above and we\'ll get back to you within 24 hours.',
                },
                {
                  q: 'Do you accept insurance?',
                  a: 'Yes, we accept most major dental insurance plans. Contact our billing team for specific coverage details.',
                },
                {
                  q: 'What are your emergency hours?',
                  a: 'Our emergency line is available 24/7. Call +1 (555) 911-DENT for immediate assistance.',
                },
                {
                  q: 'Is parking available?',
                  a: 'Yes, we offer free parking in our dedicated lot behind the building, plus street parking is available nearby.',
                },
              ].map((faq, i) => (
                <div key={i} className="space-y-2">
                  <h4 className="font-semibold text-[#0B1F3B] text-sm flex items-start gap-2">
                    <a href="#faq" className="hover:text-[#0F766E] transition-colors">
                      <i className="ri-question-line text-[#0F766E] w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5" />
                      {faq.q}
                    </a>
                  </h4>
                  <p className="text-sm text-[#6B7280] leading-relaxed pl-7">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0B1F3B] py-10">
        <div className="max-w-[1200px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <img
              src="https://public.readdy.ai/ai/img_res/36c4f334-3c41-4aab-914a-d6196bb4adcf.png"
              alt="Dentest Logo"
              className="h-8 w-8 object-contain brightness-0 invert"
            />
            <span className="text-white font-bold">Dentest</span>
          </div>
          <p className="text-white/60 text-sm">&copy; 2025 Dentest. All rights reserved.</p>
          <a
            href="https://readdy.ai/?ref=logo"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/60 text-sm hover:text-[#A7F3D0] transition-colors cursor-pointer"
          >
            Powered by Readdy
          </a>
        </div>
      </footer>
    </div>
  );
}
