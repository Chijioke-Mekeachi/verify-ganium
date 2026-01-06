'use client';

import React, { useState, useEffect } from 'react';
import { 
  FiShield, FiAlertTriangle, FiCheckCircle, 
  FiDownload, FiSmartphone, FiMail, FiMessageSquare,
  FiBarChart2, FiUsers, FiLock, FiZap, FiGlobe,
  FiPlay, FiTarget, FiActivity, FiStar, FiAward,
  FiChevronRight, FiCpu, FiDatabase, FiBell
} from 'react-icons/fi';
import { 
  MdSecurity, MdVerifiedUser, MdSpeed, 
  MdOutlineFactCheck, MdPhoneIphone, MdAndroid,
  MdQrCode2, MdSecurityUpdateGood
} from 'react-icons/md';
import { FaApple, FaGooglePlay } from 'react-icons/fa';
import { SiAppstore, SiGoogleplay } from 'react-icons/si';
import Image from 'next/image';

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
    <div className="min-h-screen bg-gradient-to-b from-blue-50/30 to-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-md z-50 border-b border-blue-100">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center">
                {/* <FiShield className="w-6 h-6 text-white" /> */}
                <Image src={'/logo.png'} width={50} height={50} alt='Ganium logo' className='rounded-[10px]'/>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                Ganium
              </span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                Features
              </a>
              <a href="#how-it-works" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                How It Works
              </a>
              <a href="#download" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                Download
              </a>
              <a href="#contact" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                Contact
              </a>
            </div>

            <div className="flex items-center space-x-4">
              <a 
                href="#download" 
                className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6 py-2 rounded-xl font-medium hover:from-blue-700 hover:to-blue-900 transition-all shadow-lg hover:shadow-xl shadow-blue-200 flex items-center"
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
              <div className="inline-flex items-center px-4 py-2 bg-blue-50 rounded-full border border-blue-100">
                <FiAlertTriangle className="w-4 h-4 text-blue-600 mr-2" />
                <span className="text-sm font-medium text-blue-700">AI-Powered Scam Detection</span>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Smart Protection
                <span className="block bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                  Against
                </span>
                <span className="block bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                  Online Scams
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed">
                Ganium uses advanced AI algorithms to detect fraudulent websites, 
                phishing emails, and scam messages in real-time. Protect your digital life 
                with the most intelligent security app.
              </p>
              
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-blue-900 transition-all shadow-xl hover:shadow-2xl shadow-blue-300 hover:shadow-blue-400 flex items-center justify-center group"
                  >
                    <FaApple className="w-6 h-6 mr-3" />
                    <div className="text-left">
                      <div className="text-xs">IOS is Unavaliable</div>
                      <div className="text-lg">App Store</div>
                    </div>
                  </a>
                  
                  <a
                    href="https://expo.dev/accounts/chijioke2007/projects/ganiumai/builds/661d4051-c58b-4576-96e0-e593e8abed17"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white text-gray-900 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-50 transition-all shadow-xl hover:shadow-2xl border border-gray-200 flex items-center justify-center group"
                  >
                    <FaGooglePlay className="w-5 h-5 mr-3" />
                    <div className="text-left">
                      <div className="text-xs">GET IT ON</div>
                      <div className="text-lg">Expo</div>
                    </div>
                  </a>
                </div>
                
                <p className="text-sm text-gray-500 flex items-center">
                  <FiStar className="w-4 h-4 text-yellow-500 mr-1" />
                  <span className="font-medium">4.8/5 Rating</span>
                  <span className="mx-2">•</span>
                  500K+ Downloads
                  <span className="mx-2">•</span>
                  Free 14-day Trial
                </p>
              </div>
              
              {/* Trust Badges */}
              <div className="flex flex-wrap gap-4 pt-8">
                <div className="flex items-center space-x-2 px-4 py-2 bg-blue-50 rounded-lg">
                  <FiCpu className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-medium text-gray-700">AI-Powered</span>
                </div>
                <div className="flex items-center space-x-2 px-4 py-2 bg-blue-50 rounded-lg">
                  <FiLock className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-medium text-gray-700">Privacy First</span>
                </div>
                <div className="flex items-center space-x-2 px-4 py-2 bg-blue-50 rounded-lg">
                  <FiZap className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-medium text-gray-700">Real-time</span>
                </div>
              </div>
            </div>
            
            {/* App Preview */}
            <div className="relative animate-float">
  <div className="relative mx-auto w-80 h-[600px]">
    {/* Phone Frame with Metallic Edge */}
    <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-[3rem] p-[3px] shadow-2xl">
      {/* Metallic Frame */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800 rounded-[2.9rem] p-[10px]">
        {/* Main Phone Body */}
        <div className="relative w-full h-full bg-gradient-to-br from-gray-900 to-black rounded-[2.5rem] overflow-hidden">
          {/* Screen Bezel */}
          <div className="absolute inset-[6px] bg-gradient-to-b from-gray-950 to-black rounded-[2.4rem] overflow-hidden">
            {/* Dynamic Island */}
            <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-full z-20 shadow-lg">
              <div className="absolute inset-0 flex items-center justify-center space-x-1">
                <div className="w-2 h-2 bg-gray-700 rounded-full"></div>
                <div className="w-8 h-3 bg-gray-900 rounded-full"></div>
              </div>
            </div>
            
            {/* Screen Content */}
            <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white rounded-[2.4rem] overflow-hidden">
              <div className="relative w-full h-full">
                <Image 
                  alt='app preview' 
                  src={'/preview.png'} 
                  fill
                  className="object-cover"
                  priority
                />
                {/* Screen Reflection Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-white/5 pointer-events-none"></div>
              </div>
            </div>
            
            {/* Camera Cutout */}
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-10 h-4 bg-black rounded-b-lg z-10"></div>
          </div>
          
          {/* Side Buttons */}
          <div className="absolute -right-1 top-32 w-2 h-12 bg-gradient-to-r from-gray-800 to-gray-900 rounded-r-md shadow-lg"></div>
          <div className="absolute -right-1 top-48 w-2 h-8 bg-gradient-to-r from-gray-800 to-gray-900 rounded-r-md shadow-lg"></div>
          <div className="absolute -left-1 top-40 w-2 h-20 bg-gradient-to-l from-gray-800 to-gray-900 rounded-l-md shadow-lg"></div>
          
          {/* Bottom Speaker Grill */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-gray-800 to-transparent rounded-full"></div>
        </div>
      </div>
    </div>
    
    {/* Subtle Glow Effect */}
    <div className="absolute -inset-4 bg-gradient-to-br from-blue-500/20 to-purple-500/10 rounded-[3.5rem] blur-xl -z-10"></div>
  </div>
  
  {/* Realistic Shadows and Highlights */}
  <div className="absolute -inset-2 bg-gradient-to-br from-blue-200/10 via-transparent to-purple-200/10 rounded-[3.2rem] blur-lg"></div>
</div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-bold mb-2">
                {scansCount.toLocaleString()}+
              </div>
              <p className="text-blue-200">Scans Completed</p>
            </div>
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-bold mb-2">
                {protectedUsers.toLocaleString()}+
              </div>
              <p className="text-blue-200">Protected Users</p>
            </div>
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-bold mb-2">
                {detectedScams.toLocaleString()}+
              </div>
              <p className="text-blue-200">Scams Detected</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 bg-white">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Advanced Protection Features
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to stay safe online
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <FiCpu className="w-8 h-8" />,
                title: "AI Detection Engine",
                description: "Machine learning algorithms detect new scam patterns in real-time",
                color: "from-blue-500 to-blue-600"
              },
              {
                icon: <FiDatabase className="w-8 h-8" />,
                title: "Global Threat Database",
                description: "Access to 50M+ known scam URLs, emails, and patterns",
                color: "from-blue-600 to-blue-700"
              },
              {
                icon: <FiZap className="w-8 h-8" />,
                title: "Real-Time Scanning",
                description: "Instant protection as you browse, message, and receive emails",
                color: "from-blue-700 to-blue-800"
              },
              {
                icon: <FiLock className="w-8 h-8" />,
                title: "Privacy Protection",
                description: "On-device scanning. Your data never leaves your phone",
                color: "from-blue-500 to-blue-600"
              },
              {
                icon: <FiUsers className="w-8 h-8" />,
                title: "Community Shield",
                description: "Benefit from reports by millions of users worldwide",
                color: "from-blue-600 to-blue-700"
              },
              {
                icon: <MdSpeed className="w-8 h-8" />,
                title: "Lightning Fast",
                description: "Scan results in under 0.5 seconds without slowing your device",
                color: "from-blue-700 to-blue-800"
              }
            ].map((feature, index) => (
              <div key={index} className="group bg-white rounded-2xl p-8 border border-blue-100 hover:border-blue-300 transition-all duration-300 hover:shadow-xl hover:shadow-blue-100">
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
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
      <section id="how-it-works" className="py-20 px-6 bg-gradient-to-b from-blue-50/50 to-white">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How Ganium Protects You
            </h2>
            <p className="text-xl text-gray-600">
              Simple setup, powerful protection
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Download & Setup",
                description: "Install from App Store or Expo in under 2 minutes",
                icon: <FiDownload className="w-8 h-8" />
              },
              {
                step: "02",
                title: "Enable Smart Protection",
                description: "Turn on real-time scanning for emails, messages, and browsers",
                icon: <FiShield className="w-8 h-8" />
              },
              {
                step: "03",
                title: "Stay Protected 24/7",
                description: "Get instant alerts and automatic blocking of threats",
                icon: <FiBell className="w-8 h-8" />
              }
            ].map((step, index) => (
              <div key={index} className="text-center relative">
                <div className="relative">
                  <div className="w-20 h-20 mx-auto bg-gradient-to-r from-blue-600 to-blue-800 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-6 shadow-lg">
                    {step.step}
                  </div>
                  <div className="w-16 h-16 mx-auto -mt-10 bg-white rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                    <div className="text-blue-600">{step.icon}</div>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3 mt-6">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
                
                {/* Connector Lines */}
                {index < 2 && (
                  <div className="hidden md:block absolute top-10 -right-4 w-8 h-0.5 bg-gradient-to-r from-blue-200 to-blue-300"></div>
                )}
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
                Download Ganium Today
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Available for Android. Start your 14-day free trial now.
              </p>
              
              {/* Platform Info */}
              <div className="mb-8">
                <div className="flex space-x-4 mb-6">
                  <button
                    onClick={() => setActiveTab('ios')}
                    className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold ${
                      activeTab === 'ios'
                        ? 'bg-blue-50 text-blue-700 border-2 border-blue-200'
                        : 'text-gray-500 border-2 border-transparent'
                    }`}
                  >
                    <MdPhoneIphone className="w-5 h-5" />
                    <span>iOS</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('android')}
                    className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold ${
                      activeTab === 'android'
                        ? 'bg-blue-50 text-blue-700 border-2 border-blue-200'
                        : 'text-gray-500 border-2 border-transparent'
                    }`}
                  >
                    <MdAndroid className="w-5 h-5" />
                    <span>Android</span>
                  </button>
                </div>
                
                {/* Requirements */}
                <div className="space-y-4 bg-blue-50 rounded-2xl p-6">
                  <h4 className="font-bold text-gray-900">System Requirements:</h4>
                  {activeTab === 'ios' ? (
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-center">
                        <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center mr-3">
                          <FiCheckCircle className="w-4 h-4 text-blue-600" />
                        </div>
                        iOS 14.0 or later
                      </li>
                      <li className="flex items-center">
                        <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center mr-3">
                          <FiCheckCircle className="w-4 h-4 text-blue-600" />
                        </div>
                        iPhone, iPad, or iPod touch
                      </li>
                      <li className="flex items-center">
                        <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center mr-3">
                          <FiCheckCircle className="w-4 h-4 text-blue-600" />
                        </div>
                        150MB free space
                      </li>
                    </ul>
                  ) : (
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-center">
                        <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center mr-3">
                          <FiCheckCircle className="w-4 h-4 text-blue-600" />
                        </div>
                        Android 8.0 or later
                      </li>
                      <li className="flex items-center">
                        <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center mr-3">
                          <FiCheckCircle className="w-4 h-4 text-blue-600" />
                        </div>
                        120MB free space
                      </li>
                      <li className="flex items-center">
                        <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center mr-3">
                          <FiCheckCircle className="w-4 h-4 text-blue-600" />
                        </div>
                        Works with all major brands
                      </li>
                    </ul>
                  )}
                </div>
              </div>
              
              {/* Download Buttons */}
              <div className="space-y-4">
                <a
                  href="/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-gradient-to-r from-blue-600 to-blue-800 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-900 transition-all shadow-xl hover:shadow-2xl w-full md:w-auto justify-center"
                >
                  <SiAppstore className="w-6 h-6 mr-3" />
                  <div className="text-left">
                    <div className="text-xs">IOS version is Unavaliable</div>
                    <div className="text-lg">App Store</div>
                  </div>
                </a>
                
                <a
                  href="https://expo.dev/accounts/chijioke2007/projects/ganiumai/builds/661d4051-c58b-4576-96e0-e593e8abed17"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-white text-gray-900 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-all shadow-xl hover:shadow-2xl border border-gray-200 w-full md:w-auto justify-center"
                >
                  <SiGoogleplay className="w-5 h-5 mr-3" />
                  <div className="text-left">
                    <div className="text-xs">GET IT ON</div>
                    <div className="text-lg">Expo</div>
                  </div>
                </a>
              </div>
              
              {/* QR Code */}
              <div className="mt-8 flex items-center space-x-4 bg-blue-50 p-6 rounded-2xl border border-blue-100">
                <div className="w-28 h-28 bg-white p-3 rounded-xl shadow-md">
                  {/* QR Code Placeholder */}
                  <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 rounded flex items-center justify-center">
                    <MdQrCode2 className="w-16 h-16 text-blue-600" />
                  </div>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Scan to Download</p>
                  <p className="text-sm text-gray-600 mt-2">Open your phone's camera and point it at the QR code to download the app directly</p>
                </div>
              </div>
            </div>
            
            {/* Testimonials */}
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-blue-50 to-blue-100/50 rounded-2xl p-8 border border-blue-200">
                <div className="flex items-center mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FiStar key={star} className="w-5 h-5 text-yellow-500 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 text-lg mb-6">
                  "Ganium saved me from a phishing scam that looked identical to my bank's website. The app detected it immediately and prevented me from entering my credentials."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center font-bold text-blue-700">
                    SJ
                  </div>
                  <div className="ml-4">
                    <p className="font-bold text-gray-900">Sarah Johnson</p>
                    <p className="text-sm text-gray-600">Verified User • 2 days ago</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-blue-50 to-blue-100/50 rounded-2xl p-8 border border-blue-200">
                <div className="flex items-center mb-4">
                  {[1, 2, 3, 4].map((star) => (
                    <FiStar key={star} className="w-5 h-5 text-yellow-500 fill-current" />
                  ))}
                  <FiStar className="w-5 h-5 text-yellow-500" />
                </div>
                <p className="text-gray-700 text-lg mb-6">
                  "As someone who shops online frequently, this app gives me peace of mind. It caught three scam websites that looked like legitimate stores. Highly recommended!"
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center font-bold text-blue-700">
                    MR
                  </div>
                  <div className="ml-4">
                    <p className="font-bold text-gray-900">Michael Roberts</p>
                    <p className="text-sm text-gray-600">Verified User • 1 week ago</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-blue-50 to-blue-100/50 rounded-2xl p-8 border border-blue-200">
                <div className="flex items-center mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FiStar key={star} className="w-5 h-5 text-yellow-500 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 text-lg mb-6">
                  "The real-time email scanning is incredible. It flagged a suspicious email that my regular spam filter missed. This app is a must-have for everyone."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center font-bold text-blue-700">
                    EP
                  </div>
                  <div className="ml-4">
                    <p className="font-bold text-gray-900">Emma Parker</p>
                    <p className="text-sm text-gray-600">Verified User • 3 days ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-6">
              Start Your Free 14-Day Trial
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              No credit card required. Experience full protection with all premium features.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href=""
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-blue-700 px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition-all shadow-xl hover:shadow-2xl flex items-center justify-center"
              >
                <FaApple className="w-6 h-6 mr-3" />
                iOS is Unavaliable
              </a>
              <a
                href="https://expo.dev/accounts/chijioke2007/projects/ganiumai/builds/661d4051-c58b-4576-96e0-e593e8abed17"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-900 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-950 transition-all shadow-xl hover:shadow-2xl border border-blue-700 flex items-center justify-center"
              >
                <FaGooglePlay className="w-5 h-5 mr-3" />
                Download for Android
              </a>
            </div>
            <p className="text-blue-200 text-sm mt-6">
              Cancel anytime during trial • No hidden fees • Privacy guaranteed
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-b from-blue-900 to-blue-950 text-white py-12 px-6">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center">
                  <FiShield className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold">Ganium</span>
              </div>
              <p className="text-blue-300 text-sm">
                Advanced AI-powered scam detection to protect your digital life.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-6">Product</h4>
              <ul className="space-y-3 text-blue-300">
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a></li>
                <li><a href="#download" className="hover:text-white transition-colors">Download</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-6">Company</h4>
              <ul className="space-y-3 text-blue-300">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Support</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-6">Connect</h4>
              <ul className="space-y-3 text-blue-300">
                <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Facebook</a></li>
                <li><a href="#" className="hover:text-white transition-colors">LinkedIn</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-blue-800 mt-12 pt-8 text-center text-blue-400">
            <p>&copy; {new Date().getFullYear()} Ganium AI. All rights reserved.</p>
            <p className="text-sm mt-2">Protecting users in 150+ countries from online scams.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
