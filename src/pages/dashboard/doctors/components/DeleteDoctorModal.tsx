interface DeleteDoctorModalProps {
  doctor: any;
  onClose: () => void;
  onConfirm: () => void;
}

export function DeleteDoctorModal({ doctor, onClose, onConfirm }: DeleteDoctorModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
        {/* Header */}
        <div className="p-6 border-b border-[#E5E7EB]">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <i className="ri-error-warning-line text-2xl text-red-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#0B1F3B]">Delete Doctor</h2>
              <p className="text-sm text-[#6B7280] mt-1">This action cannot be undone</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="p-4 bg-[#F7FAFC] rounded-xl mb-6">
            <div className="flex items-center gap-3">
              <img
                src={doctor.avatar}
                alt={doctor.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <div className="font-semibold text-[#0B1F3B]">{doctor.name}</div>
                <div className="text-sm text-[#6B7280]">{doctor.specialty}</div>
              </div>
            </div>
          </div>

          <p className="text-sm text-[#6B7280] mb-6">
            Are you sure you want to delete this doctor? All associated data including appointments and
            availability will be permanently removed.
          </p>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 border-2 border-[#E5E7EB] text-[#6B7280] rounded-xl hover:bg-[#F7FAFC] transition-colors duration-200 font-medium whitespace-nowrap cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors duration-200 font-medium whitespace-nowrap cursor-pointer"
            >
              Delete Doctor
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}