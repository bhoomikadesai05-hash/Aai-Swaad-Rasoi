import React from 'react';
import { ShoppingBag, Utensils, Phone, Clock, MapPin, ShieldAlert, Award } from 'lucide-react';

const LogoImage = '/src/assets/images/aaiswaad_rasoi_logo_1781703038677.jpg';

interface HeaderProps {
  cartCount: number;
  cartTotal: number;
  onCartClick: () => void;
  onTabChange: (tab: 'home' | 'menu' | 'corporate' | 'contact' | 'admin') => void;
  activeTab: 'home' | 'menu' | 'corporate' | 'contact' | 'admin';
}

export default function Header({
  cartCount,
  cartTotal,
  onCartClick,
  onTabChange,
  activeTab
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-amber-100 shadow-xs">
      {/* Top bar with quick news */}
      <div className="bg-amber-600 text-white py-1 px-4 text-xs font-medium flex justify-between items-center overflow-hidden">
        <div className="flex items-center space-x-2 animate-pulse">
          <Clock className="w-3.5 h-3.5" />
          <span>Now delivering Lunch & Dinner across Pimpri-Chinchwad!</span>
        </div>
        <div className="hidden md:flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <MapPin className="w-3 h-3" />
            <span>Serving Pune, mainly Pimpri Chinchwad</span>
          </div>
          <div className="flex items-center space-x-1">
            <Phone className="w-3 h-3" />
            <span>+91 96062 25897</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex justify-between items-center">
          {/* Logo Brand */}
          <div 
            onClick={() => onTabChange('home')}
            className="flex items-center space-x-3 cursor-pointer select-none group"
            id="brand-logo"
          >
            <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-amber-400 group-hover:scale-105 transition-transform">
              <img 
                src={LogoImage} 
                alt="Aaiswaad Rasoi Logo" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <span className="text-xl md:text-2xl font-black text-amber-900 tracking-tight block font-display">
                Aaiswaad <span className="text-amber-600">Rasoi</span>
              </span>
              <span className="text-[10px] md:text-xs font-mono text-gray-400 block -mt-1 tracking-wider uppercase font-semibold">
                Karnataka Hand-Cooked Meals
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden lg:flex space-x-1">
            {[
              { id: 'home', label: 'Home' },
              { id: 'menu', label: 'Karnataka Meals Menu' },
              { id: 'corporate', label: 'Corporate Delivery' },
              { id: 'contact', label: 'Contact Us' },
              { id: 'admin', label: 'Manage Orders', icon: ShieldAlert }
            ].map((tab) => {
              const IconComp = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id as any)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-1.5 ${
                    activeTab === tab.id
                      ? 'bg-amber-100/80 text-amber-900 shadow-inner'
                      : 'text-gray-600 hover:text-amber-800 hover:bg-amber-50/50'
                  }`}
                >
                  {IconComp && <IconComp className="w-4 h-4 text-amber-700" />}
                  {tab.label}
                </button>
              );
            })}
          </nav>

          {/* Quick Buttons or Cart */}
          <div className="flex items-center space-x-3">
            {/* Quick Call */}
            <a 
              href="tel:+919606225897" 
              className="hidden sm:flex items-center space-x-1 px-3 py-1.5 rounded-lg border border-amber-200 text-amber-700 font-medium text-xs hover:bg-amber-50 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-amber-600" />
              <span>Call to Order</span>
            </a>

            {/* Cart Button */}
            <button
              onClick={onCartClick}
              className="relative inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-amber-900 hover:bg-amber-950 text-white font-medium text-sm transition-all shadow-md active:scale-95"
              id="header-cart-btn"
            >
              <ShoppingBag className="w-4.5 h-4.5 text-amber-300" />
              <span className="hidden md:inline">My Basket</span>
              {cartCount > 0 && (
                <>
                  <span className="bg-amber-500 text-white text-[11px] font-black w-5 h-5 rounded-full flex items-center justify-center animate-bounce">
                    {cartCount}
                  </span>
                  <span className="border-l border-amber-800 pl-2 hidden sm:inline text-amber-200 font-mono text-xs">
                    ₹{cartTotal}
                  </span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation row */}
        <div className="flex lg:hidden overflow-x-auto pt-3 pb-1 border-t border-amber-50 scrollbar-none gap-1 mt-2">
          {[
            { id: 'home', label: 'Home' },
            { id: 'menu', label: 'Meals' },
            { id: 'corporate', label: 'Corporates' },
            { id: 'contact', label: 'Contact' },
            { id: 'admin', label: 'Staff Portal', icon: ShieldAlert }
          ].map((tab) => {
            const IconComp = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id as any)}
                className={`whitespace-nowrap px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                  activeTab === tab.id
                    ? 'bg-amber-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {IconComp && <IconComp className="w-3.5 h-3.5" />}
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}
