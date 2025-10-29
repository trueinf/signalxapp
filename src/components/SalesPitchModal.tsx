import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, Copy, CheckCircle2 } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Slider } from './ui/slider';

interface UnmanagedAccount {
  id: string;
  company: string;
  industry: string;
  size: number;
  productFit: string;
  propensity: number;
  aiInsight: string;
  buyingStage: string;
  geography: string;
}

interface SalesPitchModalProps {
  account: UnmanagedAccount;
  onClose: () => void;
  onApply: (pitch: string) => void;
}

interface PitchOption {
  id: string;
  tone: 'Friendly' | 'Professional' | 'Challenger';
  opener: string;
  body: string;
  cta: string;
  confidence: number;
}

export function SalesPitchModal({
  account,
  onClose,
  onApply,
}: SalesPitchModalProps) {
  const [toneValue, setToneValue] = useState([50]);
  const [selectedPitch, setSelectedPitch] = useState<string | null>(null);
  const [copiedPitch, setCopiedPitch] = useState<string | null>(null);

  // Determine tone based on slider value
  const getTone = (value: number): 'Friendly' | 'Professional' | 'Challenger' => {
    if (value < 33) return 'Friendly';
    if (value < 67) return 'Professional';
    return 'Challenger';
  };

  const currentTone = getTone(toneValue[0]);

  const pitchOptions: PitchOption[] = [
    {
      id: '1',
      tone: 'Friendly',
      opener: `Hi team at ${account.company}!`,
      body: `I noticed you're in the ${account.industry.toLowerCase()} space and wanted to reach out. We've helped similar organizations streamline their operations and boost security. Would love to share some quick wins we've seen with companies like yours!`,
      cta: 'Can we grab 15 minutes next week to explore if this could help your team?',
      confidence: 0.78,
    },
    {
      id: '2',
      tone: 'Professional',
      opener: `Good afternoon,`,
      body: `I'm reaching out regarding ${account.company}'s current technology infrastructure. Based on industry insights, ${account.industry.toLowerCase()} organizations of your size often face challenges with ${account.aiInsight.toLowerCase()}. Our ${account.productFit} solutions have helped similar companies achieve measurable improvements in both security posture and operational efficiency.`,
      cta: 'I\'d appreciate the opportunity to discuss how we might support your goals. Would you be available for a brief consultation?',
      confidence: 0.85,
    },
    {
      id: '3',
      tone: 'Challenger',
      opener: `Let's talk about competitive advantage.`,
      body: `${account.company} is positioned in a competitive ${account.industry.toLowerCase()} market. Our research indicates that ${account.aiInsight.toLowerCase()}—which creates both risk and opportunity. Leading organizations in your sector are leveraging ${account.productFit} to not just solve problems, but to differentiate themselves. The question is: are you ready to lead or follow?`,
      cta: 'I challenge you to a 20-minute conversation about turning your IT infrastructure into a strategic weapon. Interested?',
      confidence: 0.72,
    },
  ];

  // Filter pitches based on current tone
  const relevantPitches = pitchOptions.filter(
    (pitch) => pitch.tone === currentTone
  );

  const handleCopy = (pitchId: string) => {
    setCopiedPitch(pitchId);
    setTimeout(() => setCopiedPitch(null), 2000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-700 to-blue-600 p-6 flex items-center justify-between">
            <div>
              <h2 className="text-white mb-1">Customize Sales Pitch</h2>
              <p className="text-purple-100 text-sm">
                AI-generated openers for {account.company}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-purple-100 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {/* AI Context Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6"
            >
              <div className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-blue-900 mb-2">AI Context Analysis</h3>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-blue-700">Industry:</span>{' '}
                      <span className="text-blue-900">{account.industry}</span>
                    </div>
                    <div>
                      <span className="text-blue-700">Company Size:</span>{' '}
                      <span className="text-blue-900">{account.size} emp</span>
                    </div>
                    <div>
                      <span className="text-blue-700">Product Fit:</span>{' '}
                      <span className="text-blue-900">{account.productFit}</span>
                    </div>
                    <div>
                      <span className="text-blue-700">Buying Stage:</span>{' '}
                      <span className="text-blue-900">{account.buyingStage}</span>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-blue-300">
                    <span className="text-blue-700 text-sm">Key Signal:</span>{' '}
                    <span className="text-blue-900 text-sm">
                      {account.aiInsight}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Tone Slider */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-6"
            >
              <div className="flex items-center justify-between mb-3">
                <label className="text-gray-900">Tone Selector</label>
                <Badge className="bg-purple-700">
                  {currentTone}
                </Badge>
              </div>
              <Slider
                value={toneValue}
                onValueChange={setToneValue}
                min={0}
                max={100}
                step={1}
                className="mb-2"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>Friendly</span>
                <span>Professional</span>
                <span>Challenger</span>
              </div>
            </motion.div>

            {/* Pitch Options */}
            <div className="space-y-4">
              <h3 className="text-gray-900 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-600" />
                AI-Generated Pitch Options
              </h3>

              {relevantPitches.map((pitch, index) => (
                <motion.div
                  key={pitch.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className={`p-5 rounded-lg border-2 transition-all cursor-pointer ${
                    selectedPitch === pitch.id
                      ? 'border-purple-600 bg-purple-50'
                      : 'border-gray-200 bg-white hover:border-purple-300'
                  }`}
                  onClick={() => setSelectedPitch(pitch.id)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <Badge
                      variant="outline"
                      className="border-purple-300 text-purple-700"
                    >
                      Option {index + 1}
                    </Badge>
                    <div className="flex items-center gap-2">
                      <span className="text-blue-600 text-sm">
                        {(pitch.confidence * 100).toFixed(0)}% confidence
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopy(pitch.id);
                        }}
                        className="text-gray-500 hover:text-purple-600 transition-colors"
                      >
                        {copiedPitch === pitch.id ? (
                          <CheckCircle2 className="w-4 h-4 text-green-600" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="text-gray-500">Opener:</span>
                      <p className="text-gray-900 mt-1">{pitch.opener}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Body:</span>
                      <p className="text-gray-900 mt-1">{pitch.body}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Call-to-Action:</span>
                      <p className="text-gray-900 mt-1">{pitch.cta}</p>
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${pitch.confidence * 100}%` }}
                        transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
                        className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* AI Learning Note */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-6 p-4 bg-purple-50 border border-purple-200 rounded-lg"
            >
              <p className="text-purple-900 text-sm">
                💡 <strong>AI Tip:</strong> Based on past successful outreach to{' '}
                {account.industry.toLowerCase()} companies, {currentTone.toLowerCase()}{' '}
                tone performs{' '}
                {currentTone === 'Professional' ? 'best' : 'well'} for companies
                in the {account.buyingStage.toLowerCase()} buying stage.
              </p>
            </motion.div>
          </div>

          {/* Footer Actions */}
          <div className="border-t border-gray-200 p-6 flex items-center justify-between bg-gray-50">
            <Button
              variant="outline"
              onClick={onClose}
              className="border-gray-300 text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                const pitch = pitchOptions.find((p) => p.id === selectedPitch);
                if (pitch) {
                  onApply(
                    `${pitch.opener}\n\n${pitch.body}\n\n${pitch.cta}`
                  );
                }
              }}
              disabled={!selectedPitch}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Apply Pitch to Outreach Builder
            </Button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
