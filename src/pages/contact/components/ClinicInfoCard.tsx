
const infoRows = [
  {
    icon: 'ri-map-pin-2-line',
    label: 'Address',
    lines: ['123 Dental Street, Medical District', 'New York, NY 10001'],
  },
  {
    icon: 'ri-phone-line',
    label: 'Phone',
    lines: ['+1 (555) 123-4567'],
    href: 'tel:+15551234567',
  },
  {
    icon: 'ri-mail-line',
    label: 'Email',
    lines: ['hello@dentest.com'],
    href: 'mailto:hello@dentest.com',
  },
  {
    icon: 'ri-time-line',
    label: 'Working Hours',
    lines: ['Mon – Fri: 9:00 AM – 6:00 PM', 'Sat: 10:00 AM – 4:00 PM', 'Sun: Closed'],
  },
];

const socials = [
  { icon: 'ri-instagram-line', label: 'Instagram', href: '#' },
  { icon: 'ri-facebook-circle-line', label: 'Facebook', href: '#' },
  { icon: 'ri-whatsapp-line', label: 'WhatsApp', href: '#' },
];

export default function ClinicInfoCard() {
  return (
    <div className="space-y-6">
      {/* Info Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-[#E5E7EB]/60 p-8 md:p-10 hover:shadow-md transition-shadow duration-300">
        <h2 className="text-2xl font-bold text-[#0B1F3B] mb-6">Visit Our Clinic</h2>

        <div className="space-y-5">
          {infoRows.map((row) => (
            <div key={row.label} className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[#A7F3D0]/50 flex items-center justify-center flex-shrink-0 mt-0.5">
                <i className={`${row.icon} text-[#0F766E] text-lg`} />
              </div>
              <div>
                <p className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-1">{row.label}</p>
                {row.lines.map((line, i) =>
                  row.href && i === 0 ? (
                    <a
                      key={i}
                      href={row.href}
                      className="block text-sm text-[#0F766E] font-medium hover:underline cursor-pointer"
                      rel="nofollow"
                    >
                      {line}
                    </a>
                  ) : (
                    <p key={i} className="text-sm text-[#111827] leading-relaxed">{line}</p>
                  )
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Emergency Strip */}
        <div className="mt-8 p-4 bg-red-50 border-l-4 border-red-400 rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <i className="ri-alarm-warning-line text-red-500 w-5 h-5 flex items-center justify-center" />
            <span className="text-sm font-bold text-red-600">Emergency?</span>
          </div>
          <a
            href="tel:+15559113368"
            className="text-lg font-bold text-[#0B1F3B] hover:text-[#0F766E] transition-colors cursor-pointer"
            rel="nofollow"
          >
            +1 (555) 911-DENT
          </a>
          <p className="text-xs text-[#6B7280] mt-1">Available 24/7 for dental emergencies</p>
        </div>
      </div>

      {/* Map Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-[#E5E7EB]/60 overflow-hidden hover:shadow-md transition-shadow duration-300">
        <div className="w-full h-[260px]">
          <iframe
            title="Dentest Clinic Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.9663095343008!2d-74.00425878428698!3d40.74076794379132!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259bf5c1654f3%3A0xc80f9cfce5383d5d!2sGoogle!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus"
            className="w-full h-full border-0"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-[#6B7280]">
            <i className="ri-map-pin-line w-4 h-4 flex items-center justify-center text-[#0F766E]" />
            123 Dental Street, New York
          </div>
          <a
            href="https://maps.google.com"
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="text-sm text-[#0F766E] font-medium hover:underline cursor-pointer whitespace-nowrap"
          >
            Get Directions <i className="ri-external-link-line" />
          </a>
        </div>
      </div>

      {/* Social Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-[#E5E7EB]/60 p-6 hover:shadow-md transition-shadow duration-300">
        <p className="text-sm font-semibold text-[#0B1F3B] mb-4">Follow Us</p>
        <div className="flex items-center gap-3">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              aria-label={s.label}
              rel="nofollow"
              className="w-11 h-11 rounded-full border-2 border-[#E5E7EB] flex items-center justify-center text-[#0B1F3B] hover:border-[#0F766E] hover:text-[#0F766E] hover:scale-110 transition-all duration-200 cursor-pointer"
            >
              <i className={`${s.icon} text-lg`} />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
