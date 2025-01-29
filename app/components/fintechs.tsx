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

interface Fintech {
  uuid: string;
  name: string;
  commission: number;
  logo: string;
  rate: number;
}

interface Calculation {
  amountInARS: number;
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

interface VirtualBanksProps {
  paymentPlatforms: Fintech[];
  argentineBanks: Fintech[];
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
            <TableHead>Comisión Total</TableHead>
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
              <TableRow key={platform.uuid}>
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
              amountInARS: amount * (1 - calculation.platform.commission) * bank.rate,
              finalAmount: amount * (1 - calculation.platform.commission) * bank.rate * (1 - bank.commission / 100)
            } : null;

            return (
              <TableRow key={bank.uuid}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Image src={bank.logo} alt={bank.name} width={16} height={16} />
                    {bank.name}
                  </div>
                </TableCell>
                <TableCell>{bank.commission.toFixed(2)}%</TableCell>
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
