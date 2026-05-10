import { motion } from 'motion/react';
import React from 'react';
import { 
  Hotel, 
  Utensils, 
  Car, 
  Navigation, 
  Plus, 
  PlusCircle, 
  MapPin, 
  Calendar,
  Sparkles,
  Info,
  Edit,
  Music,
  User
} from 'lucide-react';
import { useTrip } from '../context/TripContext';

export default function Plan() {
  const { budget, setBudget, spentByCategory, totalSpent, remainingBudget } = useTrip();

  const iconMap: Record<string, any> = {
    Dining: Utensils,
    Accommodation: Hotel,
    Transport: Car,
    Fun: Music,
    Personal: User
  };

  const allocation = [
    { name: 'Lưu trú', shadowName: 'Accommodation', key: 'Accommodation', pct: '35%', icon: Hotel },
    { name: 'Ăn uống', shadowName: 'Dining', key: 'Dining', pct: '25%', icon: Utensils },
    { name: 'Chi tiêu cá nhân', shadowName: 'Personal Expenses', key: 'Personal', pct: '15%', icon: User, highlight: true },
    { name: 'Di chuyển', shadowName: 'Transportation', key: 'Transport', pct: '15%', icon: Car },
    { name: 'Vui chơi', shadowName: 'Activities', key: 'Fun', pct: '10%', icon: Navigation },
  ];

  const handleBudgetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value.replace(/,/g, ''));
    if (!isNaN(val)) setBudget(val);
  };

  const spentPercent = Math.min(100, (totalSpent / budget) * 100);

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 space-y-12 pb-32">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-2">
          <span className="text-[10px] font-extrabold text-primary uppercase tracking-widest">Current Planning</span>
          <h2 className="text-3xl font-extrabold flex items-center gap-3">
            Hợp hành trình <Edit className="w-5 h-5 text-primary cursor-pointer" />
          </h2>
          <p className="text-secondary text-sm flex items-center gap-2">
            <Calendar className="w-4 h-4" /> Dec 12 - Dec 15, 2026 (4 Days)
          </p>
        </div>
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-stone-100 flex flex-col gap-2 min-w-[300px]">
          <label className="text-[10px] font-bold text-secondary uppercase tracking-widest">Total Budget</label>
          <div className="flex items-center gap-2 border-b-2 border-primary/20 pb-2">
            <span className="text-2xl font-bold text-primary">₫</span>
            <input 
              type="text" 
              value={budget.toLocaleString('vi-VN')}
              onChange={handleBudgetChange}
              className="bg-transparent border-none p-0 focus:ring-0 text-3xl font-extrabold w-full tracking-tighter" 
            />
          </div>
        </div>
      </header>

      <div className="grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-4">
          <section className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-stone-100 space-y-10">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-extrabold">Budget Allocation</h3>
              <button className="bg-primary-fixed/50 text-on-primary-fixed-variant px-4 py-2 rounded-full text-[10px] font-bold flex items-center gap-2 uppercase tracking-widest hover:bg-primary-fixed transition-colors">
                <Sparkles className="w-3 h-3" /> Automatically Allocate
              </button>
            </div>

            <div className="space-y-4">
              <div className="h-6 w-full flex rounded-full overflow-hidden shadow-inner bg-surface-container">
                <div className="bg-primary h-full transition-all duration-1000" style={{ width: `${spentPercent}%` }} />
              </div>
              <div className="flex justify-between items-center text-[10px] font-bold text-secondary uppercase tracking-widest px-1">
                <span>Spent: {totalSpent.toLocaleString('vi-VN')}đ</span>
                <span>Remaining: {remainingBudget.toLocaleString('vi-VN')}đ</span>
              </div>
            </div>

            <div className="space-y-3">
              {allocation.map((item, i) => {
                const spent = spentByCategory[item.key] || 0;
                const allocated = budget * (parseFloat(item.pct) / 100);
                const isOver = spent > allocated;

                return (
                  <div 
                    key={i} 
                    className={`flex items-center justify-between p-5 rounded-2xl transition-all border ${
                      item.highlight 
                        ? 'bg-primary/5 border-primary shadow-sm scale-[1.02]' 
                        : 'border-transparent hover:bg-surface-container-low'
                    }`}
                  >
                    <div className="flex items-center gap-5">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${item.highlight ? 'bg-primary text-white' : 'bg-surface-container-high text-primary'}`}>
                        <item.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <p className={`font-extrabold ${item.highlight ? 'text-primary' : 'text-on-surface'}`}>{item.name}</p>
                        <p className="text-[10px] text-secondary uppercase font-bold tracking-widest">{item.shadowName}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <span className={`text-[10px] font-bold px-3 py-1 rounded-full ${isOver ? 'bg-error text-white' : (item.highlight ? 'bg-primary text-white shadow-md' : 'bg-surface-container-highest text-secondary')}`}>
                        {item.pct}
                      </span>
                      <div className="text-right">
                        <p className={`text-xl font-extrabold tracking-tighter ${isOver ? 'text-error' : (item.highlight ? 'text-primary' : 'text-on-surface')}`}>
                          {allocated.toLocaleString('vi-VN')}
                        </p>
                        <p className="text-[8px] font-black text-stone-300 tracking-[0.2em] uppercase">VNĐ</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>

        <div className="lg:col-span-4 space-y-8">
          <div className="bg-primary text-white rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden group">
            <div className="relative z-10 space-y-6">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary-fixed" />
                <h4 className="font-extrabold text-xl font-display">Smart Suggestions</h4>
              </div>
              <div className="space-y-6">
                <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20">
                  <p className="text-[10px] font-bold text-white/50 uppercase tracking-widest mb-1">Daily Limit</p>
                  <p className="text-2xl font-extrabold tracking-tight">{(budget / 4).toLocaleString('vi-VN')} VNĐ / day</p>
                  <p className="text-[10px] text-white/40 mt-1 uppercase tracking-widest">Based on trip length</p>
                </div>
                <div className="flex gap-4">
                  <span className="shrink-0">💡</span>
                  <p className="text-sm leading-relaxed">
                    Với ngân sách này, bạn nên ưu tiên di chuyển bằng xe bus để tiết kiệm phí đi lại.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
