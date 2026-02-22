
export const inventoryItems = [
  {
    id: 1,
    name: 'Disposable Gloves (Box)',
    category: 'PPE',
    stockLevel: 45,
    minThreshold: 20,
    supplier: 'MedSupply Co.',
    lastRestock: '2025-01-10',
    unitPrice: 12.50
  },
  {
    id: 2,
    name: 'Face Masks (Box of 50)',
    category: 'PPE',
    stockLevel: 8,
    minThreshold: 15,
    supplier: 'MedSupply Co.',
    lastRestock: '2025-01-05',
    unitPrice: 18.00
  },
  {
    id: 3,
    name: 'Dental Composite Resin',
    category: 'Materials',
    stockLevel: 32,
    minThreshold: 10,
    supplier: 'DentaMaterials Inc.',
    lastRestock: '2025-01-08',
    unitPrice: 45.00
  },
  {
    id: 4,
    name: 'Anesthetic Cartridges',
    category: 'Medications',
    stockLevel: 5,
    minThreshold: 20,
    supplier: 'PharmaDent Ltd.',
    lastRestock: '2024-12-28',
    unitPrice: 8.50
  },
  {
    id: 5,
    name: 'Dental Mirrors',
    category: 'Instruments',
    stockLevel: 60,
    minThreshold: 15,
    supplier: 'DentalTools Pro',
    lastRestock: '2025-01-12',
    unitPrice: 5.00
  },
  {
    id: 6,
    name: 'Whitening Gel Syringes',
    category: 'Materials',
    stockLevel: 12,
    minThreshold: 10,
    supplier: 'BrightSmile Supply',
    lastRestock: '2025-01-03',
    unitPrice: 35.00
  },
  {
    id: 7,
    name: 'Sterilization Pouches',
    category: 'Sterilization',
    stockLevel: 3,
    minThreshold: 25,
    supplier: 'MedSupply Co.',
    lastRestock: '2024-12-20',
    unitPrice: 22.00
  },
  {
    id: 8,
    name: 'Dental Burs Set',
    category: 'Instruments',
    stockLevel: 28,
    minThreshold: 8,
    supplier: 'DentalTools Pro',
    lastRestock: '2025-01-11',
    unitPrice: 65.00
  },
  {
    id: 9,
    name: 'Impression Material',
    category: 'Materials',
    stockLevel: 18,
    minThreshold: 10,
    supplier: 'DentaMaterials Inc.',
    lastRestock: '2025-01-06',
    unitPrice: 55.00
  },
  {
    id: 10,
    name: 'Orthodontic Wires',
    category: 'Orthodontics',
    stockLevel: 40,
    minThreshold: 12,
    supplier: 'OrthoSupply Corp.',
    lastRestock: '2025-01-09',
    unitPrice: 15.00
  },
  {
    id: 11,
    name: 'Fluoride Varnish',
    category: 'Materials',
    stockLevel: 7,
    minThreshold: 15,
    supplier: 'BrightSmile Supply',
    lastRestock: '2024-12-30',
    unitPrice: 28.00
  },
  {
    id: 12,
    name: 'Suction Tips (Pack)',
    category: 'Disposables',
    stockLevel: 55,
    minThreshold: 20,
    supplier: 'MedSupply Co.',
    lastRestock: '2025-01-13',
    unitPrice: 9.00
  },
  {
    id: 13,
    name: 'Dental X-Ray Film',
    category: 'Imaging',
    stockLevel: 2,
    minThreshold: 10,
    supplier: 'ImagingDent Ltd.',
    lastRestock: '2024-12-15',
    unitPrice: 42.00
  },
  {
    id: 14,
    name: 'Bracket Kits',
    category: 'Orthodontics',
    stockLevel: 22,
    minThreshold: 8,
    supplier: 'OrthoSupply Corp.',
    lastRestock: '2025-01-07',
    unitPrice: 120.00
  },
  {
    id: 15,
    name: 'Cotton Rolls (Bag)',
    category: 'Disposables',
    stockLevel: 70,
    minThreshold: 30,
    supplier: 'MedSupply Co.',
    lastRestock: '2025-01-14',
    unitPrice: 6.00
  }
];

export const inventoryCategories = [
  'All',
  'PPE',
  'Materials',
  'Medications',
  'Instruments',
  'Sterilization',
  'Orthodontics',
  'Disposables',
  'Imaging'
];
