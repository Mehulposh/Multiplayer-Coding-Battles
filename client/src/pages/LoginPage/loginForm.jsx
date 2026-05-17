import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMail, FiLock , FiLogIn} from 'react-icons/fi';
import toast from 'react-hot-toast';

import useAuthStore from '../../zustandStore/authStore.js';

import InputField from './inputfield.jsx';
import SubmitButton from './submitButton.jsx';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { login, isLoading } = useAuthStore();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await login(email, password);

    if (result.success) {
      toast.success('Welcome back!');
      navigate('/dashboard');
    } else {
      toast.error(result.message);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-5">
        <InputField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          icon={FiMail}
        />

        <InputField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          icon={FiLock}
        />

        <SubmitButton
            isLoading={isLoading}
            icon={FiLogIn}
            text="Sign In"
        />
      </form>

      <p className="text-center text-battle-muted text-sm mt-6">
        No account?{' '}
        <Link
          to="/register"
          className="text-battle-accent hover:underline font-medium"
        >
          Create one free
        </Link>
      </p>
    </>
  );
}