import { MealItem, ServiceArea } from '../types';
import chapatiImg from '../assets/images/chapati.jpeg';
import puliImg from '../assets/images/puli.jpeg';
import rootiImg from '../assets/images/rooti.jpeg';

export const MEAL_ITEMS: MealItem[] = [
  {
    id: 'jowar-roti-uta',
    name: 'Jowar Roti Uta (Jolada Rotti Meal)',
    description: 'Authentic North Karnataka Jowar Roti meal. Healthy, fresh, handmade, and completely gluten-free.',
    priceFull: 140,
    priceHalf: 100,
    category: 'roti-meals',
    image: rootiImg,
    tags: ['Authentic', 'Jowar Roti', 'Best Seller'],
    features: [
      '3 Soft, handmade Jowar Rotis',
      'Daily Special Veg Palya (Bhaji)',
      'Steaming Rice & Traditional Karnataka Sambar (Included in Full Meal)',
      'Traditional Pickle'
    ],
    featuresFull: [
      '3 Soft, handmade Jowar Rotis',
      'Daily Special Veg Palya (Bhaji)',
      'Perfectly cooked Steaming Rice',
      'Traditional aromatic Karnataka Sambar',
      'Traditional Pickle'
    ],
    featuresHalf: [
      '3 Soft, handmade Jowar Rotis',
      'Daily Special Veg Palya (Bhaji)',
      'Traditional Pickle',
      'Note: Served as Jowar Roti & Bhaji only (No Rice & Sambar)'
    ],
    isVeg: true
  },
  {
    id: 'chapati-meal',
    name: 'Chapati Meals',
    description: 'Home-style soft chapati meal prepared fresh with 100% whole wheat.',
    priceFull: 120,
    priceHalf: 90,
    category: 'chapati-meals',
    image: chapatiImg,
    tags: ['Daily Choice', 'Soft Chapati'],
    features: [
      '3 Whole wheat home-style soft Chapatis',
      'Daily Special Veg Palya (Bhaji)',
      'Steaming Rice & Traditional Karnataka Sambar (Included in Full Meal)',
      'Traditional Pickle'
    ],
    featuresFull: [
      '3 Whole wheat home-style soft Chapatis',
      'Daily Special Veg Palya (Bhaji)',
      'Perfectly cooked Steaming Rice',
      'Traditional aromatic Karnataka Sambar',
      'Traditional Pickle'
    ],
    featuresHalf: [
      '3 Whole wheat home-style soft Chapatis',
      'Daily Special Veg Palya (Bhaji)',
      'Traditional Pickle',
      'Note: Served as Chapati & Bhaji only (No Rice & Sambar)'
    ],
    isVeg: true
  },
  {
    id: 'puliyogare-chutney',
    name: 'Special Puliyogare & Chutney',
    description: 'Traditional, tangy, and fragrant Tamarind Rice (Puliyogare) served with fresh, homemade coconut chutney.',
    priceFull: 80,
    category: 'rice-special',
    image: puliImg,
    tags: ['Traditional', 'Popular Rice'],
    features: [
      'Generous serving of aromatic Tamarind Rice (Puliyogare)',
      'Fresh homemade coconut chutney',
      'Crisp Papad / Sandige'
    ],
    isVeg: true
  }
];

export const SERVICE_AREAS: ServiceArea[] = [
  { name: 'Talawade (Local Kitchen)', deliveryCharge: 0, minOrder: 150, estimatedTime: '20-30 mins' },
  { name: 'Pimpri', deliveryCharge: 0, minOrder: 150, estimatedTime: '30-45 mins' },
  { name: 'Chinchwad', deliveryCharge: 0, minOrder: 150, estimatedTime: '30-45 mins' },
  { name: 'Akurdi & Nigdi', deliveryCharge: 20, minOrder: 180, estimatedTime: '40-50 mins' },
  { name: 'Ravet', deliveryCharge: 30, minOrder: 200, estimatedTime: '45-60 mins' },
  { name: 'Wakad & Thergaon', deliveryCharge: 30, minOrder: 200, estimatedTime: '45-60 mins' },
  { name: 'Hinjawadi (Phase 1, 2, 3)', deliveryCharge: 40, minOrder: 250, estimatedTime: '50-70 mins' },
  { name: 'Bhosari & Moshi', deliveryCharge: 30, minOrder: 200, estimatedTime: '45-60 mins' },
  { name: 'Corporate Deliveries (bulk)', deliveryCharge: 0, minOrder: 500, estimatedTime: 'Scheduled Time' }
];

export const TIME_SLOTS = {
  lunch: [
    '11:30 AM - 12:15 PM',
    '12:15 PM - 01:00 PM',
    '01:00 PM - 01:45 PM',
    '01:45 PM - 02:30 PM'
  ],
  dinner: [
    '07:30 PM - 08:15 PM',
    '08:15 PM - 09:00 PM',
    '09:00 PM - 09:45 PM',
    '09:45 PM - 10:30 PM'
  ]
};
export type TimeSlotType = typeof TIME_SLOTS;
