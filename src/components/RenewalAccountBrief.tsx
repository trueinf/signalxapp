import { useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  Building2,
  MapPin,
  Users,
  Calendar,
  Percent,
  TrendingDown,
  Sparkles,
  FileText,
  Phone,
  Mail,
  Lightbulb,
  Shield,
  DollarSign,
  FileCheck,
} from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { LiveCallAssist } from './LiveCallAssist';

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

interface RenewalAccountBriefProps {
  account: RenewalRecord;
  onBack: () => void;
}

export function RenewalAccountBrief({
  account,
  onBack,
}: RenewalAccountBriefProps) {
  const [showCallAssist, setShowCallAssist] = useState(false);

  const usageData = [
    { name: 'M365', usage: 72 },
    { name: 'Teams', usage: 85 },
    { name: 'SharePoint', usage: 54 },
    { name: 'OneDrive', usage: 68 },
    { name: 'Exchange', usage: 91 },
  ];

  const aiOffers = [
    {
      type: 'Pilot',
      product: 'E5',
      seats: 25,
      value: 0,
      confidence: 0.87,
    },
    {
      type: 'Add-on',
      product: 'Copilot for M365',
      seats: 15,
      value: 0,
      confidence: 0.82,
    },
    {
      type: 'Retention Guardrail',
      product: '5% discretionary discount if pilot plan attached',
      seats: null,
      value: account.contractValue * 0.05,
      confidence: 0.91,
    },
  ];

  const talkTracks = [
    {
      icon: Shield,
      title: 'Security Consolidation',
      description:
        'Reduce vendor sprawl and improve security posture with integrated threat protection',
      confidence: 0.89,
    },
    {
      icon: DollarSign,
      title: 'Shadow IT Savings',
      description:
        'Eliminate redundant tools and consolidate productivity stack',
      confidence: 0.76,
    },
    {
      icon: FileCheck,
      title: 'Audit Simplicity',
      description:
        'Streamline compliance reporting with unified admin dashboard',
      confidence: 0.84,
    },
  ];

  if (showCallAssist) {
    return (
      <LiveCallAssist
        account={account}
        onEnd={() => setShowCallAssist(false)}
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
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-purple-600 hover:text-purple-700 transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Renewals Dashboard
        </button>

        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-purple-900 mb-2">
              Renewal Brief — {account.customer}
            </h1>
            <div className="flex items-center gap-4 text-gray-700">
              <span>Contract ending {account.renewalDate}</span>
              <span>•</span>
              <span>ARR ${account.contractValue.toLocaleString()}</span>
              <span>•</span>
              <Badge
                variant="outline"
                className={
                  account.riskLevel === 'High'
                    ? 'border-red-300 text-red-700 bg-red-50'
                    : account.riskLevel === 'Medium'
                    ? 'border-orange-300 text-orange-700 bg-orange-50'
                    : 'border-green-300 text-green-700 bg-green-50'
                }
              >
                {account.riskLevel} Risk ({account.riskScore.toFixed(2)})
              </Badge>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              className="border-purple-400 text-purple-700 hover:bg-purple-50"
            >
              <FileText className="w-4 h-4 mr-2" />
              View Historical Notes
            </Button>
            <Button
              className="bg-purple-700 hover:bg-purple-800"
              onClick={() => setShowCallAssist(true)}
            >
              <Phone className="w-4 h-4 mr-2" />
              Launch Call Assist
            </Button>
          </div>
        </div>

        {/* AI Update Indicator */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          className="h-1 bg-gradient-to-r from-purple-600 to-blue-500 mt-4 rounded-full origin-left"
        />
      </motion.div>

      {/* Main Content */}
      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Account Overview (65%) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Snapshot Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden"
            >
              <div className="bg-gradient-to-r from-purple-700 to-purple-600 p-4">
                <h2 className="text-white">Account Snapshot</h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  <div className="flex items-start gap-3">
                    <Building2 className="w-5 h-5 text-purple-600 mt-1" />
                    <div>
                      <p className="text-gray-500 text-sm">Industry</p>
                      <p className="text-gray-900">{account.industry}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-purple-600 mt-1" />
                    <div>
                      <p className="text-gray-500 text-sm">Location</p>
                      <p className="text-gray-900">{account.location}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Users className="w-5 h-5 text-purple-600 mt-1" />
                    <div>
                      <p className="text-gray-500 text-sm">Seats</p>
                      <p className="text-gray-900">{account.seats} E3</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-purple-600 mt-1" />
                    <div>
                      <p className="text-gray-500 text-sm">Last Renewal</p>
                      <p className="text-gray-900">{account.lastRenewal}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Percent className="w-5 h-5 text-purple-600 mt-1" />
                    <div>
                      <p className="text-gray-500 text-sm">Current Discount</p>
                      <p className="text-gray-900">{account.discount}%</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <TrendingDown className="w-5 h-5 text-red-600 mt-1" />
                    <div>
                      <p className="text-gray-500 text-sm">Usage Trend</p>
                      <p className="text-red-700">-9% Q/Q</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Usage Trend Graph */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden"
            >
              <div className="bg-gradient-to-r from-purple-700 to-purple-600 p-4">
                <h2 className="text-white">Usage Adoption Trends</h2>
              </div>
              <div className="p-6">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={usageData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis
                      dataKey="name"
                      stroke="#6B7280"
                      style={{ fontSize: '14px' }}
                    />
                    <YAxis
                      stroke="#6B7280"
                      style={{ fontSize: '14px' }}
                      domain={[0, 100]}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #E5E7EB',
                        borderRadius: '8px',
                      }}
                    />
                    <Bar dataKey="usage" fill="url(#colorGradient)" radius={[8, 8, 0, 0]} />
                    <defs>
                      <linearGradient
                        id="colorGradient"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop offset="0%" stopColor="#7C3AED" />
                        <stop offset="100%" stopColor="#4C89FF" />
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* AI Commentary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-blue-50 border border-blue-300 rounded-xl p-6"
            >
              <div className="flex items-start gap-3">
                <Sparkles className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-blue-900 mb-2">AI Commentary</h3>
                  <p className="text-blue-800">
                    Usage down 9% Q/Q; IT Director recently changed.
                    Under-adoption risk is high. Recommend engagement on security
                    consolidation benefits and propose E5 pilot to demonstrate
                    advanced capabilities.
                  </p>
                  <div className="mt-4 flex items-center gap-2">
                    <div className="h-2 flex-1 bg-blue-200 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '78%' }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                        className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full"
                      />
                    </div>
                    <span className="text-blue-700 text-sm">
                      Confidence: 78%
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Recommendations (35%) */}
          <div className="space-y-6">
            {/* AI Offers */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden relative"
            >
              {/* AI Glow Indicator */}
              <div className="absolute top-4 right-4 w-3 h-3 bg-blue-500 rounded-full animate-pulse shadow-lg shadow-blue-500/50" />

              <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-4">
                <h2 className="text-white flex items-center gap-2">
                  <Lightbulb className="w-5 h-5" />
                  AI Offers
                </h2>
              </div>
              <div className="p-6 space-y-4">
                {aiOffers.map((offer, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="p-4 bg-purple-50 border border-purple-200 rounded-lg"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <Badge className="bg-purple-700">
                        {offer.type}
                      </Badge>
                      <span className="text-blue-600 text-sm">
                        {(offer.confidence * 100).toFixed(0)}% conf.
                      </span>
                    </div>
                    <p className="text-gray-900 mb-1">
                      {offer.product}
                    </p>
                    {offer.seats && (
                      <p className="text-gray-600 text-sm">
                        {offer.seats} seats
                      </p>
                    )}
                    {offer.value > 0 && (
                      <p className="text-purple-700">
                        ${offer.value.toLocaleString()} discount
                      </p>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* AI Talk Tracks */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden"
            >
              <div className="bg-gradient-to-r from-purple-700 to-purple-600 p-4">
                <h2 className="text-white">AI Talk Tracks</h2>
              </div>
              <div className="p-6 space-y-4">
                {talkTracks.map((track, index) => {
                  const Icon = track.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      className="p-4 bg-white border border-gray-200 rounded-lg hover:border-purple-300 transition-colors"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Icon className="w-5 h-5 text-purple-700" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-1">
                            <h4 className="text-gray-900">{track.title}</h4>
                            <span className="text-blue-600 text-sm">
                              {(track.confidence * 100).toFixed(0)}%
                            </span>
                          </div>
                          <p className="text-gray-600 text-sm">
                            {track.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="space-y-3"
            >
              <Button
                className="w-full bg-blue-600 hover:bg-blue-700"
                onClick={() => setShowCallAssist(true)}
              >
                <Phone className="w-4 h-4 mr-2" />
                Launch Call Assist
              </Button>
              <Button
                variant="outline"
                className="w-full border-purple-400 text-purple-700 hover:bg-purple-50"
              >
                <FileText className="w-4 h-4 mr-2" />
                Create Quote
              </Button>
              <Button
                variant="outline"
                className="w-full border-purple-400 text-purple-700 hover:bg-purple-50"
              >
                <Mail className="w-4 h-4 mr-2" />
                Draft Follow-Up Email
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
