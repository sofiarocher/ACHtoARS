'use client';

import { useLastUpdate } from "@/app/hooks/use-last-update";
import { Clock } from "lucide-react";

export default function LastUpdated() {
  const formattedDate = useLastUpdate();

  return (
    <div className="group fixed bottom-4 right-4 flex items-center bg-white rounded-full 
    hover:pr-4 transition-all duration-500 ease-in-out border border-black/20">
      <div className="p-2">
        <Clock className="w-4 h-4 text-black" />
      </div>
      <span
        className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-[245px] 
        transition-all duration-300 ease-in-out text-gray-600"
      >
        Actualizado el {formattedDate}
      </span>
    </div>
  );
}
