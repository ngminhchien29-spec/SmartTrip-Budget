import { motion } from 'motion/react';
import { 
  PlusCircle, 
  ArrowRight, 
  Target, 
  Sparkles, 
  AlertCircle, 
  CheckCircle2,
  TrendingDown,
  Navigation
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTrip } from '../context/TripContext';

export default function Home() {
  const { budget, remainingBudget, totalSpent } = useTrip();
  
  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="px-6 lg:px-8 max-w-7xl mx-auto pt-16 lg:pt-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary-fixed text-on-primary-fixed-variant font-bold text-xs uppercase tracking-wider">
              SmartTrip V3.0 – Chuyên gia du lịch của bạn
            </span>
            <h1 className="font-display text-4xl lg:text-7xl font-extrabold text-on-surface leading-[1.1] tracking-tight">
              Du lịch thông minh – <br/>
              <span className="text-primary italic">Chi tiêu hợp lý</span>
            </h1>
            <p className="text-body-lg text-secondary max-w-lg leading-relaxed">
              SmartTrip Budget giúp bạn quản lý ngân sách du lịch dễ dàng, tiết kiệm và luôn chủ động tài chính trong mọi hành trình khám phá thế giới.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link 
                to="/plan" 
                className="bg-primary text-white font-bold px-8 py-4 rounded-full tonal-depth-2 hover:opacity-90 active:scale-95 transition-all text-sm flex items-center gap-2"
              >
                Lập kế hoạch ngay <ArrowRight className="w-4 h-4" />
              </Link>
              <Link 
                to="/expenses"
                className="bg-white text-on-surface font-bold px-8 py-4 rounded-full border border-surface-container-high hover:bg-surface-container transition-all text-sm"
              >
                Xem chi tiêu
              </Link>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden tonal-depth-1">
              <img 
                src="https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&q=80&w=1000" 
                alt="Travel" 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Floating Stats Card */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="absolute -bottom-10 -left-6 lg:-left-12 bg-white p-6 rounded-[2rem] shadow-2xl max-w-[240px] border border-stone-100"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary-fixed flex items-center justify-center text-primary">
                  <TrendingDown className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-secondary uppercase tracking-widest">Tiền còn lại</p>
                  <p className="text-xl font-extrabold text-on-surface">{remainingBudget.toLocaleString('vi-VN')}đ</p>
                </div>
              </div>
              <div className="w-full bg-surface-container rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full shadow-sm transition-all duration-1000" 
                  style={{ width: `${Math.min(100, (totalSpent / budget) * 100)}%` }}
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Quick Tool Section */}
      <section className="bg-surface-container-low py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl font-extrabold mb-4">Dự toán ngân sách trong 30 giây</h2>
            <p className="text-secondary">Hệ thống AI của chúng tôi sẽ tự động phân bổ chi phí tối ưu cho bạn.</p>
          </div>
          
          <div className="grid lg:grid-cols-5 gap-8 items-start">
            <div className="lg:col-span-2 bg-white p-8 rounded-[2rem] shadow-xl space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-extrabold text-secondary uppercase tracking-wider ml-1">Tổng ngân sách (VNĐ)</label>
                <div className="bg-surface-container p-4 rounded-xl flex items-baseline gap-2">
                  <span className="text-lg font-bold text-primary">₫</span>
                  <input 
                    type="text" 
                    defaultValue="20,000,000" 
                    className="bg-transparent border-none p-0 focus:ring-0 text-2xl font-bold w-full"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-extrabold text-secondary uppercase tracking-wider ml-1">Số ngày đi</label>
                  <input type="number" defaultValue={5} className="w-full bg-surface-container border-none p-4 rounded-xl focus:ring-2 focus:ring-primary/20 font-bold" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-extrabold text-secondary uppercase tracking-wider ml-1">Điểm đến</label>
                  <input type="text" defaultValue="Đà Lạt" className="w-full bg-surface-container border-none p-4 rounded-xl focus:ring-2 focus:ring-primary/20 font-bold" />
                </div>
              </div>
              <button className="w-full bg-primary text-white py-4 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-opacity-90 transition-all shadow-lg shadow-primary/20">
                <Sparkles className="w-5 h-5 fill-white/20" /> Tự động phân bổ
              </button>
            </div>

            <div className="lg:col-span-3 grid sm:grid-cols-2 gap-4">
              {[
                { name: 'Lưu trú', val: '7.000.000đ', pct: '35%', color: 'primary' },
                { name: 'Ăn uống', val: '5.000.000đ', pct: '25%', color: 'primary' },
                { name: 'Di chuyển', val: '4.000.000đ', pct: '20%', color: 'primary' },
                { name: 'Khác', val: '4.000.000đ', pct: '20%', color: 'dark' },
              ].map((cat, i) => (
                <div 
                  key={i} 
                  className={`p-6 rounded-2xl border ${
                    cat.color === 'dark' ? 'bg-primary text-white' : 'bg-white border-stone-100'
                  } flex flex-col justify-between aspect-square sm:aspect-auto sm:h-40 shadow-sm`}
                >
                  <div className="flex justify-between items-start">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${cat.color === 'dark' ? 'bg-white/20' : 'bg-primary-fixed text-primary'}`}>
                      <Target className="w-5 h-5" />
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${cat.color === 'dark' ? 'bg-white/10 text-white' : 'bg-primary-fixed text-primary'}`}>{cat.pct}</span>
                  </div>
                  <div>
                    <p className={`text-xs font-bold uppercase tracking-widest ${cat.color === 'dark' ? 'text-white/60' : 'text-secondary'}`}>{cat.name}</p>
                    <p className="text-2xl font-extrabold">{cat.val}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-20 space-y-4">
          <h2 className="font-display text-4xl font-extrabold tracking-tight">Tính năng vượt trội</h2>
          <div className="h-1.5 w-20 bg-primary mx-auto rounded-full"></div>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: 'Expense Tracking', desc: 'Nhập chi tiêu thực tế mọi lúc mọi nơi. Ứng dụng sẽ tự động điều chỉnh kế hoạch.', icon: Target },
            { title: 'Smart Suggestions', desc: 'Dựa trên số dư thực tế, AI gợi ý các địa điểm ăn uống giá rẻ hoặc khu vui chơi gần bạn.', icon: Sparkles },
            { title: 'Budget Warnings', desc: 'Cảnh báo trực quan bằng màu sắc khi bạn có dấu hiệu chi tiêu vượt mức dự kiến.', icon: AlertCircle, color: 'text-error bg-error-container' },
          ].map((feat, i) => (
            <motion.div 
              whileHover={{ y: -8 }}
              key={i} 
              className="p-10 rounded-[2.5rem] bg-white border border-stone-100 shadow-sm hover:shadow-xl transition-all group"
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 ${feat.color || 'bg-primary-fixed text-primary'} group-hover:scale-110 transition-transform`}>
                <feat.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-extrabold mb-4">{feat.title}</h3>
              <p className="text-secondary leading-relaxed">{feat.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Box */}
      <section className="px-6 mx-auto max-w-5xl">
        <div className="bg-primary p-12 lg:p-24 rounded-[3.5rem] relative overflow-hidden shadow-2xl shadow-primary/20">
          <div className="relative z-10 text-center space-y-8">
            <h2 className="font-display text-4xl lg:text-6xl font-extrabold text-white leading-tight">Sẵn sàng cho chuyến đi tiếp theo?</h2>
            <p className="text-primary-fixed/80 text-lg max-w-2xl mx-auto leading-relaxed">
              Đăng ký ngay hôm nay để nhận được các gợi ý du lịch tiết kiệm từ cộng đồng hơn 100.000 người dùng SmartTrip.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/signup" className="bg-white text-primary font-bold px-10 py-5 rounded-full hover:scale-105 transition-all text-sm shadow-xl">
                Tham gia ngay
              </Link>
              <Link to="/plan" className="bg-white/10 text-white border border-white/20 font-bold px-10 py-5 rounded-full hover:bg-white/20 transition-all text-sm">
                Tìm hiểu thêm
              </Link>
            </div>
          </div>
          {/* Decorative Elements */}
          <div className="absolute top-[-50%] left-[-20%] w-[80%] h-[150%] bg-white/5 rounded-full blur-[100px] pointer-events-none"></div>
          <div className="absolute bottom-[-50%] right-[-10%] w-[60%] h-[120%] bg-on-primary-fixed-variant/20 rounded-full blur-[100px] pointer-events-none"></div>
        </div>
      </section>

      {/* Asymmetric Showcase */}
      <section className="px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
        <div className="flex flex-col md:flex-row gap-16 items-center">
          <div className="flex-1 relative order-2 md:order-1">
            <div className="aspect-square rounded-[3rem] overflow-hidden tonal-depth-1 border-8 border-white">
              <img 
                src="https://images.unsplash.com/photo-1520117003479-60b522bbde52?auto=format&fit=crop&q=80&w=1000" 
                alt="Travel Scene" 
                className="w-full h-full object-cover"
              />
            </div>
            {/* Glass Memo */}
            <motion.div 
              initial={{ x: 30, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="absolute top-10 -right-6 lg:-right-12 micro-glass p-8 rounded-3xl shadow-2xl max-w-[280px]"
            >
              <div className="flex items-center gap-2 mb-4 text-primary font-bold">
                <Navigation className="w-5 h-5 fill-primary" />
                <span>Mẹo hôm nay</span>
              </div>
              <p className="text-sm text-stone-700 leading-relaxed italic">
                "Thử ghé quán cơm lam gà nướng gần thác Frenn để có bữa trưa đậm chất núi rừng với giá chỉ 80k."
              </p>
            </motion.div>
          </div>
          <div className="flex-1 space-y-8 order-1 md:order-2">
            <h2 className="font-display text-4xl lg:text-5xl font-extrabold tracking-tight text-on-surface">Khám phá mà không lo nghĩ về tiền</h2>
            <p className="text-body-lg text-secondary leading-relaxed">
              Hệ thống quản lý tài chính của chúng tôi không chỉ là những con số. Đó là sự an tâm để bạn tận hưởng trọn vẹn từng khoảnh khắc của chuyến đi.
            </p>
            <div className="space-y-4 pt-4">
              {[
                'Đồng bộ hóa với thẻ ngân hàng',
                'Quản lý nhóm cùng bạn bè',
                'Xuất báo cáo chi tiêu sau chuyến đi'
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 text-on-surface font-semibold">
                  <div className="w-6 h-6 rounded-full bg-primary-fixed flex items-center justify-center text-primary">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
