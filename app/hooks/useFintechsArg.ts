import { createClient } from '@supabase/supabase-js';
import { useState, useEffect } from 'react';

interface Fintech {
  uuid: string;
  name: string;
  logo: string;
  receipt_commission: number;
  send_commission: number;
  commission: number;
  rate: number;
}

interface UseFintechsArgReturn {
  fintechsArg: Fintech[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export function useFintechsArg(): UseFintechsArgReturn {
  const [fintechsArg, setFintechsArg] = useState<Fintech[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const fetchFintechs = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const { data, error: supabaseError } = await supabase
            .from('fintechs_arg')
        .select('*');

      if (supabaseError) {
        throw new Error(supabaseError.message);
      }

      setFintechsArg(data || []);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Error desconocido'));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFintechs();
  }, []);

  return {
    fintechsArg,
    isLoading,
    error,
    refetch: fetchFintechs
  };
}