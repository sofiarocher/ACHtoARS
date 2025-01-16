'use client';

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { DollarSign } from 'lucide-react';

interface CalculatorProps {
  paymentPlatforms: Array<{
    id: string;
    name: string;
    commission: number;
    rate: number;
  }>;
  argentineBanks: Array<{
    id: string;
    name: string;
    commission: number;
  }>;
  amount: string;
  setAmount: (value: string) => void;
  selectedPlatform: string;
  setSelectedPlatform: (value: string) => void;
  selectedBank: string;
  setSelectedBank: (value: string) => void;
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
}: CalculatorProps) {
  return (
    <Card className="p-6 bg-black text-primary-foreground">
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
  );
}
