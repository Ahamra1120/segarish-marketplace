import { Link, NavLink } from 'react-router-dom'
import { Search, Bell, User, ShoppingCart } from 'lucide-react'

const NAV_ITEMS = [
  { to: '/marketplace', label: 'Marketplace' },
  { to: '/marketplace', label: 'Categories' },
  // No dedicated guide page in this scaffold — kept as a plain (never-active)
  // link to the home page's "Harga turun mengikuti kesegaran" explainer
  // rather than falsely claiming an "active" nav state on every other page.
  { to: '/', label: 'Freshness Guide', matchActive: false },
  { to: '/checkout', label: 'Orders' },
]

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <NavLink to="/" className="brand-mark">
          <img src="/landscape-logo-SEGARFISH.png" alt="SEGARFISH" className="brand-mark-img" />
        </NavLink>

        <nav className="nav-links">
          {NAV_ITEMS.map((item) =>
            item.matchActive === false ? (
              <Link key={item.label} to={item.to} className="nav-link">
                {item.label}
              </Link>
            ) : (
              <NavLink
                key={item.label}
                to={item.to}
                className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
              >
                {item.label}
              </NavLink>
            ),
          )}
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
