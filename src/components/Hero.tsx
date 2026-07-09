import React from 'react';
import { ArrowRight, Star, Heart, Flame, Shield, Truck, Sparkles, Building2 } from 'lucide-react';
import logoImg from '../assets/images/logo.jpg';


interface HeroProps {
  onOrderNowClick: () => void;
  onExploreCorporateClick: () => void;
}

export default function Hero({ onOrderNowClick, onExploreCorporateClick }: HeroProps) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-amber-500/10 via-amber-50/50 to-white pt-10 pb-16 md:py-20">
      {/* Decorative pattern/glowing elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-amber-400/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-red-400/5 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-100/80 text-amber-900 border border-amber-200 text-xs md:text-sm font-bold tracking-tight">
              <Sparkles className="w-4 h-4 text-amber-600 animate-spin-slow" />
              <span>Authentic North & South Karnataka Kitchen in Pune</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 tracking-tight leading-[1.1] font-display">
              Healthy, Hand-Cooked <br />
              <span className="text-amber-600 relative inline-block">
                Karnataka Meals
                <span className="absolute left-0 bottom-1 w-full h-2 bg-amber-400/40 -z-10 rounded-xs" />
              </span> <br />
              Delivered in Pune
            </h1>

            <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 font-medium leading-relaxed">
              We bring the nostalgic taste of native <span className="text-amber-800 font-bold">Chapati Palya</span>, 
              soft, handmade <span className="text-amber-800 font-bold">Jowar Roti Uta</span>, and freshly steamed 
              <span className="text-amber-800 font-bold"> Rice Sambar</span> prepared with zero artificial preservatives. 
              Fresh ingredients, prepared carefully by hand.
            </p>

            {/* Service Area Badge */}
            <div className="py-3 px-4 rounded-2xl bg-white border border-amber-100 shadow-xs max-w-xl mx-auto lg:mx-0 flex flex-wrap md:flex-nowrap gap-4 items-center justify-center lg:justify-start">
              <div className="flex items-center space-x-2 text-amber-700 font-extrabold text-sm border-r border-amber-100 pr-4 shrink-0">
                <Truck className="w-5 h-5 text-amber-600 animate-bounce" />
                <span>MEAL DELIVERY</span>
              </div>
              <p className="text-xs text-start text-gray-500 font-medium">
                Serving individuals & corporates daily in <span className="font-bold text-gray-800">Pimpri-Chinchwad, Akurdi, Ravet, Wakad, Hinjawadi & Bhosari</span>. Schedule your lunch or dinner!
              </p>
            </div>

            {/* Call to Actions */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <button
                onClick={onOrderNowClick}
                className="inline-flex items-center justify-center px-6 py-4 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-base transition-all shadow-md active:scale-95 group"
              >
                <span>Schedule My Meal</span>
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button
                onClick={onExploreCorporateClick}
                className="inline-flex items-center justify-center px-6 py-4 rounded-xl bg-white hover:bg-amber-50 text-amber-900 border-2 border-amber-100 font-bold text-base transition-all shadow-sm active:scale-95"
              >
                <Building2 className="w-5 h-5 mr-2 text-amber-600" />
                <span>Office Bulk Delivery</span>
              </button>
            </div>

            {/* Key Benefits */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-amber-100 max-w-lg mx-auto lg:mx-0">
              <div className="text-center lg:text-left space-y-1">
                <span className="block text-2xl font-black text-amber-900">100%</span>
                <span className="block text-xs text-gray-500 font-semibold uppercase tracking-wider">Veg & Pure</span>
              </div>
              <div className="text-center lg:text-left space-y-1">
                <span className="block text-2xl font-black text-amber-900">Zero</span>
                <span className="block text-xs text-gray-500 font-semibold uppercase tracking-wider">Soda or Preservatives</span>
              </div>
              <div className="text-center lg:text-left space-y-1">
                <span className="block text-2xl font-black text-amber-900">Daily</span>
                <span className="block text-xs text-gray-500 font-semibold uppercase tracking-wider">New Palya Items</span>
              </div>
            </div>

          </div>

          {/* Right Image/Graphic Column */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative">
              {/* Badge elements floating */}
              <div className="absolute -top-4 -left-6 bg-white py-3 px-4 rounded-2xl shadow-lg border border-amber-100 flex items-center space-x-2.5 z-10 antialiased animate-bounce-slow">
                <div className="bg-red-100 p-2 rounded-xl text-red-500">
                  <Heart className="w-5 h-5 fill-red-500 text-red-500" />
                </div>
                <div>
                  <span className="block text-xs text-gray-400 font-medium">Home Grown</span>
                  <span className="block text-sm font-bold text-gray-800">Mom&apos;s Authenticity</span>
                </div>
              </div>

              <div className="absolute -bottom-4 -right-6 bg-white py-3 px-4 rounded-2xl shadow-lg border border-amber-100 flex items-center space-x-2.5 z-10 antialiased">
                <div className="bg-amber-100 p-2 rounded-xl text-amber-600">
                  <Star className="w-5 h-5 fill-amber-500 text-amber-600" />
                </div>
                <div>
                  <span className="block text-xs text-gray-400 font-medium font-mono">Pimpri Chinchwad</span>
                  <span className="block text-sm font-bold text-gray-800">5-Star Local Rating</span>
                </div>
              </div>

              {/* Central Circle Graphic representing logo */}
              <div className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full overflow-hidden border-8 border-white shadow-2xl bg-amber-100 select-none group">
                <img
  		  src={logoImg} 
                  alt="Aaiswaad Rasoi Logo - Traditional Cooking" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Circle border accent */}
              <div className="absolute inset-0 border-2 border-amber-200 rounded-full scale-102 -z-10 animate-pulse-slow" />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
