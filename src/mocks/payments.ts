export const payments = [
  {
    id: 1,
    invoiceNumber: 'INV-2025-001',
    patient: { id: 1, name: 'Sarah Johnson' },
    appointment: { id: 1, service: 'Teeth Cleaning', date: '2025-01-15' },
    amount: 120,
    method: 'credit-card',
    status: 'paid',
    date: '2025-01-15',
    paidDate: '2025-01-15'
  },
  {
    id: 2,
    invoiceNumber: 'INV-2025-002',
    patient: { id: 2, name: 'Michael Chen' },
    appointment: { id: 2, service: 'Dental Implant', date: '2025-01-15' },
    amount: 2500,
    method: 'bank-transfer',
    status: 'pending',
    date: '2025-01-15',
    paidDate: null
  },
  {
    id: 3,
    invoiceNumber: 'INV-2025-003',
    patient: { id: 3, name: 'Emily Davis' },
    appointment: { id: 3, service: 'Teeth Whitening', date: '2025-01-15' },
    amount: 350,
    method: 'credit-card',
    status: 'paid',
    date: '2025-01-15',
    paidDate: '2025-01-15'
  },
  {
    id: 4,
    invoiceNumber: 'INV-2025-004',
    patient: { id: 4, name: 'James Wilson' },
    appointment: { id: 4, service: 'Braces Adjustment', date: '2025-01-15' },
    amount: 150,
    method: 'cash',
    status: 'pending',
    date: '2025-01-15',
    paidDate: null
  },
  {
    id: 5,
    invoiceNumber: 'INV-2025-005',
    patient: { id: 5, name: 'Lisa Anderson' },
    appointment: { id: 5, service: 'Root Canal', date: '2025-01-15' },
    amount: 800,
    method: 'credit-card',
    status: 'paid',
    date: '2025-01-15',
    paidDate: '2025-01-15'
  },
  {
    id: 6,
    invoiceNumber: 'INV-2025-006',
    patient: { id: 6, name: 'Robert Taylor' },
    appointment: { id: 6, service: 'Dental Checkup', date: '2025-01-16' },
    amount: 80,
    method: 'insurance',
    status: 'paid',
    date: '2025-01-16',
    paidDate: '2025-01-16'
  },
  {
    id: 7,
    invoiceNumber: 'INV-2025-007',
    patient: { id: 7, name: 'Maria Garcia' },
    appointment: { id: 7, service: 'Cavity Filling', date: '2025-01-16' },
    amount: 200,
    method: 'credit-card',
    status: 'paid',
    date: '2025-01-16',
    paidDate: '2025-01-16'
  },
  {
    id: 8,
    invoiceNumber: 'INV-2025-008',
    patient: { id: 8, name: 'David Lee' },
    appointment: { id: 8, service: 'Wisdom Tooth Extraction', date: '2025-01-16' },
    amount: 400,
    method: 'credit-card',
    status: 'refunded',
    date: '2025-01-16',
    paidDate: '2025-01-16',
    refundDate: '2025-01-17',
    refundReason: 'Appointment cancelled by patient'
  },
  {
    id: 9,
    invoiceNumber: 'INV-2025-009',
    patient: { id: 1, name: 'Sarah Johnson' },
    appointment: { id: 9, service: 'Teeth Whitening', date: '2025-01-10' },
    amount: 350,
    method: 'credit-card',
    status: 'paid',
    date: '2025-01-10',
    paidDate: '2025-01-10'
  },
  {
    id: 10,
    invoiceNumber: 'INV-2025-010',
    patient: { id: 3, name: 'Emily Davis' },
    appointment: { id: 10, service: 'Braces Adjustment', date: '2025-01-12' },
    amount: 150,
    method: 'bank-transfer',
    status: 'paid',
    date: '2025-01-12',
    paidDate: '2025-01-13'
  },
  {
    id: 11,
    invoiceNumber: 'INV-2025-011',
    patient: { id: 5, name: 'Lisa Anderson' },
    appointment: { id: 11, service: 'Dental Checkup', date: '2025-01-08' },
    amount: 80,
    method: 'cash',
    status: 'paid',
    date: '2025-01-08',
    paidDate: '2025-01-08'
  },
  {
    id: 12,
    invoiceNumber: 'INV-2025-012',
    patient: { id: 2, name: 'Michael Chen' },
    appointment: { id: 12, service: 'Cavity Filling', date: '2025-01-14' },
    amount: 200,
    method: 'insurance',
    status: 'pending',
    date: '2025-01-14',
    paidDate: null
  }
];