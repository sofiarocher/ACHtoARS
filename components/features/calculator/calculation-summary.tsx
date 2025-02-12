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
          <p className="text-sm font-medium opacity-80 text-gray">Recibirás</p>
          {isLoading ? (
            <Skeleton className="h-8 sm:h-10 w-28 sm:w-32 mt-1" />
          ) : (
            <h2 className="text-2xl sm:text-3xl font-medium mt-1 text-gray">
              {calculation ? formatCurrency(calculation.finalAmount, "ARS") : "ARS 0"}
            </h2>
          )}
        </div>
        <CalculatorIcon className="h-6 w-6 sm:h-8 sm:w-8 opacity-80 text-gray" />
      </div>
      {isLoading ? (
        <div className="space-y-1.5 sm:space-y-2 mt-3 sm:mt-4">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-4 sm:h-5 w-full" />
          ))}
        </div>
      ) : calculation ? (
        <div className="text-xs sm:text-sm space-y-1.5 sm:space-y-2 mt-3 sm:mt-4 opacity-75 text-gray font-extralight">
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
        <div className="text-xs sm:text-sm space-y-1.5 sm:space-y-2 mt-3 sm:mt-4 text-gray opacity-75">
          <p>Monto original: USD 0</p>
          <p>Comisión: -</p>
          <p>Tasa de cambio: -</p>
          <p>Monto en ARS: ARS 0</p>
          <p>Comisión: -</p>
        </div>
      )}
    </>
  );
  