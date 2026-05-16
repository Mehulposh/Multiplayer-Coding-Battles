import Logo from './Logo.js';
import NavLinks from './navLinks.jsx';
import UserMenu from './userMenu.jsx';

export default function Navbar() {
  return (
    <nav className="border-b border-battle-border bg-battle-surface/80 backdrop-blur-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Logo />
          <NavLinks />
          <UserMenu />
        </div>
      </div>
    </nav>
  );
}