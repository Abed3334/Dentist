
import { useState } from 'react';

interface PatientDrawerProps {
  patient: any;
  onClose: () => void;          // Fixed TypeScript syntax
}

/**
 * PatientDrawer component displays patient details in a side drawer.
 * Includes robust handling for missing patient data and safe note addition.
 */
export function PatientDrawer({ patient, onClose }: PatientDrawerProps) {
  // Defensive defaults in case `patient` is undefined or incomplete
  const safePatient = {
    avatar: patient?.avatar || '',
    name: patient?.name || 'Unnamed Patient',
    id: patient?.id ?? '',
    email: patient?.email ?? '',
    phone: patient?.phone ?? '',
    address: patient?.address ?? '',
    dateOfBirth: patient?.dateOfBirth ?? '',
    insurance: patient?.insurance ?? '',
    allergies: patient?.allergies ?? '',
    emergencyContact: patient?.emergencyContact ?? '',
  };

  const [activeTab, setActiveTab] = useState<'details' | 'appointments' | 'payments' | 'documents'>('details');
  const [newNote, setNewNote] = useState('');
  const [notes, setNotes] = useState<
    { id: number; date: string; text: string; author: string }[]
  >([
    { id: 1, date: '2025-01-10', text: 'Patient requested morning appointments', author: 'Dr. Smith' },
    { id: 2, date: '2024-12-15', text: 'Completed teeth cleaning successfully', author: 'Dr. Williams' },
  ]);

  const appointments = [
    { id: 1, date: '2025-01-10', service: 'Teeth Cleaning', doctor: 'Dr. Smith', status: 'completed' },
    { id: 2, date: '2024-12-05', service: 'Dental Checkup', doctor: 'Dr. Williams', status: 'completed' },
    { id: 3, date: '2024-11-20', service: 'Teeth Whitening', doctor: 'Dr. Brown', status: 'completed' },
  ];

  const payments = [
    { id: 1, date: '2025-01-10', amount: '$150', method: 'Credit Card', status: 'paid' },
    { id: 2, date: '2024-12-05', amount: '$200', method: 'Insurance', status: 'paid' },
    { id: 3, date: '2024-11-20', amount: '$350', method: 'Credit Card', status: 'paid' },
  ];

  const documents = [
    { id: 1, name: 'Insurance Card.pdf', date: '2025-01-05', size: '2.4 MB' },
    { id: 2, name: 'X-Ray Results.pdf', date: '2024-12-10', size: '5.1 MB' },
  ];

  /** Add a new note after simple validation */
  const handleAddNote = () => {
    const trimmed = newNote.trim();
    if (!trimmed) return; // ignore empty notes

    // Create new note object
    const newEntry = {
      id: notes.length ? Math.max(...notes.map((n) => n.id)) + 1 : 1,
      date: new Date().toISOString().split('T')[0],
      text: trimmed,
      author: 'Dr. Admin',
    };

    // Prepend to notes list (most recent first)
    setNotes([newEntry, ...notes]);
    setNewNote('');
  };

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full md:w-[600px] bg-white shadow-2xl z-50 overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-[#E5E7EB] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onClose}
              className="md:hidden p-2 hover:bg-[#F7FAFC] rounded-lg transition-colors duration-200 cursor-pointer"
            >
              <i className="ri-arrow-left-line text-2xl text-[#6B7280]" />
            </button>
            {safePatient.avatar && (
              <img
                src={safePatient.avatar}
                alt={safePatient.name}
                className="w-16 h-16 rounded-full object-cover"
              />
            )}
            <div>
              <h2 className="text-2xl font-bold text-[#0B1F3B]">{safePatient.name}</h2>
              <p className="text-sm text-[#6B7280]">Patient ID: #{safePatient.id}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="hidden md:block p-2 hover:bg-[#F7FAFC] rounded-lg transition-colors duration-200 cursor-pointer"
          >
            <i className="ri-close-line text-2xl text-[#6B7280]" />
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b border-[#E5E7EB] px-6">
          <div className="flex gap-1">
            {[
              { id: 'details', label: 'Details', icon: 'ri-user-line' },
              { id: 'appointments', label: 'Appointments', icon: 'ri-calendar-line' },
              { id: 'payments', label: 'Payments', icon: 'ri-money-dollar-circle-line' },
              { id: 'documents', label: 'Documents', icon: 'ri-file-text-line' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-all duration-200 whitespace-nowrap cursor-pointer ${
                  activeTab === tab.id
                    ? 'border-[#0F766E] text-[#0F766E] font-semibold'
                    : 'border-transparent text-[#6B7280] hover:text-[#111827]'
                }`}
              >
                <i className={`${tab.icon} text-lg`} />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Details Tab */}
          {activeTab === 'details' && (
            <div className="space-y-6">
              {/* Contact Info */}
              <div>
                <h3 className="text-lg font-bold text-[#0B1F3B] mb-4">Contact Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <i className="ri-mail-line text-xl text-[#6B7280] w-6 h-6 flex items-center justify-center" />
                    <span className="text-[#111827]">{safePatient.email}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <i className="ri-phone-line text-xl text-[#6B7280] w-6 h-6 flex items-center justify-center" />
                    <span className="text-[#111827]">{safePatient.phone}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <i className="ri-map-pin-line text-xl text-[#6B7280] w-6 h-6 flex items-center justify-center" />
                    <span className="text-[#111827]">{safePatient.address}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <i className="ri-calendar-line text-xl text-[#6B7280] w-6 h-6 flex items-center justify-center" />
                    <span className="text-[#111827]">DOB: {safePatient.dateOfBirth}</span>
                  </div>
                </div>
              </div>

              {/* Medical Info */}
              <div>
                <h3 className="text-lg font-bold text-[#0B1F3B] mb-4">Medical Information</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-semibold text-[#6B7280] mb-1">Insurance</p>
                    <p className="text-[#111827]">{safePatient.insurance}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#6B7280] mb-1">Allergies</p>
                    <p className="text-[#111827]">{safePatient.allergies || 'None'}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#6B7280] mb-1">Emergency Contact</p>
                    <p className="text-[#111827]">{safePatient.emergencyContact}</p>
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-[#0B1F3B]">Notes</h3>
                </div>

                {/* Add Note */}
                <div className="mb-4">
                  <textarea
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    placeholder="Add a new note..."
                    rows={3}
                    className="w-full px-4 py-3 border-2 border-[#E5E7EB] rounded-xl focus:border-[#0F766E] focus:outline-none transition-colors duration-200 resize-none text-sm"
                  />
                  <button
                    onClick={handleAddNote}
                    className="mt-2 px-4 py-2 bg-[#0F766E] text-white rounded-lg hover:bg-[#0B5B54] transition-all duration-200 text-sm font-medium whitespace-nowrap cursor-pointer"
                  >
                    Add Note
                  </button>
                </div>

                {/* Notes List */}
                <div className="space-y-3">
                  {notes.map((note) => (
                    <div key={note.id} className="p-4 bg-[#F7FAFC] rounded-xl">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold text-[#111827]">{note.author}</span>
                        <span className="text-xs text-[#6B7280]">{note.date}</span>
                      </div>
                      <p className="text-sm text-[#6B7280]">{note.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Appointments Tab */}
          {activeTab === 'appointments' && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-[#0B1F3B]">Appointment History</h3>
              {appointments.map((apt) => (
                <div
                  key={apt.id}
                  className="p-4 border-2 border-[#E5E7EB] rounded-xl hover:border-[#0F766E] transition-colors duration-200"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-[#111827]">{apt.service}</span>
                    <span className="px-3 py-1 bg-[#A7F3D0] text-[#0F766E] rounded-full text-xs font-semibold whitespace-nowrap">
                      {apt.status}
                    </span>
                  </div>
                  <p className="text-sm text-[#6B7280]">
                    {apt.doctor} • {apt.date}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Payments Tab */}
          {activeTab === 'payments' && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-[#0B1F3B]">Payment History</h3>
              {payments.map((payment) => (
                <div key={payment.id} className="p-4 border-2 border-[#E5E7EB] rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-[#111827]">{payment.amount}</span>
                    <span className="px-3 py-1 bg-[#A7F3D0] text-[#0F766E] rounded-full text-xs font-semibold whitespace-nowrap">
                      {payment.status}
                    </span>
                  </div>
                  <p className="text-sm text-[#6B7280]">
                    {payment.method} • {payment.date}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Documents Tab */}
          {activeTab === 'documents' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-[#0B1F3B]">Documents</h3>
                <button className="px-4 py-2 bg-[#0F766E] text-white rounded-lg hover:bg-[#0B5B54] transition-all duration-200 text-sm font-medium whitespace-nowrap cursor-pointer">
                  Upload
                </button>
              </div>
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  className="p-4 border-2 border-[#E5E7EB] rounded-xl hover:border-[#0F766E] transition-colors duration-200 cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-[#F0FDF9] rounded-lg flex items-center justify-center">
                      <i className="ri-file-pdf-line text-2xl text-[#0F766E]" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-[#111827]">{doc.name}</p>
                      <p className="text-sm text-[#6B7280]">
                        {doc.size} • {doc.date}
                      </p>
                    </div>
                    <button className="p-2 hover:bg-[#F7FAFC] rounded-lg transition-colors duration-200 cursor-pointer">
                      <i className="ri-download-line text-xl text-[#6B7280]" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
