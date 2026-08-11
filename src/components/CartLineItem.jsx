import { Minus, Plus } from 'lucide-react'
import { Button, FreshnessMeter, PriceDisplay, ProductImage, TimeStampBadge } from './ui.jsx'

export default function CartLineItem({ item, onQtyChange }) {
  return (
    <div className="cart-item">
      <ProductImage product={item} size="sm">
        <div style={{ position: 'absolute', top: 6, left: 6 }}>
          <TimeStampBadge hours={item.hoursSinceCatch} />
        </div>
      </ProductImage>

      <div className="cart-item-body">
        <div className="cart-item-head">
          <div>
            <div className="cart-item-name">{item.name}</div>
            <div className="cart-item-sub">
              {item.catchMethod} · {item.zone}
            </div>
          </div>
          <PriceDisplay current={item.currentPrice} unit={item.unit} />
        </div>

        <FreshnessMeter value={item.freshness} size="sm" />

        <div className="cart-item-foot">
          <span className="text-muted" style={{ fontSize: 13 }}>
            {item.weightKg}kg per unit
          </span>
          <div className="qty-stepper">
            <Button
              variant="outline"
              size="icon"
              icon={Minus}
              aria-label="Kurangi jumlah"
              onClick={() => onQtyChange(item.id, -1)}
            />
            <span className="qty-value">{item.qty}</span>
            <Button
              variant="outline"
              size="icon"
              icon={Plus}
              aria-label="Tambah jumlah"
              onClick={() => onQtyChange(item.id, 1)}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
