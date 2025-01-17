import { createClient } from '@supabase/supabase-js';
import { useState, useEffect } from 'react';

interface Fintech {
  uuid: string;
  name: string;
  logo: string;
  receipt_commission: number;
  send_commission: number;
  total_commission: number;
}

interface UseFintechsUsaReturn {
  fintechs: Fintech[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export function useFintechsUsa(): UseFintechsUsaReturn {
  const [fintechs, setFintechs] = useState<Fintech[]>([]);
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
        .from('fintechs_usa')
        .select('*');

      if (supabaseError) {
        throw new Error(supabaseError.message);
      }

      setFintechs(data || []);
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
    fintechs,
    isLoading,
    error,
    refetch: fetchFintechs
  };
}
