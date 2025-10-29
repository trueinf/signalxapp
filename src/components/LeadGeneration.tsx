import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Sparkles, ChevronDown, Flame, ArrowRight, Undo2 } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { ContactCard } from './ContactCard';
import { LeadClusterMap } from './LeadClusterMap';
import { AIInsightsPanel } from './AIInsightsPanel';

interface Prospect {
  id: string;
  company: string;
  industry: string;
  signalType: string;
  source: string;
  fitScore: number;
  expanded: boolean;
}

const mockProspects: Prospect[] = [
  {
    id: '1',
    company: 'Red River Clinic',
    industry: 'Healthcare',
    signalType: 'HIPAA Audit',
    source: 'LinkedIn',
    fitScore: 0.81,
    expanded: false,
  },
  {
    id: '2',
    company: 'Titan Tech Ltd',
    industry: 'IT Services',
    signalType: 'Hiring Cloud Admins',
    source: 'Job Portal',
    fitScore: 0.77,
    expanded: false,
  },
  {
    id: '3',
    company: 'Greenline Freight',
    industry: 'Logistics',
    signalType: 'AWS Cost Spike',
    source: 'X (Twitter)',
    fitScore: 0.74,
    expanded: false,
  },
  {
    id: '4',
    company: 'Summit Financial Group',
    industry: 'Finance',
    signalType: 'Compliance Search',
    source: 'LinkedIn',
    fitScore: 0.69,
    expanded: false,
  },
];

const mockContacts = {
  '1': [
    {
      name: 'Dr. Melanie Ortiz',
      role: 'IT Director',
      company: 'Red River Clinic',
      email: 'melanie.ortiz@redriverclinic.com',
      confidence: 93,
      linkedinUrl: 'https://linkedin.com/in/melanieortiz',
    },
    {
      name: 'James Patterson',
      role: 'CIO',
      company: 'Red River Clinic',
      email: 'j.patterson@redriverclinic.com',
      confidence: 88,
      linkedinUrl: 'https://linkedin.com/in/jpatterson',
    },
    {
      name: 'Sarah Kim',
      role: 'Security Manager',
      company: 'Red River Clinic',
      email: 'skim@redriverclinic.com',
      confidence: 91,
      linkedinUrl: 'https://linkedin.com/in/sarahkim',
    },
  ],
  '2': [
    {
      name: 'Michael Chen',
      role: 'VP of Engineering',
      company: 'Titan Tech Ltd',
      email: 'mchen@titantech.io',
      confidence: 95,
      linkedinUrl: 'https://linkedin.com/in/michaelchen',
    },
    {
      name: 'Priya Sharma',
      role: 'Cloud Architect',
      company: 'Titan Tech Ltd',
      email: 'priya@titantech.io',
      confidence: 89,
      linkedinUrl: 'https://linkedin.com/in/priyasharma',
    },
  ],
  '3': [
    {
      name: 'Robert Davis',
      role: 'CTO',
      company: 'Greenline Freight',
      email: 'r.davis@greenlinefreight.com',
      confidence: 92,
      linkedinUrl: 'https://linkedin.com/in/robertdavis',
    },
    {
      name: 'Linda Martinez',
      role: 'Infrastructure Lead',
      company: 'Greenline Freight',
      email: 'lmartinez@greenlinefreight.com',
      confidence: 87,
      linkedinUrl: 'https://linkedin.com/in/lindamartinez',
    },
  ],
  '4': [
    {
      name: 'David Thompson',
      role: 'Compliance Officer',
      company: 'Summit Financial Group',
      email: 'd.thompson@summitfin.com',
      confidence: 90,
      linkedinUrl: 'https://linkedin.com/in/davidthompson',
    },
  ],
};

interface LeadGenerationProps {
  onLeadClick?: (lead: { id: number; company: string; industry: string; signalType: string; source: string; fitScore: number }) => void;
}

