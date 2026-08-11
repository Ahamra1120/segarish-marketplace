import { useMemo, useState } from 'react'
import { ArrowRight, Info, MapPin, ShieldCheck } from 'lucide-react'
import { Button, Card } from '../components/ui.jsx'
import CartLineItem from '../components/CartLineItem.jsx'
import { getProductById, rupiah } from '../data/mockData.js'

const DELIVERY_FEE = 45000
const SERVICE_FEE = 5000

const INITIAL_CART = [
  { id: 'p14', qty: 1 },
  { id: 'p12', qty: 2 },
]

export default function Checkout() {
  const [cart, setCart] = useState(
    INITIAL_CART.map(({ id, qty }) => ({ ...getProductById(id), qty })),
  )

  const updateQty = (id, delta) => {
    setCart((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, qty: Math.max(0, item.qty + delta) } : item))
        .filter((item) => item.qty > 0),
    )
  }

  const subtotal = useMemo(() => cart.reduce((sum, item) => sum + item.currentPrice * item.qty, 0), [cart])
  const total = subtotal + (cart.length ? DELIVERY_FEE + SERVICE_FEE : 0)

  return (
    <section className="section">
      <div className="container">
        <div className="section-header">
          <h1 className="text-headline-lg">Checkout</h1>
        </div>

        <div className="checkout-banner">
          <Info size={18} />
          Harga produk di keranjang dapat berubah mengikuti tingkat kesegaran hingga transaksi selesai.
        </div>

        <div className="checkout-layout">
          <div>
            {cart.length > 0 ? (
              cart.map((item, i) => (
                <div key={item.id}>
                  <CartLineItem item={item} onQtyChange={updateQty} />
                  {i < cart.length - 1 && <div className="divider-wave" />}
                </div>
              ))
            ) : (
              <div className="empty-state">
                <p className="text-title-md">Keranjang kosong</p>
                <Button variant="solid" to="/marketplace" style={{ marginTop: 12 }}>
                  Belanja Sekarang
                </Button>
              </div>
            )}
          </div>

          <Card className="order-summary">
            <span className="text-title-md">Order Summary</span>

            <div className="summary-row">
              <span>Subtotal ({cart.reduce((n, i) => n + i.qty, 0)} items)</span>
              <span>{rupiah(subtotal)}</span>
            </div>
            <div className="summary-row">
              <span>Cold-Chain Delivery</span>
              <span>{cart.length ? rupiah(DELIVERY_FEE) : rupiah(0)}</span>
            </div>
            <div className="summary-row">
              <span>Service Fee</span>
              <span>{cart.length ? rupiah(SERVICE_FEE) : rupiah(0)}</span>
            </div>

            <div className="summary-divider" />

            <div className="summary-total">
              <span>Total</span>
              <span>{rupiah(total)}</span>
            </div>

            <div className="guarantee-badge">
              <ShieldCheck size={18} />
              Segarish Freshness Guarantee
            </div>

            <div className="address-row">
              <MapPin size={16} />
              <input type="text" defaultValue="Jl. Sudirman No. 123, Jakarta" />
            </div>

            <Button variant="solid" className="btn-block" icon={ArrowRight} iconPosition="right" disabled={!cart.length}>
              Proceed to Payment
            </Button>
          </Card>
        </div>
      </div>
    </section>
  )
}
