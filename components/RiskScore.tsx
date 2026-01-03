import React from 'react';
import { motion } from 'framer-motion';
import { ScanResult, RiskData } from '../types';
import { 
  AlertTriangle, 
  ShieldCheck, 
  AlertCircle, 
  CheckCircle,
  Flame 
} from 'lucide-react';

interface RiskScoreProps {
  riskScore: number;
}

const RiskScore: React.FC<RiskScoreProps> = ({ riskScore }) => {
  const getRiskData = (score: number): RiskData => {
    if (score >= 85) return {
      label: 'CRITICAL RISK',
      color: '#FF3B30',
      icon: 'flame',
      gradient: 'risk-gradient-critical',
      description: 'Immediate action required',
      severity: 5
    };
    if (score >= 70) return {
      label: 'HIGH RISK',
      color: '#FF9500',
      icon: 'alert-triangle',
      gradient: 'risk-gradient-high',
      description: 'Significant threat detected',
      severity: 4
    };
    if (score >= 40) return {
      label: 'MEDIUM RISK',
      color: '#FFCC00',
      icon: 'alert-circle',
      gradient: 'risk-gradient-medium',
      description: 'Exercise caution',
      severity: 3
    };
    if (score >= 20) return {
      label: 'LOW RISK',
      color: '#34C759',
      icon: 'shield-check',
      gradient: 'risk-gradient-low',
      description: 'Minimal concerns',
      severity: 2
    };
    return {
      label: 'SAFE',
      color: '#32D74B',
      icon: 'check-circle',
      gradient: 'risk-gradient-safe',
      description: 'No threats detected',
      severity: 1
    };
  };

  const riskData = getRiskData(riskScore);
  const circumference = 2 * Math.PI * 90;
  const strokeDashoffset = circumference - (riskScore / 100) * circumference;

  const getIcon = () => {
    switch (riskData.icon) {
      case 'flame': return <Flame className="w-6 h-6" />;
      case 'alert-triangle': return <AlertTriangle className="w-6 h-6" />;
      case 'alert-circle': return <AlertCircle className="w-6 h-6" />;
      case 'shield-check': return <ShieldCheck className="w-6 h-6" />;
      default: return <CheckCircle className="w-6 h-6" />;
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`${riskData.gradient} rounded-3xl p-8 shadow-2xl`}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/20 rounded-lg">
            {getIcon()}
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white">Risk Assessment</h3>
            <p className="text-white/80 text-sm">{riskData.description}</p>
          </div>
        </div>
        <div className="px-4 py-2 bg-white/20 rounded-full">
          <span className="text-white font-semibold">{riskData.label}</span>
        </div>
      </div>

      <div className="flex flex-col items-center">
        <div className="relative w-64 h-64">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="128"
              cy="128"
              r="90"
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="12"
              fill="none"
            />
            <motion.circle
              cx="128"
              cy="128"
              r="90"
              stroke={riskData.color}
              strokeWidth="12"
              fill="none"
              strokeLinecap="round"
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              strokeDasharray={circumference}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.span 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring" }}
              className="text-6xl font-bold text-white"
            >
              {riskScore}
            </motion.span>
            <span className="text-white/80 mt-2">Risk Score</span>
          </div>
        </div>

        <div className="w-full mt-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-white/80 text-sm">Safe</span>
            <span className="text-white/80 text-sm">Critical</span>
          </div>
          <div className="h-2 bg-white/20 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${riskScore}%` }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className={`h-full`}
              style={{ backgroundColor: riskData.color }}
            />
          </div>
          <div className="flex justify-between mt-1">
            {[0, 25, 50, 75, 100].map((tick) => (
              <span key={tick} className="text-white/60 text-xs">
                {tick}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default RiskScore;