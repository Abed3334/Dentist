interface ServiceListProps {
  services: any[];
  onEdit: (service: any) => void;
  onView: (service: any) => void;
}

export function ServiceList({ services, onEdit, onView }: ServiceListProps) {
  if (services.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-[#E5E7EB] p-12 text-center">
        <div className="w-20 h-20 bg-[#F7FAFC] rounded-full flex items-center justify-center mx-auto mb-4">
          <i className="ri-service-line text-4xl text-[#6B7280]" />
        </div>
        <h3 className="text-xl font-semibold text-[#0B1F3B] mb-2">No services found</h3>
        <p className="text-[#6B7280]">Try adjusting your filters or add a new service</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {services.map(service => (
        <div
          key={service.id}
          onClick={() => onView(service)}
          className="bg-white rounded-2xl shadow-sm border border-[#E5E7EB] p-6 hover:shadow-lg transition-all duration-300 cursor-pointer"
        >
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="text-lg font-bold text-[#0B1F3B] mb-1">{service.name}</h3>
              <p className="text-sm text-[#6B7280] line-clamp-2">{service.description}</p>
            </div>
            <span
              className={`ml-4 px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                service.active
                  ? 'bg-green-100 text-green-800'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              {service.active ? 'Active' : 'Inactive'}
            </span>
          </div>

          {/* Details */}
          <div className="flex items-center gap-6 mb-4">
            <div className="flex items-center gap-2">
              <i className="ri-time-line text-[#0F766E]" />
              <span className="text-sm font-medium text-[#0B1F3B]">{service.duration} min</span>
            </div>
            <div className="flex items-center gap-2">
              <i className="ri-money-dollar-circle-line text-[#0F766E]" />
              <span className="text-sm font-medium text-[#0B1F3B]">${service.price}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 pt-4 border-t border-[#E5E7EB]">
            <button
              onClick={e => {
                e.stopPropagation();
                onView(service);
              }}
              className="flex-1 px-4 py-2 bg-[#0F766E] text-white rounded-lg hover:bg-[#0B5B54] transition-colors duration-200 text-sm font-medium whitespace-nowrap cursor-pointer"
            >
              View Details
            </button>
            <button
              onClick={e => {
                e.stopPropagation();
                onEdit(service);
              }}
              className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors duration-200 cursor-pointer"
              title="Edit"
            >
              <i className="ri-edit-line text-lg" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}