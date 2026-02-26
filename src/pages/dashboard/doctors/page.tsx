import { useState } from 'react';
import { useToast } from '@/contexts/ToastContext';
import { DoctorCard } from './components/DoctorCard';
import { AddDoctorModal } from './components/AddDoctorModal';
import { ManageAvailabilityModal } from './components/ManageAvailabilityModal';
import { DoctorDrawer } from './components/DoctorDrawer';
import { DeleteDoctorModal } from './components/DeleteDoctorModal';
import { doctors as mockDoctors } from '../../../mocks/doctors';

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState(mockDoctors);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAvailabilityModal, setShowAvailabilityModal] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
  const [editingDoctor, setEditingDoctor] = useState<any>(null);
  const { showToast } = useToast();

  const handleAddDoctor = (data: any) => {
    const newDoctor = {
      id: doctors.length + 1,
      ...data,
      reviewCount: 0,
      rating: 0,
      status: 'active'
    };
    setDoctors(prev => [...prev, newDoctor]);
    setShowAddModal(false);
    showToast('Doctor added successfully', 'success');
  };

  const handleEditDoctor = (data: any) => {
    setDoctors(prev =>
      prev.map(doc => (doc.id === editingDoctor.id ? { ...doc, ...data } : doc))
    );
    setEditingDoctor(null);
    setShowAddModal(false);
    showToast('Doctor updated successfully', 'success');
  };

  const handleToggleStatus = (id: number) => {
    setDoctors(prev =>
      prev.map(doc =>
        doc.id === id
          ? { ...doc, status: doc.status === 'active' ? 'inactive' : 'active' }
          : doc
      )
    );
    showToast('Doctor status updated', 'success');
  };

  const handleDeleteDoctor = () => {
    if (!selectedDoctor) return;
    setDoctors(prev => prev.filter(doc => doc.id !== selectedDoctor.id));
    setShowDeleteModal(false);
    setSelectedDoctor(null);
    showToast('Doctor deleted successfully', 'success');
  };

  const handleUpdateAvailability = (availability: any, blockedDates: string[]) => {
    if (!selectedDoctor) return;
    setDoctors(prev =>
      prev.map(doc =>
        doc.id === selectedDoctor.id ? { ...doc, availability, blockedDates } : doc
      )
    );
    setShowAvailabilityModal(false);
    setSelectedDoctor(null);
    showToast('Availability updated successfully', 'success');
  };

  return (
    <>
      <div className="p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-navy mb-2">Doctors</h1>
            <p className="text-[#6B7280]">Manage your medical staff and their schedules</p>
          </div>
          <button
            type="button"
            onClick={() => {
              setEditingDoctor(null);
              setShowAddModal(true);
            }}
            className="flex items-center justify-center gap-2 px-4 py-3 sm:px-6 bg-primary text-white rounded-xl hover:bg-primary-dark transition-all duration-200 whitespace-nowrap cursor-pointer w-full sm:w-auto min-h-[44px]"
          >
            <i className="ri-user-add-line text-xl" />
            <span className="font-medium">Add Doctor</span>
          </button>
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctors.map(doctor => (
            <DoctorCard
              key={doctor.id}
              doctor={doctor}
              onEdit={() => {
                setEditingDoctor(doctor);
                setShowAddModal(true);
              }}
              onToggleStatus={() => handleToggleStatus(doctor.id)}
              onDelete={() => {
                setSelectedDoctor(doctor);
                setShowDeleteModal(true);
              }}
              onManageAvailability={() => {
                setSelectedDoctor(doctor);
                setShowAvailabilityModal(true);
              }}
              onViewDetails={() => {
                setSelectedDoctor(doctor);
                setShowDrawer(true);
              }}
            />
          ))}
        </div>

        {/* Empty State */}
        {doctors.length === 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-[#E5E7EB] p-12 text-center">
            <div className="w-20 h-20 bg-[#F7FAFC] rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-user-line text-4xl text-[#6B7280]" />
            </div>
            <h3 className="text-xl font-semibold text-[#0B1F3B] mb-2">No doctors yet</h3>
            <p className="text-[#6B7280] mb-6">Add your first doctor to get started</p>
            <button
              onClick={() => setShowAddModal(true)}
              className="px-6 py-3 bg-[#0F766E] text-white rounded-xl hover:bg-[#0B5B54] transition-colors duration-200 font-medium whitespace-nowrap cursor-pointer"
            >
              Add Doctor
            </button>
          </div>
        )}
      </div>

      {/* Modals */}
      {showAddModal && (
        <AddDoctorModal
          doctor={editingDoctor}
          onClose={() => {
            setShowAddModal(false);
            setEditingDoctor(null);
          }}
          onSubmit={editingDoctor ? handleEditDoctor : handleAddDoctor}
        />
      )}

      {showAvailabilityModal && selectedDoctor && (
        <ManageAvailabilityModal
          doctor={selectedDoctor}
          onClose={() => {
            setShowAvailabilityModal(false);
            setSelectedDoctor(null);
          }}
          onSubmit={handleUpdateAvailability}
        />
      )}

      {showDrawer && selectedDoctor && (
        <DoctorDrawer
          doctor={selectedDoctor}
          onClose={() => {
            setShowDrawer(false);
            setSelectedDoctor(null);
          }}
        />
      )}

      {showDeleteModal && selectedDoctor && (
        <DeleteDoctorModal
          doctor={selectedDoctor}
          onClose={() => {
            setShowDeleteModal(false);
            setSelectedDoctor(null);
          }}
          onConfirm={handleDeleteDoctor}
        />
      )}

      {/* Toast */}
    </>
  );
}