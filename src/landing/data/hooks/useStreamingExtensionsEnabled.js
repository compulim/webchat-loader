import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import disableStreamingExtensions from '../action/disableStreamingExtensions';
import enableStreamingExtensions from '../action/enableStreamingExtensions';

export default function useStreamingExtensionsEnabled() {
  const dispatch = useDispatch();

  return [
    useSelector(({ streamingExtensionsEnabled }) => streamingExtensionsEnabled),
    useCallback(value => dispatch(value ? enableStreamingExtensions() : disableStreamingExtensions()), [dispatch])
  ];
}
