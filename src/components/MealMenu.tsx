import React, { useState } from 'react';
import { Search, ShoppingCart, Check, Flame, Leaf, HelpCircle, AlertCircle, Sparkles } from 'lucide-react';
import { MealItem } from '../types';
import { MEAL_ITEMS } from '../data/meals';

interface MealMenuProps {
  onAddToBasket: (meal: MealItem, size: 'full' | 'half', quantity: number) => void;
  basket: { mealId: string; size: 'full' | 'half'; quantity: number }[];
}

export default function MealMenu({ onAddToBasket, basket }: MealMenuProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [mealSizes, setMealSizes] = useState<Record<string, 'full' | 'half'>>({});
  const [addedNotification, setAddedNotification] = useState<string | null>(null);

  // Toggle meal size (full / half) state locally
  const handleSizeChange = (mealId: string, size: 'full' | 'half') => {
    setMealSizes(prev => ({ ...prev, [mealId]: size }));
  };

  const getMealSize = (meal: MealItem): 'full' | 'half' => {
    if (!meal.priceHalf) return 'full';
    return mealSizes[meal.id] || 'full';
  };

  const getBasketQuantity = (mealId: string, size: 'full' | 'half'): number => {
    const item = basket.find(b => b.mealId === mealId && b.size === size);
    return item ? item.quantity : 0;
  };

  const handleAddClick = (meal: MealItem) => {
    const size = getMealSize(meal);
    onAddToBasket(meal, size, 1);
    
    // Set transient "Added!" notification
    setAddedNotification(`${meal.id}-${size}`);
    setTimeout(() => {
      setAddedNotification(null);
    }, 1500);
  };

  // Filter items
  const filteredMeals = MEAL_ITEMS.filter(meal => {
    const matchesCategory = selectedCategory === 'all' || meal.category === selectedCategory;
    const matchesSearch = meal.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          meal.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          meal.features.some(f => f.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="menu-section" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Title & Info */}
      <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight font-display">
          Our Authentic <span className="text-amber-600">Karnataka Meals</span> Menu
        </h2>
        <p className="text-gray-600 font-medium text-sm md:text-base">
          Prepared daily with fresh regional oils, hand-ground spices, and traditional techniques. Select your preferences and quantity.
        </p>
        <div className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100">
          <Leaf className="w-3.5 h-3.5 fill-emerald-600 text-emerald-600" />
          <span>Pure Vegetarian (Veg Only) Kitchen • Always Clean & Hygienic</span>
        </div>
      </div>

      {/* Categories & Search Filter row */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        {/* Chips for Categories */}
        <div className="flex overflow-x-auto gap-2 py-1 scrollbar-none">
          {[
            { id: 'all', label: 'All Meals' },
            { id: 'roti-meals', label: 'Jowar Roti' },
            { id: 'chapati-meals', label: 'Chapati Meals' },
            { id: 'rice-special', label: 'Puliyogare' }
          ].map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap cursor-pointer select-none ${
                selectedCategory === cat.id
                  ? 'bg-amber-600 text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-amber-50 border border-gray-100'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative max-w-xs w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search items (Roti, Sambar...)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white shadow-xs"
          />
        </div>
      </div>

      {/* Menu Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredMeals.map(meal => {
          const size = getMealSize(meal);
          const currentPrice = size === 'full' ? meal.priceFull : (meal.priceHalf || meal.priceFull);
          const inCartCount = getBasketQuantity(meal.id, size);
          const isNotificationActive = addedNotification === `${meal.id}-${size}`;

          return (
            <div 
              key={meal.id} 
              id={`meal-card-${meal.id}`}
              className="bg-white rounded-3xl border border-amber-100/60 shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group h-full"
            >
              {/* Image Banner */}
              <div className="h-52 w-full relative overflow-hidden bg-amber-50">
                <img 
                  src={meal.image} 
                  alt={meal.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  referrerPolicy="no-referrer"
                />
                
                {/* Float badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-1">
                  <span className="bg-emerald-600 text-white text-[10px] uppercase font-black tracking-wide py-1 px-2.5 rounded-full flex items-center gap-1 shadow-md">
                    <Leaf className="w-3 h-3 fill-white text-emerald-100" />
                    <span>Pure Veg</span>
                  </span>
                  {meal.tags.map((tag, i) => (
                    <span key={i} className="bg-amber-500/90 text-white text-[10px] uppercase font-black tracking-wide py-1 px-2.5 rounded-full shadow-md w-max">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-xs text-white text-xs font-mono font-bold py-1 px-2.5 rounded-full">
                  ₹{size === 'full' ? 'Full thali' : 'Half portion'}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-amber-800 transition-colors">
                    {meal.name}
                  </h3>
                  <p className="text-xs text-gray-500 font-medium leading-relaxed">
                    {meal.description}
                  </p>

                  {/* Pricing and portion Toggle */}
                  <div className="flex items-center justify-between py-2 border-y border-amber-50">
                    <span className="text-sm font-semibold text-gray-500">Portion Selection:</span>
                    
                    {meal.priceHalf ? (
                      <div className="flex bg-gray-100 p-0.5 rounded-xl border border-gray-200">
                        <button
                          onClick={() => handleSizeChange(meal.id, 'full')}
                          className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                            size === 'full' 
                              ? 'bg-white text-amber-900 shadow-xs' 
                              : 'text-gray-500 hover:text-gray-900'
                          }`}
                        >
                          Full Meal Box (₹{meal.priceFull})
                        </button>
                        <button
                          onClick={() => handleSizeChange(meal.id, 'half')}
                          className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                            size === 'half' 
                              ? 'bg-white text-amber-900 shadow-xs' 
                              : 'text-gray-500 hover:text-gray-900'
                          }`}
                        >
                          Half Box (₹{meal.priceHalf})
                        </button>
                      </div>
                    ) : (
                      <span className="text-xs font-extrabold text-amber-800 bg-amber-50 px-3 py-1 rounded-lg border border-amber-100">
                        Single Size Box
                      </span>
                    )}
                  </div>

                  {/* Features Bullet List */}
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[11px] uppercase tracking-wider font-extrabold text-gray-400 block">Meal Includes:</span>
                    <ul className="space-y-1">
                      {(size === 'half' && meal.featuresHalf ? meal.featuresHalf : (size === 'full' && meal.featuresFull ? meal.featuresFull : meal.features)).map((feature, i) => (
                        <li key={i} className="text-xs text-gray-600 flex items-start gap-1.5 font-medium">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Pricing & Add Trigger Row */}
                <div className="flex items-center justify-between pt-4 border-t border-amber-50">
                  <div>
                    <span className="text-[10px] uppercase text-gray-400 font-extrabold block">Price</span>
                    <span className="text-2xl font-black text-amber-900 font-mono">₹{currentPrice}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {inCartCount > 0 && (
                      <span className="text-xs font-bold font-mono text-amber-900 bg-amber-100 px-2.5 py-1.5 rounded-xl">
                        {inCartCount} in basket
                      </span>
                    )}
                    
                    <button
                      onClick={() => handleAddClick(meal)}
                      className={`px-4 py-2.5 rounded-xl text-sm font-black flex items-center gap-1.5 transition-all shadow-sm cursor-pointer select-none active:scale-95 ${
                        isNotificationActive
                          ? 'bg-emerald-600 text-white shadow-emerald-200'
                          : 'bg-amber-600 text-white hover:bg-amber-700 hover:shadow-md'
                      }`}
                    >
                      {isNotificationActive ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Added!</span>
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="w-4.5 h-4.5" />
                          <span>Add to Plate</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

              </div>
            </div>
          );
        })}

        {filteredMeals.length === 0 && (
          <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-16 bg-white rounded-3xl border border-amber-50 p-8 space-y-3">
            <AlertCircle className="w-12 h-12 text-amber-500 mx-auto" />
            <h4 className="text-lg font-bold text-gray-900">No Meals Found</h4>
            <p className="text-gray-500 text-sm max-w-md mx-auto">
              We couldn&apos;t find any meal matching your filter. Please try adjusting your search terms or categorizations.
            </p>
            <button
              onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
              className="text-xs font-bold text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200 px-4 py-2 rounded-xl"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Direct Ordering Tip Bar */}
      <div className="mt-12 p-5 rounded-2xl bg-gradient-to-r from-amber-600 to-amber-800 text-white grid grid-cols-1 md:grid-cols-12 gap-4 items-center shadow-lg">
        <div className="md:col-span-9 space-y-1">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-4.5 h-4.5 text-amber-300 animate-pulse" />
            <span className="font-extrabold text-sm uppercase tracking-wider text-amber-200">Weekly Meal Subscription</span>
          </div>
          <p className="text-xs md:text-sm font-medium text-amber-50/95 leading-relaxed">
            Need home-style Karnataka mess meals daily at your office or home? We provide discounted subscription packages in Pimpri Chinchwad with flexible date pauses.
          </p>
        </div>
        <div className="md:col-span-3 text-right">
          <button 
            onClick={() => {
              const el = document.getElementById('contact-form-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="w-full md:w-auto px-5 py-2.5 rounded-xl bg-white hover:bg-amber-50 text-amber-900 font-bold text-xs shadow-xs transition-colors"
          >
            Inquire Subscriptions
          </button>
        </div>
      </div>
    </section>
  );
}
