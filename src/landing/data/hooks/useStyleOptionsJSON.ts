import { useCallback } from 'react';
import { useRefFrom } from 'use-ref-from';

import saveStyleOptionsJSON from '../action/saveStyleOptionsJSON';
import useDispatch from './internal/useDispatch';
import useSelector from './internal/useSelector';

export default function useStyleOptionsJSON(): readonly [
  string,
  (json: string) => void,
  ReturnType<typeof useRefFrom<string>>
] {
  const dispatch = useDispatch();
  const value = useSelector(({ customization: { styleOptionsJSON } }) => styleOptionsJSON || '');
  const valueRef = useRefFrom(value);

  return Object.freeze([
    value,
    useCallback((content: string) => dispatch(saveStyleOptionsJSON(content)), [dispatch]),
    valueRef
  ]);
}
