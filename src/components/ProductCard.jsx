import { Link } from 'react-router-dom'
import { ShoppingCart } from 'lucide-react'
import { Badge, Button, FreshnessMeter, PriceDisplay, ProductImage, TimeStampBadge } from './ui.jsx'

const TAG_KIND = {
  'Baru Datang': 'info',
  'Best Value': 'tertiary',
  Diskon: 'danger',
}

/** variant: 'home' (compact, icon-only cart button) | 'marketplace' (full freshness meter + CTA) */
export default function ProductCard({ product, variant = 'marketplace' }) {
  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`} style={{ position: 'relative', display: 'block' }}>
        <ProductImage product={product} size="md">
          <div className="product-card-badges">
            {product.tag ? (
              <Badge kind={TAG_KIND[product.tag] || 'neutral'}>{product.tag}</Badge>
            ) : (
              <span />
            )}
            <TimeStampBadge hours={product.hoursSinceCatch} />
          </div>
        </ProductImage>
      </Link>

      <div className="product-card-body">
        <Link to={`/product/${product.id}`}>
          <span className="product-card-name">{product.name}</span>
        </Link>

        <PriceDisplay current={product.currentPrice} original={product.basePrice} unit={product.unit} />

        {variant === 'marketplace' ? (
          <>
            <FreshnessMeter value={product.freshness} />
            <Button variant="outline" className="btn-block" icon={ShoppingCart}>
              Tambah ke Keranjang
            </Button>
          </>
        ) : (
          <div className="product-card-foot">
            <span className="text-label-caps" style={{ color: 'var(--brand)' }}>
              {product.catchMethod}
            </span>
            <Button
              variant="solid"
              size="icon"
              icon={ShoppingCart}
              className="product-card-cart-btn"
              aria-label="Tambah ke keranjang"
            />
          </div>
        )}
      </div>
    </div>
  )
}
