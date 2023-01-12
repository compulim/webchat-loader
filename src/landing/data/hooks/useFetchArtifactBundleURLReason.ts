import useSelector from './internal/useSelector';

export default function useFetchArtifactBundleURLReason(): readonly [string?] {
  return Object.freeze([useSelector(({ fetchArtifactBundleURLStatus: { reason } }) => reason)]);
}
