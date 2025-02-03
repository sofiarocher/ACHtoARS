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
import { Fintech, FintechsProps } from "@/utils/types";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";

export default function Fintechs({ 
  fintechsUsa, 
  fintechsArg, 
  calculation, 
  formatCurrency, 
  amount,
  isLoading 
}: FintechsProps & { isLoading?: boolean }) {
  const renderPlatformRow = (platform: Fintech) => {
    const platformCalculation = calculation && platform.commission !== undefined ? {
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
        <TableCell>
          {platform.commission !== undefined 
            ? `${(platform.commission * 100).toFixed(2)}%`
            : '-'}
        </TableCell>
        <TableCell>
          {platformCalculation?.finalAmount !== undefined
            ? formatCurrency(platformCalculation.finalAmount, 'USD')
            : '-'}
        </TableCell>
      </TableRow>
    );
  };

  const renderBankRow = (bank: Fintech) => {
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
  };

  const renderSkeletonRows = (count: number) => (
    Array(count).fill(0).map((_, index) => (
      <TableRow key={index}>
        <TableCell>
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-24" />
          </div>
        </TableCell>
        <TableCell><Skeleton className="h-4 w-16" /></TableCell>
        <TableCell><Skeleton className="h-4 w-20" /></TableCell>
      </TableRow>
    ))
  );

  return (
    <Card className="p-6 text-primary">
      <h3 className="text-xl font-semibold mb-4">Comparativa</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Fintech</TableHead>
            <TableHead>Comisión Total</TableHead>
            <TableHead>Monto Final</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            renderSkeletonRows(6)
          ) : (
            <>
              {fintechsUsa.map(renderPlatformRow)}
              {fintechsArg.map(renderBankRow)}
            </>
          )}
        </TableBody>
      </Table>
    </Card>
  );
}
