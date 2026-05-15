/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        battle: {
          bg: '#0a0a0f',
          surface: '#12121a',
          card: '#1a1a2e',
          border: '#2a2a3e',
          accent: '#00ff88',
          accent2: '#7c3aed',
          text: '#e2e8f0',
          muted: '#64748b',
          danger: '#ef4444',
          warning: '#f59e0b',
          info: '#3b82f6',
        },
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'monospace'],
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
      },
      animation: {
        'pulse-green': 'pulse-green 2s ease-in-out infinite',
        'slide-up': 'slide-up 0.4s ease-out',
        'glow': 'glow 2s ease-in-out infinite',
      },
      keyframes: {
        'pulse-green': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(0, 255, 136, 0)' },
          '50%': { boxShadow: '0 0 20px 4px rgba(0, 255, 136, 0.3)' },
        },
        'slide-up': {
          from: { opacity: 0, transform: 'translateY(20px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
        'glow': {
          '0%, 100%': { filter: 'drop-shadow(0 0 8px rgba(0,255,136,0.3))' },
          '50%': { filter: 'drop-shadow(0 0 20px rgba(0,255,136,0.8))' },
        },
      },
    },
  },
  plugins: [],
};