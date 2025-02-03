import { formatTimestamp } from "@/utils/format-timestamp";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

export const useLastUpdate = () => {
  const [formattedDate, setFormattedDate] = useState<string>("");

  useEffect(() => {
    const fetchLastUpdate = async () => {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from("last_update")
          .select("timestamp")
          .single();

        if (error) throw error;

        const formatted = formatTimestamp(data.timestamp);
        setFormattedDate(formatted);
      } catch (error) {
        console.error("Error fetching last update:", error);
      }
    };

    fetchLastUpdate();
  }, []);

  return formattedDate;
};
