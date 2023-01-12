import { useCallback } from 'react';

import fetchArtifactBundleURL from '../action/fetchArtifactBundleURL';
import useDispatch from './internal/useDispatch';

export default function useFetchArtifactBundleURL(): (artifactNumber: number, personalAccessToken: string) => void {
  const dispatch = useDispatch();

  return useCallback(
    (artifactNumber: number, personalAccessToken: string) =>
      dispatch(fetchArtifactBundleURL(artifactNumber, personalAccessToken)),
    [dispatch, fetchArtifactBundleURL]
  );
}
