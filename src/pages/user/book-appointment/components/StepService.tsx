import { services } from '../../../../mocks/services';

interface StepServiceProps {
  selectedService: number | null;
  onSelect: (id: number) => void;
}

const categoryIcons: Record<string, string> = {
  cleaning: 'ri-brush-line',
  whitening: 'ri-contrast-2-line',
  braces: 'ri-align-center',
  implants: 'ri-tooth-line',
  consultation: 'ri-chat-check-line',
};

export default function StepService({ selectedService, onSelect }: StepServiceProps) {
  const activeServices = services.filter((s) => s.active);

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#0B1F3B] mb-2">Choose Your Service</h2>
      <p className="text-[#6B7280] mb-8">Select the dental service you need</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {activeServices.map((service) => (
          <button
            key={service.id}
            onClick={() => onSelect(service.id)}
            className={`text-left p-5 rounded-xl border-2 transition-all duration-200 cursor-pointer hover:shadow-md ${
              selectedService === service.id
                ? 'border-[#0F766E] bg-[#F0FDF9] shadow-md'
                : 'border-[#E5E7EB] bg-white hover:border-[#A7F3D0]'
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div
                className={`w-11 h-11 rounded-xl flex items-center justify-center ${
                  selectedService === service.id ? 'bg-[#0F766E] text-white' : 'bg-[#A7F3D0]/40 text-[#0F766E]'
                }`}
              >
                <i className={`${categoryIcons[service.category] || 'ri-service-line'} text-xl`}></i>
              </div>
              {selectedService === service.id && (
                <div className="w-6 h-6 rounded-full bg-[#0F766E] flex items-center justify-center">
                  <i className="ri-check-line text-white text-sm"></i>
                </div>
              )}
            </div>
            <h3 className="font-semibold text-[#0B1F3B] mb-1 text-sm">{service.name}</h3>
            <p className="text-xs text-[#6B7280] mb-3 line-clamp-2">{service.description}</p>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1 text-xs text-[#6B7280] bg-[#F3F4F6] px-2 py-1 rounded-md whitespace-nowrap">
                <i className="ri-time-line"></i>
                {service.duration} min
              </span>
              <span className="text-sm font-bold text-[#0F766E]">${service.price}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
