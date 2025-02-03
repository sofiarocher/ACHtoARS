import { Input } from "@/components/ui/input";
import { DollarSign } from "lucide-react";

export const InputAmount = ({ amount, setAmount }: { 
    amount: string; 
    setAmount: (value: string) => void 
  }) => (
    <div className="space-y-2">
      <label className="text-sm font-medium">Monto en USD</label>
      <div className="relative">
        <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground text-orange-600" />
        <Input
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="pl-10"
          placeholder="1000"
        />
      </div>
    </div>
  );