import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Building, Trash2, ArrowLeft, Send, CheckCircle2, ShieldCheck, HelpCircle, UtensilsCrossed } from 'lucide-react';
import { CartItem, Order, ServiceArea } from '../types';
import { SERVICE_AREAS, TIME_SLOTS } from '../data/meals';

interface OrderFormProps {
  cart: CartItem[];
  onUpdateQuantity: (mealId: string, size: 'full' | 'half', delta: number) => void;
  onRemoveItem: (mealId: string, size: 'full' | 'half') => void;
  onPlaceOrder: (order: Omit<Order, 'id' | 'createdAt' | 'status'>) => void;
  onClose: () => void;
}

export default function OrderForm({
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onPlaceOrder,
  onClose
}: OrderFormProps) {
  // Customer details
  const [customerName, setCustomerName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [mealTimeType, setMealTimeType] = useState<'lunch' | 'dinner'>('lunch');
  const [deliveryTimeSlot, setDeliveryTimeSlot] = useState('');
  const [address, setAddress] = useState('');
  const [area, setArea] = useState(SERVICE_AREAS[0].name);
  const [landmark, setLandmark] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [isCorporate, setIsCorporate] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'Cash on Delivery' | 'UPI on Delivery'>('Cash on Delivery');
  const [notes, setNotes] = useState('');
  
  // Validation / errors states
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Fetch current service area details
  const currentAreaDetails = SERVICE_AREAS.find(a => a.name === area) || SERVICE_AREAS[0];

  // Cart total calculations
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryCharge = subtotal >= 300 ? 0 : currentAreaDetails.deliveryCharge; // Free delivery for orders above ₹300!
  const finalTotal = subtotal + deliveryCharge;

  // Set default modern date to tomorrow (as default catering suggestion, but allow today/any future slot)
  useEffect(() => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    
    // Format to yyyy-mm-dd
    const yyyy = tomorrow.getFullYear();
    const mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
    const dd = String(tomorrow.getDate()).padStart(2, '0');
    setDeliveryDate(`${yyyy}-${mm}-${dd}`);

    // Set default slot
    setDeliveryTimeSlot(TIME_SLOTS.lunch[1]);
  }, []);

  // Set timeslots depending on Lunch vs Dinner
  useEffect(() => {
    if (mealTimeType === 'lunch') {
      setDeliveryTimeSlot(TIME_SLOTS.lunch[1]);
    } else {
      setDeliveryTimeSlot(TIME_SLOTS.dinner[1]);
    }
  }, [mealTimeType]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!customerName.trim()) newErrors.customerName = 'Name is required';
    if (!phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(phone.replace(/[\s-]/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit mobile number';
    }
    if (!email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!deliveryDate) newErrors.deliveryDate = 'Delivery date is required';
    if (!address.trim()) newErrors.address = 'Full delivery address is required';
    if (isCorporate && !companyName.trim()) newErrors.companyName = 'Company / Office name is required';

    // Min Order constraint validation
    if (subtotal < currentAreaDetails.minOrder) {
      newErrors.minOrder = `Minimum order amount for delivery in ${area} is ₹${currentAreaDetails.minOrder}. Please add more items.`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      // scroll to error
      const errEl = document.getElementById('order-form-container');
      if (errEl) errEl.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    onPlaceOrder({
      customerName,
      email,
      phone,
      deliveryDate,
      deliveryTimeSlot,
      address,
      area,
      landmark,
      companyName: isCorporate ? companyName : undefined,
      isCorporate,
      items: cart.map(item => ({
        mealId: item.meal.id,
        mealName: `${item.meal.name} (${item.size === 'full' ? 'Full' : 'Half'})`,
        quantity: item.quantity,
        size: item.size,
        price: item.price
      })),
      totalPrice: finalTotal,
      paymentMethod,
      notes
    });
  };

  return (
    <div id="order-form-container" className="bg-white rounded-3xl border border-amber-100/60 shadow-xl overflow-hidden max-w-5xl mx-auto my-6">
      {/* Title */}
      <div className="bg-amber-900 text-white p-6 md:p-8 relative">
        <button 
          onClick={onClose}
          className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full p-2 hover:bg-white/10 text-amber-200"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-black font-display tracking-tight text-white mb-1">
            Build Your Taste Basket
          </h2>
          <p className="text-xs md:text-sm font-medium text-amber-200">
            Customize parts, set times, and secure your authentic meal box delivery.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 divide-y lg:divide-y-0 lg:divide-x divide-gray-100">
        
        {/* Left Side: Basket Summary */}
        <div className="lg:col-span-5 p-6 md:p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-amber-50 pb-3">
            <h3 className="text-lg font-black text-gray-900 font-display flex items-center gap-1.5">
              <UtensilsCrossed className="w-5 h-5 text-amber-600" />
              <span>Basket Items</span>
            </h3>
            <span className="text-xs font-bold bg-amber-100 text-amber-900 px-2.5 py-1 rounded-full font-mono">
              {cart.reduce((sum, item) => sum + item.quantity, 0)} Items
            </span>
          </div>

          {cart.length === 0 ? (
            <div className="text-center py-10 space-y-4">
              <p className="text-sm text-gray-500 font-medium font-mono">Your basket is empty!</p>
              <button 
                onClick={onClose}
                className="text-xs font-bold text-amber-700 hover:text-white hover:bg-amber-600 bg-amber-50 px-4 py-2 rounded-xl transition-all border border-amber-200"
              >
                Go to Meal Menu
              </button>
            </div>
          ) : (
            <div className="space-y-4 divide-y divide-gray-50 max-h-[380px] overflow-y-auto pr-1">
              {cart.map((item, index) => (
                <div key={`${item.meal.id}-${item.size}`} className={`flex items-start gap-4 ${index > 0 ? 'pt-4' : ''}`}>
                  <img 
                    src={item.meal.image} 
                    alt={item.meal.name}
                    className="w-14 h-14 rounded-xl object-cover border border-gray-100 shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1 space-y-1">
                    <div className="flex justify-between items-start gap-2">
                      <h4 className="text-sm font-bold text-gray-800 line-clamp-2">
                        {item.meal.name}
                      </h4>
                      <button 
                        onClick={() => onRemoveItem(item.meal.id, item.size)}
                        className="text-gray-400 hover:text-red-500 p-1 rounded-sm cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold capitalize text-amber-700 bg-amber-50 border border-amber-100 px-2 py-0.5 rounded-sm">
                        {item.size} Portion
                      </span>
                      <span className="text-xs font-mono font-bold text-gray-900">
                        ₹{item.price} each
                      </span>
                    </div>

                    {/* Quantity Selector */}
                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-center bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                        <button 
                          type="button"
                          onClick={() => onUpdateQuantity(item.meal.id, item.size, -1)}
                          className="px-2 py-1 text-gray-500 hover:text-gray-950 font-bold text-xs"
                        >
                          -
                        </button>
                        <span className="px-3 py-1 font-mono text-xs font-black text-gray-800">
                          {item.quantity}
                        </span>
                        <button 
                          type="button"
                          onClick={() => onUpdateQuantity(item.meal.id, item.size, 1)}
                          className="px-2 py-1 text-gray-500 hover:text-gray-950 font-bold text-xs"
                        >
                          +
                        </button>
                      </div>
                      <span className="text-xs font-mono font-black text-gray-900">
                        Total: ₹{item.price * item.quantity}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Price Calculations */}
          <div className="space-y-2 pt-4 border-t border-gray-100 font-medium text-xs md:text-sm">
            <div className="flex justify-between text-gray-500">
              <span>Plate Subtotal</span>
              <span className="font-mono text-gray-800 font-bold">₹{subtotal}</span>
            </div>
            
            <div className="flex justify-between text-gray-500">
              <span className="flex items-center gap-1">
                <span>Delivery Charge ({area})</span>
              </span>
              <span className="font-mono text-gray-800 font-bold">
                {deliveryCharge === 0 ? (
                  <span className="text-emerald-600 font-extrabold font-sans">FREE</span>
                ) : (
                  `₹${deliveryCharge}`
                )}
              </span>
            </div>

            {subtotal > 0 && subtotal < 300 && (
              <p className="text-[10px] text-amber-700 bg-amber-50 p-2 rounded-lg border border-amber-100 font-medium">
                💡 Add items worth ₹{300 - subtotal} more to unlock <b>FREE DELIVERY</b>!
              </p>
            )}

            <div className="flex justify-between text-base font-black text-gray-900 pt-3 border-t border-gray-100 font-display">
              <span>Grand Total</span>
              <span className="font-mono text-amber-900 text-lg">₹{finalTotal}</span>
            </div>
          </div>

          {/* Area specific alert */}
          <div className="p-3 bg-gray-50 rounded-2xl border border-gray-200 shadow-3xs space-y-1 text-xs">
            <span className="font-extrabold text-gray-700 uppercase tracking-wider block text-[10px]">Area Rules for {area}:</span>
            <p className="text-gray-500 font-medium">
              • Minimum Order required: <span className="text-gray-800 font-bold">₹{currentAreaDetails.minOrder}</span>
            </p>
            <p className="text-gray-500 font-medium">
              • Estimated Delivery Speed: <span className="text-gray-800 font-bold">{currentAreaDetails.estimatedTime}</span>
            </p>
          </div>

        </div>

        {/* Right Side: Delivery scheduling Form */}
        <div className="lg:col-span-7 p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <h3 className="text-lg font-black text-gray-900 font-display border-b border-amber-50 pb-3">
              Delivery Details & Scheduling
            </h3>

            {/* Error alerts */}
            {errors.minOrder && (
              <div className="p-3 rounded-xl bg-red-50 text-red-800 text-xs border border-red-200 font-medium">
                ⚠️ {errors.minOrder}
              </div>
            )}

            {/* Grid 1: Name and Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block text-xs font-black text-gray-600 uppercase tracking-tight">Your Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Ramesh Kumar"
                  value={customerName}
                  onChange={(e) => {
                    setCustomerName(e.target.value);
                    if (errors.customerName) setErrors(prev => ({ ...prev, customerName: '' }));
                  }}
                  className={`w-full p-2.5 rounded-xl border border-gray-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500 focus:border-transparent ${
                    errors.customerName ? 'border-red-400 bg-red-50/20' : ''
                  }`}
                />
                {errors.customerName && <p className="text-[10px] text-red-500 font-semibold">{errors.customerName}</p>}
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-black text-gray-600 uppercase tracking-tight">Contact Phone *</label>
                <input
                  type="text"
                  placeholder="10-digit mobile number"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    if (errors.phone) setErrors(prev => ({ ...prev, phone: '' }));
                  }}
                  className={`w-full p-2.5 rounded-xl border border-gray-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500 focus:border-transparent ${
                    errors.phone ? 'border-red-400 bg-red-50/20' : ''
                  }`}
                />
                {errors.phone && <p className="text-[10px] text-red-500 font-semibold">{errors.phone}</p>}
              </div>
            </div>

            {/* Email */}
            <div className="space-y-1">
              <label className="block text-xs font-black text-gray-600 uppercase tracking-tight">Email Address *</label>
              <input
                type="email"
                placeholder="e.g. name@company.com or personal"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors(prev => ({ ...prev, email: '' }));
                }}
                className={`w-full p-2.5 rounded-xl border border-gray-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500 focus:border-transparent ${
                  errors.email ? 'border-red-400 bg-red-50/20' : ''
                }`}
              />
              {errors.email && <p className="text-[10px] text-red-500 font-semibold">{errors.email}</p>}
            </div>

            {/* Date and Timing Slot picker */}
            <div className="p-4 bg-amber-50/60 rounded-2xl border border-amber-100 flex flex-col space-y-4">
              <span className="text-xs font-black text-amber-900 uppercase tracking-tight flex items-center gap-1.5 leading-none">
                <Clock className="w-4.5 h-4.5 text-amber-700" />
                <span>When should we deliver? (Time & Date)</span>
              </span>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Date Input */}
                <div className="space-y-1">
                  <label className="block text-[10px] font-extrabold text-amber-800 uppercase tracking-tight">Delivery Date *</label>
                  <input
                    type="date"
                    value={deliveryDate}
                    onChange={(e) => {
                      setDeliveryDate(e.target.value);
                      if (errors.deliveryDate) setErrors(prev => ({ ...prev, deliveryDate: '' }));
                    }}
                    className={`w-full p-2.5 rounded-xl border border-amber-200 bg-white text-sm text-gray-800 focus:outline-hidden focus:ring-2 focus:ring-amber-500 focus:border-transparent ${
                      errors.deliveryDate ? 'border-red-400' : ''
                    }`}
                  />
                  {errors.deliveryDate && <p className="text-[10px] text-red-500 font-semibold">{errors.deliveryDate}</p>}
                </div>

                {/* Time Slot Type */}
                <div className="space-y-2">
                  <label className="block text-[10px] font-extrabold text-amber-800 uppercase tracking-tight">Meal Period</label>
                  <div className="flex bg-white p-1 rounded-xl border border-amber-100/50">
                    <button
                      type="button"
                      onClick={() => setMealTimeType('lunch')}
                      className={`flex-1 py-1 px-3 rounded-lg text-xs font-bold transition-all ${
                        mealTimeType === 'lunch'
                          ? 'bg-amber-600 text-white'
                          : 'text-gray-500 hover:text-gray-900'
                      }`}
                    >
                      Lunch Delivery
                    </button>
                    <button
                      type="button"
                      onClick={() => setMealTimeType('dinner')}
                      className={`flex-1 py-1 px-3 rounded-lg text-xs font-bold transition-all ${
                        mealTimeType === 'dinner'
                          ? 'bg-amber-600 text-white'
                          : 'text-gray-500 hover:text-gray-900'
                      }`}
                    >
                      Dinner Delivery
                    </button>
                  </div>
                </div>
              </div>

              {/* Time Slot Selector */}
              <div className="space-y-1">
                <label className="block text-[10px] font-extrabold text-amber-800 uppercase tracking-tight">Choose Specific Timing Hour</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {(mealTimeType === 'lunch' ? TIME_SLOTS.lunch : TIME_SLOTS.dinner).map((slot) => (
                    <button
                      type="button"
                      key={slot}
                      onClick={() => setDeliveryTimeSlot(slot)}
                      className={`p-2 rounded-xl text-xs font-black border transition-all ${
                        deliveryTimeSlot === slot
                          ? 'bg-amber-900 text-white border-transparent'
                          : 'bg-white text-gray-600 border-amber-100 hover:bg-amber-100/50'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Area and Address details */}
            <div className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Area Select */}
                <div className="space-y-1">
                  <label className="block text-xs font-black text-gray-600 uppercase tracking-tight">Service Area *</label>
                  <select
                    value={area}
                    onChange={(e) => {
                      setArea(e.target.value);
                      // Reset min order error if valid
                      if (errors.minOrder) setErrors(prev => ({ ...prev, minOrder: '' }));
                    }}
                    className="w-full p-2.5 rounded-xl border border-gray-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500 bg-white"
                  >
                    {SERVICE_AREAS.map((a) => (
                      <option key={a.name} value={a.name}>
                        {a.name} (Min. ₹{a.minOrder})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Corporate Toggle */}
                <div className="space-y-1 flex flex-col justify-end">
                  <label className="flex items-center space-x-2.5 p-3.5 bg-gray-50 rounded-xl border border-gray-200 cursor-pointer select-none">
                    <input 
                      type="checkbox"
                      checked={isCorporate}
                      onChange={(e) => setIsCorporate(e.target.checked)}
                      className="rounded border-gray-300 text-amber-600 focus:ring-amber-500 w-4.5 h-4.5"
                    />
                    <div>
                      <span className="block text-xs font-extrabold text-gray-800">Catering to Office/Company?</span>
                      <span className="block text-[10px] text-gray-400 font-medium">Delivering straight to workstations</span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Company spec */}
              {isCorporate && (
                <div className="space-y-1">
                  <label className="block text-xs font-black text-gray-600 uppercase tracking-tight">Company / IT Park Name *</label>
                  <div className="relative">
                    <Building className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="e.g. Wipro Hinjawadi, Tata Motors Pimpri"
                      value={companyName}
                      onChange={(e) => {
                        setCompanyName(e.target.value);
                        if (errors.companyName) setErrors(prev => ({ ...prev, companyName: '' }));
                      }}
                      className={`w-full pl-10 pr-4 p-2.5 rounded-xl border border-gray-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500 focus:border-transparent ${
                        errors.companyName ? 'border-red-400 bg-red-50/20' : ''
                      }`}
                    />
                  </div>
                  {errors.companyName && <p className="text-[10px] text-red-500 font-semibold">{errors.companyName}</p>}
                </div>
              )}

              {/* Address */}
              <div className="space-y-1">
                <label className="block text-xs font-black text-gray-600 uppercase tracking-tight">Full Delivery Address *</label>
                <textarea
                  placeholder="Apartment flat, Wing, Floor details or Floor/Desk for corporate offices"
                  value={address}
                  rows={3}
                  onChange={(e) => {
                    setAddress(e.target.value);
                    if (errors.address) setErrors(prev => ({ ...prev, address: '' }));
                  }}
                  className={`w-full p-2.5 rounded-xl border border-gray-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500 focus:border-transparent ${
                    errors.address ? 'border-red-400 bg-red-50/20' : ''
                  }`}
                />
                {errors.address && <p className="text-[10px] text-red-500 font-semibold">{errors.address}</p>}
              </div>

              {/* Landmark */}
              <div className="space-y-1">
                <label className="block text-xs font-black text-gray-600 uppercase tracking-tight">Landmark (Optional)</label>
                <input
                  type="text"
                  placeholder="Near temple, metro station, circle, etc."
                  value={landmark}
                  onChange={(e) => setLandmark(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-gray-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Payment Selector */}
            <div className="pt-1">
              {/* Payment Select */}
              <div className="space-y-2">
                <label className="block text-xs font-black text-gray-600 uppercase tracking-tight">Payment Method</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { id: 'Cash on Delivery', desc: 'Pay Cash or Coin on arrival' },
                    { id: 'UPI on Delivery', desc: 'PhonePe, GPay, Paytm on arrival or instantly online' }
                  ].map((pay) => (
                    <button
                      type="button"
                      key={pay.id}
                      onClick={() => setPaymentMethod(pay.id as any)}
                      className={`p-3.5 rounded-2xl border text-left transition-all relative ${
                        paymentMethod === pay.id
                          ? 'border-amber-600 bg-amber-50/20 font-black ring-2 ring-amber-500/20'
                          : 'border-gray-200 hover:bg-gray-55'
                      }`}
                    >
                      <span className="block text-xs text-gray-900 font-extrabold">{pay.id}</span>
                      <span className="block text-[10px] text-gray-500 font-bold">{pay.desc}</span>
                      {paymentMethod === pay.id && (
                        <CheckCircle2 className="w-4 h-4 text-amber-600 absolute right-3.5 top-3.5 fill-amber-100" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Note regarding safety */}
            <div className="text-center md:text-left py-2 border-t border-amber-50 flex items-center gap-1.5 text-[11px] text-gray-500 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>We never share your personal information. Zero pre-payments required — Pay on Delivery!</span>
            </div>

            {/* Submits */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3 px-4 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-700 text-sm font-bold transition-colors cursor-pointer text-center select-none"
              >
                Cancel & Continue Shopping
              </button>
              
              <button
                type="submit"
                disabled={cart.length === 0}
                className="flex-[2] py-3.5 px-6 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-base font-black flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 disabled:opacity-50 disabled:pointer-events-none cursor-pointer select-none"
              >
                <Send className="w-4.5 h-4.5" />
                <span>Confirm Scheduled Delivery</span>
              </button>
            </div>

          </form>
        </div>

      </div>
    </div>
  );
}
