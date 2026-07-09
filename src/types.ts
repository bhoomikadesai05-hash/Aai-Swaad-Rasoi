export interface MealItem {
  id: string;
  name: string;
  description: string;
  priceFull: number;
  priceHalf?: number;
  category: 'roti-meals' | 'chapati-meals' | 'rice-special' | 'combos';
  image: string;
  tags: string[];
  features: string[]; // e.g. ["2 Soft Sajje Roti", "Brinjal Palle (Ennegayi)", "Sheng Chutney"]
  isVeg: boolean;
  featuresFull?: string[];
  featuresHalf?: string[];
}

export interface CartItem {
  meal: MealItem;
  quantity: number;
  size: 'full' | 'half';
  price: number;
}

export interface Order {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  deliveryDate: string;
  deliveryTimeSlot: string;
  address: string;
  area: string;
  landmark?: string;
  companyName?: string; // for corporate deliveries
  isCorporate: boolean;
  items: {
    mealId: string;
    mealName: string;
    quantity: number;
    size: 'full' | 'half';
    price: number;
  }[];
  totalPrice: number;
  status: 'Pending' | 'Confirmed' | 'Out for Delivery' | 'Delivered' | 'Cancelled';
  paymentMethod: 'Cash on Delivery' | 'UPI on Delivery';
  notes?: string;
  createdAt: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string;
  companyName?: string;
  subject: string;
  message: string;
  isCorporateInquiry: boolean;
  status: 'Unread' | 'Replied' | 'Archived';
  createdAt: string;
}

export interface ServiceArea {
  name: string;
  deliveryCharge: number;
  minOrder: number;
  estimatedTime: string;
}
