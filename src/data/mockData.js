/**
 * SEGARFISH Marketplace — mock data
 * All prices in IDR. Freshness is a 0-100 score driven by hours-since-catch
 * and cold-chain integrity; price decays as freshness time increases.
 *
 * Two intentionally different freshness scales are used across the UI:
 *  - freshnessColor() — 4-stop meter shown on every product card/detail page:
 *      >=90 peak teal · 80-89 good green · 60-79 fair amber · <60 low red
 *  - freshnessTier()  — 3-bucket filter copy in the Marketplace sidebar
 *    ("Super Fresh 100%" / "Fresh >80%" / "Budget <80%"):
 *      >=95 super · 80-94 fresh · <80 budget
 * These don't line up 1:1 on purpose — the meter is a continuous read of
 * "how good is this fish right now", the filter is a coarser shopping bucket.
 */

export const CATEGORIES = ['Ikan Laut', 'Ikan Air Tawar', 'Kerang & Udang']

const FRESH_STOPS = {
  peak: '#09949b',
  good: '#2e8b57',
  fair: '#ffb800',
  low: '#ba1a1a',
}

// Relative price decay curve — % of basePrice remaining at each hour mark
// since catch. Used to both render the "Dinamika Harga vs Kesegaran" chart
// and to derive each product's currentPrice from its basePrice + hoursSinceCatch.
const DECAY_CURVE = [
  { hour: 0, pct: 1 },
  { hour: 4, pct: 0.97 },
  { hour: 8, pct: 0.93 },
  { hour: 12, pct: 0.88 },
  { hour: 24, pct: 0.8 },
  { hour: 36, pct: 0.72 },
  { hour: 48, pct: 0.65 },
]

function roundToHundreds(n) {
  return Math.round(n / 100) * 100
}

function pctAtHour(hour) {
  if (hour <= DECAY_CURVE[0].hour) return DECAY_CURVE[0].pct
  const last = DECAY_CURVE[DECAY_CURVE.length - 1]
  if (hour >= last.hour) return last.pct
  for (let i = 0; i < DECAY_CURVE.length - 1; i++) {
    const a = DECAY_CURVE[i]
    const b = DECAY_CURVE[i + 1]
    if (hour >= a.hour && hour <= b.hour) {
      const t = (hour - a.hour) / (b.hour - a.hour)
      return a.pct + (b.pct - a.pct) * t
    }
  }
  return 1
}

function priceAtHour(basePrice, hour) {
  return roundToHundreds(basePrice * pctAtHour(hour))
}

function buildPriceHistory(basePrice) {
  return DECAY_CURVE.map(({ hour, pct }) => ({
    hour,
    price: roundToHundreds(basePrice * pct),
  }))
}

