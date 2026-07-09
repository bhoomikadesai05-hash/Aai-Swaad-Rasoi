import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import MealMenu from './components/MealMenu';
import OrderForm from './components/OrderForm';
import ContactUs from './components/ContactUs';
import AdminPanel from './components/AdminPanel';
import Footer from './components/Footer';

import { MealItem, CartItem, Order, ContactSubmission } from './types';
import { MEAL_ITEMS } from './data/meals';
import { Sparkles, Calendar, Clock, MapPin, CheckCircle2, ShoppingBag, X, Building2, ChevronRight, HelpCircle } from 'lucide-react';

const SEED_ORDERS: Order[] = [
  {
    id: 'ord-k73b18',
    customerName: 'Ananth Bhat',
    email: 'ananthb@infosys.com',
    phone: '9845012345',
    deliveryDate: new Date(Date.now() + 86450000).toISOString().split('T')[0], // Tomorrow
    deliveryTimeSlot: '12:15 PM - 01:00 PM',
    address: 'Block 3, 4th Floor, Infosys Hinjawadi Phase 2',
    area: 'Hinjawadi (Phase 1, 2, 3)',
    companyName: 'Infosys',
    isCorporate: true,
    items: [
      { mealId: 'jowar-roti-uta', mealName: 'Jowar Roti Uta (Jolada Rotti Meal) (Full)', quantity: 4, size: 'full', price: 140 },
      { mealId: 'puliyogare-chutney', mealName: 'Special Puliyogare & Chutney (Full)', quantity: 2, size: 'full', price: 80 }
    ],
    totalPrice: 720, // (140*4)+(80*2) = 560+160 = 720. No delivery charge
    status: 'Confirmed',
    paymentMethod: 'UPI on Delivery',
    notes: 'Please keep the food hot and send extra pickle.',
    createdAt: '2026-06-17T11:30:00.000Z'
  },
  {
    id: 'ord-m21d98',
    customerName: 'Smita Kulkarni',
    email: 'smita.k@gmail.com',
    phone: '9123456780',
    deliveryDate: new Date(Date.now() + 86450000).toISOString().split('T')[0], // Tomorrow
    deliveryTimeSlot: '01:00 PM - 01:45 PM',
    address: 'A5, Royal Palms Apartment, Thergaon Link Road',
    area: 'Wakad & Thergaon',
    isCorporate: false,
    items: [
      { mealId: 'chapati-meal', mealName: 'Chapati Meals (Full)', quantity: 2, size: 'full', price: 120 },
      { mealId: 'chapati-meal', mealName: 'Chapati Meals (Half)', quantity: 1, size: 'half', price: 90 }
    ],
    totalPrice: 330, // 240 + 90 = 330. Free delivery.
    status: 'Pending',
    paymentMethod: 'Cash on Delivery',
    notes: 'Soft chapatis are preferred for kids.',
    createdAt: '25-06-2024'
  },
  {
    id: 'ord-f90c41',
    customerName: 'Srinivas Joshi',
    email: 'srinivas.joshi@tata.com',
    phone: '9008811223',
    deliveryDate: new Date(Date.now() + 86450000 * 2).toISOString().split('T')[0], // Day after tomorrow
    deliveryTimeSlot: '08:15 PM - 09:00 PM',
    address: 'Tata Motors HR Block, Sector 4, Pimpri Chinchwad',
    area: 'Pimpri',
    companyName: 'Tata Motors',
    isCorporate: true,
    items: [
      { mealId: 'jowar-roti-uta', mealName: 'Jowar Roti Uta (Jolada Rotti Meal) (Full)', quantity: 10, size: 'full', price: 140 }
    ],
    totalPrice: 1400, // 140 * 10 = 1400.
    status: 'Confirmed',
    paymentMethod: 'UPI on Delivery',
    notes: 'This is a corporate team dinner order. Deliver at 8 PM sharp.',
    createdAt: '25-06-2024'
  }
];

