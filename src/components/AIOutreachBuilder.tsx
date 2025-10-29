import { useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  Sparkles,
  Mail,
  Linkedin,
  Phone,
  Calendar,
  Send,
  Save,
  RefreshCw,
  TrendingUp,
  CheckCircle2,
  Clock,
  Zap,
} from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

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

interface AIOutreachBuilderProps {
  account: UnmanagedAccount;
  onBack: () => void;
}

export function AIOutreachBuilder({
  account,
  onBack,
}: AIOutreachBuilderProps) {
  const [channel, setChannel] = useState('email');
  const [subject, setSubject] = useState(
    `Streamline ${account.industry} operations with ${account.productFit}`
  );
  const [body, setBody] = useState(
    `Hi Team,\n\nI hope this message finds you well. I'm reaching out because I noticed ${account.company} is ${account.aiInsight.toLowerCase()}\n\nMany ${account.industry.toLowerCase()} organizations of your size face similar challenges, and we've helped companies like yours achieve:\n\n• Enhanced security posture with integrated threat protection\n• Improved operational efficiency through cloud collaboration\n• Significant cost savings via vendor consolidation\n\nOur ${account.productFit} solutions are specifically designed for ${account.industry.toLowerCase()} organizations, with compliance features and scalability built in.\n\nWould you be open to a brief 15-minute conversation to explore how we might support your goals?\n\nBest regards`
  );
  const [touchpoints, setTouchpoints] = useState([
    {
      id: '1',
      day: 0,
      channel: 'Email',
      status: 'Draft',
      subject: 'Initial outreach',
    },
    {
      id: '2',
      day: 3,
      channel: 'LinkedIn',
      status: 'Scheduled',
      subject: 'Connection + value share',
    },
    {
      id: '3',
      day: 7,
      channel: 'Email',
      status: 'Scheduled',
      subject: 'Follow-up with case study',
    },
    {
      id: '4',
      day: 14,
      channel: 'Phone',
      status: 'Scheduled',
      subject: 'Direct outreach call',
    },
  ]);

  const aiRecommendations = [
    {
      type: 'timing',
      title: 'Best Send Time',
      description: `Tuesday or Wednesday, 9-11 AM ${account.geography} time`,
      confidence: 0.84,
    },
    {
      type: 'content',
      title: 'Key Messaging',
      description: `Emphasize ${account.industry.toLowerCase()} compliance and security consolidation`,
      confidence: 0.91,
    },
    {
      type: 'sequence',
      title: 'Optimal Touchpoints',
      description: '4-touch sequence over 14 days yields highest response',
      confidence: 0.87,
    },
  ];

  const getChannelIcon = (channelType: string) => {
    switch (channelType.toLowerCase()) {
      case 'email':
        return <Mail className="w-4 h-4" />;
      case 'linkedin':
        return <Linkedin className="w-4 h-4" />;
      case 'phone':
        return <Phone className="w-4 h-4" />;
      default:
        return <Mail className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Draft':
        return 'border-orange-300 text-orange-700 bg-orange-50';
      case 'Scheduled':
        return 'border-blue-300 text-blue-700 bg-blue-50';
      case 'Sent':
        return 'border-green-300 text-green-700 bg-green-50';
      default:
        return 'border-gray-300 text-gray-700 bg-gray-50';
    }
  };

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
          Back to Unmanaged Growth Center
        </button>

        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-purple-900 mb-2">
              AI Outreach Builder — {account.company}
            </h1>
            <div className="flex items-center gap-4 text-gray-700">
              <span>{account.industry}</span>
              <span>•</span>
              <span>{account.size} employees</span>
              <span>•</span>
              <Badge className="bg-purple-700">
                Propensity: {account.propensity.toFixed(2)}
              </Badge>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              className="border-purple-400 text-purple-700 hover:bg-purple-50"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Draft
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Send className="w-4 h-4 mr-2" />
              Launch Sequence
            </Button>
          </div>
        </div>

        {/* AI Activity Indicator */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          className="h-1 bg-gradient-to-r from-purple-600 to-blue-500 mt-4 rounded-full origin-left"
        />
      </motion.div>

      {/* Main Content */}
      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Outreach Content (65%) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Channel Selector */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden"
            >
              <div className="bg-gradient-to-r from-purple-700 to-purple-600 p-4">
                <h2 className="text-white">Outreach Channel & Content</h2>
              </div>
              <div className="p-6">
                <div className="mb-6">
                  <label className="text-gray-900 mb-3 block">
                    Primary Channel
                  </label>
                  <div className="flex gap-3">
                    {['Email', 'LinkedIn', 'Phone'].map((ch) => (
                      <Button
                        key={ch}
                        variant={channel === ch.toLowerCase() ? 'default' : 'outline'}
                        onClick={() => setChannel(ch.toLowerCase())}
                        className={
                          channel === ch.toLowerCase()
                            ? 'bg-purple-700 hover:bg-purple-800'
                            : 'border-purple-300 text-purple-700 hover:bg-purple-50'
                        }
                      >
                        {getChannelIcon(ch)}
                        <span className="ml-2">{ch}</span>
                      </Button>
                    ))}
                  </div>
                </div>

                {channel === 'email' && (
                  <>
                    <div className="mb-4">
                      <label className="text-gray-900 mb-2 block">
                        Subject Line
                      </label>
                      <Input
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full"
                      />
                    </div>

                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-gray-900">Email Body</label>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-blue-400 text-blue-700 hover:bg-blue-50"
                        >
                          <RefreshCw className="w-4 h-4 mr-2" />
                          Regenerate with AI
                        </Button>
                      </div>
                      <Textarea
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        rows={14}
                        className="w-full font-mono text-sm"
                      />
                    </div>
                  </>
                )}

                {channel === 'linkedin' && (
                  <div className="mb-4">
                    <label className="text-gray-900 mb-2 block">
                      Connection Message
                    </label>
                    <Textarea
                      placeholder="Hi, I noticed we're both in the tech space..."
                      rows={6}
                      className="w-full"
                    />
                  </div>
                )}

                {channel === 'phone' && (
                  <div className="mb-4">
                    <label className="text-gray-900 mb-2 block">
                      Call Script Outline
                    </label>
                    <Textarea
                      placeholder="1. Introduction & reason for call\n2. Key value proposition\n3. Discovery questions\n4. Next steps"
                      rows={8}
                      className="w-full font-mono text-sm"
                    />
                  </div>
                )}
              </div>
            </motion.div>

            {/* Multi-Touch Sequence */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden"
            >
              <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-4">
                <h2 className="text-white flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  AI-Optimized Sequence (14 Days)
                </h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {touchpoints.map((touchpoint, index) => (
                    <motion.div
                      key={touchpoint.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-purple-300 transition-colors"
                    >
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                          <span className="text-purple-700">
                            Day {touchpoint.day}
                          </span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          {getChannelIcon(touchpoint.channel)}
                          <span className="text-gray-900">
                            {touchpoint.channel}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm">
                          {touchpoint.subject}
                        </p>
                      </div>
                      <Badge
                        variant="outline"
                        className={getStatusColor(touchpoint.status)}
                      >
                        {touchpoint.status}
                      </Badge>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Zap className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <p className="text-blue-900 text-sm">
                      <strong>AI Insight:</strong> This sequence timing is
                      optimized based on {account.industry.toLowerCase()}{' '}
                      vertical data showing peak engagement on days 0, 3, 7,
                      and 14.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column - AI Recommendations (35%) */}
          <div className="space-y-6">
            {/* AI Recommendations */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden"
            >
              <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-4">
                <h2 className="text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  AI Recommendations
                </h2>
              </div>
              <div className="p-6 space-y-4">
                {aiRecommendations.map((rec, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="p-4 bg-purple-50 border border-purple-200 rounded-lg"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      {rec.type === 'timing' && (
                        <Clock className="w-4 h-4 text-purple-700" />
                      )}
                      {rec.type === 'content' && (
                        <Mail className="w-4 h-4 text-purple-700" />
                      )}
                      {rec.type === 'sequence' && (
                        <TrendingUp className="w-4 h-4 text-purple-700" />
                      )}
                      <h4 className="text-purple-900">{rec.title}</h4>
                    </div>
                    <p className="text-gray-700 text-sm mb-3">
                      {rec.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-blue-600 text-xs">
                        {(rec.confidence * 100).toFixed(0)}% confidence
                      </span>
                      <div className="h-1 flex-1 ml-3 bg-purple-200 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${rec.confidence * 100}%` }}
                          transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
                          className="h-full bg-gradient-to-r from-purple-600 to-blue-600 rounded-full"
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Account Context */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden"
            >
              <div className="bg-gradient-to-r from-purple-700 to-purple-600 p-4">
                <h2 className="text-white">Account Context</h2>
              </div>
              <div className="p-6 space-y-3 text-sm">
                <div>
                  <span className="text-gray-500">Industry:</span>
                  <p className="text-gray-900">{account.industry}</p>
                </div>
                <div>
                  <span className="text-gray-500">Company Size:</span>
                  <p className="text-gray-900">{account.size} employees</p>
                </div>
                <div>
                  <span className="text-gray-500">Product Fit:</span>
                  <p className="text-gray-900">{account.productFit}</p>
                </div>
                <div>
                  <span className="text-gray-500">Buying Stage:</span>
                  <p className="text-gray-900">{account.buyingStage}</p>
                </div>
                <div>
                  <span className="text-gray-500">Geography:</span>
                  <p className="text-gray-900">{account.geography}</p>
                </div>
                <div className="pt-3 border-t border-gray-200">
                  <span className="text-gray-500">Key Signal:</span>
                  <p className="text-gray-900">{account.aiInsight}</p>
                </div>
              </div>
            </motion.div>

            {/* Success Metrics */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-br from-green-50 to-blue-50 border border-green-200 rounded-xl p-6"
            >
              <h3 className="text-gray-900 mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                Expected Performance
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-700">Open Rate:</span>
                  <span className="text-green-700">42%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Reply Rate:</span>
                  <span className="text-green-700">18%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Meeting Booked:</span>
                  <span className="text-green-700">7%</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
