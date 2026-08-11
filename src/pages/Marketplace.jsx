import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import FilterSidebar from '../components/FilterSidebar.jsx'
import ProductCard from '../components/ProductCard.jsx'
import { CATEGORIES, freshnessTier, products } from '../data/mockData.js'

const SORT_OPTIONS = [
  { key: 'freshness', label: 'Kesegaran Tertinggi' },
  { key: 'price-asc', label: 'Harga Terendah' },
  { key: 'price-desc', label: 'Harga Tertinggi' },
  { key: 'newest', label: 'Tangkapan Terbaru' },
]

const PRICE_CEILING = Math.ceil(Math.max(...products.map((p) => p.basePrice)) / 50000) * 50000

export default function Marketplace() {
  const [searchParams] = useSearchParams()
  const categoryFromUrl = searchParams.get('category')

  const [selectedCategories, setSelectedCategories] = useState(
    categoryFromUrl && CATEGORIES.includes(categoryFromUrl) ? [categoryFromUrl] : [],
  )
  const [selectedFreshnessTiers, setSelectedFreshnessTiers] = useState([])
  const [priceMax, setPriceMax] = useState(PRICE_CEILING)
  const [sortKey, setSortKey] = useState('freshness')

  const toggleCategory = (cat) =>
    setSelectedCategories((prev) => (prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]))

  const toggleFreshness = (tier) =>
    setSelectedFreshnessTiers((prev) =>
      prev.includes(tier) ? prev.filter((t) => t !== tier) : [...prev, tier],
    )

  const filtered = useMemo(() => {
    let list = products.filter((p) => {
      const categoryOk = selectedCategories.length === 0 || selectedCategories.includes(p.category)
      const freshnessOk =
        selectedFreshnessTiers.length === 0 || selectedFreshnessTiers.includes(freshnessTier(p.freshness))
      const priceOk = p.currentPrice <= priceMax
      return categoryOk && freshnessOk && priceOk
    })

    switch (sortKey) {
      case 'price-asc':
        list = [...list].sort((a, b) => a.currentPrice - b.currentPrice)
        break
      case 'price-desc':
        list = [...list].sort((a, b) => b.currentPrice - a.currentPrice)
        break
      case 'newest':
        list = [...list].sort((a, b) => a.hoursSinceCatch - b.hoursSinceCatch)
        break
      default:
        list = [...list].sort((a, b) => b.freshness - a.freshness)
    }
    return list
  }, [selectedCategories, selectedFreshnessTiers, priceMax, sortKey])

  return (
    <section className="section">
      <div className="container">
        <div className="marketplace-toolbar">
          <div>
            <h1 className="text-headline-lg">Marketplace</h1>
            <p className="text-body-md">{filtered.length} produk tersedia</p>
          </div>
          <select className="sort-select" value={sortKey} onChange={(e) => setSortKey(e.target.value)}>
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.key} value={opt.key}>
                Urutkan: {opt.label}
              </option>
            ))}
          </select>
        </div>

        <div className="marketplace-layout">
          <FilterSidebar
            categories={CATEGORIES}
            selectedCategories={selectedCategories}
            onCategoryChange={toggleCategory}
            selectedFreshnessTiers={selectedFreshnessTiers}
            onFreshnessChange={toggleFreshness}
            priceMax={priceMax}
            priceCeiling={PRICE_CEILING}
            onPriceMaxChange={setPriceMax}
          />

          {filtered.length > 0 ? (
            <div className="product-grid cols-3">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} variant="marketplace" />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <p className="text-title-md">Tidak ada produk yang cocok</p>
              <p className="text-body-md">Coba ubah filter kategori, kesegaran, atau harga.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
