import useSelector from './internal/useSelector';

export default function useDirectLineAppServiceExtensionResponse(): readonly [string | undefined] {
  return Object.freeze([
    useSelector(({ directLineAppServiceExtensionStatus: { reason, status } }) =>
      status === 'ready' ? reason : undefined
    )
  ]);
}
