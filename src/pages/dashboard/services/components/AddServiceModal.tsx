import { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { serviceCategories } from '../../../../mocks/services';

interface AddServiceModalProps {
  service?: any;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export function AddServiceModal({ service, onClose, onSubmit }: AddServiceModalProps) {
  const [formData, setFormData] = useState({
    name: service?.name || '',
    category: service?.category || 'cleaning',
    duration: service?.duration || 60,
    price: service?.price || 100,
    description: service?.description || '',
    active: service?.active ?? true
  });
  const [errors, setErrors] = useState<any>({});

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setErrors((prev: any) => ({ ...prev, [field]: '' }));
  };

  const validate = () => {
    const newErrors: any = {};

    if (!formData.name.trim()) newErrors.name = 'Service name is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (formData.duration <= 0) newErrors.duration = 'Duration must be greater than 0';
    if (formData.price <= 0) newErrors.price = 'Price must be greater than 0';
    if (!formData.description.trim()) newErrors.description = 'Description is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    onSubmit(formData);
  };

  return (
    <Modal open onClose={onClose} title={service ? 'Edit Service' : 'Add New Service'} size="md">
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Service Name */}
          <div>
            <label className="block text-sm font-semibold text-[#0B1F3B] mb-2">
              Service Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={e => handleChange('name', e.target.value)}
              placeholder="e.g., Teeth Cleaning"
              className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors duration-200 ${
                errors.name
                  ? 'border-red-300 focus:border-red-500'
                  : 'border-[#E5E7EB] focus:border-[#0F766E]'
              }`}
            />
            {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-semibold text-[#0B1F3B] mb-2">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.category}
              onChange={e => handleChange('category', e.target.value)}
              className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors duration-200 cursor-pointer ${
                errors.category
                  ? 'border-red-300 focus:border-red-500'
                  : 'border-[#E5E7EB] focus:border-[#0F766E]'
              }`}
            >
              {serviceCategories
                .filter(cat => cat.id !== 'all')
                .map(cat => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
            </select>
            {errors.category && <p className="text-sm text-red-500 mt-1">{errors.category}</p>}
          </div>

          {/* Duration & Price */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-[#0B1F3B] mb-2">
                Duration (minutes) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                value={formData.duration}
                onChange={e => handleChange('duration', parseInt(e.target.value))}
                min="1"
                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors duration-200 ${
                  errors.duration
                    ? 'border-red-300 focus:border-red-500'
                    : 'border-[#E5E7EB] focus:border-[#0F766E]'
                }`}
              />
              {errors.duration && <p className="text-sm text-red-500 mt-1">{errors.duration}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#0B1F3B] mb-2">
                Price ($) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                value={formData.price}
                onChange={e => handleChange('price', parseFloat(e.target.value))}
                min="0"
                step="0.01"
                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors duration-200 ${
                  errors.price
                    ? 'border-red-300 focus:border-red-500'
                    : 'border-[#E5E7EB] focus:border-[#0F766E]'
                }`}
              />
              {errors.price && <p className="text-sm text-red-500 mt-1">{errors.price}</p>}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-[#0B1F3B] mb-2">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              value={formData.description}
              onChange={e => handleChange('description', e.target.value)}
              rows={4}
              placeholder="Describe the service in detail..."
              className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors duration-200 resize-none ${
                errors.description
                  ? 'border-red-300 focus:border-red-500'
                  : 'border-[#E5E7EB] focus:border-[#0F766E]'
              }`}
            />
            {errors.description && (
              <p className="text-sm text-red-500 mt-1">{errors.description}</p>
            )}
          </div>

          {/* Active Toggle */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={formData.active}
              onChange={e => handleChange('active', e.target.checked)}
              className="w-5 h-5 text-[#0F766E] rounded focus:ring-[#0F766E] cursor-pointer"
            />
            <label className="text-sm font-medium text-[#0B1F3B]">
              Active (visible to patients)
            </label>
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
              {service ? 'Update Service' : 'Add Service'}
            </button>
          </div>
        </form>
    </Modal>
  );
}