"use client";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalculatorIcon, DollarSign } from "lucide-react";
import Image from "next/image";

interface CalculatorProps {
  paymentPlatforms: Array<{
    id: string;
    name: string;
    commission: number;
    rate: number;
    logo: string;
  }>;
  argentineBanks: Array<{
    id: string;
    name: string;
    commission: number;
    logo: string;
  }>;
  amount: string;
  setAmount: (value: string) => void;
  selectedPlatform: string;
  setSelectedPlatform: (value: string) => void;
  selectedBank: string;
  setSelectedBank: (value: string) => void;
  calculation: CalculationResult | null;
  formatCurrency: (value: number, currency: string) => string;
}

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

export default function Calculator({
  paymentPlatforms,
  argentineBanks,
  amount,
  setAmount,
  selectedPlatform,
  setSelectedPlatform,
  selectedBank,
  setSelectedBank,
  calculation,
  formatCurrency,
}: CalculatorProps) {
  return (
    <Card className="p-6 bg-white text-primary font-sans">
      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Monto en USD</label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground text-orange-600" />
            <Input
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="pl-10"
              placeholder="1000"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">
            Envía desde
          </label>
          <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar plataforma" />
            </SelectTrigger>
            <SelectContent>
              {paymentPlatforms.map((platform) => (
                <SelectItem key={platform.id} value={platform.id}>
                  <div className="flex items-center gap-2">
                    <Image src={platform.logo} alt={platform.name} width={16} height={16} />
                    {platform.name}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Recibe en</label>
          <Select value={selectedBank} onValueChange={setSelectedBank}>
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar banco" />
            </SelectTrigger>
            <SelectContent>
              {argentineBanks.map((bank) => (
                <SelectItem key={bank.id} value={bank.id}>
                  <div className="flex items-center gap-2">
                    <Image src={bank.logo} alt={bank.name} width={16} height={16} />
                    {bank.name}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium opacity-80">Recibirás</p>
            <h2 className="text-3xl font-bold mt-1">
              {calculation
                ? formatCurrency(calculation.finalAmount, "ARS")
                : "ARS 0"}
            </h2>
          </div>
          <CalculatorIcon className="h-8 w-8 opacity-80 text-orange-600" />
        </div>
        {calculation && (
          <div className="text-sm space-y-2">
            <p>
              Monto original: {formatCurrency(calculation.amountUSD, "USD")}
            </p>
            <p>
              Comisión {calculation.platform.name}:{" "}
              {formatCurrency(calculation.platformCommissionAmount, "USD")} (
              {(calculation.platform.commission * 100).toFixed(2)}%)
            </p>
            <p>Tasa de cambio: {calculation.platform.rate} ARS/USD</p>
            <p>
              Monto en ARS: {formatCurrency(calculation.amountInARS, "ARS")}
            </p>
            <p>
              Comisión {calculation.bank.name}:{" "}
              {formatCurrency(calculation.bankCommissionAmount, "ARS")} (
              {(calculation.bank.commission * 100).toFixed(2)}%)
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}
