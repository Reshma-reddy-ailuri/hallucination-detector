export type ClaimStatus = 'supported' | 'unsupported';

export interface Claim {
  id: string;
  text: string;
  status: ClaimStatus;
  confidence: number;
  citation?: string;
  evidenceGap?: string;
  correction?: string;
}

export interface VerificationStats {
  totalClaims: number;
  supportedCount: number;
  unsupportedCount: number;
  hallucinationRate: number;
}

export interface TelemetryData {
  latencyMs: number;
  tokensPerSec: number;
  forensicLevel: number;
}

export interface AnalysisResponse {
  synthesis: string;
  claims: Claim[];
  stats: VerificationStats;
  telemetry: TelemetryData;
}

export interface ModelMetrics {
  id: string;
  name: string;
  shortName: string;
  provider: string;
  hallucinationRate: number;
  factualRecall: number;
  logicConsistency: number;
  citationAccuracy: number;
  totalClaims: number;
  supportedClaims: number;
  unsupportedClaims: number;
  color: string;
  analysisText: string;
  highlights: {
    text: string;
    type: 'supported' | 'unsupported';
    tooltip: string;
  }[];
}

export interface AuditHistoryItem {
  id: string;
  timestamp: string;
  question: string;
  sourceTitle: string;
  stats: VerificationStats;
  response: AnalysisResponse;
}
