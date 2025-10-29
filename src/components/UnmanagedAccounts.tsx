import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  Download,
  Settings,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  AlertCircle,
  TrendingUp,
  Flame,
  Info,
} from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Slider } from './ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { AIOutreachBuilder } from './AIOutreachBuilder';
import { SalesPitchModal } from './SalesPitchModal';
import { ConversionHeatmap } from './ConversionHeatmap';

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

export function UnmanagedAccounts() {
  const [selectedAccount, setSelectedAccount] = useState<UnmanagedAccount | null>(null);
  const [showPitchModal, setShowPitchModal] = useState<UnmanagedAccount | null>(null);
  const [industry, setIndustry] = useState('all');
  const [geography, setGeography] = useState('all');
  const [buyingStage, setBuyingStage] = useState<string[]>([]);
  const [propensityScore, setPropensityScore] = useState([60]);
  const [productFit, setProductFit] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [copilotActive, setCopilotActive] = useState(false);
  const [insightsPanelOpen, setInsightsPanelOpen] = useState(true);

  const accounts: UnmanagedAccount[] = [
    {
      id: '1',
      company: 'Red River Clinic',
      industry: 'Healthcare',
      size: 180,
      productFit: 'M365 + Defender',
      propensity: 0.81,
      aiInsight: 'On Google Workspace; recent HIPAA audit.',
      buyingStage: 'Discovery',
      geography: 'Americas',
    },
    {
      id: '2',
      company: 'Greenline Freight',
      industry: 'Logistics',
      size: 260,
      productFit: 'Azure + M365',
      propensity: 0.76,
      aiInsight: 'Legacy file servers; AWS cost spike.',
      buyingStage: 'Active',
      geography: 'Americas',
    },
    {
      id: '3',
      company: 'Pioneer Legal',
      industry: 'Legal',
      size: 95,
      productFit: 'M365 + Purview',
      propensity: 0.72,
      aiInsight: 'Recruiting for security compliance expert.',
      buyingStage: 'Discovery',
      geography: 'Americas',
    },
    {
      id: '4',
      company: 'Summit Retail Group',
      industry: 'Retail',
      size: 340,
      productFit: 'M365 + Dynamics',
      propensity: 0.84,
      aiInsight: 'Expanding e-commerce operations; cited security concerns.',
      buyingStage: 'Trial',
      geography: 'EMEA',
    },
    {
      id: '5',
      company: 'TechBridge Solutions',
      industry: 'Technology',
      size: 125,
      productFit: 'Azure + DevOps',
      propensity: 0.79,
      aiInsight: 'Recent funding round; hiring DevOps engineers.',
      buyingStage: 'Active',
      geography: 'APAC',
    },
    {
      id: '6',
      company: 'Coastal Manufacturing',
      industry: 'Manufacturing',
      size: 450,
      productFit: 'M365 + Azure IoT',
      propensity: 0.68,
      aiInsight: 'Modernizing factory floor systems; cloud migration signals.',
      buyingStage: 'Discovery',
      geography: 'Americas',
    },
  ];

  const aiInsights = [
    {
      id: '1',
      icon: '💡',
      text: 'Healthcare vertical has +11% reply rate this week.',
      confidence: 0.87,
      actions: ['Apply Filter', 'Send to Manager'],
    },
    {
      id: '2',
      icon: '💡',
      text: 'Azure trial offers perform 2.2× better when sent within 24h of lead creation.',
      confidence: 0.92,
      actions: ['Apply Filter'],
    },
    {
      id: '3',
      icon: '💡',
      text: 'Pricing objection frequency down 9% after adding security ROI angle.',
      confidence: 0.78,
      actions: ['Send to Manager'],
    },
  ];

  const handleGenerateAccounts = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
    }, 3000);
  };

  const toggleBuyingStage = (stage: string) => {
    setBuyingStage((prev) =>
      prev.includes(stage) ? prev.filter((s) => s !== stage) : [...prev, stage]
    );
  };

  const toggleProductFit = (product: string) => {
    setProductFit((prev) =>
      prev.includes(product) ? prev.filter((p) => p !== product) : [...prev, product]
    );
  };

  const getPropensityColor = (score: number) => {
    if (score >= 0.8) return 'text-purple-700';
    if (score >= 0.7) return 'text-blue-700';
    return 'text-gray-700';
  };

  const getPropensityIcon = (score: number) => {
    if (score >= 0.8) return <Flame className="w-4 h-4 text-orange-600" />;
    if (score >= 0.7) return <TrendingUp className="w-4 h-4 text-blue-600" />;
    return null;
  };

  if (selectedAccount) {
    return (
      <AIOutreachBuilder
        account={selectedAccount}
        onBack={() => setSelectedAccount(null)}
      />
    );
  }

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
            <h1 className="text-purple-900 mb-2">Unmanaged Growth Center</h1>
            <p className="text-gray-600">
              Target high-potential SMBs with AI-driven outreach and contextual
              sales pitch intelligence.
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
            <Button
              variant="outline"
              size="sm"
              className="border-purple-400 text-purple-700 hover:bg-purple-50"
            >
              <Download className="w-4 h-4 mr-2" />
              Export List
            </Button>
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
        <AnimatePresence>
          {isScanning && (
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              exit={{ scaleX: 0 }}
              className="h-1 bg-gradient-to-r from-blue-600 to-purple-500 rounded-full origin-left"
            />
          )}
        </AnimatePresence>
      </motion.div>

      {/* Filter & Search Panel */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="bg-purple-50 border-b border-purple-200 p-6 sticky top-[140px] z-10"
      >
        <div className="space-y-4">
          {/* Search Field */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search by company or signal..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-full"
            />
          </div>

          {/* Filters Row 1 */}
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="text-gray-700 text-sm">Industry:</span>
              <Select value={industry} onValueChange={setIndustry}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Industries</SelectItem>
                  <SelectItem value="healthcare">Healthcare</SelectItem>
                  <SelectItem value="retail">Retail</SelectItem>
                  <SelectItem value="logistics">Logistics</SelectItem>
                  <SelectItem value="legal">Legal</SelectItem>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="manufacturing">Manufacturing</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-gray-700 text-sm">Geography:</span>
              <Select value={geography} onValueChange={setGeography}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Regions</SelectItem>
                  <SelectItem value="americas">Americas</SelectItem>
                  <SelectItem value="emea">EMEA</SelectItem>
                  <SelectItem value="apac">APAC</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-gray-700 text-sm">Buying Stage:</span>
              <div className="flex gap-2">
                {['Discovery', 'Trial', 'Active'].map((stage) => (
                  <Button
                    key={stage}
                    size="sm"
                    variant={buyingStage.includes(stage) ? 'default' : 'outline'}
                    onClick={() => toggleBuyingStage(stage)}
                    className={
                      buyingStage.includes(stage)
                        ? 'bg-purple-700 hover:bg-purple-800'
                        : 'border-purple-300 text-purple-700 hover:bg-purple-100'
                    }
                  >
                    {stage}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Filters Row 2 */}
          <div className="flex items-center gap-6 flex-wrap">
            <div className="flex items-center gap-4 flex-1 min-w-[300px]">
              <span className="text-gray-700 text-sm whitespace-nowrap">
                Propensity Score: ≥ {propensityScore[0] / 100}
              </span>
              <Slider
                value={propensityScore}
                onValueChange={setPropensityScore}
                min={0}
                max={100}
                step={5}
                className="flex-1"
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-gray-700 text-sm">Product Fit:</span>
              <div className="flex gap-2">
                {['Azure', 'M365', 'Dynamics'].map((product) => (
                  <Button
                    key={product}
                    size="sm"
                    variant={productFit.includes(product) ? 'default' : 'outline'}
                    onClick={() => toggleProductFit(product)}
                    className={
                      productFit.includes(product)
                        ? 'bg-blue-600 hover:bg-blue-700'
                        : 'border-blue-300 text-blue-700 hover:bg-blue-50'
                    }
                  >
                    {product}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Generate Button */}
          <div className="flex justify-center">
            <Button
              onClick={handleGenerateAccounts}
              disabled={isScanning}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              <Search className="w-4 h-4 mr-2" />
              {isScanning ? 'Scanning open pipeline...' : 'Generate New Accounts'}
            </Button>
          </div>

          {/* Scanning Indicator */}
          <AnimatePresence>
            {isScanning && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-blue-50 border border-blue-300 rounded-lg p-3 flex items-center gap-3"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                >
                  <Sparkles className="w-5 h-5 text-blue-600" />
                </motion.div>
                <p className="text-blue-900 text-sm">
                  Analyzing signals from LinkedIn, job boards, and web mentions...
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Main Content Area */}
      <div className="p-6">
        <div className="flex gap-6">
          {/* Opportunity Finder Table */}
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden"
            >
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-purple-50 border-b-2 border-purple-200 sticky top-0">
                    <tr>
                      <th className="text-left p-4 text-purple-900">Company</th>
                      <th className="text-left p-4 text-purple-900">Industry</th>
                      <th className="text-left p-4 text-purple-900">Size</th>
                      <th className="text-left p-4 text-purple-900">
                        Product Fit
                      </th>
                      <th className="text-left p-4 text-purple-900">
                        <div className="flex items-center gap-1">
                          Propensity
                          <div className="group relative">
                            <Info className="w-4 h-4 text-purple-600 cursor-help" />
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-900 text-white text-xs rounded-lg p-2 whitespace-nowrap">
                              Propensity = Model confidence × Fit score
                            </div>
                          </div>
                        </div>
                      </th>
                      <th className="text-left p-4 text-purple-900">
                        AI Insight
                      </th>
                      <th className="text-left p-4 text-purple-900">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {accounts.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="p-12">
                          <div className="text-center">
                            <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-gray-900 mb-2">
                              No new unmanaged accounts found today
                            </h3>
                            <p className="text-gray-600 mb-4">
                              Try expanding your filters or re-run AI scan.
                            </p>
                            <Button
                              onClick={handleGenerateAccounts}
                              className="bg-purple-700 hover:bg-purple-800"
                            >
                              <Search className="w-4 h-4 mr-2" />
                              Run AI Scan
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      accounts.map((account, index) => (
                        <motion.tr
                          key={account.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + index * 0.05 }}
                          className="border-b border-gray-200 hover:bg-blue-50 hover:shadow-sm transition-all cursor-pointer"
                          onClick={() => setSelectedAccount(account)}
                        >
                          <td className="p-4">
                            <div className="text-gray-900">{account.company}</div>
                          </td>
                          <td className="p-4">
                            <Badge variant="outline" className="border-purple-300 text-purple-700">
                              {account.industry}
                            </Badge>
                          </td>
                          <td className="p-4">
                            <div className="text-gray-700">{account.size} emp</div>
                          </td>
                          <td className="p-4">
                            <div className="text-gray-900 text-sm">
                              {account.productFit}
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="space-y-1">
                              <div className={`flex items-center gap-2 ${getPropensityColor(account.propensity)}`}>
                                {getPropensityIcon(account.propensity)}
                                <span>{account.propensity.toFixed(2)}</span>
                              </div>
                              <div className="h-1 bg-gray-200 rounded-full overflow-hidden w-24">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{
                                    width: `${account.propensity * 100}%`,
                                  }}
                                  transition={{
                                    delay: 0.5 + index * 0.05,
                                    duration: 0.6,
                                  }}
                                  className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full"
                                />
                              </div>
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="text-gray-700 text-sm max-w-xs">
                              {account.aiInsight}
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                className="bg-purple-700 hover:bg-purple-800"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedAccount(account);
                                }}
                              >
                                Open Builder
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="border-blue-400 text-blue-700 hover:bg-blue-50"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setShowPitchModal(account);
                                }}
                              >
                                Customize Pitch
                              </Button>
                            </div>
                          </td>
                        </motion.tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </motion.div>

            {/* Conversion Heatmap */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-6"
            >
              <ConversionHeatmap />
            </motion.div>
          </div>

          {/* AI Insights Sidebar */}
          <AnimatePresence>
            {insightsPanelOpen && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="w-80 flex-shrink-0"
              >
                <div className="bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden sticky top-[300px]">
                  <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-4 flex items-center justify-between">
                    <h2 className="text-white flex items-center gap-2">
                      <Sparkles className="w-5 h-5" />
                      AI Insights for Today's Leads
                    </h2>
                    <button
                      onClick={() => setInsightsPanelOpen(false)}
                      className="text-white hover:text-blue-100 transition-colors"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="p-6 space-y-4">
                    {aiInsights.map((insight, index) => (
                      <motion.div
                        key={insight.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        className="p-4 bg-blue-50 border border-blue-200 rounded-lg"
                      >
                        <p className="text-blue-900 text-sm mb-3">
                          {insight.icon} {insight.text}
                        </p>
                        <div className="mb-3">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-blue-700 text-xs">
                              Confidence
                            </span>
                            <span className="text-blue-700 text-xs">
                              {(insight.confidence * 100).toFixed(0)}%
                            </span>
                          </div>
                          <div className="h-1 bg-blue-200 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{
                                width: `${insight.confidence * 100}%`,
                              }}
                              transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
                              className="h-full bg-gradient-to-r from-blue-600 to-blue-500 rounded-full"
                            />
                          </div>
                        </div>
                        <div className="flex gap-2">
                          {insight.actions.map((action, i) => (
                            <Button
                              key={i}
                              size="sm"
                              variant="outline"
                              className="border-blue-400 text-blue-700 hover:bg-blue-100 text-xs"
                            >
                              {action}
                            </Button>
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Minimized Insights Panel Toggle */}
          {!insightsPanelOpen && (
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={() => setInsightsPanelOpen(true)}
              className="fixed right-6 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-l-xl shadow-lg transition-colors z-10"
            >
              <div className="flex flex-col items-center gap-2">
                <Sparkles className="w-5 h-5" />
                <ChevronLeft className="w-4 h-4" />
              </div>
            </motion.button>
          )}
        </div>
      </div>

      {/* Sales Pitch Modal */}
      {showPitchModal && (
        <SalesPitchModal
          account={showPitchModal}
          onClose={() => setShowPitchModal(null)}
          onApply={(pitch) => {
            setShowPitchModal(null);
            setSelectedAccount(showPitchModal);
          }}
        />
      )}
    </div>
  );
}
