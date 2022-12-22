import useSelector from './internal/useSelector';

export default function useDirectLineAppServiceExtensionErrorReason(): readonly [string | undefined] {
  return Object.freeze([
    useSelector(({ directLineAppServiceExtensionStatus: { reason, status } }) =>
      status === 'error' ? reason : undefined
    )
  ]);
}
