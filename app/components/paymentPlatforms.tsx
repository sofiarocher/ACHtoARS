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

interface Platform {
  id: string;
  name: string;
  commission: number;
  rate: number;
}

interface PaymentPlatformsProps {
  paymentPlatforms: Platform[];
}

export default function PaymentPlatforms({ paymentPlatforms }: PaymentPlatformsProps) {
  return (
    <Card className="p-6 bg-black text-primary-foreground">
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
  );
}
