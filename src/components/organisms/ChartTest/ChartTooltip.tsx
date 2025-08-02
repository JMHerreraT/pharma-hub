import React, { useState, useRef, useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';

interface Props {
  children: React.ReactNode;
  barMonth: string;
  barYear: string;
  barValue: number;
  maxValue: number;
  barPercentage: number;
}

const ChartTooltip = ({
  children,
  barMonth,
  barYear,
  barValue,
  maxValue,
  barPercentage,
}: Props) => {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isClient, setIsClient] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsVisible(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsVisible(false);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    // Solo actualizar posición si ya está visible para evitar flicker
    if (isVisible) {
      setPosition({
        x: e.clientX + 15,
        y: e.clientY - 10
      });
    }
  }, [isVisible]);

  // Calcular valores correspondientes a la visualización
  const remainingPercentage = 100 - barPercentage;
  const remainingValue = maxValue - barValue;

  const TooltipContent = () => (
    <div
      className="fixed pointer-events-none z-[100000] transition-opacity duration-150 ease-out"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'translate(-50%, -100%)',
        opacity: isVisible ? 1 : 0
      }}
    >
      <div className="w-[320px] shadow-2xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 py-4 px-5 rounded-2xl">
        <div>
          {/* Header con mes y año */}
          <div className="pb-4 border-b border-gray-200 dark:border-gray-700">
            <span className="text-[18px] text-gray-900 dark:text-white font-bold">
              {barMonth} {barYear}
            </span>
            <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Total de estudiantes: {barValue.toLocaleString()}
            </div>
          </div>

          {/* Valor actual de la barra */}
          <div className="py-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <span className="rounded-full min-w-[16px] h-[16px] bg-emerald-500" />
                <span className="text-[15px] text-gray-900 dark:text-white font-medium">
                  Valor actual
                </span>
              </div>
              <span className="text-[15px] text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-100 dark:bg-emerald-500/20 px-3 py-1 rounded-full">
                {barPercentage}%
              </span>
            </div>
            <div className="ml-7">
              <span className="text-[14px] text-gray-600 dark:text-gray-300">
                {barValue.toLocaleString()} de {maxValue.toLocaleString()} máximo
              </span>
            </div>
          </div>

          {/* Divisor */}
          <div className="border-b border-gray-200 dark:border-gray-700" />

          {/* Valor restante para el máximo */}
          <div className="pt-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <span className="rounded-full min-w-[16px] h-[16px] border-2 border-gray-400 bg-gray-400/20" />
                <span className="text-[15px] text-gray-900 dark:text-white font-medium">
                  Restante al máximo
                </span>
              </div>
              <span className="text-[15px] text-gray-600 dark:text-gray-400 font-bold bg-gray-100 dark:bg-gray-500/20 px-3 py-1 rounded-full">
                {remainingPercentage}%
              </span>
            </div>
            <div className="ml-7">
              <span className="text-[14px] text-gray-600 dark:text-gray-300">
                {remainingValue.toLocaleString()} estudiantes adicionales
              </span>
            </div>
          </div>
        </div>

        {/* Custom arrow */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full">
          <div className="w-0 h-0 border-l-[8px] border-r-[8px] border-t-[8px] border-l-transparent border-r-transparent border-t-white dark:border-t-gray-900"></div>
        </div>
      </div>
    </div>
  );

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      {children}

      {isClient && typeof window !== 'undefined' && createPortal(
        <TooltipContent />,
        document.body
      )}
    </div>
  );
};

export default ChartTooltip;
