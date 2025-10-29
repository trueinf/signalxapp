import { useState } from 'react';
import { motion } from 'motion/react';
import { FileText, CheckCircle2, RotateCcw, Beaker } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface PlaybookCompilerProps {
  onPublish: (message: string) => void;
}

export function PlaybookCompiler({ onPublish }: PlaybookCompilerProps) {
  const [selectedUpdate, setSelectedUpdate] = useState<string | null>(null);

  const updates = [
    {
      id: '1',
      category: 'Objection Handling',
      old: 'Google is cheaper',
      new: 'Emphasize consolidation TCO and breach avoidance ROI',
      confidence: 0.91,
      testSegment: 'Healthcare',
    },
    {
      id: '2',
      category: 'Value Proposition',
      old: 'We provide comprehensive security',
      new: 'Reduce security vendor sprawl by 60% while improving threat detection',
      confidence: 0.87,
      testSegment: 'All Verticals',
    },
    {
      id: '3',
      category: 'Discovery Questions',
      old: 'What are your current pain points?',
      new: 'How are you currently managing compliance reporting across multiple tools?',
      confidence: 0.84,
      testSegment: 'Legal & Healthcare',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden"
    >
      <div className="bg-gradient-to-r from-purple-700 to-purple-600 p-4">
        <h2 className="text-white flex items-center gap-2">
          <FileText className="w-5 h-5" />
          Playbook Compiler
        </h2>
      </div>
      <div className="p-6">
        <p className="text-gray-600 text-sm mb-4">
          AI-generated updates to sales playbook based on winning patterns
        </p>

        <div className="space-y-4">
          {updates.map((update, index) => (
            <motion.div
              key={update.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
                selectedUpdate === update.id
                  ? 'border-purple-600 bg-purple-50'
                  : 'border-gray-200 hover:border-purple-300'
              }`}
              onClick={() => setSelectedUpdate(update.id)}
            >
              <div className="flex items-center justify-between mb-3">
                <Badge className="bg-purple-700">{update.category}</Badge>
                <span className="text-blue-600 text-sm">
                  {(update.confidence * 100).toFixed(0)}% confidence
                </span>
              </div>

              {/* Diff View */}
              <div className="space-y-2 mb-3">
                <div className="p-2 bg-red-50 border border-red-200 rounded">
                  <div className="flex items-start gap-2">
                    <span className="text-red-600 text-xs font-mono">OLD</span>
                    <p className="text-red-700 text-sm flex-1">{update.old}</p>
                  </div>
                </div>
                <div className="p-2 bg-green-50 border border-green-200 rounded">
                  <div className="flex items-start gap-2">
                    <span className="text-green-600 text-xs font-mono">NEW</span>
                    <p className="text-green-700 text-sm flex-1">{update.new}</p>
                  </div>
                </div>
              </div>

              <div className="text-xs text-gray-500 mb-3">
                Test Segment: {update.testSegment}
              </div>

              {/* Confidence Bar */}
              <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${update.confidence * 100}%` }}
                  transition={{ delay: 0.8 + index * 0.1, duration: 0.6 }}
                  className="h-full bg-gradient-to-r from-purple-600 to-blue-600 rounded-full"
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Actions */}
        <div className="mt-6 pt-6 border-t border-gray-200 flex gap-3">
          <Button
            onClick={() => onPublish('AI playbook variant published ✔')}
            disabled={!selectedUpdate}
            className="flex-1 bg-green-600 hover:bg-green-700"
          >
            <CheckCircle2 className="w-4 h-4 mr-2" />
            Publish to Agents
          </Button>
          <Button
            variant="outline"
            disabled={!selectedUpdate}
            className="border-orange-400 text-orange-700 hover:bg-orange-50"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Rollback
          </Button>
          <Button
            variant="outline"
            disabled={!selectedUpdate}
            className="border-blue-400 text-blue-700 hover:bg-blue-50"
          >
            <Beaker className="w-4 h-4 mr-2" />
            A/B Test
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
