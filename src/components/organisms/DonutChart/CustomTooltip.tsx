/* eslint-disable @typescript-eslint/no-explicit-any */
export default function CustomTooltip({ active, payload }: {
    active: boolean
    payload: any[]
}) {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-900">{data.name}</p>
          <p className="text-sm text-gray-600">Value: {data.value.toLocaleString()}</p>
          <p className="text-sm text-gray-600">Percentage: {data.percentage}%</p>
        </div>
      )
    }
    return null
  }
