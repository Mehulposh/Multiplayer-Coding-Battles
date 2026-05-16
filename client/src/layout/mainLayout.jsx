import { Outlet, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from './navbar.jsx';

export default function MainLayout() {
  const location = useLocation();

  const isBattle = location.pathname.startsWith('/battle/');

  return (
    <div className="min-h-screen bg-battle-bg">
      {!isBattle && <Navbar />}

      <main className={isBattle ? '' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'}>
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <Outlet />
        </motion.div>
      </main>
    </div>
  );
}