import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, HelpCircle, CheckCircle2, Building, MessageSquare, Instagram } from 'lucide-react';
import { ContactSubmission } from '../types';

interface ContactUsProps {
  onSendMessage: (submission: Omit<ContactSubmission, 'id' | 'createdAt' | 'status'>) => void;
}

export default function ContactUs({ onSendMessage }: ContactUsProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [isCorporateInquiry, setIsCorporateInquiry] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = 'Please provide your name';
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) errs.email = 'Please provide a valid email address';
    if (!phone.trim() || !/^\d{10}$/.test(phone.replace(/[\s-]/g, ''))) errs.phone = 'Please provide a 10-digit phone number';
    if (!subject.trim()) errs.subject = 'Please set an inquiry subject';
    if (!message.trim()) errs.message = 'Please type your message';
    if (isCorporateInquiry && !companyName.trim()) errs.companyName = 'Company name is required';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    onSendMessage({
      name,
      email,
      phone,
      companyName: isCorporateInquiry ? companyName : undefined,
      subject,
      message,
      isCorporateInquiry
    });

    setSubmitted(true);
    setName('');
    setEmail('');
    setPhone('');
    setSubject('');
    setMessage('');
    setCompanyName('');
    setIsCorporateInquiry(false);

    setTimeout(() => {
      setSubmitted(false);
    }, 5000);
  };

  return (
    <section id="contact-form-section" className="py-16 bg-amber-50/40 border-y border-amber-100/55">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title and Introduction */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-mono font-extrabold uppercase tracking-widest text-amber-600 block">Get In Touch</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight font-display">
            Inquire for <span className="text-amber-600 font-black">Corporate Catering</span> or Delivery
          </h2>
          <p className="text-gray-600 font-medium text-sm md:text-base">
            Have questions about our Karnataka ingredients, want custom spices, or need corporate meal box deliveries daily? Write to us!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start lg:items-stretch">
          
          {/* Left Column: Direct info panels */}
          <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
            <div className="space-y-6">
              
              {/* Card 1: Map/HQ */}
              <div className="bg-white p-6 rounded-3xl border border-amber-100 shadow-xs space-y-4">
                <div className="flex items-start gap-4">
                  <div className="p-3.5 bg-amber-100 text-amber-700 rounded-2xl shrink-0">
                    <MapPin className="w-5 h-5 text-amber-600" />
                  </div>
                  <div className="space-y-1 font-medium">
                    <h4 className="text-base font-bold text-gray-800">Our Home Kitchen Address</h4>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      Aaiswaad Rasoi Kitchen, <br />
                      Talawade Towerline 1, Pimpri-Chinchwad, Pune
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 2: Phone */}
              <div className="bg-white p-6 rounded-3xl border border-amber-100 shadow-xs">
                <div className="flex items-start gap-4">
                  <div className="p-3.5 bg-amber-100 text-amber-700 rounded-2xl shrink-0">
                    <Phone className="w-5 h-5 text-amber-600" />
                  </div>
                  <div className="space-y-1 font-medium">
                    <h4 className="text-base font-bold text-gray-800">Call/WhatsApp ordering Desk</h4>
                    <p className="text-xs text-gray-500">For instant bulk deliveries, event bookings, and feedback.</p>
                    <p className="text-sm font-black font-mono text-amber-950 block pt-1">
                      +91 96062 25897
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 3: Instagram */}
              <div className="bg-white p-6 rounded-3xl border border-amber-100 shadow-xs">
                <div className="flex items-start gap-4">
                  <div className="p-3.5 bg-pink-100 text-pink-700 rounded-2xl shrink-0">
                    <Instagram className="w-5 h-5 text-pink-600" />
                  </div>
                  <div className="space-y-1 font-medium">
                    <h4 className="text-base font-bold text-gray-800">Follow us on Instagram</h4>
                    <p className="text-xs text-gray-500">Follow our kitchen updates, special weekend thalis and reviews.</p>
                    <a 
                      href="https://instagram.com/AaiswaadRasoi1978" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm font-black text-pink-850 hover:text-pink-600 block pt-1 transition-colors"
                    >
                      @AaiswaadRasoi1978
                    </a>
                  </div>
                </div>
              </div>

              {/* Card 4: Email */}
              <div className="bg-white p-6 rounded-3xl border border-amber-100 shadow-xs">
                <div className="flex items-start gap-4">
                  <div className="p-3.5 bg-amber-100 text-amber-700 rounded-2xl shrink-0">
                    <Mail className="w-5 h-5 text-amber-600" />
                  </div>
                  <div className="space-y-1 font-medium">
                    <h4 className="text-base font-bold text-gray-800">Email Desk</h4>
                    <p className="text-xs text-gray-500">Send us custom proposals, catering requirements, or feedback.</p>
                    <a 
                      href="mailto:AaiswaadRasoi1978@gmail.com" 
                      className="text-sm font-black text-amber-950 hover:text-amber-700 block pt-1 transition-colors"
                    >
                      AaiswaadRasoi1978@gmail.com
                    </a>
                  </div>
                </div>
              </div>


            </div>

            {/* Corporate discount info block */}
            <div className="p-6 rounded-3xl bg-amber-900 text-white space-y-2 mt-auto">
              <div className="flex items-center gap-1.5 font-bold text-sm text-amber-300 uppercase tracking-widest">
                <Building className="w-4 h-4" />
                <span>Corporate Meal Ties</span>
              </div>
              <p className="text-xs text-amber-100/90 leading-relaxed font-medium">
                We deliver daily packed lunches of healthy Chapati Palle & Sajje Roti Meals directly to corporate pantries or employees of Hinjawadi tech parks and Bhosari/Pimpri industrial belts. Standard corporate discounts apply for orders exceeding <b>10 plates daily</b>.
              </p>
            </div>
          </div>

          {/* Right Column: Secure Form */}
          <div className="lg:col-span-7 bg-white p-6 md:p-8 rounded-3xl border border-amber-100 shadow-md">
            <form onSubmit={handleSubmit} className="space-y-5">
              
              <div className="flex items-center gap-2 border-b border-amber-50 pb-3 mb-2">
                <MessageSquare className="w-5 h-5 text-amber-600" />
                <h3 className="text-lg font-black text-gray-900 font-display">
                  Secure Message Portal
                </h3>
              </div>

              {submitted && (
                <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-800 text-xs md:text-sm border border-emerald-200 font-bold flex items-center space-x-3">
                  <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-600" />
                  <span>Thank you! Your inquiry has been sent securely. Our rasoi representative will contact you in a few hours.</span>
                </div>
              )}

              {/* Grid: Name and Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-xs font-black text-gray-600 uppercase tracking-tight">Full Name *</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (errors.name) setErrors(prev => ({ ...prev, name: '' }));
                    }}
                    placeholder="e.g. Anand Gowda"
                    className={`w-full p-2.5 rounded-xl border border-gray-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500 focus:border-transparent ${
                      errors.name ? 'border-red-400 bg-red-50/20' : ''
                    }`}
                  />
                  {errors.name && <p className="text-[10px] text-red-500 font-semibold">{errors.name}</p>}
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-black text-gray-600 uppercase tracking-tight">Mobile Phone *</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      if (errors.phone) setErrors(prev => ({ ...prev, phone: '' }));
                    }}
                    placeholder="10-digit phone number"
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
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors(prev => ({ ...prev, email: '' }));
                  }}
                  placeholder="e.g. anand@outlook.com"
                  className={`w-full p-2.5 rounded-xl border border-gray-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500 focus:border-transparent ${
                    errors.email ? 'border-red-400 bg-red-50/20' : ''
                  }`}
                />
                {errors.email && <p className="text-[10px] text-red-500 font-semibold">{errors.email}</p>}
              </div>

              {/* Corporate Inquire Toggle */}
              <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-100 flex items-center space-x-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  id="corporateCheck"
                  checked={isCorporateInquiry}
                  onChange={(e) => setIsCorporateInquiry(e.target.checked)}
                  className="rounded border-gray-300 text-amber-600 focus:ring-amber-500 w-4 h-4"
                />
                <label htmlFor="corporateCheck" className="text-xs font-bold text-gray-700 cursor-pointer">
                  This is a Corporate / Company meal box query
                </label>
              </div>

              {/* Company spec */}
              {isCorporateInquiry && (
                <div className="space-y-1">
                  <label className="block text-xs font-black text-gray-600 uppercase tracking-tight">Your Company Name *</label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => {
                      setCompanyName(e.target.value);
                      if (errors.companyName) setErrors(prev => ({ ...prev, companyName: '' }));
                    }}
                    placeholder="e.g. Infosys, TCS Hinjawadi, Bajaj Auto"
                    className={`w-full p-2.5 rounded-xl border border-gray-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500 focus:border-transparent ${
                      errors.companyName ? 'border-red-400 bg-red-50/20' : ''
                    }`}
                  />
                  {errors.companyName && <p className="text-[10px] text-red-500 font-semibold">{errors.companyName}</p>}
                </div>
              )}

              {/* Subject */}
              <div className="space-y-1">
                <label className="block text-xs font-black text-gray-600 uppercase tracking-tight">Subject / Query Topic *</label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => {
                    setSubject(e.target.value);
                    if (errors.subject) setErrors(prev => ({ ...prev, subject: '' }));
                  }}
                  placeholder="e.g. Daily office lunch delivery quote, Custom spices request..."
                  className={`w-full p-2.5 rounded-xl border border-gray-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500 focus:border-transparent ${
                    errors.subject ? 'border-red-400 bg-red-400/5' : ''
                  }`}
                />
                {errors.subject && <p className="text-[10px] text-red-500 font-semibold">{errors.subject}</p>}
              </div>

              {/* Message */}
              <div className="space-y-1">
                <label className="block text-xs font-black text-gray-600 uppercase tracking-tight">Message or Detail Requirements *</label>
                <textarea
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    if (errors.message) setErrors(prev => ({ ...prev, message: '' }));
                  }}
                  placeholder="e.g. We require 25 Chapati & Sajje Roti meals delivered every Monday to Friday at our Hinjawadi Phase 2 office..."
                  rows={4}
                  className={`w-full p-2.5 rounded-xl border border-gray-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500 focus:border-transparent ${
                    errors.message ? 'border-red-400 bg-red-400/5' : ''
                  }`}
                />
                {errors.message && <p className="text-[10px] text-red-500 font-semibold">{errors.message}</p>}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 px-6 bg-amber-600 hover:bg-amber-700 text-white font-black text-sm rounded-xl cursor-pointer select-none shadow-xs hover:shadow-md transition-all flex items-center justify-center gap-1.5 active:scale-95"
              >
                <Send className="w-4 h-4" />
                <span>Send Secure message</span>
              </button>

            </form>
          </div>

        </div>

      </div>
    </section>
  );
}
