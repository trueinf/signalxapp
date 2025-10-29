import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Lightbulb, TrendingUp, Filter, Eye } from 'lucide-react';
import { Button } from './ui/button';
import { Progress } from './ui/progress';

interface Insight {
  id: string;
  text: string;
  confidence: number;
  category: string;
}

const insights: Insight[] = [
  {
    id: '1',
    text: 'Healthcare hiring surge detected (+12% cloud roles).',
    confidence: 87,
    category: 'Industry Trend',
  },
  {
    id: '2',
    text: "Retail SMBs mentioning 'migration' up 19%.",
    confidence: 92,
    category: 'Intent Signal',
  },
  {
    id: '3',
    text: '3 new AI-relevant domains found this morning.',
    confidence: 95,
    category: 'New Prospects',
  },
  {
    id: '4',
    text: 'Financial services showing increased compliance searches.',
    confidence: 84,
    category: 'Industry Trend',
  },
];

export function AIInsightsPanel() {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 300, opacity: 0 }}
            transition={{ type: 'spring', damping: 25 }}
            className="w-80 h-full bg-white backdrop-blur-xl border-l border-purple-200 flex flex-col shadow-lg"
          >
            {/* Header */}
            <div className="p-4 border-b border-purple-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center">
                  <Lightbulb className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-gray-900">AI Insights</h3>
              </div>
              <button
                onClick={() => setIsExpanded(false)}
                className="text-purple-600 hover:text-purple-800 transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Insights Feed */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {insights.map((insight, index) => (
                <motion.div
                  key={insight.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-purple-50 rounded-lg p-4 border border-purple-200 hover:border-blue-400 transition-all group shadow-sm hover:shadow-md"
                >
                  {/* AI Indicator */}
                  <div className="flex items-start gap-2 mb-2">
                    <motion.div
                      className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 flex-shrink-0"
                      animate={{
                        boxShadow: [
                          '0 0 4px rgba(59, 130, 246, 0.5)',
                          '0 0 8px rgba(59, 130, 246, 0.8)',
                          '0 0 4px rgba(59, 130, 246, 0.5)',
                        ],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <div className="flex-1">
                      <p className="text-gray-800 text-sm leading-relaxed">
                        {insight.text}
                      </p>
                    </div>
                  </div>

                  {/* Category Badge */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs text-purple-700 bg-purple-200 px-2 py-1 rounded">
                      {insight.category}
                    </span>
                  </div>

                  {/* Confidence Bar */}
                  <div className="mb-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-600">Confidence</span>
                      <span className="text-xs text-blue-600">{insight.confidence}%</span>
                    </div>
                    <Progress 
                      value={insight.confidence} 
                      className="h-1 bg-gray-200"
                    />
                  </div>

                  {/* Quick Actions */}
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="flex-1 h-7 text-xs text-purple-700 hover:text-purple-900 hover:bg-purple-100 border border-purple-300"
                    >
                      <Filter className="w-3 h-3 mr-1" />
                      Add Filter
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="flex-1 h-7 text-xs text-blue-700 hover:text-blue-900 hover:bg-blue-100 border border-blue-300"
                    >
                      <Eye className="w-3 h-3 mr-1" />
                      View Leads
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-purple-200">
              <p className="text-purple-600/70 text-xs text-center">
                Updated in real-time
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Minimized Dock Icon */}
      {!isExpanded && (
        <motion.button
          initial={{ x: 100 }}
          animate={{ x: 0 }}
          onClick={() => setIsExpanded(true)}
          className="fixed right-0 top-1/2 -translate-y-1/2 bg-gradient-to-l from-purple-600 to-purple-700 p-3 rounded-l-lg shadow-lg hover:shadow-purple-500/50 transition-all group"
        >
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Lightbulb className="w-5 h-5 text-white" />
          </motion.div>
          <ChevronLeft className="w-4 h-4 text-white mt-1 opacity-0 group-hover:opacity-100 transition-opacity" />
        </motion.button>
      )}
    </>
  );
}
