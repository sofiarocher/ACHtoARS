import { createClient } from "@supabase/supabase-js";
import { useState, useEffect, useCallback } from "react";
import { Fintech, FintechUsa } from "@/utils/types";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export function useUsaFintechs(): FintechUsa {
  const [fintechs, setFintechs] = useState<Fintech[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchFintechs = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const { data, error: supabaseError } = await supabase
        .from("fintechs_usa")
        .select("*")

      if (supabaseError) {
        throw new Error(supabaseError.message);
      }

      setFintechs(data ?? []);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Error desconocido"));
    } finally {
      setIsLoading(false);
    }
  };

  const refetch = useCallback(fetchFintechs, []);

  useEffect(() => {
    fetchFintechs();
  }, []);

  return {
    fintechs,
    isLoading,
    error,
    refetch,
  };
}
