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
      <TableRow key={platform.uuid} className="hover:bg-green/20 font-extralight border-b border-green">
        <TableCell className="py-3">
          <div className="flex items-center gap-4">
            <Image src={platform.logo} alt={platform.name} width={16} height={16} />
            {platform.name}
          </div>
        </TableCell>
        <TableCell className="py-3">
          {platform.commission !== undefined 
            ? `${(platform.commission * 100).toFixed(2)}%`
            : '-'}
        </TableCell>
        <TableCell className="py-3">
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
      <TableRow key={bank.uuid} className="hover:bg-green/20 font-extralight border-b border-green">
        <TableCell className="py-3">
          <div className="flex items-center gap-4">
            <Image src={bank.logo} alt={bank.name} width={16} height={16} />
            {bank.name}
          </div>
        </TableCell>
        <TableCell className="py-3">{bank.commission.toFixed(2)}%</TableCell>
        <TableCell className="py-3">
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
          <div className="flex items-center gap-4">
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
    <Card className="p-4 sm:p-6 text-gray h-full flex flex-col justify-between">
      <div className="flex-1 overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-green text-gray text-xs sm:text-sm">
              <TableHead className="text-gray whitespace-nowrap">Fintech</TableHead>
              <TableHead className="text-gray whitespace-nowrap">Comisión</TableHead>
              <TableHead className="text-gray whitespace-nowrap">Final</TableHead>
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
      </div>
      
      <p className="mt-4 text-xs sm:text-sm font-extralight text-center text-gray/30">
        Las comisiones son aproximadas y pueden variar según la empresa.
        Gracias a <a href="https://criptoya.com/" className="text-gray/50">Criptoya</a> por los datos del cambio ARS/USDC en tiempo real.
      </p>
    </Card>
  );
}