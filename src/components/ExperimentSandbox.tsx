import { useState } from 'react';
import { motion } from 'motion/react';
import { Beaker, Sparkles, Play, User, Target } from 'lucide-react';
import { Button } from './ui/button';
import { Label } from './ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Progress } from './ui/progress';

interface ExperimentSandboxProps {
  onCreate: (message: string) => void;
}

export function ExperimentSandbox({ onCreate }: ExperimentSandboxProps) {
  const [variable, setVariable] = useState('subject-line');
  const [segment, setSegment] = useState('healthcare');
  const [metric, setMetric] = useState('conversion');
  const [progress] = useState(34);

  const handleCreateExperiment = () => {
    onCreate('Experiment created successfully ✔');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden"
    >
      <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-4">
        <h2 className="text-white flex items-center gap-2">
          <Beaker className="w-5 h-5" />
          Experiment Sandbox
        </h2>
      </div>
      <div className="p-6">
        <p className="text-gray-600 text-sm mb-6">
          Create micro-tests to optimize sales performance
        </p>

        {/* Experiment Form */}
        <div className="space-y-4 mb-6">
          <div>
            <Label className="text-gray-900 mb-2 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-600" />
              Test Variable
            </Label>
            <Select value={variable} onValueChange={setVariable}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="subject-line">Subject Line</SelectItem>
                <SelectItem value="offer">Offer Structure</SelectItem>
                <SelectItem value="pitch">Pitch Angle</SelectItem>
                <SelectItem value="timing">Send Timing</SelectItem>
                <SelectItem value="cta">Call-to-Action</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-gray-900 mb-2 flex items-center gap-2">
              <Target className="w-4 h-4 text-purple-600" />
              Target Segment
            </Label>
            <Select value={segment} onValueChange={setSegment}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="healthcare">Healthcare</SelectItem>
                <SelectItem value="retail">Retail</SelectItem>
                <SelectItem value="logistics">Logistics</SelectItem>
                <SelectItem value="legal">Legal</SelectItem>
                <SelectItem value="technology">Technology</SelectItem>
                <SelectItem value="manufacturing">Manufacturing</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-gray-900 mb-2 flex items-center gap-2">
              <User className="w-4 h-4 text-purple-600" />
              Success Metric
            </Label>
            <Select value={metric} onValueChange={setMetric}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="conversion">Conversion %</SelectItem>
                <SelectItem value="open-rate">Open Rate</SelectItem>
                <SelectItem value="reply-rate">Reply Rate</SelectItem>
                <SelectItem value="deal-cycle">Deal Cycle Time</SelectItem>
                <SelectItem value="win-rate">Win Rate</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* AI Auto-Assignment Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="p-4 bg-blue-50 border border-blue-200 rounded-lg mb-6"
        >
          <div className="flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h4 className="text-blue-900 mb-2">AI Auto-Assignment</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-blue-700">Cohort A (Control):</span>
                  <span className="text-blue-900">50 accounts</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-blue-700">Cohort B (Variant):</span>
                  <span className="text-blue-900">50 accounts</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-blue-700">Duration:</span>
                  <span className="text-blue-900">14 days</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-blue-700">Min Sample Size:</span>
                  <span className="text-green-700">✓ Met</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Progress Visualization */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-700 text-sm">Active Experiments</span>
            <span className="text-blue-600 text-sm">{progress}% complete</span>
          </div>
          <Progress value={progress} className="h-3" />
        </div>

        {/* Who/What/Why Summary */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="p-4 bg-purple-50 border border-purple-200 rounded-lg mb-6"
        >
          <h4 className="text-purple-900 mb-3">Experiment Summary</h4>
          <div className="space-y-2 text-sm">
            <div>
              <span className="text-purple-700">Who:</span>{' '}
              <span className="text-gray-900">
                {segment.charAt(0).toUpperCase() + segment.slice(1)} segment (100
                accounts)
              </span>
            </div>
            <div>
              <span className="text-purple-700">What:</span>{' '}
              <span className="text-gray-900">
                Testing {variable.replace('-', ' ')} variations
              </span>
            </div>
            <div>
              <span className="text-purple-700">Why:</span>{' '}
              <span className="text-gray-900">
                Optimize {metric.replace('-', ' ')} performance
              </span>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button
            onClick={handleCreateExperiment}
            className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
          >
            <Play className="w-4 h-4 mr-2" />
            Create Experiment
          </Button>
          <Button
            variant="outline"
            className="border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            Reset
          </Button>
        </div>

        {/* Approval Toggle */}
        <div className="mt-4 p-3 bg-gray-50 border border-gray-200 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-900 text-sm">Requires Manager Approval</p>
              <p className="text-gray-500 text-xs">
                Experiments affecting &gt;100 accounts need approval
              </p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="approval"
                className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                defaultChecked
              />
              <label htmlFor="approval" className="text-gray-700 text-sm">
                Enabled
              </label>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