export function LeadGeneration({ onLeadClick }: LeadGenerationProps = {}) {
  const [prospects, setProspects] = useState<Prospect[]>(mockProspects);
  const [isGenerating, setIsGenerating] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [lastAction, setLastAction] = useState<string | null>(null);

  const handleGenerateLeads = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
    }, 2000);
  };

  const handleExpandContacts = (prospectId: string) => {
    setProspects((prev) =>
      prev.map((p) =>
        p.id === prospectId ? { ...p, expanded: !p.expanded } : p
      )
    );
  };

  const handleUndo = () => {
    setLastAction(null);
  };

  return (
    <div className="flex-1 flex h-screen overflow-hidden">
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header Toolbar */}
        <div className="bg-gradient-to-r from-white to-purple-50 border-b border-purple-200 p-6">
          <div className="mb-4">
            <h1 className="text-gray-900 text-3xl mb-1">Lead Generation Hub</h1>
            <p className="text-purple-700">
              AI-powered prospect discovery and enrichment
            </p>
          </div>

          {/* Filters Row */}
          <div className="flex flex-wrap gap-3 items-center">
            {/* Dropdowns */}
            <Select>
              <SelectTrigger className="w-40 bg-white border-purple-300 text-gray-900">
                <SelectValue placeholder="Industry ▾" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="healthcare">Healthcare</SelectItem>
                <SelectItem value="it">IT Services</SelectItem>
                <SelectItem value="logistics">Logistics</SelectItem>
                <SelectItem value="finance">Finance</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="w-40 bg-white border-purple-300 text-gray-900">
                <SelectValue placeholder="Region ▾" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="northeast">Northeast</SelectItem>
                <SelectItem value="southeast">Southeast</SelectItem>
                <SelectItem value="midwest">Midwest</SelectItem>
                <SelectItem value="west">West</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="w-40 bg-white border-purple-300 text-gray-900">
                <SelectValue placeholder="Company Size ▾" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="small">1-50</SelectItem>
                <SelectItem value="medium">51-500</SelectItem>
                <SelectItem value="large">500+</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="w-40 bg-white border-purple-300 text-gray-900">
                <SelectValue placeholder="Intent Type ▾" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hiring">Hiring</SelectItem>
                <SelectItem value="compliance">Compliance</SelectItem>
                <SelectItem value="migration">Migration</SelectItem>
                <SelectItem value="cost">Cost Optimization</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-500" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for company or keyword..."
                  className="pl-10 bg-white border-purple-300 text-gray-900 placeholder:text-purple-400/60"
                />
              </div>
            </div>

            <Button
              onClick={handleGenerateLeads}
              disabled={isGenerating}
              className={`ml-auto ${
                isGenerating
                  ? 'bg-blue-500'
                  : 'bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600'
              } text-white border-0 relative overflow-hidden`}
            >
              {isGenerating ? (
                <>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                  />
                  <Sparkles className="mr-2 h-4 w-4" />
                  Scanning intent data...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generate New Leads
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto bg-gradient-to-b from-white to-purple-50 p-6">
          <div className="space-y-6">
            {/* Smart Prospect Finder Table */}
            <div className="bg-white rounded-xl border border-purple-200 overflow-hidden shadow-lg">
              <Table>
                <TableHeader>
                  <TableRow className="border-purple-200 bg-gradient-to-r from-purple-100 to-transparent hover:bg-gradient-to-r">
                    <TableHead className="text-purple-900">Company</TableHead>
                    <TableHead className="text-purple-900">Industry</TableHead>
                    <TableHead className="text-purple-900">Signal Type</TableHead>
                    <TableHead className="text-purple-900">Source</TableHead>
                    <TableHead className="text-purple-900">Fit Score</TableHead>
                    <TableHead className="text-purple-900">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {prospects.map((prospect) => (
                    <React.Fragment key={prospect.id}>
                      <TableRow
                        className="border-purple-200 hover:bg-purple-50 hover:shadow-[0_0_15px_rgba(168,85,247,0.2)] transition-all cursor-pointer"
                        onClick={() => {
                          if (onLeadClick) {
                            onLeadClick({
                              id: parseInt(prospect.id),
                              company: prospect.company,
                              industry: prospect.industry,
                              signalType: prospect.signalType,
                              source: prospect.source,
                              fitScore: prospect.fitScore,
                            });
                          }
                        }}
                      >
                        <TableCell className="text-gray-900">
                          {prospect.company}
                        </TableCell>
                        <TableCell className="text-gray-700">
                          {prospect.industry}
                        </TableCell>
                        <TableCell className="text-gray-700">
                          {prospect.signalType}
                        </TableCell>
                        <TableCell className="text-purple-600">
                          {prospect.source}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span className="text-gray-900">
                              {prospect.fitScore.toFixed(2)}
                            </span>
                            {prospect.fitScore > 0.75 && (
                              <Flame className="w-4 h-4 text-orange-500" />
                            )}
                            <span className="text-purple-600/60 text-xs">
                              ± 0.04
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Button
                            size="sm"
                            onClick={() => handleExpandContacts(prospect.id)}
                            className="bg-transparent border border-blue-400 text-blue-400 hover:bg-blue-400/20 h-8"
                          >
                            <ArrowRight className="w-4 h-4 mr-1" />
                            {prospect.expanded ? 'Hide' : 'Generate'} Contacts
                          </Button>
                        </TableCell>
                      </TableRow>

                      {/* Contact Enrichment Drawer */}
                      <AnimatePresence>
                        {prospect.expanded && (
                          <TableRow className="border-purple-200">
                            <TableCell colSpan={6} className="p-0">
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="bg-gradient-to-b from-purple-50 to-white p-6 overflow-hidden"
                              >
                                <div className="mb-4 flex items-center justify-between">
                                  <h3 className="text-gray-900">
                                    Enriched Contacts for {prospect.company}
                                  </h3>
                                  <div className="flex items-center gap-2 text-purple-600 text-sm">
                                    <motion.div
                                      className="w-2 h-2 rounded-full bg-blue-400"
                                      animate={{
                                        boxShadow: [
                                          '0 0 4px rgba(59, 130, 246, 0.5)',
                                          '0 0 8px rgba(59, 130, 246, 0.8)',
                                          '0 0 4px rgba(59, 130, 246, 0.5)',
                                        ],
                                      }}
                                      transition={{ duration: 2, repeat: Infinity }}
                                    />
                                    <span>AI-Generated</span>
                                  </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                  {mockContacts[prospect.id as keyof typeof mockContacts]?.map(
                                    (contact) => (
                                      <ContactCard key={contact.email} {...contact} />
                                    )
                                  )}
                                </div>
                              </motion.div>
                            </TableCell>
                          </TableRow>
                        )}
                      </AnimatePresence>
                    </React.Fragment>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Lead Clustering Map */}
            <div className="bg-white rounded-xl border border-purple-200 p-6 shadow-lg">
              <div className="mb-4">
                <h3 className="text-gray-900 mb-1">
                  Lead Clustering Map
                </h3>
                <p className="text-purple-700 text-sm">
                  Geographic distribution of discovered prospects
                </p>
              </div>
              <div className="h-96 rounded-lg bg-purple-50 border border-purple-200">
                <LeadClusterMap />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Insights Panel */}
      <AIInsightsPanel />

      {/* Undo Chip */}
      <AnimatePresence>
        {lastAction && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-8 right-8 bg-purple-600 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3"
          >
            <span className="text-sm">{lastAction}</span>
            <Button
              size="sm"
              onClick={handleUndo}
              className="bg-white/20 hover:bg-white/30 text-white h-7 border-0"
            >
              <Undo2 className="w-4 h-4 mr-1" />
              Undo
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
