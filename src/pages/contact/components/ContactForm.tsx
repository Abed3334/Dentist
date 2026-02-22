
import { useState, useRef } from 'react';

const FORM_URL = 'https://readdy.ai/api/form/d6a7fsma728k8ctu34hg';

const subjects = [
  'General Inquiry',
  'Appointment Request',
  'Treatment Question',
  'Billing Support',
  'Emergency',
  'Feedback',
];

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
  agree?: string;
}

export default function ContactForm() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [agree, setAgree] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!fullName.trim()) newErrors.fullName = 'Please enter your full name';
    if (!email.trim()) {
      newErrors.email = 'Please enter your email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (phone && !/^[+]?[\d\s()-]{7,20}$/.test(phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    if (!subject) newErrors.subject = 'Please select a subject';
    if (!message.trim()) newErrors.message = 'Please enter your message';
    if (message.length > 500) newErrors.message = 'Message must be 500 characters or less';
    if (!agree) newErrors.agree = 'You must agree to be contacted';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const body = new URLSearchParams();
      body.append('fullName', fullName.trim());
      body.append('email', email.trim());
      body.append('phone', phone.trim());
      body.append('subject', subject);
      body.append('message', message.trim());
      body.append('agree', 'Yes');
      await fetch(FORM_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      });
      setSuccess(true);
      setFullName('');
      setEmail('');
      setPhone('');
      setSubject('');
      setMessage('');
      setAgree(false);
      setErrors({});
      setTimeout(() => setSuccess(false), 4500);
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  };

  const inputBase =
    'w-full px-4 py-3 bg-white border rounded-lg text-sm text-[#111827] placeholder-[#9CA3AF] transition-all duration-200 outline-none focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/10';
  const errorBorder = 'border-red-400 focus:border-red-400 focus:ring-red-400/10';
  const normalBorder = 'border-[#E5E7EB]';

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-[#E5E7EB]/60 p-8 md:p-10 hover:shadow-md transition-shadow duration-300">
      {/* Success Toast */}
      {success && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-3 px-6 py-4 bg-[#A7F3D0] rounded-xl shadow-xl animate-bounce-in">
          <div className="w-8 h-8 rounded-full bg-[#0F766E] flex items-center justify-center">
            <i className="ri-check-line text-white text-lg" />
          </div>
          <span className="text-[#0B1F3B] font-medium text-sm">Message sent successfully! We&apos;ll get back to you soon.</span>
        </div>
      )}

      <h2 className="text-2xl font-bold text-[#0B1F3B] mb-1">Get in Touch</h2>
      <p className="text-sm text-[#6B7280] mb-8">Fill out the form and our team will respond within 24 hours.</p>

      <form
        ref={formRef}
        id="dentest-contact-form"
        data-readdy-form
        onSubmit={handleSubmit}
        noValidate
        className="space-y-5"
      >
        {/* Full Name */}
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-[#0B1F3B] mb-1.5">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            aria-required="true"
            placeholder="John Doe"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className={`${inputBase} ${errors?.fullName ? errorBorder : normalBorder}`}
          />
          {errors?.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
        </div>

        {/* Email & Phone */}
        <div className="flex flex-col md:flex-row gap-5">
          <div className="flex-1">
            <label htmlFor="email" className="block text-sm font-medium text-[#0B1F3B] mb-1.5">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              aria-required="true"
              placeholder="john@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`${inputBase} ${errors?.email ? errorBorder : normalBorder}`}
            />
            {errors?.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>
          <div className="flex-1">
            <label htmlFor="phone" className="block text-sm font-medium text-[#0B1F3B] mb-1.5">
              Phone
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              placeholder="+1 (555) 123-4567"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={`${inputBase} ${errors?.phone ? errorBorder : normalBorder}`}
            />
            {errors?.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
          </div>
        </div>

        {/* Subject */}
        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-[#0B1F3B] mb-1.5">
            Subject <span className="text-red-500">*</span>
          </label>
          <select
            id="subject"
            name="subject"
            aria-required="true"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className={`${inputBase} cursor-pointer ${errors?.subject ? errorBorder : normalBorder} ${!subject ? 'text-[#9CA3AF]' : ''}`}
          >
            <option value="" disabled>Select a subject</option>
            {subjects.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          {errors?.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-[#0B1F3B] mb-1.5">
            Message <span className="text-red-500">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            aria-required="true"
            rows={5}
            maxLength={500}
            placeholder="Tell us how we can help you..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className={`${inputBase} resize-y ${errors?.message ? errorBorder : normalBorder}`}
          />
          <div className="flex items-center justify-between mt-1">
            {errors?.message ? (
              <p className="text-red-500 text-xs">{errors.message}</p>
            ) : <span />}
            <span className={`text-xs ${message.length > 480 ? 'text-red-500' : 'text-[#9CA3AF]'}`}>
              {message.length}/500
            </span>
          </div>
        </div>

        {/* Checkbox */}
        <div>
          <label className="flex items-start gap-3 cursor-pointer group">
            <input
              type="checkbox"
              name="agree"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
              className="mt-0.5 w-5 h-5 rounded border-[#E5E7EB] text-[#0F766E] focus:ring-[#0F766E]/20 cursor-pointer accent-[#0F766E]"
            />
            <span className="text-sm text-[#6B7280] group-hover:text-[#111827] transition-colors">
              I agree to be contacted by Dentest regarding my inquiry <span className="text-red-500">*</span>
            </span>
          </label>
          {errors?.agree && <p className="text-red-500 text-xs mt-1 ml-8">{errors.agree}</p>}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full md:w-auto px-8 py-3.5 bg-[#0F766E] text-white rounded-lg font-medium text-sm hover:bg-[#0B5B54] hover:shadow-lg active:scale-[0.98] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed whitespace-nowrap cursor-pointer flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <i className="ri-send-plane-line w-4 h-4 flex items-center justify-center" />
              Send Message
            </>
          )}
        </button>
      </form>
    </div>
  );
}
