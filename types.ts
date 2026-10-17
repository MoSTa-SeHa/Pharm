
export interface Drug {
  DrugCode: string;
  InsurancePlan?: string;
  PackageName: string;
  GenericCode?: string;
  GenericName: string;
  Strength?: string;
  DosageForm?: string;
  ManufacturerName?: string;
  ThiqaEligible: number;
  ABM1: number;
  ABM7: number;
  BasicFormulary: number;
  ThiqaMaxReimbursementPrice?: number;
  ThiqaCopayAmount?: number;
  BasicCopayAmount?: number;
  EffectiveDate?: string;
  ExpiryDate?: string;
}

export interface GovAuthority {
  key: string;
  name: string;
  status: 'CONNECTED_LOCKED' | 'CONNECTED_ACTIVE' | 'DISCONNECTED';
  note: string;
}

export interface ICDResult {
  code: string;
  title: string;
  confidence: number;
}

export interface ICDResponse {
  icd10: ICDResult;
  icd11?: ICDResult;
  icd9?: ICDResult;
  confidence_score: number;
  reasoning: string;
}
