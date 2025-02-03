export const formatTimestamp = (timestamp: string): string => {
    return new Date(timestamp).toLocaleString('es-ES', {
      year: '2-digit',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    }).replace(',', '') + ' hs';
  };