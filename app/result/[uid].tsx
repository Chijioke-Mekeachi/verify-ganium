import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Share2, 
  Download, 
  Shield, 
  AlertTriangle,
  RefreshCw,
  FileText,
  Activity,
  Check,
  Fish,
  Bug,
  Clock,
  Type,
  Eye,
  Key,
  Link as LinkIcon,
  Mail,
  Lightbulb,
  AlertCircle,
  CheckCircle,
  Flame
} from 'lucide-react';
import CopyToClipboard from 'react-copy-to-clipboard';
import RiskScore from '../../components/RiskScore';
import PrimaryButton from '../../components/PrimaryButton';
import { ScanResult, ThreatIndicator, ClassificationIcon } from '../../types';
import { getShareLink } from '../../utils/share';

export default function ResultPage() {
  const router = useRouter();
  const { uid } = router.query;
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDark(prefersDark);
    
    if (uid) {
      fetchResult(uid as string);
    }
  }, [uid]);

  const fetchResult = async (resultId: string) => {
    try {
      const response = await fetch(`/api/result?uid=${resultId}`);
      if (response.ok) {
        const data = await response.json();
        setScanResult(data);
      } else {
        console.error('Failed to fetch result');
      }
    } catch (error) {
      console.error('Error fetching result:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getClassificationIcon = (classification: string): ClassificationIcon => {
    const classificationLower = classification.toLowerCase();
    if (classificationLower.includes('scam')) return { icon: 'hand-holding-usd', color: '#FF3B30' };
    if (classificationLower.includes('phishing')) return { icon: 'fish', color: '#FF9500' };
    if (classificationLower.includes('malware')) return { icon: 'bug', color: '#5856D6' };
    if (classificationLower.includes('spam')) return { icon: 'mail', color: '#8E8E93' };
    return { icon: 'shield', color: '#667eea' };
  };

  const getContentTypeIcon = (type: string) => {
    switch (type) {
      case 'text': return <Type className="w-4 h-4" />;
      case 'url': return <LinkIcon className="w-4 h-4" />;
      case 'email': return <Mail className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const getIndicatorIcon = (icon: string) => {
    switch (icon) {
      case 'fish': return <Fish className="w-5 h-5" />;
      case 'bug': return <Bug className="w-5 h-5" />;
      case 'clock': return <Clock className="w-5 h-5" />;
      case 'type': return <Type className="w-5 h-5" />;
      case 'eye': return <Eye className="w-5 h-5" />;
      case 'key': return <Key className="w-5 h-5" />;
      default: return <AlertCircle className="w-5 h-5" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#667eea] to-[#764ba2]">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  if (!scanResult) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#667eea] to-[#764ba2]">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-2xl">
            <div className="text-center">
              <Search className="w-20 h-20 mx-auto text-gray-400 mb-6" />
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                No Scan Results
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                Scan content to see AI-powered security analysis
              </p>
              <PrimaryButton
                onClick={() => router.push('/')}
                gradient={isDark ? ['#667eea', '#764ba2'] : ['#4A90E2', '#357ABD']}
              >
                <Shield className="w-5 h-5" />
                Scan Content
              </PrimaryButton>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const classificationIcon = getClassificationIcon(scanResult.classification);
  const shareLink = getShareLink(uid as string);

  return (
    <>
      <Head>
        <title>Security Analysis Result | Ganium Verify</title>
        <meta name="description" content="AI-powered security analysis result" />
      </Head>

      <div className={`min-h-screen ${isDark ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
        {/* Header */}
        <motion.header 
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          className="gradient-bg text-white"
        >
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <button
                onClick={() => router.back()}
                className="p-2 hover:bg-white/20 rounded-full transition-colors"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              
              <h1 className="text-2xl font-bold">Security Analysis</h1>
              
              <CopyToClipboard text={shareLink} onCopy={handleCopy}>
                <button className="p-2 hover:bg-white/20 rounded-full transition-colors relative">
                  <Share2 className="w-6 h-6" />
                  {copied && (
                    <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white px-2 py-1 rounded text-sm whitespace-nowrap">
                      Link copied!
                    </span>
                  )}
                </button>
              </CopyToClipboard>
            </div>
            
            <div className="mt-4 flex items-center justify-center gap-2">
              <div className="px-3 py-1 bg-white/20 rounded-full text-sm font-semibold">
                AI-Powered Threat Detection
              </div>
            </div>
          </div>
        </motion.header>

        <main className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Risk Score Card */}
            <RiskScore riskScore={scanResult.riskScore} />

            {/* Threat Indicators */}
            {scanResult.threatIndicators.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-xl"
              >
                <div className="flex items-center gap-3 mb-6">
                  <AlertTriangle className="w-6 h-6 text-orange-500" />
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                    Threat Indicators
                  </h2>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {scanResult.threatIndicators.map((indicator, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-4 rounded-xl"
                      style={{ backgroundColor: `${indicator.color}10` }}
                    >
                      <div 
                        className="p-2 rounded-lg"
                        style={{ backgroundColor: `${indicator.color}20` }}
                      >
                        {getIndicatorIcon(indicator.icon)}
                      </div>
                      <span className="font-semibold text-gray-800 dark:text-white">
                        {indicator.label}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Classification Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-xl"
            >
              <div className="flex items-center gap-3 mb-6">
                <Shield className="w-6 h-6" style={{ color: classificationIcon.color }} />
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                  Classification
                </h2>
              </div>
              
              <div 
                className="rounded-2xl p-6"
                style={{ backgroundColor: `${classificationIcon.color}10` }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div 
                      className="p-4 rounded-xl"
                      style={{ backgroundColor: `${classificationIcon.color}20` }}
                    >
                      {classificationIcon.icon === 'fish' && <Fish className="w-8 h-8" style={{ color: classificationIcon.color }} />}
                      {classificationIcon.icon === 'bug' && <Bug className="w-8 h-8" style={{ color: classificationIcon.color }} />}
                      {classificationIcon.icon === 'shield' && <Shield className="w-8 h-8" style={{ color: classificationIcon.color }} />}
                      {classificationIcon.icon === 'mail' && <Mail className="w-8 h-8" style={{ color: classificationIcon.color }} />}
                    </div>
                    <div>
                      <h3 
                        className="text-2xl font-bold"
                        style={{ color: classificationIcon.color }}
                      >
                        {scanResult.classification.toUpperCase()}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mt-1">
                        AI-classified threat category
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-black/20 rounded-full">
                    <Activity className="w-4 h-4 text-green-500" />
                    <span className="font-semibold text-gray-800 dark:text-white">
                      {Math.min(95, scanResult.riskScore + 20)}% confidence
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Analysis Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-xl"
            >
              <div className="flex items-center gap-3 mb-6">
                <Activity className="w-6 h-6 text-blue-500" />
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                  AI Analysis
                </h2>
              </div>
              
              <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-6">
                {scanResult.explanation}
              </p>
              
              <div className="flex items-center justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full gradient-bg flex items-center justify-center">
                    <Shield className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Ganium AI Engine
                  </span>
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Just now
                </span>
              </div>
            </motion.div>

            {/* Recommendations Card */}
            {scanResult.recommendations && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-xl"
              >
                <div className="flex items-center gap-3 mb-6">
                  <Lightbulb className="w-6 h-6 text-green-500" />
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                    Recommendations
                  </h2>
                </div>
                
                <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                  {scanResult.recommendations}
                </p>
              </motion.div>
            )}

            {/* Content Preview Card */}
            {scanResult.content && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-xl"
              >
                <div className="flex items-center gap-3 mb-6">
                  <FileText className="w-6 h-6 text-indigo-500" />
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                    Content Preview
                  </h2>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 mb-4">
                  <p className="text-gray-700 dark:text-gray-300">
                    {scanResult.content.length > 150 
                      ? `${scanResult.content.substring(0, 150)}...`
                      : scanResult.content}
                  </p>
                </div>
                
                <div className="flex items-center gap-2 px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full w-fit">
                  {getContentTypeIcon(scanResult.contentType)}
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {scanResult.contentType.toUpperCase()}
                  </span>
                </div>
              </motion.div>
            )}

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <PrimaryButton
                onClick={() => router.push('/')}
                variant="outline"
                className="flex-1"
              >
                <RefreshCw className="w-5 h-5" />
                New Scan
              </PrimaryButton>
              
              <PrimaryButton
                onClick={() => {
                  // Export functionality
                  const dataStr = JSON.stringify(scanResult, null, 2);
                  const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
                  const exportFileDefaultName = `scan-result-${uid}.json`;
                  
                  const linkElement = document.createElement('a');
                  linkElement.setAttribute('href', dataUri);
                  linkElement.setAttribute('download', exportFileDefaultName);
                  linkElement.click();
                }}
                gradient={isDark ? ['#667eea', '#764ba2'] : ['#4A90E2', '#357ABD']}
                className="flex-1"
              >
                <Download className="w-5 h-5" />
                Save Report
              </PrimaryButton>
            </motion.div>

            {/* Security Tips */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-xl"
            >
              <div className="flex items-center gap-3 mb-6">
                <Shield className="w-6 h-6 text-blue-500" />
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                  Security Tips
                </h2>
              </div>
              
              <div className="space-y-4">
                {[
                  'Never share personal information via suspicious links',
                  'Verify sender authenticity before responding',
                  'Use two-factor authentication for important accounts',
                  'Keep security software updated'
                ].map((tip, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0 mt-1">
                      <Check className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">{tip}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </>
  );
}