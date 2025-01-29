import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL as string;
const supabaseKey = process.env.SUPABASE_KEY as string;

const supabase = createClient(supabaseUrl, supabaseKey);

async function updateFintechs(): Promise<void> {
  try {
    const { data, error } = await supabase
      .from('fintechs_arg')
      .update({ last_updated: new Date().toISOString() }) 

    if (error) {
      throw new Error(`Error actualizando datos: ${error.message}`);
    }

    console.log('Datos actualizados:', data);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

updateFintechs();