import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";

export const SelectFintech = ({ 
    value, 
    onChange, 
    options, 
    label, 
    placeholder,
    isLoading,
    flagIcon
  }: {
    value: string | undefined; 
    onChange: (value: string) => void;
    options: Array<{ uuid: string; logo: string; name: string }>;
    label: string;
    placeholder: string;
    isLoading?: boolean;
    flagIcon: string;
  }) => (
    <div className="space-y-2">
      <label className="text-sm font-medium">{label}</label>
      {isLoading ? (
        <Skeleton className="h-10 w-full" />
      ) : (
        <Select value={value} onValueChange={onChange}>
          <SelectTrigger>
            <SelectValue placeholder={
              <div className="flex items-center gap-2">
                <Image src={flagIcon} alt={placeholder} width={16} height={16} />
                {placeholder}
              </div>
            } />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem key={option.uuid} value={option.uuid}>
                <div className="flex items-center gap-2">
                  <Image src={option.logo} alt={option.name} width={16} height={16} />
                  {option.name}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </div>
  );