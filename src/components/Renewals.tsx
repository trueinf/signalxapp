import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  Download,
  Settings,
  Sparkles,
  RotateCcw,
  AlertCircle,
  TrendingDown,
  TrendingUp,
  Activity,
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
import { Input } from './ui/input';
import { RenewalAccountBrief } from './RenewalAccountBrief';

interface RenewalRecord {
  id: string;
  customer: string;
  renewalDate: string;
  contractValue: number;
  riskLevel: 'High' | 'Medium' | 'Low';
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

export function Renewals() {
  const [selectedAccount, setSelectedAccount] = useState<RenewalRecord | null>(
    null
  );
  const [renewalWindow, setRenewalWindow] = useState('30');
  const [riskLevel, setRiskLevel] = useState('all');
  const [region, setRegion] = useState('all');
  const [segment, setSegment] = useState('all');
  const [owner, setOwner] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copilotActive, setCopilotActive] = useState(false);

  const renewalData: RenewalRecord[] = [
    {
      id: '1',
      customer: 'Acme Retail LLC',
      renewalDate: '21 Nov 2025',
      contractValue: 118400,
      riskLevel: 'High',
      riskScore: 0.72,
      usageHealth: 54,
      status: 'Under-adopting',
      owner: 'R. Shah',
      industry: 'Retail',
      location: 'Chicago, IL',
      seats: 410,
      lastRenewal: '2023',
      discount: 8,
    },
    {
      id: '2',
      customer: 'BlueYonder Logistics',
      renewalDate: '15 Dec 2025',
      contractValue: 91300,
      riskLevel: 'Low',
      riskScore: 0.22,
      usageHealth: 86,
      status: 'Healthy',
      owner: 'S. Patel',
      industry: 'Logistics',
      location: 'Seattle, WA',
      seats: 285,
      lastRenewal: '2023',
      discount: 5,
    },
    {
      id: '3',
      customer: 'Contoso Health',
      renewalDate: '01 Dec 2025',
      contractValue: 139500,
      riskLevel: 'Medium',
      riskScore: 0.56,
      usageHealth: 66,
      status: 'Low Utilization',
      owner: 'L. Chen',
      industry: 'Healthcare',
      location: 'Boston, MA',
      seats: 520,
      lastRenewal: '2022',
      discount: 10,
    },
    {
      id: '4',
      customer: 'TechForward Inc',
      renewalDate: '08 Dec 2025',
      contractValue: 245800,
      riskLevel: 'Medium',
      riskScore: 0.48,
      usageHealth: 71,
      status: 'Moderate Engagement',
      owner: 'R. Shah',
      industry: 'Technology',
      location: 'Austin, TX',
      seats: 890,
      lastRenewal: '2023',
      discount: 12,
    },
    {
      id: '5',
      customer: 'GlobalBank Corp',
      renewalDate: '25 Nov 2025',
      contractValue: 487200,
      riskLevel: 'Low',
      riskScore: 0.18,
      usageHealth: 92,
      status: 'Highly Engaged',
      owner: 'L. Chen',
      industry: 'Financial Services',
      location: 'New York, NY',
      seats: 1540,
      lastRenewal: '2023',
      discount: 6,
    },
    {
      id: '6',
      customer: 'EduLearn Systems',
      renewalDate: '10 Dec 2025',
      contractValue: 67900,
      riskLevel: 'High',
      riskScore: 0.81,
      usageHealth: 43,
      status: 'At Risk',
      owner: 'S. Patel',
      industry: 'Education',
      location: 'Portland, OR',
      seats: 210,
      lastRenewal: '2022',
      discount: 15,
    },
  ];

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'High':
        return 'text-red-600';
      case 'Medium':
        return 'text-orange-600';
      case 'Low':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };

  const getRiskBadge = (risk: string) => {
    switch (risk) {
      case 'High':
        return '🔴';
      case 'Medium':
        return '🟠';
      case 'Low':
        return '🟢';
      default:
        return '';
    }
  };

  const resetFilters = () => {
    setRenewalWindow('30');
    setRiskLevel('all');
    setRegion('all');
    setSegment('all');
    setOwner('all');
    setSearchQuery('');
  };

  const hasActiveFilters =
    renewalWindow !== '30' ||
    riskLevel !== 'all' ||
    region !== 'all' ||
    segment !== 'all' ||
    owner !== 'all' ||
    searchQuery !== '';

  if (selectedAccount) {
    return (
      <RenewalAccountBrief
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
        className="bg-white border-b-4 border-purple-700 p-6 sticky top-0 z-10 shadow-sm"
      >
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-purple-900 mb-2">Renewal Command Center</h1>
            <p className="text-gray-600">
              Prioritize, prepare, and complete renewals with AI-powered
              precision.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              className="border-purple-400 text-purple-700 hover:bg-purple-50"
            >
              <Download className="w-4 h-4 mr-2" />
              Export Data
            </Button>
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search Customer"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
            <Button
              variant="outline"
              size="sm"
              className="border-purple-400 text-purple-700 hover:bg-purple-50"
            >
              <Settings className="w-4 h-4" />
            </Button>
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
          </div>
        </div>

        {/* AI Update Indicator */}
        <AnimatePresence>
          {hasActiveFilters && (
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              exit={{ scaleX: 0 }}
              className="h-1 bg-gradient-to-r from-purple-600 to-blue-500 rounded-full origin-left"
            />
          )}
        </AnimatePresence>
      </motion.div>

      {/* Filter Panel */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="bg-purple-50 border-b border-purple-200 p-4 sticky top-[140px] z-10"
      >
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="text-gray-700">Renewal Window:</span>
            <div className="flex gap-2">
              {['30', '60', '90'].map((days) => (
                <Button
                  key={days}
                  size="sm"
                  variant={renewalWindow === days ? 'default' : 'outline'}
                  onClick={() => setRenewalWindow(days)}
                  className={
                    renewalWindow === days
                      ? 'bg-purple-700 hover:bg-purple-800'
                      : 'border-purple-300 text-purple-700 hover:bg-purple-100'
                  }
                >
                  {days} Days
                </Button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-gray-700">Risk Level:</span>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant={riskLevel === 'all' ? 'default' : 'outline'}
                onClick={() => setRiskLevel('all')}
                className={
                  riskLevel === 'all'
                    ? 'bg-purple-700 hover:bg-purple-800'
                    : 'border-purple-300 text-purple-700 hover:bg-purple-100'
                }
              >
                All
              </Button>
              <Button
                size="sm"
                variant={riskLevel === 'high' ? 'default' : 'outline'}
                onClick={() => setRiskLevel('high')}
                className={
                  riskLevel === 'high'
                    ? 'bg-red-600 hover:bg-red-700'
                    : 'border-red-300 text-red-700 hover:bg-red-50'
                }
              >
                🔴 High
              </Button>
              <Button
                size="sm"
                variant={riskLevel === 'medium' ? 'default' : 'outline'}
                onClick={() => setRiskLevel('medium')}
                className={
                  riskLevel === 'medium'
                    ? 'bg-orange-600 hover:bg-orange-700'
                    : 'border-orange-300 text-orange-700 hover:bg-orange-50'
                }
              >
                🟠 Medium
              </Button>
              <Button
                size="sm"
                variant={riskLevel === 'low' ? 'default' : 'outline'}
                onClick={() => setRiskLevel('low')}
                className={
                  riskLevel === 'low'
                    ? 'bg-green-600 hover:bg-green-700'
                    : 'border-green-300 text-green-700 hover:bg-green-50'
                }
              >
                🟢 Low
              </Button>
            </div>
          </div>

          <Select value={region} onValueChange={setRegion}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Region" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Regions</SelectItem>
              <SelectItem value="americas">Americas</SelectItem>
              <SelectItem value="emea">EMEA</SelectItem>
              <SelectItem value="apac">APAC</SelectItem>
            </SelectContent>
          </Select>

          <Select value={segment} onValueChange={setSegment}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Segment" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Segments</SelectItem>
              <SelectItem value="smb">SMB</SelectItem>
              <SelectItem value="enterprise">Enterprise</SelectItem>
            </SelectContent>
          </Select>

          <Select value={owner} onValueChange={setOwner}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Owner" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Owners</SelectItem>
              <SelectItem value="me">Me</SelectItem>
              <SelectItem value="team">My Team</SelectItem>
              <SelectItem value="r.shah">R. Shah</SelectItem>
              <SelectItem value="s.patel">S. Patel</SelectItem>
              <SelectItem value="l.chen">L. Chen</SelectItem>
            </SelectContent>
          </Select>

          {hasActiveFilters && (
            <Button
              size="sm"
              variant="outline"
              onClick={resetFilters}
              className="border-blue-500 text-blue-600 hover:bg-blue-50"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset Filters
            </Button>
          )}
        </div>

        {/* AI Suggestion Hint */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-4 bg-blue-50 border border-blue-300 rounded-lg p-3 flex items-start gap-3"
        >
          <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <p className="text-blue-900 text-sm">
            💡 AI recommends focusing on high-risk renewals within 30 days in
            Healthcare segment.
          </p>
        </motion.div>
      </motion.div>

      {/* Main Content */}
      <div className="p-6">
        {/* Renewal Radar Table */}
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
                  <th className="text-left p-4 text-purple-900">Customer</th>
                  <th className="text-left p-4 text-purple-900">
                    Renewal Date
                  </th>
                  <th className="text-left p-4 text-purple-900">
                    Contract Value
                  </th>
                  <th className="text-left p-4 text-purple-900">Risk</th>
                  <th className="text-left p-4 text-purple-900">
                    Usage Health
                  </th>
                  <th className="text-left p-4 text-purple-900">Status</th>
                  <th className="text-left p-4 text-purple-900">Owner</th>
                  <th className="text-left p-4 text-purple-900">Action</th>
                </tr>
              </thead>
              <tbody>
                {renewalData.map((record, index) => (
                  <motion.tr
                    key={record.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.05 }}
                    className="border-b border-gray-200 hover:bg-purple-50 transition-colors cursor-pointer"
                    onClick={() => setSelectedAccount(record)}
                  >
                    <td className="p-4">
                      <div className="text-gray-900">{record.customer}</div>
                    </td>
                    <td className="p-4">
                      <div className="text-gray-700">{record.renewalDate}</div>
                    </td>
                    <td className="p-4">
                      <div className="text-gray-900">
                        ${record.contractValue.toLocaleString()}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="space-y-1">
                        <div className={`flex items-center gap-2 ${getRiskColor(record.riskLevel)}`}>
                          <span>{getRiskBadge(record.riskLevel)}</span>
                          <span>
                            {record.riskLevel} ({record.riskScore.toFixed(2)})
                          </span>
                        </div>
                        <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${record.riskScore * 100}%` }}
                            transition={{ delay: 0.5 + index * 0.05, duration: 0.6 }}
                            className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full"
                          />
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div className="w-full max-w-[100px]">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-gray-700 text-sm">
                              {record.usageHealth}%
                            </span>
                            {record.usageHealth < 60 ? (
                              <TrendingDown className="w-4 h-4 text-red-600" />
                            ) : record.usageHealth < 80 ? (
                              <Activity className="w-4 h-4 text-orange-600" />
                            ) : (
                              <TrendingUp className="w-4 h-4 text-green-600" />
                            )}
                          </div>
                          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${record.usageHealth}%` }}
                              transition={{
                                delay: 0.5 + index * 0.05,
                                duration: 0.6,
                              }}
                              className={`h-full rounded-full ${
                                record.usageHealth < 60
                                  ? 'bg-red-500'
                                  : record.usageHealth < 80
                                  ? 'bg-orange-500'
                                  : 'bg-green-500'
                              }`}
                            />
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge
                        variant="outline"
                        className={
                          record.status.includes('At Risk') ||
                          record.status.includes('Under-adopting')
                            ? 'border-red-300 text-red-700 bg-red-50'
                            : record.status.includes('Low')
                            ? 'border-orange-300 text-orange-700 bg-orange-50'
                            : 'border-green-300 text-green-700 bg-green-50'
                        }
                      >
                        {record.status.includes('At Risk') ||
                        record.status.includes('Under-adopting')
                          ? '⚠️'
                          : record.status.includes('Healthy') ||
                            record.status.includes('Highly')
                          ? '✅'
                          : '⚠️'}{' '}
                        {record.status}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <div className="text-gray-700">{record.owner}</div>
                    </td>
                    <td className="p-4">
                      <Button
                        size="sm"
                        className="bg-purple-700 hover:bg-purple-800"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedAccount(record);
                        }}
                      >
                        Start Prep
                      </Button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>

      {/* Performance Widget - Bottom Info Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-gray-800 text-white px-6 py-3 rounded-full shadow-lg z-20"
      >
        <p className="text-sm">
          <span className="text-blue-400">AI saved you 22 mins today</span> •
          Renewal success{' '}
          <span className="text-green-400">+2.3% WoW</span>
        </p>
      </motion.div>

      {/* AI Chat Toggle - Bottom Right */}
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
    </div>
  );
}
