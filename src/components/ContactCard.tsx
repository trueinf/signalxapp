import { motion } from 'motion/react';
import { User, Mail, Linkedin } from 'lucide-react';
import { Button } from './ui/button';

interface ContactCardProps {
  name: string;
  role: string;
  company: string;
  email: string;
  confidence: number;
  linkedinUrl: string;
}

export function ContactCard({
  name,
  role,
  company,
  email,
  confidence,
  linkedinUrl,
}: ContactCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white backdrop-blur-sm rounded-lg p-5 border border-purple-200 hover:border-purple-400 transition-all group shadow-md hover:shadow-xl"
      whileHover={{ 
        boxShadow: '0 0 20px rgba(168, 85, 247, 0.3)',
      }}
    >
      {/* Header */}
      <div className="flex items-start gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center flex-shrink-0">
          <User className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-gray-900 truncate">{name}</h3>
          <p className="text-purple-700 text-sm truncate">{role}</p>
          <p className="text-purple-600/70 text-xs truncate">{company}</p>
        </div>
      </div>

      {/* Contact Info */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2">
          <Mail className="w-4 h-4 text-purple-400 flex-shrink-0" />
          <span className="text-purple-200 text-sm truncate">{email}</span>
          <span className="text-blue-400 text-xs ml-auto flex-shrink-0">
            {confidence}%
          </span>
        </div>
        <a
          href={linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors text-sm"
        >
          <Linkedin className="w-4 h-4 flex-shrink-0" />
          <span className="truncate">View LinkedIn</span>
        </a>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <Button
          size="sm"
          className="flex-1 bg-purple-500/20 hover:bg-purple-500/30 text-purple-200 border border-purple-500/30 h-8 text-xs"
        >
          Add to CRM
        </Button>
        <Button
          size="sm"
          className="flex-1 bg-blue-500/20 hover:bg-blue-500/30 text-blue-200 border border-blue-500/30 h-8 text-xs"
        >
          Start Outreach
        </Button>
      </div>
    </motion.div>
  );
}
