import { useCallback, useState } from 'react';
import onErrorResumeNext from 'on-error-resume-next';

export default function useStateWithLocalStorage(initialValue, storageKey, { hydrate = JSON.parse, dehydrate = JSON.stringify } = {}) {
  const [value, setter] = useState(onErrorResumeNext(() => hydrate(window.sessionStorage.getItem(storageKey))) || initialValue);

  return [
    value,
    useCallback(nextValue => {
      setter(nextValue);
      window.sessionStorage.setItem(storageKey, dehydrate(nextValue));
    }, [setter])
  ];
}
