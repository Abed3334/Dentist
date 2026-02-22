
export const conversations = [
  {
    id: 1,
    patient: { id: 1, name: 'Sarah Johnson', avatar: 'https://readdy.ai/api/search-image?query=Professional%20headshot%20portrait%20of%20young%20woman%20with%20friendly%20smile%2C%20clean%20white%20background%2C%20modern%20professional%20photo&width=80&height=80&seq=patient-1&orientation=squarish' },
    lastMessage: 'Hi, I wanted to confirm my appointment for tomorrow at 9 AM.',
    lastMessageTime: '2025-01-15T14:30:00',
    unread: 2,
    tags: ['Appointment'],
    status: 'open',
    assignedTo: null,
    messages: [
      { id: 1, sender: 'patient', text: 'Hello! I have a question about my upcoming appointment.', time: '2025-01-15T14:00:00' },
      { id: 2, sender: 'staff', text: 'Hi Sarah! Of course, how can I help you?', time: '2025-01-15T14:10:00' },
      { id: 3, sender: 'patient', text: 'I wanted to confirm my appointment for tomorrow at 9 AM.', time: '2025-01-15T14:30:00' },
      { id: 4, sender: 'patient', text: 'Also, do I need to bring anything specific?', time: '2025-01-15T14:31:00' }
    ]
  },
  {
    id: 2,
    patient: { id: 2, name: 'Michael Chen', avatar: 'https://readdy.ai/api/search-image?query=Professional%20headshot%20portrait%20of%20young%20asian%20man%20with%20confident%20smile%2C%20clean%20white%20background%2C%20modern%20professional%20photo&width=80&height=80&seq=patient-2&orientation=squarish' },
    lastMessage: 'Can I get a copy of my invoice from last visit?',
    lastMessageTime: '2025-01-15T12:15:00',
    unread: 1,
    tags: ['Billing'],
    status: 'open',
    assignedTo: 'Dr. Smith',
    messages: [
      { id: 1, sender: 'patient', text: 'Hi, I need help with my billing.', time: '2025-01-15T12:00:00' },
      { id: 2, sender: 'staff', text: 'Hello Michael! What do you need help with?', time: '2025-01-15T12:05:00' },
      { id: 3, sender: 'patient', text: 'Can I get a copy of my invoice from last visit?', time: '2025-01-15T12:15:00' }
    ]
  },
  {
    id: 3,
    patient: { id: 3, name: 'Emily Davis', avatar: 'https://readdy.ai/api/search-image?query=Professional%20headshot%20portrait%20of%20young%20woman%20with%20warm%20smile%2C%20clean%20white%20background%2C%20modern%20professional%20photo&width=80&height=80&seq=patient-3&orientation=squarish' },
    lastMessage: 'Thank you so much! The whitening results are amazing.',
    lastMessageTime: '2025-01-15T10:45:00',
    unread: 0,
    tags: ['Appointment'],
    status: 'resolved',
    assignedTo: 'Dr. Brown',
    messages: [
      { id: 1, sender: 'patient', text: 'Hi! I just wanted to say thank you for the whitening treatment.', time: '2025-01-15T10:30:00' },
      { id: 2, sender: 'staff', text: 'We are so glad you are happy with the results, Emily!', time: '2025-01-15T10:35:00' },
      { id: 3, sender: 'patient', text: 'Thank you so much! The whitening results are amazing.', time: '2025-01-15T10:45:00' }
    ]
  },
  {
    id: 4,
    patient: { id: 4, name: 'James Wilson', avatar: 'https://readdy.ai/api/search-image?query=Professional%20headshot%20portrait%20of%20middle%20aged%20man%20with%20friendly%20expression%2C%20clean%20white%20background%2C%20modern%20professional%20photo&width=80&height=80&seq=patient-4&orientation=squarish' },
    lastMessage: 'My braces wire broke. Can I come in today?',
    lastMessageTime: '2025-01-15T09:20:00',
    unread: 3,
    tags: ['Urgent', 'Appointment'],
    status: 'open',
    assignedTo: null,
    messages: [
      { id: 1, sender: 'patient', text: 'URGENT: My braces wire broke this morning!', time: '2025-01-15T09:00:00' },
      { id: 2, sender: 'patient', text: 'It is poking my cheek and it hurts.', time: '2025-01-15T09:05:00' },
      { id: 3, sender: 'patient', text: 'My braces wire broke. Can I come in today?', time: '2025-01-15T09:20:00' }
    ]
  },
  {
    id: 5,
    patient: { id: 5, name: 'Lisa Anderson', avatar: 'https://readdy.ai/api/search-image?query=Professional%20headshot%20portrait%20of%20mature%20woman%20with%20confident%20smile%2C%20clean%20white%20background%2C%20modern%20professional%20photo&width=80&height=80&seq=patient-5&orientation=squarish' },
    lastMessage: 'Does my insurance cover the root canal procedure?',
    lastMessageTime: '2025-01-14T16:30:00',
    unread: 0,
    tags: ['Billing', 'Insurance'],
    status: 'open',
    assignedTo: 'Receptionist',
    messages: [
      { id: 1, sender: 'patient', text: 'Hi, I have a question about insurance coverage.', time: '2025-01-14T16:00:00' },
      { id: 2, sender: 'staff', text: 'Hello Lisa! I would be happy to help with insurance questions.', time: '2025-01-14T16:10:00' },
      { id: 3, sender: 'patient', text: 'Does my insurance cover the root canal procedure?', time: '2025-01-14T16:30:00' },
      { id: 4, sender: 'staff', text: 'Let me check your plan details. MetLife typically covers 80% of root canal therapy.', time: '2025-01-14T16:35:00' }
    ]
  },
  {
    id: 6,
    patient: { id: 6, name: 'Robert Taylor', avatar: 'https://readdy.ai/api/search-image?query=Professional%20headshot%20portrait%20of%20young%20man%20with%20casual%20smile%2C%20clean%20white%20background%2C%20modern%20professional%20photo&width=80&height=80&seq=patient-6&orientation=squarish' },
    lastMessage: 'I need to reschedule my appointment next week.',
    lastMessageTime: '2025-01-14T11:00:00',
    unread: 0,
    tags: ['Appointment'],
    status: 'resolved',
    assignedTo: 'Receptionist',
    messages: [
      { id: 1, sender: 'patient', text: 'Hello, I need to reschedule my appointment next week.', time: '2025-01-14T11:00:00' },
      { id: 2, sender: 'staff', text: 'No problem, Robert! When would you like to reschedule to?', time: '2025-01-14T11:10:00' },
      { id: 3, sender: 'patient', text: 'How about Thursday at 2 PM?', time: '2025-01-14T11:15:00' },
      { id: 4, sender: 'staff', text: 'Thursday at 2 PM works perfectly. I have rescheduled your appointment. See you then!', time: '2025-01-14T11:20:00' },
      { id: 5, sender: 'patient', text: 'Great, thank you!', time: '2025-01-14T11:22:00' }
    ]
  },
  {
    id: 7,
    patient: { id: 7, name: 'Jennifer Martinez', avatar: 'https://readdy.ai/api/search-image?query=Professional%20headshot%20portrait%20of%20hispanic%20woman%20with%20bright%20smile%2C%20clean%20white%20background%2C%20modern%20professional%20photo&width=80&height=80&seq=patient-7&orientation=squarish' },
    lastMessage: 'What are the post-care instructions for my filling?',
    lastMessageTime: '2025-01-13T15:45:00',
    unread: 0,
    tags: ['Post-Care'],
    status: 'resolved',
    assignedTo: 'Dr. Smith',
    messages: [
      { id: 1, sender: 'patient', text: 'Hi Dr. Smith, I had a filling done yesterday.', time: '2025-01-13T15:30:00' },
      { id: 2, sender: 'patient', text: 'What are the post-care instructions for my filling?', time: '2025-01-13T15:45:00' },
      { id: 3, sender: 'staff', text: 'Hi Jennifer! Avoid hard foods for 24 hours, and if you experience sensitivity, that is normal for a few days. Let us know if pain persists.', time: '2025-01-13T16:00:00' }
    ]
  },
  {
    id: 8,
    patient: { id: 8, name: 'David Brown', avatar: 'https://readdy.ai/api/search-image?query=Professional%20headshot%20portrait%20of%20african%20american%20man%20with%20professional%20smile%2C%20clean%20white%20background%2C%20modern%20professional%20photo&width=80&height=80&seq=patient-8&orientation=squarish' },
    lastMessage: 'Can I book a teeth whitening session for next month?',
    lastMessageTime: '2025-01-13T10:00:00',
    unread: 1,
    tags: ['Appointment'],
    status: 'open',
    assignedTo: null,
    messages: [
      { id: 1, sender: 'patient', text: 'Hey! I am interested in teeth whitening.', time: '2025-01-13T09:45:00' },
      { id: 2, sender: 'patient', text: 'Can I book a teeth whitening session for next month?', time: '2025-01-13T10:00:00' }
    ]
  }
];

