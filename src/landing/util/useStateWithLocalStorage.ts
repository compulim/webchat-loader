import { useCallback, useState } from 'react';
import onErrorResumeNext from 'on-error-resume-next';

export default function useStateWithLocalStorage<T>(
  initialValue: T,
  storageKey: string,
  {
    hydrate = JSON.parse,
    dehydrate = JSON.stringify
  }: { hydrate?: (json: string) => T; dehydrate?: (value: T) => string } = {}
): [T, (nextValue: T) => void] {
  const [value, setter] = useState<T>(() => {
    const loadedValue = onErrorResumeNext(() => hydrate(window.localStorage?.getItem?.(storageKey) || ''));

    return typeof loadedValue === 'undefined' ? initialValue : loadedValue;
  });

  return [
    value,
    useCallback(
      nextValue => {
        setter(nextValue);

        try {
          window.localStorage.setItem(storageKey, dehydrate(nextValue));
        } catch (error) {
          console.error(error);
        }
      },
      [setter]
    )
  ];
}
