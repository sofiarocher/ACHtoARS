import { createClient } from '@supabase/supabase-js';

if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  throw new Error('Las variables de entorno de Supabase no están configuradas');
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function updateFintechs(): Promise<void> {
  try {
    const { data, error } = await supabase
      .from('fintechs_arg')
      .update({ last_updated: new Date().toISOString() })
      .select(); 

    if (error) {
      throw new Error(`Error actualizando datos: ${error.message}`);
    }

    if (!data || data.length === 0) {
      console.warn('No se actualizaron registros');
      return;
    }

    console.log(`Se actualizaron ${data.length} registros exitosamente`);
  } catch (error) {
    console.error('Error en updateFintechs:', error);
    process.exit(1);
  }
}

(async () => {
  try {
    await updateFintechs();
    process.exit(0);
  } catch (error) {
    console.error('Error en la ejecución principal:', error);
    process.exit(1);
  }
})();