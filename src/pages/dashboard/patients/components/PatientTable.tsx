
import React from 'react';

interface Patient {
  id: number;
  name: string;
  phone: string;
  email: string;
  lastVisit: string;
  totalVisits: number;
  status: string;
  avatar: string;
}

interface PatientTableProps {
  patients: Patient[];
  onRowClick: (patient: Patient) => void;
  onEdit: (patient: Patient) => void;
  onDelete: (patient: Patient) => void;
}

/**
 * PatientTable component – displays a list of patients.
 * Includes defensive checks and error handling for missing callbacks.
 */
export function PatientTable({
  patients,
  onRowClick,
  onEdit,
  onDelete,
}: PatientTableProps) {
  // Ensure the required callbacks are functions; otherwise log a warning.
  const safeOnRowClick = typeof onRowClick === 'function' ? onRowClick : () => {
    console.warn('PatientTable: onRowClick callback is not provided.');
  };
  const safeOnEdit = typeof onEdit === 'function' ? onEdit : () => {
    console.warn('PatientTable: onEdit callback is not provided.');
  };
  const safeOnDelete = typeof onDelete === 'function' ? onDelete : () => {
    console.warn('PatientTable: onDelete callback is not provided.');
  };

  const getStatusColor = (status: string) => {
    return status === 'active'
      ? 'bg-[#A7F3D0] text-[#0F766E]'
      : 'bg-[#E5E7EB] text-[#6B7280]';
  };

  if (!Array.isArray(patients) || patients.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-[#E5E7EB] p-12 text-center">
        <i className="ri-user-line text-6xl text-[#E5E7EB] mb-4"></i>
        <h3 className="text-xl font-semibold text-[#111827] mb-2">
          No patients found
        </h3>
        <p className="text-[#6B7280]">
          Try adjusting your search or filters
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-[#E5E7EB] overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px]">
          <thead className="bg-[#F7FAFC]">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-[#6B7280] uppercase tracking-wider whitespace-nowrap">
                Patient
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-[#6B7280] uppercase tracking-wider whitespace-nowrap">
                Phone
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-[#6B7280] uppercase tracking-wider whitespace-nowrap">
                Email
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-[#6B7280] uppercase tracking-wider whitespace-nowrap">
                Last Visit
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-[#6B7280] uppercase tracking-wider whitespace-nowrap">
                Total Visits
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-[#6B7280] uppercase tracking-wider whitespace-nowrap">
                Status
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-[#6B7280] uppercase tracking-wider whitespace-nowrap">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E5E7EB]">
            {patients.map((patient) => (
              <tr
                key={patient.id}
                onClick={() => safeOnRowClick(patient)}
                className="hover:bg-[#F7FAFC] transition-colors duration-200 cursor-pointer"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <img
                      src={patient.avatar}
                      alt={patient.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="font-medium text-[#111827]">{patient.name}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-[#6B7280]">
                  {patient.phone}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-[#6B7280]">
                  {patient.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-[#111827]">
                  {patient.lastVisit}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-[#111827]">
                  {patient.totalVisits}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                      patient.status
                    )} whitespace-nowrap`}
                  >
                    {patient.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        safeOnEdit(patient);
                      }}
                      className="p-2 text-[#0F766E] hover:bg-[#F0FDF9] rounded-lg transition-all duration-200"
                      title="Edit"
                      aria-label={`Edit ${patient.name}`}
                    >
                      <i className="ri-edit-line text-lg"></i>
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        safeOnDelete(patient);
                      }}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                      title="Delete"
                      aria-label={`Delete ${patient.name}`}
                    >
                      <i className="ri-delete-bin-line text-lg"></i>
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
