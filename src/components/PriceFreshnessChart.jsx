import {
  Area,
  AreaChart,
  CartesianGrid,
  ReferenceDot,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { Badge, Card } from './ui.jsx'
import { rupiah, rupiahShort } from '../data/mockData.js'

function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div className="card" style={{ padding: '10px 14px' }}>
      <div className="text-label-caps">{label} jam sejak tangkap</div>
      <div className="text-title-md" style={{ marginTop: 4 }}>
        {rupiah(payload[0].value)}
      </div>
    </div>
  )
}

export default function PriceFreshnessChart({ product }) {
  return (
    <Card>
      <div className="chart-card-head">
        <span className="text-title-md">Dinamika Harga vs Kesegaran</span>
        <Badge kind="info" pulse>
          Live Data
        </Badge>
      </div>

      <ResponsiveContainer width="100%" height={260}>
        <AreaChart data={product.priceHistory} margin={{ top: 10, right: 12, left: -8, bottom: 0 }}>
          <defs>
            <linearGradient id="priceFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#09949b" stopOpacity={0.28} />
              <stop offset="100%" stopColor="#09949b" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="#bcc9c9" vertical={false} strokeDasharray="3 4" />
          <XAxis
            dataKey="hour"
            type="number"
            domain={[0, 48]}
            tickFormatter={(h) => `${h}j`}
            stroke="#6d797a"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            tickFormatter={rupiahShort}
            stroke="#6d797a"
            fontSize={12}
            width={72}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip content={<ChartTooltip />} />
          <Area
            type="monotone"
            dataKey="price"
            stroke="#09949b"
            strokeWidth={2.5}
            fill="url(#priceFill)"
            dot={false}
          />
          <ReferenceDot
            x={product.hoursSinceCatch}
            y={product.currentPrice}
            r={6}
            fill="#09949b"
            stroke="#ffffff"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>

      <div className="chart-caption">
        Harga menurun perlahan seiring bertambahnya waktu sejak tangkap. Beli sekarang untuk kualitas
        puncak.
      </div>
    </Card>
  )
}
