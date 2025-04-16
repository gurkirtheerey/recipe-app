import { useEffect, useState } from 'react';

/**
 * This hook is used to get the window size. (Used for mobile detection/sidebar toggle)
 * @returns The window size.
 */
export function useWindow() {
  const [size, setSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1024,
    height: typeof window !== 'undefined' ? window.innerHeight : 768,
  });

  useEffect(() => {
    function handleResize() {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener('resize', handleResize);
    handleResize(); // set initial size

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return size;
}
