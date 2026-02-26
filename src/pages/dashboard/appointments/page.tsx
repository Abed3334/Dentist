import { useState } from 'react';
import { useToast } from '@/contexts/ToastContext';
import { TableSkeleton } from '@/components/ui/Loading/TableSkeleton';
import { EmptyState } from '@/components/ui/EmptyState';
import { AppointmentListView } from './components/AppointmentListView';
import { AppointmentCalendarView } from './components/AppointmentCalendarView';
import { CreateAppointmentModal } from './components/CreateAppointmentModal';
import { CancelAppointmentModal } from './components/CancelAppointmentModal';
import { RescheduleModal } from './components/RescheduleModal';
import { appointments as mockAppointments, doctors, services, patients } from '../../../mocks/appointments';

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState(mockAppointments);
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [doctorFilter, setDoctorFilter] = useState('all');
  const [serviceFilter, setServiceFilter] = useState('all');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [loading] = useState(false);
  const showToast = useToast().showToast;

  // Filter appointments
  const filteredAppointments = appointments.filter(apt => {
    const matchesSearch =
      apt.patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.doctor.name.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || apt.status === statusFilter;
    const matchesDoctor = doctorFilter === 'all' || apt.doctor.id.toString() === doctorFilter;
    const matchesService = serviceFilter === 'all' || apt.service.id.toString() === serviceFilter;

    const matchesDateRange =
      (!dateRange.start || apt.date >= dateRange.start) &&
      (!dateRange.end || apt.date <= dateRange.end);

    return matchesSearch && matchesStatus && matchesDoctor && matchesService && matchesDateRange;
  });

  // Handlers
  const handleCreateAppointment = (data: any) => {
    const newAppointment = {
      id: appointments.length + 1,
      ...data,
      status: 'pending',
      paymentStatus: 'pending'
    };
    setAppointments(prev => [...prev, newAppointment]);
    setShowCreateModal(false);
    showToast('Appointment created successfully', 'success');
  };

  const handleConfirm = (id: number) => {
    setAppointments(prev =>
      prev.map(apt => (apt.id === id ? { ...apt, status: 'confirmed' } : apt))
    );
    showToast('Appointment confirmed', 'success');
  };

  const handleComplete = (id: number) => {
    setAppointments(prev =>
      prev.map(apt => (apt.id === id ? { ...apt, status: 'completed' } : apt))
    );
    showToast('Appointment marked as completed', 'success');
  };

  const handleCancel = (reason: string) => {
    if (!selectedAppointment) return;
    setAppointments(prev =>
      prev.map(apt =>
        apt.id === selectedAppointment.id
          ? { ...apt, status: 'cancelled', cancelReason: reason }
          : apt
      )
    );
    setShowCancelModal(false);
    setSelectedAppointment(null);
    showToast('Appointment cancelled', 'success');
  };

  const handleReschedule = (data: any) => {
    if (!selectedAppointment) return;
    setAppointments(prev =>
      prev.map(apt => (apt.id === selectedAppointment.id ? { ...apt, ...data } : apt))
    );
    setShowRescheduleModal(false);
    setSelectedAppointment(null);
    showToast('Appointment rescheduled', 'success');
  };

  const handleSendReminder = (id: number) => {
    showToast('Reminder sent successfully', 'success');
  };

  return (
    <>
      <div className="p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-navy mb-2">Appointments</h1>
            <p className="text-muted text-sm sm:text-base">Manage and schedule patient appointments</p>
          </div>
          <button
            type="button"
            onClick={() => setShowCreateModal(true)}
            className="flex items-center justify-center gap-2 px-4 py-3 sm:px-6 bg-primary text-white rounded-xl hover:bg-primary-dark transition-all duration-200 whitespace-nowrap cursor-pointer w-full sm:w-auto min-h-[44px]"
          >
            <i className="ri-calendar-check-line text-xl" />
            <span className="font-medium">New Appointment</span>
          </button>
        </div>

        {/* Controls */}
        <div className="bg-card rounded-2xl shadow-sm border border-border p-4 sm:p-6 mb-6">
          <div className="flex flex-wrap items-center gap-4 mb-4">
            {/* Search */}
            <div className="flex-1 w-full min-w-0 sm:min-w-[280px]">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <i className="ri-search-line text-[#6B7280] text-lg" />
                </div>
                <input
                  type="text"
                  placeholder="Search by patient, service, or doctor..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border-2 border-[#E5E7EB] rounded-xl focus:border-[#0F766E] focus:outline-none transition-colors duration-200 text-sm"
                />
              </div>
            </div>

            {/* View Toggle */}
            <div className="flex items-center gap-2 bg-[#F7FAFC] rounded-xl p-1">
              <button
                onClick={() => setViewMode('list')}
                className={`px-4 py-2 rounded-lg transition-all duration-200 whitespace-nowrap cursor-pointer ${
                  viewMode === 'list'
                    ? 'bg-white text-[#0F766E] shadow-sm'
                    : 'text-[#6B7280] hover:text-[#0F766E]'
                }`}
              >
                <i className="ri-list-check text-lg mr-2" />
                List
              </button>
              <button
                onClick={() => setViewMode('calendar')}
                className={`px-4 py-2 rounded-lg transition-all duration-200 whitespace-nowrap cursor-pointer ${
                  viewMode === 'calendar'
                    ? 'bg-white text-[#0F766E] shadow-sm'
                    : 'text-[#6B7280] hover:text-[#0F766E]'
                }`}
              >
                <i className="ri-calendar-line text-lg mr-2" />
                Calendar
              </button>
            </div>

            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center gap-2 px-4 py-3 border-2 border-[#E5E7EB] rounded-xl hover:border-[#0F766E] transition-colors duration-200 cursor-pointer"
            >
              <i className="ri-filter-3-line text-lg" />
              <span className="font-medium whitespace-nowrap">Filters</span>
            </button>
          </div>

          {/* Filters */}
          <div className={`${showFilters ? 'flex' : 'hidden lg:flex'} flex-wrap items-center gap-4`}>
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="px-4 py-3 border-2 border-[#E5E7EB] rounded-xl focus:border-[#0F766E] focus:outline-none transition-colors duration-200 text-sm cursor-pointer"
            >
              <option value="all">All Status</option>
              <option value="confirmed">Confirmed</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
              <option value="in-progress">In Progress</option>
            </select>

            <select
              value={doctorFilter}
              onChange={e => setDoctorFilter(e.target.value)}
              className="px-4 py-3 border-2 border-[#E5E7EB] rounded-xl focus:border-[#0F766E] focus:outline-none transition-colors duration-200 text-sm cursor-pointer"
            >
              <option value="all">All Doctors</option>
              {doctors.map(doc => (
                <option key={doc.id} value={doc.id}>
                  {doc.name}
                </option>
              ))}
            </select>

            <select
              value={serviceFilter}
              onChange={e => setServiceFilter(e.target.value)}
              className="px-4 py-3 border-2 border-[#E5E7EB] rounded-xl focus:border-[#0F766E] focus:outline-none transition-colors duration-200 text-sm cursor-pointer"
            >
              <option value="all">All Services</option>
              {services.map(svc => (
                <option key={svc.id} value={svc.id}>
                  {svc.name}
                </option>
              ))}
            </select>

            <input
              type="date"
              value={dateRange.start}
              onChange={e => setDateRange(prev => ({ ...prev, start: e.target.value }))}
              className="px-4 py-3 border-2 border-[#E5E7EB] rounded-xl focus:border-[#0F766E] focus:outline-none transition-colors duration-200 text-sm cursor-pointer"
              placeholder="Start Date"
            />

            <input
              type="date"
              value={dateRange.end}
              onChange={e => setDateRange(prev => ({ ...prev, end: e.target.value }))}
              className="px-4 py-3 border-2 border-[#E5E7EB] rounded-xl focus:border-[#0F766E] focus:outline-none transition-colors duration-200 text-sm cursor-pointer"
              placeholder="End Date"
            />
          </div>
        </div>

        {/* View Content */}
        {loading ? (
          <div className="bg-card rounded-2xl shadow-sm border border-border overflow-hidden">
            <TableSkeleton rows={6} columns={5} />
          </div>
        ) : filteredAppointments.length === 0 ? (
          <div className="bg-card rounded-2xl shadow-sm border border-border">
            <EmptyState
              title="No appointments"
              description="Create an appointment to get started."
              icon={<i className="ri-calendar-line" />}
              action={
                <button
                  type="button"
                  onClick={() => setShowCreateModal(true)}
                  className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary-dark transition-all duration-200 whitespace-nowrap cursor-pointer"
                >
                  <i className="ri-calendar-check-line text-xl" />
                  <span className="font-medium">New Appointment</span>
                </button>
              }
            />
          </div>
        ) : viewMode === 'list' ? (
          <AppointmentListView
            appointments={filteredAppointments}
            onConfirm={handleConfirm}
            onComplete={handleComplete}
            onCancel={apt => {
              setSelectedAppointment(apt);
              setShowCancelModal(true);
            }}
            onReschedule={apt => {
              setSelectedAppointment(apt);
              setShowRescheduleModal(true);
            }}
            onSendReminder={handleSendReminder}
          />
        ) : (
          <AppointmentCalendarView
            appointments={filteredAppointments}
            onAppointmentClick={apt => {
              setSelectedAppointment(apt);
            }}
          />
        )}
      </div>

      {/* Modals */}
      {showCreateModal && (
        <CreateAppointmentModal
          onClose={() => setShowCreateModal(false)}
          onSubmit={handleCreateAppointment}
          existingAppointments={appointments}
        />
      )}

      {showCancelModal && selectedAppointment && (
        <CancelAppointmentModal
          appointment={selectedAppointment}
          onClose={() => {
            setShowCancelModal(false);
            setSelectedAppointment(null);
          }}
          onConfirm={handleCancel}
        />
      )}

      {showRescheduleModal && selectedAppointment && (
        <RescheduleModal
          appointment={selectedAppointment}
          onClose={() => {
            setShowRescheduleModal(false);
            setSelectedAppointment(null);
          }}
          onSubmit={handleReschedule}
          existingAppointments={appointments}
        />
      )}
    </>
  );
}