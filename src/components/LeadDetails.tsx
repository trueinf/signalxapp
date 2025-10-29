import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  Tag,
  Save,
  Zap,
  MapPin,
  Users,
  DollarSign,
  Calendar,
  TrendingUp,
  Brain,
  Target,
  Mail,
  FileText,
  Send,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

interface LeadDetailsProps {
  lead: {
    id: number;
    company: string;
    industry: string;
    signalType: string;
    source: string;
    fitScore: number;
  };
  onBack: () => void;
}

export function LeadDetails({ lead, onBack }: LeadDetailsProps) {
  const [showAllSignals, setShowAllSignals] = useState(false);
  const [showReasoningDetails, setShowReasoningDetails] = useState(false);

  // Generate contextual data based on lead properties
  const getLeadData = () => {
    const baseData = {
      location: 'Minneapolis, MN',
      employees: 180,
      revenue: '$25–30M',
      techStack: ['Google Workspace', 'HIPAA audit software'],
      detectedDate: 'Oct 25, 2025',
    };

    // Customize based on industry
    if (lead.industry === 'Technology') {
      return {
        ...baseData,
        location: 'San Francisco, CA',
        employees: 450,
        revenue: '$80–100M',
        techStack: ['Salesforce', 'AWS', 'Slack'],
        recentActivity: 'Posted about cloud migration challenges on Twitter',
      };
    } else if (lead.industry === 'Healthcare') {
      return {
        ...baseData,
        recentActivity: 'Posted "Looking for better HIPAA audit tools" on LinkedIn',
      };
    } else if (lead.industry === 'Finance') {
      return {
        ...baseData,
        location: 'New York, NY',
        employees: 320,
        revenue: '$150–200M',
        techStack: ['Microsoft Azure', 'Power BI', 'Teams'],
        recentActivity: 'Hiring for Security Compliance Manager position',
      };
    } else {
      return {
        ...baseData,
        location: 'Chicago, IL',
        employees: 250,
        revenue: '$40–50M',
        techStack: ['Office 365', 'Zoom', 'Dropbox'],
        recentActivity: 'Mentioned digital transformation initiatives in annual report',
      };
    }
  };

  const leadData = getLeadData();

  // Intent signals based on lead type
  const intentSignals = [
    {
      source: lead.source,
      type: `Text intent – ${lead.signalType}`,
      phrase: leadData.recentActivity,
      confidence: 0.89,
    },
    {
      source: 'Job Listing',
      type: 'Hiring intent – IT Admin',
      phrase: `"IT Systems Admin – ${leadData.techStack[0]} experience."`,
      confidence: 0.83,
    },
    {
      source: 'Website',
      type: 'Tech Stack',
      phrase: `Meta tags: "${leadData.techStack.join('", "')}"`,
      confidence: 0.77,
    },
    {
      source: 'News',
      type: 'Industry Event',
      phrase: `"${lead.industry} sector shows increased tech adoption."`,
      confidence: 0.71,
    },
  ];

  // Fit scoring parameters
  const fitParameters = [
    { name: 'Industry Match', weight: 0.3, score: 0.94 },
    { name: 'Tech Compatibility', weight: 0.25, score: 0.88 },
    { name: 'Intent Recency', weight: 0.2, score: 0.91 },
    { name: 'Company Size', weight: 0.15, score: 0.82 },
    { name: 'Regional Cluster', weight: 0.1, score: 0.74 },
  ];

  // Timeline events
  const timelineEvents = [
    {
      date: 'Sep 25',
      event: `${leadData.techStack[0]} adoption mention`,
      type: 'tech',
    },
    { date: 'Oct 04', event: 'IT Systems Admin job post', type: 'hiring' },
    { date: 'Oct 15', event: leadData.recentActivity, type: 'intent' },
    { date: 'Oct 20', event: `${lead.industry} industry news`, type: 'news' },
    {
      date: 'Oct 25',
      event: `AI flagged ${lead.company} (${lead.fitScore.toFixed(2)})`,
      type: 'ai',
    },
  ];

  // Recommendations
  const recommendations = [
    {
      title: 'Launch Outreach Sequence',
      description: `Start ${lead.industry.toLowerCase()} security campaign (E5 + Defender).`,
      confidence: 0.91,
      action: 'Start Sequence',
    },
    {
      title: 'Assign to Rep',
      description: 'Best-fit rep: R. Shah (Enterprise Segment).',
      confidence: 0.87,
      action: 'Assign',
    },
    {
      title: 'Partner Coordination',
      description: 'Notify Contoso Cybersecurity Partner.',
      confidence: 0.78,
      action: 'Notify',
    },
  ];

  return (
    <div className="h-full overflow-y-auto bg-white">
      {/* Header Bar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border-b-4 border-purple-700 p-6 sticky top-0 z-10 shadow-sm"
      >
        {/* Breadcrumbs */}
        <div className="mb-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-purple-600 hover:text-purple-700 transition-colors mb-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back to Lead List</span>
          </button>
          <p className="text-gray-500 text-sm">
            Lead Generation › {lead.company} › Lead Intelligence
          </p>
        </div>

        {/* Title Block */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-purple-900 text-3xl mb-2">
              {lead.company}
            </h1>
            <p className="text-gray-600">
              {lead.industry}, {leadData.location.split(', ')[1]} •{' '}
              {leadData.employees} employees • High Propensity{' '}
              {lead.fitScore.toFixed(2)} • Identified {leadData.detectedDate}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <Select>
              <SelectTrigger className="w-32 bg-white border-purple-300">
                <Tag className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Tag Lead" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hot">🔥 Hot</SelectItem>
                <SelectItem value="warm">☀️ Warm</SelectItem>
                <SelectItem value="cold">❄️ Cold</SelectItem>
              </SelectContent>
            </Select>

            <Button className="bg-purple-700 hover:bg-purple-800 text-white">
              <Save className="w-4 h-4 mr-2" />
              Add to CRM
            </Button>

            <Button
              variant="outline"
              className="border-blue-500 text-blue-600 hover:bg-blue-50"
            >
              <Zap className="w-4 h-4 mr-2" />
              Launch Outreach Builder
            </Button>
          </div>
        </div>

        {/* AI Update Indicator */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          className="h-1 bg-gradient-to-r from-blue-500 to-blue-400 mt-4 rounded-full origin-left"
        />
      </motion.div>

      {/* Main Content */}
      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - 65% */}
          <div className="lg:col-span-2 space-y-6">
            {/* Business Context Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden"
            >
              <div className="bg-gradient-to-r from-purple-700 to-purple-600 p-4">
                <h2 className="text-white">Business Overview</h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Target className="w-5 h-5 text-purple-600 mt-1" />
                      <div>
                        <p className="text-gray-500 text-sm">Industry</p>
                        <p className="text-gray-900">{lead.industry} / Private Company</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-purple-600 mt-1" />
                      <div>
                        <p className="text-gray-500 text-sm">Location</p>
                        <p className="text-gray-900">{leadData.location}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Users className="w-5 h-5 text-purple-600 mt-1" />
                      <div>
                        <p className="text-gray-500 text-sm">Company Size</p>
                        <p className="text-gray-900">{leadData.employees} employees</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <DollarSign className="w-5 h-5 text-purple-600 mt-1" />
                      <div>
                        <p className="text-gray-500 text-sm">Annual Revenue Estimate</p>
                        <p className="text-gray-900">{leadData.revenue}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Calendar className="w-5 h-5 text-purple-600 mt-1" />
                      <div>
                        <p className="text-gray-500 text-sm">Tech Stack Detected</p>
                        <p className="text-gray-900">{leadData.techStack.join(', ')}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <TrendingUp className="w-5 h-5 text-purple-600 mt-1" />
                      <div>
                        <p className="text-gray-500 text-sm">Recent Activity</p>
                        <p className="text-gray-900">{leadData.recentActivity}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* AI Annotation */}
                <div className="mt-6 flex items-start gap-2 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <Brain className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="text-blue-900 text-sm">
                      Detected through intent analysis of public LinkedIn content.
                    </p>
                    <p className="text-blue-700 text-xs mt-1">
                      Confidence: 92%
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Intent Signals Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden"
            >
              <div className="bg-gradient-to-r from-purple-700 to-purple-600 p-4">
                <h2 className="text-white">Intent Signals</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {intentSignals
                    .slice(0, showAllSignals ? intentSignals.length : 3)
                    .map((signal, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        className="border-l-4 border-purple-300 pl-4 py-2"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <Badge variant="outline" className="text-xs">
                                {signal.source}
                              </Badge>
                              <span className="text-gray-600 text-sm">
                                {signal.type}
                              </span>
                            </div>
                            <p className="text-gray-900 text-sm italic">
                              {signal.phrase}
                            </p>
                          </div>
                          <span className="text-blue-600 ml-4">
                            {(signal.confidence * 100).toFixed(0)}%
                          </span>
                        </div>
                        <Progress
                          value={signal.confidence * 100}
                          className="h-2 bg-gray-200"
                        />
                      </motion.div>
                    ))}
                </div>

                <button
                  onClick={() => setShowAllSignals(!showAllSignals)}
                  className="mt-4 text-purple-600 hover:text-purple-700 text-sm flex items-center gap-1"
                >
                  {showAllSignals ? (
                    <>
                      <ChevronUp className="w-4 h-4" />
                      Show Less
                    </>
                  ) : (
                    <>
                      <ChevronDown className="w-4 h-4" />
                      Show All Signals
                    </>
                  )}
                </button>

                <p className="mt-4 text-gray-500 text-sm italic">
                  Signals within 45 days indicate security and compliance intent.
                  Matches Defender & E5 profile.
                </p>
              </div>
            </motion.div>

            {/* Fit Scoring Visualization */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden"
            >
              <div className="bg-gradient-to-r from-purple-700 to-purple-600 p-4">
                <h2 className="text-white">Fit Scoring Analysis</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4 mb-6">
                  {fitParameters.map((param, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-gray-900">{param.name}</span>
                          <span className="text-gray-500 text-sm">
                            (Weight: {(param.weight * 100).toFixed(0)}%)
                          </span>
                        </div>
                        <span className="text-blue-600">
                          {param.score.toFixed(2)}
                        </span>
                      </div>
                      <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${param.score * 100}%` }}
                          transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
                          className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Total Score */}
                <div className="border-t-2 border-purple-200 pt-6">
                  <p className="text-gray-600 text-sm mb-2">
                    Total Propensity Score
                  </p>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 }}
                    className="flex items-baseline gap-2"
                  >
                    <span className="text-6xl text-purple-900">
                      {lead.fitScore.toFixed(2)}
                    </span>
                    <span className="text-gray-500 text-xl">± 0.04</span>
                    <motion.div
                      animate={{
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                      className="ml-2"
                    >
                      <Sparkles className="w-6 h-6 text-blue-500" />
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Engagement Recommendations */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden"
            >
              <div className="bg-gradient-to-r from-purple-700 to-purple-600 p-4">
                <h2 className="text-white">AI-Generated Next Actions</h2>
              </div>
              <div className="p-6">
                <div className="grid gap-4">
                  {recommendations.map((rec, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="border border-purple-200 rounded-lg p-4 hover:shadow-md transition-shadow bg-gradient-to-r from-white to-purple-50"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-2 h-2 rounded-full bg-blue-500" />
                            <h3 className="text-purple-900">{rec.title}</h3>
                          </div>
                          <p className="text-gray-600 text-sm mb-3">
                            {rec.description}
                          </p>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-500">
                              Confidence:
                            </span>
                            <Progress
                              value={rec.confidence * 100}
                              className="h-2 w-24 bg-gray-200"
                            />
                            <span className="text-xs text-blue-600">
                              {(rec.confidence * 100).toFixed(0)}%
                            </span>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          className="ml-4 bg-purple-600 hover:bg-purple-700 text-white"
                        >
                          {rec.action}
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Sales Pitch Insight Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-gradient-to-r from-purple-50 to-lavender-50 border-2 border-purple-300 rounded-xl shadow-lg overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-start gap-3 mb-4">
                  <Mail className="w-6 h-6 text-purple-700" />
                  <div>
                    <h3 className="text-purple-900 mb-2">Sales Pitch Insight</h3>
                    <p className="text-gray-700 mb-4">
                      "Highlight {lead.industry.toLowerCase()} compliance relief
                      (35% faster audits), data-breach cost reduction, and seamless
                      migration benefits."
                    </p>
                    <div className="flex items-center gap-2 mb-4">
                      <Badge variant="outline" className="text-purple-700">
                        Tone: Empathetic
                      </Badge>
                      <Badge variant="outline" className="text-purple-700">
                        Style: Advisory
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-purple-400 text-purple-700 hover:bg-purple-50"
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Generate Pitch Deck
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-purple-400 text-purple-700 hover:bg-purple-50"
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Preview Email Pitch
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-blue-400 text-blue-700 hover:bg-blue-50"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Send to Copilot
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column - 35% */}
          <div className="space-y-6">
            {/* AI Reasoning Summary */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden"
            >
              <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-4">
                <h2 className="text-white flex items-center gap-2">
                  <Brain className="w-5 h-5" />
                  How AI Selected This Lead
                </h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-gray-900 mb-1">
                        Pattern Recognition
                      </p>
                      <p className="text-gray-600 text-sm">
                        NLP detected compliance and audit fatigue mentions.
                      </p>
                      <div className="mt-2 h-8">
                        <svg
                          viewBox="0 0 100 30"
                          className="w-full h-full text-blue-500"
                        >
                          <polyline
                            points="0,25 20,15 40,20 60,8 80,12 100,5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-gray-900 mb-1">Cross-Validation</p>
                      <p className="text-gray-600 text-sm">
                        Job ads confirm internal cloud transition needs.
                      </p>
                      <div className="mt-2 h-8">
                        <svg
                          viewBox="0 0 100 30"
                          className="w-full h-full text-blue-500"
                        >
                          <polyline
                            points="0,20 20,18 40,10 60,15 80,8 100,12"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-gray-900 mb-1">Trend Signal</p>
                      <p className="text-gray-600 text-sm">
                        Regional surge in {lead.industry.toLowerCase()}-related
                        content (+18%).
                      </p>
                      <div className="mt-2 h-8">
                        <svg
                          viewBox="0 0 100 30"
                          className="w-full h-full text-blue-500"
                        >
                          <polyline
                            points="0,28 20,25 40,22 60,15 80,10 100,3"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-gray-900 mb-1">Aggregate Scoring</p>
                      <p className="text-gray-600 text-sm">
                        Weighted ensemble output (conf. 84%).
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setShowReasoningDetails(!showReasoningDetails)}
                  className="mt-4 text-blue-600 hover:text-blue-700 text-sm flex items-center gap-1"
                >
                  {showReasoningDetails ? (
                    <>
                      <ChevronUp className="w-4 h-4" />
                      Hide Details
                    </>
                  ) : (
                    <>
                      <ChevronDown className="w-4 h-4" />
                      Show Details
                    </>
                  )}
                </button>

                <AnimatePresence>
                  {showReasoningDetails && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="mt-4 p-4 bg-blue-50 rounded-lg text-sm text-gray-700"
                    >
                      <p>
                        The AI model uses a multi-stage pipeline including entity
                        extraction, sentiment analysis, and trend correlation to
                        identify high-value prospects. Confidence scores are
                        calculated using Bayesian inference across multiple data
                        sources.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="mt-4 p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-purple-600 mt-0.5" />
                    <p className="text-purple-900 text-sm">
                      You can mark this lead as false-positive to refine future AI
                      predictions.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Signal Timeline */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden"
            >
              <div className="bg-gradient-to-r from-purple-700 to-purple-600 p-4">
                <h2 className="text-white">Signal Timeline</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {timelineEvents.map((event, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      className="relative pl-8 pb-4 border-l-2 border-gray-200 last:border-0"
                    >
                      <div
                        className={`absolute left-[-9px] top-0 w-4 h-4 rounded-full border-2 border-white ${
                          event.type === 'ai'
                            ? 'bg-blue-500'
                            : event.type === 'intent'
                            ? 'bg-purple-500'
                            : event.type === 'hiring'
                            ? 'bg-green-500'
                            : 'bg-gray-400'
                        }`}
                      />
                      <p className="text-gray-500 text-xs mb-1">{event.date}</p>
                      <p className="text-gray-900 text-sm">{event.event}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Geographic Cluster Map */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden"
            >
              <div className="bg-gradient-to-r from-purple-700 to-purple-600 p-4">
                <h2 className="text-white">Geographic & Industry Cluster</h2>
              </div>
              <div className="p-6">
                <div className="relative h-64 bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
                  {/* Simplified map visualization */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                      <motion.div
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.3, 0.6, 0.3],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                        }}
                        className="absolute inset-0 w-32 h-32 rounded-full bg-blue-500/20"
                      />
                      <div className="relative w-32 h-32 rounded-full bg-blue-500/40 flex items-center justify-center">
                        <MapPin className="w-8 h-8 text-blue-700" />
                      </div>
                    </div>
                  </div>

                  {/* Map pins */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="absolute top-1/4 left-1/3"
                  >
                    <div className="w-3 h-3 rounded-full bg-purple-600" />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="absolute top-1/3 right-1/3"
                  >
                    <div className="w-3 h-3 rounded-full bg-purple-600" />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="absolute bottom-1/3 left-1/4"
                  >
                    <div className="w-3 h-3 rounded-full bg-purple-600" />
                  </motion.div>
                </div>

                <div className="mt-4 p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <p className="text-purple-900 text-sm">
                    <span className="font-medium">{lead.industry} Companies</span>{' '}
                    (120–250 emp) • Avg Propensity 0.78 •{' '}
                    {leadData.location.split(', ')[1]} Cluster
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
