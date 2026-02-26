import { useState } from 'react';

function Avatar({ src, name }: { src: string; name: string }) {
  const [errored, setErrored] = useState(false);
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
  if (errored) {
    return (
      <div
        className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#0F766E] text-white flex items-center justify-center text-sm font-semibold shrink-0"
        aria-hidden
      >
        {initials}
      </div>
    );
  }
  return (
    <img
      src={src}
      alt={name}
      className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover shrink-0 bg-[#E5E7EB]"
      onError={() => setErrored(true)}
    />
  );
}

const testimonials = [
  {
    quote: "Dentist has completely transformed my dental experience. The staff is incredibly professional and caring, and the modern facilities make every visit comfortable. I finally look forward to my dental appointments!",
    name: "Sarah Johnson",
    location: "New York, NY",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop&crop=face",
  },
  {
    quote: "I had been avoiding the dentist for years due to anxiety. The team here put me at ease from day one. They explained every step and the root canal was far less stressful than I imagined. Highly recommend.",
    name: "Michael Chen",
    location: "Brooklyn, NY",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=face",
  },
  {
    quote: "The teeth whitening results exceeded my expectations. My smile looks natural and bright. The entire process was professional and the follow-up care was excellent. Worth every penny.",
    name: "Emily Rodriguez",
    location: "Queens, NY",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&h=120&fit=crop&crop=face",
  },
  {
    quote: "From checkups to my recent implant, I have always felt in good hands. The office is clean, appointments run on time, and the front desk is friendly and helpful. This is my family's dentist for life.",
    name: "David Park",
    location: "Manhattan, NY",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop&crop=face",
  },
];

export default function TestimonialsPage() {
  const [current, setCurrent] = useState(0);
  const t = testimonials[current];

  return (
    <>
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-[#F0FDF9] to-[#F7FAFC]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B1F3B] mb-4 leading-tight">
            What our patients say
          </h1>
          <p className="text-lg text-[#6B7280] max-w-2xl mx-auto">
            Real stories from people who trust us with their smiles.
          </p>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="max-w-[900px] mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-2xl sm:rounded-[32px] p-6 sm:p-8 lg:p-12 shadow-lg">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#0B1F3B] rounded-full mb-6">
              <i className="ri-star-fill text-yellow-400" />
              <span className="text-white font-semibold">{t.rating}.0</span>
            </div>
            <blockquote className="text-lg sm:text-xl lg:text-2xl text-[#111827] font-medium leading-relaxed mb-8">
              &ldquo;{t.quote}&rdquo;
            </blockquote>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
              <div className="flex items-center gap-4">
                <Avatar src={t.avatar} name={t.name} />
                <div>
                  <p className="font-semibold text-[#0B1F3B]">{t.name}</p>
                  <p className="text-sm text-[#6B7280]">{t.location}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1))}
                  className="min-h-[48px] min-w-[48px] rounded-xl border-2 border-[#0F766E] text-[#0F766E] flex items-center justify-center hover:bg-[#0F766E] hover:text-white transition-all cursor-pointer"
                  aria-label="Previous testimonial"
                >
                  <i className="ri-arrow-left-line text-xl" />
                </button>
                <button
                  type="button"
                  onClick={() => setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1))}
                  className="min-h-[48px] min-w-[48px] rounded-xl bg-[#0F766E] text-white flex items-center justify-center hover:bg-[#0B5B54] transition-all cursor-pointer"
                  aria-label="Next testimonial"
                >
                  <i className="ri-arrow-right-line text-xl" />
                </button>
              </div>
            </div>
          </div>
          <p className="text-center text-sm text-[#6B7280] mt-4">
            {current + 1} of {testimonials.length}
          </p>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-bold text-[#0B1F3B] text-center mb-8">Why patients choose us</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: 'ri-user-smile-line', title: 'Friendly care', text: 'A welcoming team that puts you at ease.' },
              { icon: 'ri-time-line', title: 'On-time appointments', text: 'We respect your schedule and keep wait times minimal.' },
              { icon: 'ri-shield-check-line', title: 'Trusted expertise', text: 'Experienced, qualified clinicians you can rely on.' },
            ].map((item, idx) => (
              <div key={idx} className="flex gap-4 p-4 rounded-xl bg-[#F7FAFC] border border-[#E5E7EB]">
                <div className="w-10 h-10 rounded-lg bg-[#A7F3D0] flex items-center justify-center shrink-0">
                  <i className={`${item.icon} text-[#0F766E]`} />
                </div>
                <div>
                  <h3 className="font-semibold text-[#0B1F3B]">{item.title}</h3>
                  <p className="text-sm text-[#6B7280] mt-1">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
