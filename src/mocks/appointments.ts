export const appointments = [
  {
    id: 1,
    date: '2025-01-15',
    time: '09:00',
    patient: { id: 1, name: 'Sarah Johnson', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face' },
    service: { id: 1, name: 'Teeth Cleaning', duration: 60 },
    doctor: { id: 1, name: 'Dr. Smith' },
    status: 'confirmed',
    paymentStatus: 'paid',
    amount: 120,
    notes: 'Regular checkup and cleaning'
  },
  {
    id: 2,
    date: '2025-01-15',
    time: '10:30',
    patient: { id: 2, name: 'Michael Chen', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face' },
    service: { id: 2, name: 'Dental Implant', duration: 120 },
    doctor: { id: 2, name: 'Dr. Williams' },
    status: 'in-progress',
    paymentStatus: 'pending',
    amount: 2500,
    notes: 'First implant session'
  },
  {
    id: 3,
    date: '2025-01-15',
    time: '11:00',
    patient: { id: 3, name: 'Emily Davis', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face' },
    service: { id: 3, name: 'Teeth Whitening', duration: 90 },
    doctor: { id: 3, name: 'Dr. Brown' },
    status: 'confirmed',
    paymentStatus: 'paid',
    amount: 350,
    notes: 'Cosmetic whitening treatment'
  },
  {
    id: 4,
    date: '2025-01-15',
    time: '14:00',
    patient: { id: 4, name: 'James Wilson', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face' },
    service: { id: 4, name: 'Braces Adjustment', duration: 45 },
    doctor: { id: 4, name: 'Dr. Johnson' },
    status: 'pending',
    paymentStatus: 'pending',
    amount: 150,
    notes: 'Monthly adjustment'
  },
  {
    id: 5,
    date: '2025-01-15',
    time: '15:30',
    patient: { id: 5, name: 'Lisa Anderson', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&crop=face' },
    service: { id: 5, name: 'Root Canal', duration: 90 },
    doctor: { id: 1, name: 'Dr. Smith' },
    status: 'confirmed',
    paymentStatus: 'paid',
    amount: 800,
    notes: 'Root canal therapy'
  },
  {
    id: 6,
    date: '2025-01-16',
    time: '09:00',
    patient: { id: 6, name: 'Robert Taylor', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face' },
    service: { id: 6, name: 'Dental Checkup', duration: 30 },
    doctor: { id: 2, name: 'Dr. Williams' },
    status: 'confirmed',
    paymentStatus: 'paid',
    amount: 80,
    notes: 'Routine checkup'
  },
  {
    id: 7,
    date: '2025-01-16',
    time: '10:00',
    patient: { id: 7, name: 'Maria Garcia', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&crop=face' },
    service: { id: 7, name: 'Cavity Filling', duration: 60 },
    doctor: { id: 3, name: 'Dr. Brown' },
    status: 'completed',
    paymentStatus: 'paid',
    amount: 200,
    notes: 'Two cavities filled'
  },
  {
    id: 8,
    date: '2025-01-16',
    time: '14:00',
    patient: { id: 8, name: 'David Lee', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&h=80&fit=crop&crop=face' },
    service: { id: 8, name: 'Wisdom Tooth Extraction', duration: 90 },
    doctor: { id: 1, name: 'Dr. Smith' },
    status: 'cancelled',
    paymentStatus: 'refunded',
    amount: 400,
    notes: 'Patient requested cancellation'
  }
];

export const doctors = [
  { id: 1, name: 'Dr. Smith' },
  { id: 2, name: 'Dr. Williams' },
  { id: 3, name: 'Dr. Brown' },
  { id: 4, name: 'Dr. Johnson' }
];

export const services = [
  { id: 1, name: 'Teeth Cleaning', duration: 60 },
  { id: 2, name: 'Dental Implant', duration: 120 },
  { id: 3, name: 'Teeth Whitening', duration: 90 },
  { id: 4, name: 'Braces Adjustment', duration: 45 },
  { id: 5, name: 'Root Canal', duration: 90 },
  { id: 6, name: 'Dental Checkup', duration: 30 },
  { id: 7, name: 'Cavity Filling', duration: 60 },
  { id: 8, name: 'Wisdom Tooth Extraction', duration: 90 }
];

export const patients = [
  { id: 1, name: 'Sarah Johnson' },
  { id: 2, name: 'Michael Chen' },
  { id: 3, name: 'Emily Davis' },
  { id: 4, name: 'James Wilson' },
  { id: 5, name: 'Lisa Anderson' },
  { id: 6, name: 'Robert Taylor' },
  { id: 7, name: 'Maria Garcia' },
  { id: 8, name: 'David Lee' }
];