"use client";

import Calculator from "@/components/features/calculator/calculator";
import { calculateTransfer } from "@/utils/calculate-transfer";
import { formatCurrency } from "@/utils/format-currency";
import { MappedPlatform } from "@/utils/types";
import { useMemo, useState } from "react";
import Fintechs from "../components/features/fintechs";
import Footer from "../components/layouts/footer";
import LastUpdated from "../components/layouts/last-updated";
import { useArgFintechs } from "./hooks/use-fintechs-arg";
import { useUsaFintechs } from "./hooks/use-fintechs-usa";
import Branch from "@/components/layouts/branch";

export default function Home() {
  const [amount, setAmount] = useState<string>("1000");
  const [selectedUsa, setSelectedUsa] = useState<string>("");
  const [selectedArg, setSelectedArg] = useState<string>("");
  const { fintechs, isLoading: isLoadingUsa } = useUsaFintechs();
  const { fintechsArg, isLoading: isLoadingArg } = useArgFintechs();

  const calculation = useMemo(() => {
    const platform = fintechs.find((p) => p.uuid === selectedUsa);
    const bank = fintechsArg.find((b) => b.uuid === selectedArg);

    if (!platform || !bank || !amount) return null;

    return calculateTransfer({
      amount: Number(amount),
      platform,
      bank,
    });
  }, [amount, selectedUsa, selectedArg, fintechs, fintechsArg]);

  const mappedPlatforms = useMemo(
    () =>
      fintechs.map(
        (f) =>
          ({
            uuid: f.uuid,
            name: f.name,
            commission: f.total_commission / 100,
            rate: 1200,
            logo: f.logo,
          } as MappedPlatform)
      ),
    [fintechs]
  );

  const isLoading = isLoadingUsa || isLoadingArg;

  return (
    <div className="min-h-screen flex flex-col bg-[url('/background.png')] bg-cover bg-center bg-no-repeat">
      <main className="flex-1">
        <div className="relative z-10">
          <div className="max-w-6xl mx-auto px-4 py-12">
            <LastUpdated />
            <Branch />
            <div className="flex flex-col items-center mb-12">
              <div className="relative">
                <h1 className="absolute -right-0.5 sm:-right-1 -bottom-1 text-center sm:text-6xl text-4xl font-extralight text-green select-none">
                  ACH to ARS
                </h1>
                <h2 className="relative sm:text-6xl text-4xl text-center font-extralight text-gray">
                  ACH to ARS
                </h2>
              </div>
              <p className="text-gray sm:text-sm text-xs font-light sm:font-normal text-center mt-8 sm:w-1/2">
                Dejá de perder tiempo comparando. Calculá en segundos cuánto
                recibirás en ARS por tus pagos en USD vía ACH y elegí la opción
                más conveniente.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-8">
                <Calculator
                  fintechsUsa={mappedPlatforms}
                  fintechsArg={fintechsArg}
                  amount={amount}
                  setAmount={setAmount}
                  selectedUsa={selectedUsa}
                  setSelectedUsa={setSelectedUsa}
                  selectedArg={selectedArg}
                  setSelectedArg={setSelectedArg}
                  calculation={calculation}
                  formatCurrency={formatCurrency}
                  isLoading={isLoading}
                />
              </div>

              <div className="space-y-8">
                <Fintechs
                  fintechsArg={fintechsArg}
                  calculation={calculation}
                  formatCurrency={formatCurrency}
                  fintechsUsa={mappedPlatforms}
                  amount={Number(amount)}
                  isLoading={isLoading}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
