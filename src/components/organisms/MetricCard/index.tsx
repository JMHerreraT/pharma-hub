"use client"

import React from 'react';
import { MoreHorizontal } from 'lucide-react';
import * as Tooltip from '@radix-ui/react-tooltip';

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative';
  period: string;
  icon: React.ReactNode;
  color: 'green' | 'teal' | 'red' | 'purple';
  className?: string;
}

const MetricCard = ({
  title,
  value,
  change,
  changeType,
  period,
  icon,
  color,
  className = ""
}: MetricCardProps) => {
  const colorVariants = {
    green: {
      bg: 'bg-gradient-to-br from-green-300 to-green-400',
      iconBg: 'bg-green-800/20',
      text: 'text-green-900',
      subtext: 'text-green-800/70',
      decorative: 'bg-green-700/20',
      chartBars: ['bg-green-600/30', 'bg-green-700/40', 'bg-green-600/35', 'bg-green-800/50', 'bg-green-600/30']
    },
    teal: {
      bg: 'bg-gradient-to-br from-teal-300 to-teal-400',
      iconBg: 'bg-teal-800/20',
      text: 'text-teal-900',
      subtext: 'text-teal-800/70',
      decorative: 'bg-teal-700/20',
      chartBars: ['bg-teal-600/30', 'bg-teal-700/40', 'bg-teal-600/35', 'bg-teal-800/50', 'bg-teal-600/30']
    },
    red: {
      bg: 'bg-gradient-to-br from-red-300 to-red-400',
      iconBg: 'bg-red-800/20',
      text: 'text-red-900',
      subtext: 'text-red-800/70',
      decorative: 'bg-red-700/20',
      chartBars: ['bg-red-600/30', 'bg-red-700/40', 'bg-red-600/35', 'bg-red-800/50', 'bg-red-600/30']
    },
    purple: {
      bg: 'bg-gradient-to-br from-purple-300 to-purple-400',
      iconBg: 'bg-purple-800/20',
      text: 'text-purple-900',
      subtext: 'text-purple-800/70',
      decorative: 'bg-purple-700/20',
      chartBars: ['bg-purple-600/30', 'bg-purple-700/40', 'bg-purple-600/35', 'bg-purple-800/50', 'bg-purple-600/30']
    }
  };

  // Mock data for each metric type
  const getMockData = (title: string, index: number) => {
    const mockDataSets = {
      "Today's Sales": [
        { day: 'Mon', value: '$18.50', items: '12 items' },
        { day: 'Tue', value: '$24.80', items: '16 items' },
        { day: 'Wed', value: '$19.30', items: '14 items' },
        { day: 'Thu', value: '$31.20', items: '22 items' },
        { day: 'Fri', value: '$21.70', items: '15 items' }
      ],
      "Available Categories": [
        { day: 'Week 1', value: '1.2%', items: 'Pain Relief' },
        { day: 'Week 2', value: '1.6%', items: 'Antibiotics' },
        { day: 'Week 3', value: '1.4%', items: 'Vitamins' },
        { day: 'Week 4', value: '2.1%', items: 'Supplements' },
        { day: 'Week 5', value: '1.3%', items: 'First Aid' }
      ],
      "Expired Medicines": [
        { day: 'Jan', value: '0.1%', items: '2 expired' },
        { day: 'Feb', value: '0.0%', items: '0 expired' },
        { day: 'Mar', value: '0.2%', items: '3 expired' },
        { day: 'Apr', value: '0.0%', items: '0 expired' },
        { day: 'May', value: '0.1%', items: '1 expired' }
      ],
      "System Users": [
        { day: 'Mon', value: '251K', items: 'Active users' },
        { day: 'Tue', value: '253K', items: 'Active users' },
        { day: 'Wed', value: '249K', items: 'Active users' },
        { day: 'Thu', value: '259K', items: 'Active users' },
        { day: 'Fri', value: '255K', items: 'Active users' }
      ]
    };

    return mockDataSets[title as keyof typeof mockDataSets]?.[index] ||
           { day: `Day ${index + 1}`, value: 'N/A', items: 'No data' };
  };

  const variant = colorVariants[color];

  // Heights for the mini chart bars (different heights to create the chart effect)
  const barHeights = ['h-12', 'h-16', 'h-14', 'h-20', 'h-12'];

  const InteractiveBar = ({ height, colorClass, index }: { height: string, colorClass: string, index: number }) => {
    const mockData = getMockData(title, index);

    return (
      <Tooltip.Provider delayDuration={200}>
        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            <div
              className={`w-2 rounded-full ${height} ${colorClass} cursor-pointer hover:opacity-80 transition-all duration-200 hover:scale-110 relative z-50`}
            />
          </Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Content
              side="top"
              align="center"
              sideOffset={8}
              className="bg-gray-900 dark:bg-gray-800 text-white px-3 py-2 rounded-lg text-xs font-medium shadow-lg z-[100000] animate-in fade-in-0 zoom-in-95"
            >
              <div className="text-center">
                <div className="font-semibold">{mockData.day}</div>
                <div className="text-gray-300 dark:text-gray-200">{mockData.value}</div>
                <div className="text-gray-400 dark:text-gray-300 text-[10px]">{mockData.items}</div>
              </div>
              <Tooltip.Arrow className="fill-gray-900 dark:fill-gray-800" />
            </Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>
      </Tooltip.Provider>
    );
  };

  return (
    <div className={`relative overflow-hidden rounded-2xl sm:rounded-3xl p-4 sm:p-6 ${variant.bg} ${className}`}>
      {/* Mini Chart Background - Responsive positioning */}
      <div className="absolute right-3 sm:right-4 bottom-4 sm:bottom-6 top-4 sm:top-6 w-16 sm:w-20 md:w-24 opacity-40 z-40">
        <div className="flex h-full items-end justify-end gap-0.5 sm:gap-1 pointer-events-none">
          {barHeights.map((height, index) => (
            <div key={index} className="pointer-events-auto">
              <InteractiveBar
                height={height}
                colorClass={variant.chartBars[index]}
                index={index}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Header - Responsive */}
      <div className="flex items-start justify-between mb-4 sm:mb-6 relative z-30">
        <div className={`p-2 sm:p-3 rounded-xl sm:rounded-2xl ${variant.iconBg} backdrop-blur-sm`}>
          <div className={`${variant.text} [&>svg]:w-5 [&>svg]:h-5 sm:[&>svg]:w-6 sm:[&>svg]:h-6`}>
            {icon}
          </div>
        </div>
        <button className={`p-1 rounded-lg hover:bg-black/5 transition-colors ${variant.text}`}>
          <MoreHorizontal size={16} className="sm:w-5 sm:h-5" />
        </button>
      </div>

      {/* Content - Responsive typography */}
      <div className="relative z-30">
        <h3 className={`text-base sm:text-lg font-medium mb-3 sm:mb-4 ${variant.text} line-clamp-2`}>
          {title}
        </h3>

        <div className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3 ${variant.text}`}>
          {value}
        </div>

        <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
          <span className={`text-xs sm:text-sm font-medium ${changeType === 'positive' ? variant.text : 'text-red-800'}`}>
            {changeType === 'positive' ? '+' : ''}{change}
          </span>
          <span className={`text-xs sm:text-sm ${variant.subtext}`}>
            {period}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MetricCard;
