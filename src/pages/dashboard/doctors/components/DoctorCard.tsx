interface DoctorCardProps {
  doctor: any;
  onEdit: () => void;
  onToggleStatus: () => void;
  onDelete: () => void;
  onManageAvailability: () => void;
  onViewDetails: () => void;
}

export function DoctorCard({
  doctor,
  onEdit,
  onToggleStatus,
  onDelete,
  onManageAvailability,
  onViewDetails
}: DoctorCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-[#E5E7EB] overflow-hidden hover:shadow-lg transition-all duration-300">
      {/* Header */}
      <div className="relative h-32 bg-gradient-to-br from-[#0F766E] to-[#0B5B54]">
        <div className="absolute -bottom-12 left-6">
          <img
            src={doctor.avatar}
            alt={doctor.name}
            className="w-24 h-24 rounded-full border-4 border-white object-cover shadow-lg"
          />
        </div>
        <div className="absolute top-4 right-4">
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              doctor.status === 'active'
                ? 'bg-green-100 text-green-800'
                : 'bg-gray-100 text-gray-800'
            }`}
          >
            {doctor.status === 'active' ? 'Active' : 'Inactive'}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="pt-16 px-6 pb-6">
        {/* Name & Specialty */}
        <div className="mb-4">
          <h3 className="text-xl font-bold text-[#0B1F3B] mb-1">{doctor.name}</h3>
          <p className="text-sm text-[#6B7280]">{doctor.specialty}</p>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <i
                key={i}
                className={`ri-star-${
                  i < Math.floor(doctor.rating) ? 'fill' : 'line'
                } text-yellow-400 text-sm`}
              />
            ))}
          </div>
          <span className="text-sm font-medium text-[#0B1F3B]">{doctor.rating}</span>
          <span className="text-sm text-[#6B7280]">({doctor.reviewCount} reviews)</span>
        </div>

        {/* Contact Info */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-[#6B7280]">
            <i className="ri-phone-line text-[#0F766E]" />
            <span>{doctor.phone}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-[#6B7280]">
            <i className="ri-mail-line text-[#0F766E]" />
            <span className="truncate">{doctor.email}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 pt-4 border-t border-[#E5E7EB]">
          <button
            onClick={onViewDetails}
            className="flex-1 px-4 py-2 bg-[#0F766E] text-white rounded-lg hover:bg-[#0B5B54] transition-colors duration-200 text-sm font-medium whitespace-nowrap cursor-pointer"
          >
            View Details
          </button>
          <button
            onClick={onManageAvailability}
            className="p-2 text-[#0F766E] hover:bg-[#A7F3D0] rounded-lg transition-colors duration-200 cursor-pointer"
            title="Manage Availability"
          >
            <i className="ri-calendar-schedule-line text-lg" />
          </button>
          <button
            onClick={onEdit}
            className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors duration-200 cursor-pointer"
            title="Edit"
          >
            <i className="ri-edit-line text-lg" />
          </button>
          <button
            onClick={onToggleStatus}
            className="p-2 text-yellow-600 hover:bg-yellow-100 rounded-lg transition-colors duration-200 cursor-pointer"
            title={doctor.status === 'active' ? 'Deactivate' : 'Activate'}
          >
            <i className={`ri-${doctor.status === 'active' ? 'pause' : 'play'}-circle-line text-lg`} />
          </button>
          <button
            onClick={onDelete}
            className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors duration-200 cursor-pointer"
            title="Delete"
          >
            <i className="ri-delete-bin-line text-lg" />
          </button>
        </div>
      </div>
    </div>
  );
}