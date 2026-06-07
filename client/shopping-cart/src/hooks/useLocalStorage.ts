import { useState } from 'react';

const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [value, setValue] = useState<T>(() => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initialValue;
  });

  const setStoredValue = (newValue: T | ((prev: T) => T)) => {
    setValue((prev) => {
      const next = typeof newValue === 'function' ? (newValue as (prev: T) => T)(prev) : newValue;
      localStorage.setItem(key, JSON.stringify(next));
      return next;
    });
  };

  return [value, setStoredValue] as const;
};

export default useLocalStorage;
