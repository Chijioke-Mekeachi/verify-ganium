'use client';

import React, { useState, useEffect } from 'react';
import { 
  FiShield, FiAlertTriangle, FiCheckCircle, 
  FiDownload, FiSmartphone, FiMail, FiMessageSquare,
  FiBarChart2, FiUsers, FiLock, FiZap, FiGlobe,
  FiPlay, FiTarget, FiActivity, FiStar, FiAward,
  FiChevronRight
} from 'react-icons/fi';
import { 
  MdSecurity, MdVerifiedUser, MdSpeed, 
  MdOutlineFactCheck, MdPhoneIphone, MdAndroid,
  MdQrCode2
} from 'react-icons/md';
import { FaApple, FaGooglePlay } from 'react-icons/fa';
import { SiAppstore, SiGoogleplay } from 'react-icons/si';

export default function HomePage() {
  const [scansCount, setScansCount] = useState(0);
  const [protectedUsers, setProtectedUsers] = useState(0);
  const [detectedScams, setDetectedScams] = useState(0);
  const [activeTab, setActiveTab] = useState<'ios' | 'android'>('ios');

  // Animated counters
  useEffect(() => {
    const interval = setInterval(() => {
      setScansCount(prev => prev < 1250000 ? prev + 10000 : prev);
      setProtectedUsers(prev => prev < 500000 ? prev + 5000 : prev);
      setDetectedScams(prev => prev < 375000 ? prev + 5000 : prev);
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl flex items-center justify-center">
                <FiShield className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">
                Ganium AI
              </span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-700 hover:text-red-600 font-medium transition-colors">
                Features
              </a>
              <a href="#how-it-works" className="text-gray-700 hover:text-red-600 font-medium transition-colors">
                How It Works
              </a>
              <a href="#download" className="text-gray-700 hover:text-red-600 font-medium transition-colors">
                Download
              </a>
              <a href="#contact" className="text-gray-700 hover:text-red-600 font-medium transition-colors">
                Contact
              </a>
            </div>

            <div className="flex items-center space-x-4">
              <a 
                href="#download" 
                className="bg-gradient-to-r from-red-600 to-orange-500 text-white px-6 py-2 rounded-xl font-medium hover:from-red-700 hover:to-orange-600 transition-all shadow-lg hover:shadow-xl shadow-red-200 flex items-center"
              >
                <FiDownload className="w-4 h-4 mr-2" />
                Get App
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center px-4 py-2 bg-red-50 rounded-full border border-red-100">
                <FiAlertTriangle className="w-4 h-4 text-red-600 mr-2" />
                <span className="text-sm font-medium text-red-700">AI-Powered Scam Detection</span>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Detect Scams
                <span className="block bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">
                  Before They
                </span>
                <span className="block bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">
                  Happen
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed">
                Ganium AI protects you from fraud, phishing, and scams with real-time AI detection. 
                Scan emails, messages, links, and websites instantly - right from your phone.
              </p>
              
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="https://apps.apple.com/app/scanguard"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-black text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-900 transition-all shadow-xl hover:shadow-2xl flex items-center justify-center group"
                  >
                    <FaApple className="w-6 h-6 mr-3" />
                    <div className="text-left">
                      <div className="text-xs">Download on the</div>
                      <div className="text-lg">App Store</div>
                    </div>
                  </a>
                  
                  <a
                    href="https://play.google.com/store/apps/details?id=com.scanguard"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gradient-to-r from-green-600 to-emerald-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-green-700 hover:to-emerald-600 transition-all shadow-xl hover:shadow-2xl flex items-center justify-center group"
                  >
                    <FaGooglePlay className="w-5 h-5 mr-3" />
                    <div className="text-left">
                      <div className="text-xs">GET IT ON</div>
                      <div className="text-lg">Google Play</div>
                    </div>
                  </a>
                </div>
                
                <p className="text-sm text-gray-500">
                  Free download • No credit card required • 14-day free trial
                </p>
              </div>
              
              {/* Stats */}
              <div className="flex items-center space-x-6 pt-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">4.8</div>
                  <div className="flex items-center justify-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <FiStar key={star} className="w-4 h-4 text-yellow-500 fill-current" />
                    ))}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">App Store</div>
                </div>
                
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">4.7</div>
                  <div className="flex items-center justify-center">
                    {[1, 2, 3, 4].map((star) => (
                      <FiStar key={star} className="w-4 h-4 text-yellow-500 fill-current" />
                    ))}
                    <FiStar className="w-4 h-4 text-yellow-500" />
                  </div>
                  <div className="text-sm text-gray-600 mt-1">Google Play</div>
                </div>
                
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">500K+</div>
                  <div className="text-sm text-gray-600 mt-1">Downloads</div>
                </div>
              </div>
            </div>
            
            {/* App Preview */}
            <div className="relative">
              <div className="relative">
                {/* Phone Mockup */}
                <div className="relative mx-auto w-80 h-[600px] bg-gray-900 rounded-[3rem] p-6 shadow-2xl">
                  {/* Phone Notch */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-40 h-6 bg-gray-900 rounded-b-2xl"></div>
                  
                  {/* Screen Content */}
                  <div className="h-full bg-gradient-to-b from-gray-50 to-white rounded-[2.5rem] overflow-hidden">
                    {/* App Header */}
                    <div className="bg-gradient-to-r from-red-600 to-orange-500 p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <FiShield className="w-6 h-6 text-white" />
                          <span className="text-white font-bold">Ganium AI</span>
                        </div>
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      </div>
                      <div className="mt-4">
                        <h3 className="text-white font-bold text-lg">Active Protection</h3>
                        <p className="text-white/80 text-sm">Scanning for threats</p>
                      </div>
                    </div>
                    
                    {/* Quick Actions */}
                    <div className="p-6">
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <button className="bg-gray-100 rounded-xl p-4 hover:bg-gray-200 transition-colors flex flex-col items-center">
                          <FiMail className="w-8 h-8 text-red-600 mb-2" />
                          <span className="text-sm font-medium">Scan Email</span>
                        </button>
                        <button className="bg-gray-100 rounded-xl p-4 hover:bg-gray-200 transition-colors flex flex-col items-center">
                          <FiMessageSquare className="w-8 h-8 text-red-600 mb-2" />
                          <span className="text-sm font-medium">Check SMS</span>
                        </button>
                      </div>
                      
                      {/* Recent Scans */}
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-green-50 rounded-xl">
                          <div className="flex items-center space-x-3">
                            <FiCheckCircle className="w-5 h-5 text-green-600" />
                            <div>
                              <p className="font-medium">amazon.com</p>
                              <p className="text-xs text-gray-600">Safe • Just now</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between p-3 bg-red-50 rounded-xl animate-pulse">
                          <div className="flex items-center space-x-3">
                            <FiAlertTriangle className="w-5 h-5 text-red-600" />
                            <div>
                              <p className="font-medium">paypal-secure.net</p>
                              <p className="text-xs text-gray-600">Phishing • 2 min ago</p>
                            </div>
                          </div>
                          <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full">
                            BLOCKED
                          </span>
                        </div>
                      </div>
                      
                      {/* Scan Button */}
                      <button className="w-full bg-gradient-to-r from-red-600 to-orange-500 text-white py-4 rounded-xl font-bold mt-6 flex items-center justify-center">
                        <FiActivity className="w-5 h-5 mr-2 animate-pulse" />
                        Quick Scan Now
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Floating Elements */}
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-red-100 rounded-2xl -z-10 animate-float"></div>
                <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-orange-100 rounded-2xl -z-10 animate-float" style={{ animationDelay: '1s' }}></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-bold mb-2">
                {scansCount.toLocaleString()}+
              </div>
              <p className="text-gray-300">Scans Completed</p>
            </div>
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-bold mb-2">
                {protectedUsers.toLocaleString()}+
              </div>
              <p className="text-gray-300">Protected Users</p>
            </div>
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-bold mb-2">
                {detectedScams.toLocaleString()}+
              </div>
              <p className="text-gray-300">Scams Detected</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 bg-white">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Ganium AI?
            </h2>
            <p className="text-xl text-gray-600">
              Advanced protection against all types of online scams
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <FiZap className="w-8 h-8" />,
                title: "Real-Time Detection",
                description: "Instant scam detection as you browse, text, or receive emails",
                color: "from-blue-500 to-cyan-500"
              },
              {
                icon: <FiLock className="w-8 h-8" />,
                title: "Privacy First",
                description: "All scans happen on-device. No data sent to servers",
                color: "from-purple-500 to-pink-500"
              },
              {
                icon: <FiTarget className="w-8 h-8" />,
                title: "AI-Powered",
                description: "Advanced machine learning detects new scam patterns",
                color: "from-green-500 to-emerald-500"
              },
              {
                icon: <FiUsers className="w-8 h-8" />,
                title: "Community Reports",
                description: "Leverage reports from millions of users worldwide",
                color: "from-orange-500 to-red-500"
              },
              {
                icon: <MdSpeed className="w-8 h-8" />,
                title: "Lightning Fast",
                description: "Scan links and messages in under 1 second",
                color: "from-yellow-500 to-amber-500"
              },
              {
                icon: <FiGlobe className="w-8 h-8" />,
                title: "Global Database",
                description: "Access to 50M+ known scam URLs and patterns",
                color: "from-indigo-500 to-blue-500"
              }
            ].map((feature, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-8 border border-gray-200 hover:border-red-300 transition-all duration-300 hover:shadow-xl">
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6`}>
                  <div className="text-white">{feature.icon}</div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-6 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How Ganium AI Works
            </h2>
            <p className="text-xl text-gray-600">
              Three simple steps to protect yourself from scams
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Download & Install",
                description: "Get Ganium AI from App Store or Google Play",
                icon: <FiDownload className="w-8 h-8" />
              },
              {
                step: "02",
                title: "Enable Protection",
                description: "Turn on real-time scanning for emails, messages, and browsers",
                icon: <FiShield className="w-8 h-8" />
              },
              {
                step: "03",
                title: "Stay Protected",
                description: "Get instant alerts when scams are detected",
                icon: <FiAlertTriangle className="w-8 h-8" />
              }
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="relative">
                  <div className="w-20 h-20 mx-auto bg-gradient-to-r from-red-600 to-orange-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-6">
                    {step.step}
                  </div>
                  <div className="w-16 h-16 mx-auto -mt-10 bg-white rounded-full flex items-center justify-center border-4 border-white">
                    <div className="text-red-600">{step.icon}</div>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Download Section */}
      <section id="download" className="py-20 px-6 bg-white">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Download Ganium AI Now
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Available for both iOS and Android. Protect your device today.
              </p>
              
              {/* Platform Tabs */}
              <div className="mb-8">
                <div className="flex border-b border-gray-200 mb-6">
                  <button
                    onClick={() => setActiveTab('ios')}
                    className={`flex-1 py-4 font-semibold ${
                      activeTab === 'ios'
                        ? 'text-red-600 border-b-2 border-red-600'
                        : 'text-gray-500'
                    }`}
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <MdPhoneIphone className="w-5 h-5" />
                      <span>iOS</span>
                    </div>
                  </button>
                  <button
                    onClick={() => setActiveTab('android')}
                    className={`flex-1 py-4 font-semibold ${
                      activeTab === 'android'
                        ? 'text-red-600 border-b-2 border-red-600'
                        : 'text-gray-500'
                    }`}
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <MdAndroid className="w-5 h-5" />
                      <span>Android</span>
                    </div>
                  </button>
                </div>
                
                {/* Requirements */}
                <div className="space-y-4">
                  <h4 className="font-bold text-gray-900">Requirements:</h4>
                  {activeTab === 'ios' ? (
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-center">
                        <FiCheckCircle className="w-5 h-5 text-green-500 mr-2" />
                        iOS 14.0 or later
                      </li>
                      <li className="flex items-center">
                        <FiCheckCircle className="w-5 h-5 text-green-500 mr-2" />
                        iPhone, iPad, or iPod touch
                      </li>
                      <li className="flex items-center">
                        <FiCheckCircle className="w-5 h-5 text-green-500 mr-2" />
                        150MB free space
                      </li>
                    </ul>
                  ) : (
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-center">
                        <FiCheckCircle className="w-5 h-5 text-green-500 mr-2" />
                        Android 8.0 or later
                      </li>
                      <li className="flex items-center">
                        <FiCheckCircle className="w-5 h-5 text-green-500 mr-2" />
                        120MB free space
                      </li>
                      <li className="flex items-center">
                        <FiCheckCircle className="w-5 h-5 text-green-500 mr-2" />
                        Works with all major brands
                      </li>
                    </ul>
                  )}
                </div>
              </div>
              
              {/* Download Buttons */}
              <div className="space-y-4">
                <a
                  href="https://apps.apple.com/app/scanguard"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-black text-white px-8 py-4 rounded-xl font-semibold hover:bg-gray-900 transition-all shadow-lg hover:shadow-xl w-full md:w-auto justify-center"
                >
                  <SiAppstore className="w-6 h-6 mr-3" />
                  <div className="text-left">
                    <div className="text-xs">Download on the</div>
                    <div className="text-lg">App Store</div>
                  </div>
                </a>
                
                <a
                  href="https://play.google.com/store/apps/details?id=com.scanguard"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-gradient-to-r from-green-600 to-emerald-500 text-white px-8 py-4 rounded-xl font-semibold hover:from-green-700 hover:to-emerald-600 transition-all shadow-lg hover:shadow-xl w-full md:w-auto justify-center"
                >
                  <SiGoogleplay className="w-5 h-5 mr-3" />
                  <div className="text-left">
                    <div className="text-xs">GET IT ON</div>
                    <div className="text-lg">Google Play</div>
                  </div>
                </a>
              </div>
              
              {/* QR Code */}
              <div className="mt-8 flex items-center space-x-4 bg-gray-50 p-4 rounded-xl">
                <div className="w-24 h-24 bg-white p-2 rounded-lg">
                  {/* QR Code Placeholder */}
                  <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 rounded flex items-center justify-center">
                    <MdQrCode2 className="w-12 h-12 text-gray-600" />
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Scan QR code to download</p>
                  <p className="text-xs text-gray-500 mt-1">Point your phone's camera at the QR code</p>
                </div>
              </div>
            </div>
            
            {/* App Screenshots */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                {[
                  {
                    title: "Real-time Scanning",
                    desc: "Automatic protection as you browse"
                  },
                  {
                    title: "Manual Scan",
                    desc: "Check suspicious links manually"
                  },
                  {
                    title: "Alerts & Reports",
                    desc: "Detailed scam analysis"
                  },
                  {
                    title: "Settings",
                    desc: "Customize your protection"
                  }
                ].map((screen, index) => (
                  <div key={index} className="bg-gray-900 rounded-2xl p-2 shadow-xl">
                    <div className="h-64 bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl p-4">
                      <div className="flex items-center space-x-2 mb-4">
                        <div className="w-8 h-4 bg-gray-700 rounded"></div>
                        <div className="w-8 h-4 bg-gray-700 rounded"></div>
                        <div className="flex-1"></div>
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      </div>
                      <div className="space-y-3">
                        <div className="h-3 bg-gray-700 rounded w-3/4"></div>
                        <div className="h-3 bg-gray-700 rounded w-1/2"></div>
                        <div className="mt-4 space-y-2">
                          <div className="h-8 bg-gray-600 rounded"></div>
                          <div className="h-8 bg-red-500/20 rounded border border-red-500/30"></div>
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <h4 className="font-bold text-white">{screen.title}</h4>
                      <p className="text-sm text-gray-400">{screen.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-6">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl flex items-center justify-center">
                  <FiShield className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold">Ganium AI</span>
              </div>
              <p className="text-gray-400">
                AI-powered scam detection to protect you from online fraud.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-6">Product</h4>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a></li>
                <li><a href="#download" className="hover:text-white transition-colors">Download</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-6">Company</h4>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-6">Contact</h4>
              <ul className="space-y-3 text-gray-400">
                <li><a href="mailto:support@scanguard.app" className="hover:text-white transition-colors">support@scanguard.app</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Report a Bug</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Ganium AI. All rights reserved.</p>
            <p className="text-sm mt-2">Protecting users worldwide from online scams.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}