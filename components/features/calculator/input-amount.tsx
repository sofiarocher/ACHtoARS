import { Input } from "@/components/ui/input";
import { DollarSign } from "lucide-react";

export const InputAmount = ({ amount, setAmount }: { 
    amount: string; 
    setAmount: (value: string) => void 
  }) => (
    <div className="space-y-1.5 sm:space-y-2 text-gray">
      <label className="text-xs sm:text-sm font-medium">Monto en USD</label>
      <div className="relative">
        <DollarSign className="absolute left-3 top-2.5 h-3.5 w-3.5 sm:h-4 sm:w-4" />
        <Input
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="pl-9 sm:pl-10 border border-green bg-green/20 h-9 sm:h-10 text-sm sm:text-base"
          placeholder="1000"
        />
      </div>
    </div>
  );