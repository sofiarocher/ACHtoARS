import { createClient } from '@supabase/supabase-js';

export default async function Fintechs() {
  try {
    // Crear cliente directamente
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    
    console.log('Realizando consulta directa...');
    
    // Consulta con más detalles
    const { data, error, status, statusText } = await supabase
      .from('fintechs_usa')
      .select('*')
      .throwOnError();
    
    console.log('Resultado completo:', { data, error, status, statusText });

    if (error) {
      throw error;
    }

    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Fintechs USA</h1>
        <div className="bg-white shadow-md rounded p-4">
          {data && data.length > 0 ? (
            <ul className="space-y-2">
              {data.map((fintech) => (
                <li key={fintech.uuid} className="border-b py-2">
                  <strong>{fintech.name}</strong>
                  <p>Comisión total: ${fintech.total_commission}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No se encontraron fintechs</p>
          )}
        </div>
        
        {/* Debug info extendido */}
        <pre className="mt-4 p-4 bg-gray-100 rounded">
          {JSON.stringify({ 
            data,
            error,
            status,
            statusText,
            supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
            hasSupabaseKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
            timestamp: new Date().toISOString()
          }, null, 2)}
        </pre>
      </div>
    );
  } catch (error) {
    console.error('Error en la página:', error);
    return (
      <div className="p-4">
        <div>Error al cargar los datos: {(error as Error).message}</div>
        <pre className="mt-4 p-4 bg-red-100 rounded">
          {JSON.stringify(error, null, 2)}
        </pre>
      </div>
    );
  }
}
