import { useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Mail,
  FileText,
  Download,
  Send,
  DollarSign,
  Percent,
  Users,
  Package,
  TrendingUp,
  Sparkles,
} from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import { Progress } from './ui/progress';

interface RenewalRecord {
  id: string;
  customer: string;
  renewalDate: string;
  contractValue: number;
  riskLevel: string;
  riskScore: number;
  usageHealth: number;
  status: string;
  owner: string;
  industry: string;
  location: string;
  seats: number;
  lastRenewal: string;
  discount: number;
}

interface PostCallSummaryProps {
  account: RenewalRecord;
  onClose: () => void;
}

export function PostCallSummary({ account, onClose }: PostCallSummaryProps) {
  const [followUpEmail, setFollowUpEmail] = useState(
    `Hi Team,\n\nThank you for taking the time to discuss your upcoming renewal today. As discussed, I'm attaching information about the E5 pilot program (25 seats, 60-day trial) along with a quote link.\n\nKey highlights from our conversation:\n• Security consolidation opportunities with M365 E5\n• Advanced threat protection and compliance tools\n• Cost savings through vendor consolidation\n\nThe pilot will demonstrate how these capabilities can address your current security concerns while improving overall productivity.\n\nPlease review the attached quote and let me know if you have any questions. I'm happy to schedule a follow-up call next week.\n\nBest regards`
  );

  const [baseRenewal] = useState(account.contractValue);
  const [pilotSeats] = useState(25);
  const [copilotSeats] = useState(15);
  const [discountPercent] = useState(5);
  const discountAmount = baseRenewal * (discountPercent / 100);

  const callSummary = {
    outcome: 'Renewal pending quote; E5 pilot requested',
    keyPoints: [
      'Customer expressed pricing concerns initially',
      'Security value recognized and appreciated',
      'Requested E5 pilot to evaluate advanced features',
      'Emphasized need for partner support during migration',
      'Interested in consolidating current security tools',
    ],
    aiScore: 86,
    missedPoints: [
      'Data Processing Agreement (DPA) clause not mentioned',
      'Could have highlighted Teams Phone capabilities',
    ],
    positiveSignals: [
      'Customer actively engaged in discussion',
      'Showed strong interest in security features',
      'Willing to explore E5 pilot program',
    ],
  };

  return (
    <div className="h-full overflow-y-auto bg-white">
      {/* Header Bar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border-b-4 border-green-600 p-6 sticky top-0 z-10 shadow-sm"
      >
        <button
          onClick={onClose}
          className="flex items-center gap-2 text-purple-600 hover:text-purple-700 transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Renewal Brief
        </button>

        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <CheckCircle2 className="w-8 h-8 text-green-600" />
              <h1 className="text-green-900">
                Call Completed — {account.customer}
              </h1>
            </div>
            <p className="text-gray-600">
              Duration: 14:32 • AI Quality Score: {callSummary.aiScore}/100
            </p>
          </div>
          <Button className="bg-purple-700 hover:bg-purple-800">
            <Download className="w-4 h-4 mr-2" />
            Export Call Summary
          </Button>
        </div>

        {/* AI Score Indicator */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          className="h-1 bg-gradient-to-r from-green-600 to-blue-500 mt-4 rounded-full origin-left"
        />
      </motion.div>

      {/* Main Content */}
      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Post-Call Summary */}
          <div className="space-y-6">
            {/* Outcome Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden"
            >
              <div className="bg-gradient-to-r from-green-600 to-green-500 p-4">
                <h2 className="text-white">Outcome Summary</h2>
              </div>
              <div className="p-6">
                <div className="flex items-start gap-3 mb-6">
                  <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-gray-900 mb-2">Call Outcome</h3>
                    <p className="text-gray-700">{callSummary.outcome}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-gray-900">Key Points (AI Extracted)</h4>
                  {callSummary.keyPoints.map((point, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                      className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
                    >
                      <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <p className="text-gray-700 text-sm">{point}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* AI Quality Score */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden"
            >
              <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-4">
                <h2 className="text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  AI Quality Assessment
                </h2>
              </div>
              <div className="p-6">
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-900">Overall Score</span>
                    <span className="text-blue-600">
                      {callSummary.aiScore}/100
                    </span>
                  </div>
                  <Progress value={callSummary.aiScore} className="h-3" />
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-gray-900 mb-2 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                      Positive Signals
                    </h4>
                    {callSummary.positiveSignals.map((signal, index) => (
                      <div
                        key={index}
                        className="text-gray-600 text-sm ml-7 mb-1"
                      >
                        • {signal}
                      </div>
                    ))}
                  </div>

                  <div>
                    <h4 className="text-gray-900 mb-2 flex items-center gap-2">
                      <AlertCircle className="w-5 h-5 text-orange-600" />
                      Improvement Opportunities
                    </h4>
                    {callSummary.missedPoints.map((point, index) => (
                      <div
                        key={index}
                        className="text-gray-600 text-sm ml-7 mb-1"
                      >
                        • {point}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Follow-Up Email Draft */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden"
            >
              <div className="bg-gradient-to-r from-purple-700 to-purple-600 p-4">
                <h2 className="text-white flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  Follow-Up Email Draft
                </h2>
              </div>
              <div className="p-6">
                <div className="mb-4">
                  <label className="text-gray-700 text-sm mb-2 block">
                    Subject Line
                  </label>
                  <Input
                    defaultValue={`${account.customer} - Renewal Discussion Follow-Up & E5 Pilot Details`}
                    className="mb-4"
                  />
                </div>
                <Textarea
                  value={followUpEmail}
                  onChange={(e) => setFollowUpEmail(e.target.value)}
                  rows={12}
                  className="font-mono text-sm"
                />
                <div className="flex gap-3 mt-4">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Send className="w-4 h-4 mr-2" />
                    Send Email
                  </Button>
                  <Button
                    variant="outline"
                    className="border-purple-400 text-purple-700 hover:bg-purple-50"
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Save as Draft
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Quote Creation */}
          <div className="space-y-6">
            {/* AI Quote Composer */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden sticky top-24"
            >
              <div className="bg-gradient-to-r from-purple-700 to-blue-600 p-4">
                <h2 className="text-white flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  AI Quote Composer
                </h2>
              </div>
              <div className="p-6">
                {/* Auto-filled Details */}
                <div className="space-y-4 mb-6">
                  <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Package className="w-5 h-5 text-purple-700" />
                        <span className="text-gray-900">
                          M365 E3 (Base Renewal)
                        </span>
                      </div>
                      <Badge className="bg-purple-700">Current</Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-3 text-sm">
                      <div>
                        <p className="text-gray-500">Seats</p>
                        <p className="text-gray-900">{account.seats}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Annual Value</p>
                        <p className="text-gray-900">
                          ${baseRenewal.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-blue-700" />
                        <span className="text-gray-900">E5 Pilot</span>
                      </div>
                      <Badge className="bg-blue-600">New</Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-3 text-sm">
                      <div>
                        <p className="text-gray-500">Seats</p>
                        <p className="text-gray-900">{pilotSeats}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Trial Value</p>
                        <p className="text-green-700">$0 (60-day trial)</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-blue-700" />
                        <span className="text-gray-900">
                          Copilot for M365
                        </span>
                      </div>
                      <Badge className="bg-blue-600">New</Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-3 text-sm">
                      <div>
                        <p className="text-gray-500">Seats</p>
                        <p className="text-gray-900">{copilotSeats}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Trial Value</p>
                        <p className="text-green-700">$0 (30-day trial)</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Price Summary */}
                <div className="border-t-2 border-gray-200 pt-4 mb-6">
                  <h3 className="text-gray-900 mb-4">Price Summary</h3>
                  <div className="space-y-2 text-sm mb-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Base Renewal</span>
                      <span className="text-gray-900">
                        ${baseRenewal.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Pilot Add-ons</span>
                      <span className="text-green-700">$0 (trial)</span>
                    </div>
                    <div className="flex justify-between text-orange-700">
                      <span>Guardrail Discount ({discountPercent}%)</span>
                      <span>-${discountAmount.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="border-t-2 border-purple-200 pt-3 flex justify-between">
                    <span className="text-purple-900">Total</span>
                    <span className="text-purple-900">
                      ${(baseRenewal - discountAmount).toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* AI Confidence Meter */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-700 text-sm">
                      Quote Compliance & Completeness
                    </span>
                    <span className="text-blue-600 text-sm">94%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '94%' }}
                      transition={{ delay: 0.5, duration: 0.8 }}
                      className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    <FileText className="w-4 h-4 mr-2" />
                    Preview Quote (PDF)
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-purple-400 text-purple-700 hover:bg-purple-50"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Send for Approval
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-purple-400 text-purple-700 hover:bg-purple-50"
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Attach to Email
                  </Button>
                </div>

                {/* AI Note */}
                <div className="mt-6 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-blue-900 text-sm">
                    ✅ Quote meets all policy guardrails and includes recommended
                    pilot program based on call analysis.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
