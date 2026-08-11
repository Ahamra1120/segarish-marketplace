import { useParams } from 'react-router-dom'
import { Anchor, Bell, MapPin, Snowflake, User, Waves } from 'lucide-react'
import { Button, PriceDisplay, ProductImage, StatCard, TimeStampBadge } from '../components/ui.jsx'
import PriceFreshnessChart from '../components/PriceFreshnessChart.jsx'
import { getProductById } from '../data/mockData.js'

function formatMinutes(mins) {
  const h = Math.floor(mins / 60)
  const m = mins % 60
  return h > 0 ? `${h}j ${m}m` : `${m}m`
}

export default function ProductDetail() {
  const { id } = useParams()
  const product = getProductById(id)

  if (!product) {
    return (
      <section className="section">
        <div className="container empty-state">
          <p className="text-title-md">Produk tidak ditemukan</p>
          <Button variant="solid" to="/marketplace" className="btn-block" style={{ maxWidth: 240, margin: '16px auto 0' }}>
            Kembali ke Marketplace
          </Button>
        </div>
      </section>
    )
  }

  return (
    <section className="section">
      <div className="container">
        <div className="detail-grid">
          <ProductImage product={product} size="lg">
            <div style={{ position: 'absolute', top: 14, right: 14 }}>
              <TimeStampBadge hours={product.hoursSinceCatch} verbose />
            </div>
            <div className="product-image-caption">{product.grade}</div>
          </ProductImage>

          <div className="detail-info-panel">
            <div>
              <h1 className="text-headline-lg">{product.name}</h1>
              <p className="text-body-md">
                <em>{product.latinName}</em> — {product.grade}
              </p>
            </div>

            <div className="detail-price-box">
              <div>
                <span className="text-label-caps">Harga Saat Ini ({product.unit})</span>
                <PriceDisplay current={product.currentPrice} original={product.basePrice} unit="" size="lg" />
              </div>
              <div className="detail-countdown">
                <span className="label">Prediksi Penurunan Dalam</span>
                {formatMinutes(product.nextDropEtaMinutes)}
              </div>
            </div>

            <div className="detail-cta">
              <Button variant="solid">Beli Sekarang</Button>
              <Button variant="outline" icon={Bell}>
                Pantau Harga
              </Button>
            </div>
          </div>
        </div>

        <div className="section-header" style={{ marginTop: 'var(--space-4)' }}>
          <h2 className="text-headline-lg">Indeks Kesegaran</h2>
        </div>

        <div className="freshness-index-grid">
          <div className="stat-stack">
            <StatCard
              icon={Anchor}
              label="Waktu Tangkap"
              value={product.catchTime.split(',')[0]}
              sublabel={product.catchTime.split(',')[1]?.trim() ?? product.zone}
            />
            <StatCard
              icon={Snowflake}
              label="Suhu Penyimpanan"
              value={`${product.coldChainTemp}°C`}
              sublabel={`Rantai Dingin Terjaga ${product.coldChainIntegrity}%`}
              progress={product.coldChainIntegrity}
            />
          </div>

          <PriceFreshnessChart product={product} />
        </div>

        <div className="section" style={{ marginTop: 'var(--space-2)' }}>
          <div className="card card-tinted">
            <h2 className="text-headline-lg" style={{ marginBottom: 'var(--space-2)' }}>
              Jejak Transparansi
            </h2>
            <div className="trace-section">
              <div>
                <div className="trace-row">
                  <div className="trace-icon">
                    <User size={18} />
                  </div>
                  <div>
                    <div className="text-label-caps">Nelayan Utama</div>
                    <div className="text-body-md">
                      {product.fisherman} — {product.boat}
                    </div>
                  </div>
                </div>
                <div className="trace-row">
                  <div className="trace-icon">
                    <Waves size={18} />
                  </div>
                  <div>
                    <div className="text-label-caps">Metode Tangkap</div>
                    <div className="text-body-md">
                      {product.catchMethod === 'LINE' && 'Pancing Ulur (Handline) — Ramah Lingkungan'}
                      {product.catchMethod === 'NET' && 'Jaring — Diawasi Kuota Tangkap'}
                      {product.catchMethod === 'FARM' && 'Budidaya Tambak/Keramba'}
                      {product.catchMethod === 'WILD' && 'Tangkapan Liar — Perairan Terbuka'}
                    </div>
                  </div>
                </div>
                <div className="trace-row">
                  <div className="trace-icon">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <div className="text-label-caps">Zona Tangkap</div>
                    <div className="text-body-md">{product.zone}</div>
                  </div>
                </div>
              </div>

              <div className="map-placeholder">
                <MapPin size={40} strokeWidth={1.4} />
                <span className="map-pin-label">{product.zone}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
