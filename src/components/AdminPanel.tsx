import React, { useState } from 'react';
import { Shield, Users, ShoppingCart, DollarSign, Clock, CheckCircle2, AlertCircle, RefreshCw, XCircle, Search, FileText, Check, MailOpen, Landmark } from 'lucide-react';
import { Order, ContactSubmission } from '../types';

interface AdminPanelProps {
  orders: Order[];
  contactSubmissions: ContactSubmission[];
  onUpdateOrderStatus: (orderId: string, status: Order['status']) => void;
  onUpdateFeedbackStatus?: (subId: string, status: ContactSubmission['status']) => void;
  onClearData: () => void;
  onSeedData: () => void;
}

export default function AdminPanel({
  orders,
  contactSubmissions,
  onUpdateOrderStatus,
  onUpdateFeedbackStatus,
  onClearData,
  onSeedData
}: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState<'orders' | 'contacts' | 'analytics'>('orders');
  const [orderFilter, setOrderFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedReceiptOrder, setSelectedReceiptOrder] = useState<Order | null>(null);

  // Calculations
  const revenue = orders
    .filter(o => o.status !== 'Cancelled')
    .reduce((sum, o) => sum + o.totalPrice, 0);

  const pendingCount = orders.filter(o => o.status === 'Pending').length;
  const corporateCount = orders.filter(o => o.isCorporate).length;
  const deliveryCount = orders.filter(o => o.status === 'Out for Delivery' || o.status === 'Confirmed').length;

  // Filter orders
  const filteredOrders = orders.filter(o => {
    const matchesStatus = orderFilter === 'all' || o.status.toLowerCase() === orderFilter.toLowerCase();
    const searchString = `${o.customerName} ${o.phone} ${o.area} ${o.id}`.toLowerCase();
    const matchesSearch = searchString.includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-50 text-yellow-800 border-yellow-200';
      case 'Confirmed': return 'bg-blue-50 text-blue-800 border-blue-200';
      case 'Out for Delivery': return 'bg-indigo-50 text-indigo-800 border-indigo-200';
      case 'Delivered': return 'bg-emerald-50 text-emerald-800 border-emerald-200';
      case 'Cancelled': return 'bg-red-50 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-fade-in">
      
      {/* Admin Title Banner */}
      <div className="bg-gradient-to-r from-amber-900 to-slate-900 rounded-3xl p-6 md:p-8 text-white flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-lg">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/20 rounded-full border border-amber-500/30 text-xs font-bold text-amber-300">
            <Shield className="w-3.5 h-3.5" />
            <span>Rasoi Manager Console</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-black font-display tracking-tight text-white">
            Aaiswaad Operational Dashboard
          </h2>
          <p className="text-xs md:text-sm text-gray-300 font-medium">
            Review incoming scheduled Karnataka meal boxes, customer inquiries, and deliver logistics.
          </p>
        </div>

        {/* Database Quick Controls */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={onSeedData}
            className="px-4 py-2 border border-amber-400/50 hover:bg-amber-800/80 rounded-xl text-xs font-bold text-amber-300 transition-colors cursor-pointer select-none"
          >
            🌱 Seed 5 Demo Orders
          </button>
          
          <button
            onClick={onClearData}
            className="px-4 py-2 border border-red-600/50 hover:bg-red-950/50 rounded-xl text-xs font-bold text-red-400 transition-colors cursor-pointer select-none"
          >
            🗑️ Clear Database
          </button>
        </div>
      </div>

      {/* Analytics Kpi summary boxes */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {[
          { label: 'Total Sales Revenue', value: `₹${revenue}`, sub: `${orders.length} meals total`, icon: DollarSign, color: 'text-amber-600 bg-amber-50 border-amber-100' },
          { label: 'Pending Orders', value: pendingCount, sub: 'Needs verification', icon: Clock, color: 'text-yellow-600 bg-yellow-50 border-yellow-105' },
          { label: 'In Transit/Cooking', value: deliveryCount, sub: 'Active deliveries', icon: ShoppingCart, color: 'text-blue-600 bg-blue-50 border-blue-100' },
          { label: 'Corporate Accounts', value: corporateCount, sub: 'Bulk deliveries', icon: Users, color: 'text-primary-800 bg-primary-50 border-primary-100' }
        ].map((kpi, idx) => {
          const IconComp = kpi.icon;
          return (
            <div key={idx} className={`p-4 md:p-5 rounded-2xl border bg-white shadow-3xs flex justify-between items-start`}>
              <div className="space-y-1">
                <span className="text-xs text-gray-400 font-extrabold uppercase tracking-tight block">{kpi.label}</span>
                <span className="text-xl md:text-2xl font-black font-mono text-gray-800 block">{kpi.value}</span>
                <span className="text-[10px] text-gray-500 font-medium block">{kpi.sub}</span>
              </div>
              <div className={`p-2.5 rounded-xl border ${kpi.color}`}>
                <IconComp className="w-5 h-5 shrink-0" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setActiveTab('orders')}
          className={`py-2.5 px-6 font-bold text-sm tracking-tight border-b-2 transition-all cursor-pointer ${
            activeTab === 'orders'
              ? 'border-amber-600 text-amber-900'
              : 'border-transparent text-gray-500 hover:text-gray-900'
          }`}
        >
          Customer Scheduled Orders ({orders.length})
        </button>
        <button
          onClick={() => setActiveTab('contacts')}
          className={`py-2.5 px-6 font-bold text-sm tracking-tight border-b-2 transition-all cursor-pointer ${
            activeTab === 'contacts'
              ? 'border-amber-600 text-amber-900'
              : 'border-transparent text-gray-500 hover:text-gray-900'
          }`}
        >
          Secure Messages Inbox ({contactSubmissions.length})
        </button>
      </div>

      {/* Tab: Orders view */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          
          {/* Filters row */}
          <div className="flex flex-col md:flex-row gap-3 justify-between items-center bg-white p-4 rounded-2xl border border-gray-100 shadow-3xs">
            <div className="flex gap-1.5 overflow-x-auto self-start md:self-auto w-full md:w-auto pb-1 md:pb-0">
              {['all', 'pending', 'confirmed', 'out for delivery', 'delivered', 'cancelled'].map(st => (
                <button
                  key={st}
                  onClick={() => setOrderFilter(st)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-black capitalize transition-all select-none whitespace-nowrap ${
                    orderFilter === st
                      ? 'bg-amber-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>

            <div className="relative w-full md:max-w-xs self-end md:self-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                placeholder="Search by name, area or phone..."
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-gray-200"
              />
            </div>
          </div>

          {/* Table list */}
          {filteredOrders.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border border-gray-105 p-8">
              <ShoppingCart className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <h4 className="text-base font-bold text-gray-800">No Orders in Filter</h4>
              <p className="text-xs text-gray-400 max-w-sm mx-auto mt-1">
                There are currently no meal delivery orders matching this status filter or search text in our database.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto bg-white rounded-3xl border border-gray-100 shadow-xs">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-gray-50 text-gray-500 uppercase tracking-wider font-extrabold border-b border-gray-100">
                  <tr>
                    <th className="py-4 px-5">ID / Scheduled Time</th>
                    <th className="py-4 px-4">Customer info</th>
                    <th className="py-4 px-4">Items Summary</th>
                    <th className="py-4 px-4">Destination Area</th>
                    <th className="py-4 px-4">Total Price</th>
                    <th className="py-4 px-4">Logistics Status</th>
                    <th className="py-4 px-4 text-center">Receipt</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 font-medium text-gray-700">
                  {filteredOrders.map(order => (
                    <tr key={order.id} className="hover:bg-amber-50/20 transition-colors">
                      {/* ID and Date Slot */}
                      <td className="py-4 px-5 space-y-1">
                        <span className="font-mono text-[10px] text-amber-900 block font-bold">#{order.id.slice(0, 6)}</span>
                        <span className="block font-bold text-gray-900">{order.deliveryDate}</span>
                        <span className="block text-[10px] font-mono text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-sm w-max font-semibold">
                          {order.deliveryTimeSlot}
                        </span>
                      </td>

                      {/* Customer Info */}
                      <td className="py-4 px-4 space-y-1">
                        <p className="font-bold text-gray-900 flex items-center gap-1">
                          {order.customerName}
                          {order.isCorporate && (
                            <span className="text-[9px] uppercase font-black text-rose-700 bg-rose-50 border border-rose-100 px-1 py-0.2 rounded-sm shrink-0">
                              Corp
                            </span>
                          )}
                        </p>
                        <p className="text-gray-500">{order.phone}</p>
                        <p className="text-[10px] text-gray-400 font-mono line-clamp-1">{order.email}</p>
                      </td>

                      {/* Items */}
                      <td className="py-4 px-4">
                        <ul className="space-y-0.5">
                          {order.items.map((it, idx) => (
                            <li key={idx} className="text-xs text-gray-650">
                              <span className="font-bold font-mono text-amber-900 text-[11px]">{it.quantity}x</span> {it.mealName}
                            </li>
                          ))}
                        </ul>
                      </td>

                      {/* Area Address */}
                      <td className="py-4 px-4 space-y-1">
                        <p className="font-bold text-gray-800">{order.area}</p>
                        <p className="text-[10px] text-gray-550 max-w-[150px] line-clamp-2" title={order.address}>
                          {order.address}
                        </p>
                        {order.companyName && (
                          <p className="text-[10px] font-semibold text-rose-800 bg-rose-50/50 p-1 rounded-sm">
                            🏢 {order.companyName}
                          </p>
                        )}
                      </td>

                      {/* Total */}
                      <td className="py-4 px-4 space-y-1">
                        <span className="font-mono font-black text-[13px] text-gray-900">₹{order.totalPrice}</span>
                        <span className="block text-[10px] text-slate-400 font-semibold">{order.paymentMethod}</span>
                      </td>

                      {/* Status Dropdown selector */}
                      <td className="py-4 px-4">
                        <div className="space-y-1">
                          <span className={`inline-block px-2.5 py-0.5 rounded-sm text-[10px] font-black border uppercase ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                          
                          <select
                            value={order.status}
                            onChange={(e) => onUpdateOrderStatus(order.id, e.target.value as Order['status'])}
                            className="block w-full text-[11px] p-1 border border-gray-200 rounded-lg bg-white mt-1"
                          >
                            <option value="Pending">Pending</option>
                            <option value="Confirmed">Confirmed</option>
                            <option value="Out for Delivery">Out for Delivery</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>

                          {(order.status === 'Confirmed' || order.status === 'Cancelled' || order.status === 'Out for Delivery' || order.status === 'Delivered') && (
                            <button
                              onClick={() => {
                                let text = '';
                                const cleanPhone = order.phone.replace(/[^0-9]/g, '');
                                const formattedPhone = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;
                                
                                if (order.status === 'Confirmed') {
                                  text = `*Aaiswaad Rasoi - Order Confirmed!* 🍽️\n-----------------------------------\nHello ${order.customerName},\n\nYour scheduled order *#${order.id.slice(0,6).toUpperCase()}* has been *CONFIRMED*!\n\n📅 *Scheduled Date*: ${order.deliveryDate}\n⏰ *Time Slot*: ${order.deliveryTimeSlot}\n📍 *Address*: ${order.address}, ${order.area}\n💵 *Total Price*: ₹${order.totalPrice} (${order.paymentMethod})\n\nWe are preparing your meal box fresh. Thank you! 🙏`;
                                } else if (order.status === 'Cancelled') {
                                  text = `*Aaiswaad Rasoi - Order Cancelled* ❌\n-----------------------------------\nHello ${order.customerName},\n\nYour scheduled order *#${order.id.slice(0,6).toUpperCase()}* has been *CANCELLED*.\n\nFor any queries or to reschedule, please contact us on 9606225897. Sorry for any inconvenience! 🙏`;
                                } else if (order.status === 'Out for Delivery') {
                                  text = `*Aaiswaad Rasoi - Out for Delivery!* 🛵\n-----------------------------------\nHello ${order.customerName},\n\nYour fresh hot meal box *#${order.id.slice(0,6).toUpperCase()}* is now *OUT FOR DELIVERY*!\n\n🛵 Our delivery partner is on the way to your address: ${order.address}.\n💵 *Total Price*: ₹${order.totalPrice} to pay via ${order.paymentMethod}.\n\nGet ready to enjoy! 😋`;
                                } else if (order.status === 'Delivered') {
                                  text = `*Aaiswaad Rasoi - Delivered!* 🎉\n-----------------------------------\nHello ${order.customerName},\n\nYour hot meal box *#${order.id.slice(0,6).toUpperCase()}* has been *DELIVERED*!\n\nThank you for choosing Aaiswaad Rasoi. Please leave us your valuable feedback! 😋🍽️`;
                                }
                                
                                window.open(`https://wa.me/${formattedPhone}?text=${encodeURIComponent(text)}`, '_blank');
                              }}
                              className="mt-1.5 w-full py-1 px-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[9px] font-extrabold flex items-center justify-center gap-1 transition-colors select-none"
                              title="Send WhatsApp confirmation/cancellation update to customer"
                            >
                              <svg className="w-3 h-3 fill-current shrink-0" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm5.835-4.117c1.661.986 3.291 1.503 5.108 1.504 5.56 0 10.081-4.522 10.085-10.086.002-2.695-1.043-5.228-2.951-7.136C16.22 2.259 13.693 1.21 11.002 1.21 5.443 1.21 1.21 5.432 1.206 10.993c-.001 1.902.51 3.511 1.527 5.106L1.75 21.825l5.961-1.564z" /></svg>
                              <span>Send Status WA</span>
                            </button>
                          )}
                        </div>
                      </td>

                      {/* Print Receipt */}
                      <td className="py-4 px-4 text-center">
                        <button
                          onClick={() => setSelectedReceiptOrder(order)}
                          className="p-1 px-2 border border-gray-200 hover:bg-amber-100 rounded-lg text-[10px] font-bold text-amber-800 flex items-center gap-1 mx-auto cursor-pointer"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          <span>Slip</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Tab: Feedback/contacts Inbox */}
      {activeTab === 'contacts' && (
        <div className="space-y-4">
          {contactSubmissions.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-gray-105 p-8">
              <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <h4 className="text-base font-bold text-gray-800">Messages Inbox Empty</h4>
              <p className="text-xs text-gray-400 max-w-sm mx-auto mt-1">
                We haven&apos;t received any customer corporate catalog requests or general contacts yet. Try sending one on the Contact section!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {contactSubmissions.map((inq) => (
                <div key={inq.id} className="bg-white rounded-3xl border border-amber-100 shadow-xs p-6 space-y-4 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex justify-between items-start border-b border-amber-50 pb-2.5">
                      <div>
                        <span className="text-[10px] font-mono text-gray-450 uppercase tracking-widest block">{inq.createdAt}</span>
                        <h4 className="font-black text-gray-800 text-sm">{inq.subject}</h4>
                      </div>
                      <span className={`px-2 py-0.5 font-bold text-[10px] rounded-lg ${
                        inq.isCorporateInquiry 
                          ? 'bg-rose-150 text-rose-800 font-extrabold'
                          : 'bg-indigo-50 text-indigo-800'
                      }`}>
                        {inq.isCorporateInquiry ? '🏢 Tech-Park Bulk Interest' : 'General Contact'}
                      </span>
                    </div>

                    <div className="space-y-1 text-xs">
                      <p className="text-gray-800"><span className="text-gray-400 font-bold">Sender:</span> {inq.name}</p>
                      <p className="text-gray-855 font-mono"><span className="text-gray-400 font-bold">Phone:</span> {inq.phone}</p>
                      <p className="text-gray-550"><span className="text-gray-400 font-mono">Email:</span> {inq.email}</p>
                      {inq.companyName && (
                        <p className="text-rose-800 font-semibold bg-rose-50/50 p-1.5 rounded-lg w-max">
                          🏛️ Office: {inq.companyName}
                        </p>
                      )}
                    </div>

                    <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 text-xs text-gray-600 block italic leading-relaxed font-medium">
                      &ldquo;{inq.message}&rdquo;
                    </div>
                  </div>

                  <div className="pt-3 border-t border-gray-50 flex justify-between items-center text-[10px]">
                    <span className="text-gray-400 font-bold">Status: <span className="text-gray-600">{inq.status}</span></span>
                    
                    <button
                      onClick={() => onUpdateFeedbackStatus && onUpdateFeedbackStatus(inq.id, 'Replied')}
                      disabled={inq.status === 'Replied'}
                      className={`px-3 py-1 rounded-lg border text-[10px] font-black transition-all flex items-center gap-1 cursor-pointer select-none ${
                        inq.status === 'Replied'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
                          : 'border-amber-200 text-amber-900 bg-amber-50 hover:bg-amber-100'
                      }`}
                    >
                      <Check className="w-3 h-3" />
                      <span>{inq.status === 'Replied' ? 'Marked Solved' : 'Handle / Send Response'}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* MODAL MOCK RECEIPT SLIP POPUP */}
      {selectedReceiptOrder && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full border border-amber-100 p-6 space-y-5 shadow-2xl relative animate-scale-up font-mono">
            {/* Close */}
            <button
              onClick={() => setSelectedReceiptOrder(null)}
              className="absolute right-4 top-4 hover:bg-gray-150 p-1 rounded-full text-gray-450"
            >
              ✕
            </button>

            {/* Receipt Logo details */}
            <div className="text-center space-y-1">
              <span className="font-extrabold uppercase text-xs tracking-wider text-amber-800 block">*** AAISWAAD RASOI ***</span>
              <span className="text-[10px] text-gray-500 block">Pimpri Chinchwad, Pune</span>
              <span className="text-[9px] text-gray-450 block">------------------------------------------</span>
              <span className="text-xs font-bold block pt-1">MEAL DELIVERY KITCHEN TICKET</span>
            </div>

            {/* Ticket Metadata */}
            <div className="text-xs space-y-1 pt-1 font-semibold text-gray-600">
              <div className="flex justify-between"><span>TICKET NO:</span><span>#{selectedReceiptOrder.id.slice(0, 8).toUpperCase()}</span></div>
              <div className="flex justify-between"><span>DATE:</span><span>{selectedReceiptOrder.deliveryDate}</span></div>
              <div className="flex justify-between"><span>TIME SLOT:</span><span>{selectedReceiptOrder.deliveryTimeSlot}</span></div>
              <div className="flex justify-between"><span>PAY TYPE:</span><span className="font-black text-amber-900">{selectedReceiptOrder.paymentMethod}</span></div>
              <div className="flex justify-between"><span>STATUS:</span><span>{selectedReceiptOrder.status}</span></div>
            </div>

            <div className="text-[9px] text-gray-400 text-center">==========================================</div>

            {/* Items table */}
            <div className="space-y-1">
              <div className="flex justify-between text-[11px] font-bold text-gray-800">
                <span>ITEM</span>
                <span>QTY x PRICE</span>
              </div>
              <div className="space-y-1 pt-1">
                {selectedReceiptOrder.items.map((it, idx) => (
                  <div key={idx} className="flex justify-between text-xs text-gray-650">
                    <span className="truncate max-w-[190px]">{it.mealName}</span>
                    <span>{it.quantity} x ₹{it.price}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-[9px] text-gray-400 text-center">------------------------------------------</div>

            {/* Price Calculations */}
            <div className="text-xs font-bold space-y-1 text-gray-700">
              <div className="flex justify-between">
                <span>PLATE TOTAL:</span>
                <span>₹{selectedReceiptOrder.items.reduce((sum, it) => sum + (it.price * it.quantity), 0)}</span>
              </div>
              <div className="flex justify-between text-[11px] font-bold text-gray-500">
                <span>DELIVERY CHARGE:</span>
                <span>₹{selectedReceiptOrder.totalPrice - selectedReceiptOrder.items.reduce((sum, it) => sum + (it.price * it.quantity), 0)}</span>
              </div>
              <div className="flex justify-between text-base font-black text-amber-950 pt-2 border-t border-dashed border-gray-300">
                <span>NET PAYABLE:</span>
                <span>₹{selectedReceiptOrder.totalPrice}</span>
              </div>
            </div>

            <div className="text-[9px] text-gray-400 text-center">==========================================</div>

            {/* Address */}
            <div className="bg-gray-50 p-2.5 rounded-lg text-[10px] text-gray-500 space-y-1 whitespace-pre-wrap leading-normal">
              <span className="font-black text-gray-700 uppercase block">Ship To:</span>
              <p className="font-bold text-gray-800">{selectedReceiptOrder.customerName} ({selectedReceiptOrder.phone})</p>
              <p>Area: {selectedReceiptOrder.area}</p>
              {selectedReceiptOrder.companyName && <p>Office/Catering: {selectedReceiptOrder.companyName}</p>}
              <p>Address: {selectedReceiptOrder.address}</p>
              {selectedReceiptOrder.notes && <p className="text-rose-800 italic font-semibold">Chef Note: {selectedReceiptOrder.notes}</p>}
            </div>

            {/* Footer */}
            <div className="text-center text-[10px] text-amber-800 pt-2 animate-pulse">
              <span>*** Thank You on Behalf of Aaiswaad ***</span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
