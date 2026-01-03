export interface ScanResult {
  id: string;
  classification: string;
  explanation: string;
  riskScore: number;
  content: string;
  contentType: 'text' | 'url' | 'email';
  recommendations: string;
  timestamp: string;
  severity: number;
  threatIndicators: ThreatIndicator[];
}

export interface ThreatIndicator {
  label: string;
  icon: string;
  color: string;
}

export interface RiskData {
  label: string;
  color: string;
  icon: string;
  gradient: string;
  description: string;
  severity: number;
}

export interface ClassificationIcon {
  icon: string;
  color: string;
}