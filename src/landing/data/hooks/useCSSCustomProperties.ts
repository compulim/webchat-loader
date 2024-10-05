import { useCallback } from 'react';
import { useRefFrom } from 'use-ref-from';

import saveCSSCustomProperties from '../action/saveCSSCustomProperties';
import useDispatch from './internal/useDispatch';
import useSelector from './internal/useSelector';

export default function useCSSCustomProperties(): readonly [
  string,
  (json: string) => void,
  ReturnType<typeof useRefFrom<string>>
] {
  const dispatch = useDispatch();
  const value = useSelector(({ customization: { cssCustomProperties } }) => cssCustomProperties || '');
  const valueRef = useRefFrom(value);

  return Object.freeze([
    value,
    useCallback((content: string) => dispatch(saveCSSCustomProperties(content)), [dispatch]),
    valueRef
  ]);
}