export const quickReplyTemplates = [
  { id: 1, name: 'Appointment Confirmed', text: 'Your appointment has been confirmed. Please arrive 10 minutes early. If you need to reschedule, please let us know at least 24 hours in advance.' },
  { id: 2, name: 'Appointment Reminder', text: 'This is a friendly reminder about your upcoming appointment. Please remember to bring your insurance card and arrive 10 minutes early.' },
  { id: 3, name: 'Billing Info', text: 'Your invoice has been generated and sent to your email. If you have any questions about the charges, please do not hesitate to ask.' },
  { id: 4, name: 'Post-Care Instructions', text: 'Thank you for visiting Dentest! Please follow the post-care instructions provided. If you experience any unusual symptoms, contact us immediately.' },
  { id: 5, name: 'Insurance Query', text: 'We have checked your insurance coverage. Your plan covers the procedure. We will send you a detailed breakdown of costs and coverage shortly.' },
  { id: 6, name: 'Reschedule Confirmation', text: 'Your appointment has been successfully rescheduled. You will receive a confirmation email shortly with the new date and time.' }
];

export const staffMembers = [
  { id: 1, name: 'Dr. Smith', role: 'Dentist' },
  { id: 2, name: 'Dr. Williams', role: 'Orthodontist' },
  { id: 3, name: 'Dr. Brown', role: 'Cosmetic Dentist' },
  { id: 4, name: 'Dr. Johnson', role: 'Oral Surgeon' },
  { id: 5, name: 'Maria Lopez', role: 'Receptionist' },
  { id: 6, name: 'Anna White', role: 'Dental Hygienist' }
];
