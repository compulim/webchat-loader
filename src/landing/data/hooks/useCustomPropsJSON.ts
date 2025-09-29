import { useCallback } from 'react';
import { useRefFrom } from 'use-ref-from';

import saveCustomPropsJSON from '../action/saveCustomPropsJSON';
import useDispatch from './internal/useDispatch';
import useSelector from './internal/useSelector';

export default function useCustomPropsJSON(): readonly [
  string,
  (json: string) => void,
  ReturnType<typeof useRefFrom<string>>
] {
  const dispatch = useDispatch();
  const value = useSelector(({ customization: { customPropsJSON } }) => customPropsJSON || '');
  const valueRef = useRefFrom(value);

  return Object.freeze([
    value,
    useCallback((content: string) => dispatch(saveCustomPropsJSON(content)), [dispatch]),
    valueRef
  ]);
}
