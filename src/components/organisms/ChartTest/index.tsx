import * as React from 'react';
import { cn } from '@/lib/utils';
import ChartTooltip from './ChartTooltip';

interface ChartData {
  total_students: number;
  month: number;
  year: number;
  on_time: number;
  delinquents: number;
}

interface ChartTestProps {
  data: ChartData[];
  selectedMonth: { label: string; value: string };
  setSelectedMonth: React.Dispatch<React.SetStateAction<{ label: string; value: string }>>;
  capitalize?: (word: string) => string;
  isLoading?: boolean;
}

const ChartTest = ({ data, selectedMonth, setSelectedMonth, capitalize, isLoading }: ChartTestProps) => {
  const labels = {
    1: ['Ene', 'Enero'],
    2: ['Feb', 'Febrero'],
    3: ['Mar', 'Marzo'],
    4: ['Abr', 'Abril'],
    5: ['May', 'Mayo'],
    6: ['Jun', 'Junio'],
    7: ['Jul', 'Julio'],
    8: ['Ago', 'Agosto'],
    9: ['Sep', 'Septiembre'],
    10: ['Oct', 'Octubre'],
    11: ['Nov', 'Noviembre'],
    12: ['Dic', 'Diciembre'],
  };

  // Colores y patrones para cada barra
  const barStyles = [
    { color: '#FF8A65', pattern: 'repeating-linear-gradient(45deg, #FF8A65, #FF8A65 8px, #FF7043 8px, #FF7043 16px)' },
    { color: '#BA68C8', pattern: 'repeating-linear-gradient(45deg, #BA68C8, #BA68C8 8px, #AB47BC 8px, #AB47BC 16px)' },
    { color: '#81C784', pattern: 'repeating-linear-gradient(45deg, #81C784, #81C784 8px, #66BB6A 8px, #66BB6A 16px)' },
    { color: '#4FC3F7', pattern: 'repeating-linear-gradient(45deg, #4FC3F7, #4FC3F7 8px, #29B6F6 8px, #29B6F6 16px)' },
    { color: '#FFB74D', pattern: 'repeating-linear-gradient(45deg, #FFB74D, #FFB74D 8px, #FFA726 8px, #FFA726 16px)' },
    { color: '#F06292', pattern: 'repeating-linear-gradient(45deg, #F06292, #F06292 8px, #EC407A 8px, #EC407A 16px)' },
    { color: '#9575CD', pattern: 'repeating-linear-gradient(45deg, #9575CD, #9575CD 8px, #7E57C2 8px, #7E57C2 16px)' },
    { color: '#4DB6AC', pattern: 'repeating-linear-gradient(45deg, #4DB6AC, #4DB6AC 8px, #26A69A 8px, #26A69A 16px)' },
  ];

  const parseSelectedMonth = (selectedMonth: { label: string; value: string }) => {
    const month = selectedMonth.value.split('-')[0];
    return parseInt(month);
  };

  const parseSelectedYear = (selectedMonth: { label: string; value: string }) => {
    const year = selectedMonth.value.split('-')[1];
    return parseInt(year);
  };

  // Validar que data existe y tiene elementos válidos
  const validData = data && data.length > 0 ? data.filter(item =>
    item.total_students !== undefined &&
    item.total_students !== null &&
    !isNaN(item.total_students) &&
    item.total_students >= 0
  ) : [];

  // Calcular máximo con validación segura
  const maxStudents = validData.length > 0
    ? Math.max(...validData.map((item) => item.total_students))
    : 100; // Valor por defecto si no hay datos válidos

  const roundedMax = maxStudents > 100 ? Math.ceil(maxStudents / 100) * 100 : Math.ceil(maxStudents / 10) * 10;
  const step = roundedMax / 4;
  const values = Array.from({ length: 5 }, (_, i) => Math.round(i * step)).reverse();

  const calculateHeight = (value: number) => {
    if (!value || value <= 0 || !roundedMax || roundedMax <= 0) return 15; // Altura mínima más grande
    const calculatedHeight = Math.min((value / roundedMax) * 100, 100);
    return Math.max(calculatedHeight, 20); // Altura mínima garantizada del 20%
  };

  const gapSize = cn(
    data.length <= 5 && 'gap-6 xl:gap-8',
    data.length > 5 && data.length <= 10 && 'gap-4 xl:gap-6',
    data.length > 10 && data.length <= 12 && 'gap-3 xl:gap-4',
    data.length > 12 && data.length <= 15 && 'gap-2 xl:gap-3',
    data.length > 15 && data.length <= 18 && 'gap-2 xl:gap-3',
    data.length > 18 && data.length < 24 && 'gap-1 xl:gap-2',
    data.length >= 24 && data.length < 30 && 'gap-1 xl:gap-1',
    data.length >= 30 && 'gap-1',
    data.length === 0 && 'gap-4 xl:gap-6'
  );

  // Si no hay datos válidos, mostrar mensaje de no data
  if (!data || data.length === 0) {
    return (
      <div className="flex w-full h-full items-center justify-center rounded-lg">
        <p className="text-gray-500 dark:text-gray-400 text-sm">No hay datos disponibles</p>
      </div>
    );
  }

  return (
    <div className="flex w-full h-full pt-4 sm:pt-6 md:pt-8 justify-between min-h-[300px] sm:min-h-[350px] bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3 sm:p-4 md:p-6">
      <div className="flex flex-col gap-4 sm:gap-6 md:gap-8 items-center justify-between py-2 sm:py-4 flex-shrink-0">
        {values.map((value, i) => (
          <span key={i} className="text-[10px] sm:text-xs text-gray-400 dark:text-gray-500 whitespace-nowrap font-medium">
            {isFinite(value) ? `${value}K` : '0K'}
          </span>
        ))}
      </div>
      <div className={cn(`flex ${gapSize} h-full ml-3 sm:ml-4 md:ml-6 w-full relative flex-1 items-end`)}>
        <div className="h-full position absolute left-0 right-0 top-0 -z-10">
          {Array.from({ length: 5 }, (_, i) => (
            <div key={i} className="h-1/5 border-dashed border-b-[1px] border-gray-200 dark:border-gray-700" />
          ))}
        </div>

        {data.map((item, i) => {
          const barStyle = barStyles[i % barStyles.length];
          const heightPercent = calculateHeight(item.total_students);

          return (
            <div key={i} className="flex flex-col items-center justify-end h-full flex-1 min-w-0 relative">
              {isLoading ? (
                <div className="relative w-6 sm:w-8 md:w-12 h-full flex items-end justify-center">
                  {/* Barra de fondo para loading */}
                  <div className="absolute bottom-0 w-6 sm:w-8 md:w-12 h-full bg-gray-200 dark:bg-gray-700 rounded-full opacity-30" />
                  {/* Barra de loading */}
                  <div className="relative w-6 sm:w-8 md:w-12 h-full rounded-full bg-gray-300 dark:bg-gray-600 min-h-[100px] sm:min-h-[120px] md:min-h-[150px] animate-pulse max-w-6 sm:max-w-8 md:max-w-12 z-10" />
                </div>
              ) : (
                <ChartTooltip
                  barMonth={labels[item.month as keyof typeof labels]?.[1] || ''}
                  barYear={item.year?.toString() || ''}
                  barValue={item.total_students || 0}
                  maxValue={roundedMax}
                  barPercentage={Math.round(heightPercent)}
                >
                  <div className="relative flex flex-col items-center h-full justify-end cursor-pointer group">
                    {/* Container para las barras */}
                    <div className="relative w-6 sm:w-8 md:w-12 h-full flex items-end justify-center">
                      {/* Barra de fondo (100%) */}
                      <div className="absolute bottom-0 w-6 sm:w-8 md:w-12 h-full bg-gray-200 dark:bg-gray-700 rounded-full opacity-30" />

                      {/* Barra principal (porcentaje actual) */}
                      <div
                        className="relative w-6 sm:w-8 md:w-12 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-xl min-h-[80px] sm:min-h-[100px] md:min-h-[120px] overflow-hidden max-w-6 sm:max-w-8 md:max-w-12 z-10"
                        style={{
                          height: `${heightPercent}%`,
                          background: barStyle.pattern,
                          minHeight: heightPercent > 0 ? (typeof window !== 'undefined' && window.innerWidth < 640 ? '80px' : window.innerWidth < 768 ? '100px' : '120px') : '40px'
                        }}
                      >
                        {/* Overlay para efecto hover */}
                        <div className="absolute inset-0 bg-black dark:bg-white opacity-0 group-hover:opacity-10 dark:group-hover:opacity-20 transition-opacity duration-200" />
                      </div>
                    </div>
                  </div>
                </ChartTooltip>
              )}

              <div className="mt-2 sm:mt-3 md:mt-4 text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 text-center font-medium px-1">
                {labels[item.month as keyof typeof labels]?.[0] || ''}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChartTest;
