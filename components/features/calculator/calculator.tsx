"use client";

import { Card } from "@/components/ui/card";
import { CalculatorProps } from "@/utils/types";
import { CalculationSummary } from "./calculation-summary";
import { InputAmount } from "./input-amount";
import { SelectFintech } from "./select-fintech";

export default function Calculator({
  fintechsUsa,
  fintechsArg,
  amount,
  setAmount,
  selectedUsa,
  setSelectedUsa,
  selectedArg,
  setSelectedArg,
  calculation,
  formatCurrency,
}: CalculatorProps) {
  return (
    <Card className="p-4 sm:p-6 font-sans h-full">
      <div className="space-y-4 sm:space-y-6 h-full max-w-md mx-auto">
        <InputAmount amount={amount} setAmount={setAmount} />
        <SelectFintech
          value={selectedUsa}
          onChange={setSelectedUsa}
          options={fintechsUsa}
          label="Enviá desde"
          placeholder="USA"
          flagIcon="/usa.png"
        />
        <SelectFintech
          value={selectedArg}
          onChange={setSelectedArg}
          options={fintechsArg}
          label="Recibí en"
          placeholder="ARG"
          flagIcon="/arg.png"
        />
        <CalculationSummary
          calculation={calculation}
          formatCurrency={formatCurrency}
        />
      </div>
    </Card>
  );
}
