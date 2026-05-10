import { motion } from 'motion/react';
import { Search, Map, Wallet, UserCircle, ChevronRight, MessageSquare, Mail } from 'lucide-react';

export default function Support() {
  const categories = [
    { name: 'Lập kế hoạch', icon: Map, color: 'bg-primary-fixed text-primary', desc: 'Hướng dẫn tạo lịch trình, dự báo chi phí và tối ưu hóa tuyến đường.' },
    { name: 'Quản lý chi tiêu', icon: Wallet, color: 'bg-tertiary-container text-on-tertiary-container', desc: 'Theo dõi ngân sách, quét hóa đơn và quản lý tiền tệ quốc tế.' },
    { name: 'Tài khoản', icon: UserCircle, color: 'bg-secondary-container text-secondary', desc: 'Quản lý hồ sơ, gói đăng ký và bảo mật dữ liệu cá nhân.' },
  ];

  const faqs = [
    'Làm thế nào để sử dụng SmartTrip Budget khi không có mạng?',
    'Tôi có thể chia sẻ ngân sách với nhóm bạn không?',
    'Chính sách hoàn tiền cho gói Premium như thế nào?'
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 space-y-20">
      <section className="text-center space-y-10 pt-10">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">Xin chào, chúng tôi có <br/> thể giúp gì cho bạn?</h1>
        <p className="text-secondary text-lg max-w-2xl mx-auto italic">Tìm kiếm câu trả lời nhanh chóng hoặc khám phá các chủ đề phổ biến.</p>
        <div className="relative max-w-2xl mx-auto group">
          <div className="absolute inset-y-0 left-6 flex items-center">
            <Search className="w-5 h-5 text-stone-400" />
          </div>
          <input 
            type="text" 
            placeholder="Nhập câu hỏi của bạn..."
            className="w-full pl-14 pr-8 py-6 bg-white border-stone-100 rounded-3xl shadow-2xl shadow-tertiary/10 focus:ring-2 focus:ring-primary/20 text-lg transition-all"
          />
        </div>
      </section>

      <div className="grid md:grid-cols-3 gap-8">
        {categories.map((cat, i) => (
          <motion.div whileHover={{ y: -5 }} key={i} className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-stone-100 flex flex-col items-start gap-8">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${cat.color} shadow-sm`}><cat.icon className="w-8 h-8" /></div>
            <div>
              <h3 className="text-2xl font-extrabold mb-3">{cat.name}</h3>
              <p className="text-secondary text-sm leading-relaxed">{cat.desc}</p>
            </div>
            <ul className="space-y-4 w-full pt-4 border-t border-stone-50">
              {[1, 2, 3].map(j => (
                <li key={j} className="flex items-center justify-between text-sm font-bold text-on-surface hover:text-primary transition-colors cursor-pointer group">
                  <span>Xem hướng dẫn {j}</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      <section className="space-y-12">
        <h2 className="text-3xl font-extrabold tracking-tight">Câu hỏi phổ biến</h2>
        <div className="space-y-4">
          {faqs.map((q, i) => (
            <details key={i} className="group bg-white rounded-3xl border border-stone-100 shadow-sm overflow-hidden">
              <summary className="flex justify-between items-center p-8 cursor-pointer list-none font-bold text-on-surface hover:bg-surface-container-low transition-colors">
                {q}
                <ChevronRight className="w-5 h-5 group-open:rotate-90 transition-transform" />
              </summary>
              <div className="px-8 pb-8 text-secondary text-sm leading-relaxed border-t border-stone-50 pt-6">
                Mọi dữ liệu bạn nhập khi ngoại tuyến sẽ được lưu trữ cục bộ. Hệ thống sẽ tự động đồng bộ hóa ngay khi bạn có kết nối Internet trở lại.
              </div>
            </details>
          ))}
        </div>
      </section>

      <section className="bg-primary-container/20 rounded-[3.5rem] p-12 md:p-24 text-center space-y-12 border border-primary/10 relative overflow-hidden">
        <div className="relative z-10 space-y-6">
          <h2 className="text-4xl font-extrabold tracking-tight">Vẫn cần trợ giúp?</h2>
          <p className="text-secondary text-lg max-w-xl mx-auto">Đội ngũ hỗ trợ của chúng tôi luôn sẵn sàng 24/7 để giải đáp mọi thắc mắc của bạn.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-6">
            <button className="bg-primary text-white px-10 py-5 rounded-2xl font-bold flex items-center justify-center gap-3 shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
              <MessageSquare className="w-6 h-6 fill-white/20" /> Hỗ trợ trực tuyến
            </button>
            <button className="bg-white text-primary border border-primary/20 px-10 py-5 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-stone-50 transition-all">
              <Mail className="w-6 h-6" /> Gửi Email
            </button>
          </div>
        </div>
        <div className="absolute -top-10 -right-10 w-64 h-64 bg-primary/10 rounded-full blur-[80px]" />
        <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-tertiary/10 rounded-full blur-[100px]" />
      </section>
    </div>
  );
}
