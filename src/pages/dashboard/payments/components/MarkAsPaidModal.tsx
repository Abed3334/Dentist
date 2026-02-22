import { useState } from 'react';

interface MarkAsPaidModalProps {
  payment: any;
  onClose: () => void;
  onConfirm: (method: string) => void;
}

export function MarkAsPaidModal({ payment, onClose, onConfirm }: MarkAsPaidModalProps) {
  const [method, setMethod] = useState('credit-card');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm(method);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
        {/* Header */}
        <div className="p-6 border-b border-[#E5E7EB]">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <i className="ri-check-line text-2xl text-green-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#0B1F3B]">Mark as Paid</h2>
              <p className="text-sm text-[#6B7280] mt-1">Record payment for this invoice</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Payment Info */}
          <div className="p-4 bg-[#F7FAFC] rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-[#6B7280]">Invoice</span>
              <span className="text-sm font-semibold text-[#0F766E]">
                {payment.invoiceNumber}
              </span>
            </div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-[#6B7280]">Patient</span>
              <span className="text-sm font-semibold text-[#0B1F3B]">{payment.patient.name}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-[#6B7280]">Amount</span>
              <span className="text-lg font-bold text-[#0B1F3B]">
                ${payment.amount.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Payment Method */}
          <div>
            <label className="block text-sm font-semibold text-[#0B1F3B] mb-3">
              Payment Method
            </label>
            <div className="space-y-2">
              {[
                { value: 'credit-card', label: 'Credit Card', icon: 'ri-bank-card-line' },
                { value: 'cash', label: 'Cash', icon: 'ri-money-dollar-circle-line' },
                { value: 'bank-transfer', label: 'Bank Transfer', icon: 'ri-bank-line' },
                { value: 'insurance', label: 'Insurance', icon: 'ri-shield-check-line' }
              ].map(option => (
                <label
                  key={option.value}
                  className={`flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                    method === option.value
                      ? 'border-[#0F766E] bg-[#A7F3D0]/20'
                      : 'border-[#E5E7EB] hover:border-[#0F766E]'
                  }`}
                >
                  <input
                    type="radio"
                    name="method"
                    value={option.value}
                    checked={method === option.value}
                    onChange={e => setMethod(e.target.value)}
                    className="w-5 h-5 text-[#0F766E] cursor-pointer"
                  />
                  <i className={`${option.icon} text-xl text-[#0F766E]`} />
                  <span className="font-medium text-[#0B1F3B]">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border-2 border-[#E5E7EB] text-[#6B7280] rounded-xl hover:bg-[#F7FAFC] transition-colors duration-200 font-medium whitespace-nowrap cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors duration-200 font-medium whitespace-nowrap cursor-pointer"
            >
              Mark as Paid
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}