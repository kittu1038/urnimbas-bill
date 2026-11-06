import React, { useState, useMemo } from 'react';
import { 
  Plus, 
  Trash2, 
  Printer, 
  RefreshCw, 
  Hash, 
  Calendar, 
  User, 
  Phone, 
  QrCode,
  Tag,
  CheckCircle2
} from 'lucide-react';

export default function App() {
  // Invoice Header & Metadata State
  const [invoice, setInvoice] = useState({
    invoiceNumber: 'URN-2026-089X',
    date: new Date().toISOString().split('T')[0],
    customerName: 'Aarav Sharma',
    customerPhone: '+91 98765 43210',
    seasonCode: 'SS-26 ARCHIVE',
    paymentStatus: 'PAID // VERIFIED',
    currency: '₹',
  });

  // Dynamic Line Items State
  const [items, setItems] = useState([
    {
      id: '1',
      name: 'HEAVYWEIGHT OVERSIZED HOODIE [ACID WASH - L]',
      qty: 1,
      price: 4999,
    },
    {
      id: '2',
      name: 'RAW HEM TACTICAL CARGO PANTS [MUTED OLIVE - 32]',
      qty: 2,
      price: 3499,
    },
    {
      id: '3',
      name: 'URNIMBAS DISTRESSED LOGO TEE [CHALK WHITE - M]',
      qty: 1,
      price: 1899,
    },
  ]);

  // Financial Auto-Calculation
  const subtotal = useMemo(() => {
    return items.reduce((acc, item) => acc + (Number(item.qty) || 0) * (Number(item.price) || 0), 0);
  }, [items]);

  const grandTotal = subtotal;

  // Handlers
  const handleItemChange = (id, field, value) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const addItem = () => {
    const newItem = {
      id: Date.now().toString(),
      name: '',
      qty: 1,
      price: 0,
    };
    setItems((prev) => [...prev, newItem]);
  };

  const removeItem = (id) => {
    if (items.length <= 1) {
      alert('The bill must contain at least one item.');
      return;
    }
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const resetTemplate = () => {
    if (window.confirm('Reset invoice with empty fields?')) {
      setInvoice({
        invoiceNumber: `URN-${Math.floor(1000 + Math.random() * 9000)}-X`,
        date: new Date().toISOString().split('T')[0],
        customerName: '',
        customerPhone: '',
        seasonCode: 'SS-26 ARCHIVE',
        paymentStatus: 'PAID // VERIFIED',
        currency: '₹',
      });
      setItems([
        {
          id: Date.now().toString(),
          name: '',
          qty: 1,
          price: 0,
        },
      ]);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#F5F2EB] text-[#0D0D0D] font-mono selection:bg-[#E65100] selection:text-white pb-28 md:py-10">
      
      {/* Top Bar for Desktop & Tablet Controls */}
      <header className="print-hidden max-w-4xl mx-auto px-4 py-3 flex items-center justify-between border-b border-[#0D0D0D]/10 mb-4 text-xs">
        <div className="flex items-center gap-2 tracking-widest text-[#5C6B47] font-bold uppercase">
          <span className="w-2 h-2 rounded-full bg-[#E65100] animate-pulse"></span>
          POS TERMINAL // URNIMBAS STUDIO v2.6
        </div>
        <div className="flex items-center gap-2">
          <button 
            type="button"
            onClick={resetTemplate}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-semibold uppercase bg-neutral-200/90 hover:bg-neutral-300 transition-colors"
            title="Reset Invoice"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </button>
          <button 
            type="button"
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-4 py-2 rounded text-xs font-bold uppercase bg-[#0D0D0D] text-[#FAF8F5] hover:bg-[#E65100] transition-colors shadow-sm"
          >
            <Printer className="w-3.5 h-3.5 text-[#E65100]" />
            <span>Print / Save PDF</span>
          </button>
        </div>
      </header>

      {/* Main Invoice Sheet (Mobile first, desktop A4-proportioned layout) */}
      <main className="max-w-4xl mx-auto bg-[#FAF8F5] md:border-2 md:border-[#0D0D0D] md:shadow-[8px_8px_0px_0px_#0D0D0D] p-4 sm:p-6 md:p-10 transition-all">
        
        {/* Streetwear Header Section */}
        <section className="border-b-2 border-[#0D0D0D] pb-5 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter uppercase font-sans leading-none text-[#0D0D0D]">
                  URNIMBAS
                </h1>
                <span className="text-[10px] bg-[#5C6B47] text-[#FAF8F5] font-bold px-2 py-0.5 tracking-widest uppercase">
                  ARCHIVE DIV.
                </span>
              </div>
              <p className="text-xs uppercase tracking-widest text-[#0D0D0D]/70 mt-1 font-bold">
                RAW LUXURY // INDUSTRIAL STREETWEAR & APPAREL
              </p>
              <p className="text-[11px] text-[#0D0D0D]/50 mt-0.5">
                STUDIO 09, DISTRICT 4 // NEW DELHI - MUMBAI // WEB: URNIMBAS.COM
              </p>
            </div>

            {/* Invoice Tag / Season */}
            <div className="w-full md:w-auto flex flex-col items-start md:items-end gap-1 text-xs">
              <div className="inline-flex items-center gap-1.5 bg-[#0D0D0D] text-[#FAF8F5] px-3 py-1 font-bold text-xs tracking-wider uppercase">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#E65100]" />
                <span>OFFICIAL TAX INVOICE</span>
              </div>
              <div className="flex items-center gap-1 text-[11px] text-[#5C6B47] font-semibold mt-1">
                <span>COLLECTION:</span>
                <input
                  type="text"
                  value={invoice.seasonCode}
                  onChange={(e) => setInvoice({ ...invoice, seasonCode: e.target.value })}
                  className="bg-transparent border-b border-dotted border-[#5C6B47] font-bold uppercase focus:outline-none focus:border-[#E65100] text-right w-32"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Invoice Info & Client Details Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-6 border-b border-[#0D0D0D]/20 text-xs">
          
          {/* Bill Meta Box */}
          <div className="space-y-2.5 bg-[#F0EDE4] p-3.5 border border-[#0D0D0D]/15">
            <div className="text-[10px] font-bold uppercase tracking-wider text-[#0D0D0D]/60 flex items-center gap-1">
              <Hash className="w-3 h-3 text-[#E65100]" /> TRANSACTION SPEC
            </div>

            <div className="flex items-center justify-between">
              <span className="font-semibold text-[#0D0D0D]/70 uppercase">Invoice #:</span>
              <input 
                type="text"
                value={invoice.invoiceNumber}
                onChange={(e) => setInvoice({ ...invoice, invoiceNumber: e.target.value })}
                className="font-bold text-right bg-transparent border-b border-[#0D0D0D]/30 focus:border-[#E65100] focus:bg-white px-1.5 py-0.5 focus:outline-none transition-all"
                placeholder="URN-0000"
              />
            </div>

            <div className="flex items-center justify-between">
              <span className="font-semibold text-[#0D0D0D]/70 uppercase">Date:</span>
              <input 
                type="date"
                value={invoice.date}
                onChange={(e) => setInvoice({ ...invoice, date: e.target.value })}
                className="font-semibold text-right bg-transparent border-b border-[#0D0D0D]/30 focus:border-[#E65100] focus:bg-white px-1.5 py-0.5 focus:outline-none transition-all"
              />
            </div>

            <div className="flex items-center justify-between">
              <span className="font-semibold text-[#0D0D0D]/70 uppercase">Status:</span>
              <input 
                type="text"
                value={invoice.paymentStatus}
                onChange={(e) => setInvoice({ ...invoice, paymentStatus: e.target.value })}
                className="font-bold text-[#5C6B47] text-right bg-transparent border-b border-[#5C6B47]/30 focus:border-[#E65100] focus:bg-white px-1.5 py-0.5 focus:outline-none transition-all uppercase"
              />
            </div>
          </div>

          {/* Customer Meta Box */}
          <div className="space-y-2.5 bg-[#F0EDE4] p-3.5 border border-[#0D0D0D]/15">
            <div className="text-[10px] font-bold uppercase tracking-wider text-[#0D0D0D]/60 flex items-center gap-1">
              <User className="w-3 h-3 text-[#E65100]" /> CUSTOMER CREDENTIALS
            </div>

            <div className="flex items-center justify-between">
              <span className="font-semibold text-[#0D0D0D]/70 uppercase">Client Name:</span>
              <input 
                type="text"
                value={invoice.customerName}
                onChange={(e) => setInvoice({ ...invoice, customerName: e.target.value })}
                className="font-bold text-right bg-transparent border-b border-[#0D0D0D]/30 focus:border-[#E65100] focus:bg-white px-1.5 py-0.5 focus:outline-none transition-all w-44 sm:w-56"
                placeholder="Client Name"
              />
            </div>

            <div className="flex items-center justify-between">
              <span className="font-semibold text-[#0D0D0D]/70 uppercase">Phone / WA:</span>
              <input 
                type="tel"
                value={invoice.customerPhone}
                onChange={(e) => setInvoice({ ...invoice, customerPhone: e.target.value })}
                className="font-bold text-right bg-transparent border-b border-[#0D0D0D]/30 focus:border-[#E65100] focus:bg-white px-1.5 py-0.5 focus:outline-none transition-all w-44 sm:w-56"
                placeholder="+91 00000 00000"
              />
            </div>

            <div className="flex items-center justify-between">
              <span className="font-semibold text-[#0D0D0D]/70 uppercase">Currency:</span>
              <select
                value={invoice.currency}
                onChange={(e) => setInvoice({ ...invoice, currency: e.target.value })}
                className="font-bold bg-transparent border-b border-[#0D0D0D]/30 focus:border-[#E65100] focus:outline-none text-right cursor-pointer"
              >
                <option value="₹">₹ (INR)</option>
                <option value="$">$ (USD)</option>
                <option value="€">€ (EUR)</option>
                <option value="£">£ (GBP)</option>
              </select>
            </div>
          </div>
        </section>

        {/* Dynamic Items Table Section */}
        <section className="my-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xs font-black uppercase tracking-widest flex items-center gap-1.5">
              <span>// LINE ITEMS & MERCHANDISE</span>
              <span className="text-[10px] bg-[#0D0D0D] text-[#FAF8F5] px-1.5 py-0.5 font-bold">
                [{items.length}]
              </span>
            </h2>
            <span className="text-[10px] text-[#0D0D0D]/50 uppercase hidden sm:inline">
              * Tap any field to edit directly
            </span>
          </div>

          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto border-2 border-[#0D0D0D]">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#0D0D0D] text-[#FAF8F5] text-[11px] uppercase tracking-wider font-bold">
                  <th className="py-2.5 px-3 w-12 text-center">#</th>
                  <th className="py-2.5 px-3">Garment / Description</th>
                  <th className="py-2.5 px-3 w-20 text-center">Qty</th>
                  <th className="py-2.5 px-3 w-32 text-right">Price ({invoice.currency})</th>
                  <th className="py-2.5 px-3 w-32 text-right">Total ({invoice.currency})</th>
                  <th className="py-2.5 px-2 w-10 text-center print-hidden">Del</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#0D0D0D]/15 text-xs">
                {items.map((item, idx) => {
                  const lineTotal = (Number(item.qty) || 0) * (Number(item.price) || 0);
                  return (
                    <tr key={item.id} className="hover:bg-neutral-100/80 transition-colors">
                      <td className="py-3 px-3 text-center font-bold text-[#0D0D0D]/40">
                        {String(idx + 1).padStart(2, '0')}
                      </td>
                      <td className="py-2 px-3">
                        <input
                          type="text"
                          value={item.name}
                          onChange={(e) => handleItemChange(item.id, 'name', e.target.value)}
                          placeholder="Garment Name / Size / Colorway"
                          className="w-full bg-transparent font-bold text-[#0D0D0D] border-b border-transparent hover:border-[#0D0D0D]/30 focus:border-[#E65100] focus:bg-white focus:outline-none py-1 transition-all"
                        />
                      </td>
                      <td className="py-2 px-3 text-center">
                        <input
                          type="number"
                          min="1"
                          value={item.qty}
                          onChange={(e) => handleItemChange(item.id, 'qty', Math.max(1, parseInt(e.target.value) || 0))}
                          className="w-14 text-center font-bold bg-transparent border border-transparent hover:border-[#0D0D0D]/30 focus:border-[#E65100] focus:bg-white focus:outline-none py-1 transition-all"
                        />
                      </td>
                      <td className="py-2 px-3 text-right">
                        <input
                          type="number"
                          min="0"
                          value={item.price}
                          onChange={(e) => handleItemChange(item.id, 'price', parseFloat(e.target.value) || 0)}
                          className="w-24 text-right font-bold bg-transparent border border-transparent hover:border-[#0D0D0D]/30 focus:border-[#E65100] focus:bg-white focus:outline-none py-1 transition-all"
                        />
                      </td>
                      <td className="py-3 px-3 text-right font-black text-[#0D0D0D]">
                        {lineTotal.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </td>
                      <td className="py-2 px-2 text-center print-hidden">
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="text-[#0D0D0D]/30 hover:text-red-600 transition-colors p-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4 mx-auto" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile Stacking Cards (Touch-friendly 44px+ for smartphones) */}
          <div className="md:hidden space-y-3">
            {items.map((item, idx) => {
              const lineTotal = (Number(item.qty) || 0) * (Number(item.price) || 0);
              return (
                <div 
                  key={item.id} 
                  className="bg-[#F0EDE4] border border-[#0D0D0D]/20 p-3.5 space-y-3 relative shadow-sm"
                >
                  <div className="flex items-center justify-between gap-2 border-b border-[#0D0D0D]/10 pb-2">
                    <span className="text-[10px] font-black bg-[#0D0D0D] text-[#FAF8F5] px-2 py-0.5 uppercase tracking-wider">
                      ITEM #{String(idx + 1).padStart(2, '0')}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="print-hidden text-red-600 active:scale-95 text-xs flex items-center gap-1 font-bold uppercase p-1.5"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold uppercase text-[#0D0D0D]/60 block mb-0.5">
                      Garment Description
                    </label>
                    <input
                      type="text"
                      value={item.name}
                      onChange={(e) => handleItemChange(item.id, 'name', e.target.value)}
                      placeholder="e.g. Acid Wash Hoodie [L - BLK]"
                      className="w-full bg-white border border-[#0D0D0D]/20 font-bold text-sm px-3 py-2.5 focus:border-[#E65100] focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div>
                      <label className="text-[10px] font-bold uppercase text-[#0D0D0D]/60 block mb-0.5">
                        Qty
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={item.qty}
                        onChange={(e) => handleItemChange(item.id, 'qty', Math.max(1, parseInt(e.target.value) || 0))}
                        className="w-full bg-white border border-[#0D0D0D]/20 font-bold px-2 py-2 text-center text-sm focus:border-[#E65100] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold uppercase text-[#0D0D0D]/60 block mb-0.5">
                        Price ({invoice.currency})
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={item.price}
                        onChange={(e) => handleItemChange(item.id, 'price', parseFloat(e.target.value) || 0)}
                        className="w-full bg-white border border-[#0D0D0D]/20 font-bold px-2 py-2 text-right text-sm focus:border-[#E65100] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold uppercase text-[#0D0D0D]/60 block mb-0.5">
                        Subtotal
                      </label>
                      <div className="h-[42px] flex items-center justify-end px-2 font-black text-xs bg-[#E5E0D5] border border-[#0D0D0D]/20">
                        {invoice.currency} {lineTotal.toLocaleString('en-IN')}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Add Item Action Button */}
          <div className="mt-3 print-hidden">
            <button
              type="button"
              onClick={addItem}
              className="w-full md:w-auto min-h-[44px] flex items-center justify-center gap-2 px-5 py-2.5 bg-[#FAF8F5] border-2 border-dashed border-[#0D0D0D] font-bold text-xs uppercase tracking-wider text-[#0D0D0D] hover:bg-[#0D0D0D] hover:text-[#FAF8F5] active:scale-[0.99] transition-all"
            >
              <Plus className="w-4 h-4 text-[#E65100]" />
              <span>Add New Garment / Line Item</span>
            </button>
          </div>
        </section>

        {/* Calculation Summary & Total Due */}
        <section className="border-t-2 border-[#0D0D0D] pt-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start gap-6">
            
            {/* Left Streetwear Brand Aesthetic Element (Barcode + Tag) */}
            <div className="w-full md:w-1/2 space-y-3">
              <div className="text-[11px] font-bold uppercase tracking-widest text-[#5C6B47]">
                // AUTHENTIC GARMENT MANIFEST
              </div>
              <p className="text-[11px] text-[#0D0D0D]/70 leading-relaxed">
                Thank you for supporting URNIMBAS independent production. Every garment is crafted with heavyweight Japanese and Indian artisanal fabrics with raw unfinished details.
              </p>
              
              {/* Decorative Raw Barcode */}
              <div className="pt-2">
                <div className="flex items-center gap-[3px] h-9 w-full max-w-[280px] bg-white p-1.5 border border-[#0D0D0D]">
                  {[3, 1, 4, 1, 2, 5, 1, 3, 2, 4, 1, 2, 3, 1, 4, 2, 1, 3, 4, 1, 2, 3, 1, 5, 2, 1, 4].map((w, i) => (
                    <div 
                      key={i} 
                      className="h-full bg-[#0D0D0D]" 
                      style={{ width: `${w * 2}px` }}
                    />
                  ))}
                </div>
                <div className="text-[9px] tracking-[0.25em] uppercase font-mono text-[#0D0D0D]/60 mt-1">
                  * 8 9 0 4 2 1 7 8 2 0 2 6 9 *
                </div>
              </div>
            </div>

            {/* Right Financial Block */}
            <div className="w-full md:w-5/12 bg-[#F0EDE4] p-4 border border-[#0D0D0D]">
              <div className="space-y-2 text-xs border-b border-[#0D0D0D]/20 pb-3">
                <div className="flex justify-between items-center text-[#0D0D0D]/70">
                  <span className="uppercase font-semibold">Subtotal:</span>
                  <span className="font-bold">
                    {invoice.currency} {subtotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="flex justify-between items-center text-[#5C6B47]">
                  <span className="uppercase font-semibold">Shipping / Courier:</span>
                  <span className="font-bold uppercase tracking-wider text-[11px]">Complimentary</span>
                </div>
                <div className="flex justify-between items-center text-[#0D0D0D]/70">
                  <span className="uppercase font-semibold">Taxes:</span>
                  <span className="font-bold">
                    {invoice.currency} 0.00 (Inclusive)
                  </span>
                </div>
              </div>

              {/* Grand Total Raw Block */}
              <div className="pt-3">
                <div className="text-[10px] uppercase font-bold tracking-widest text-[#E65100]">
                  Grand Total Due
                </div>
                <div className="text-2xl sm:text-3xl font-black tracking-tight text-[#0D0D0D] flex items-center justify-between mt-0.5">
                  <span>{invoice.currency}</span>
                  <span>{grandTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="text-[10px] text-[#0D0D0D]/60 uppercase tracking-wider mt-1 text-right font-semibold">
                  Payment Method: UPI / Instant Wire
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Footer: UPI QR Code & Streetwear Terms */}
        <footer className="border-t-2 border-[#0D0D0D] pt-6 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          
          {/* Terms & Return Policy */}
          <div className="md:col-span-2 space-y-1.5 text-[11px]">
            <div className="font-black uppercase tracking-wider text-[#0D0D0D] flex items-center gap-1.5">
              <span className="w-2 h-2 bg-[#E65100]"></span>
              TERMS & CONDITIONS // STRICT POLICY
            </div>
            <ul className="text-[#0D0D0D]/75 space-y-1 list-none font-mono text-[10px] uppercase">
              <li className="font-bold text-[#0D0D0D]">1. NO RETURN, NO EXCHANGE UNDER ANY CIRCUMSTANCES.</li>
              <li>2. All archive drops and distressed garments possess unique raw finishes.</li>
              <li>3. Claims for transit damage require an unedited package unboxing video within 24 hours.</li>
              <li>4. Cold wash only. Hang dry in shade. Do not iron directly on print.</li>
            </ul>
          </div>

          {/* UPI QR Code Placeholder Frame */}
          <div className="flex flex-col items-center justify-center p-3 border-2 border-dashed border-[#0D0D0D] bg-[#F0EDE4] text-center">
            <div className="relative p-2 bg-white border border-[#0D0D0D]">
              {/* Corner brackets */}
              <span className="absolute -top-1 -left-1 w-2 h-2 border-t-2 border-l-2 border-[#E65100]"></span>
              <span className="absolute -top-1 -right-1 w-2 h-2 border-t-2 border-r-2 border-[#E65100]"></span>
              <span className="absolute -bottom-1 -left-1 w-2 h-2 border-b-2 border-l-2 border-[#E65100]"></span>
              <span className="absolute -bottom-1 -right-1 w-2 h-2 border-b-2 border-r-2 border-[#E65100]"></span>
              
              {/* UPI QR Code Vector Mockup */}
              <div className="w-24 h-24 bg-[#0D0D0D] flex flex-col items-center justify-center p-1.5 text-white">
                <div className="grid grid-cols-6 gap-1 w-full h-full bg-white p-1">
                  <div className="col-span-2 row-span-2 bg-black"></div>
                  <div className="col-span-2 bg-black"></div>
                  <div className="col-span-2 row-span-2 bg-black"></div>
                  <div className="col-span-2 bg-black"></div>
                  <div className="col-span-2 bg-black"></div>
                  <div className="col-span-1 bg-black"></div>
                  <div className="col-span-2 bg-black"></div>
                  <div className="col-span-1 bg-black"></div>
                  <div className="col-span-2 row-span-2 bg-black"></div>
                  <div className="col-span-2 bg-black"></div>
                  <div className="col-span-2 row-span-2 bg-black"></div>
                </div>
              </div>
            </div>

            <div className="mt-2 text-[10px] font-bold uppercase tracking-wider text-[#0D0D0D]">
              SCAN TO PAY VIA UPI
            </div>
            <div className="text-[9px] font-mono text-[#5C6B47] font-semibold mt-0.5">
              VPA: urnimbas@upi
            </div>
          </div>

        </footer>

        {/* End Mark */}
        <div className="text-center text-[10px] uppercase tracking-[0.3em] text-[#0D0D0D]/40 mt-8 pt-4 border-t border-dotted border-[#0D0D0D]/30">
          /// URNIMBAS STUDIO APPAREL // ALL RIGHTS RESERVED ///
        </div>

      </main>

      {/* Floating Action Button (FAB) on Mobile - 100% Touch Friendly */}
      <aside className="md:hidden fixed bottom-5 right-5 z-50 print-hidden">
        <button
          type="button"
          onClick={handlePrint}
          className="flex items-center gap-2 bg-[#0D0D0D] text-[#FAF8F5] px-5 py-3.5 rounded-full shadow-[4px_4px_0px_0px_#E65100] active:scale-95 transition-transform font-bold text-xs uppercase tracking-wider"
        >
          <Printer className="w-4 h-4 text-[#E65100]" />
          <span>Save PDF / Print</span>
        </button>
      </aside>

    </div>
  );
}
