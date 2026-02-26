import { useState } from 'react';
import { useToast } from '@/contexts/ToastContext';
import { PaymentTable } from './components/PaymentTable';
import { MarkAsPaidModal } from './components/MarkAsPaidModal';
import { IssueRefundModal } from './components/IssueRefundModal';
import { payments as mockPayments } from '../../../mocks/payments';

export default function PaymentsPage() {
  const [payments, setPayments] = useState(mockPayments);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [methodFilter, setMethodFilter] = useState('all');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [showMarkPaidModal, setShowMarkPaidModal] = useState(false);
  const [showRefundModal, setShowRefundModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<any>(null);
  const [showFilters, setShowFilters] = useState(false);
  const { showToast } = useToast();

  // Calculate KPIs
  const totalCollected = payments
    .filter(p => p.status === 'paid')
    .reduce((sum, p) => sum + p.amount, 0);
  const totalPending = payments
    .filter(p => p.status === 'pending')
    .reduce((sum, p) => sum + p.amount, 0);
  const totalRefunded = payments
    .filter(p => p.status === 'refunded')
    .reduce((sum, p) => sum + p.amount, 0);

  const currentMonth = new Date().toISOString().slice(0, 7);
  const thisMonthTotal = payments
    .filter(p => p.date.startsWith(currentMonth) && p.status === 'paid')
    .reduce((sum, p) => sum + p.amount, 0);

  // Filter payments
  const filteredPayments = payments.filter(payment => {
    const matchesSearch =
      payment.patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || payment.status === statusFilter;
    const matchesMethod = methodFilter === 'all' || payment.method === methodFilter;

    const matchesDateRange =
      (!dateRange.start || payment.date >= dateRange.start) &&
      (!dateRange.end || payment.date <= dateRange.end);

    return matchesSearch && matchesStatus && matchesMethod && matchesDateRange;
  });

  const handleMarkAsPaid = (method: string) => {
    if (!selectedPayment) return;
    setPayments(prev =>
      prev.map(p =>
        p.id === selectedPayment.id
          ? { ...p, status: 'paid', method, paidDate: new Date().toISOString().split('T')[0] }
          : p
      )
    );
    setShowMarkPaidModal(false);
    setSelectedPayment(null);
    showToast('Payment marked as paid', 'success');
  };

  const handleIssueRefund = (reason: string, amount: number) => {
    if (!selectedPayment) return;
    setPayments(prev =>
      prev.map(p =>
        p.id === selectedPayment.id
          ? {
              ...p,
              status: 'refunded',
              refundDate: new Date().toISOString().split('T')[0],
              refundReason: reason,
              refundAmount: amount
            }
          : p
      )
    );
    setShowRefundModal(false);
    setSelectedPayment(null);
    showToast('Refund issued successfully', 'success');
  };

  const handleDownloadInvoice = (payment: any) => {
    showToast(`Invoice ${payment.invoiceNumber} downloaded`, 'success');
  };

  const handleExportCSV = () => {
    showToast('Payments exported to CSV', 'success');
  };

  return (
    <>
      <div className="p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-navy mb-2">Payments</h1>
            <p className="text-[#6B7280]">Manage invoices, payments, and refunds</p>
          </div>
          <button
            type="button"
            onClick={handleExportCSV}
            className="flex items-center justify-center gap-2 px-4 py-3 sm:px-6 bg-primary text-white rounded-xl hover:bg-primary-dark transition-all duration-200 whitespace-nowrap cursor-pointer w-full sm:w-auto min-h-[44px]"
          >
            <i className="ri-download-line text-xl" />
            <span className="font-medium">Export CSV</span>
          </button>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-2xl shadow-sm border border-[#E5E7EB] p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-[#6B7280]">Total Collected</span>
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <i className="ri-money-dollar-circle-line text-xl text-green-600" />
              </div>
            </div>
            <div className="text-3xl font-bold text-[#0B1F3B]">${totalCollected.toLocaleString()}</div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-[#E5E7EB] p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-[#6B7280]">Pending</span>
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                <i className="ri-time-line text-xl text-yellow-600" />
              </div>
            </div>
            <div className="text-3xl font-bold text-[#0B1F3B]">${totalPending.toLocaleString()}</div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-[#E5E7EB] p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-[#6B7280]">Refunded</span>
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <i className="ri-refund-line text-xl text-red-600" />
              </div>
            </div>
            <div className="text-3xl font-bold text-[#0B1F3B]">${totalRefunded.toLocaleString()}</div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-[#E5E7EB] p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-[#6B7280]">This Month</span>
              <div className="w-10 h-10 bg-[#A7F3D0] rounded-lg flex items-center justify-center">
                <i className="ri-calendar-line text-xl text-[#0F766E]" />
              </div>
            </div>
            <div className="text-3xl font-bold text-[#0B1F3B]">${thisMonthTotal.toLocaleString()}</div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-sm border border-[#E5E7EB] p-6 mb-6">
          <div className="flex flex-wrap items-center gap-4 mb-4">
            {/* Search */}
            <div className="flex-1 min-w-[280px]">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <i className="ri-search-line text-[#6B7280] text-lg" />
                </div>
                <input
                  type="text"
                  placeholder="Search by patient or invoice number..."
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
          </div>

          {/* Filter Options */}
          <div className={`${showFilters ? 'flex' : 'hidden lg:flex'} flex-wrap items-center gap-4`}>
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="px-4 py-3 border-2 border-[#E5E7EB] rounded-xl focus:border-[#0F766E] focus:outline-none transition-colors duration-200 text-sm cursor-pointer"
            >
              <option value="all">All Status</option>
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
              <option value="refunded">Refunded</option>
            </select>

            <select
              value={methodFilter}
              onChange={e => setMethodFilter(e.target.value)}
              className="px-4 py-3 border-2 border-[#E5E7EB] rounded-xl focus:border-[#0F766E] focus:outline-none transition-colors duration-200 text-sm cursor-pointer"
            >
              <option value="all">All Methods</option>
              <option value="credit-card">Credit Card</option>
              <option value="cash">Cash</option>
              <option value="bank-transfer">Bank Transfer</option>
              <option value="insurance">Insurance</option>
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

        {/* Payment Table */}
        <PaymentTable
          payments={filteredPayments}
          onMarkAsPaid={payment => {
            setSelectedPayment(payment);
            setShowMarkPaidModal(true);
          }}
          onIssueRefund={payment => {
            setSelectedPayment(payment);
            setShowRefundModal(true);
          }}
          onDownloadInvoice={handleDownloadInvoice}
        />
      </div>

      {/* Modals */}
      {showMarkPaidModal && selectedPayment && (
        <MarkAsPaidModal
          payment={selectedPayment}
          onClose={() => {
            setShowMarkPaidModal(false);
            setSelectedPayment(null);
          }}
          onConfirm={handleMarkAsPaid}
        />
      )}

      {showRefundModal && selectedPayment && (
        <IssueRefundModal
          payment={selectedPayment}
          onClose={() => {
            setShowRefundModal(false);
            setSelectedPayment(null);
          }}
          onConfirm={handleIssueRefund}
        />
      )}

      {/* Toast */}
    </>
  );
}