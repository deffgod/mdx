import { useEffect, useState } from 'react';

/**
 * Hook to check if component is mounted.
 * Useful for avoiding hydration issues with SSR.
 */
export function useMounted(): boolean {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted;
}