import { useEffect, useState } from "react";

export const useDebounce = (val: string, delay: number) => {
  const [debouncedVal, setDebouncedVal] = useState<string>(val);

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedVal(val), delay);

    return () => clearTimeout(timeout);
  }, [val, delay]);

  return debouncedVal;
};