// Raw product definitions — currentPrice/priceHistory are derived below so
// the numbers always stay consistent with each other.
const RAW_PRODUCTS = [
  {
    id: 'p1',
    name: 'Tuna Sirip Kuning Utuh',
    latinName: 'Thunnus albacares',
    category: 'Ikan Laut',
    catchMethod: 'LINE',
    tag: 'Baru Datang',
    grade: 'Grade A — Kualitas Ekspor Premium',
    freshness: 97,
    hoursSinceCatch: 4,
    weightKg: 6.5,
    unit: '/kg',
    basePrice: 150000,
    coldChainTemp: -2,
    coldChainIntegrity: 95,
    zone: 'WPP-NRI 573 (Selatan Jawa)',
    fisherman: 'Bpk. Herman',
    boat: "Kapal 'Maju Jaya'",
    catchTime: '04:30 WIB, Pelabuhan Ratu',
    nextDropEtaMinutes: 135,
    imageSeed: 1,
  },
  {
    id: 'p2',
    name: 'Kakap Merah',
    latinName: 'Lutjanus campechanus',
    category: 'Ikan Laut',
    catchMethod: 'LINE',
    tag: 'Best Value',
    grade: 'Grade A',
    freshness: 96,
    hoursSinceCatch: 2,
    weightKg: 1.2,
    unit: '/kg',
    basePrice: 145000,
    coldChainTemp: -1.5,
    coldChainIntegrity: 94,
    zone: 'Selat Sunda, Zona B-12',
    fisherman: 'Pak Surya',
    boat: 'KM Segar Jaya 2',
    catchTime: '05:10 WIB, Pelabuhan Ratu',
    nextDropEtaMinutes: 30,
    imageSeed: 2,
  },
  {
    id: 'p3',
    name: 'Salmon Fillet Segar',
    latinName: 'Salmo salar',
    category: 'Ikan Laut',
    catchMethod: 'WILD',
    tag: null,
    grade: 'Grade A',
    freshness: 92,
    hoursSinceCatch: 2,
    weightKg: 0.5,
    unit: '/500g',
    basePrice: 250000,
    coldChainTemp: -2.5,
    coldChainIntegrity: 96,
    zone: 'Perairan Sabang',
    fisherman: 'Pak Rahman',
    boat: 'KM Nusantara Jaya',
    catchTime: '02:00 WIB, Sabang',
    nextDropEtaMinutes: 90,
    imageSeed: 3,
  },
  {
    id: 'p4',
    name: 'Kerapu Macan',
    latinName: 'Epinephelus fuscoguttatus',
    category: 'Ikan Laut',
    catchMethod: 'NET',
    tag: 'Baru Datang',
    grade: 'Grade A',
    freshness: 100,
    hoursSinceCatch: 1,
    weightKg: 1.5,
    unit: '/kg',
    basePrice: 420000,
    coldChainTemp: -1,
    coldChainIntegrity: 98,
    zone: 'Kepulauan Seribu',
    fisherman: 'Pak Anto',
    boat: 'KM Karang Segar',
    catchTime: '06:20 WIB, Muara Angke',
    nextDropEtaMinutes: 180,
    imageSeed: 4,
  },
  {
    id: 'p5',
    name: 'Kakap Merah Fillet',
    latinName: 'Lutjanus campechanus',
    category: 'Ikan Laut',
    catchMethod: 'LINE',
    tag: 'Diskon',
    grade: 'Grade B',
    freshness: 55,
    hoursSinceCatch: 30,
    weightKg: 1,
    unit: '/kg',
    basePrice: 220000,
    coldChainTemp: 1.5,
    coldChainIntegrity: 62,
    zone: 'Selat Sunda, Zona B-12',
    fisherman: 'Pak Surya',
    boat: 'KM Segar Jaya 2',
    catchTime: 'Kemarin, 08:00 WIB',
    nextDropEtaMinutes: 15,
    imageSeed: 5,
  },
  {
    id: 'p6',
    name: 'Baronang Segar',
    latinName: 'Siganus guttatus',
    category: 'Ikan Laut',
    catchMethod: 'NET',
    tag: null,
    grade: 'Grade B',
    freshness: 70,
    hoursSinceCatch: 14,
    weightKg: 1,
    unit: '/kg',
    basePrice: 68000,
    coldChainTemp: 0.5,
    coldChainIntegrity: 78,
    zone: 'Teluk Jakarta',
    fisherman: 'Pak Dedi',
    boat: 'KM Cakrawala',
    catchTime: 'Kemarin, 19:00 WIB',
    nextDropEtaMinutes: 60,
    imageSeed: 6,
  },
  {
    id: 'p7',
    name: 'Bandeng Segar',
    latinName: 'Chanos chanos',
    category: 'Ikan Air Tawar',
    catchMethod: 'FARM',
    tag: null,
    grade: 'Grade A',
    freshness: 85,
    hoursSinceCatch: 8,
    weightKg: 0.6,
    unit: '/kg',
    basePrice: 42000,
    coldChainTemp: 2,
    coldChainIntegrity: 90,
    zone: 'Tambak Karawang',
    fisherman: 'Pak Slamet',
    boat: '— (tambak)',
    catchTime: 'Hari ini, 05:00 WIB',
    nextDropEtaMinutes: 240,
    imageSeed: 7,
  },
  {
    id: 'p8',
    name: 'Ikan Mas Segar',
    latinName: 'Cyprinus carpio',
    category: 'Ikan Air Tawar',
    catchMethod: 'FARM',
    tag: null,
    grade: 'Grade A',
    freshness: 82,
    hoursSinceCatch: 9,
    weightKg: 1,
    unit: '/kg',
    basePrice: 46000,
    coldChainTemp: 3,
    coldChainIntegrity: 87,
    zone: 'Waduk Cirata',
    fisherman: 'Bu Ratna',
    boat: '— (keramba)',
    catchTime: 'Hari ini, 06:30 WIB',
    nextDropEtaMinutes: 200,
    imageSeed: 8,
  },
  {
    id: 'p9',
    name: 'Ikan Nila Segar',
    latinName: 'Oreochromis niloticus',
    category: 'Ikan Air Tawar',
    catchMethod: 'FARM',
    tag: 'Diskon',
    grade: 'Grade B',
    freshness: 78,
    hoursSinceCatch: 16,
    weightKg: 1,
    unit: '/kg',
    basePrice: 38000,
    coldChainTemp: 3.5,
    coldChainIntegrity: 80,
    zone: 'Waduk Jatiluhur',
    fisherman: 'Pak Wahyu',
    boat: '— (keramba)',
    catchTime: 'Kemarin, 17:00 WIB',
    nextDropEtaMinutes: 45,
    imageSeed: 9,
  },
  {
    id: 'p10',
    name: 'Udang Windu Besar',
    latinName: 'Penaeus monodon',
    category: 'Kerang & Udang',
    catchMethod: 'FARM',
    tag: null,
    grade: 'Grade A',
    freshness: 91,
    hoursSinceCatch: 1,
    weightKg: 1,
    unit: '/kg',
    basePrice: 130000,
    coldChainTemp: -0.5,
    coldChainIntegrity: 93,
    zone: 'Tambak Sidoarjo',
    fisherman: 'Pak Bambang',
    boat: '— (tambak)',
    catchTime: 'Hari ini, 03:00 WIB',
    nextDropEtaMinutes: 150,
    imageSeed: 10,
  },
  {
    id: 'p11',
    name: 'Cumi-Cumi Segar',
    latinName: 'Loligo sp.',
    category: 'Kerang & Udang',
    catchMethod: 'NET',
    tag: null,
    grade: 'Grade A',
    freshness: 80,
    hoursSinceCatch: 8,
    weightKg: 1,
    unit: '/kg',
    basePrice: 68000,
    coldChainTemp: 0,
    coldChainIntegrity: 84,
    zone: 'Laut Jawa',
    fisherman: 'Pak Joko',
    boat: 'KM Ombak Biru',
    catchTime: 'Hari ini, 01:00 WIB',
    nextDropEtaMinutes: 70,
    imageSeed: 11,
  },
  {
    id: 'p12',
    name: 'Tiger King Prawns',
    latinName: 'Penaeus semisulcatus',
    category: 'Kerang & Udang',
    catchMethod: 'WILD',
    tag: 'Baru Datang',
    grade: 'Grade A',
    freshness: 88,
    hoursSinceCatch: 6,
    weightKg: 1,
    unit: '/kg',
    basePrice: 235000,
    coldChainTemp: -1,
    coldChainIntegrity: 90,
    zone: 'Laut Arafura',
    fisherman: 'Pak Yusuf',
    boat: 'KM Arafura Sejahtera',
    catchTime: 'Hari ini, 00:30 WIB',
    nextDropEtaMinutes: 100,
    imageSeed: 12,
  },
  {
    id: 'p13',
    name: 'Kerang Hijau',
    latinName: 'Perna viridis',
    category: 'Kerang & Udang',
    catchMethod: 'WILD',
    tag: null,
    grade: 'Grade A',
    freshness: 93,
    hoursSinceCatch: 3,
    weightKg: 1,
    unit: '/kg',
    basePrice: 38000,
    coldChainTemp: -0.5,
    coldChainIntegrity: 92,
    zone: 'Teluk Lada',
    fisherman: 'Pak Umar',
    boat: 'KM Kerang Jaya',
    catchTime: 'Hari ini, 04:00 WIB',
    nextDropEtaMinutes: 110,
    imageSeed: 13,
  },
  {
    id: 'p14',
    name: 'Wild Bluefin Tuna',
    latinName: 'Thunnus orientalis',
    category: 'Ikan Laut',
    catchMethod: 'LINE',
    tag: 'Baru Datang',
    grade: 'Grade A — Kualitas Ekspor Premium',
    freshness: 97,
    hoursSinceCatch: 2,
    weightKg: 0.5,
    unit: '/500g',
    basePrice: 480000,
    coldChainTemp: -2,
    coldChainIntegrity: 97,
    zone: 'Samudra Pasifik',
    fisherman: 'Pak Herman',
    boat: 'KM Maju Jaya',
    catchTime: 'Hari ini, 03:30 WIB',
    nextDropEtaMinutes: 160,
    imageSeed: 14,
  },
]

