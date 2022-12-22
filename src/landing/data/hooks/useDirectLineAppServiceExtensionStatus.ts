import useSelector from './internal/useSelector';

export default function useDirectLineAppServiceExtensionStatus(): readonly ['checking' | 'error' | 'ready'] {
  return Object.freeze([useSelector(({ directLineAppServiceExtensionStatus: { status } }) => status)]);
}
