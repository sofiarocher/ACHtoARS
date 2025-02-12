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
    <div className="space-y-1.5 sm:space-y-2">
      <label className="text-xs sm:text-sm font-medium text-gray">{label}</label>
      {isLoading ? (
        <Skeleton className="h-9 sm:h-10 w-full" />
      ) : (
        <Select value={value} onValueChange={onChange}>
          <SelectTrigger className="h-9 sm:h-10 text-sm sm:text-base">
            <SelectValue placeholder={
              <div className="flex items-center gap-2 text-gray font-extralight">
                <Image src={flagIcon} alt={placeholder} width={14} height={14} className="sm:w-4 sm:h-4" />
                {placeholder}
              </div>
            } />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem key={option.uuid} value={option.uuid} className="text-sm sm:text-base">
                <div className="flex items-center gap-2 text-gray font-extralight">
                  <Image src={option.logo} alt={option.name} width={14} height={14} className="sm:w-4 sm:h-4" />
                  {option.name}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </div>
  );