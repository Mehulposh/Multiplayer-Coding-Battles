import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import {
  FiMail,
  FiLock,
  FiUser,
  FiUserPlus,
} from 'react-icons/fi';

import toast from 'react-hot-toast';

import useAuthStore from '../../zustandStore/authStore.js';

import InputField from '../LoginPage/inputfield.jsx';
import SubmitButton from '../LoginPage/submitButton.jsx';

export default function RegisterForm() {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
  });

  const { register, isLoading } = useAuthStore();

  const navigate = useNavigate();

  const update =
    (field) => (e) =>
      setForm((f) => ({
        ...f,
        [field]: e.target.value,
      }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await register(
      form.username,
      form.email,
      form.password
    );

    if (result.success) {
      toast.success('Account created! Time to battle.');
      navigate('/dashboard');
    } else {
      toast.error(result.message);
    }
  };

  const fields = [
    {
      field: 'username',
      label: 'Username',
      icon: FiUser,
      type: 'text',
      placeholder: 'YourCodename',
    },
    {
      field: 'email',
      label: 'Email',
      icon: FiMail,
      type: 'email',
      placeholder: 'you@example.com',
    },
    {
      field: 'password',
      label: 'Password',
      icon: FiLock,
      type: 'password',
      placeholder: '••••••••',
    },
  ];

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-5">
        {fields.map((input) => (
          <InputField
            key={input.field}
            label={input.label}
            type={input.type}
            value={form[input.field]}
            onChange={update(input.field)}
            placeholder={input.placeholder}
            icon={input.icon}
          />
        ))}

        <SubmitButton
          isLoading={isLoading}
          icon={FiUserPlus}
          text="Create Account"
        />
      </form>

      <p className="text-center text-battle-muted text-sm mt-6">
        Already a warrior?{' '}
        <Link
          to="/login"
          className="text-battle-accent hover:underline font-medium"
        >
          Sign in
        </Link>
      </p>
    </>
  );
}