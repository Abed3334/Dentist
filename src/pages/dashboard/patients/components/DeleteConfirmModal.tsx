
import React from 'react';

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
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <i className="ri-alert-line text-3xl text-red-600"></i>
        </div>

        <h2 className="text-2xl font-bold text-[#0B1F3B] text-center mb-2">
          Delete Patient?
        </h2>
        <p className="text-[#6B7280] text-center mb-6">
          Are you sure you want to delete{' '}
          <span className="font-semibold text-[#111827]">{patientName}</span>
          ? This action cannot be undone.
        </p>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-6 py-3 border-2 border-[#E5E7EB] text-[#111827] rounded-xl hover:border-[#0F766E] hover:bg-[#F0FDF9] transition-all duration-200 font-medium whitespace-nowrap cursor-pointer"
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
    </div>
  );
}
