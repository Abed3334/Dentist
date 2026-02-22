export const serviceCategories = [
  { id: 'all', name: 'All Services', icon: 'ri-grid-line' },
  { id: 'cleaning', name: 'Cleaning', icon: 'ri-brush-line' },
  { id: 'whitening', name: 'Whitening', icon: 'ri-contrast-2-line' },
  { id: 'braces', name: 'Braces', icon: 'ri-align-center' },
  { id: 'implants', name: 'Implants', icon: 'ri-tooth-line' },
  { id: 'consultation', name: 'Consultation', icon: 'ri-chat-check-line' }
];

export const services = [
  {
    id: 1,
    name: 'Regular Teeth Cleaning',
    category: 'cleaning',
    duration: 60,
    price: 120,
    description: 'Professional teeth cleaning to remove plaque and tartar buildup. Includes polishing and fluoride treatment.',
    active: true,
    popularTimes: [
      { time: '09:00', bookings: 45 },
      { time: '10:00', bookings: 38 },
      { time: '11:00', bookings: 42 },
      { time: '14:00', bookings: 35 },
      { time: '15:00', bookings: 40 },
      { time: '16:00', bookings: 32 }
    ]
  },
  {
    id: 2,
    name: 'Deep Cleaning',
    category: 'cleaning',
    duration: 90,
    price: 250,
    description: 'Intensive cleaning for patients with gum disease. Includes scaling and root planing.',
    active: true,
    popularTimes: [
      { time: '09:00', bookings: 28 },
      { time: '10:00', bookings: 32 },
      { time: '11:00', bookings: 25 },
      { time: '14:00', bookings: 30 },
      { time: '15:00', bookings: 27 },
      { time: '16:00', bookings: 22 }
    ]
  },
  {
    id: 3,
    name: 'Professional Teeth Whitening',
    category: 'whitening',
    duration: 90,
    price: 350,
    description: 'In-office teeth whitening treatment for a brighter, whiter smile. Results visible immediately.',
    active: true,
    popularTimes: [
      { time: '09:00', bookings: 35 },
      { time: '10:00', bookings: 42 },
      { time: '11:00', bookings: 38 },
      { time: '14:00', bookings: 45 },
      { time: '15:00', bookings: 40 },
      { time: '16:00', bookings: 36 }
    ]
  },
  {
    id: 4,
    name: 'Take-Home Whitening Kit',
    category: 'whitening',
    duration: 30,
    price: 200,
    description: 'Custom-fitted whitening trays and professional-grade whitening gel for at-home use.',
    active: true,
    popularTimes: [
      { time: '09:00', bookings: 15 },
      { time: '10:00', bookings: 18 },
      { time: '11:00', bookings: 20 },
      { time: '14:00', bookings: 22 },
      { time: '15:00', bookings: 19 },
      { time: '16:00', bookings: 16 }
    ]
  },
  {
    id: 5,
    name: 'Metal Braces',
    category: 'braces',
    duration: 120,
    price: 4500,
    description: 'Traditional metal braces for comprehensive orthodontic treatment. Price includes initial setup.',
    active: true,
    popularTimes: [
      { time: '09:00', bookings: 12 },
      { time: '10:00', bookings: 15 },
      { time: '11:00', bookings: 10 },
      { time: '14:00', bookings: 14 },
      { time: '15:00', bookings: 11 },
      { time: '16:00', bookings: 8 }
    ]
  },
  {
    id: 6,
    name: 'Clear Aligners (Invisalign)',
    category: 'braces',
    duration: 90,
    price: 5500,
    description: 'Invisible aligners for discreet orthodontic treatment. Custom-made for your teeth.',
    active: true,
    popularTimes: [
      { time: '09:00', bookings: 20 },
      { time: '10:00', bookings: 25 },
      { time: '11:00', bookings: 22 },
      { time: '14:00', bookings: 28 },
      { time: '15:00', bookings: 24 },
      { time: '16:00', bookings: 18 }
    ]
  },
  {
    id: 7,
    name: 'Braces Adjustment',
    category: 'braces',
    duration: 45,
    price: 150,
    description: 'Monthly adjustment and tightening of braces. Includes wire changes and bracket repairs.',
    active: true,
    popularTimes: [
      { time: '09:00', bookings: 30 },
      { time: '10:00', bookings: 35 },
      { time: '11:00', bookings: 32 },
      { time: '14:00', bookings: 38 },
      { time: '15:00', bookings: 33 },
      { time: '16:00', bookings: 28 }
    ]
  },
  {
    id: 8,
    name: 'Single Tooth Implant',
    category: 'implants',
    duration: 120,
    price: 2500,
    description: 'Permanent tooth replacement with titanium implant and crown. Includes consultation and follow-up.',
    active: true,
    popularTimes: [
      { time: '09:00', bookings: 18 },
      { time: '10:00', bookings: 22 },
      { time: '11:00', bookings: 20 },
      { time: '14:00', bookings: 24 },
      { time: '15:00', bookings: 21 },
      { time: '16:00', bookings: 16 }
    ]
  },
  {
    id: 9,
    name: 'Full Mouth Implants',
    category: 'implants',
    duration: 240,
    price: 25000,
    description: 'Complete mouth restoration with dental implants. Comprehensive treatment plan included.',
    active: true,
    popularTimes: [
      { time: '09:00', bookings: 5 },
      { time: '10:00', bookings: 7 },
      { time: '11:00', bookings: 6 },
      { time: '14:00', bookings: 8 },
      { time: '15:00', bookings: 6 },
      { time: '16:00', bookings: 4 }
    ]
  },
  {
    id: 10,
    name: 'Initial Consultation',
    category: 'consultation',
    duration: 30,
    price: 80,
    description: 'Comprehensive dental examination and treatment planning. Includes X-rays and oral health assessment.',
    active: true,
    popularTimes: [
      { time: '09:00', bookings: 40 },
      { time: '10:00', bookings: 45 },
      { time: '11:00', bookings: 42 },
      { time: '14:00', bookings: 48 },
      { time: '15:00', bookings: 44 },
      { time: '16:00', bookings: 38 }
    ]
  },
  {
    id: 11,
    name: 'Emergency Consultation',
    category: 'consultation',
    duration: 45,
    price: 150,
    description: 'Urgent dental care for pain, trauma, or dental emergencies. Same-day appointments available.',
    active: true,
    popularTimes: [
      { time: '09:00', bookings: 25 },
      { time: '10:00', bookings: 30 },
      { time: '11:00', bookings: 28 },
      { time: '14:00', bookings: 32 },
      { time: '15:00', bookings: 29 },
      { time: '16:00', bookings: 24 }
    ]
  },
  {
    id: 12,
    name: 'Root Canal Therapy',
    category: 'consultation',
    duration: 90,
    price: 800,
    description: 'Treatment for infected tooth pulp. Includes cleaning, filling, and temporary crown.',
    active: true,
    popularTimes: [
      { time: '09:00', bookings: 15 },
      { time: '10:00', bookings: 18 },
      { time: '11:00', bookings: 16 },
      { time: '14:00', bookings: 20 },
      { time: '15:00', bookings: 17 },
      { time: '16:00', bookings: 14 }
    ]
  },
  {
    id: 13,
    name: 'Cavity Filling',
    category: 'consultation',
    duration: 60,
    price: 200,
    description: 'Composite resin filling for cavities. Tooth-colored material for natural appearance.',
    active: true,
    popularTimes: [
      { time: '09:00', bookings: 35 },
      { time: '10:00', bookings: 40 },
      { time: '11:00', bookings: 37 },
      { time: '14:00', bookings: 42 },
      { time: '15:00', bookings: 38 },
      { time: '16:00', bookings: 33 }
    ]
  },
  {
    id: 14,
    name: 'Wisdom Tooth Extraction',
    category: 'consultation',
    duration: 90,
    price: 400,
    description: 'Surgical removal of wisdom teeth. Includes local anesthesia and post-operative care instructions.',
    active: false,
    popularTimes: [
      { time: '09:00', bookings: 12 },
      { time: '10:00', bookings: 15 },
      { time: '11:00', bookings: 13 },
      { time: '14:00', bookings: 16 },
      { time: '15:00', bookings: 14 },
      { time: '16:00', bookings: 10 }
    ]
  }
];