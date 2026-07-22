import { useState, useCallback } from "react";

type Setter<T> = (value: T | ((prev: T) => T)) => void;

export function useLocalStorage<T>(key: string, initialValue: T): [T, Setter<T>] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      setStoredValue((prev) => {
        const resolvedValue = typeof value === "function" ? (value as (prev: T) => T)(prev) : value;
        // Write to localStorage synchronously
        try {
          window.localStorage.setItem(key, JSON.stringify(resolvedValue));
        } catch {
          // Silently fail if storage is full
        }
        return resolvedValue;
      });
    },
    [key]
  );

  return [storedValue, setValue];
}

