
const chips = [
  { icon: 'ri-flashlight-line', label: 'Fast Replies' },
  { icon: 'ri-heart-2-line', label: 'Friendly Support' },
  { icon: 'ri-calendar-schedule-line', label: 'Flexible Scheduling' },
];

export default function ContactHero() {
  return (
    <section className="relative pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 bg-gradient-to-b from-[#F0FDFA] via-[#F5FDFB] to-[#F7FAFC] overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #0F766E 1px, transparent 0)', backgroundSize: '32px 32px' }} />
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 relative z-10 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0B1F3B] mb-3 sm:mb-4 leading-tight">
          Contact <span className="text-[#0F766E]">Dentist</span>
        </h1>
        <p className="text-base sm:text-lg text-[#6B7280] max-w-xl mx-auto leading-relaxed px-1">
          Have a question or ready to schedule? We&apos;d love to hear from you. Our team typically responds within a few hours.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-6 sm:mt-8">
          {chips.map((chip) => (
            <span
              key={chip.label}
              className="inline-flex items-center gap-2 px-3 sm:px-5 py-1.5 sm:py-2 bg-[#A7F3D0]/50 rounded-full text-[#0F766E] text-xs sm:text-sm font-medium"
            >
              <i className={`${chip.icon} w-4 h-4 flex items-center justify-center`} />
              {chip.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
