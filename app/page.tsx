'use client';

import { useMemo, useState } from 'react';
import Calculator from './components/calculator';
import Fintechs from './components/fintechs';
import { useFintechsArg } from './hooks/useFintechsArg';
import { useFintechsUsa } from './hooks/useFintechsUsa';
import LastUpdated from './components/lastUpdated';

export default function Home() {
  const [amount, setAmount] = useState<string>('1000');
  const [selectedPlatform, setSelectedPlatform] = useState<string>('wise');
  const [selectedBank, setSelectedBank] = useState<string>('galicia');
  const { fintechs } = useFintechsUsa();
  const { fintechsArg } = useFintechsArg();

  const calculation = useMemo(() => {
    const platform = fintechs.find(p => p.uuid === selectedPlatform);
    const bank = fintechsArg.find(b => b.uuid === selectedBank);
    
    if (!platform || !bank || !amount) return null;
    
    const amountUSD = Number(amount);
    const platformCommissionAmount = amountUSD * (platform.total_commission / 100);
    const amountAfterPlatformCommission = amountUSD - platformCommissionAmount;
    const amountInARS = amountAfterPlatformCommission * bank.rate;
    const bankCommissionAmount = amountInARS * (bank.commission / 100);
    const finalAmount = amountInARS - bankCommissionAmount;
    
    return {
      amountUSD,
      platformCommissionAmount,
      amountAfterPlatformCommission,
      amountInARS,
      bankCommissionAmount,
      finalAmount,
      platform: {
        name: platform.name,
        commission: platform.total_commission / 100,
        rate: bank.rate
      },
      bank
    };
  }, [amount, selectedPlatform, selectedBank, fintechs, fintechsArg]);

  const formatCurrency = (value: number, currency: string) => {
    return new Intl.NumberFormat('es-AR', { style: 'currency', currency }).format(value);
  };

  return (
    <div className="min-h-screen relative bg-white">
      <div className="relative z-10 min-h-screen">
        <LastUpdated />
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="flex flex-col items-center mb-12">
            <h1 className="text-6xl font-sans font-black text-primary mb-4">
              ACH to ARS
            </h1>
            <p className="text-gray-900 text-lg text-center">
              Compará las mejores tasas para recibir pagos del exterior.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-8">
              <Calculator
                paymentPlatforms={fintechs.map(f => ({
                  uuid: f.uuid,
                  name: f.name,
                  commission: f.total_commission / 100,
                  rate: 1200,
                  logo: f.logo
                }))}
                argentineBanks={fintechsArg}
                amount={amount}
                setAmount={setAmount}
                selectedPlatform={selectedPlatform}
                setSelectedPlatform={setSelectedPlatform}
                selectedBank={selectedBank}
                setSelectedBank={setSelectedBank}
                calculation={calculation}
                formatCurrency={formatCurrency}
              />
            </div>

            <div className="space-y-8">
              <Fintechs
                argentineBanks={fintechsArg}
                calculation={calculation}
                formatCurrency={formatCurrency}
                paymentPlatforms={fintechs.map(f => ({
                  uuid: f.uuid,
                  name: f.name,
                  commission: f.total_commission / 100,
                  rate: f.rate,
                  logo: f.logo
                }))}
                amount={Number(amount)}
              />
            </div> 
          </div> 
        </div>
      <footer className="text-center text-gray-500 text-sm py-4">
        Made with ❤️ by <a href="https://www.x.com/srocher_dev" target="_blank" className="text-primary underline">Sofía Rocher.</a>
        <p className="text-gray-500 text-xs mt-2">
          Las comisiones son aproximadas y pueden variar según la empresa. <br /> Gracias a <a href="https://www.criptoya.com/" target="_blank" className="text-primary underline">Criptoya</a> por los datos del cambio ARS/USD en tiempo real.
        </p>
      </footer>
      </div>
    </div>
  );
}

