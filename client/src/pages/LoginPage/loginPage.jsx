import { motion } from 'framer-motion';
import AuthBackground from './authBackground.jsx';
import AuthLogo from './authLogo.jsx';
import LoginForm from './loginForm.jsx';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-battle-bg flex items-center justify-center p-4">
      <AuthBackground />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <AuthLogo />

        <div className="bg-battle-card border border-battle-border rounded-2xl p-8 shadow-xl">
          <LoginForm />
        </div>
      </motion.div>
    </div>
  );
}