
import { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { inventoryItems as mockItems, inventoryCategories } from '../../../mocks/inventory';

export default function InventoryPage() {
  const [items, setItems] = useState(mockItems);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showRestockModal, setShowRestockModal] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [restockQty, setRestockQty] = useState('');
  const [toast, setToast] = useState('');
  const [formData, setFormData] = useState({
    name: '', category: 'PPE', stockLevel: '', minThreshold: '', supplier: '', unitPrice: ''
  });

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const lowStockCount = items.filter(i => i.stockLevel <= i.minThreshold).length;

  const filtered = items
    .filter(i => {
      const matchesSearch = i.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        i.supplier.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCat = categoryFilter === 'All' || i.category === categoryFilter;
      return matchesSearch && matchesCat;
    })
    .sort((a, b) => a.name.localeCompare(b.name));

  const handleAdd = () => {
    if (!formData.name || !formData.stockLevel || !formData.minThreshold) return;
    const newItem = {
      id: Date.now(),
      name: formData.name,
      category: formData.category,
      stockLevel: parseInt(formData.stockLevel),
      minThreshold: parseInt(formData.minThreshold),
      supplier: formData.supplier,
      lastRestock: new Date().toISOString().split('T')[0],
      unitPrice: parseFloat(formData.unitPrice) || 0
    };
    setItems(prev => [...prev, newItem]);
    setFormData({ name: '', category: 'PPE', stockLevel: '', minThreshold: '', supplier: '', unitPrice: '' });
    setShowAddModal(false);
    showToast('Item added');
  };

  const handleEdit = () => {
    if (!editingItem) return;
    setItems(prev => prev.map(i => i.id === editingItem.id ? editingItem : i));
    setEditingItem(null);
    showToast('Item updated');
  };

  const handleRestock = () => {
    if (!selectedItem || !restockQty) return;
    const qty = parseInt(restockQty);
    setItems(prev => prev.map(i =>
      i.id === selectedItem.id
        ? { ...i, stockLevel: i.stockLevel + qty, lastRestock: new Date().toISOString().split('T')[0] }
        : i
    ));
    setShowRestockModal(false);
    setSelectedItem(null);
    setRestockQty('');
    showToast('Stock updated');
  };

  const handleExport = () => {
    const header = 'Name,Category,Stock,Min Threshold,Supplier,Last Restock,Unit Price';
    const rows = filtered.map(i =>
      `${i.name},${i.category},${i.stockLevel},${i.minThreshold},${i.supplier},${i.lastRestock},$${i.unitPrice}`
    );
    const csv = [header, ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'inventory.csv';
    a.click();
    window.URL.revokeObjectURL(url);
    showToast('Exported to CSV');
  };

  const getStockStatus = (item: any) => {
    if (item.stockLevel <= 0) return { label: 'Out of Stock', color: 'bg-red-100 text-red-700' };
    if (item.stockLevel <= item.minThreshold) return { label: 'Low Stock', color: 'bg-[#FEF3C7] text-[#D97706]' };
    return { label: 'In Stock', color: 'bg-[#A7F3D0] text-[#0F766E]' };
  };

  return (
    <DashboardLayout>
      <div className="p-4 sm:p-6 lg:p-8">
        {/* Toast */}
        {toast && (
          <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-[#0B1F3B] text-white px-5 py-2.5 rounded-xl text-sm font-medium shadow-lg">
            <i className="ri-check-line mr-2"></i>{toast}
          </div>
        )}

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-[#0B1F3B]">Inventory</h1>
              {lowStockCount > 0 && (
                <span className="px-2.5 py-1 bg-[#FEF3C7] text-[#D97706] rounded-full text-xs font-bold">
                  {lowStockCount} Low Stock
                </span>
              )}
            </div>
            <p className="text-sm text-[#6B7280]">Track and manage clinic supplies</p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={handleExport} className="flex items-center gap-2 px-4 py-2.5 border-2 border-[#E5E7EB] rounded-xl text-sm font-medium hover:border-[#0F766E] hover:bg-[#F0FDF9] transition-all cursor-pointer whitespace-nowrap">
              <i className="ri-download-line text-base w-4 h-4 flex items-center justify-center"></i>
              Export
            </button>
            <button onClick={() => setShowAddModal(true)} className="flex items-center gap-2 px-4 py-2.5 bg-[#0F766E] text-white rounded-xl text-sm font-medium hover:bg-[#0B5B54] transition-colors cursor-pointer whitespace-nowrap">
              <i className="ri-add-line text-base w-4 h-4 flex items-center justify-center"></i>
              Add Item
            </button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#E5E7EB]">
            <div className="w-10 h-10 bg-[#F0FDF9] rounded-xl flex items-center justify-center mb-3">
              <i className="ri-archive-line text-xl text-[#0F766E]"></i>
            </div>
            <p className="text-2xl font-bold text-[#111827]">{items.length}</p>
            <p className="text-xs text-[#6B7280]">Total Items</p>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#E5E7EB]">
            <div className="w-10 h-10 bg-[#A7F3D0]/30 rounded-xl flex items-center justify-center mb-3">
              <i className="ri-checkbox-circle-line text-xl text-[#0F766E]"></i>
            </div>
            <p className="text-2xl font-bold text-[#111827]">{items.filter(i => i.stockLevel > i.minThreshold).length}</p>
            <p className="text-xs text-[#6B7280]">In Stock</p>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#E5E7EB]">
            <div className="w-10 h-10 bg-[#FEF3C7]/50 rounded-xl flex items-center justify-center mb-3">
              <i className="ri-error-warning-line text-xl text-[#D97706]"></i>
            </div>
            <p className="text-2xl font-bold text-[#D97706]">{lowStockCount}</p>
            <p className="text-xs text-[#6B7280]">Low Stock</p>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#E5E7EB]">
            <div className="w-10 h-10 bg-[#0B1F3B]/10 rounded-xl flex items-center justify-center mb-3">
              <i className="ri-money-dollar-circle-line text-xl text-[#0B1F3B]"></i>
            </div>
            <p className="text-2xl font-bold text-[#111827]">
              ${items.reduce((sum, i) => sum + i.stockLevel * i.unitPrice, 0).toLocaleString()}
            </p>
            <p className="text-xs text-[#6B7280]">Total Value</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-sm border border-[#E5E7EB] p-4 mb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <div className="flex-1 min-w-[240px] w-full sm:w-auto">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="ri-search-line text-[#6B7280]"></i>
                </div>
                <input
                  type="text"
                  placeholder="Search items or suppliers..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border-2 border-[#E5E7EB] rounded-xl focus:border-[#0F766E] focus:outline-none text-sm"
                />
              </div>
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-1 w-full sm:w-auto">
              {inventoryCategories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                    categoryFilter === cat
                      ? 'bg-[#0F766E] text-white'
                      : 'bg-[#F3F4F6] text-[#6B7280] hover:bg-[#E5E7EB]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-[#E5E7EB] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#F7FAFC]">
                <tr>
                  <th className="px-5 py-3.5 text-left text-xs font-semibold text-[#6B7280] uppercase whitespace-nowrap">Item</th>
                  <th className="px-5 py-3.5 text-left text-xs font-semibold text-[#6B7280] uppercase whitespace-nowrap">Category</th>
                  <th className="px-5 py-3.5 text-left text-xs font-semibold text-[#6B7280] uppercase whitespace-nowrap">Stock</th>
                  <th className="px-5 py-3.5 text-left text-xs font-semibold text-[#6B7280] uppercase whitespace-nowrap">Min Threshold</th>
                  <th className="px-5 py-3.5 text-left text-xs font-semibold text-[#6B7280] uppercase whitespace-nowrap">Status</th>
                  <th className="px-5 py-3.5 text-left text-xs font-semibold text-[#6B7280] uppercase whitespace-nowrap">Supplier</th>
                  <th className="px-5 py-3.5 text-left text-xs font-semibold text-[#6B7280] uppercase whitespace-nowrap">Last Restock</th>
                  <th className="px-5 py-3.5 text-left text-xs font-semibold text-[#6B7280] uppercase whitespace-nowrap">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E7EB]">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-5 py-12 text-center text-[#6B7280]">
                      <i className="ri-archive-line text-4xl mb-2 block"></i>
                      <p className="text-sm">No items found</p>
                    </td>
                  </tr>
                ) : (
                  filtered.map(item => {
                    const status = getStockStatus(item);
                    return (
                      <tr key={item.id} className="hover:bg-[#F9FAFB] transition-colors">
                        <td className="px-5 py-3.5 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 bg-[#F0FDF9] rounded-lg flex items-center justify-center flex-shrink-0">
                              <i className="ri-medicine-bottle-line text-[#0F766E]"></i>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-[#111827]">{item.name}</p>
                              <p className="text-xs text-[#6B7280]">${item.unitPrice.toFixed(2)}/unit</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-3.5 whitespace-nowrap text-sm text-[#6B7280]">{item.category}</td>
                        <td className="px-5 py-3.5 whitespace-nowrap">
                          <span className={`text-sm font-bold ${item.stockLevel <= item.minThreshold ? 'text-[#D97706]' : 'text-[#111827]'}`}>
                            {item.stockLevel}
                          </span>
                        </td>
                        <td className="px-5 py-3.5 whitespace-nowrap text-sm text-[#6B7280]">{item.minThreshold}</td>
                        <td className="px-5 py-3.5 whitespace-nowrap">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${status.color}`}>{status.label}</span>
                        </td>
                        <td className="px-5 py-3.5 whitespace-nowrap text-sm text-[#6B7280]">{item.supplier}</td>
                        <td className="px-5 py-3.5 whitespace-nowrap text-sm text-[#6B7280]">{item.lastRestock}</td>
                        <td className="px-5 py-3.5 whitespace-nowrap">
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => { setSelectedItem(item); setShowRestockModal(true); }}
                              className="p-1.5 text-[#0F766E] hover:bg-[#F0FDF9] rounded-lg transition-colors cursor-pointer"
                              title="Restock"
                            >
                              <i className="ri-add-circle-line text-base w-4 h-4 flex items-center justify-center"></i>
                            </button>
                            <button
                              onClick={() => setEditingItem({ ...item })}
                              className="p-1.5 text-[#6B7280] hover:text-[#0F766E] hover:bg-[#F0FDF9] rounded-lg transition-colors cursor-pointer"
                              title="Edit"
                            >
                              <i className="ri-edit-line text-base w-4 h-4 flex items-center justify-center"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add Item Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setShowAddModal(false)}>
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6" onClick={e => e.stopPropagation()}>
              <h3 className="text-lg font-bold text-[#0B1F3B] mb-5">Add Inventory Item</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-[#111827] mb-1.5">Item Name *</label>
                  <input value={formData.name} onChange={e => setFormData(p => ({ ...p, name: e.target.value }))} className="w-full px-4 py-2.5 border-2 border-[#E5E7EB] rounded-xl focus:border-[#0F766E] focus:outline-none text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#111827] mb-1.5">Category *</label>
                  <select value={formData.category} onChange={e => setFormData(p => ({ ...p, category: e.target.value }))} className="w-full px-4 py-2.5 border-2 border-[#E5E7EB] rounded-xl focus:border-[#0F766E] focus:outline-none text-sm cursor-pointer">
                    {inventoryCategories.filter(c => c !== 'All').map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#111827] mb-1.5">Supplier</label>
                  <input value={formData.supplier} onChange={e => setFormData(p => ({ ...p, supplier: e.target.value }))} className="w-full px-4 py-2.5 border-2 border-[#E5E7EB] rounded-xl focus:border-[#0F766E] focus:outline-none text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#111827] mb-1.5">Stock Level *</label>
                  <input type="number" value={formData.stockLevel} onChange={e => setFormData(p => ({ ...p, stockLevel: e.target.value }))} className="w-full px-4 py-2.5 border-2 border-[#E5E7EB] rounded-xl focus:border-[#0F766E] focus:outline-none text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#111827] mb-1.5">Min Threshold *</label>
                  <input type="number" value={formData.minThreshold} onChange={e => setFormData(p => ({ ...p, minThreshold: e.target.value }))} className="w-full px-4 py-2.5 border-2 border-[#E5E7EB] rounded-xl focus:border-[#0F766E] focus:outline-none text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#111827] mb-1.5">Unit Price ($)</label>
                  <input type="number" step="0.01" value={formData.unitPrice} onChange={e => setFormData(p => ({ ...p, unitPrice: e.target.value }))} className="w-full px-4 py-2.5 border-2 border-[#E5E7EB] rounded-xl focus:border-[#0F766E] focus:outline-none text-sm" />
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button onClick={() => setShowAddModal(false)} className="px-4 py-2.5 border-2 border-[#E5E7EB] rounded-xl text-sm font-medium hover:bg-[#F9FAFB] cursor-pointer whitespace-nowrap">Cancel</button>
                <button onClick={handleAdd} className="px-4 py-2.5 bg-[#0F766E] text-white rounded-xl text-sm font-medium hover:bg-[#0B5B54] cursor-pointer whitespace-nowrap">Add Item</button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Item Modal */}
        {editingItem && (
          <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setEditingItem(null)}>
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6" onClick={e => e.stopPropagation()}>
              <h3 className="text-lg font-bold text-[#0B1F3B] mb-5">Edit Item</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-[#111827] mb-1.5">Item Name *</label>
                  <input value={editingItem.name} onChange={e => setEditingItem((p: any) => ({ ...p, name: e.target.value }))} className="w-full px-4 py-2.5 border-2 border-[#E5E7EB] rounded-xl focus:border-[#0F766E] focus:outline-none text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#111827] mb-1.5">Category</label>
                  <select value={editingItem.category} onChange={e => setEditingItem((p: any) => ({ ...p, category: e.target.value }))} className="w-full px-4 py-2.5 border-2 border-[#E5E7EB] rounded-xl focus:border-[#0F766E] focus:outline-none text-sm cursor-pointer">
                    {inventoryCategories.filter(c => c !== 'All').map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#111827] mb-1.5">Supplier</label>
                  <input value={editingItem.supplier} onChange={e => setEditingItem((p: any) => ({ ...p, supplier: e.target.value }))} className="w-full px-4 py-2.5 border-2 border-[#E5E7EB] rounded-xl focus:border-[#0F766E] focus:outline-none text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#111827] mb-1.5">Stock Level</label>
                  <input type="number" value={editingItem.stockLevel} onChange={e => setEditingItem((p: any) => ({ ...p, stockLevel: parseInt(e.target.value) || 0 }))} className="w-full px-4 py-2.5 border-2 border-[#E5E7EB] rounded-xl focus:border-[#0F766E] focus:outline-none text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#111827] mb-1.5">Min Threshold</label>
                  <input type="number" value={editingItem.minThreshold} onChange={e => setEditingItem((p: any) => ({ ...p, minThreshold: parseInt(e.target.value) || 0 }))} className="w-full px-4 py-2.5 border-2 border-[#E5E7EB] rounded-xl focus:border-[#0F766E] focus:outline-none text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#111827] mb-1.5">Unit Price ($)</label>
                  <input type="number" step="0.01" value={editingItem.unitPrice} onChange={e => setEditingItem((p: any) => ({ ...p, unitPrice: parseFloat(e.target.value) || 0 }))} className="w-full px-4 py-2.5 border-2 border-[#E5E7EB] rounded-xl focus:border-[#0F766E] focus:outline-none text-sm" />
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button onClick={() => setEditingItem(null)} className="px-4 py-2.5 border-2 border-[#E5E7EB] rounded-xl text-sm font-medium hover:bg-[#F9FAFB] cursor-pointer whitespace-nowrap">Cancel</button>
                <button onClick={handleEdit} className="px-4 py-2.5 bg-[#0F766E] text-white rounded-xl text-sm font-medium hover:bg-[#0B5B54] cursor-pointer whitespace-nowrap">Save</button>
              </div>
            </div>
          </div>
        )}

        {/* Restock Modal */}
        {showRestockModal && selectedItem && (
          <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => { setShowRestockModal(false); setSelectedItem(null); }}>
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6" onClick={e => e.stopPropagation()}>
              <h3 className="text-lg font-bold text-[#0B1F3B] mb-2">Restock Item</h3>
              <p className="text-sm text-[#6B7280] mb-5">{selectedItem.name}</p>
              <div className="flex items-center gap-4 mb-4 p-3 bg-[#F9FAFB] rounded-xl">
                <div className="text-center">
                  <p className="text-xs text-[#6B7280]">Current</p>
                  <p className="text-lg font-bold text-[#111827]">{selectedItem.stockLevel}</p>
                </div>
                <i className="ri-arrow-right-line text-[#6B7280]"></i>
                <div className="text-center">
                  <p className="text-xs text-[#6B7280]">After</p>
                  <p className="text-lg font-bold text-[#0F766E]">{selectedItem.stockLevel + (parseInt(restockQty) || 0)}</p>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#111827] mb-1.5">Quantity to Add *</label>
                <input
                  type="number"
                  value={restockQty}
                  onChange={e => setRestockQty(e.target.value)}
                  min="1"
                  className="w-full px-4 py-2.5 border-2 border-[#E5E7EB] rounded-xl focus:border-[#0F766E] focus:outline-none text-sm"
                  placeholder="Enter quantity"
                />
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button onClick={() => { setShowRestockModal(false); setSelectedItem(null); }} className="px-4 py-2.5 border-2 border-[#E5E7EB] rounded-xl text-sm font-medium hover:bg-[#F9FAFB] cursor-pointer whitespace-nowrap">Cancel</button>
                <button onClick={handleRestock} className="px-4 py-2.5 bg-[#0F766E] text-white rounded-xl text-sm font-medium hover:bg-[#0B5B54] cursor-pointer whitespace-nowrap">Restock</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
