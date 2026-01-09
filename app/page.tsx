'use client';

import React, { useState, useEffect } from 'react';
import { 
  FiShield, FiAlertTriangle, FiCheckCircle, 
  FiDownload, FiCopy, FiLink, FiMessageSquare, 
  FiUsers, FiLock, FiZap, FiGlobe, FiStar,
  FiCpu, FiDatabase, FiBell, FiMenu, FiX,
  FiPlay, FiExternalLink, FiCode
} from 'react-icons/fi';
import { 
  MdPhoneIphone, MdAndroid, MdQrCode2,
  MdSecurity, MdVerifiedUser, MdSpeed
} from 'react-icons/md';
import { FaApple, FaGooglePlay, FaBitcoin } from 'react-icons/fa';
import { SiAppstore, SiGoogleplay } from 'react-icons/si';
import Image from 'next/image';
import { motion } from 'framer-motion';

// Centralized Download Links Configuration
const DOWNLOAD_LINKS = {
  android: {
    expo: 'https://expo.dev/accounts/chijioke2007/projects/ganiumai/builds/661d4051-c58b-4576-96e0-e593e8abed17',
    googlePlay: 'https://play.google.com/store/apps/details?id=com.ganium.app',
  },
  ios: {
    appStore: 'https://apps.apple.com/app/ganium-scam-protection/id1234567890',
  },
  qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://expo.dev/accounts/chijioke2007/projects/ganiumai/builds/661d4051-c58b-4576-96e0-e593e8abed17'
} as const;

