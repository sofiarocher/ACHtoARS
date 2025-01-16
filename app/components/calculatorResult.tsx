'use client';

import { Calculator } from 'lucide-react';
import { Card } from "@/components/ui/card";

interface CalculationResult {
  amountUSD: number;
  platformCommissionAmount: number;
  amountAfterPlatformCommission: number;
  amountInARS: number;
  bankCommissionAmount: number;
  finalAmount: number;
  platform: {
    name: string;
    commission: number;
    rate: number;
  };
  bank: {
    name: string;
    commission: number;
  };
}

interface CalculatorResultProps {
  calculation: CalculationResult | null;
  formatCurrency: (value: number, currency: string) => string;
}

export default function CalculatorResult({ calculation, formatCurrency }: CalculatorResultProps) {
  return (
    <Card className="p-6 bg-black text-primary-foreground">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-sm font-medium opacity-80">Recibirás</p>
          <h2 className="text-3xl font-bold mt-1">
            {calculation ? formatCurrency(calculation.finalAmount, 'ARS') : 'ARS 0'}
          </h2>
        </div>
        <Calculator className="h-8 w-8 opacity-80" />
      </div>
      {calculation && (
        <div className="text-sm space-y-1">
          <p>Monto original: {formatCurrency(calculation.amountUSD, 'USD')}</p>
          <p>Comisión {calculation.platform.name}: {formatCurrency(calculation.platformCommissionAmount, 'USD')} ({(calculation.platform.commission * 100).toFixed(2)}%)</p>
          <p>Tasa de cambio: {calculation.platform.rate} ARS/USD</p>
          <p>Monto en ARS: {formatCurrency(calculation.amountInARS, 'ARS')}</p>
          <p>Comisión {calculation.bank.name}: {formatCurrency(calculation.bankCommissionAmount, 'ARS')} ({(calculation.bank.commission * 100).toFixed(2)}%)</p>
        </div>
      )}
    </Card>
  );
}
