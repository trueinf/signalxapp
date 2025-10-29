import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  Phone,
  Mic,
  MicOff,
  Video,
  VideoOff,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  MessageSquare,
  FileText,
  Flag,
  Copy,
  Shield,
  DollarSign,
  TrendingUp,
  Users,
} from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { PostCallSummary } from './PostCallSummary';

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

interface LiveCallAssistProps {
  account: RenewalRecord;
  onEnd: () => void;
}

interface TranscriptItem {
  id: string;
  speaker: 'Agent' | 'Customer';
  text: string;
  sentiment: 'Positive' | 'Neutral' | 'Concern';
  timestamp: string;
}

interface AISuggestion {
  id: string;
  type: 'objection' | 'offer' | 'compliance' | 'insight';
  title: string;
  content: string;
  confidence: number;
  source: string;
}

export function LiveCallAssist({ account, onEnd }: LiveCallAssistProps) {
  const [callEnded, setCallEnded] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const [transcript, setTranscript] = useState<TranscriptItem[]>([
    {
      id: '1',
      speaker: 'Agent',
      text: "Hi, this is calling from Microsoft. I wanted to discuss your upcoming renewal.",
      sentiment: 'Positive',
      timestamp: '00:12',
    },
    {
      id: '2',
      speaker: 'Customer',
      text: "Thanks for calling. I've been meaning to talk about the pricing. It seems quite high compared to what we're actually using.",
      sentiment: 'Concern',
      timestamp: '00:28',
    },
    {
      id: '3',
      speaker: 'Agent',
      text: "I understand your concern. Let me share some insights on how we can optimize your usage and provide better value.",
      sentiment: 'Positive',
      timestamp: '00:45',
    },
    {
      id: '4',
      speaker: 'Customer',
      text: "That would be helpful. We're also looking at consolidating our security tools.",
      sentiment: 'Positive',
      timestamp: '01:02',
    },
  ]);

  const [aiSuggestions, setAiSuggestions] = useState<AISuggestion[]>([
    {
      id: '1',
      type: 'objection',
      title: 'Price Objection Detected',
      content:
        'Use value framing: "While I understand the price concern, let\'s look at the total cost of ownership. By consolidating your security and productivity tools into M365, you can reduce costs by an average of 35% while improving security posture."',
      confidence: 0.89,
      source: 'Playbook',
    },
    {
      id: '2',
      type: 'offer',
      title: 'E5 Pilot Opportunity',
      content:
        'Customer mentioned security consolidation. Recommend: "I\'d like to propose a 60-day E5 pilot for 25 seats. This will demonstrate our advanced security features including threat protection and compliance tools at no additional cost during the trial."',
      confidence: 0.87,
      source: 'CRM + Policy',
    },
    {
      id: '3',
      type: 'compliance',
      title: 'DPA Reminder',
      content:
        'Mention data-processing addendum: "For your industry, I should also mention our data processing agreement which ensures GDPR compliance and data residency options."',
      confidence: 0.76,
      source: 'Policy',
    },
  ]);

  const handleCopyResponse = (index: number) => {
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleEndCall = () => {
    setCallEnded(true);
  };

  if (callEnded) {
    return <PostCallSummary account={account} onClose={onEnd} />;
  }

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'Positive':
        return 'text-green-600 bg-green-50 border-green-300';
      case 'Neutral':
        return 'text-blue-600 bg-blue-50 border-blue-300';
      case 'Concern':
        return 'text-orange-600 bg-orange-50 border-orange-300';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-300';
    }
  };

  const getSuggestionIcon = (type: string) => {
    switch (type) {
      case 'objection':
        return AlertCircle;
      case 'offer':
        return TrendingUp;
      case 'compliance':
        return Shield;
      default:
        return MessageSquare;
    }
  };

  const getSuggestionColor = (type: string) => {
    switch (type) {
      case 'objection':
        return 'from-orange-600 to-orange-500';
      case 'offer':
        return 'from-blue-600 to-blue-500';
      case 'compliance':
        return 'from-purple-600 to-purple-500';
      default:
        return 'from-gray-600 to-gray-500';
    }
  };

  return (
    <div className="h-full overflow-hidden bg-white flex flex-col">
      {/* Header Bar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border-b-4 border-blue-700 p-6 shadow-sm flex-shrink-0"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
            <div>
              <h1 className="text-blue-900">
                Live Call — {account.customer}
              </h1>
              <p className="text-gray-600 text-sm">
                Duration: 01:23 • AI Copilot Active
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsMuted(!isMuted)}
              className={
                isMuted
                  ? 'border-red-400 text-red-700 hover:bg-red-50'
                  : 'border-purple-400 text-purple-700 hover:bg-purple-50'
              }
            >
              {isMuted ? (
                <MicOff className="w-4 h-4" />
              ) : (
                <Mic className="w-4 h-4" />
              )}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsVideoOn(!isVideoOn)}
              className={
                !isVideoOn
                  ? 'border-red-400 text-red-700 hover:bg-red-50'
                  : 'border-purple-400 text-purple-700 hover:bg-purple-50'
              }
            >
              {isVideoOn ? (
                <Video className="w-4 h-4" />
              ) : (
                <VideoOff className="w-4 h-4" />
              )}
            </Button>
            <Button
              size="sm"
              onClick={handleEndCall}
              className="bg-red-600 hover:bg-red-700"
            >
              <Phone className="w-4 h-4 mr-2" />
              End Call
            </Button>
          </div>
        </div>

        {/* AI Activity Indicator */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          className="h-1 bg-gradient-to-r from-blue-600 to-purple-500 rounded-full origin-left"
        />
      </motion.div>

      {/* Main Content - Split Screen */}
      <div className="flex-1 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6 h-full">
          {/* Left Column - Transcript */}
          <div className="flex flex-col h-full">
            <div className="bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden flex-1 flex flex-col">
              <div className="bg-gradient-to-r from-purple-700 to-purple-600 p-4 flex-shrink-0">
                <h2 className="text-white flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Real-Time Transcript
                </h2>
              </div>
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {transcript.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-4 rounded-lg ${
                      item.speaker === 'Agent'
                        ? 'bg-purple-50 border border-purple-200'
                        : 'bg-gray-50 border border-gray-200'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span
                          className={
                            item.speaker === 'Agent'
                              ? 'text-purple-900'
                              : 'text-gray-900'
                          }
                        >
                          {item.speaker}
                        </span>
                        <span className="text-gray-500 text-sm">
                          {item.timestamp}
                        </span>
                      </div>
                      <Badge
                        variant="outline"
                        className={`${getSentimentColor(item.sentiment)}`}
                      >
                        {item.sentiment}
                      </Badge>
                    </div>
                    <p className="text-gray-700">{item.text}</p>
                  </motion.div>
                ))}

                {/* Typing Indicator */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-2 text-gray-500 text-sm"
                >
                  <div className="flex gap-1">
                    <motion.div
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="w-2 h-2 bg-gray-400 rounded-full"
                    />
                    <motion.div
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        delay: 0.2,
                      }}
                      className="w-2 h-2 bg-gray-400 rounded-full"
                    />
                    <motion.div
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        delay: 0.4,
                      }}
                      className="w-2 h-2 bg-gray-400 rounded-full"
                    />
                  </div>
                  <span>Listening...</span>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Right Column - AI Co-Pilot Cards */}
          <div className="flex flex-col h-full">
            <div className="bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden flex-1 flex flex-col">
              <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-4 flex-shrink-0">
                <h2 className="text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  AI Co-Pilot Suggestions
                </h2>
              </div>
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {aiSuggestions.map((suggestion, index) => {
                  const Icon = getSuggestionIcon(suggestion.type);
                  return (
                    <motion.div
                      key={suggestion.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.15 }}
                      className="bg-white border-2 border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
                    >
                      <div
                        className={`bg-gradient-to-r ${getSuggestionColor(
                          suggestion.type
                        )} p-4`}
                      >
                        <div className="flex items-center justify-between text-white">
                          <div className="flex items-center gap-2">
                            <Icon className="w-5 h-5" />
                            <span>{suggestion.title}</span>
                          </div>
                          <Badge variant="secondary" className="bg-white/20">
                            {(suggestion.confidence * 100).toFixed(0)}%
                          </Badge>
                        </div>
                      </div>
                      <div className="p-4">
                        <p className="text-gray-700 mb-4">
                          {suggestion.content}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-500 text-sm">
                            Source: {suggestion.source}
                          </span>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleCopyResponse(index)}
                              className="border-blue-400 text-blue-700 hover:bg-blue-50"
                            >
                              <Copy className="w-4 h-4 mr-2" />
                              {copiedIndex === index ? 'Copied!' : 'Insert'}
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-green-400 text-green-700 hover:bg-green-50"
                            >
                              <CheckCircle2 className="w-4 h-4 mr-2" />
                              Resolve
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-orange-400 text-orange-700 hover:bg-orange-50"
                            >
                              <Flag className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}

                {/* AI Transparency Note */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="bg-blue-50 border border-blue-300 rounded-lg p-4"
                >
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-blue-900 text-sm">
                        <strong>AI Transparency:</strong> All suggestions include
                        confidence scores and source attribution. Review before
                        using in conversation.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Action Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border-t-2 border-purple-200 p-4 flex items-center justify-between flex-shrink-0"
      >
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-blue-600" />
            <span className="text-gray-700">AI Confidence</span>
          </div>
          <div className="w-48">
            <Progress value={84} className="h-2" />
            <span className="text-blue-600 text-sm">84%</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            className="border-purple-400 text-purple-700 hover:bg-purple-50"
          >
            <FileText className="w-4 h-4 mr-2" />
            View Notes
          </Button>
          <Button
            size="sm"
            onClick={handleEndCall}
            className="bg-red-600 hover:bg-red-700"
          >
            End Call & Generate Summary
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
