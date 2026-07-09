import React from 'react';
import { Utensils, Heart, Mail, Phone, MapPin, Compass, ShieldAlert, Instagram } from 'lucide-react';
import logoImg from '../assets/images/logo.jpg';

interface FooterProps {
  onTabChange: (tab: 'home' | 'menu' | 'corporate' | 'contact' | 'admin') => void;
}

export default function Footer({ onTabChange }: FooterProps) {
  return (
    <footer className="bg-slate-900 text-slate-350 border-t-4 border-amber-600">
      
      {/* Upper part */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Col 1: Bio */}
          <div className="lg:col-span-5 space-y-5">
            <div className="flex items-center space-x-3">
              <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-amber-400 shrink-0">
                <img 
                  src={logoImg} 
                  alt="Aaiswaad Rasoi Logo" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <span className="text-lg font-black text-white tracking-tight block font-display">
                  Aaiswaad <span className="text-amber-500">Rasoi</span>
                </span>
                <span className="text-[10px] font-mono text-amber-450 block -mt-1 tracking-wider uppercase">
                  Home Cooking Redefined
                </span>
              </div>
            </div>

            <p className="text-xs md:text-sm text-slate-400 leading-relaxed font-semibold">
              Authentic Karnataka hand-cooked home-style meals served and delivered with pure regional ingredients in Pune. No soda, no preservatives. 
              We cook daily with clean oils and lots of care.
            </p>

            <div className="space-y-3 pt-2">
              <p className="flex items-center gap-2.5 text-sm font-extrabold text-white">
                <MapPin className="w-5 h-5 text-amber-400 shrink-0" />
                <span>Talawade Towerline 1, Pimpri-Chinchwad, Pune</span>
              </p>
              <p className="flex items-center gap-2.5 text-sm font-extrabold text-white">
                <Phone className="w-5 h-5 text-amber-400 shrink-0" />
                <span>+91 96062 25897</span>
              </p>
              <p className="flex items-center gap-2.5 text-sm font-extrabold text-white">
                <Instagram className="w-5 h-5 text-amber-400 shrink-0" />
                <a 
                  href="https://instagram.com/AaiswaadRasoi1978" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-amber-300 transition-colors"
                >
                  @AaiswaadRasoi1978
                </a>
              </p>
            </div>
          </div>

          {/* Col 2: Timings details */}
          <div className="lg:col-span-3 space-y-4 font-semibold">
            <h4 className="text-sm uppercase tracking-widest text-white font-black">
              Rasoi Timings
            </h4>
            
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="pb-1.5 border-b border-slate-800">
                <span className="block text-white font-black">LUNCH HOUR SCHEDULE</span>
                <span className="block font-mono">Cooking: 10:30 AM - 02:30 PM</span>
                <span className="block text-amber-500 text-[10px]">Deliveries: 11:30 AM - 02:30 PM</span>
              </div>
              <div>
                <span className="block text-white font-black">DINNER HOUR SCHEDULE</span>
                <span className="block font-mono">Cooking: 06:30 PM - 10:00 PM</span>
                <span className="block text-amber-500 text-[10px]">Deliveries: 07:30 PM - 10:30 PM</span>
              </div>
            </div>
          </div>

          {/* Col 3: Areas listed */}
          <div className="lg:col-span-2 space-y-4 font-medium">
            <h4 className="text-sm uppercase tracking-widest text-white font-black">
              Delivery Areas
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li>• Pimpri Chinchwad</li>
              <li>• Akurdi & Nigdi</li>
              <li>• Ravet & Wakad</li>
              <li>• Bhosari & Moshi</li>
              <li>• Hinjawadi (Phases 1-3)</li>
              <li>• Corporate Pantries</li>
            </ul>
          </div>

          {/* Col 4: Quick Links */}
          <div className="lg:col-span-2 space-y-4 font-bold">
            <h4 className="text-sm uppercase tracking-widest text-white font-black">
              Quick Links
            </h4>
            <div className="flex flex-col space-y-2 text-xs text-slate-400">
              <button 
                onClick={() => onTabChange('home')}
                className="text-left hover:text-white transition-colors cursor-pointer"
              >
                Home
              </button>
              <button 
                onClick={() => onTabChange('menu')}
                className="text-left hover:text-white transition-colors cursor-pointer"
              >
                Meals Menu
              </button>
              <button 
                onClick={() => onTabChange('corporate')}
                className="text-left hover:text-white transition-colors cursor-pointer"
              >
                Office Delivery
              </button>
              <button 
                onClick={() => onTabChange('contact')}
                className="text-left hover:text-white transition-colors cursor-pointer"
              >
                Contact Form
              </button>
              <button 
                onClick={() => onTabChange('admin')}
                className="text-left text-amber-550 hover:text-white transition-colors cursor-pointer flex items-center gap-1"
              >
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>Staff Portal</span>
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Lower Copyright Row */}
      <div className="bg-slate-950 py-6 text-center text-xs text-slate-600 font-semibold border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} Aaiswaad Rasoi. All Rights Reserved. Prepared with hygiene & absolute care in Pune.</p>
          <p className="flex items-center gap-1">
            <span>Made with</span>
            <Heart className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span>for authentic Karnataka tastes.</span>
          </p>
        </div>
      </div>

    </footer>
  );
}
