import { useCallback, useState } from 'react';
import onErrorResumeNext from 'on-error-resume-next';

export default function useStateWithLocalStorage(
  initialValue,
  storageKey,
  { hydrate = JSON.parse, dehydrate = JSON.stringify } = {}
) {
  const [value, setter] = useState(() => {
    const loadedValue = onErrorResumeNext(() => hydrate(window.localStorage.getItem(storageKey)));

    return typeof loadedValue === 'undefined' ? initialValue : loadedValue;
  });

  return [
    value,
    useCallback(
      nextValue => {
        setter(nextValue);
        window.localStorage.setItem(storageKey, dehydrate(nextValue));
      },
      [setter]
    )
  ];
}
