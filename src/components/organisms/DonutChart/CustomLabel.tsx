export default function CustomLabel({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percentage,
  }: {
    cx: number
    cy: number
    midAngle: number
    innerRadius: number
    outerRadius: number
    percentage: number
  }) {
    const RADIAN = Math.PI / 180
    const radius = innerRadius + (outerRadius - innerRadius) * 1.2
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)

    return (
      <g>
        <circle cx={x} cy={y} r={20} fill="white" stroke="#E5E5E5" strokeWidth={1} />
        <text
          x={x}
          y={y}
          fill="#374151"
          textAnchor="middle"
          dominantBaseline="central"
          className="text-sm font-semibold"
        >
          {`${percentage}%`}
        </text>
      </g>
    )
  }
