export interface FishAnalysis {
  name: string;
  scientificName: string;
  confidence: number;
  habitat: string;
  diet: string;
  description: string;
  edible: boolean;
  conservationStatus: string;
  cookingTips?: string;
}

export enum AnalysisStatus {
  IDLE = 'IDLE',
  ANALYZING = 'ANALYZING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}