import { useState } from 'react';
import React from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  MapPin, 
  Utensils, 
  Hotel, 
  Car, 
  Music, 
  User, 
  Camera, 
  PlusCircle, 
  Calendar, 
  Clock,
  Info,
  DollarSign
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTrip, Expense } from '../context/TripContext';

export default function AddExpense() {
  const navigate = useNavigate();
  const { addExpense, remainingBudget, budget } = useTrip();
  
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<Expense['category']>('Dining');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState('12:00');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !amount) return;

    addExpense({
      name,
      amount: parseFloat(amount),
      category,
      date,
      time
    });
    navigate('/expenses');
  };

  const categories: { name: Expense['category'], icon: any }[] = [
    { name: 'Dining', icon: Utensils },
    { name: 'Accommodation', icon: Hotel },
    { name: 'Transport', icon: Car },
    { name: 'Fun', icon: Music },
    { name: 'Personal', icon: User }
  ];

  const percentUsed = Math.min(100, Math.round(((budget - remainingBudget) / budget) * 100));

  return (
    <div className="min-h-screen bg-surface-container-low pb-32">
      <header className="bg-white border-b border-stone-100 sticky top-0 z-50">
        <div className="max-w-xl mx-auto flex items-center justify-between px-6 py-5">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate(-1)} className="p-1 hover:bg-surface-container rounded-full transition-colors">
              <ArrowLeft className="w-6 h-6 text-secondary" />
            </button>
            <h1 className="text-2xl font-extrabold tracking-tight">SmartTrip Budget</h1>
          </div>
          <User className="w-6 h-6 text-primary" />
        </div>
      </header>

      <main className="max-w-xl mx-auto px-6 py-10 space-y-8">
        {/* Budget Status */}
        <section className="bg-white rounded-[2rem] p-8 mt-2 shadow-2xl shadow-tertiary/5 border border-stone-50 space-y-6">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <p className="text-[10px] font-bold text-secondary uppercase tracking-[0.2em]">Remaining Budget</p>
              <h2 className="text-4xl font-extrabold tracking-tighter text-primary">
                {remainingBudget.toLocaleString('vi-VN')}đ
              </h2>
            </div>
            <div className={`w-14 h-14 rounded-full border-[6px] ${percentUsed > 90 ? 'border-error' : 'border-primary-fixed'} flex items-center justify-center text-primary font-black text-xs`}>
              {100 - percentUsed}%
            </div>
          </div>
          <div className="h-2.5 w-full bg-surface-container-high rounded-full overflow-hidden">
            <div className={`h-full rounded-full shadow-sm transition-all duration-1000 ${percentUsed > 90 ? 'bg-error' : 'bg-primary'}`} style={{ width: `${percentUsed}%` }} />
          </div>
          <p className="text-[10px] font-bold text-secondary uppercase tracking-widest flex items-center gap-2">
            <Info className="w-4 h-4 text-primary" /> {percentUsed > 90 ? 'Cảnh báo: Bạn gần hết ngân sách!' : 'Hãy tiếp tục chi tiêu hợp lý.'}
          </p>
        </section>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="space-y-10">
          <div className="space-y-8">
            {/* Location */}
            <div className="space-y-3">
              <label className="text-xs font-black text-secondary uppercase tracking-[0.2em] ml-1">Location or Activity Name</label>
              <div className="relative group">
                <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-300 group-focus-within:text-primary transition-colors" />
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Da Nang Beach Cafe" 
                  className="w-full pl-14 pr-6 py-5 bg-white rounded-2xl border-none focus:ring-2 focus:ring-primary/10 font-bold" 
                />
              </div>
            </div>

            {/* Amount */}
            <div className="space-y-3">
              <label className="text-xs font-black text-secondary uppercase tracking-[0.2em] ml-1">Amount Spent (VND)</label>
              <div className="relative group">
                <DollarSign className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-primary" />
                <input 
                  type="number" 
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0" 
                  className="w-full pl-14 pr-16 py-6 bg-white rounded-2xl border-none focus:ring-2 focus:ring-primary/10 text-3xl font-black text-primary" 
                />
                <span className="absolute right-6 top-1/2 -translate-y-1/2 text-xs font-black text-stone-300">VND</span>
              </div>
            </div>

            {/* Categories */}
            <div className="space-y-4">
              <label className="text-xs font-black text-secondary uppercase tracking-[0.2em] ml-1">Category</label>
              <div className="flex flex-wrap gap-3">
                {categories.map((cat, i) => (
                  <button 
                    key={i} 
                    type="button"
                    onClick={() => setCategory(cat.name)}
                    className={`flex items-center gap-3 px-6 py-3 rounded-full text-sm font-bold transition-all shadow-sm ${
                      category === cat.name ? 'bg-primary text-white' : 'bg-white text-secondary hover:bg-stone-50'
                    }`}
                  >
                    <cat.icon className="w-4 h-4" /> {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Date Time */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-secondary uppercase tracking-widest ml-1">Date</label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-300" />
                  <input 
                    type="date" 
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full pl-12 py-4 bg-white rounded-xl border-none font-bold text-sm" 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-secondary uppercase tracking-widest ml-1">Time</label>
                <div className="relative">
                  <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-300" />
                  <input 
                    type="time" 
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full pl-12 py-4 bg-white rounded-xl border-none font-bold text-sm" 
                  />
                </div>
              </div>
            </div>

            {/* Receipt Upload */}
            <div className="pt-4">
              <div className="border-4 border-dashed border-stone-100 rounded-[2rem] p-12 flex flex-col items-center justify-center text-center gap-4 bg-white/50 hover:bg-white transition-all cursor-pointer group group-hover:border-primary/20">
                <div className="w-16 h-16 bg-primary-fixed/50 text-primary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-xl shadow-primary/5">
                  <Camera className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="text-lg font-extrabold group-hover:text-primary transition-colors">Upload or Scan Receipt</h4>
                  <p className="text-[10px] font-bold text-secondary uppercase tracking-tighter opacity-60">Auto-detect amount and category</p>
                </div>
              </div>
            </div>
          </div>

          <button 
            type="submit"
            className="w-full py-6 bg-primary text-white rounded-3xl font-extrabold text-xl shadow-2xl shadow-primary/30 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3"
          >
            <PlusCircle className="w-7 h-7" /> Add Expense
          </button>
        </form>
      </main>
    </div>
  );
}
