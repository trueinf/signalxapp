import { useState } from 'react';
import { motion } from 'motion/react';
import { AnimatedBackground } from './components/AnimatedBackground';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Label } from './components/ui/label';
import { Loader2, Sparkles } from 'lucide-react';
import { Sidebar } from './components/Sidebar';
import { LeadGeneration } from './components/LeadGeneration';
import { LeadDetails } from './components/LeadDetails';
import { Renewals } from './components/Renewals';
import { UnmanagedAccounts } from './components/UnmanagedAccounts';
import { GrowthAtScale } from './components/GrowthAtScale';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeView, setActiveView] = useState('lead-generation');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show2FA, setShow2FA] = useState(false);
  const [twoFactorCode, setTwoFactorCode] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [error, setError] = useState('');
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [selectedLead, setSelectedLead] = useState<{
    id: number;
    company: string;
    industry: string;
    signalType: string;
    source: string;
    fitScore: number;
  } | null>(null);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsAuthenticating(true);

    // Simulate authentication
    setTimeout(() => {
      setIsAuthenticating(false);
      // Successfully log in
      setIsLoggedIn(true);
    }, 2000);
  };

  // If logged in, show dashboard
  if (isLoggedIn) {
    return (
      <div className="flex h-screen overflow-hidden bg-gradient-to-b from-white to-purple-50">
        <Sidebar activeItem={activeView} onNavigate={(view) => {
          setActiveView(view);
          setSelectedLead(null); // Clear selected lead when navigating
        }} />
        {activeView === 'lead-generation' && !selectedLead && (
          <LeadGeneration onLeadClick={setSelectedLead} />
        )}
        {activeView === 'lead-generation' && selectedLead && (
          <LeadDetails lead={selectedLead} onBack={() => setSelectedLead(null)} />
        )}
        {activeView === 'renewals' && (
          <Renewals />
        )}
        {activeView === 'unmanaged-accounts' && (
          <UnmanagedAccounts />
        )}
        {activeView === 'growth' && (
          <GrowthAtScale />
        )}
        {activeView === 'settings' && (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-purple-700">Settings - Coming Soon</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen flex overflow-hidden">
      {/* Left Pane - 60% */}
      <div className="w-3/5 relative hidden lg:block bg-black">
        <AnimatedBackground />
        
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <motion.div
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(59, 130, 246, 0.3)',
                    '0 0 40px rgba(59, 130, 246, 0.5)',
                    '0 0 20px rgba(59, 130, 246, 0.3)',
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center"
              >
                <Sparkles className="w-8 h-8 text-white" />
              </motion.div>
            </div>
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-[#EDEDED] text-5xl mb-2"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              SignalX
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-purple-300 text-xl tracking-wide"
            >
              Assist. Automate. Amplify.
            </motion.p>
          </div>
        </motion.div>
      </div>

      {/* Right Pane - 40% */}
      <div className="w-full lg:w-2/5 flex items-center justify-center bg-gradient-to-br from-white to-purple-50 p-8 relative">
        {/* Mobile logo */}
        <div className="absolute top-8 left-8 lg:hidden">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-[#EDEDED]">SignalX</h2>
              <p className="text-purple-300 text-xs">Digital Sales</p>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {/* Header */}
          <div className="mb-8 text-center lg:text-left">
            <h2 className="text-gray-900 text-3xl mb-2">
              SignalX for Digital Sales
            </h2>
            <p className="text-purple-700">Assist. Automate. Amplify.</p>
          </div>

          {/* Login Card */}
          <div
            className="backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-purple-200"
            style={{
              background: 'rgba(255, 255, 255, 0.8)',
            }}
          >
            <form onSubmit={handleSignIn} className="space-y-6">
              {/* Email Field */}
              <div>
                <Label htmlFor="email" className="text-gray-900 mb-2 block">
                  Email
                </Label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    placeholder={
                      focusedField === 'email' && !email
                        ? 'AI remembers you...'
                        : 'your.email@company.com'
                    }
                    className="w-full bg-white/70 border-purple-300 text-gray-900 placeholder:text-purple-400/60 focus:border-purple-500 transition-all"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <Label htmlFor="password" className="text-gray-900 mb-2 block">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setFocusedField('password')}
                    onBlur={() => setFocusedField(null)}
                    placeholder={
                      focusedField === 'password' && !password
                        ? 'AI remembers you...'
                        : '••••••••'
                    }
                    className="w-full bg-white/70 border-purple-300 text-gray-900 placeholder:text-purple-400/60 focus:border-purple-500 transition-all"
                    required
                  />
                </div>
              </div>

              {/* 2FA Toggle */}
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setShow2FA(!show2FA)}
                  className="text-purple-600 text-sm hover:text-purple-700 transition-colors"
                >
                  {show2FA ? 'Hide' : 'Need'} 2FA Code?
                </button>
                <a
                  href="#"
                  className="text-blue-600 text-sm hover:text-blue-700 underline transition-colors"
                >
                  Forgot Password?
                </a>
              </div>

              {/* 2FA Field */}
              {show2FA && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Label htmlFor="2fa" className="text-gray-900 mb-2 block">
                    2FA Code
                  </Label>
                  <Input
                    id="2fa"
                    type="text"
                    value={twoFactorCode}
                    onChange={(e) => setTwoFactorCode(e.target.value)}
                    placeholder="000000"
                    className="w-full bg-white/70 border-purple-300 text-gray-900 placeholder:text-purple-400/60 focus:border-purple-500 transition-all"
                    maxLength={6}
                  />
                </motion.div>
              )}

              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-lg bg-red-500/10 border border-red-500/30"
                >
                  <p className="text-red-300 text-sm">{error}</p>
                </motion.div>
              )}

              {/* Sign In Button */}
              <Button
                type="submit"
                disabled={isAuthenticating}
                className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white border-0 h-12 relative overflow-hidden group"
              >
                {isAuthenticating ? (
                  <>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      animate={{
                        x: ['-100%', '100%'],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: 'linear',
                      }}
                    />
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Activating Agent Workspace...
                  </>
                ) : (
                  'Sign In'
                )}
              </Button>
            </form>
          </div>

          {/* Footer */}

        </motion.div>
      </div>
    </div>
  );
}
