import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home as HomeIcon, 
  Map, 
  Wallet, 
  Sparkles, 
  HelpCircle, 
  User,
  Menu,
  PlusCircle,
  X,
  Share2,
  Languages
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'Home', path: '/', icon: HomeIcon },
    { name: 'Plan', path: '/plan', icon: Map },
    { name: 'Expenses', path: '/expenses', icon: Wallet },
    { name: 'Smart Features', path: '/smart-features', icon: Sparkles },
    { name: 'Support', path: '/support', icon: HelpCircle },
  ];

  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

  if (isAuthPage) return <main>{children}</main>;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Navigation */}
      <nav className="fixed top-0 w-full z-50 micro-glass border-b border-surface-container-high shadow-sm">
        <div className="flex justify-between items-center h-20 px-6 lg:px-8 w-full max-w-7xl mx-auto font-display tracking-tight">
          <Link to="/" className="text-xl font-extrabold text-primary tracking-tighter flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Wallet className="w-5 h-5 text-white" />
            </div>
            <span>SmartTrip Budget</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium transition-all duration-300 relative py-1 ${
                  location.pathname === item.path 
                    ? 'text-primary' 
                    : 'text-secondary hover:text-primary'
                }`}
              >
                {item.name}
                {location.pathname === item.path && (
                  <motion.div 
                    layoutId="nav-underline"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
                  />
                )}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <Link to="/login" className="hidden md:block text-secondary font-semibold text-sm px-4 py-2 hover:text-primary transition-colors">
              Login
            </Link>
            <Link to="/signup" className="bg-primary text-on-primary font-bold px-6 py-2.5 rounded-full hover:bg-opacity-90 active:scale-95 transition-all duration-200 text-sm shadow-sm">
              Signup
            </Link>
            <button 
              className="md:hidden border border-surface-container-high p-2 rounded-lg"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-6">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-lg font-bold flex items-center gap-4 p-4 rounded-xl ${
                    location.pathname === item.path ? 'bg-primary-fixed text-on-primary-fixed-variant' : 'bg-surface-container'
                  }`}
                >
                  <item.icon className="w-6 h-6" />
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-grow pt-20">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-stone-50 border-t border-stone-200 mt-20">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 py-12 px-8 max-w-7xl mx-auto font-display text-xs tracking-widest">
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="text-lg font-bold text-stone-800">SmartTrip Budget</div>
            <p className="text-stone-500 normal-case tracking-normal text-sm text-center md:text-left">
              © 2026 SmartTrip Budget. Managed freedom for global explorers.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
            {['Contact Us', 'Terms of Service', 'Privacy Policy', 'Legal'].map(link => (
              <a key={link} href="#" className="text-stone-500 hover:text-primary underline underline-offset-4 transition-colors">
                {link}
              </a>
            ))}
          </div>

          <div className="flex gap-4">
            <button className="w-10 h-10 rounded-full bg-stone-200 flex items-center justify-center text-stone-600 hover:bg-primary-container transition-colors">
              <Share2 className="w-4 h-4" />
            </button>
            <button className="w-10 h-10 rounded-full bg-stone-200 flex items-center justify-center text-stone-600 hover:bg-primary-container transition-colors">
              <Languages className="w-4 h-4" />
            </button>
          </div>
        </div>
      </footer>

      {/* Quick Add Button (Desktop Floating) */}
      <Link 
        to="/add-expense"
        className="hidden md:flex fixed bottom-8 right-8 w-14 h-14 bg-primary text-white rounded-full shadow-xl items-center justify-center hover:scale-110 active:scale-95 transition-all z-30"
      >
        <PlusCircle className="w-8 h-8" />
      </Link>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 w-full z-50 bg-white/80 backdrop-blur-lg border-t border-surface-container-high px-6 py-3 pb-8 flex justify-between items-center">
        {navItems.slice(0, 4).map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center gap-1 ${
              location.pathname === item.path ? 'text-primary' : 'text-stone-400'
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span className="text-[10px] font-bold uppercase tracking-tighter">{item.name.split(' ')[0]}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
