import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function HomePage() {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle subscription
    setEmail('');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50 transition-all duration-200">
        <div className="max-w-[1440px] mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img 
              src="https://public.readdy.ai/ai/img_res/36c4f334-3c41-4aab-914a-d6196bb4adcf.png" 
              alt="Dentest Logo" 
              className="h-10 w-10 object-contain"
            />
            <span className="text-2xl font-bold text-[#0B1F3B]">Dentest</span>
          </div>
          
          <div className="hidden md:flex items-center gap-10">
            <a href="#services" className="text-[#6B7280] hover:text-[#0F766E] transition-colors duration-200 font-medium cursor-pointer">Services</a>
            <a href="#about" className="text-[#6B7280] hover:text-[#0F766E] transition-colors duration-200 font-medium cursor-pointer">About</a>
            <a href="#testimonials" className="text-[#6B7280] hover:text-[#0F766E] transition-colors duration-200 font-medium cursor-pointer">Testimonials</a>
            <Link to="/contact" className="text-[#6B7280] hover:text-[#0F766E] transition-colors duration-200 font-medium cursor-pointer">Contact</Link>
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

      {/* Hero Section */}
      <section className="pt-32 pb-24 bg-gradient-to-b from-[#F7FAFC] to-[#E6F9F5]">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#A7F3D0] rounded-full">
                <i className="ri-shield-check-line text-[#0F766E]"></i>
                <span className="text-[#0F766E] text-sm font-medium whitespace-nowrap">Trusted by 10,000+ Patients</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold text-[#0B1F3B] leading-tight">
                Your Smile Deserves Expert Care
              </h1>
              
              <p className="text-xl text-[#6B7280] leading-relaxed">
                Modern dental solutions with compassionate care. Book your appointment today and experience the Dentest difference.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Link 
                  to="/book-appointment" 
                  className="inline-flex items-center gap-2 px-8 py-4 bg-[#0F766E] text-white rounded-full text-lg font-medium hover:bg-[#0B5B54] hover:shadow-lg hover:-translate-y-1 transition-all duration-200 whitespace-nowrap cursor-pointer"
                >
                  Book Appointment
                  <i className="ri-arrow-right-line"></i>
                </Link>
                <a 
                  href="#services" 
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white border-2 border-[#0F766E] text-[#0F766E] rounded-full text-lg font-medium hover:bg-[#F0FDF9] transition-all duration-200 whitespace-nowrap cursor-pointer"
                >
                  View Services
                  <i className="ri-arrow-right-line"></i>
                </a>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-[32px] overflow-hidden shadow-2xl">
                <img 
                  src="https://readdy.ai/api/search-image?query=Professional%20friendly%20dentist%20in%20modern%20white%20dental%20clinic%20with%20smiling%20patient%20in%20dental%20chair%2C%20bright%20clean%20medical%20environment%20with%20teal%20and%20mint%20accents%2C%20natural%20window%20lighting%2C%20contemporary%20healthcare%20setting%2C%20warm%20welcoming%20atmosphere%2C%20high-end%20dental%20equipment%20visible%20in%20background%2C%20professional%20medical%20photography%20style&width=800&height=900&seq=hero-dentist-patient&orientation=portrait" 
                  alt="Dentest Dental Care" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute bottom-6 right-6 bg-white rounded-2xl px-6 py-4 shadow-xl">
                <div className="flex items-center gap-2">
                  <span className="text-3xl font-bold text-[#0F766E]">5.0</span>
                  <div className="flex text-yellow-400">
                    <i className="ri-star-fill"></i>
                    <i className="ri-star-fill"></i>
                    <i className="ri-star-fill"></i>
                    <i className="ri-star-fill"></i>
                    <i className="ri-star-fill"></i>
                  </div>
                </div>
                <p className="text-sm text-[#6B7280] mt-1 whitespace-nowrap">Patient Rating</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-[#0F766E] text-sm font-semibold uppercase tracking-wider mb-4">Our Services</p>
            <h2 className="text-5xl font-bold text-[#0B1F3B] mb-6">Comprehensive Dental Solutions</h2>
            <p className="text-xl text-[#6B7280]">From routine checkups to advanced procedures</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: 'ri-sparkling-2-line',
                title: 'Teeth Cleaning',
                description: 'Professional deep cleaning to maintain optimal oral health and prevent cavities.',
                color: '#A7F3D0'
              },
              {
                icon: 'ri-contrast-2-line',
                title: 'Teeth Whitening',
                description: 'Advanced whitening treatments for a brighter, more confident smile.',
                color: '#A7F3D0'
              },
              {
                icon: 'ri-align-center',
                title: 'Braces & Aligners',
                description: 'Modern orthodontic solutions to straighten teeth and improve bite alignment.',
                color: '#A7F3D0'
              },
              {
                icon: 'ri-tooth-line',
                title: 'Dental Implants',
                description: 'Permanent tooth replacement solutions that look and feel natural.',
                color: '#A7F3D0'
              }
            ].map((service, index) => (
              <div 
                key={index}
                className="bg-white border-2 border-[#E5E7EB] rounded-3xl p-8 hover:border-[#A7F3D0] hover:shadow-xl hover:-translate-y-1 transition-all duration-200 cursor-pointer"
              >
                <div className="w-16 h-16 rounded-full bg-[#A7F3D0] flex items-center justify-center mb-6">
                  <i className={`${service.icon} text-3xl text-[#0F766E]`}></i>
                </div>
                <h3 className="text-2xl font-semibold text-[#0B1F3B] mb-4">{service.title}</h3>
                <p className="text-[#6B7280] leading-relaxed mb-6">{service.description}</p>
                <a href="#" className="inline-flex items-center gap-2 text-[#0F766E] font-medium hover:gap-3 transition-all duration-200 cursor-pointer">
                  Learn More
                  <i className="ri-arrow-right-line"></i>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-[#F7FAFC]">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="rounded-[32px] overflow-hidden shadow-xl">
                <img
                  src="https://readdy.ai/api/search-image?query=Modern%20dental%20clinic%20interior%20with%20clean%20white%20walls%20and%20teal%20accent%20furniture%2C%20professional%20dental%20equipment%2C%20bright%20natural%20lighting%20through%20large%20windows%2C%20contemporary%20minimalist%20medical%20office%20design%2C%20warm%20welcoming%20healthcare%20environment%2C%20potted%20plants%2C%20comfortable%20patient%20waiting%20area%20visible%2C%20architectural%20photography%20style&width=800&height=900&seq=about-clinic-interior&orientation=portrait"
                  alt="Dentest Clinic Interior"
                  className="w-full h-[540px] object-cover object-top"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-[#0F766E] rounded-2xl px-8 py-6 shadow-xl">
                <p className="text-4xl font-bold text-white">15+</p>
                <p className="text-[#A7F3D0] text-sm font-medium mt-1 whitespace-nowrap">Years of Excellence</p>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <p className="text-[#0F766E] text-sm font-semibold uppercase tracking-wider mb-4">About Dentest</p>
                <h2 className="text-4xl font-bold text-[#0B1F3B] leading-tight mb-6">
                  Dedicated to Your Dental Health Since 2010
                </h2>
                <p className="text-lg text-[#6B7280] leading-relaxed">
                  At Dentest, we believe everyone deserves a healthy, beautiful smile. Our team of experienced dental professionals combines cutting-edge technology with compassionate care to deliver exceptional results for every patient.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                {[
                  { number: '10,000+', label: 'Happy Patients' },
                  { number: '25+', label: 'Expert Dentists' },
                  { number: '98%', label: 'Satisfaction Rate' },
                  { number: '50+', label: 'Awards Won' },
                ].map((stat, idx) => (
                  <div key={idx} className="bg-white rounded-2xl p-5 border border-[#E5E7EB]">
                    <p className="text-2xl font-bold text-[#0F766E]">{stat.number}</p>
                    <p className="text-sm text-[#6B7280] mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                {[
                  { icon: 'ri-award-line', text: 'Board-certified dental specialists' },
                  { icon: 'ri-microscope-line', text: 'State-of-the-art equipment & technology' },
                  { icon: 'ri-heart-pulse-line', text: 'Patient-first approach with personalized care' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#A7F3D0] flex items-center justify-center flex-shrink-0">
                      <i className={`${item.icon} text-lg text-[#0F766E]`}></i>
                    </div>
                    <p className="text-[#0B1F3B] font-medium">{item.text}</p>
                  </div>
                ))}
              </div>

              <Link
                to="/book-appointment"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#0F766E] text-white rounded-full text-lg font-medium hover:bg-[#0B5B54] hover:shadow-lg hover:-translate-y-1 transition-all duration-200 whitespace-nowrap cursor-pointer"
              >
                Get Started Today
                <i className="ri-arrow-right-line"></i>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 bg-gradient-to-b from-[#F0FDF9] to-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid md:grid-cols-12 gap-12 items-center">
            <div className="md:col-span-3">
              <p className="text-[#0F766E] text-sm font-medium mb-4">/testimonials</p>
              <h2 className="text-4xl font-bold text-[#0B1F3B] leading-tight">
                What Our Patients Say
              </h2>
            </div>

            <div className="md:col-span-9">
              <div className="bg-white rounded-[32px] p-12 shadow-lg relative">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#0B1F3B] rounded-full mb-8">
                  <i className="ri-star-fill text-yellow-400"></i>
                  <span className="text-white font-semibold whitespace-nowrap">4.9</span>
                </div>

                <blockquote className="text-2xl text-[#111827] font-medium leading-relaxed mb-10">
                  "Dentest has completely transformed my dental experience. The staff is incredibly professional and caring, and the modern facilities make every visit comfortable. I finally look forward to my dental appointments!"
                </blockquote>

                <div className="flex items-center gap-4">
                  <img 
                    src="https://readdy.ai/api/search-image?query=Professional%20portrait%20of%20happy%20satisfied%20female%20patient%20smiling%20confidently%20showing%20white%20teeth%2C%20clean%20white%20background%2C%20natural%20lighting%2C%20genuine%20smile%2C%20modern%20professional%20headshot%20style&width=120&height=120&seq=testimonial-patient-1&orientation=squarish" 
                    alt="Sarah Johnson" 
                    className="w-14 h-14 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-lg font-semibold text-[#0B1F3B]">Sarah Johnson</p>
                    <p className="text-[#6B7280]">New York, NY</p>
                  </div>
                </div>

                <div className="absolute bottom-12 right-12 flex gap-3">
                  <button className="w-12 h-12 rounded-lg border-2 border-[#0F766E] text-[#0F766E] flex items-center justify-center hover:bg-[#0F766E] hover:text-white transition-all duration-200 cursor-pointer">
                    <i className="ri-arrow-left-line"></i>
                  </button>
                  <button className="w-12 h-12 rounded-lg bg-[#0F766E] text-white flex items-center justify-center hover:bg-[#0B5B54] hover:shadow-lg transition-all duration-200 cursor-pointer">
                    <i className="ri-arrow-right-line"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-24 bg-[#0F766E] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
        </div>
        
        <div className="max-w-[900px] mx-auto px-6 relative z-10">
          <div className="rounded-[32px] overflow-hidden mb-14 shadow-2xl">
            <img 
              src="https://readdy.ai/api/search-image?query=Happy%20diverse%20patients%20smiling%20in%20modern%20bright%20dental%20clinic%20waiting%20room%2C%20contemporary%20medical%20interior%20with%20teal%20accents%2C%20natural%20window%20light%2C%20welcoming%20atmosphere%2C%20professional%20healthcare%20environment%2C%20clean%20minimalist%20design%2C%20lifestyle%20photography&width=1600&height=800&seq=cta-banner-clinic&orientation=landscape" 
              alt="Transform Your Smile" 
              className="w-full h-[400px] object-cover"
            />
          </div>

          <h2 className="text-4xl font-semibold text-white text-center leading-relaxed mb-12">
            Ready to <span className="italic text-[#A7F3D0]">transform</span> your smile? Book your appointment today and experience <span className="italic text-[#A7F3D0]">premium</span> dental care.
          </h2>

          <div className="flex justify-center">
            <Link 
              to="/book-appointment" 
              className="inline-flex items-center gap-3 px-10 py-5 bg-white text-[#0F766E] rounded-full text-lg font-semibold hover:scale-105 hover:shadow-2xl transition-all duration-200 whitespace-nowrap cursor-pointer"
            >
              Schedule Now
              <i className="ri-arrow-right-line"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-[#0B1F3B] relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="world-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <circle cx="50" cy="50" r="1" fill="#1E3A5F"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#world-pattern)"/>
          </svg>
        </div>

        <div className="max-w-[1440px] mx-auto px-6 pt-20 pb-10 relative z-10">
          <div className="grid md:grid-cols-12 gap-12 mb-14">
            <div className="md:col-span-4">
              <div className="flex items-center gap-2 mb-8">
                <img 
                  src="https://public.readdy.ai/ai/img_res/36c4f334-3c41-4aab-914a-d6196bb4adcf.png" 
                  alt="Dentest Logo" 
                  className="h-10 w-10 object-contain brightness-0 invert"
                />
                <span className="text-2xl font-bold text-white">Dentest</span>
              </div>

              <form onSubmit={handleSubscribe} className="flex gap-2 mb-8">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email" 
                  className="flex-1 px-4 py-3 bg-transparent border-2 border-white rounded-full text-white placeholder-white/60 focus:outline-none focus:border-[#A7F3D0]"
                />
                <button 
                  type="submit"
                  className="w-12 h-12 bg-[#0F766E] rounded-full flex items-center justify-center text-white hover:bg-[#0B5B54] transition-colors duration-200 cursor-pointer"
                >
                  <i className="ri-notification-line"></i>
                </button>
              </form>

              <p className="text-white text-2xl font-medium leading-relaxed">
                Your trusted partner in dental health
              </p>
            </div>

            <div className="md:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-white text-lg font-semibold mb-6">Services</h3>
                <ul className="space-y-4">
                  <li><a href="#" className="text-[#A7F3D0] hover:text-white transition-colors duration-200 cursor-pointer">Cleaning</a></li>
                  <li><a href="#" className="text-[#A7F3D0] hover:text-white transition-colors duration-200 cursor-pointer">Whitening</a></li>
                  <li><a href="#" className="text-[#A7F3D0] hover:text-white transition-colors duration-200 cursor-pointer">Implants</a></li>
                </ul>
              </div>

              <div>
                <h3 className="text-white text-lg font-semibold mb-6">Company</h3>
                <ul className="space-y-4">
                  <li><a href="#" className="text-[#A7F3D0] hover:text-white transition-colors duration-200 cursor-pointer">About</a></li>
                  <li><a href="#" className="text-[#A7F3D0] hover:text-white transition-colors duration-200 cursor-pointer">Careers</a></li>
                  <li><a href="#" className="text-[#A7F3D0] hover:text-white transition-colors duration-200 cursor-pointer">Blog</a></li>
                </ul>
              </div>

              <div>
                <h3 className="text-white text-lg font-semibold mb-6">Support</h3>
                <ul className="space-y-4">
                  <li><a href="#" className="text-[#A7F3D0] hover:text-white transition-colors duration-200 cursor-pointer">FAQ</a></li>
                  <li><a href="#" className="text-[#A7F3D0] hover:text-white transition-colors duration-200 cursor-pointer">Contact</a></li>
                  <li><a href="#" className="text-[#A7F3D0] hover:text-white transition-colors duration-200 cursor-pointer">Help Center</a></li>
                </ul>
              </div>

              <div>
                <h3 className="text-white text-lg font-semibold mb-6">Legal</h3>
                <ul className="space-y-4">
                  <li><a href="#" className="text-[#A7F3D0] hover:text-white transition-colors duration-200 cursor-pointer">Privacy</a></li>
                  <li><a href="#" className="text-[#A7F3D0] hover:text-white transition-colors duration-200 cursor-pointer">Terms</a></li>
                  <li><a href="#" className="text-[#A7F3D0] hover:text-white transition-colors duration-200 cursor-pointer">Cookies</a></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-[#1E3A5F] flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-white text-sm">© 2025 Dentest. All rights reserved.</p>
            
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-lg border border-white/30 flex items-center justify-center text-white hover:bg-[#0F766E] hover:border-[#0F766E] transition-all duration-200 cursor-pointer">
                <i className="ri-facebook-fill"></i>
              </a>
              <a href="#" className="w-10 h-10 rounded-lg border border-white/30 flex items-center justify-center text-white hover:bg-[#0F766E] hover:border-[#0F766E] transition-all duration-200 cursor-pointer">
                <i className="ri-instagram-line"></i>
              </a>
              <a href="#" className="w-10 h-10 rounded-lg border border-white/30 flex items-center justify-center text-white hover:bg-[#0F766E] hover:border-[#0F766E] transition-all duration-200 cursor-pointer">
                <i className="ri-twitter-x-line"></i>
              </a>
              <a href="#" className="w-10 h-10 rounded-lg border border-white/30 flex items-center justify-center text-white hover:bg-[#0F766E] hover:border-[#0F766E] transition-all duration-200 cursor-pointer">
                <i className="ri-linkedin-fill"></i>
              </a>
            </div>

          
          </div>
        </div>
      </footer>
    </div>
  );
}