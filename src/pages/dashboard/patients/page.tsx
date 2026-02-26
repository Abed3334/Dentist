import { useState } from 'react';
import { PatientTable } from './components/PatientTable';
import { AddPatientModal } from './components/AddPatientModal';
import { PatientDrawer } from './components/PatientDrawer';
import { DeleteConfirmModal } from './components/DeleteConfirmModal';
import { TableSkeleton } from '@/components/ui/Loading/TableSkeleton';
import { EmptyState } from '@/components/ui/EmptyState';
import { patients as mockPatients } from '../../../mocks/patients';

export default function PatientsPage() {
  const [patients, setPatients] = useState(mockPatients);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('lastVisit');
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [showDrawer, setShowDrawer] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [loading] = useState(false);

  const itemsPerPage = 10;

  // ---------- Data processing ----------
  const filteredPatients = patients
    .filter(p => {
      const matchesSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.phone.includes(searchQuery) ||
        p.email.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter === 'all' || p.status === statusFilter;

      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (sortBy === 'lastVisit') {
        return new Date(b.lastVisit).getTime() - new Date(a.lastVisit).getTime();
      }
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      }
      return 0;
    });

  const totalPages = Math.ceil(filteredPatients.length / itemsPerPage);
  const paginatedPatients = filteredPatients.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // ---------- Handlers ----------
  const handleAddPatient = (data: any) => {
    const newPatient = {
      id: patients.length + 1,
      ...data,
      totalVisits: 0,
      lastVisit: new Date().toISOString().split('T')[0],
      status: 'active',
    };
    setPatients(prev => [...prev, newPatient]);
    setShowAddModal(false);
  };

  const handleEditPatient = (data: any) => {
    if (!selectedPatient) return;
    setPatients(prev =>
      prev.map(p => (p.id === selectedPatient.id ? { ...p, ...data } : p))
    );
    setShowEditModal(false);
    setSelectedPatient(null);
  };

  const handleDeletePatient = () => {
    if (!selectedPatient) return;
    setPatients(prev => prev.filter(p => p.id !== selectedPatient.id));
    setShowDeleteModal(false);
    setSelectedPatient(null);
  };

  const handleRowClick = (patient: any) => {
    setSelectedPatient(patient);
    setShowDrawer(true);
  };

  const handleExport = () => {
    try {
      const header = 'Name,Phone,Email,Last Visit,Total Visits,Status';
      const rows = filteredPatients.map(
        p =>
          `${p.name},${p.phone},${p.email},${p.lastVisit},${p.totalVisits},${p.status}`
      );
      const csv = [header, ...rows].join('\n');

      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'patients.csv';
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Failed to export CSV:', err);
    }
  };

  // ---------- Render ----------
  return (
    <>
      <div className="p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-navy mb-2">Patients</h1>
            <p className="text-muted text-sm sm:text-base">Manage patient records and information</p>
          </div>
          <button
            type="button"
            onClick={() => setShowAddModal(true)}
            className="flex items-center justify-center gap-2 px-4 py-3 sm:px-6 bg-primary text-white rounded-xl hover:bg-primary-dark transition-all duration-200 whitespace-nowrap cursor-pointer w-full sm:w-auto min-h-[44px]"
          >
            <i className="ri-user-add-line text-xl" />
            <span className="font-medium">Add Patient</span>
          </button>
        </div>

        {/* Controls */}
        <div className="bg-card rounded-2xl shadow-sm border border-border p-4 sm:p-6 mb-6">
          <div className="flex flex-wrap items-center gap-4">
            {/* Search */}
            <div className="flex-1 min-w-[280px]">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <i className="ri-search-line text-[#6B7280] text-lg" />
                </div>
                <input
                  type="text"
                  placeholder="Search by name, phone, or email..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border-2 border-[#E5E7EB] rounded-xl focus:border-[#0F766E] focus:outline-none transition-colors duration-200 text-sm"
                />
              </div>
            </div>

            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center gap-2 px-4 py-3 border-2 border-[#E5E7EB] rounded-xl hover:border-[#0F766E] transition-colors duration-200 cursor-pointer"
            >
              <i className="ri-filter-3-line text-lg" />
              <span className="font-medium whitespace-nowrap">Filters</span>
            </button>

            {/* Desktop Filters */}
            <div className={`${showFilters ? 'flex' : 'hidden lg:flex'} flex-wrap items-center gap-4 w-full lg:w-auto`}>
              <select
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value)}
                className="px-4 py-3 border-2 border-[#E5E7EB] rounded-xl focus:border-[#0F766E] focus:outline-none transition-colors duration-200 text-sm cursor-pointer"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>

              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="px-4 py-3 border-2 border-[#E5E7EB] rounded-xl focus:border-[#0F766E] focus:outline-none transition-colors duration-200 text-sm cursor-pointer"
              >
                <option value="lastVisit">Sort by Last Visit</option>
                <option value="name">Sort by Name</option>
              </select>

              <button
                onClick={handleExport}
                className="flex items-center gap-2 px-4 py-3 border-2 border-[#E5E7EB] rounded-xl hover:border-[#0F766E] hover:bg-[#F0FDF9] transition-all duration-200 whitespace-nowrap cursor-pointer"
              >
                <i className="ri-download-line text-lg" />
                <span className="font-medium">Export</span>
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        {loading ? (
          <div className="bg-card rounded-2xl shadow-sm border border-border overflow-hidden">
            <TableSkeleton rows={8} columns={6} />
          </div>
        ) : filteredPatients.length === 0 ? (
          <div className="bg-card rounded-2xl shadow-sm border border-border">
            <EmptyState
              title="No patients yet"
              description="Add your first patient to get started."
              icon={<i className="ri-user-line" />}
              action={
                <button
                  type="button"
                  onClick={() => setShowAddModal(true)}
                  className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary-dark transition-all duration-200 whitespace-nowrap cursor-pointer"
                >
                  <i className="ri-user-add-line text-xl" />
                  <span className="font-medium">Add Patient</span>
                </button>
              }
            />
          </div>
        ) : (
          <PatientTable
            patients={paginatedPatients}
            onRowClick={handleRowClick}
            onEdit={patient => {
              setSelectedPatient(patient);
              setShowEditModal(true);
            }}
            onDelete={patient => {
              setSelectedPatient(patient);
              setShowDeleteModal(true);
            }}
          />
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-6">
            <p className="text-sm text-muted text-center sm:text-left order-2 sm:order-1">
              Showing {(currentPage - 1) * itemsPerPage + 1} to{' '}
              {Math.min(currentPage * itemsPerPage, filteredPatients.length)} of{' '}
              {filteredPatients.length} patients
            </p>
            <div className="flex items-center gap-2 order-1 sm:order-2">
              <button
                type="button"
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="min-h-[44px] min-w-[44px] flex items-center justify-center px-4 py-2 border-2 border-border rounded-lg hover:border-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 cursor-pointer"
              >
                <i className="ri-arrow-left-s-line" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  type="button"
                  onClick={() => setCurrentPage(page)}
                  className={`min-h-[44px] min-w-[44px] flex items-center justify-center px-4 py-2 rounded-lg transition-all duration-200 cursor-pointer ${
                    currentPage === page
                      ? 'bg-primary text-white'
                      : 'border-2 border-border hover:border-primary'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                type="button"
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="min-h-[44px] min-w-[44px] flex items-center justify-center px-4 py-2 border-2 border-border rounded-lg hover:border-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 cursor-pointer"
              >
                <i className="ri-arrow-right-s-line" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      {showAddModal && (
        <AddPatientModal onClose={() => setShowAddModal(false)} onSubmit={handleAddPatient} />
      )}

      {showEditModal && selectedPatient && (
        <AddPatientModal
          patient={selectedPatient}
          onClose={() => {
            setShowEditModal(false);
            setSelectedPatient(null);
          }}
          onSubmit={handleEditPatient}
        />
      )}

      {showDeleteModal && selectedPatient && (
        <DeleteConfirmModal
          patientName={selectedPatient.name}
          onClose={() => {
            setShowDeleteModal(false);
            setSelectedPatient(null);
          }}
          onConfirm={handleDeletePatient}
        />
      )}

      {showDrawer && selectedPatient && (
        <PatientDrawer
          patient={selectedPatient}
          onClose={() => {
            setShowDrawer(false);
            setSelectedPatient(null);
          }}
        />
      )}
    </>
  );
}
