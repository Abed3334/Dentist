import { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { ServiceList } from './components/ServiceList';
import { CategoryList } from './components/CategoryList';
import { AddServiceModal } from './components/AddServiceModal';
import { ServiceDetailDrawer } from './components/ServiceDetailDrawer';
import { services as mockServices, serviceCategories } from '../../../mocks/services';

export default function ServicesPage() {
  const [services, setServices] = useState(mockServices);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'price' | 'duration'>('price');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);
  const [selectedService, setSelectedService] = useState<any>(null);
  const [editingService, setEditingService] = useState<any>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Filter and sort services
  const filteredServices = services
    .filter(svc => {
      const matchesCategory = selectedCategory === 'all' || svc.category === selectedCategory;
      const matchesSearch =
        svc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        svc.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'price') return a.price - b.price;
      return a.duration - b.duration;
    });

  const handleAddService = (data: any) => {
    const newService = {
      id: services.length + 1,
      ...data,
      popularTimes: [
        { time: '09:00', bookings: 20 },
        { time: '10:00', bookings: 25 },
        { time: '11:00', bookings: 22 },
        { time: '14:00', bookings: 28 },
        { time: '15:00', bookings: 24 },
        { time: '16:00', bookings: 18 }
      ]
    };
    setServices(prev => [...prev, newService]);
    setShowAddModal(false);
    showToast('Service added successfully', 'success');
  };

  const handleEditService = (data: any) => {
    setServices(prev =>
      prev.map(svc => (svc.id === editingService.id ? { ...svc, ...data } : svc))
    );
    setEditingService(null);
    setShowAddModal(false);
    showToast('Service updated successfully', 'success');
  };

  const handleDeleteService = (id: number) => {
    setServices(prev => prev.filter(svc => svc.id !== id));
    setShowDrawer(false);
    setSelectedService(null);
    showToast('Service deleted successfully', 'success');
  };

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <DashboardLayout>
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-[#0B1F3B] mb-2">Services</h1>
            <p className="text-[#6B7280]">Manage your dental services catalog</p>
          </div>
          <button
            onClick={() => {
              setEditingService(null);
              setShowAddModal(true);
            }}
            className="flex items-center gap-2 px-6 py-3 bg-[#0F766E] text-white rounded-xl hover:bg-[#0B5B54] transition-all duration-200 whitespace-nowrap cursor-pointer"
          >
            <i className="ri-add-line text-xl" />
            <span className="font-medium">Add Service</span>
          </button>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-2xl shadow-sm border border-[#E5E7EB] p-6 mb-6">
          <div className="flex flex-wrap items-center gap-4">
            {/* Search */}
            <div className="flex-1 min-w-[280px]">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <i className="ri-search-line text-[#6B7280] text-lg" />
                </div>
                <input
                  type="text"
                  placeholder="Search services..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border-2 border-[#E5E7EB] rounded-xl focus:border-[#0F766E] focus:outline-none transition-colors duration-200 text-sm"
                />
              </div>
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as 'price' | 'duration')}
              className="px-4 py-3 border-2 border-[#E5E7EB] rounded-xl focus:border-[#0F766E] focus:outline-none transition-colors duration-200 text-sm cursor-pointer"
            >
              <option value="price">Sort by Price</option>
              <option value="duration">Sort by Duration</option>
            </select>
          </div>
        </div>

        {/* Layout */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Categories */}
          <div className="lg:w-64">
            <CategoryList
              categories={serviceCategories}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
          </div>

          {/* Services */}
          <div className="flex-1">
            <ServiceList
              services={filteredServices}
              onEdit={svc => {
                setEditingService(svc);
                setShowAddModal(true);
              }}
              onView={svc => {
                setSelectedService(svc);
                setShowDrawer(true);
              }}
            />
          </div>
        </div>
      </div>

      {/* Modals */}
      {showAddModal && (
        <AddServiceModal
          service={editingService}
          onClose={() => {
            setShowAddModal(false);
            setEditingService(null);
          }}
          onSubmit={editingService ? handleEditService : handleAddService}
        />
      )}

      {showDrawer && selectedService && (
        <ServiceDetailDrawer
          service={selectedService}
          onClose={() => {
            setShowDrawer(false);
            setSelectedService(null);
          }}
          onEdit={() => {
            setEditingService(selectedService);
            setShowDrawer(false);
            setShowAddModal(true);
          }}
          onDelete={() => handleDeleteService(selectedService.id)}
        />
      )}

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-8 right-8 z-50 animate-slide-up">
          <div
            className={`px-6 py-4 rounded-xl shadow-lg flex items-center gap-3 ${
              toast.type === 'success' ? 'bg-[#0F766E] text-white' : 'bg-red-500 text-white'
            }`}
          >
            <i
              className={`${
                toast.type === 'success' ? 'ri-check-line' : 'ri-error-warning-line'
              } text-2xl`}
            />
            <span className="font-medium">{toast.message}</span>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}