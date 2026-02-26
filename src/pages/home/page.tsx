import { useState } from 'react';
import { Link } from 'react-router-dom';

const TESTIMONIALS = [
  {
    quote: "Dentist has completely transformed my dental experience. The staff is incredibly professional and caring, and the modern facilities make every visit comfortable. I finally look forward to my dental appointments!",
    name: "Sarah Johnson",
    location: "New York, NY",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop&crop=face",
    rating: 4.9,
  },
  {
    quote: "From my first consultation to my implant procedure, everything was seamless. The team explained every step and made me feel at ease. My new smile looks natural and I couldn't be happier.",
    name: "Michael Chen",
    location: "San Francisco, CA",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=face",
    rating: 5,
  },
  {
    quote: "I was nervous about getting braces as an adult, but the orthodontics team was so supportive. The results exceeded my expectations. Highly recommend to anyone considering treatment.",
    name: "Emily Rodriguez",
    location: "Austin, TX",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&h=120&fit=crop&crop=face",
    rating: 4.9,
  },
];

const FAQ_ITEMS = [
  {
    question: "How do I book an appointment?",
    answer: "You can book online through our website 24/7, call us during office hours, or visit in person. We'll confirm your appointment and send reminders before your visit.",
  },
  {
    question: "Do you accept insurance?",
    answer: "Yes, we accept most major dental insurance plans. Our team will verify your coverage and help you understand your benefits. We also offer flexible payment plans for treatments not fully covered.",
  },
  {
    question: "What should I bring to my first visit?",
    answer: "Please bring your ID, insurance card (if applicable), and any previous dental records or X-rays. Arrive 10–15 minutes early to complete new patient forms.",
  },
  {
    question: "Do you handle dental emergencies?",
    answer: "Yes. We reserve same-day slots for emergencies. Call us as soon as possible and we'll do our best to see you the same day for pain, trauma, or urgent issues.",
  },
  {
    question: "How often should I have a checkup?",
    answer: "We recommend a routine checkup and cleaning every six months for most patients. Your dentist may suggest a different schedule based on your oral health needs.",
  },
];

const WHY_CHOOSE = [
  { icon: 'ri-award-line', title: 'Board-Certified Specialists', desc: 'Our dentists hold advanced certifications and stay current with the latest techniques.' },
  { icon: 'ri-customer-service-2-line', title: 'Same-Day Appointments', desc: 'We prioritize your schedule with flexible booking and emergency slots.' },
  { icon: 'ri-shield-check-line', title: 'Sterile & Safe', desc: 'We follow strict infection control and use single-use instruments where required.' },
  { icon: 'ri-money-dollar-circle-line', title: 'Transparent Pricing', desc: 'No surprises. We provide clear estimates and discuss costs before treatment.' },
  { icon: 'ri-heart-pulse-line', title: 'Pain-Free Focus', desc: 'We use modern anesthesia and gentle techniques to keep you comfortable.' },
  { icon: 'ri-time-line', title: 'Minimal Wait Times', desc: 'Efficient scheduling means you spend less time in the waiting room.' },
];

const SERVICES = [
  { icon: 'ri-sparkling-2-line', title: 'Teeth Cleaning', description: 'Professional deep cleaning to maintain optimal oral health and prevent cavities.', href: '/services' },
  { icon: 'ri-contrast-2-line', title: 'Teeth Whitening', description: 'Advanced whitening treatments for a brighter, more confident smile.', href: '/services' },
  { icon: 'ri-align-center', title: 'Braces & Aligners', description: 'Modern orthodontic solutions to straighten teeth and improve bite alignment.', href: '/services' },
  { icon: 'ri-tooth-line', title: 'Dental Implants', description: 'Permanent tooth replacement solutions that look and feel natural.', href: '/services' },
];

