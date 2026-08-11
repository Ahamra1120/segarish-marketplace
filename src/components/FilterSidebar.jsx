import { Card, Badge } from './ui.jsx'
import { rupiah } from '../data/mockData.js'

const FRESHNESS_TIERS = [
  { key: 'super', label: 'Super Fresh (95%+)' },
  { key: 'fresh', label: 'Fresh (80-94%)' },
  { key: 'budget', label: 'Budget (<80%)' },
]

/**
 * Deliberately a single-thumb "up to Rp..." ceiling slider rather than the
 * reference screenshot's dual-thumb $0-$100+ range — a true two-handle range
 * needs custom hit-testing/a library that isn't worth it for this scaffold.
 * Priced in Rupiah (not USD) to stay consistent with rupiah() everywhere else.
 */
export default function FilterSidebar({
  categories,
  selectedCategories,
  onCategoryChange,
  selectedFreshnessTiers,
  onFreshnessChange,
  priceMax,
  priceCeiling,
  onPriceMaxChange,
}) {
  return (
    <Card className="filter-sidebar">
      <span className="text-title-md">Filter</span>

      <div className="filter-group">
        <span className="text-label-caps">Kategori</span>
        {categories.map((cat) => (
          <label className="checkbox-row" key={cat}>
            <input
              type="checkbox"
              checked={selectedCategories.includes(cat)}
              onChange={() => onCategoryChange(cat)}
            />
            {cat}
          </label>
        ))}
      </div>

      <div className="filter-group">
        <span className="text-label-caps">Tingkat Kesegaran</span>
        {FRESHNESS_TIERS.map((tier) => (
          <label className="checkbox-row" key={tier.key}>
            <input
              type="checkbox"
              checked={selectedFreshnessTiers.includes(tier.key)}
              onChange={() => onFreshnessChange(tier.key)}
            />
            {tier.label}
          </label>
        ))}
      </div>

      <div className="filter-group">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span className="text-label-caps">Harga Maksimum</span>
          <Badge kind="info">{rupiah(priceMax)}</Badge>
        </div>
        <div className="range-row">
          <input
            type="range"
            min={0}
            max={priceCeiling}
            step={5000}
            value={priceMax}
            onChange={(e) => onPriceMaxChange(Number(e.target.value))}
          />
          <div className="range-labels">
            <span>Rp0</span>
            <span>{rupiah(priceCeiling)}+</span>
          </div>
        </div>
      </div>
    </Card>
  )
}
