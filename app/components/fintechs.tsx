'use client';

import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";

interface Bank {
  id: string;
  name: string;
  commission: number;
  logo: string;
}

interface Calculation {
  amountInARS: number;
}

interface VirtualBanksProps {
  paymentPlatforms: Bank[];
  argentineBanks: Bank[];
  calculation: Calculation | null;
  formatCurrency: (value: number, currency: string) => string;
  amount: number;
}

export default function Fintechs({ paymentPlatforms, argentineBanks, calculation, formatCurrency, amount }: VirtualBanksProps) {
  return (
    <Card className="p-6 text-primary">
      <h3 className="text-xl font-semibold mb-4 ">Comparativa</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Fintech</TableHead>
            <TableHead>Comisión</TableHead>
            <TableHead>Monto Final</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paymentPlatforms.map((platform) => {
            const platformCalculation = calculation ? {
              ...calculation,
              platform: platform,
              platformCommissionAmount: amount * platform.commission,
              finalAmount: amount * (1 - platform.commission)
            } : null;

            return (
              <TableRow key={platform.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Image src={platform.logo} alt={platform.name} width={16} height={16} />
                    {platform.name}
                  </div>
                </TableCell>
                <TableCell>{(platform.commission * 100).toFixed(2)}%</TableCell>
                <TableCell>
                  {platformCalculation
                    ? formatCurrency(platformCalculation.finalAmount, 'USD')
                    : '-'}
                </TableCell>
              </TableRow>
            );
          })}
          {argentineBanks.map((bank) => {
            const bankCalculation = calculation ? {
              ...calculation,
              bank: bank,
              bankCommissionAmount: calculation.amountInARS * bank.commission,
              finalAmount: calculation.amountInARS * (1 - bank.commission)
            } : null;

            return (
              <TableRow key={bank.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Image src={bank.logo} alt={bank.name} width={16} height={16} />
                    {bank.name}
                  </div>
                </TableCell>
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
  );
}
