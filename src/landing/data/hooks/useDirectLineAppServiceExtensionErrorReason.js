import { useSelector } from 'react-redux';

export default function useDirectLineAppServiceExtensionErrorReason() {
  return [
    useSelector(({ directLineAppServiceExtensionStatus: { reason, status } }) =>
      status === 'error' ? reason : undefined
    )
  ];
}
