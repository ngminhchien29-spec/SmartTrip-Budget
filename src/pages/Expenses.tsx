import { motion } from 'motion/react';
import { 
  Hotel, 
  Utensils, 
  Car, 
  MoreHorizontal, 
  Plus, 
  Calendar,
  CloudLightning,
  Music,
  User,
  TrendingDown
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTrip, Expense } from '../context/TripContext';

export default function Expenses() {
  const { expenses, remainingBudget, budget, totalSpent, spentByCategory } = useTrip();

  const iconMap: Record<string, any> = {
    Dining: Utensils,
    Accommodation: Hotel,
    Transport: Car,
    Fun: Music,
    Personal: User
  };

  const categories: { name: Expense['category'], budget: string, color: string }[] = [
    { name: 'Dining', budget: ((spentByCategory['Dining'] || 0) / 1000000).toFixed(1), color: 'bg-orange-100 text-orange-600' },
    { name: 'Transport', budget: ((spentByCategory['Transport'] || 0) / 1000000).toFixed(1), color: 'bg-blue-100 text-blue-600' },
    { name: 'Accommodation', budget: ((spentByCategory['Accommodation'] || 0) / 1000000).toFixed(1), color: 'bg-emerald-100 text-emerald-600' },
    { name: 'Fun', budget: ((spentByCategory['Fun'] || 0) / 1000000).toFixed(1), color: 'bg-stone-100 text-stone-600' },
  ];

  const percentLeft = Math.max(0, Math.round((remainingBudget / budget) * 100));
  const dashOffset = 600 - (600 * percentLeft) / 100;

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight mb-2">Chi phí thực tế</h1>
          <p className="text-secondary font-medium">Quản lý ngân sách chuyến đi của bạn</p>
        </div>
        <div className="flex gap-3">
          <Link to="/add-expense" className="flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-2xl font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all">
            <Plus className="w-5 h-5" /> Nhập chi phí
          </Link>
          <button className="w-14 h-14 bg-white border border-stone-200 rounded-2xl flex items-center justify-center hover:bg-stone-50 transition-all shadow-sm">
            <CloudLightning className="w-6 h-6 text-primary" />
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* Progress & Summary */}
        <div className="lg:col-span-4 space-y-8">
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-stone-100 text-center"
          >
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-secondary mb-10">Ngân sách còn lại</h3>
            
            <div className="relative w-56 h-56 mx-auto mb-10">
              <svg className="w-full h-full transform -rotate-90">
                <circle className="text-surface-container-high" cx="112" cy="112" fill="transparent" r="95" stroke="currentColor" strokeWidth="12" />
                <motion.circle 
                  initial={{ strokeDashoffset: 600 }}
                  animate={{ strokeDashoffset: dashOffset }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="text-primary" 
                  cx="112" cy="112" fill="transparent" r="95" stroke="currentColor" strokeDasharray="600" strokeWidth="12" strokeLinecap="round" 
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-extrabold tracking-tighter">{percentLeft}%</span>
                <span className="text-[10px] font-extrabold text-secondary tracking-widest">CÒN LẠI</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 bg-surface-container-low p-6 rounded-2xl border border-stone-50">
              <div className="text-left">
                <p className="text-[10px] font-bold text-secondary uppercase mb-1">Tổng ngân sách</p>
                <p className="text-lg font-extrabold tracking-tighter">{(budget / 1000000).toFixed(1)}Mđ</p>
              </div>
              <div className="text-right border-l border-stone-100">
                <p className="text-[10px] font-bold text-secondary uppercase mb-1">Đã chi</p>
                <p className="text-lg font-extrabold tracking-tighter text-primary">{(totalSpent / 1000000).toFixed(1)}Mđ</p>
              </div>
            </div>
          </motion.section>

          {/* Banner CTA */}
          <div className="relative overflow-hidden bg-tertiary text-white rounded-[2.5rem] p-10 min-h-[300px] flex flex-col justify-end group">
            <img 
              src="https://images.unsplash.com/photo-1554224155-1696413565d3?auto=format&fit=crop&q=80&w=1000" 
              alt="Scan" 
              className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-30 group-hover:scale-110 transition-transform duration-700" 
            />
            <div className="relative z-10 space-y-4">
              <h4 className="text-2xl font-bold font-display">Quét hóa đơn</h4>
              <p className="text-white/70 text-sm leading-relaxed">Tự động nhận diện và phân loại chi tiêu từ ảnh chụp hóa đơn bằng AI.</p>
              <button className="w-full bg-white text-tertiary py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-stone-50 transition-all shadow-xl">
                Chụp ảnh ngay
              </button>
            </div>
          </div>
        </div>

        {/* Categories & Transactions */}
        <div className="lg:col-span-8 space-y-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((cat, i) => {
              const Icon = iconMap[cat.name] || MoreHorizontal;
              return (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  key={i} 
                  className="bg-white p-6 rounded-3xl border border-stone-100 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${cat.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <p className="text-[10px] font-bold text-secondary uppercase tracking-widest mb-1">{cat.name}</p>
                  <p className="text-xl font-extrabold tracking-tight">{cat.budget}Mđ</p>
                </motion.div>
              );
            })}
          </div>

          <section className="bg-white rounded-[2.5rem] shadow-sm border border-stone-100 overflow-hidden flex flex-col h-full">
            <div className="px-10 py-8 border-b border-stone-50 flex justify-between items-center">
              <h3 className="text-xl font-extrabold">Chi tiêu gần đây</h3>
              <button className="text-sm font-bold text-primary hover:underline underline-offset-4 transition-all">Xem tất cả</button>
            </div>
            
            <div className="divide-y divide-stone-50">
              {expenses.slice().reverse().map((tx, i) => {
                const Icon = iconMap[tx.category] || MoreHorizontal;
                return (
                  <div key={tx.id} className="px-10 py-6 flex items-center justify-between hover:bg-surface-container-low transition-colors cursor-pointer group">
                    <div className="flex items-center gap-6">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 bg-primary-fixed text-primary`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="font-extrabold text-on-surface mb-1">{tx.name}</p>
                        <p className="text-xs text-secondary flex items-center gap-2">
                          <Calendar className="w-3 h-3" /> {tx.date} • {tx.time}
                        </p>
                      </div>
                    </div>
                    <div className="text-right space-y-1">
                      <p className="font-extrabold text-lg tracking-tighter">-{tx.amount.toLocaleString('vi-VN')}đ</p>
                      <span className="text-[10px] font-bold px-2.5 py-1 bg-surface-container rounded-full text-secondary tracking-widest uppercase">{tx.category}</span>
                    </div>
                  </div>
                );
              })}
              {expenses.length === 0 && (
                <div className="p-20 text-center text-secondary font-medium italic">
                  Chưa có chi tiêu nào được ghi lại.
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
