import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  PlusCircle, 
  ChevronRight, 
  Sparkles, 
  AlertTriangle, 
  Lightbulb, 
  PieChart, 
  ArrowRight,
  TrendingDown,
  Navigation,
  Loader2
} from 'lucide-react';
import { useTrip } from '../context/TripContext';
import { getBudgetAdvice } from '../services/geminiService';

export default function SmartFeatures() {
  const { budget, totalSpent, expenses, remainingBudget } = useTrip();
  const [aiAdvice, setAiAdvice] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchAdvice() {
      setIsLoading(true);
      try {
        const advice = await getBudgetAdvice(budget, totalSpent, expenses);
        setAiAdvice(advice);
      } catch (error) {
        setAiAdvice('Hãy chi tiêu thông thái để tận hưởng chuyến đi trọn vẹn.');
      } finally {
        setIsLoading(false);
      }
    }
    fetchAdvice();
  }, [budget, totalSpent, expenses]);

  const spentPercent = (totalSpent / budget) * 100;

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 space-y-16">
      {/* Hero Header */}
      <header className="space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary-fixed text-on-primary-fixed-variant rounded-full text-[10px] font-extrabold uppercase tracking-[0.2em]">
          <Sparkles className="w-3 h-3 fill-current" />
          Trợ lý du lịch thông minh
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.1]">
          Lập kế hoạch <br className="hidden md:block" /> thông minh hơn.
        </h1>
        <p className="text-body-lg text-secondary max-w-2xl leading-relaxed">
          Sử dụng trí tuệ nhân tạo để tối ưu hóa ngân sách của bạn, nhận cảnh báo kịp thời và khám phá những trải nghiệm tuyệt vời với chi phí tiết kiệm nhất.
        </p>
      </header>

      {/* AI Advice Banner */}
      <section className="bg-primary-container/20 border border-primary/20 p-8 rounded-[2.5rem] relative overflow-hidden group min-h-[160px] flex items-center">
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 w-full">
          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-primary shadow-xl shrink-0 group-hover:scale-110 transition-transform">
            {isLoading ? <Loader2 className="w-8 h-8 animate-spin" /> : <Sparkles className="w-8 h-8" />}
          </div>
          <div className="flex-1 space-y-2 text-center md:text-left">
            <h3 className="font-extrabold text-lg text-primary tracking-tight">AI Advisor:</h3>
            <p className="text-on-primary-container font-medium italic transition-all">
              {isLoading ? 'Đang phân tích chi tiêu của bạn...' : aiAdvice}
            </p>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -translate-y-12 translate-x-12" />
      </section>

      {/* Main Feature Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* AI Recommendations */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:col-span-8 bg-white rounded-[2.5rem] p-10 shadow-sm border border-stone-100 flex flex-col lg:flex-row gap-10 items-stretch overflow-hidden relative group"
        >
          <div className="flex-1 space-y-10">
            <div>
              <h2 className="text-3xl font-extrabold mb-3">Gợi ý theo ngân sách</h2>
              <p className="text-secondary text-sm">Dựa trên {remainingBudget.toLocaleString('vi-VN')} VNĐ còn lại cho chuyến đi, chúng tôi đề xuất:</p>
            </div>
            
            <div className="space-y-4">
              {[
                { name: 'Khám phá ẩm thực đường phố', meta: 'Giá rẻ • Trải nghiệm địa phương', img: 'https://images.unsplash.com/photo-1541614101331-1a5a3a194e90?auto=format&fit=crop&q=80&w=300' },
                { name: 'Tiệm Cà Phê View Đẹp', meta: 'Trung bình • Không gian thư giãn', img: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=300' }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-6 p-4 bg-surface-container-low rounded-2xl border border-transparent hover:border-primary/20 hover:bg-white transition-all cursor-pointer shadow-sm">
                  <div className="w-20 h-20 rounded-xl overflow-hidden shadow-md">
                    <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-extrabold text-on-surface">{item.name}</h4>
                    <p className="text-[10px] uppercase font-bold tracking-widest text-secondary mt-1">{item.meta}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-primary" />
                </div>
              ))}
            </div>
          </div>
          
          <div className="hidden lg:block w-72 relative rounded-[1.5rem] overflow-hidden tonal-depth-2">
            <img 
              src="https://images.unsplash.com/photo-1506466010722-395aa2bef877?auto=format&fit=crop&q=80&w=800" 
              className="absolute inset-0 w-full h-full object-cover" 
              alt="Dalat"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent flex items-end p-6">
              <p className="text-white text-xs font-bold leading-relaxed">Khám phá hành trình theo cách thông minh nhất</p>
            </div>
          </div>
        </motion.section>

        {/* Warning Panel */}
        <aside className="md:col-span-4 bg-error-container/20 border border-error/10 rounded-[2.5rem] p-10 flex flex-col justify-between">
          <div className="space-y-8">
            <div className="w-14 h-14 bg-error-container rounded-2xl flex items-center justify-center text-on-error-container shadow-sm border border-error/5">
              <AlertTriangle className="w-8 h-8 fill-current" />
            </div>
            <h2 className="text-3xl font-extrabold text-on-error-container tracking-tight">Cảnh báo chi tiêu</h2>
            <p className="text-secondary leading-relaxed">
              {spentPercent > 90 
                ? 'Bạn đã chi tiêu vượt quá 90% ngân sách. Hãy cân nhắc cắt giảm các khoản không cần thiết.'
                : spentPercent > 50 
                ? `Bạn đã chi ${spentPercent.toFixed(0)}% ngân sách. Hãy theo dõi sát sao để không bị hụt tiền.`
                : 'Ngân sách của bạn hiện đang ở mức an toàn. Hãy tiếp tục tận hưởng chuyến đi!'}
            </p>
          </div>
          
          <div className="bg-white/80 p-6 rounded-[1.5rem] shadow-xl border border-stone-50 space-y-4">
            <div className="flex justify-between items-center text-[10px] font-extrabold tracking-widest">
              <span className="text-secondary">TIẾN ĐỘ CHI TIÊU</span>
              <span className={spentPercent > 90 ? 'text-error' : 'text-primary'}>{spentPercent.toFixed(0)}%</span>
            </div>
            <div className="h-2.5 w-full bg-stone-100 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${spentPercent}%` }}
                className={`h-full rounded-full shadow-sm ${spentPercent > 90 ? 'bg-error' : 'bg-primary'}`}
              />
            </div>
          </div>
        </aside>

        {/* Daily Tips */}
        <section className="col-span-1 md:col-span-12 lg:col-span-5 bg-tertiary-container/20 border border-tertiary-container/30 rounded-[2.5rem] p-10 space-y-10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-tertiary-container text-on-tertiary-container rounded-xl flex items-center justify-center shadow-sm">
              <Lightbulb className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-extrabold text-on-tertiary-container tracking-tight">Mẹo tiết kiệm</h2>
          </div>
          
          <ul className="space-y-8">
            {[
              { icon: '🚲', title: 'Thuê xe đạp thay vì taxi', desc: 'Đà Lạt rất thơ mộng để dạo quanh bằng xe đạp, tiết kiệm đến 150k mỗi ngày.' },
              { icon: '🍜', title: 'Thử món ăn vỉa hè', desc: 'Vừa ngon vừa rẻ, tránh các nhà hàng ngay trung tâm quảng trường du lịch.' },
              { icon: '🎫', title: 'Săn voucher giờ chót', desc: 'Check các ưu đãi trên ứng dụng cho các điểm tham quan như Thung Lũng Tình Yêu.' }
            ].map((tip, i) => (
              <li key={i} className="flex gap-6 group">
                <span className="text-3xl grayscale group-hover:grayscale-0 transition-all">{tip.icon}</span>
                <div className="space-y-1">
                  <h4 className="font-extrabold text-on-surface leading-tight text-lg">{tip.title}</h4>
                  <p className="text-sm text-secondary leading-relaxed">{tip.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Analytics Card */}
        <div className="md:col-span-6 lg:col-span-3 bg-surface-container-high rounded-[2.5rem] p-8 flex flex-col items-center justify-center text-center gap-6 group cursor-pointer border border-transparent hover:border-primary/10 transition-all">
          <div className="w-20 h-20 bg-white rounded-3xl shadow-xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300">
            <PieChart className="w-10 h-10" />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-extrabold">Phân tích</h3>
            <p className="text-xs text-secondary leading-relaxed px-4">Xem biểu đồ chi tiết các khoản đã chi theo từng danh mục.</p>
          </div>
        </div>

        {/* Challenge Card */}
        <div className="md:col-span-6 lg:col-span-4 bg-primary text-white rounded-[2.5rem] p-10 relative overflow-hidden group cursor-pointer shadow-2xl">
          <div className="relative z-10 h-full flex flex-col justify-between">
            <div className="space-y-4">
              <h3 className="text-3xl font-extrabold tracking-tight">Thử Thách <br/> Tiết Kiệm</h3>
              <p className="text-primary-fixed/60 text-sm leading-relaxed max-w-[200px]">Hoàn thành mục tiêu chi tiêu dưới 5 triệu cho chuyến đi 3 ngày.</p>
            </div>
            <button className="self-start mt-10 px-8 py-3 bg-white text-primary rounded-full font-bold text-sm shadow-xl active:scale-95 transition-all">
              Tham gia ngay
            </button>
          </div>
          {/* Abstract SVG Background */}
          <TrendingDown className="absolute -bottom-10 -right-10 w-48 h-48 opacity-10 group-hover:scale-125 transition-transform duration-700 -rotate-12" />
        </div>
      </div>
    </div>
  );
}
