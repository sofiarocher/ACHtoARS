'use client';

import CalculatorResult from './components/calculatorResult';
import PaymentPlatforms from './components/paymentPlatforms';
import VirtualBanks from './components/virtualBanks';
import Calculator from './components/calculator';
import Image from 'next/image';
import { useMemo, useState } from 'react';

// Mock data
const paymentPlatforms = [
  { id: 'wise', name: 'Wise', commission: 0.015, rate: 850 },
  { id: 'paypal', name: 'PayPal', commission: 0.054, rate: 840 },
  { id: 'payoneer', name: 'Payoneer', commission: 0.02, rate: 845 },
];

const argentineBanks = [
  { id: 'galicia', name: 'Banco Galicia', commission: 0.001 },
  { id: 'santander', name: 'Santander', commission: 0.0015 },
  { id: 'bbva', name: 'BBVA', commission: 0.002 },
];

export default function Home() {
  const [amount, setAmount] = useState<string>('1000');
  const [selectedPlatform, setSelectedPlatform] = useState<string>('wise');
  const [selectedBank, setSelectedBank] = useState<string>('galicia');

  const calculation = useMemo(() => {
    const platform = paymentPlatforms.find(p => p.id === selectedPlatform);
    const bank = argentineBanks.find(b => b.id === selectedBank);
    
    if (!platform || !bank || !amount) return null;
    
    const amountUSD = Number(amount);
    const platformCommissionAmount = amountUSD * platform.commission;
    const amountAfterPlatformCommission = amountUSD - platformCommissionAmount;
    const amountInARS = amountAfterPlatformCommission * platform.rate;
    const bankCommissionAmount = amountInARS * bank.commission;
    const finalAmount = amountInARS - bankCommissionAmount;
    
    return {
      amountUSD,
      platformCommissionAmount,
      amountAfterPlatformCommission,
      amountInARS,
      bankCommissionAmount,
      finalAmount,
      platform,
      bank
    };
  }, [amount, selectedPlatform, selectedBank]);

  const formatCurrency = (value: number, currency: string) => {
    return new Intl.NumberFormat('es-AR', { style: 'currency', currency }).format(value);
  };

  return (
    <div className="min-h-screen relative">
      <Image 
        src="/background.jpg" 
        alt="Background" 
        fill
        className="object-cover z-0"
        priority
      />
      <div className="relative z-10 min-h-screen">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="flex flex-col items-center mb-12">
            <h1 className="text-4xl font-bold text-primary mb-4">
              ACH to ARS
            </h1>
            <p className="text-muted-foreground text-lg text-center">
              Compará las mejores tasas para recibir pagos del exterior.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-8">
              <Calculator
                paymentPlatforms={paymentPlatforms}
                argentineBanks={argentineBanks}
                amount={amount}
                setAmount={setAmount}
                selectedPlatform={selectedPlatform}
                setSelectedPlatform={setSelectedPlatform}
                selectedBank={selectedBank}
                setSelectedBank={setSelectedBank}
              />
              <CalculatorResult 
                calculation={calculation}
                formatCurrency={formatCurrency}
              />
            </div>

            <div className="space-y-8">
              <VirtualBanks 
                argentineBanks={argentineBanks}
                calculation={calculation}
                formatCurrency={formatCurrency}
              />
              <PaymentPlatforms 
                paymentPlatforms={paymentPlatforms}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

