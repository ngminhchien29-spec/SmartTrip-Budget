import { motion } from 'motion/react';
import { User, Mail, Lock, Shield, ArrowRight, Chrome, Apple } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Signup() {
  return (
    <div className="min-h-screen bg-surface-container-low flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <header className="mb-12 text-center z-10">
        <Link to="/" className="text-4xl font-extrabold text-primary tracking-tighter">SmartTrip Budget</Link>
        <p className="text-secondary font-medium mt-2">Bắt đầu hành trình tiết kiệm của bạn</p>
      </header>

      <motion.main 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md z-10"
      >
        <div className="bg-white rounded-[2.5rem] p-10 shadow-2xl border border-stone-50 space-y-10">
          <h2 className="text-3xl font-extrabold tracking-tight">Đăng ký</h2>
          
          <form className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-secondary uppercase tracking-[0.2em] ml-1">Họ và tên</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-300 group-focus-within:text-primary transition-colors" />
                <input type="text" placeholder="Nguyễn Văn A" className="w-full pl-12 pr-4 py-4 bg-surface-container border-none rounded-xl focus:ring-2 focus:ring-primary/20 font-bold" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-secondary uppercase tracking-[0.2em] ml-1">Email hoặc Số điện thoại</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-300 group-focus-within:text-primary transition-colors" />
                <input type="text" placeholder="example@gmail.com" className="w-full pl-12 pr-4 py-4 bg-surface-container border-none rounded-xl focus:ring-2 focus:ring-primary/20 font-bold" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-secondary uppercase tracking-[0.2em] ml-1">Mật khẩu</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-300 group-focus-within:text-primary transition-colors" />
                <input type="password" placeholder="••••••••" className="w-full pl-12 pr-4 py-4 bg-surface-container border-none rounded-xl focus:ring-2 focus:ring-primary/20 font-bold" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-secondary uppercase tracking-[0.2em] ml-1">Xác nhận mật khẩu</label>
              <div className="relative group">
                <Shield className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-300 group-focus-within:text-primary transition-colors" />
                <input type="password" placeholder="••••••••" className="w-full pl-12 pr-4 py-4 bg-surface-container border-none rounded-xl focus:ring-2 focus:ring-primary/20 font-bold" />
              </div>
            </div>

            <button className="w-full bg-primary text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
              Create Account <ArrowRight className="w-5 h-5" />
            </button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-stone-100"></div></div>
            <div className="relative flex justify-center text-[10px] font-black uppercase tracking-[0.2em] text-stone-300">
              <span className="bg-white px-4">Hoặc tiếp tục với</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-3 py-4 border border-stone-100 rounded-2xl hover:bg-surface-container transition-all font-bold text-sm">
              <Chrome className="w-5 h-5" /> Google
            </button>
            <button className="flex items-center justify-center gap-3 py-4 border border-stone-100 rounded-2xl hover:bg-surface-container transition-all font-bold text-sm">
              <Apple className="w-5 h-5" /> Apple
            </button>
          </div>

          <p className="text-center text-sm font-bold text-secondary italic">
            Bạn đã có tài khoản? <Link to="/login" className="text-primary hover:underline">Đăng nhập ngay</Link>
          </p>
        </div>
      </motion.main>

      <p className="mt-8 text-[10px] font-bold text-secondary uppercase tracking-[0.2em] max-w-[300px] text-center leading-relaxed">
        Bằng cách đăng ký, bạn đồng ý với Điều khoản dịch vụ và Chính sách bảo mật.
      </p>

      {/* Background Decor */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-0" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-emerald-200/20 rounded-full blur-[100px] -z-0" />
    </div>
  );
}
