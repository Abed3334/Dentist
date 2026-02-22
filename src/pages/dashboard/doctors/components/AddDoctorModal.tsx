import { useState } from 'react';

interface AddDoctorModalProps {
  doctor?: any;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export function AddDoctorModal({ doctor, onClose, onSubmit }: AddDoctorModalProps) {
  const [formData, setFormData] = useState({
    name: doctor?.name || '',
    specialty: doctor?.specialty || '',
    phone: doctor?.phone || '',
    email: doctor?.email || '',
    bio: doctor?.bio || '',
    education: doctor?.education || '',
    languages: doctor?.languages?.join(', ') || '',
    avatar: doctor?.avatar || ''
  });
  const [errors, setErrors] = useState<any>({});

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setErrors((prev: any) => ({ ...prev, [field]: '' }));
  };

  const validate = () => {
    const newErrors: any = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.specialty.trim()) newErrors.specialty = 'Specialty is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    const submitData = {
      ...formData,
      languages: formData.languages.split(',').map(l => l.trim()).filter(Boolean),
      avatar: formData.avatar || 'https://readdy.ai/api/search-image?query=Professional%20portrait%20of%20confident%20medical%20doctor%20in%20white%20coat%20with%20stethoscope%2C%20clean%20white%20background%2C%20friendly%20professional%20smile%2C%20modern%20healthcare%20professional%20headshot&width=200&height=200&seq=doctor-default&orientation=squarish'
    };

    onSubmit(submitData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-[#E5E7EB] p-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-[#0B1F3B]">
              {doctor ? 'Edit Doctor' : 'Add New Doctor'}
            </h2>
            <p className="text-sm text-[#6B7280] mt-1">
              {doctor ? 'Update doctor information' : 'Add a new doctor to your team'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[#F7FAFC] rounded-lg transition-colors duration-200 cursor-pointer"
          >
            <i className="ri-close-line text-2xl text-[#6B7280]" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-[#0B1F3B] mb-2">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={e => handleChange('name', e.target.value)}
                placeholder="Dr. John Smith"
                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors duration-200 ${
                  errors.name
                    ? 'border-red-300 focus:border-red-500'
                    : 'border-[#E5E7EB] focus:border-[#0F766E]'
                }`}
              />
              {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#0B1F3B] mb-2">
                Specialty <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.specialty}
                onChange={e => handleChange('specialty', e.target.value)}
                placeholder="General Dentistry"
                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors duration-200 ${
                  errors.specialty
                    ? 'border-red-300 focus:border-red-500'
                    : 'border-[#E5E7EB] focus:border-[#0F766E]'
                }`}
              />
              {errors.specialty && <p className="text-sm text-red-500 mt-1">{errors.specialty}</p>}
            </div>
          </div>

          {/* Contact Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-[#0B1F3B] mb-2">
                Phone <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={e => handleChange('phone', e.target.value)}
                placeholder="+1 (555) 123-4567"
                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors duration-200 ${
                  errors.phone
                    ? 'border-red-300 focus:border-red-500'
                    : 'border-[#E5E7EB] focus:border-[#0F766E]'
                }`}
              />
              {errors.phone && <p className="text-sm text-red-500 mt-1">{errors.phone}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#0B1F3B] mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={e => handleChange('email', e.target.value)}
                placeholder="doctor@dentest.com"
                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors duration-200 ${
                  errors.email
                    ? 'border-red-300 focus:border-red-500'
                    : 'border-[#E5E7EB] focus:border-[#0F766E]'
                }`}
              />
              {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
            </div>
          </div>

          {/* Education */}
          <div>
            <label className="block text-sm font-semibold text-[#0B1F3B] mb-2">Education</label>
            <input
              type="text"
              value={formData.education}
              onChange={e => handleChange('education', e.target.value)}
              placeholder="DDS, Harvard School of Dental Medicine"
              className="w-full px-4 py-3 border-2 border-[#E5E7EB] rounded-xl focus:border-[#0F766E] focus:outline-none transition-colors duration-200"
            />
          </div>

          {/* Languages */}
          <div>
            <label className="block text-sm font-semibold text-[#0B1F3B] mb-2">
              Languages (comma-separated)
            </label>
            <input
              type="text"
              value={formData.languages}
              onChange={e => handleChange('languages', e.target.value)}
              placeholder="English, Spanish, French"
              className="w-full px-4 py-3 border-2 border-[#E5E7EB] rounded-xl focus:border-[#0F766E] focus:outline-none transition-colors duration-200"
            />
          </div>

          {/* Bio */}
          <div>
            <label className="block text-sm font-semibold text-[#0B1F3B] mb-2">Bio</label>
            <textarea
              value={formData.bio}
              onChange={e => handleChange('bio', e.target.value)}
              rows={4}
              placeholder="Brief professional biography..."
              className="w-full px-4 py-3 border-2 border-[#E5E7EB] rounded-xl focus:border-[#0F766E] focus:outline-none transition-colors duration-200 resize-none"
            />
          </div>

          {/* Avatar URL */}
          <div>
            <label className="block text-sm font-semibold text-[#0B1F3B] mb-2">
              Avatar URL (optional)
            </label>
            <input
              type="url"
              value={formData.avatar}
              onChange={e => handleChange('avatar', e.target.value)}
              placeholder="https://example.com/avatar.jpg"
              className="w-full px-4 py-3 border-2 border-[#E5E7EB] rounded-xl focus:border-[#0F766E] focus:outline-none transition-colors duration-200"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border-2 border-[#E5E7EB] text-[#6B7280] rounded-xl hover:bg-[#F7FAFC] transition-colors duration-200 font-medium whitespace-nowrap cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-[#0F766E] text-white rounded-xl hover:bg-[#0B5B54] transition-colors duration-200 font-medium whitespace-nowrap cursor-pointer"
            >
              {doctor ? 'Update Doctor' : 'Add Doctor'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}