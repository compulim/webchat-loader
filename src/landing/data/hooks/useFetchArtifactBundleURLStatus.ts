import useSelector from './internal/useSelector';

export default function useFetchArtifactBundleURLStatus(): readonly [
  'busy:authorize' | 'busy:download' | 'busy:extract' | 'error' | 'idle:downloaded' | 'idle:initial'
] {
  return Object.freeze([useSelector(({ fetchArtifactBundleURLStatus: { status } }) => status)]);
}
