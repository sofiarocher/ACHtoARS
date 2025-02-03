import { Bank, Calculation, Platform } from "./types";

interface CalculateTransferParams {
  amount: number;
  platform: Platform;
  bank: Bank;
}

export function calculateTransfer({ amount, platform, bank }: CalculateTransferParams): Calculation {
  const platformCommissionAmount = amount * (platform.total_commission / 100);
  const amountAfterPlatformCommission = amount - platformCommissionAmount;
  const amountInARS = amountAfterPlatformCommission * bank.rate;
  const bankCommissionAmount = amountInARS * (bank.commission / 100);
  const finalAmount = amountInARS - bankCommissionAmount;

  return {
    amountUSD: amount,
    platformCommissionAmount,
    amountAfterPlatformCommission,
    amountInARS,
    bankCommissionAmount,
    finalAmount,
    platform: {
      name: platform.name,
      commission: platform.total_commission / 100,
      rate: bank.rate
    },
    bank
  };
} 