const SEED_CONTACTS: ContactSubmission[] = [
  {
    id: 'con-1',
    name: 'Gururaj Patil',
    email: 'gpatil@wipro.com',
    phone: '9845209876',
    companyName: 'Wipro Technologies',
    subject: 'Daily Executive Lunch Tiffin Subscription',
    message: 'We are looking to set up a daily healthy lunch contract for 15 executives at our Hinjawadi office. We prefer traditional North Karnataka Sajje Roti and Chapati Palle meals. Please share your corporate monthly contract menu and quotation.',
    isCorporateInquiry: true,
    status: 'Unread',
    createdAt: '2026-06-17'
  },
  {
    id: 'con-2',
    name: 'Deepak Deshpande',
    email: 'deepak.d@gmail.com',
    phone: '9012349012',
    subject: 'Chinchwad Delivery Query',
    message: 'Do you deliver Chapati meals near Sambhaji Circle daily? We need single meals for aged parents daily for lunch. Let me know if we can coordinate a fixed monthly automatic delivery.',
    isCorporateInquiry: false,
    status: 'Replied',
    createdAt: '2026-06-16'
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'menu' | 'corporate' | 'contact' | 'admin'>('home');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [contactSubmissions, setContactSubmissions] = useState<ContactSubmission[]>([]);
  const [showOrderPlacedModal, setShowOrderPlacedModal] = useState(false);
  const [lastPlacedOrder, setLastPlacedOrder] = useState<Order | null>(null);

  // Corporate calculator stats
  const [corporatePax, setCorporatePax] = useState<number>(20);
  const [corporatePlanType, setCorporatePlanType] = useState<'roti-meal' | 'chapati-meal' | 'mix'>('mix');

  // Load from local storage on bootstrap
  useEffect(() => {
    const savedOrders = localStorage.getItem('aaiswaad_orders');
    const savedContacts = localStorage.getItem('aaiswaad_contacts');
    
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    } else {
      // Seed default orders first time so database is beautiful
      setOrders(SEED_ORDERS);
      localStorage.setItem('aaiswaad_orders', JSON.stringify(SEED_ORDERS));
    }

    if (savedContacts) {
      setContactSubmissions(JSON.parse(savedContacts));
    } else {
      setContactSubmissions(SEED_CONTACTS);
      localStorage.setItem('aaiswaad_contacts', JSON.stringify(SEED_CONTACTS));
    }
  }, []);

  // Save updates helper
  const saveOrders = (updatedOrders: Order[]) => {
    setOrders(updatedOrders);
    localStorage.setItem('aaiswaad_orders', JSON.stringify(updatedOrders));
  };

  const saveContacts = (updatedContacts: ContactSubmission[]) => {
    setContactSubmissions(updatedContacts);
    localStorage.setItem('aaiswaad_contacts', JSON.stringify(updatedContacts));
  };

  // Cart operations
  const handleAddToBasket = (meal: MealItem, size: 'full' | 'half', quantity: number) => {
    setCart(prev => {
      const existingIdx = prev.findIndex(item => item.meal.id === meal.id && item.size === size);
      const price = size === 'full' ? meal.priceFull : (meal.priceHalf || meal.priceFull);

      if (existingIdx !== -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += quantity;
        return updated;
      } else {
        return [...prev, { meal, size, quantity, price }];
      }
    });
  };

  const handleUpdateCartQuantity = (mealId: string, size: 'full' | 'half', delta: number) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.meal.id === mealId && item.size === size) {
          const newQty = item.quantity + delta;
          return { ...item, quantity: newQty >= 1 ? newQty : 1 };
        }
        return item;
      });
    });
  };

  const handleRemoveCartItem = (mealId: string, size: 'full' | 'half') => {
    setCart(prev => prev.filter(item => !(item.meal.id === mealId && item.size === size)));
  };

  const cartTotalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Order workflow
  const handlePlaceOrder = (newOrderData: Omit<Order, 'id' | 'createdAt' | 'status'>) => {
    const freshOrder: Order = {
      ...newOrderData,
      id: 'ord-' + Math.random().toString(36).substring(2, 8),
      createdAt: new Date().toISOString(),
      status: 'Pending'
    };

    const newOrders = [freshOrder, ...orders];
    saveOrders(newOrders);
    setLastPlacedOrder(freshOrder);
    setCart([]); // Clear cart
    setShowOrderPlacedModal(true);

    // Auto-open WhatsApp message directly to kitchen desk
    const itemsText = freshOrder.items.map(it => `• ${it.quantity}x ${it.mealName}`).join('\n');
    const messageText = `*Aaiswaad Rasoi - New Scheduled Order!* 🍽️\n-----------------------------------\n*Order ID*: #${freshOrder.id.toUpperCase()}\n*Customer Name*: ${freshOrder.customerName}\n*Phone*: ${freshOrder.phone}\n*Date & Time*: ${freshOrder.deliveryDate} @ ${freshOrder.deliveryTimeSlot}\n*Area*: ${freshOrder.area}\n*Address*: ${freshOrder.address}\n${freshOrder.companyName ? `*Company*: ${freshOrder.companyName}\n` : ''}*Items Ordered*:\n${itemsText}\n\n*Payment*: ${freshOrder.paymentMethod}\n*Total Price*: ₹${freshOrder.totalPrice}\n\nPlease prepare my fresh meal box! Thank you! 🙏`;
    
    try {
      window.open(`https://wa.me/919606225897?text=${encodeURIComponent(messageText)}`, '_blank');
    } catch (e) {
      console.log("Auto-open blocked by browser, user can use the modal button instead:", e);
    }
  };

  // Contact messaging
  const handleSendMessage = (newMsgData: Omit<ContactSubmission, 'id' | 'createdAt' | 'status'>) => {
    const brandMsg: ContactSubmission = {
      ...newMsgData,
      id: 'con-' + Math.random().toString(36).substring(2, 8),
      createdAt: new Date().toISOString().substring(0, 10),
      status: 'Unread'
    };

    const newMsgs = [brandMsg, ...contactSubmissions];
    saveContacts(newMsgs);
  };

  // Admin adjustments
  const handleUpdateOrderStatus = (orderId: string, status: Order['status']) => {
    const updated = orders.map(o => o.id === orderId ? { ...o, status } : o);
    saveOrders(updated);
  };

  const handleUpdateContactStatus = (subId: string, status: ContactSubmission['status']) => {
    const updated = contactSubmissions.map(c => c.id === subId ? { ...c, status } : c);
    saveContacts(updated);
  };

  const handleClearDatabase = () => {
    if (window.confirm("Are you sure you want to clear all order and message logs? This will reset local storage.")) {
      setOrders([]);
      setContactSubmissions([]);
      localStorage.removeItem('aaiswaad_orders');
      localStorage.removeItem('aaiswaad_contacts');
    }
  };

  const handleSeedMockLogs = () => {
    saveOrders([...SEED_ORDERS, ...orders]);
    saveContacts([...SEED_CONTACTS, ...contactSubmissions]);
    alert("5 realistic pre-filled entries successfully added to your Manage Orders Staff Portal!");
  };

  // Corporate calculator rate chart
  const getCorporatePricePerPlate = () => {
    let base = 120;
    if (corporatePlanType === 'roti-meal') base = 135;
    if (corporatePlanType === 'chapati-meal') base = 115;
    
    // Volume discount
    if (corporatePax >= 50) return base - 15;
    if (corporatePax >= 30) return base - 10;
    return base;
  };

  const platesPerMonth = corporatePax * 22; // 22 working days
  const estMonthlyPrice = platesPerMonth * getCorporatePricePerPlate();

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#fdfbfc] antialiased">
      
      {/* Primary Navigation Header */}
      <Header 
        cartCount={cartItemsCount}
        cartTotal={cartTotalAmount}
        onCartClick={() => {
          if (cart.length > 0) {
            setActiveTab('menu');
            // Timeout to allow DOM transitions to layout the schedule form at bottom
            setTimeout(() => {
              const el = document.getElementById('order-form-container');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }, 100);
          } else {
            alert("Your plate basket is empty. Please select and add traditional meals to your basket first!");
            setActiveTab('menu');
          }
        }}
        onTabChange={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        activeTab={activeTab}
      />

      {/* Main Container routes view switching */}
      <main className="flex-1">
        
        {/* VIEW: HOME VIEW */}
        {activeTab === 'home' && (
          <div className="space-y-0">
            {/* Elegant Hero Slider */}
            <Hero 
              onOrderNowClick={() => {
                setActiveTab('menu');
                setTimeout(() => {
                  const el = document.getElementById('menu-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              onExploreCorporateClick={() => {
                setActiveTab('corporate');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* Specialties & Why Us Showcase */}
            <section className="py-16 bg-white border-y border-amber-100/40">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
                  <span className="text-xs font-black font-mono text-amber-600 block uppercase tracking-widest">Aaiswaad Rasoi Kitchen Guidelines</span>
                  <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight font-display">
                    Handmade Pure Karnataka Flavor
                  </h2>
                  <p className="text-gray-500 font-medium text-xs md:text-sm">
                    In North & South Karnataka, meals are wholesome, comforting, and designed to support hard-working lifestyles. We reproduce that same care model.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  
                  {/* Item 1 */}
                  <div className="p-6 md:p-8 rounded-3xl bg-amber-50/50 border border-amber-100/50 hover:bg-amber-50/80 transition-all text-center space-y-3">
                    <span className="text-3xl">🌾</span>
                    <h3 className="text-lg font-bold text-gray-900 font-display">Native Flour & Grain Sourcing</h3>
                    <p className="text-xs text-slate-500 leading-normal font-semibold">
                      We secure traditional Bajra, Jowar, and Sona Masuri grains to guarantee authentic textures. Our rotis are soft and our hand-made Chapatis remain flexible.
                    </p>
                  </div>

                  {/* Item 2 */}
                  <div className="p-6 md:p-8 rounded-3xl bg-amber-50/50 border border-amber-100/50 hover:bg-amber-50/80 transition-all text-center space-y-3">
                    <span className="text-3xl">🏺</span>
                    <h3 className="text-lg font-bold text-gray-900 font-display">Specialty Curries & Dry Chutney</h3>
                    <p className="text-xs text-slate-500 leading-normal font-semibold">
                      Famous stuffed Yennegayi (Peanut Brinjal Bhaji), native vegetable palyas, spicy garlic powders, and authentic Karnataka sambar simmered with native tamarind paste.
                    </p>
                  </div>

                  {/* Item 3 */}
                  <div className="p-6 md:p-8 rounded-3xl bg-amber-50/50 border border-amber-100/50 hover:bg-amber-50/80 transition-all text-center space-y-3">
                    <span className="text-3xl">🍱</span>
                    <h3 className="text-lg font-bold text-gray-900 font-display">Spill-Proof Warm Containers</h3>
                    <p className="text-xs text-slate-500 leading-normal font-semibold">
                      Carefully delivered in insulated packages with multiple compartments directly across Pune, keeping the food aromatic, safe, and steaming hot.
                    </p>
                  </div>

                </div>

                {/* Local Area callout card */}
                <div className="mt-12 p-6 rounded-3xl border border-dashed border-amber-300 bg-white shadow-3xs flex flex-col md:flex-row items-center gap-6 justify-between">
                  <div className="space-y-1.5 font-medium">
                    <span className="text-[10px] font-bold text-amber-600 uppercase tracking-widest block font-mono">Pimpri Chinchwad • Wakad • Hinjawadi • Bhosari</span>
                    <h4 className="text-lg font-black text-slate-900">Are you an HR Admin or Company Team Lead?</h4>
                    <p className="text-xs text-slate-550 max-w-2xl leading-relaxed">
                      Improve team satisfaction with daily office lunches! We serve hot Karnataka thali boxes starting at just <b>₹115 per head</b> in local Pune offices with premium custom timing.
                    </p>
                  </div>
                  <button
                    onClick={() => { setActiveTab('corporate'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className="px-5 py-3 bg-amber-900 text-white rounded-xl text-xs font-black shrink-0 hover:bg-amber-950 shadow-xs transition-colors cursor-pointer"
                  >
                    View Corporate Deals
                  </button>
                </div>

              </div>
            </section>

            {/* Interactive Menu in Home tabs (Inline menu to shopping flow!) */}
            <MealMenu 
              onAddToBasket={handleAddToBasket}
              basket={cart.map(item => ({ mealId: item.meal.id, size: item.size, quantity: item.quantity }))}
            />

            {/* Scheduled Form container in Home if elements are active */}
            {cart.length > 0 && (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
                <OrderForm 
                  cart={cart}
                  onUpdateQuantity={handleUpdateCartQuantity}
                  onRemoveItem={handleRemoveCartItem}
                  onPlaceOrder={handlePlaceOrder}
                  onClose={() => setCart([])}
                />
              </div>
            )}

            {/* Secure messages inline at bottom */}
            <ContactUs onSendMessage={handleSendMessage} />
          </div>
        )}

        {/* VIEW: FULL MEAL MENU VIEW */}
        {activeTab === 'menu' && (
          <div className="space-y-8 py-4">
            <MealMenu 
              onAddToBasket={handleAddToBasket}
              basket={cart.map(item => ({ mealId: item.meal.id, size: item.size, quantity: item.quantity }))}
            />

            {cart.length > 0 ? (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
                <OrderForm 
                  cart={cart}
                  onUpdateQuantity={handleUpdateCartQuantity}
                  onRemoveItem={handleRemoveCartItem}
                  onPlaceOrder={handlePlaceOrder}
                  onClose={() => setCart([])}
                />
              </div>
            ) : (
              <div className="max-w-md mx-auto text-center py-12 p-6 bg-amber-50/30 rounded-3xl border border-amber-100 flex flex-col items-center space-y-3 mb-12">
                <ShoppingBag className="w-10 h-10 text-amber-600 animate-pulse" />
                <h3 className="text-lg font-black text-gray-900 font-display">Ready to Order?</h3>
                <p className="text-xs text-gray-500 font-medium leading-relaxed">
                  Add some Jowar Roti Uta, Chapati Meals, or Puliyogare from the menu list above. Your scheduling calendar will trigger automatically here!
                </p>
                <button
                  type="button"
                  onClick={() => {
                    // Seed some initial item in cart to demonstrate
                    const firstMeal = MEAL_ITEMS[0];
                    handleAddToBasket(firstMeal, 'full', 1);
                  }}
                  className="px-4 py-2 bg-amber-700 text-white rounded-xl text-xs font-bold shadow-xs hover:bg-amber-800"
                >
                  🌱 Quick-add Jowar Roti Uta to explore scheduler
                </button>
              </div>
            )}
          </div>
        )}

        {/* VIEW: SPECIALIZED CORPORATE TAB */}
        {activeTab === 'corporate' && (
          <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
            
            {/* Header section */}
            <div className="flex flex-col lg:flex-row gap-8 items-center bg-gradient-to-r from-amber-600 to-amber-800 text-white rounded-3xl p-8 md:p-12 shadow-lg">
              <div className="space-y-4 lg:flex-1 text-center lg:text-left">
                <span className="px-3 py-1 bg-amber-500 rounded-full text-[10px] uppercase font-black font-mono">Specialized Office Catering</span>
                <h2 className="text-3xl md:text-5xl font-black font-display tracking-tight leading-tight">
                  Tiffin & Buffet Lunch for Pune Corporates
                </h2>
                <p className="text-sm md:text-base text-amber-100/90 leading-relaxed font-medium">
                  Say goodbye to greasy, heavy restaurant food that causes afternoon fatigue. Aaiswaad Rasoi serves light, homestyle Karnataka food with <b>zero soda and pristine native oils</b>. Neatly packed spill-proof individual thalis or buffet boxes delivered on time!
                </p>
                <div className="flex flex-wrap gap-4 pt-2 items-center justify-center lg:justify-start">
                  <div className="bg-white/10 px-3 py-2 rounded-xl text-center">
                    <span className="block font-black text-lg">100+</span>
                    <span className="block text-[9px] uppercase font-bold text-amber-200">Daily Deliveries</span>
                  </div>
                  <div className="bg-white/10 px-3 py-2 rounded-xl text-center">
                    <span className="block font-black text-lg">Ph-2</span>
                    <span className="block text-[9px] uppercase font-bold text-amber-200">Hinjawadi Zone Active</span>
                  </div>
                  <div className="bg-white/10 px-3 py-2 rounded-xl text-center">
                    <span className="block font-black text-lg">5 Stars</span>
                    <span className="block text-[9px] uppercase font-bold text-amber-200">Quality Verified</span>
                  </div>
                </div>
              </div>

              <div className="bg-white text-gray-800 rounded-2xl p-6 shadow-xl w-full max-w-sm shrink-0 flex flex-col justify-between border border-amber-50">
                <div className="space-y-4">
                  <div className="border-b border-amber-50 pb-2 flex justify-between items-center bg-amber-500/10 -mx-6 -mt-6 p-4 rounded-t-2xl">
                    <span className="font-extrabold text-sm text-amber-905 uppercase tracking-wider block">Interactive Rate Calculator</span>
                    <Building2 className="w-4 h-4 text-amber-700" />
                  </div>

                  {/* Range Slider for pax count */}
                  <div className="space-y-1.5 pt-2">
                    <div className="flex justify-between text-xs font-bold text-gray-600">
                      <span>Daily Employee Plates:</span>
                      <span className="text-amber-700 font-black font-mono text-sm">{corporatePax} Employees</span>
                    </div>
                    <input 
                      type="range"
                      min="10" 
                      max="100" 
                      step="5"
                      value={corporatePax}
                      onChange={(e) => setCorporatePax(parseInt(e.target.value))}
                      className="w-full h-2 bg-amber-100 rounded-lg appearance-none cursor-pointer accent-amber-600"
                    />
                    <span className="text-[10px] text-gray-400 block font-semibold">Slide to estimate pricing (Min. 10 - Max. 100)</span>
                  </div>

                  {/* Meal radio group */}
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-gray-600 block">Preferred Meal Plan:</span>
                    <div className="grid grid-cols-3 gap-1.5">
                      {[
                        { id: 'chapati-meal', label: 'Chapati Flat' },
                        { id: 'roti-meal', label: 'Roti Flat' },
                        { id: 'mix', label: 'Alternate Mix' }
                      ].map(plan => (
                        <button
                          key={plan.id}
                          onClick={() => setCorporatePlanType(plan.id as any)}
                          className={`p-1.5 rounded-lg text-[10px] font-black tracking-tight border text-center transition-colors ${
                            corporatePlanType === plan.id
                              ? 'bg-amber-600 text-white border-transparent'
                              : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
                          }`}
                        >
                          {plan.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Monthly totals estimate panel */}
                  <div className="p-3 bg-amber-50 rounded-xl space-y-1.5 text-xs border border-amber-150 font-medium">
                    <div className="flex justify-between">
                      <span>Net Cost per Plate:</span>
                      <span className="font-mono font-black text-amber-900">₹{getCorporatePricePerPlate()}</span>
                    </div>
                    <div className="flex justify-between text-gray-500 text-[11px]">
                      <span>Monthly Workdays:</span>
                      <span>22 Days (Mon-Fri)</span>
                    </div>
                    {corporatePax >= 30 && (
                      <span className="block text-[10px] text-emerald-700 font-bold bg-emerald-50 p-1 rounded-xs border border-emerald-100 text-center uppercase tracking-wide">
                        🎉 Volume Discount Applied!
                      </span>
                    )}
                    <div className="flex justify-between border-t border-amber-200 pt-1.5 font-bold text-gray-800">
                      <span>Estimated Monthly Cost:</span>
                      <span className="font-mono font-black text-base text-amber-950">₹{estMonthlyPrice.toLocaleString()}</span>
                    </div>
                  </div>

                  <p className="text-[10px] text-gray-400 leading-normal text-center font-semibold">
                    *Taxes extra. Deliveries handled via thermo-insulated corporate trucks. Includes complimentary sweet payasa every Wednesday!
                  </p>
                </div>

                <button
                  onClick={() => {
                    const contactsEl = document.getElementById('contact-form-section');
                    if (contactsEl) contactsEl.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full mt-4 py-2.5 bg-amber-900 hover:bg-amber-950 text-white font-black text-xs rounded-xl transition-all shadow-sm active:scale-95 cursor-pointer text-center"
                >
                  Request Bulk Quotation
                </button>
              </div>
            </div>

            {/* Corporate guidelines list */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
              <div className="space-y-4">
                <h3 className="text-xl font-bold font-display text-gray-900">Why choose us over standard canteens?</h3>
                <ul className="space-y-3">
                  {[
                    "Wholesome North Karnataka Roti experience with Yennegayi and dry Sheng Chutney which is absent in standard canteens.",
                    "Nutritional balance verified: Zero white sugar, only premium jaggery for sweets, minimal seed oils.",
                    "No Minimum contract locks: You can pause or play your deliveries with a 12-hour advanced notice.",
                    "Dedicated Account manager so your monthly bills, custom requests, and invoices are handled professionally."
                  ].map((tip, i) => (
                    <li key={i} className="text-xs text-slate-650 flex items-start gap-2.5 font-medium leading-relaxed">
                      <span className="bg-amber-100 text-amber-800 p-1 rounded-full font-black text-[10px] w-5 h-5 flex items-center justify-center shrink-0">
                        {i + 1}
                      </span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-amber-50/40 p-6 rounded-3xl border border-amber-100/50 space-y-4">
                <h3 className="text-lg font-bold font-display text-amber-900 flex items-center gap-1.5">
                  <Sparkles className="w-5 h-5 text-amber-700" />
                  <span>Catering Plans Summary</span>
                </h3>
                <div className="space-y-3.5 text-xs font-semibold">
                  <div className="bg-white p-3 rounded-xl border border-amber-50">
                    <span className="block text-gray-900 font-extrabold pb-0.5">Plan A: Chapati Thali Box (₹115 per head)</span>
                    <span className="block font-medium text-slate-500">3 Whole-wheat soft chapatis, Veg Palya (Bhaji), white Sona Masuri rice, and traditional Karnataka Sambar.</span>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-amber-50">
                    <span className="block text-gray-900 font-extrabold pb-0.5">Plan B: Jowar Roti Thali Box (₹135 per head)</span>
                    <span className="block font-medium text-slate-500">3 Soft, handmade Jowar Rotis, Veg Palya (Bhaji), white Sona Masuri rice, and traditional Karnataka Sambar.</span>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-amber-50">
                    <span className="block text-gray-900 font-extrabold pb-0.5">Plan C: Custom Alternate Buffet (Custom Quote)</span>
                    <span className="block font-medium text-slate-500">Perfect for internal celebrate events. Custom menu layout containing Payasa, Obbattu / Holige, Kosambari, Bajji, Obbattu sweets etc.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Corporate form */}
            <ContactUs onSendMessage={handleSendMessage} />

          </div>
        )}

        {/* VIEW: CONTACT US TAB */}
        {activeTab === 'contact' && (
          <ContactUs onSendMessage={handleSendMessage} />
        )}

        {/* VIEW: MANAGEMENT STAFF CONSOLE TAB */}
        {activeTab === 'admin' && (
          <AdminPanel 
            orders={orders}
            contactSubmissions={contactSubmissions}
            onUpdateOrderStatus={handleUpdateOrderStatus}
            onUpdateFeedbackStatus={handleUpdateContactStatus}
            onClearData={handleClearDatabase}
            onSeedData={handleSeedMockLogs}
          />
        )}

      </main>

      {/* Persistent global footer */}
      <Footer onTabChange={(tab) => {
        setActiveTab(tab);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }} />

      {/* SUCCESS MODAL ON ORDER COMPLETED */}
      {showOrderPlacedModal && lastPlacedOrder && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-md w-full border border-amber-100 p-6 md:p-8 space-y-5 shadow-2xl relative text-center animate-scale-up antialiased my-8">
            
            {/* Success checkmark */}
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-3xl font-bold">
              ✓
            </div>

            <div className="space-y-1.5">
              <h3 className="text-xl font-black font-display tracking-tight text-gray-900">
                Order Received successfully!
              </h3>
              <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">
                Order ID: <span className="font-mono text-amber-900 font-bold">#{lastPlacedOrder.id.toUpperCase()}</span>
              </p>
              
              <div className="p-3 bg-amber-50 rounded-2xl text-[11px] font-semibold text-gray-600 max-w-sm mx-auto space-y-1 border border-amber-100 leading-normal text-left">
                <p>🙋‍♂️ <b>Customer:</b> {lastPlacedOrder.customerName}</p>
                <p>📞 <b>Phone Number:</b> {lastPlacedOrder.phone}</p>
                <p>📅 <b>Delivery Date:</b> {lastPlacedOrder.deliveryDate}</p>
                <p>⏰ <b>Time Slot:</b> {lastPlacedOrder.deliveryTimeSlot}</p>
                <p>📍 <b>Address:</b> {lastPlacedOrder.address}, {lastPlacedOrder.area}</p>
                <p>💵 <b>Total Amount:</b> ₹{lastPlacedOrder.totalPrice} ({lastPlacedOrder.paymentMethod})</p>
              </div>
            </div>

            {/* UPI PhonePe payment options if chosen */}
            {lastPlacedOrder.paymentMethod === 'UPI on Delivery' && (
              <div className="bg-purple-50/70 p-4 rounded-2xl border border-purple-100 text-center space-y-2.5">
                <p className="text-[11px] font-extrabold text-purple-900 uppercase tracking-wider flex items-center justify-center gap-1">
                  <span>⚡ Pay directly with PhonePe</span>
                </p>
                
                {/* Mobile direct deep link button */}
                <a
                  href={`upi://pay?pa=9606225897@ybl&pn=Aaiswaad%20Rasoi&am=${lastPlacedOrder.totalPrice}&cu=INR`}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 bg-[#5f259f] hover:bg-[#4d1d82] text-white rounded-xl text-xs font-black shadow-xs transition-colors"
                >
                  <span>Pay ₹{lastPlacedOrder.totalPrice} via PhonePe</span>
                </a>

                {/* QR Code for scanning */}
                <div className="flex flex-col items-center justify-center pt-1">
                  <div className="bg-white p-1.5 rounded-lg shadow-3xs border border-purple-100">
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=110x110&data=${encodeURIComponent(`upi://pay?pa=9606225897@ybl&pn=Aaiswaad%20Rasoi&am=${lastPlacedOrder.totalPrice}&cu=INR`)}`}
                      alt="PhonePe QR Code"
                      className="w-24 h-24"
                    />
                  </div>
                  <span className="text-[9px] text-gray-500 font-bold mt-1">Or scan this QR with PhonePe/GPay to pay</span>
                </div>
              </div>
            )}

            {/* Direct WhatsApp manual button */}
            <div className="space-y-2">
              <p className="text-[11px] font-bold text-gray-700">👇 Click below if WhatsApp did not open automatically:</p>
              <button
                onClick={() => {
                  const itemsText = lastPlacedOrder.items.map(it => `• ${it.quantity}x ${it.mealName}`).join('\n');
                  const messageText = `*Aaiswaad Rasoi - New Scheduled Order!* 🍽️\n-----------------------------------\n*Order ID*: #${lastPlacedOrder.id.toUpperCase()}\n*Customer Name*: ${lastPlacedOrder.customerName}\n*Phone*: ${lastPlacedOrder.phone}\n*Date & Time*: ${lastPlacedOrder.deliveryDate} @ ${lastPlacedOrder.deliveryTimeSlot}\n*Area*: ${lastPlacedOrder.area}\n*Address*: ${lastPlacedOrder.address}\n${lastPlacedOrder.companyName ? `*Company*: ${lastPlacedOrder.companyName}\n` : ''}*Items Ordered*:\n${itemsText}\n\n*Payment*: ${lastPlacedOrder.paymentMethod}\n*Total Price*: ₹${lastPlacedOrder.totalPrice}\n\nPlease prepare my fresh meal box! Thank you! 🙏`;
                  
                  window.open(`https://wa.me/919606225897?text=${encodeURIComponent(messageText)}`, '_blank');
                }}
                className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black flex items-center justify-center gap-2 shadow-md transition-colors"
              >
                <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm5.835-4.117c1.661.986 3.291 1.503 5.108 1.504 5.56 0 10.081-4.522 10.085-10.086.002-2.695-1.043-5.228-2.951-7.136C16.22 2.259 13.693 1.21 11.002 1.21 5.443 1.21 1.21 5.432 1.206 10.993c-.001 1.902.51 3.511 1.527 5.106L1.75 21.825l5.961-1.564z" /></svg>
                <span>Send Order via WhatsApp</span>
              </button>
            </div>

            <div className="flex gap-2 pt-1">
              <button
                onClick={() => {
                  setShowOrderPlacedModal(false);
                  setActiveTab('admin');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="flex-1 py-2 px-3 border border-amber-300 rounded-xl text-[10px] font-bold text-amber-900 hover:bg-amber-50 cursor-pointer select-none"
              >
                Track Status
              </button>
              
              <button
                onClick={() => setShowOrderPlacedModal(false)}
                className="flex-[2] py-2 px-3 bg-amber-600 hover:bg-amber-700 rounded-xl text-[10px] font-black text-white cursor-pointer select-none"
              >
                Continue to Menu
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
