
export const appointmentsPerDay = [
  { day: 'Mon', count: 18 },
  { day: 'Tue', count: 24 },
  { day: 'Wed', count: 22 },
  { day: 'Thu', count: 20 },
  { day: 'Fri', count: 16 },
  { day: 'Sat', count: 8 },
  { day: 'Sun', count: 0 }
];

export const revenuePerMonth = [
  { month: 'Jul', revenue: 42000 },
  { month: 'Aug', revenue: 38500 },
  { month: 'Sep', revenue: 45200 },
  { month: 'Oct', revenue: 41800 },
  { month: 'Nov', revenue: 48600 },
  { month: 'Dec', revenue: 52100 },
  { month: 'Jan', revenue: 47300 }
];

export const topServices = [
  { name: 'Teeth Cleaning', bookings: 245, revenue: 29400 },
  { name: 'Teeth Whitening', bookings: 180, revenue: 63000 },
  { name: 'Dental Checkup', bookings: 165, revenue: 13200 },
  { name: 'Cavity Filling', bookings: 120, revenue: 24000 },
  { name: 'Braces Adjustment', bookings: 95, revenue: 14250 },
  { name: 'Root Canal', bookings: 60, revenue: 48000 }
];

export const cancellationRate = [
  { month: 'Jul', rate: 8.2 },
  { month: 'Aug', rate: 6.5 },
  { month: 'Sep', rate: 7.1 },
  { month: 'Oct', rate: 5.8 },
  { month: 'Nov', rate: 4.9 },
  { month: 'Dec', rate: 6.3 },
  { month: 'Jan', rate: 5.2 }
];

export const doctorUtilization = [
  { name: 'Dr. Smith', utilization: 92, appointments: 48 },
  { name: 'Dr. Williams', utilization: 85, appointments: 42 },
  { name: 'Dr. Brown', utilization: 88, appointments: 45 },
  { name: 'Dr. Johnson', utilization: 78, appointments: 38 },
  { name: 'Dr. Martinez', utilization: 90, appointments: 46 }
];

export const peakHours = [
  { hour: '8 AM', patients: 5 },
  { hour: '9 AM', patients: 12 },
  { hour: '10 AM', patients: 18 },
  { hour: '11 AM', patients: 15 },
  { hour: '12 PM', patients: 8 },
  { hour: '1 PM', patients: 6 },
  { hour: '2 PM', patients: 14 },
  { hour: '3 PM', patients: 16 },
  { hour: '4 PM', patients: 11 },
  { hour: '5 PM', patients: 7 }
];

export const patientDemographics = [
  { ageGroup: '0-17', count: 85 },
  { ageGroup: '18-34', count: 210 },
  { ageGroup: '35-54', count: 180 },
  { ageGroup: '55+', count: 125 }
];

export const insights = [
  { icon: 'ri-time-line', title: 'Peak Hours', value: '10 AM - 1 PM', description: 'Busiest time of the day', color: '#0F766E' },
  { icon: 'ri-calendar-check-line', title: 'Best Day', value: 'Tuesday', description: 'Highest appointment volume', color: '#0B1F3B' },
  { icon: 'ri-money-dollar-circle-line', title: 'Avg Revenue/Day', value: '$2,180', description: 'Based on last 30 days', color: '#0F766E' },
  { icon: 'ri-user-star-line', title: 'Top Doctor', value: 'Dr. Smith', description: '92% utilization rate', color: '#0B1F3B' }
];
