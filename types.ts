
export interface MigrationData {
  year: string;
  netMigration: number;
  agiLoss: number;
  revenueLoss: number;
  isLive?: boolean;
}

export interface BillionaireCase {
  name: string;
  netWorth: number;
  potentialTaxBill: number;
  destination: string;
  status?: string;
  isRecent?: boolean;
}

export interface CompanyRelocation {
  name: string;
  destination: string;
  year: number;
  details?: string;
}

export interface GroundingSource {
  title: string;
  uri: string;
}

export interface AISearchResult {
  text: string;
  sources: GroundingSource[];
}

export interface EconomicCritique {
  author: string;
  handle: string;
  text: string;
  impact: string;
  likes: string;
  timestamp?: string;
  link: string;
}

export interface SyncResult {
  migrationUpdates: MigrationData[];
  billionaireUpdates: BillionaireCase[];
  analysis: string;
  sources: GroundingSource[];
}
