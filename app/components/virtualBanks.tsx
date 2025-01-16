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

interface Bank {
  id: string;
  name: string;
  commission: number;
}

interface Calculation {
  amountInARS: number;
}

interface VirtualBanksProps {
  argentineBanks: Bank[];
  calculation: Calculation | null;
  formatCurrency: (value: number, currency: string) => string;
}

export default function VirtualBanks({ argentineBanks, calculation, formatCurrency }: VirtualBanksProps) {
  return (
    <Card className="p-6 bg-black text-primary-foreground">
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
  );
}
