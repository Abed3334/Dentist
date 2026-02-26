import { Link } from 'react-router-dom';

const stats = [
  { number: '15+', label: 'Years in practice' },
  { number: '10,000+', label: 'Happy patients' },
  { number: '25+', label: 'Expert team members' },
  { number: '98%', label: 'Patient satisfaction' },
];

const values = [
  { icon: 'ri-award-line', title: 'Excellence', text: 'Board-certified specialists and ongoing training for the highest standard of care.' },
  { icon: 'ri-heart-pulse-line', title: 'Compassion', text: 'We listen, explain clearly, and tailor treatment to your comfort and goals.' },
  { icon: 'ri-microscope-line', title: 'Technology', text: 'Modern equipment and techniques for accurate diagnosis and lasting results.' },
];

export default function AboutPage() {
  return (
    <>
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-[#F0FDF9] to-[#F7FAFC]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B1F3B] mb-4 leading-tight">
            About Dentist
          </h1>
          <p className="text-lg text-[#6B7280] max-w-2xl">
            We are a patient-first dental practice dedicated to helping you achieve and maintain a healthy, confident smile.
          </p>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-xl bg-[#E5E7EB]">
                <img
                  src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=600&h=500&fit=crop"
                  alt="Dentist clinic interior - modern dental practice"
                  className="w-full h-[320px] sm:h-[400px] object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-[#0F766E] rounded-2xl px-6 py-4 shadow-xl">
                <p className="text-3xl font-bold text-white">15+</p>
                <p className="text-[#A7F3D0] text-sm font-medium">Years of excellence</p>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[#0B1F3B] mb-6">Our story</h2>
              <p className="text-[#6B7280] leading-relaxed mb-4">
                Founded over 15 years ago, Dentist started with a simple mission: to make quality dental care accessible, comfortable, and focused on the whole person.
              </p>
              <p className="text-[#6B7280] leading-relaxed mb-6">
                Today we combine experienced clinicians, modern technology, and a welcoming environment so every visit supports your long-term oral and overall health.
              </p>
              <Link
                to="/book-appointment"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#0F766E] text-white rounded-full font-medium hover:bg-[#0B5B54] transition-all duration-200 cursor-pointer"
              >
                Book your visit
                <i className="ri-arrow-right-line" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-bold text-[#0B1F3B] text-center mb-10">By the numbers</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {stats.map((stat, idx) => (
              <div key={idx} className="bg-[#F7FAFC] rounded-2xl p-6 text-center border border-[#E5E7EB]">
                <p className="text-2xl sm:text-3xl font-bold text-[#0F766E]">{stat.number}</p>
                <p className="text-sm text-[#6B7280] mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-bold text-[#0B1F3B] text-center mb-10">What we stand for</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((item, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 border border-[#E5E7EB] hover:border-[#A7F3D0] transition-colors">
                <div className="w-12 h-12 rounded-xl bg-[#A7F3D0] flex items-center justify-center mb-4">
                  <i className={`${item.icon} text-xl text-[#0F766E]`} />
                </div>
                <h3 className="text-lg font-semibold text-[#0B1F3B] mb-2">{item.title}</h3>
                <p className="text-[#6B7280] text-sm leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-[#F0FDF9]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl font-bold text-[#0B1F3B] mb-4">Ready to meet us?</h2>
          <p className="text-[#6B7280] mb-6 max-w-xl mx-auto">
            We would love to welcome you. Schedule an appointment or get in touch with any questions.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/book-appointment" className="inline-flex items-center gap-2 px-6 py-3 bg-[#0F766E] text-white rounded-full font-medium hover:bg-[#0B5B54] transition-all cursor-pointer">
              Book appointment
            </Link>
            <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[#0F766E] text-[#0F766E] rounded-full font-medium hover:bg-[#F0FDF9] transition-all cursor-pointer">
              Contact us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
