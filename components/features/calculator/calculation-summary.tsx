import { CalculatorIcon } from "lucide-react";
import { CalculationResult } from "@/utils/types";
import { Skeleton } from "@/components/ui/skeleton";

export const CalculationSummary = ({ 
    calculation, 
    formatCurrency,
    isLoading 
  }: {
    calculation: CalculationResult | null;
    formatCurrency: (amount: number, currency: string) => string;
    isLoading?: boolean;
  }) => (
    <>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium opacity-80">Recibirás</p>
          {isLoading ? (
            <Skeleton className="h-10 w-32 mt-1" />
          ) : (
            <h2 className="text-3xl font-bold mt-1">
              {calculation ? formatCurrency(calculation.finalAmount, "ARS") : "ARS 0"}
            </h2>
          )}
        </div>
        <CalculatorIcon className="h-8 w-8 opacity-80 text-orange-600" />
      </div>
      {isLoading ? (
        <div className="space-y-2 mt-4">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-5 w-full" />
          ))}
        </div>
      ) : calculation ? (
        <div className="text-sm space-y-2 opacity-75">
          <p>Monto original: {formatCurrency(calculation.amountUSD, "USD")}</p>
          <p>
            Comisión {calculation.platform.name}: {formatCurrency(calculation.platformCommissionAmount, "USD")} (
            {(calculation.platform.commission * 100).toFixed(2)}%)
          </p>
          <p>Tasa de cambio: ${calculation.platform.rate.toFixed(2)} ARS/USDC</p>
          <p>Monto en ARS: {formatCurrency(calculation.amountInARS, "ARS")}</p>
          <p>
            Comisión {calculation.bank.name}: {formatCurrency(calculation.bankCommissionAmount, "ARS")} (
            {calculation.bank.commission.toFixed(2)}%)
          </p>
        </div>
      ) : (
        <div className="text-sm space-y-2 text-muted-foreground opacity-75">
          <p>Monto original: USD 0</p>
          <p>Comisión: -</p>
          <p>Tasa de cambio: -</p>
          <p>Monto en ARS: ARS 0</p>
          <p>Comisión: -</p>
        </div>
      )}
    </>
  );
  