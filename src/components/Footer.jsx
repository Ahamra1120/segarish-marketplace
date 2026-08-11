import { Waves } from 'lucide-react'

const LINK_COLUMNS = [
  { title: 'Perusahaan', links: ['Sustainability', 'Track My Catch'] },
  { title: 'Bisnis', links: ['Wholesale', 'Contact Us'] },
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="brand-mark">
              <Waves size={20} />
              SEGARISH
            </div>
            <p className="text-body-md" style={{ color: '#9fbcbd' }}>
              © 2026 SEGARISH. Maritime Modern Freshness.
            </p>
          </div>

          <div className="footer-cols">
            {LINK_COLUMNS.map((col) => (
              <div className="footer-col" key={col.title}>
                <h4 className="text-label-caps">{col.title}</h4>
                <ul>
                  {col.links.map((link) => (
                    <li key={link}>
                      <a href="#">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="footer-bottom">
          Marketplace hasil laut modern dengan sistem harga dinamis mengikuti kesegaran.
        </div>
      </div>
    </footer>
  )
}
