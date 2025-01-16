'use client';

import { useState, useMemo } from 'react';
import { Calculator, DollarSign } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
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
            <Card className="p-6 backdrop-blur-sm bg-card/50">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Monto en USD</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                    <Input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="pl-10"
                      placeholder="1000"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Plataforma de Pago (USD)</label>
                  <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar plataforma" />
                    </SelectTrigger>
                    <SelectContent>
                      {paymentPlatforms.map((platform) => (
                        <SelectItem key={platform.id} value={platform.id}>
                          {platform.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Banco Virtual (ARS)</label>
                  <Select value={selectedBank} onValueChange={setSelectedBank}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar banco" />
                    </SelectTrigger>
                    <SelectContent>
                      {argentineBanks.map((bank) => (
                        <SelectItem key={bank.id} value={bank.id}>
                          {bank.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-primary text-primary-foreground">
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
          </div>

          <div className="space-y-8">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Comparativa de Bancos</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Banco</TableHead>
                    <TableHead>Comisión</TableHead>
                    <TableHead>Monto Final</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {argentineBanks.map((bank) => {
                    const bankCalculation = calculation ? {
                      ...calculation,
                      bank: bank,
                      bankCommissionAmount: calculation.amountInARS * bank.commission,
                      finalAmount: calculation.amountInARS * (1 - bank.commission)
                    } : null;

                    return (
                      <TableRow key={bank.id}>
                        <TableCell>{bank.name}</TableCell>
                        <TableCell>{(bank.commission * 100).toFixed(2)}%</TableCell>
                        <TableCell>
                          {bankCalculation
                            ? formatCurrency(bankCalculation.finalAmount, 'ARS')
                            : '-'}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Comparativa de Plataformas</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Plataforma</TableHead>
                    <TableHead>Comisión</TableHead>
                    <TableHead>Tasa de Cambio</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paymentPlatforms.map((platform) => (
                    <TableRow key={platform.id}>
                      <TableCell>{platform.name}</TableCell>
                      <TableCell>{(platform.commission * 100).toFixed(2)}%</TableCell>
                      <TableCell>{platform.rate} ARS/USD</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