export default function HomePage() {
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const nextTestimonial = () => setTestimonialIndex((i) => (i + 1) % TESTIMONIALS.length);
  const prevTestimonial = () => setTestimonialIndex((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);

  return (
    <div className="min-h-screen bg-white">
      {/* Emergency bar */}
      <div className="bg-[#0B1F3B] text-white py-2 px-4 text-center text-sm">
        <span className="font-medium">Dental emergency?</span>{' '}
        <a href="tel:+15551234567" className="underline font-semibold text-[#A7F3D0] hover:text-white transition-colors">Call (555) 123-4567</a>
       
      </div>

      {/* Hero Section */}
      <section className="pt-20 sm:pt-24 md:pt-28 pb-14 sm:pb-20 bg-gradient-to-b from-[#F7FAFC] to-[#E6F9F5] relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M30 0L30 60M0 30L60 30\' stroke=\'%230F766E\' stroke-width=\'1\' fill=\'none\'/%3E%3C/svg%3E")' }} />
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="space-y-6 sm:space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-[#A7F3D0] rounded-full">
                <i className="ri-shield-check-line text-[#0F766E]"></i>
                <span className="text-[#0F766E] text-xs sm:text-sm font-medium whitespace-nowrap">Trusted by 10,000+ Patients</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#0B1F3B] leading-tight">
                Your Smile Deserves Expert Care
              </h1>

              <p className="text-base sm:text-lg md:text-xl text-[#6B7280] leading-relaxed">
                Modern dental solutions with compassionate care. Book your appointment today and experience the Dentist difference.
              </p>

              <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
                <Link
                  to="/book-appointment"
                  className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-[#0F766E] text-white rounded-full text-base sm:text-lg font-medium hover:bg-[#0B5B54] hover:shadow-lg transition-all duration-200 whitespace-nowrap cursor-pointer min-h-[48px]"
                >
                  Book Appointment
                  <i className="ri-arrow-right-line"></i>
                </Link>
                <Link
                  to="/services"
                  className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-white border-2 border-[#0F766E] text-[#0F766E] rounded-full text-base sm:text-lg font-medium hover:bg-[#F0FDF9] transition-all duration-200 whitespace-nowrap cursor-pointer min-h-[48px]"
                >
                  View Services
                  <i className="ri-arrow-right-line"></i>
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-[32px] overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&h=900&fit=crop"
                  alt="Dentist Dental Care"
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

      {/* Trust strip */}
      <section className="py-6 bg-white border-y border-[#E5E7EB]">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-12 text-[#6B7280] text-sm">
            <span className="inline-flex items-center gap-2">
              <i className="ri-calendar-check-line text-[#0F766E] text-lg"></i>
              Open Mon–Sat, 8am–6pm
            </span>
            <span className="inline-flex items-center gap-2">
              <i className="ri-shield-star-line text-[#0F766E] text-lg"></i>
              Certified & Insured
            </span>
            <span className="inline-flex items-center gap-2">
              <i className="ri-medal-line text-[#0F766E] text-lg"></i>
              15+ Years Experience
            </span>
            {/* <span className="inline-flex items-center gap-2">
              <i className="ri-customer-service-2-line text-[#0F766E] text-lg"></i>
              Free Consultation
            </span> */}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-[#FAFAFA]">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-[#0F766E] text-sm font-semibold uppercase tracking-wider mb-4">Our Services</p>
            <h2 className="text-5xl font-bold text-[#0B1F3B] mb-6">Comprehensive Dental Solutions</h2>
            <p className="text-xl text-[#6B7280]">From routine checkups to advanced procedures</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {SERVICES.map((service, index) => (
              <Link
                key={index}
                to={service.href}
                className="group bg-white border-2 border-[#E5E7EB] rounded-3xl p-8 hover:border-[#A7F3D0] hover:shadow-xl hover:-translate-y-1 transition-all duration-200 cursor-pointer block"
              >
                <div className="w-16 h-16 rounded-full bg-[#A7F3D0] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <i className={`${service.icon} text-3xl text-[#0F766E]`}></i>
                </div>
                <h3 className="text-2xl font-semibold text-[#0B1F3B] mb-4">{service.title}</h3>
                <p className="text-[#6B7280] leading-relaxed mb-6">{service.description}</p>
                <span className="inline-flex items-center gap-2 text-[#0F766E] font-medium group-hover:gap-3 transition-all duration-200">
                  Learn More
                  <i className="ri-arrow-right-line"></i>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-[#0F766E] text-sm font-semibold uppercase tracking-wider mb-4">Why Choose Us</p>
            <h2 className="text-4xl sm:text-5xl font-bold text-[#0B1F3B] mb-6">The Dentist Difference</h2>
            <p className="text-xl text-[#6B7280] max-w-2xl mx-auto">We combine expertise, technology, and a patient-first approach so you feel confident and cared for.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {WHY_CHOOSE.map((item, idx) => (
              <div
                key={idx}
                className="flex gap-5 p-6 rounded-2xl border border-[#E5E7EB] hover:border-[#A7F3D0] hover:shadow-lg transition-all duration-200"
              >
                <div className="w-14 h-14 rounded-xl bg-[#E6F9F5] flex items-center justify-center flex-shrink-0">
                  <i className={`${item.icon} text-2xl text-[#0F766E]`}></i>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#0B1F3B] mb-2">{item.title}</h3>
                  <p className="text-[#6B7280] leading-relaxed">{item.desc}</p>
                </div>
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
                  src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=800&h=900&fit=crop"
                  alt="Dentist Clinic Interior"
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
                <p className="text-[#0F766E] text-sm font-semibold uppercase tracking-wider mb-4">About Dentist</p>
                <h2 className="text-4xl font-bold text-[#0B1F3B] leading-tight mb-6">
                  Dedicated to Your Dental Health Since 2010
                </h2>
                <p className="text-lg text-[#6B7280] leading-relaxed">
                  At Dentist, we believe everyone deserves a healthy, beautiful smile. Our team of experienced dental professionals combines cutting-edge technology with compassionate care to deliver exceptional results for every patient.
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
      <section id="testimonials" className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-[#F0FDF9] to-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-center">
            <div className="md:col-span-3 text-center md:text-left">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#0B1F3B] leading-tight">
                What Our Patients Say
              </h2>
              <p className="text-[#6B7280] mt-3">Real stories from people we've helped.</p>
            </div>

            <div className="md:col-span-9 min-w-0">
              <div className="bg-white rounded-2xl sm:rounded-[32px] p-6 sm:p-8 lg:p-12 shadow-lg">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-[#0B1F3B] rounded-full mb-6 sm:mb-8">
                  <i className="ri-star-fill text-yellow-400 text-sm sm:text-base"></i>
                  <span className="text-white font-semibold text-sm sm:text-base">{TESTIMONIALS[testimonialIndex].rating}</span>
                </div>

                <blockquote className="text-lg sm:text-xl lg:text-2xl text-[#111827] font-medium leading-relaxed mb-8 sm:mb-10">
                  &ldquo;{TESTIMONIALS[testimonialIndex].quote}&rdquo;
                </blockquote>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <img
                      src={TESTIMONIALS[testimonialIndex].avatar}
                      alt={TESTIMONIALS[testimonialIndex].name}
                      className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="text-base sm:text-lg font-semibold text-[#0B1F3B]">{TESTIMONIALS[testimonialIndex].name}</p>
                      <p className="text-sm text-[#6B7280]">{TESTIMONIALS[testimonialIndex].location}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                    <button
                      type="button"
                      onClick={prevTestimonial}
                      className="min-h-[48px] min-w-[48px] rounded-xl border-2 border-[#0F766E] text-[#0F766E] flex items-center justify-center hover:bg-[#0F766E] hover:text-white transition-all duration-200 cursor-pointer"
                      aria-label="Previous testimonial"
                    >
                      <i className="ri-arrow-left-line text-xl"></i>
                    </button>
                    <div className="flex gap-1.5">
                      {TESTIMONIALS.map((_, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setTestimonialIndex(i)}
                          className={`w-2.5 h-2.5 rounded-full transition-colors ${i === testimonialIndex ? 'bg-[#0F766E] scale-125' : 'bg-[#E5E7EB] hover:bg-[#A7F3D0]'}`}
                          aria-label={`Go to testimonial ${i + 1}`}
                        />
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={nextTestimonial}
                      className="min-h-[48px] min-w-[48px] rounded-xl bg-[#0F766E] text-white flex items-center justify-center hover:bg-[#0B5B54] hover:shadow-lg transition-all duration-200 cursor-pointer"
                      aria-label="Next testimonial"
                    >
                      <i className="ri-arrow-right-line text-xl"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 bg-white">
        <div className="max-w-[800px] mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-[#0F766E] text-sm font-semibold uppercase tracking-wider mb-4">FAQ</p>
            <h2 className="text-4xl font-bold text-[#0B1F3B] mb-4">Frequently Asked Questions</h2>
            <p className="text-[#6B7280] text-lg">Quick answers to common questions about visits and care.</p>
          </div>
          <div className="space-y-3">
            {FAQ_ITEMS.map((faq, idx) => (
              <div
                key={idx}
                className="border-2 border-[#E5E7EB] rounded-2xl overflow-hidden transition-colors hover:border-[#A7F3D0]"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                  className="w-full flex items-center justify-between gap-4 text-left px-6 py-5 font-semibold text-[#0B1F3B]"
                >
                  <span>{faq.question}</span>
                  <i className={`ri-arrow-down-s-line text-2xl text-[#0F766E] flex-shrink-0 transition-transform duration-200 ${openFaqIndex === idx ? 'rotate-180' : ''}`}></i>
                </button>
                <div
                  className={`grid transition-[grid-template-rows] duration-200 ${openFaqIndex === idx ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-5 pt-0 text-[#6B7280] leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
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
              src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1600&h=800&fit=crop"
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
    </div>
  );
}
