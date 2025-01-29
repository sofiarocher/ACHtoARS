'use client';

import { createClient } from "@/utils/supabase/client";
import { Clock } from "lucide-react";
import { useEffect, useState } from "react";

export default function LastUpdated() {
  const [formattedDate, setFormattedDate] = useState<string>("");
  
  useEffect(() => {
    const fetchLastUpdate = async () => {
      const supabase = createClient();
      
      const { data, error } = await supabase
        .from("last_update")
        .select("timestamp")
        .single();

      if (error) {
        console.error("Error fetching last update:", error);
        return;
      }

      const formatted = new Date(data.timestamp).toLocaleString('es-ES', {
        year: '2-digit',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      }).replace(',', '') + ' hs';
      
      setFormattedDate(formatted);
    };

    fetchLastUpdate();
  }, []);

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
