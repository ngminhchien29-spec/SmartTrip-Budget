import { motion } from 'motion/react';
import { Mail, Lock, Eye, ArrowRight, Github, Facebook } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Login() {
  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-surface">
      {/* Branding Side */}
      <div className="hidden lg:flex flex-col justify-between p-16 bg-primary relative overflow-hidden">
        <div className="z-10">
          <Link to="/" className="text-3xl font-extrabold text-white tracking-tighter flex items-center gap-3">
            SmartTrip Budget
          </Link>
          <p className="text-primary-fixed/80 text-xl font-medium mt-6 max-w-sm leading-relaxed">
            Your serene companion for financial clarity across the globe.
          </p>
        </div>

        <div className="z-10">
          <div className="micro-glass rounded-[2rem] p-8 space-y-4">
            <p className="text-primary-fixed font-bold italic text-lg leading-relaxed">
              "Traveling is about the journey, not the math. Let us handle the rest."
            </p>
          </div>
        </div>

        {/* Decorative Background Image */}
        <div className="absolute inset-0 opacity-20 mix-blend-overlay">
          <img 
            src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=1000" 
            className="w-full h-full object-cover" 
            alt="Travel background"
          />
        </div>
      </div>

      {/* Form Side */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center justify-center p-8 md:p-16"
      >
        <div className="w-full max-w-md space-y-12">
          <div className="space-y-2">
            <h2 className="text-4xl font-extrabold tracking-tight">Đăng nhập</h2>
            <p className="text-secondary font-medium">Chào mừng trở lại! Hãy bắt đầu hành trình của bạn.</p>
          </div>

          <form className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-extrabold text-secondary uppercase tracking-widest ml-1">Email hoặc Số điện thoại</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-300 group-focus-within:text-primary transition-colors" />
                <input 
                  type="text" 
                  placeholder="Ten@vidu.com" 
                  className="w-full pl-12 pr-4 py-5 bg-surface-container-low border-b-2 border-transparent focus:border-primary focus:ring-0 rounded-2xl transition-all font-bold"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-[10px] font-extrabold text-secondary uppercase tracking-widest">Mật khẩu</label>
                <a href="#" className="text-[10px] font-bold text-primary uppercase tracking-widest hover:underline">Quên mật khẩu?</a>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-300 group-focus-within:text-primary transition-colors" />
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  className="w-full pl-12 pr-12 py-5 bg-surface-container-low border-b-2 border-transparent focus:border-primary focus:ring-0 rounded-2xl transition-all font-bold"
                />
                <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-300 hover:text-primary">
                  <Eye className="w-5 h-5" />
                </button>
              </div>
            </div>

            <button className="w-full bg-primary text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all">
              Đăng nhập <ArrowRight className="w-5 h-5" />
            </button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-stone-100"></div></div>
            <div className="relative flex justify-center text-[10px] font-black uppercase tracking-[0.3em] text-stone-300">
              <span className="bg-surface px-4">Hoặc tiếp tục với</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-3 py-4 border-2 border-surface-container-high rounded-2xl hover:bg-surface-container-low transition-all font-bold text-sm">
              <Github className="w-5 h-5" /> Google
            </button>
            <button className="flex items-center justify-center gap-3 py-4 border-2 border-surface-container-high rounded-2xl hover:bg-surface-container-low transition-all font-bold text-sm">
              <Facebook className="w-5 h-5" /> Facebook
            </button>
          </div>

          <p className="text-center text-sm font-bold text-secondary">
            Chưa có tài khoản? <Link to="/signup" className="text-primary hover:underline">Đăng ký ngay</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