export default function HomePage() {
  const [scansCount, setScansCount] = useState(0);
  const [protectedUsers, setProtectedUsers] = useState(0);
  const [detectedScams, setDetectedScams] = useState(0);
  const [activeTab, setActiveTab] = useState<'android'>('android');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animated counters
  useEffect(() => {
    const targets = { scans: 30, users: 10, scams: 30 };
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = Math.min(step / steps, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);

      setScansCount(Math.round(targets.scans * easeProgress));
      setProtectedUsers(Math.round(targets.users * easeProgress));
      setDetectedScams(Math.round(targets.scams * easeProgress));

      if (step === steps) clearInterval(timer);
    }, interval);

    return () => clearInterval(timer);
  }, []);

  // Features data with screenshots
  const features = [
    {
      id: 'message',
      title: "Message Scanner",
      description: "Copy and paste suspicious messages to check for scam patterns, phishing attempts, or fraudulent content.",
      detailedDescription: "Our AI analyzes text messages in real-time to detect common scam patterns, phishing attempts, and fraudulent content. Simply copy any suspicious message and Ganium will instantly tell you if it's safe or potentially dangerous.",
      icon: FiMessageSquare,
      color: "from-blue-500 to-cyan-500",
      screenshot: "/text.png",
      keyFeatures: [
        "Detect phishing attempts in SMS & emails",
        "Identify fraudulent investment offers",
        "Spot fake job recruitment scams",
        "Analyze social engineering patterns",
        "Check for urgent action demands",
        "Verify sender authenticity"
      ]
    },
    {
      id: 'link',
      title: "Link Security Check",
      description: "Verify URLs and links for phishing attempts, malware distribution, or suspicious redirects.",
      detailedDescription: "Paste any link to instantly check if it's safe. Our database cross-references millions of known phishing URLs and analyzes website structure to protect you from malicious sites.",
      icon: FiLink,
      color: "from-purple-500 to-pink-500",
      screenshot: "/url.png",
      keyFeatures: [
        "Verify website legitimacy instantly",
        "Detect phishing websites",
        "Check for malware distribution",
        "Analyze SSL certificates",
        "Identify suspicious redirects",
        "Check domain registration history"
      ]
    },
    {
      id: 'wallet',
      title: "Wallet Address Validator",
      description: "Scan crypto wallet addresses or QR codes to verify legitimacy and check for fraud history.",
      detailedDescription: "Validate any cryptocurrency wallet address before making transactions. Our system checks against reported fraudulent addresses and analyzes transaction patterns to keep your crypto safe.",
      icon: FaBitcoin,
      color: "from-orange-500 to-yellow-500",
      screenshot: "/wallet.png",
      keyFeatures: [
        "Scan crypto wallet addresses",
        "QR code support for easy scanning",
        "Check fraud history database",
        "Verify transaction patterns",
        "Monitor blacklisted addresses",
        "Support for multiple cryptocurrencies"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-gray-900/95 backdrop-blur-xl shadow-2xl border-b border-gray-800 py-3' 
          : 'bg-transparent py-4'
      }`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
                <Image 
                  src={'/logo.png'} 
                  width={44} 
                  height={44} 
                  alt='Ganium logo' 
                  className='rounded-[10px]'
                  priority
                />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Ganium AI
              </span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-10">
              {['Features', 'How It Works', 'Download', 'Contact'].map((item) => (
                <a 
                  key={item}
                  href={`#${item.toLowerCase().replace(' ', '-')}`} 
                  className="text-gray-300 hover:text-white font-medium transition-all hover:scale-105 relative group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 group-hover:w-full transition-all duration-300"></span>
                </a>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              <a 
                href="#download" 
                className="hidden sm:inline-flex items-center bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-3 rounded-xl font-medium hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
              >
                <FiDownload className="w-4 h-4 mr-2" />
                Download App
              </a>
              
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-gray-800 transition-colors"
              >
                {isMenuOpen ? <FiX className="w-6 h-6 text-white" /> : <FiMenu className="w-6 h-6 text-white" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden absolute top-full left-0 right-0 bg-gray-900/95 backdrop-blur-xl border-t border-gray-800 shadow-2xl rounded-b-2xl p-6">
              <div className="flex flex-col space-y-4">
                {['Features', 'How It Works', 'Download', 'Contact'].map((item) => (
                  <a 
                    key={item}
                    href={`#${item.toLowerCase().replace(' ', '-')}`} 
                    className="text-gray-300 hover:text-white font-medium py-2 px-4 rounded-lg hover:bg-gray-800 transition-all"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item}
                  </a>
                ))}
                <a 
                  href="#download" 
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-3 rounded-xl font-medium text-center mt-4"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Download Now
                </a>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section with Video */}
      <section className="pt-32 pb-20 px-4 sm:px-6">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-gray-800 to-gray-900 rounded-full border border-gray-700 shadow-lg">
                <FiShield className="w-5 h-5 text-cyan-400 mr-2 animate-pulse" />
                <span className="text-sm font-semibold text-cyan-300">
                  AI-Powered Security Scanner
                </span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
                Scan Messages,
                <span className="block bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  Links & Wallets
                </span>
              </h1>
              
              <p className="text-lg sm:text-xl text-gray-300 leading-relaxed max-w-2xl">
                Ganium uses advanced AI to detect scams in messages, phishing links, and fraudulent wallet addresses. 
                Protect yourself in real-time with our comprehensive security scanner.
              </p>
              
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href={DOWNLOAD_LINKS.android.expo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 flex items-center justify-center"
                  >
                    <FaGooglePlay className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform" />
                    <div className="text-left">
                      <div className="text-xs opacity-90">GET IT ON</div>
                      <div className="text-lg">Expo (Android)</div>
                    </div>
                  </a>
                </div>
                
                <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-gray-400">
                  {[
                    { label: 'Real-time Scanning', icon: FiZap },
                    { label: '99% Accuracy', icon: FiCheckCircle },
                    { label: 'No Data Storage', icon: FiLock },
                    { label: 'Instant Results', icon: FiCpu }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <item.icon className="w-5 h-5 text-cyan-400" />
                      <span className="text-sm font-medium whitespace-nowrap">
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* App Video Preview */}
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-700">
                <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 relative">
                  {/* Video Placeholder */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center p-8">
  <div className="mx-auto max-w-md aspect-[9/16] rounded-2xl overflow-hidden shadow-lg">
    <video
      src="/app-demo.mp4"
      controls
      playsInline
      preload="metadata"
      className="w-full h-full object-cover"
    />
  </div>
</div>

                  </div>
                </div>
              </div>
              
              {/* Floating Stats */}
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-gray-800 to-gray-900 text-white px-6 py-3 rounded-full shadow-xl flex items-center space-x-6 border border-gray-700">
                <div className="text-center">
                  <div className="text-lg font-bold text-cyan-400">30+</div>
                  <div className="text-xs text-gray-400">Scans</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-green-400">98%</div>
                  <div className="text-xs text-gray-400">Accuracy</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-yellow-400">10+</div>
                  <div className="text-xs text-gray-400">Users</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Screenshots Only */}
      <section id="features" className="py-20 px-4 sm:px-6">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Three Ways to Stay Protected
            </h2>
            <p className="text-lg sm:text-xl text-gray-400">
              Our AI-powered scanner detects threats across multiple platforms
            </p>
          </div>
          
          <div className="space-y-24">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              const isReversed = index % 2 === 1;
              
              return (
                <motion.div 
                  key={feature.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`grid lg:grid-cols-2 gap-12 items-center ${isReversed ? 'lg:grid-flow-dense' : ''}`}
                >
                  {/* Feature Content */}
                  <div className={`space-y-6 ${isReversed ? 'lg:col-start-2' : ''}`}>
                    <div className="flex items-center space-x-3">
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center shadow-lg`}>
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-white">
                        {feature.title}
                      </h3>
                    </div>
                    
                    <p className="text-gray-300 text-lg leading-relaxed">
                      {feature.detailedDescription}
                    </p>
                    
                    {/* Key Features List */}
                    <div className="space-y-3 pt-4">
                      <h4 className="font-bold text-white text-lg">Key Features:</h4>
                      <ul className="space-y-2">
                        {feature.keyFeatures.map((item, i) => (
                          <li key={i} className="flex items-start text-gray-300">
                            <div className="w-2 h-2 bg-cyan-500 rounded-full mt-2 mr-3"></div>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  {/* Screenshot Section */}
                  <div className={`relative ${isReversed ? 'lg:col-start-1' : ''}`}>
                    <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-700 group">
                      {/* Screenshot Container */}
                      <div className="relative aspect-[9/16] bg-gradient-to-br from-gray-800 to-gray-900">
                        {/* Actual Screenshot */}
                      <div className="relative w-full max-w-sm aspect-[9/16] mx-auto">
  <Image
    src={feature.screenshot}
    alt={`${feature.title} Screenshot`}
    fill
    className="object-contain rounded-xl"
    sizes="(max-width: 768px) 80vw, 320px"
  />
</div>

                        
                        {/* Screenshot Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="absolute bottom-0 left-0 right-0 p-6">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-white font-bold">{feature.title}</p>
                                <p className="text-gray-300 text-sm">Mobile Interface</p>
                              </div>
                              <div className="px-3 py-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg text-sm font-medium">
                                Live Preview
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Decorative Elements */}
                    <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-xl"></div>
                    <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-xl"></div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 bg-gradient-to-b from-gray-900 to-gray-950">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              How Ganium Works
            </h2>
            <p className="text-lg sm:text-xl text-gray-400">
              Simple steps for maximum protection
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Copy & Paste",
                description: "Copy suspicious content and paste it into our scanner",
                icon: FiCopy,
                color: "from-blue-500 to-cyan-500"
              },
              {
                step: "2",
                title: "AI Analysis",
                description: "Our AI instantly analyzes patterns and compares with threat databases",
                icon: FiCpu,
                color: "from-purple-500 to-pink-500"
              },
              {
                step: "3",
                title: "Get Results",
                description: "Receive detailed reports with confidence scores and recommendations",
                icon: FiCheckCircle,
                color: "from-green-500 to-emerald-500"
              }
            ].map((step, index) => (
              <div key={index} className="text-center relative group">
                <div className="relative mb-8">
                  <div className={`w-24 h-24 mx-auto rounded-2xl bg-gradient-to-r ${step.color} flex items-center justify-center text-white text-2xl font-bold shadow-2xl group-hover:scale-110 transition-transform duration-300`}>
                    {step.step}
                  </div>
                  <div className="w-20 h-20 mx-auto -mt-10 bg-gray-900 rounded-2xl flex items-center justify-center border-4 border-gray-900 shadow-lg">
                    <step.icon className="w-10 h-10 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-400 max-w-xs mx-auto">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <div className="py-16 bg-gradient-to-r from-gray-800 to-gray-900">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { value: scansCount.toLocaleString(), label: 'Scans Completed', icon: FiCpu },
              { value: protectedUsers.toLocaleString(), label: 'Protected Users', icon: FiUsers },
              { value: detectedScams.toLocaleString(), label: 'Scams Detected', icon: FiShield }
            ].map((stat, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="text-4xl lg:text-5xl font-bold mb-3 font-mono text-white">
                  {stat.value}
                  <span className="text-cyan-400 ml-1">+</span>
                </div>
                <p className="text-gray-300 flex items-center justify-center space-x-2">
                  <stat.icon className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
                  <span>{stat.label}</span>
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Download Section */}
      <section id="download" className="py-20 px-4 sm:px-6">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                Download Ganium Now
              </h2>
              <p className="text-lg text-gray-300 mb-8">
                Available for Android with all features included. Start protecting yourself today.
              </p>
              
              {/* Platform Info */}
              <div className="mb-8">
                <div className="flex space-x-4 mb-6">
                  <button
                    onClick={() => setActiveTab('android')}
                    className={`flex items-center space-x-3 px-6 py-3 rounded-xl font-semibold transition-all ${
                      activeTab === 'android'
                        ? 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-400 border-2 border-green-500/30 shadow-lg'
                        : 'text-gray-500 hover:text-gray-300 hover:bg-gray-800'
                    }`}
                  >
                    <MdAndroid className="w-6 h-6" />
                    <span>Android</span>
                  </button>
                </div>
                
                {/* Requirements */}
                <div className="space-y-4 bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700">
                  <h4 className="font-bold text-white text-lg mb-4">
                    System Requirements:
                  </h4>
                  <ul className="space-y-3 text-gray-300">
                    {['Android 8.0 or later', '120MB free space', 'Internet connection for scanning', 'Camera for QR scanning'].map((item, i) => (
                      <li key={i} className="flex items-center">
                        <div className="w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center mr-3">
                          <FiCheckCircle className="w-4 h-4 text-green-400" />
                        </div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              {/* Download Buttons */}
              <div className="space-y-4 mb-8">
                <a
                  href={DOWNLOAD_LINKS.android.expo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center w-full px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold text-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 justify-center"
                >
                  <SiGoogleplay className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform" />
                  <div className="text-left">
                    <div className="text-xs opacity-90">GET IT ON</div>
                    <div className="text-lg">Expo</div>
                  </div>
                </a>
              </div>
              
              {/* QR Code */}
              <div className="flex items-start space-x-6 bg-gradient-to-r from-gray-800 to-gray-900 p-6 rounded-2xl border border-gray-700">
                <div className="w-32 h-32 bg-white p-3 rounded-xl shadow-lg">
                  <Image
                    src={DOWNLOAD_LINKS.qrCode}
                    alt="QR Code for download"
                    width={128}
                    height={128}
                    className="w-full h-full"
                  />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-white text-lg mb-2">Scan to Download</p>
                  <p className="text-gray-400 text-sm">
                    Open your phone's camera and point it at the QR code to download Ganium directly to your Android device.
                  </p>
                </div>
              </div>
            </div>
            
            {/* App Features Summary */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white mb-6">
                Why Choose Ganium
              </h3>
              
              {[
                {
                  title: "AI-Powered Detection",
                  description: "Advanced machine learning algorithms that continuously learn and improve scam detection accuracy.",
                  icon: FiCpu
                },
                {
                  title: "Real-time Protection",
                  description: "Instant scanning and results without slowing down your device or compromising privacy.",
                  icon: FiZap
                },
                {
                  title: "Privacy First",
                  description: "All scanning happens locally on your device. We don't store or share your data.",
                  icon: FiLock
                }
              ].map((feature, index) => (
                <div key={index} className="bg-gradient-to-r from-gray-800/50 to-gray-900/30 rounded-2xl p-6 border border-gray-700 hover:border-gray-600 transition-colors">
                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0`}>
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-lg mb-2">{feature.title}</h4>
                      <p className="text-gray-300 text-sm">{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 sm:px-6 bg-gradient-to-r from-blue-500/10 via-cyan-500/10 to-blue-500/10">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Start Protecting Yourself Today
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join 500,000+ users who trust Ganium to keep them safe from scams, phishing, and fraud.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={DOWNLOAD_LINKS.android.expo}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 flex items-center justify-center"
              >
                <FaGooglePlay className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform" />
                Download for Android
              </a>
            </div>
            <p className="text-gray-400 text-sm mt-6">
              Free • No account required • Privacy-first • Real-time protection
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-b from-gray-900 to-black pt-12 pb-8 px-4 sm:px-6 border-t border-gray-800">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
                  <FiShield className="w-7 h-7 text-white" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  Ganium AI
                </span>
              </div>
              <p className="text-gray-400 max-w-md">
                Advanced AI-powered security scanner for messages, links, and wallet addresses. 
                Protecting users from digital threats since 2023.
              </p>
            </div>
            
            {[
              {
                title: 'Product',
                links: ['Features', 'Screenshots', 'Download', 'API', 'Pricing']
              },
              {
                title: 'Resources',
                links: ['Blog', 'Documentation', 'Support', 'FAQ', 'Community']
              },
              {
                title: 'Legal',
                links: ['Privacy Policy', 'Terms of Service', 'Security', 'Compliance', 'Report Abuse']
              }
            ].map((column, index) => (
              <div key={index}>
                <h4 className="font-bold text-white text-lg mb-6">{column.title}</h4>
                <ul className="space-y-3">
                  {column.links.map((link) => (
                    <li key={link}>
                      <a 
                        href="#" 
                        className="text-gray-400 hover:text-cyan-400 transition-colors hover:translate-x-1 inline-block"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-500 text-sm">
                &copy; {new Date().getFullYear()} Ganium AI Security. All rights reserved.
              </p>
              <div className="flex items-center space-x-6 mt-4 md:mt-0">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <FiGlobe className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <FiExternalLink className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <FiCode className="w-5 h-5" />
                </a>
              </div>
            </div>
            <p className="text-center text-gray-500 text-xs mt-6">
              Detecting scams in 50+ languages. Updated daily with new threat patterns.
            </p>
          </div>
        </div>
      </footer>

      {/* Floating Action Button */}
      <a
        href="#download"
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform z-40"
      >
        <FiDownload className="w-6 h-6" />
      </a>
    </div>
  );
}