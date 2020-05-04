import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import setVersion from '../action/setVersion';

export default function useVersion() {
  const dispatch = useDispatch();

  return [useSelector(({ version }) => version), useCallback(value => dispatch(setVersion(value)), [dispatch])];
}
