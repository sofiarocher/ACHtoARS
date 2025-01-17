import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";

export const createClient = async (cookieStore: ReturnType<typeof cookies>) => {
  const cookies = await cookieStore;
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '',
    {
      cookies: {
        get(name: string) {
          return cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookies.set(name, value, options);
          } catch (error) {
            console.warn('Cookie setting failed:', error);
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookies.set(name, '', { ...options, maxAge: 0 });
          } catch (error) {
            console.warn('Cookie removal failed:', error);
          }
        },
      },
    }
  );
};
