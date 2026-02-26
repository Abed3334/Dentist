import { Link } from 'react-router-dom';

const services = [
  {
    icon: 'ri-sparkling-2-line',
    title: 'Teeth Cleaning',
    description: 'Professional deep cleaning removes plaque and tartar to prevent cavities and gum disease. We recommend a cleaning every six months to maintain optimal oral health.',
    duration: '45–60 min',
    color: '#A7F3D0',
  },
  {
    icon: 'ri-contrast-2-line',
    title: 'Teeth Whitening',
    description: 'In-office and take-home whitening options for a noticeably brighter smile. Safe, effective treatments with lasting results and minimal sensitivity.',
    duration: '60–90 min',
    color: '#A7F3D0',
  },
  {
    icon: 'ri-align-center',
    title: 'Braces & Aligners',
    description: 'Traditional braces and clear aligners to straighten teeth and correct bite issues. We offer options for all ages with personalized treatment plans.',
    duration: '12–24 months',
    color: '#A7F3D0',
  },
  {
    icon: 'ri-tooth-line',
    title: 'Dental Implants',
    description: 'Permanent tooth replacement that looks and feels natural. Implants preserve bone health and provide a stable foundation for crowns or dentures.',
    duration: 'Multiple visits',
    color: '#A7F3D0',
  },
  {
    icon: 'ri-capsule-line',
    title: 'Root Canal Therapy',
    description: 'Save an infected or damaged tooth with gentle root canal treatment. Modern techniques make the procedure comfortable with effective pain management.',
    duration: '60–90 min',
    color: '#A7F3D0',
  },
  {
    icon: 'ri-stethoscope-line',
    title: 'Dental Checkups',
    description: 'Comprehensive exams, X-rays, and oral cancer screenings. Early detection helps prevent serious issues and keeps your smile healthy for life.',
    duration: '30–45 min',
    color: '#A7F3D0',
  },
];

export default function ServicesPage() {
  return (
    <>
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-[#F0FDF9] to-[#F7FAFC]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B1F3B] mb-4 leading-tight">
            Our Dental Services
          </h1>
          <p className="text-lg text-[#6B7280] max-w-2xl">
            From routine cleanings to advanced restorative and cosmetic procedures, we offer comprehensive care to keep your smile healthy and confident.
          </p>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white border-2 border-[#E5E7EB] rounded-2xl p-6 sm:p-8 hover:border-[#A7F3D0] hover:shadow-xl transition-all duration-200"
              >
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-5" style={{ backgroundColor: service.color }}>
                  <i className={`${service.icon} text-2xl text-[#0F766E]`} />
                </div>
                <h2 className="text-xl font-semibold text-[#0B1F3B] mb-3">{service.title}</h2>
                <p className="text-[#6B7280] leading-relaxed mb-4">{service.description}</p>
                <p className="text-sm text-[#0F766E] font-medium">
                  <i className="ri-time-line mr-1" />
                  Typical duration: {service.duration}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl font-bold text-[#0B1F3B] mb-4">Not sure which service you need?</h2>
          <p className="text-[#6B7280] mb-8 max-w-xl mx-auto">
            Book a consultation and our team will assess your needs and recommend the right treatment plan.
          </p>
          <Link
            to="/book-appointment"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#0F766E] text-white rounded-full font-medium hover:bg-[#0B5B54] hover:shadow-lg transition-all duration-200 cursor-pointer"
          >
            Book a Consultation
            <i className="ri-arrow-right-line" />
          </Link>
        </div>
      </section>
    </>
  );
}
