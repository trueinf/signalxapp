import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  Settings,
  TrendingUp,
  TrendingDown,
  Clock,
  Users,
  AlertCircle,
  CheckCircle2,
  Play,
  Flag,
  FileText,
  Zap,
  Activity,
  BarChart3,
} from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { PlaybookCompiler } from './PlaybookCompiler';
import { ExperimentSandbox } from './ExperimentSandbox';

interface KPICard {
  metric: string;
  value: string;
  change: string;
  direction: 'up' | 'down';
  insight: string;
  sparklineData: number[];
}

interface AIInsight {
  id: string;
  title: string;
  body: string;
  confidence: number;
  actions: string[];
}

interface CoachingData {
  rep: string;
  qaScore: number;
  winRate: number;
  callsReviewed: number;
  aiSuggestion: string;
  confidence: number;
}

export function GrowthAtScale() {
  const [period, setPeriod] = useState('month');
  const [region, setRegion] = useState('global');
  const [copilotActive, setCopilotActive] = useState(false);
  const [showToast, setShowToast] = useState<string | null>(null);

  const kpiCards: KPICard[] = [
    {
      metric: 'Renewal Rate',
      value: '86.4%',
      change: '+2.1 WoW',
      direction: 'up',
      insight: 'Healthcare segment lift +17%',
      sparklineData: [82, 83, 84, 85, 84, 86, 86.4],
    },
    {
      metric: 'New Logo Conversion',
      value: '13.8%',
      change: '+1.6',
      direction: 'up',
      insight: 'AI email sequences boost open rate +9%',
      sparklineData: [11, 11.5, 12, 12.5, 12.8, 13.2, 13.8],
    },
    {
      metric: 'Avg Time-to-Quote',
      value: '9.4 min',
      change: '-3.1',
      direction: 'down',
      insight: 'Quote Composer reduces manual steps',
      sparklineData: [14, 13.5, 13, 12, 11, 10, 9.4],
    },
    {
      metric: 'AI Assist Adoption',
      value: '78%',
      change: '+6',
      direction: 'up',
      insight: 'Goal → 90% by Q1',
      sparklineData: [65, 68, 70, 72, 74, 76, 78],
    },
    {
      metric: 'Partner Conflict Alerts',
      value: '24',
      change: '-7',
      direction: 'down',
      insight: 'Improved routing logic',
      sparklineData: [38, 36, 34, 32, 28, 26, 24],
    },
  ];

  const renewalsData = [
    { month: 'Jan', saved: 145, due: 180 },
    { month: 'Feb', saved: 158, due: 175 },
    { month: 'Mar', saved: 172, due: 190 },
    { month: 'Apr', saved: 165, due: 185 },
    { month: 'May', saved: 189, due: 200 },
    { month: 'Jun', saved: 201, due: 210 },
  ];

  const conversionData = [
    { industry: 'Healthcare', rate: 37 },
    { industry: 'Legal', rate: 42 },
    { industry: 'Manufacturing', rate: 33 },
    { industry: 'Logistics', rate: 31 },
    { industry: 'Retail', rate: 28 },
    { industry: 'Technology', rate: 25 },
  ];

  const objectionData = [
    { month: 'Jan', price: 45, migration: 32, security: 28, dataResidency: 18 },
    { month: 'Feb', price: 42, migration: 35, security: 25, dataResidency: 20 },
    { month: 'Mar', price: 38, migration: 38, security: 30, dataResidency: 22 },
    { month: 'Apr', price: 35, migration: 40, security: 28, dataResidency: 19 },
    { month: 'May', price: 32, migration: 36, security: 32, dataResidency: 24 },
    { month: 'Jun', price: 30, migration: 34, security: 35, dataResidency: 26 },
  ];

  const pipelineData = [
    { month: 'Jan', value: 1200 },
    { month: 'Feb', value: 1450 },
    { month: 'Mar', value: 1680 },
    { month: 'Apr', value: 1820 },
    { month: 'May', value: 2100 },
    { month: 'Jun', value: 2350 },
  ];

  const aiInsights: AIInsight[] = [
    {
      id: '1',
      title: 'Healthcare scripts using "audit hardening" close +17% faster',
      body: 'Correlation analysis shows compliance-focused messaging significantly reduces deal cycle time in healthcare vertical.',
      confidence: 0.91,
      actions: ['Promote to Playbook', 'View Details'],
    },
    {
      id: '2',
      title: 'Copilot E5 bundle pilot wins 1.4× faster',
      body: 'Trial-first approach for E5 bundles shortens decision cycles and increases conversion likelihood.',
      confidence: 0.87,
      actions: ['Create Offer Variant', 'View Details'],
    },
    {
      id: '3',
      title: 'Price objections ↓ 8% after "consolidation TCO" angle',
      body: 'Total cost of ownership framing effectively addresses pricing concerns across all segments.',
      confidence: 0.84,
      actions: ['Coach Reps', 'Add to Playbook'],
    },
    {
      id: '4',
      title: 'LinkedIn outreach performs 2.1× better on Tuesdays',
      body: 'Timing optimization data suggests Tuesday 9-11 AM sends yield highest engagement rates.',
      confidence: 0.78,
      actions: ['Apply Filter', 'Send to Manager'],
    },
  ];

  const coachingData: CoachingData[] = [
    {
      rep: 'R. Shah',
      qaScore: 88,
      winRate: 27,
      callsReviewed: 6,
      aiSuggestion: 'Add DPA mention early',
      confidence: 0.89,
    },
    {
      rep: 'K. Long',
      qaScore: 82,
      winRate: 24,
      callsReviewed: 5,
      aiSuggestion: 'Use TCO value framing',
      confidence: 0.85,
    },
    {
      rep: 'M. Diaz',
      qaScore: 79,
      winRate: 21,
      callsReviewed: 7,
      aiSuggestion: 'Lead with security storyline',
      confidence: 0.82,
    },
    {
      rep: 'S. Patel',
      qaScore: 91,
      winRate: 32,
      callsReviewed: 8,
      aiSuggestion: 'Share with team as exemplar',
      confidence: 0.94,
    },
    {
      rep: 'L. Chen',
      qaScore: 85,
      winRate: 29,
      callsReviewed: 6,
      aiSuggestion: 'Improve discovery questions',
      confidence: 0.81,
    },
  ];

  const showNotification = (message: string) => {
    setShowToast(message);
    setTimeout(() => setShowToast(null), 3000);
  };

  return (
    <div className="h-full overflow-y-auto bg-white">
      {/* Header Bar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border-b-4 border-purple-700 p-6 sticky top-0 z-20 shadow-sm"
      >
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-purple-900 mb-2">
              Growth Intelligence Control Tower
            </h1>
            <p className="text-gray-600">
              Monitor performance, discover insights, and amplify AI-driven
              selling at scale.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              size="sm"
              onClick={() => setCopilotActive(!copilotActive)}
              className={`transition-all ${
                copilotActive
                  ? 'bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/50'
                  : 'bg-purple-700 hover:bg-purple-800'
              }`}
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Copilot {copilotActive && '(Active)'}
            </Button>
            <Select value={period} onValueChange={setPeriod}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">Week</SelectItem>
                <SelectItem value="month">Month</SelectItem>
                <SelectItem value="quarter">Quarter</SelectItem>
              </SelectContent>
            </Select>
            <Select value={region} onValueChange={setRegion}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="global">Global</SelectItem>
                <SelectItem value="americas">Americas</SelectItem>
                <SelectItem value="emea">EMEA</SelectItem>
                <SelectItem value="apac">APAC</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              size="sm"
              className="border-purple-400 text-purple-700 hover:bg-purple-50"
            >
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* AI Refresh Indicator */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          className="h-1 bg-gradient-to-r from-purple-600 to-blue-500 rounded-full origin-left"
        />
      </motion.div>

      {/* Main Content */}
      <div className="p-6 space-y-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {kpiCards.map((card, index) => (
            <motion.div
              key={card.metric}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="bg-gradient-to-r from-purple-700 to-purple-600 p-3">
                <h3 className="text-white text-sm">{card.metric}</h3>
              </div>
              <div className="p-4">
                <div className="flex items-end justify-between mb-2">
                  <div className="text-2xl text-gray-900">{card.value}</div>
                  <div
                    className={`flex items-center gap-1 text-sm ${
                      card.direction === 'up'
                        ? 'text-green-600'
                        : 'text-blue-600'
                    }`}
                  >
                    {card.direction === 'up' ? (
                      <TrendingUp className="w-4 h-4" />
                    ) : (
                      <TrendingDown className="w-4 h-4" />
                    )}
                    {card.change}
                  </div>
                </div>
                <p className="text-xs text-gray-600 mb-3">{card.insight}</p>
                
                {/* Sparkline */}
                <div className="h-8">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={card.sparklineData.map((value, i) => ({ value }))}>
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#4C89FF"
                        strokeWidth={2}
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Campaign Intelligence Dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden"
        >
          <div className="bg-gradient-to-r from-purple-700 to-purple-600 p-4">
            <h2 className="text-white flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Campaign Intelligence Dashboard
            </h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Renewals Saved vs Due */}
              <div>
                <h3 className="text-gray-900 mb-4">Renewals Saved vs Due</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={renewalsData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis dataKey="month" stroke="#6B7280" />
                    <YAxis stroke="#6B7280" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #E5E7EB',
                        borderRadius: '8px',
                      }}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="saved"
                      stroke="#4C89FF"
                      strokeWidth={2}
                      name="Saved"
                    />
                    <Line
                      type="monotone"
                      dataKey="due"
                      stroke="#E9E1F9"
                      strokeWidth={2}
                      name="Due"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Conversion Lift by Industry */}
              <div>
                <h3 className="text-gray-900 mb-4">
                  Conversion Lift by Industry
                </h3>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={conversionData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis type="number" stroke="#6B7280" />
                    <YAxis type="category" dataKey="industry" stroke="#6B7280" width={100} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #E5E7EB',
                        borderRadius: '8px',
                      }}
                    />
                    <Bar dataKey="rate" fill="#4C89FF" radius={[0, 8, 8, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Objection Themes Trending */}
              <div>
                <h3 className="text-gray-900 mb-4">Objection Themes Trending</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={objectionData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis dataKey="month" stroke="#6B7280" />
                    <YAxis stroke="#6B7280" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #E5E7EB',
                        borderRadius: '8px',
                      }}
                    />
                    <Legend />
                    <Bar dataKey="price" stackId="a" fill="#7C3AED" name="Price" />
                    <Bar dataKey="migration" stackId="a" fill="#4C89FF" name="Migration" />
                    <Bar dataKey="security" stackId="a" fill="#60A5FA" name="Security" />
                    <Bar dataKey="dataResidency" stackId="a" fill="#E9E1F9" name="Data Residency" />
                  </BarChart>
                </ResponsiveContainer>
                <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-blue-900 text-sm">
                    💡 Spike in "Migration Effort" objections linked to Azure
                    pricing updates.
                  </p>
                </div>
              </div>

              {/* Pipeline Growth */}
              <div>
                <h3 className="text-gray-900 mb-4">
                  Pipeline Growth from Lead Generation
                </h3>
                <ResponsiveContainer width="100%" height={250}>
                  <AreaChart data={pipelineData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis dataKey="month" stroke="#6B7280" />
                    <YAxis stroke="#6B7280" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #E5E7EB',
                        borderRadius: '8px',
                      }}
                    />
                    <defs>
                      <linearGradient id="pipelineGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#4C89FF" stopOpacity={0.8} />
                        <stop offset="100%" stopColor="#4C89FF" stopOpacity={0.1} />
                      </linearGradient>
                    </defs>
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#4C89FF"
                      strokeWidth={2}
                      fill="url(#pipelineGradient)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </motion.div>

        {/* AI Insights Feed + Coaching Companion */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* AI Insights Feed */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden"
          >
            <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-4">
              <h2 className="text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                AI Insights Feed
              </h2>
            </div>
            <div className="p-6 space-y-4 max-h-[600px] overflow-y-auto">
              {aiInsights.map((insight, index) => (
                <motion.div
                  key={insight.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="p-4 bg-purple-50 border border-purple-200 rounded-lg"
                >
                  <h4 className="text-purple-900 mb-2">{insight.title}</h4>
                  <p className="text-gray-700 text-sm mb-3">{insight.body}</p>
                  <div className="mb-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-blue-600 text-xs">Confidence</span>
                      <span className="text-blue-600 text-xs">
                        {(insight.confidence * 100).toFixed(0)}%
                      </span>
                    </div>
                    <div className="h-1.5 bg-blue-200 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${insight.confidence * 100}%` }}
                        transition={{ delay: 0.7 + index * 0.1, duration: 0.6 }}
                        className="h-full bg-gradient-to-r from-blue-600 to-blue-500 rounded-full"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {insight.actions.map((action, i) => (
                      <Button
                        key={i}
                        size="sm"
                        variant="outline"
                        onClick={() => showNotification(`${action} action triggered`)}
                        className="border-purple-400 text-purple-700 hover:bg-purple-100 text-xs"
                      >
                        {action}
                      </Button>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Coaching Companion */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden"
          >
            <div className="bg-gradient-to-r from-purple-700 to-purple-600 p-4">
              <h2 className="text-white flex items-center gap-2">
                <Users className="w-5 h-5" />
                Coaching Companion
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-purple-50 border-b-2 border-purple-200">
                  <tr>
                    <th className="text-left p-3 text-purple-900 text-sm">Rep</th>
                    <th className="text-left p-3 text-purple-900 text-sm">QA Score</th>
                    <th className="text-left p-3 text-purple-900 text-sm">Win Rate</th>
                    <th className="text-left p-3 text-purple-900 text-sm">Calls</th>
                    <th className="text-left p-3 text-purple-900 text-sm">AI Suggestion</th>
                    <th className="text-left p-3 text-purple-900 text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {coachingData.map((coach, index) => (
                    <motion.tr
                      key={coach.rep}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + index * 0.05 }}
                      className={`border-b border-gray-200 hover:bg-purple-50 transition-colors ${
                        coach.confidence > 0.8 ? 'bg-blue-50/30' : ''
                      }`}
                    >
                      <td className="p-3 text-gray-900 text-sm">{coach.rep}</td>
                      <td className="p-3">
                        <Badge
                          className={
                            coach.qaScore >= 85
                              ? 'bg-green-600'
                              : 'bg-blue-600'
                          }
                        >
                          {coach.qaScore}
                        </Badge>
                      </td>
                      <td className="p-3 text-gray-900 text-sm">{coach.winRate}%</td>
                      <td className="p-3 text-gray-700 text-sm">{coach.callsReviewed}</td>
                      <td className="p-3 text-gray-700 text-sm">
                        {coach.aiSuggestion}
                      </td>
                      <td className="p-3">
                        <div className="flex gap-1">
                          <button
                            onClick={() => showNotification('Drill assigned')}
                            className="p-1 hover:bg-purple-100 rounded transition-colors"
                            title="Assign Drill"
                          >
                            <Zap className="w-4 h-4 text-purple-600" />
                          </button>
                          <button
                            onClick={() => showNotification('Playing exemplar call')}
                            className="p-1 hover:bg-blue-100 rounded transition-colors"
                            title="Play Exemplar Call"
                          >
                            <Play className="w-4 h-4 text-blue-600" />
                          </button>
                          <button
                            onClick={() => showNotification('Progress tracked')}
                            className="p-1 hover:bg-green-100 rounded transition-colors"
                            title="Track Progress"
                          >
                            <Activity className="w-4 h-4 text-green-600" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>

        {/* Playbook Compiler & Experiment Sandbox */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <PlaybookCompiler onPublish={showNotification} />
          <ExperimentSandbox onCreate={showNotification} />
        </div>
      </div>

      {/* Floating Copilot Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.6, type: 'spring' }}
        onClick={() => setCopilotActive(!copilotActive)}
        className={`fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-all z-20 ${
          copilotActive
            ? 'bg-blue-600 hover:bg-blue-700 shadow-blue-500/50'
            : 'bg-purple-700 hover:bg-purple-800'
        }`}
      >
        <Sparkles className="w-6 h-6 text-white" />
      </motion.button>

      {/* Toast Notifications */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-24 right-6 bg-green-600 text-white px-6 py-3 rounded-lg shadow-xl z-30 flex items-center gap-3"
          >
            <CheckCircle2 className="w-5 h-5" />
            {showToast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
