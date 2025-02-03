export function formatCurrency(value: number, currency: string): string {
  return new Intl.NumberFormat('es-AR', { 
    style: 'currency', 
    currency 
  }).format(value);
} 