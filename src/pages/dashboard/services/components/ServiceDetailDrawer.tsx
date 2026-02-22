interface ServiceDetailDrawerProps {
  service: any;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export function ServiceDetailDrawer({ service, onClose, onEdit, onDelete }: ServiceDetailDrawerProps) {
  const maxBookings = Math.max(...service.popularTimes.map((t: any) => t.bookings));

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full md:w-[600px] bg-white shadow-2xl z-50 overflow-y-auto animate-slide-in-right">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-[#E5E7EB] p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onClose}
              className="md:hidden p-2 hover:bg-[#F7FAFC] rounded-lg transition-colors duration-200 cursor-pointer"
            >
              <i className="ri-arrow-left-line text-xl text-[#6B7280]" />
            </button>
            <div>
              <h2 className="text-2xl font-bold text-[#0B1F3B]">Service Details</h2>
              <p className="text-sm text-[#6B7280] mt-1">{service.name}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="hidden md:block p-2 hover:bg-[#F7FAFC] rounded-lg transition-colors duration-200 cursor-pointer"
          >
            <i className="ri-close-line text-2xl text-[#6B7280]" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Basic Info */}
          <div className="p-6 bg-gradient-to-br from-[#0F766E] to-[#0B5B54] rounded-2xl text-white">
            <h3 className="text-2xl font-bold mb-2">{service.name}</h3>
            <div className="flex items-center gap-6 mb-4">
              <div className="flex items-center gap-2">
                <i className="ri-time-line text-xl" />
                <span className="font-medium">{service.duration} minutes</span>
              </div>
              <div className="flex items-center gap-2">
                <i className="ri-money-dollar-circle-line text-xl" />
                <span className="font-medium">${service.price}</span>
              </div>
            </div>
            <span
              className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                service.active ? 'bg-white/20' : 'bg-white/10'
              }`}
            >
              {service.active ? 'Active' : 'Inactive'}
            </span>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-lg font-semibold text-[#0B1F3B] mb-3">Description</h4>
            <p className="text-sm text-[#6B7280] leading-relaxed">{service.description}</p>
          </div>

          {/* Popular Times */}
          <div>
            <h4 className="text-lg font-semibold text-[#0B1F3B] mb-4">Popular Booking Times</h4>
            <div className="space-y-3">
              {service.popularTimes.map((slot: any) => (
                <div key={slot.time} className="flex items-center gap-4">
                  <span className="text-sm font-medium text-[#0B1F3B] w-16">{slot.time}</span>
                  <div className="flex-1 h-8 bg-[#F7FAFC] rounded-lg overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#0F766E] to-[#A7F3D0] rounded-lg transition-all duration-300"
                      style={{ width: `${(slot.bookings / maxBookings) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm text-[#6B7280] w-16 text-right">
                    {slot.bookings} bookings
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Category */}
          <div>
            <h4 className="text-lg font-semibold text-[#0B1F3B] mb-3">Category</h4>
            <span className="inline-block px-4 py-2 bg-[#A7F3D0] text-[#0F766E] rounded-lg font-medium capitalize">
              {service.category}
            </span>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4 pt-6 border-t border-[#E5E7EB]">
            <button
              onClick={onEdit}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-[#0F766E] text-white rounded-xl hover:bg-[#0B5B54] transition-colors duration-200 font-medium whitespace-nowrap cursor-pointer"
            >
              <i className="ri-edit-line text-lg" />
              <span>Edit Service</span>
            </button>
            <button
              onClick={onDelete}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors duration-200 font-medium whitespace-nowrap cursor-pointer"
            >
              <i className="ri-delete-bin-line text-lg" />
              <span>Delete</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}