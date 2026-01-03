import type { NextApiRequest, NextApiResponse } from 'next';
import { ScanResult } from '../../types';

// Mock database
const mockResults: Record<string, ScanResult> = {
  '12345': {
    id: '12345',
    classification: 'Phishing Attempt',
    explanation: 'This content shows characteristics of a phishing attempt including suspicious links, urgency tactics, and requests for personal information.',
    riskScore: 85,
    content: 'Urgent! Your account has been compromised. Click here to verify your identity immediately: http://fake-bank-verify.com/login',
    contentType: 'text',
    recommendations: 'Do not click any links. Contact the organization directly through official channels. Enable two-factor authentication.',
    timestamp: '2024-01-03T10:30:00Z',
    severity: 5,
    threatIndicators: [
      { label: 'Phishing Attempt', icon: 'fish', color: '#FF9500' },
      { label: 'Urgency Pressure', icon: 'clock', color: '#FF2D55' },
      { label: 'Suspicious Link', icon: 'link', color: '#FF3B30' },
      { label: 'Credential Theft', icon: 'key', color: '#FF3B30' },
    ]
  },
  '67890': {
    id: '67890',
    classification: 'Safe Content',
    explanation: 'This content appears legitimate with no immediate security threats detected.',
    riskScore: 15,
    content: 'Welcome to our official newsletter with security updates and best practices.',
    contentType: 'text',
    recommendations: 'Continue practicing good security hygiene and regular updates.',
    timestamp: '2024-01-03T11:45:00Z',
    severity: 1,
    threatIndicators: []
  }
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ScanResult | { error: string }>
) {
  const { uid } = req.query;
  
  if (typeof uid !== 'string') {
    return res.status(400).json({ error: 'Invalid UID' });
  }
  
  const result = mockResults[uid];
  
  if (!result) {
    return res.status(404).json({ error: 'Result not found' });
  }
  
  res.status(200).json(result);
}