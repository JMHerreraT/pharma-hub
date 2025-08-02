// src/components/organisms/DonutChart/index.tsx
import React, { useState, useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { createPortal } from 'react-dom';

interface DataItem {
  name: string;
  value: number;
  color: string;
}

interface DonutChartProps {
  data: DataItem[];
  title?: string;
  total?: number;
}

const DonutChart: React.FC<DonutChartProps> = ({
  data = [],
  title = "Reporte Gráfico",
  total
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showTooltip, setShowTooltip] = useState(false);

  // Calcular el total si no se proporciona
  const calculatedTotal = useMemo(() => {
    return total || data.reduce((sum, item) => sum + item.value, 0);
  }, [data, total]);

  // Datos mejorados con patrones para "No Sales"
  const enhancedData = useMemo(() => {
    return data.map((item) => ({
      ...item,
      percentage: Math.round((item.value / calculatedTotal) * 100),
      isPattern: item.name.toLowerCase().includes('no sales') || item.name.toLowerCase().includes('sin ventas')
    }));
  }, [data, calculatedTotal]);

  // Dimensiones responsivas
  const chartDimensions = useMemo(() => {
    if (typeof window === 'undefined') {
      return { width: 400, height: 400, innerRadius: 80, outerRadius: 140 };
    }

    const width = window.innerWidth;
    if (width < 640) { // sm
      return { width: 280, height: 280, innerRadius: 60, outerRadius: 100 };
    } else if (width < 768) { // md
      return { width: 320, height: 320, innerRadius: 70, outerRadius: 115 };
    } else { // lg+
      return { width: 400, height: 400, innerRadius: 80, outerRadius: 140 };
    }
  }, []);

  const handleMouseEnter = (e: React.MouseEvent, index: number) => {
    setHoveredIndex(index);
    setShowTooltip(true);
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (showTooltip) {
      setMousePosition({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
    setShowTooltip(false);
  };

  // Función para obtener la posición del label
  const getLabelPosition = (cx: number, cy: number, midAngle: number, innerRadius: number, outerRadius: number) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.7;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    return { x, y };
  };

  // Renderizar etiquetas personalizadas
  const renderCustomLabel = (entry: {
    cx: number;
    cy: number;
    midAngle: number;
    innerRadius: number;
    outerRadius: number;
    percentage: number;
  }) => {
    const { cx, cy, midAngle, innerRadius, outerRadius, percentage } = entry;
    const { x, y } = getLabelPosition(cx, cy, midAngle, innerRadius, outerRadius);

    if (percentage < 5) return null; // No mostrar labels muy pequeños

    return (
      <g>
        <circle
          cx={x}
          cy={y}
          r={18}
          fill="white"
          stroke="#e5e7eb"
          strokeWidth={1}
          className="drop-shadow-sm"
        />
        <text
          x={x}
          y={y}
          dy={4}
          textAnchor="middle"
          fontSize="12"
          fontWeight="600"
          fill="#374151"
        >
          {percentage}%
        </text>
      </g>
    );
  };

  // Tooltip personalizado
  const CustomTooltip = () => {
    if (!showTooltip || hoveredIndex === null) return null;

    const data = enhancedData[hoveredIndex];
    if (!data) return null;

    return (
      <div
        className="fixed pointer-events-none z-[100000] transition-opacity duration-150"
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y - 80}px`,
          transform: 'translateX(-50%)'
        }}
      >
        <div className="bg-gray-800 dark:bg-gray-900 text-white px-4 py-3 rounded-2xl shadow-2xl border border-gray-700">
          <div className="text-sm text-gray-300 mb-1">Apr, 2025</div>
          <div className="text-lg font-bold">${(data.value / 1000).toFixed(2)}K</div>
          <div className="text-xs text-gray-400 mt-1">{data.name}</div>
        </div>
        {/* Arrow */}
        <div className="absolute top-full left-1/2 transform -translate-x-1/2">
          <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent border-t-gray-800 dark:border-t-gray-900"></div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
          {title}
        </h3>
        <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
          <div className="w-5 h-5 flex items-center justify-center">
            <div className="w-1 h-1 bg-gray-400 rounded-full mx-0.5"></div>
            <div className="w-1 h-1 bg-gray-400 rounded-full mx-0.5"></div>
            <div className="w-1 h-1 bg-gray-400 rounded-full mx-0.5"></div>
          </div>
        </button>
      </div>

      {/* Chart Container */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <div
          className="relative"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <ResponsiveContainer width={chartDimensions.width} height={chartDimensions.height}>
            <PieChart>
              {/* Fondo gris completo */}
              <Pie
                data={[{ value: 100 }]}
                cx="50%"
                cy="50%"
                innerRadius={chartDimensions.innerRadius}
                outerRadius={chartDimensions.outerRadius}
                fill="#e5e7eb"
                dataKey="value"
                startAngle={90}
                endAngle={450}
                strokeWidth={0}
              />

              {/* Datos principales con segmentos redondeados */}
              <Pie
                data={enhancedData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomLabel}
                outerRadius={chartDimensions.outerRadius}
                innerRadius={chartDimensions.innerRadius}
                fill="#8884d8"
                dataKey="value"
                startAngle={90}
                endAngle={450}
                strokeWidth={4}
                stroke="white"
                cornerRadius={8}
              >
                {enhancedData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.isPattern ? `url(#pattern-${index})` : entry.color}
                    onMouseEnter={(e: React.MouseEvent) => handleMouseEnter(e, index)}
                    style={{
                      cursor: 'pointer',
                      filter: hoveredIndex === index ? 'brightness(1.1)' : 'none',
                      transition: 'filter 0.2s ease'
                    }}
                  />
                ))}
              </Pie>

              {/* Patrones para elementos rayados */}
              <defs>
                {enhancedData.map((entry, index) =>
                  entry.isPattern && (
                    <pattern
                      key={`pattern-${index}`}
                      id={`pattern-${index}`}
                      patternUnits="userSpaceOnUse"
                      width="8"
                      height="8"
                      patternTransform="rotate(45)"
                    >
                      <rect width="8" height="8" fill={entry.color} />
                      <rect width="4" height="8" fill="white" opacity="0.3" />
                    </pattern>
                  )
                )}
              </defs>
            </PieChart>
          </ResponsiveContainer>

          {/* Centro con total */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center">
              <div className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mb-1">
                Total
              </div>
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
                {calculatedTotal >= 1000
                  ? `${Math.round(calculatedTotal / 1000)}K`
                  : calculatedTotal.toLocaleString()
                }
              </div>
            </div>
          </div>
        </div>

        {/* Leyenda moderna */}
        <div className="mt-6 sm:mt-8 grid grid-cols-2 gap-3 sm:gap-4 w-full max-w-md">
          {enhancedData.map((item, index) => (
            <div key={index} className="flex items-center gap-2 sm:gap-3">
              <div
                className="w-3 h-3 sm:w-4 sm:h-4 rounded-full flex-shrink-0"
                style={{
                  backgroundColor: item.isPattern ? '#9ca3af' : item.color,
                  backgroundImage: item.isPattern
                    ? `repeating-linear-gradient(45deg, ${item.color}, ${item.color} 2px, white 2px, white 4px)`
                    : 'none'
                }}
              />
              <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-medium">
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Tooltip */}
      {typeof window !== 'undefined' && createPortal(
        <CustomTooltip />,
        document.body
      )}
    </div>
  );
};

export default DonutChart;


