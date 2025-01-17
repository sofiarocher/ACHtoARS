'use client';

import { useMemo, useState } from 'react';
import Calculator from './components/calculator';
import Fintechs from './components/fintechs';
import Branch from './components/branch';
import { useFintechsUsa } from './hooks/useFintechsUsa';

// Solo mantenemos los bancos argentinos como mock data
const argentineBanks = [
  { id: 'lemoncash', name: 'Lemon Cash', commission: 0.001, logo: 'https://comparte-entity-photos.s3.us-east-2.amazonaws.com/876b31af-c8ca-4d15-91a3-743e09e5cb85.png' },
  { id: 'belo', name: 'Belo', commission: 0.0015, logo: 'https://assets.belo.app/media/iso-favicom-belo/color/png/app-icon.png' },
  { id: 'cocoscrypto', name: 'Cocos Crypto', commission: 0.002, logo: 'https://r2.criptoya.com/logos/Cocos%20Crypto.png' },
  { id: 'takenos', name: 'Takenos', commission: 0.002, logo: 'https://play-lh.googleusercontent.com/Eao2w3R_rv5hozY4mmYlLXWENwUca2LQmOjBk1n0ueertC-Y2RpK3mUp37DAN0pd3r8=w240-h480-rw' },
  { id: 'astropay', name: 'Astropay', commission: 0.002, logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvYAL9Y1XHUhFGt0oPNDj_H0EP27xBtknh1g&s' },
];

export default function Home() {
  const [amount, setAmount] = useState<string>('1000');
  const [selectedPlatform, setSelectedPlatform] = useState<string>('wise');
  const [selectedBank, setSelectedBank] = useState<string>('galicia');
  const { fintechs } = useFintechsUsa();

  const calculation = useMemo(() => {
    const platform = fintechs.find(p => p.uuid === selectedPlatform);
    const bank = argentineBanks.find(b => b.id === selectedBank);
    
    if (!platform || !bank || !amount) return null;
    
    const amountUSD = Number(amount);
    const platformCommissionAmount = amountUSD * (platform.total_commission / 100);
    const amountAfterPlatformCommission = amountUSD - platformCommissionAmount;
    const amountInARS = amountAfterPlatformCommission * 1200;
    const bankCommissionAmount = amountInARS * bank.commission;
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
        rate: 1200
      },
      bank
    };
  }, [amount, selectedPlatform, selectedBank, fintechs]);

  const formatCurrency = (value: number, currency: string) => {
    return new Intl.NumberFormat('es-AR', { style: 'currency', currency }).format(value);
  };

  return (
    <div className="min-h-screen relative bg-white">
      <div className="relative z-10 min-h-screen">
        <Branch />
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
                  id: f.uuid,
                  name: f.name,
                  commission: f.total_commission / 100,
                  rate: 1200,
                  logo: f.logo
                }))}
                argentineBanks={argentineBanks}
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
                argentineBanks={argentineBanks}
                calculation={calculation}
                formatCurrency={formatCurrency}
                paymentPlatforms={fintechs.map(f => ({
                  id: f.uuid,
                  name: f.name,
                  commission: f.total_commission / 100,
                  rate: 1200,
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

