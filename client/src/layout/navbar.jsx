import Logo from './Logo.jsx';
import NavLinks from './navLinks.jsx';
import UserMenu from './userMenu.jsx';
import AdminLinks from './AdminLinks.jsx';
import useAuthStore from '../zustandStore/authStore.js';

export default function Navbar() {
  const {user} = useAuthStore()

  const isAdmin = user?.role === 'admin'
  return (
    <nav className="border-b border-battle-border bg-battle-surface/80 backdrop-blur-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Logo />

          <div className="hidden md:flex items-center">
            <NavLinks />

            {isAdmin && (
              <AdminLinks />
            )}
          </div>

          <UserMenu />
        </div>
      </div>
    </nav>
  );
}