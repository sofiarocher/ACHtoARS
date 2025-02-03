export interface BaseEntity {
  uuid: string;
  name: string;
  logo: string;
}

export interface CommissionRate {
  commission: number;
  rate: number;
}

interface BaseState {
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export interface Fintech extends BaseEntity {
  receipt_commission: number;
  send_commission: number;
  total_commission: number;
  rate: number;
  commission: number;
}

export interface FintechUsa extends BaseState {
  fintechs: Fintech[];
}

export interface FintechArg extends BaseState {
  fintechsArg: Fintech[];
}

export interface Platform extends BaseEntity {
  total_commission: number;
  rate: number;
}

export interface Bank extends Omit<BaseEntity, 'logo'>, CommissionRate {}

interface PlatformCalculation {
  name: string;
  commission: number;
  rate: number;
}

export interface Calculation {
  amountUSD: number;
  platformCommissionAmount: number;
  amountAfterPlatformCommission: number;
  amountInARS: number;
  bankCommissionAmount: number;
  finalAmount: number;
  platform: PlatformCalculation;
  bank: Bank;
}

export type CalculationResult = Omit<Calculation, 'bank'> & {
  bank: Pick<Bank, 'name' | 'commission'>;
}

export interface FintechsProps {
  fintechsUsa: Fintech[];
  fintechsArg: Fintech[];
  calculation: Calculation | null;
  formatCurrency: (value: number, currency: string) => string;
  amount: number;
}

export interface CalculatorProps {
  fintechsUsa: Array<Platform & CommissionRate>;
  fintechsArg: Array<Omit<BaseEntity, 'rate'>>;
  amount: string;
  setAmount: (value: string) => void;
  selectedUsa: string;
  setSelectedUsa: (value: string) => void;
  selectedArg: string;
  setSelectedArg: (value: string) => void;
  calculation: CalculationResult | null;
  formatCurrency: (value: number, currency: string) => string;
  isLoading: boolean;
}

export interface MappedPlatform extends Platform, CommissionRate {
  receipt_commission: number;
  send_commission: number;
  total_commission: number;
}