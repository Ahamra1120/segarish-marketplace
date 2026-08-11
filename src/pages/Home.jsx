import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Badge, Button, ProductImage, WaveDivider } from '../components/ui.jsx'
import ProductCard from '../components/ProductCard.jsx'
import { getProductById, featuredListingId, products, rupiah } from '../data/mockData.js'

const CATEGORY_SECTIONS = [
  {
    name: 'Ikan Laut',
    subtitle: 'Tangkapan segar langsung dari nelayan pesisir.',
    large: true,
  },
  {
    name: 'Ikan Air Tawar',
    subtitle: 'Dari tambak & keramba mitra terpercaya.',
  },
  {
    name: 'Kerang & Udang',
    subtitle: 'Hasil laut premium, dipanen harian.',
  },
]

export default function Home() {
  const featured = getProductById(featuredListingId)
  const priceDrop = featured.basePrice - featured.currentPrice
  const todaysCatch = [...products].sort((a, b) => a.hoursSinceCatch - b.hoursSinceCatch).slice(0, 8)

  return (
    <>
      <section className="hero-section">
        <div className="container hero-grid">
          <div className="hero-copy">
            <h1 className="text-headline-xl">Kesegaran Maksimal, Harga Proporsional</h1>
            <p className="text-body-lg">
              Marketplace hasil laut modern dengan sistem harga dinamis.{' '}
              <span className="accent">Harga turun mengikuti tingkat kesegaran ikan setiap jamnya.</span>{' '}
              Dapatkan tangkapan terbaik dengan harga yang jujur.
            </p>
            <div className="hero-cta">
              <Button variant="solid" to="/marketplace">
                Belanja Sekarang
              </Button>
              <Button variant="outline" to="/marketplace">
                Cara Kerja
              </Button>
            </div>
          </div>

          <div className="hero-card">
            <ProductImage product={featured} size="lg">
              <div className="hero-card-live">
                <Badge kind="info" pulse>
                  Live Auction
                </Badge>
              </div>
            </ProductImage>
            <div className="hero-card-overlay">
              <div>
                <div className="hero-card-name">{featured.name}</div>
                <div className="hero-card-drop">
                  Turun {rupiah(priceDrop)} dalam {featured.nextDropEtaMinutes} mnt
                </div>
              </div>
              <div className="hero-card-price">
                {rupiah(featured.currentPrice)}
                <small>{featured.unit}</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      <WaveDivider color="var(--surface)" />

      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2 className="text-headline-lg">Jelajah Kategori</h2>
            <Link className="link-more" to="/marketplace">
              Lihat Semua <ArrowRight size={14} />
            </Link>
          </div>

          <div className="category-grid">
            {CATEGORY_SECTIONS.map((cat) => (
              <Link
                key={cat.name}
                to={`/marketplace?category=${encodeURIComponent(cat.name)}`}
                className={`category-card${cat.large ? ' category-card-large' : ''}`}
              >
                <ProductImage product={{ id: cat.name }} size="lg" />
                <div className="category-card-overlay">
                  <h3>{cat.name}</h3>
                  <p>{cat.subtitle}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <WaveDivider color="var(--bg-0)" />

      <section className="section-band">
        <div className="container">
          <div className="section-header">
            <div>
              <h2 className="text-headline-lg">Tangkapan Hari Ini</h2>
              <p className="text-body-md">Diproses kurang dari 24 jam sejak ditangkap.</p>
            </div>
          </div>

          <div className="product-grid cols-4">
            {todaysCatch.map((product) => (
              <ProductCard key={product.id} product={product} variant="home" />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
