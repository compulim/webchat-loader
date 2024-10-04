import { useCallback } from 'react';
import { useRefFrom } from 'use-ref-from';

import saveStyleOptionsContent from '../action/saveStyleOptionsContent';
import useDispatch from './internal/useDispatch';
import useSelector from './internal/useSelector';

export default function useStyleOptionsContent(): readonly [
  string,
  (content: string) => void,
  ReturnType<typeof useRefFrom<string>>
] {
  const dispatch = useDispatch();
  const value = useSelector(({ styleOptions: { content } }) => content || '');
  const valueRef = useRefFrom(value);

  return Object.freeze([
    value,
    useCallback((content: string) => dispatch(saveStyleOptionsContent(content)), [dispatch]),
    valueRef
  ]);
}
