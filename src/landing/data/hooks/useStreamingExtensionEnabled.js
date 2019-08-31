import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import disableStreamingExtension from '../action/disableStreamingExtension';
import enableStreamingExtension from '../action/enableStreamingExtension';

export default function useStreamingExtensionEnabled() {
  const dispatch = useDispatch();

  return [
    useSelector(({ streamingExtensionEnabled }) => streamingExtensionEnabled),
    useCallback(value => dispatch(value ? enableStreamingExtension() : disableStreamingExtension()), [dispatch])
  ];
}