export const products = RAW_PRODUCTS.map((p) => ({
  ...p,
  currentPrice: priceAtHour(p.basePrice, p.hoursSinceCatch),
  priceHistory: buildPriceHistory(p.basePrice),
}))

export const featuredListingId = 'p1'

export function getProductById(id) {
  return products.find((p) => p.id === id)
}

export function rupiah(n) {
  return `Rp${Math.round(n).toLocaleString('id-ID')}`
}

export function rupiahShort(n) {
  if (n >= 1000000) {
    const v = n / 1000000
    return `Rp${v % 1 === 0 ? v : v.toFixed(1)}jt`
  }
  if (n >= 1000) return `Rp${Math.round(n / 1000)}rb`
  return `Rp${n}`
}

export function freshnessColor(pct) {
  if (pct >= 90) return FRESH_STOPS.peak
  if (pct >= 80) return FRESH_STOPS.good
  if (pct >= 60) return FRESH_STOPS.fair
  return FRESH_STOPS.low
}

export function freshnessLabel(pct) {
  if (pct >= 90) return 'Sangat Segar'
  if (pct >= 80) return 'Segar'
  if (pct >= 60) return 'Standar'
  return 'Diskon'
}

export function freshnessTier(pct) {
  if (pct >= 95) return 'super'
  if (pct >= 80) return 'fresh'
  return 'budget'
}

export function formatMinutes(mins) {
  const h = Math.floor(mins / 60)
  const m = mins % 60
  return h > 0 ? `${h}j ${m}m` : `${m}m`
}

// Compact form ("2j lalu") — used on pill badges where space is tight
// (product card thumbnails, cart line items). The full "2 jam lalu" form
// was overflowing the 96px cart thumbnail badge.
export function timeAgo(hours) {
  if (hours < 1) return '<1j lalu'
  return `${hours}j lalu`
}

export function hashString(str) {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i)
    hash |= 0
  }
  return Math.abs(hash)
}
