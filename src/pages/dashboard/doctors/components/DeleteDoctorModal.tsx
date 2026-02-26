import { Modal } from '@/components/ui/Modal';

interface DeleteDoctorModalProps {
  doctor: any;
  onClose: () => void;
  onConfirm: () => void;
}

export function DeleteDoctorModal({ doctor, onClose, onConfirm }: DeleteDoctorModalProps) {
  return (
    <Modal open onClose={onClose} title="Delete Doctor" size="sm">
      <div className="p-6">
        <div className="p-4 bg-background rounded-xl mb-6">
          <div className="flex items-center gap-3">
            <img
              src={doctor.avatar}
              alt={doctor.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <div className="font-semibold text-navy">{doctor.name}</div>
              <div className="text-sm text-muted">{doctor.specialty}</div>
            </div>
          </div>
        </div>
        <p className="text-sm text-muted mb-6">
          Are you sure you want to delete this doctor? All associated data including appointments and
          availability will be permanently removed.
        </p>
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-6 py-3 border-2 border-border text-muted rounded-xl hover:bg-background transition-colors duration-200 font-medium whitespace-nowrap cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors duration-200 font-medium whitespace-nowrap cursor-pointer"
          >
            Delete Doctor
          </button>
        </div>
      </div>
    </Modal>
  );
}