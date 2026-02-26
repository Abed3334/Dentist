import { Modal } from '@/components/ui/Modal';

interface DeleteConfirmModalProps {
  patientName: string;
  onClose: () => void;
  onConfirm: () => void;
}

export function DeleteConfirmModal({
  patientName,
  onClose,
  onConfirm,
}: DeleteConfirmModalProps) {
  return (
    <Modal open onClose={onClose} title="Delete Patient?" size="sm">
      <div className="p-6">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <i className="ri-alert-line text-3xl text-red-600"></i>
        </div>
        <p className="text-muted text-center mb-6">
          Are you sure you want to delete{' '}
          <span className="font-semibold text-text">{patientName}</span>
          ? This action cannot be undone.
        </p>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-6 py-3 border-2 border-border text-text rounded-xl hover:border-primary hover:bg-teal-tint transition-all duration-200 font-medium whitespace-nowrap cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all duration-200 font-medium whitespace-nowrap cursor-pointer"
          >
            Delete
          </button>
        </div>
      </div>
    </Modal>
  );
}
