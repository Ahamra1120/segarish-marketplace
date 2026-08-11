import { NavLink } from 'react-router-dom'
import { Search, Bell, User, ShoppingCart, Waves } from 'lucide-react'

const NAV_ITEMS = [
  { to: '/marketplace', label: 'Marketplace' },
  { to: '/marketplace', label: 'Categories' },
  { to: '/', label: 'Freshness Guide' },
  { to: '/checkout', label: 'Orders' },
]

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <NavLink to="/" className="brand-mark">
          <Waves size={22} />
          SEGARISH
        </NavLink>

        <nav className="nav-links">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="nav-search">
          <Search size={16} />
          <input type="text" placeholder="Cari ikan segar..." />
        </div>

        <div className="nav-icons">
          <button className="icon-btn" aria-label="Notifikasi">
            <Bell size={18} />
          </button>
          <button className="icon-btn" aria-label="Akun">
            <User size={18} />
          </button>
          <NavLink to="/checkout" className="icon-btn" aria-label="Keranjang">
            <ShoppingCart size={18} />
            <span className="count-dot">2</span>
          </NavLink>
        </div>
      </div>
    </header>
  )
}
