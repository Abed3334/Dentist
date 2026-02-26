interface PaymentTableProps {
  payments: any[];
  onMarkAsPaid: (payment: any) => void;
  onIssueRefund: (payment: any) => void;
  onDownloadInvoice: (payment: any) => void;
}

export function PaymentTable({
  payments,
  onMarkAsPaid,
  onIssueRefund,
  onDownloadInvoice
}: PaymentTableProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'refunded':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getMethodIcon = (method: string) => {
    switch (method) {
      case 'credit-card':
        return 'ri-bank-card-line';
      case 'cash':
        return 'ri-money-dollar-circle-line';
      case 'bank-transfer':
        return 'ri-bank-line';
      case 'insurance':
        return 'ri-shield-check-line';
      default:
        return 'ri-question-line';
    }
  };

  if (payments.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-[#E5E7EB] p-12 text-center">
        <div className="w-20 h-20 bg-[#F7FAFC] rounded-full flex items-center justify-center mx-auto mb-4">
          <i className="ri-file-list-line text-4xl text-[#6B7280]" />
        </div>
        <h3 className="text-xl font-semibold text-[#0B1F3B] mb-2">No payments found</h3>
        <p className="text-[#6B7280]">Try adjusting your filters</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-[#E5E7EB] overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px]">
          <thead className="bg-[#F7FAFC] border-b border-[#E5E7EB]">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-[#0B1F3B] whitespace-nowrap">
                Invoice #
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-[#0B1F3B] whitespace-nowrap">
                Patient
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-[#0B1F3B] whitespace-nowrap">
                Appointment
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-[#0B1F3B] whitespace-nowrap">
                Amount
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-[#0B1F3B] whitespace-nowrap">
                Method
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-[#0B1F3B] whitespace-nowrap">
                Status
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-[#0B1F3B] whitespace-nowrap">
                Date
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-[#0B1F3B] whitespace-nowrap">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E5E7EB]">
            {payments.map(payment => (
              <tr key={payment.id} className="hover:bg-[#F7FAFC] transition-colors duration-150">
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm font-medium text-[#0F766E]">
                    {payment.invoiceNumber}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm font-medium text-[#0B1F3B]">
                    {payment.patient.name}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-[#0B1F3B]">{payment.appointment.service}</div>
                  <div className="text-sm text-[#6B7280]">{payment.appointment.date}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm font-semibold text-[#0B1F3B]">
                    ${payment.amount.toLocaleString()}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <i className={`${getMethodIcon(payment.method)} text-[#0F766E]`} />
                    <span className="text-sm text-[#0B1F3B] capitalize">
                      {payment.method.replace('-', ' ')}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      payment.status
                    )}`}
                  >
                    {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-[#6B7280]">{payment.date}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    {payment.status === 'pending' && (
                      <button
                        type="button"
                        onClick={() => onMarkAsPaid(payment)}
                        className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors duration-200 cursor-pointer"
                        title="Mark as Paid"
                        aria-label="Mark as paid"
                      >
                        <i className="ri-check-line text-lg" />
                      </button>
                    )}
                    {payment.status === 'paid' && (
                      <button
                        type="button"
                        onClick={() => onIssueRefund(payment)}
                        className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors duration-200 cursor-pointer"
                        title="Issue Refund"
                        aria-label="Issue refund"
                      >
                        <i className="ri-refund-line text-lg" />
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => onDownloadInvoice(payment)}
                      className="p-2 text-[#0F766E] hover:bg-[#A7F3D0] rounded-lg transition-colors duration-200 cursor-pointer"
                      title="Download Invoice"
                      aria-label="Download invoice"
                    >
                      <i className="ri-download-line text-lg" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}