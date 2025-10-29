import { motion } from 'motion/react';
import { useState } from 'react';

interface HeatmapData {
  industry: string;
  conversionRate: number;
  bestOpener: string;
  aiNote: string;
}

export function ConversionHeatmap() {
  const [hoveredCell, setHoveredCell] = useState<HeatmapData | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const heatmapData: HeatmapData[] = [
    {
      industry: 'Healthcare',
      conversionRate: 37,
      bestOpener: 'Audit hardening with E5',
      aiNote: 'HIPAA compliance messaging increases engagement by 42%',
    },
    {
      industry: 'Retail',
      conversionRate: 28,
      bestOpener: 'E-commerce security and uptime',
      aiNote: 'PCI compliance and uptime guarantees resonate strongest',
    },
    {
      industry: 'Logistics',
      conversionRate: 31,
      bestOpener: 'Supply chain visibility + cloud',
      aiNote: 'Emphasize real-time collaboration and mobile access',
    },
    {
      industry: 'Legal',
      conversionRate: 42,
      bestOpener: 'Client data protection & compliance',
      aiNote: 'Legal holds and eDiscovery features drive high interest',
    },
    {
      industry: 'Technology',
      conversionRate: 25,
      bestOpener: 'DevOps integration & scalability',
      aiNote: 'Technical depth and integration stories perform best',
    },
    {
      industry: 'Manufacturing',
      conversionRate: 33,
      bestOpener: 'IoT + cloud modernization',
      aiNote: 'Factory floor modernization and operational efficiency angle',
    },
  ];

  const getColorFromRate = (rate: number) => {
    if (rate >= 40) return 'from-purple-700 to-purple-600';
    if (rate >= 35) return 'from-purple-600 to-blue-600';
    if (rate >= 30) return 'from-blue-600 to-blue-500';
    if (rate >= 25) return 'from-blue-500 to-purple-400';
    return 'from-purple-300 to-purple-200';
  };

  const handleMouseMove = (e: React.MouseEvent, data: HeatmapData) => {
    setHoveredCell(data);
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-purple-700 to-purple-600 p-4">
        <h2 className="text-white">Conversion Performance by Industry</h2>
      </div>
      <div className="p-6">
        <div className="mb-4 text-sm text-gray-600">
          Interactive heatmap showing conversion rates and best-performing
          messaging by industry sector. Hover for insights.
        </div>

        {/* Heatmap Grid */}
        <div className="space-y-3">
          {heatmapData.map((data, index) => (
            <motion.div
              key={data.industry}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              onMouseMove={(e) => handleMouseMove(e, data)}
              onMouseLeave={() => setHoveredCell(null)}
              className="relative group cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="w-32 text-gray-900">{data.industry}</div>
                <div className="flex-1 h-12 relative rounded-lg overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${data.conversionRate}%` }}
                    transition={{ delay: 0.3 + index * 0.05, duration: 0.8 }}
                    className={`h-full bg-gradient-to-r ${getColorFromRate(
                      data.conversionRate
                    )} rounded-lg transition-all group-hover:shadow-lg`}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white font-medium drop-shadow-md">
                      {data.conversionRate}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Hover Underline Effect */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                className="h-0.5 bg-blue-500 origin-left mt-1 rounded-full"
              />
            </motion.div>
          ))}
        </div>

        {/* Color Legend */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Lower Conversion</span>
            <div className="flex gap-1">
              {[
                'from-purple-300 to-purple-200',
                'from-blue-500 to-purple-400',
                'from-blue-600 to-blue-500',
                'from-purple-600 to-blue-600',
                'from-purple-700 to-purple-600',
              ].map((color, i) => (
                <div
                  key={i}
                  className={`w-12 h-4 bg-gradient-to-r ${color} rounded`}
                />
              ))}
            </div>
            <span className="text-gray-600">Higher Conversion</span>
          </div>
        </div>

        {/* Hover Tooltip */}
        {hoveredCell && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{
              position: 'fixed',
              left: mousePos.x + 20,
              top: mousePos.y - 80,
              pointerEvents: 'none',
              zIndex: 50,
            }}
            className="bg-gray-900 text-white rounded-lg p-4 shadow-xl max-w-xs"
          >
            <div className="mb-2">
              <span className="text-blue-400">
                {hoveredCell.industry}
              </span>{' '}
              · {hoveredCell.conversionRate}%
            </div>
            <div className="mb-2 text-sm">
              <strong>Best Opener:</strong> "{hoveredCell.bestOpener}"
            </div>
            <div className="text-sm text-gray-300">
              💡 {hoveredCell.aiNote}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
