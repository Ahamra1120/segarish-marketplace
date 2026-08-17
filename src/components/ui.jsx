import { Link } from 'react-router-dom'
import { Clock, Fish } from 'lucide-react'
import { rupiah, freshnessColor, timeAgo, hashString } from '../data/mockData.js'

/** Solid/outline/ghost button. Renders a react-router <Link> when `to` is given. */
export function Button({
  variant = 'solid',
  size = 'md',
  icon: Icon,
  iconPosition = 'left',
  to,
  onClick,
  type = 'button',
  className = '',
  children,
  ...rest
}) {
  const classes = [
    'btn',
    `btn-${variant}`,
    size === 'sm' && 'btn-sm',
    size === 'icon' && 'btn-icon',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const content = (
    <>
      {Icon && iconPosition === 'left' && <Icon size={size === 'icon' ? 18 : 16} />}
      {children}
      {Icon && iconPosition === 'right' && <Icon size={16} />}
    </>
  )

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {content}
      </Link>
    )
  }
  return (
    <button type={type} className={classes} onClick={onClick} {...rest}>
      {content}
    </button>
  )
}

export function Card({ children, tinted = false, interactive = false, className = '', ...rest }) {
  const classes = ['card', tinted && 'card-tinted', interactive && 'card-interactive', className]
    .filter(Boolean)
    .join(' ')
  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  )
}

/** kind: neutral | info | success | warning | danger | tertiary | overlay | solid-light */
export function Badge({ kind = 'neutral', pulse = false, icon: Icon, className = '', children }) {
  const classes = ['badge', `badge-${kind}`, className].filter(Boolean).join(' ')
  return (
    <span className={classes}>
      {pulse && <span className="badge-dot" />}
      {Icon && <Icon size={12} />}
      {children}
    </span>
  )
}

/** Horizontal freshness gauge, fill color derived from freshnessColor(value). */
export function FreshnessMeter({ value, label = 'Freshness Level', showPercent = true, size = 'md' }) {
  const color = freshnessColor(value)
  return (
    <div className={`freshness-meter size-${size}`}>
      <div className="freshness-meter-head">
        <span className="text-label-caps">{label}</span>
        {showPercent && (
          <span className="text-label-caps" style={{ color }}>
            {value}%
          </span>
        )}
      </div>
      <div className="freshness-track">
        <div className="freshness-fill" style={{ width: `${value}%`, background: color }} />
      </div>
    </div>
  )
}

/** Pill badge for "hours since catch". overlay = for use on top of a photo, solid-light = for use on plain background. */
export function TimeStampBadge({ hours, verbose = false, variant = 'overlay' }) {
  const label = verbose
    ? hours < 1
      ? '<1 jam sejak tangkap'
      : `${hours} jam sejak tangkap`
    : timeAgo(hours)
  return (
    <span className={`badge badge-${variant === 'overlay' ? 'overlay' : 'solid-light'}`}>
      <Clock size={12} />
      {label}
    </span>
  )
}

/** Current price (bold), optional strikethrough original + discount delta badge, and unit suffix. */
export function PriceDisplay({ current, original, unit = '/kg', size = 'md' }) {
  const showOriginal = original && original > current
  const delta = showOriginal ? Math.round(((original - current) / original) * 100) : null
  return (
    <div className="price-block">
      {showOriginal && <span className="price-original">{rupiah(original)}</span>}
      <span
        className="text-price-display"
        style={size === 'lg' ? { fontSize: 32, lineHeight: '38px' } : undefined}
      >
        {rupiah(current)}
      </span>
      {unit && <span className="price-unit">{unit}</span>}
      {delta !== null && <Badge kind="success">-{delta}%</Badge>}
    </div>
  )
}

export function StatCard({ icon: Icon, label, value, sublabel, progress }) {
  return (
    <Card>
      <div className="stat-card">
        <div className="stat-icon">
          <Icon size={20} />
        </div>
        <div>
          <div className="text-label-caps">{label}</div>
          <div className="stat-value">{value}</div>
          {sublabel && <div className="stat-sub">{sublabel}</div>}
          {typeof progress === 'number' && (
            <div className="stat-progress-track">
              <div className="stat-progress-fill" style={{ width: `${progress}%` }} />
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}

/** Soft SVG sine-wave divider used between major landing sections. */
export function WaveDivider({ flip = false, color = 'var(--surface)' }) {
  return (
    <div className="wave-divider" aria-hidden="true">
      <svg
        viewBox="0 0 1440 40"
        preserveAspectRatio="none"
        width="100%"
        height="40"
        style={{ transform: flip ? 'scaleY(-1)' : undefined, display: 'block' }}
      >
        <path
          d="M0 20 C 240 0, 480 40, 720 20 C 960 0, 1200 40, 1440 20 L1440 40 L0 40 Z"
          fill={color}
        />
      </svg>
    </div>
  )
}

const IMAGE_GRADIENTS = [
  'linear-gradient(135deg, #09949b 0%, #0d3b3d 100%)',
  'linear-gradient(135deg, #0d9488 0%, #09949b 100%)',
  'linear-gradient(135deg, #2e8b57 0%, #09949b 100%)',
  'linear-gradient(135deg, #077a80 0%, #1a2b2c 100%)',
  'linear-gradient(135deg, #ffb800 0%, #077a80 130%)',
]

/**
 * Deterministic gradient + fish icon placeholder standing in for real product
 * photography (no photo assets in this scaffold — see design.md's "Product
 * Cards" spec for the intended photo + gradient-overlay treatment).
 * `children` is absolutely positioned on top for badges (TimeStampBadge, tags).
 * When `product.image` is set, the real photo is rendered (object-fit: cover)
 * instead of the gradient placeholder.
 */
export function ProductImage({ product, size = 'md', className = '', children }) {
  const classes = ['product-image', `size-${size}`, className].filter(Boolean).join(' ')

  if (product?.image) {
    return (
      <div className={classes}>
        <img src={product.image} alt={product.name || ''} className="product-image-photo" />
        <div className="product-image-wave" />
        {children}
      </div>
    )
  }

  const gradient = IMAGE_GRADIENTS[hashString(product?.id || 'x') % IMAGE_GRADIENTS.length]
  return (
    <div className={classes} style={{ background: gradient }}>
      <Fish size={size === 'sm' ? 34 : size === 'lg' ? 84 : 60} strokeWidth={1.4} />
      <div className="product-image-wave" />
      {children}
    </div>
  )
}
