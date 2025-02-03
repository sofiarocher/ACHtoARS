'use client';

import Calculator from '@/components/features/calculator/calculator';
import { calculateTransfer } from '@/utils/calculate-transfer';
import { formatCurrency } from '@/utils/format-currency';
import { MappedPlatform } from '@/utils/types';
import { useMemo, useState } from 'react';
import Fintechs from '../components/features/fintechs';
import Footer from '../components/layouts/footer';
import LastUpdated from '../components/layouts/last-updated';
import { useArgFintechs } from './hooks/use-fintechs-arg';
import { useUsaFintechs } from './hooks/use-fintechs-usa';

export default function Home() {
  const [amount, setAmount] = useState<string>('1000');
  const [selectedUsa, setSelectedUsa] = useState<string>('');
  const [selectedArg, setSelectedArg] = useState<string>('');
  const { fintechs, isLoading: isLoadingUsa } = useUsaFintechs();
  const { fintechsArg, isLoading: isLoadingArg } = useArgFintechs();

  const calculation = useMemo(() => {
    const platform = fintechs.find(p => p.uuid === selectedUsa);
    const bank = fintechsArg.find(b => b.uuid === selectedArg);
    
    if (!platform || !bank || !amount) return null;
    
    return calculateTransfer({
      amount: Number(amount),
      platform,
      bank
    });
  }, [amount, selectedUsa, selectedArg, fintechs, fintechsArg]);
  


  const mappedPlatforms = useMemo(() => 
    fintechs.map(f => ({
      uuid: f.uuid,
      name: f.name,
      commission: f.total_commission / 100,
      rate: 1200,
      logo: f.logo
    } as MappedPlatform)), [fintechs]);

  const isLoading = isLoadingUsa || isLoadingArg;

  return (
    <div className="min-h-screen relative bg-white">
      <div className="relative z-10 min-h-screen">
        <LastUpdated />
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="flex flex-col items-center mb-12">
            <h1 className="text-6xl text-primary mb-4 font-[var(--font-limelight)]">
              ACH to ARS
            </h1>
            <p className="text-gray-900 text-lg text-center">
              Compará las mejores tasas para recibir pagos del exterior.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-8">
              <Calculator
                fintechsUsa={mappedPlatforms}
                fintechsArg={fintechsArg}
                amount={amount}
                setAmount={setAmount}
                selectedUsa={selectedUsa}
                setSelectedUsa={setSelectedUsa}
                selectedArg={selectedArg}
                setSelectedArg={setSelectedArg}
                calculation={calculation}
                formatCurrency={formatCurrency}
                isLoading={isLoading}
              />
            </div>

            <div className="space-y-8">
              <Fintechs
                fintechsArg={fintechsArg}
                calculation={calculation}
                formatCurrency={formatCurrency}
                fintechsUsa={mappedPlatforms}
                amount={Number(amount)}
                isLoading={isLoading}
              />
            </div> 
          </div> 
        </div>
        <Footer />
      </div>
    </div>
  );
}

