import { motion } from 'framer-motion';

import AuthBackground from '../LoginPage/authBackground.jsx';
import AuthLogo from '../LoginPage/authLogo.jsx';
import RegisterForm from './registerForm.jsx';

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-battle-bg flex items-center justify-center p-4">
      <AuthBackground />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <AuthLogo
          title="Create account"
          subtitle="Join the arena. Start at 1000 ELO."
        />

        <div className="bg-battle-card border border-battle-border rounded-2xl p-8 shadow-xl">
          <RegisterForm />
        </div>
      </motion.div>
    </div>
  );
}