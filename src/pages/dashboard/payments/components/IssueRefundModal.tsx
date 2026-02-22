import { useState } from 'react';

interface IssueRefundModalProps {
  payment: any;
  onClose: () => void;
  onConfirm: (reason: string, amount: number) => void;
}

export function IssueRefundModal({ payment, onClose, onConfirm }: IssueRefundModalProps) {
  const [reason, setReason] = useState('');
  const [amount, setAmount] = useState(payment.amount);
  const [errors, setErrors] = useState<any>({});

  const validate = () => {
    const newErrors: any = {};

    if (!reason.trim()) newErrors.reason = 'Refund reason is required';
    if (amount <= 0) newErrors.amount = 'Amount must be greater than 0';
    if (amount > payment.amount) newErrors.amount = 'Amount cannot exceed original payment';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    onConfirm(reason, amount);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
        {/* Header */}
        <div className="p-6 border-b border-[#E5E7EB]">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <i className="ri-refund-line text-2xl text-red-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#0B1F3B]">Issue Refund</h2>
              <p className="text-sm text-[#6B7280] mt-1">Process a refund for this payment</p>
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
              <span className="text-sm font-medium text-[#6B7280]">Original Amount</span>
              <span className="text-lg font-bold text-[#0B1F3B]">
                ${payment.amount.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Refund Amount */}
          <div>
            <label className="block text-sm font-semibold text-[#0B1F3B] mb-2">
              Refund Amount <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <span className="text-[#6B7280] font-medium">$</span>
              </div>
              <input
                type="number"
                value={amount}
                onChange={e => {
                  setAmount(parseFloat(e.target.value));
                  setErrors((prev: any) => ({ ...prev, amount: '' }));
                }}
                min="0"
                max={payment.amount}
                step="0.01"
                className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl focus:outline-none transition-colors duration-200 ${
                  errors.amount
                    ? 'border-red-300 focus:border-red-500'
                    : 'border-[#E5E7EB] focus:border-[#0F766E]'
                }`}
              />
            </div>
            {errors.amount && <p className="text-sm text-red-500 mt-1">{errors.amount}</p>}
          </div>

          {/* Reason */}
          <div>
            <label className="block text-sm font-semibold text-[#0B1F3B] mb-2">
              Refund Reason <span className="text-red-500">*</span>
            </label>
            <textarea
              value={reason}
              onChange={e => {
                setReason(e.target.value);
                setErrors((prev: any) => ({ ...prev, reason: '' }));
              }}
              rows={4}
              placeholder="Please provide a reason for the refund..."
              className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors duration-200 resize-none ${
                errors.reason
                  ? 'border-red-300 focus:border-red-500'
                  : 'border-[#E5E7EB] focus:border-[#0F766E]'
              }`}
            />
            {errors.reason && <p className="text-sm text-red-500 mt-1">{errors.reason}</p>}
          </div>

          {/* Warning */}
          <div className="p-4 bg-yellow-50 border-2 border-yellow-300 rounded-xl flex items-start gap-3">
            <i className="ri-error-warning-line text-xl text-yellow-600 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium text-yellow-800">
                This action cannot be undone. The refund will be processed immediately.
              </p>
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
              className="flex-1 px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors duration-200 font-medium whitespace-nowrap cursor-pointer"
            >
              Issue Refund
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}