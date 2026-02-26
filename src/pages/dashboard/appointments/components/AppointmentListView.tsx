interface AppointmentListViewProps {
  appointments: any[];
  onConfirm: (id: number) => void;
  onComplete: (id: number) => void;
  onCancel: (appointment: any) => void;
  onReschedule: (appointment: any) => void;
  onSendReminder: (id: number) => void;
}

export function AppointmentListView({
  appointments,
  onConfirm,
  onComplete,
  onCancel,
  onReschedule,
  onSendReminder
}: AppointmentListViewProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-[#0F766E] text-white';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentStatusColor = (status: string) => {
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

  if (appointments.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-[#E5E7EB] p-12 text-center">
        <div className="w-20 h-20 bg-[#F7FAFC] rounded-full flex items-center justify-center mx-auto mb-4">
          <i className="ri-calendar-line text-4xl text-[#6B7280]" />
        </div>
        <h3 className="text-xl font-semibold text-[#0B1F3B] mb-2">No appointments found</h3>
        <p className="text-[#6B7280]">Try adjusting your filters or create a new appointment</p>
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
                Date &amp; Time
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-[#0B1F3B] whitespace-nowrap">
                Patient
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-[#0B1F3B] whitespace-nowrap">
                Service
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-[#0B1F3B] whitespace-nowrap">
                Doctor
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-[#0B1F3B] whitespace-nowrap">
                Status
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-[#0B1F3B] whitespace-nowrap">
                Payment
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-[#0B1F3B] whitespace-nowrap">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E5E7EB]">
            {appointments.map(apt => (
              <tr key={apt.id} className="hover:bg-[#F7FAFC] transition-colors duration-150">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <i className="ri-calendar-line text-[#0F766E]" />
                    <div>
                      <div className="text-sm font-medium text-[#0B1F3B]">{apt.date}</div>
                      <div className="text-sm text-[#6B7280]">{apt.time}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <img
                      src={apt.patient.avatar}
                      alt={apt.patient.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <span className="text-sm font-medium text-[#0B1F3B]">
                      {apt.patient.name}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-[#0B1F3B]">{apt.service.name}</div>
                  <div className="text-sm text-[#6B7280]">{apt.service.duration} min</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-[#0B1F3B]">{apt.doctor.name}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      apt.status
                    )}`}
                  >
                    {apt.status.charAt(0).toUpperCase() + apt.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(
                      apt.paymentStatus
                    )}`}
                  >
                    {apt.paymentStatus.charAt(0).toUpperCase() + apt.paymentStatus.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    {apt.status === 'pending' && (
                      <button
                        type="button"
                        onClick={() => onConfirm(apt.id)}
                        className="p-2 text-[#0F766E] hover:bg-[#A7F3D0] rounded-lg transition-colors duration-200 cursor-pointer"
                        title="Confirm"
                        aria-label="Confirm appointment"
                      >
                        <i className="ri-check-line text-lg" />
                      </button>
                    )}
                    {apt.status === 'confirmed' && (
                      <button
                        type="button"
                        onClick={() => onComplete(apt.id)}
                        className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors duration-200 cursor-pointer"
                        title="Complete"
                        aria-label="Mark as complete"
                      >
                        <i className="ri-check-double-line text-lg" />
                      </button>
                    )}
                    {(apt.status === 'pending' || apt.status === 'confirmed') && (
                      <>
                        <button
                          type="button"
                          onClick={() => onReschedule(apt)}
                          className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors duration-200 cursor-pointer"
                          title="Reschedule"
                          aria-label="Reschedule"
                        >
                          <i className="ri-calendar-event-line text-lg" />
                        </button>
                        <button
                          type="button"
                          onClick={() => onSendReminder(apt.id)}
                          className="p-2 text-purple-600 hover:bg-purple-100 rounded-lg transition-colors duration-200 cursor-pointer"
                          title="Send Reminder"
                          aria-label="Send reminder"
                        >
                          <i className="ri-notification-line text-lg" />
                        </button>
                        <button
                          type="button"
                          onClick={() => onCancel(apt)}
                          className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors duration-200 cursor-pointer"
                          title="Cancel"
                          aria-label="Cancel appointment"
                        >
                          <i className="ri-close-line text-lg" />
                        </button>
                      </>
                    )}
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