import { useSelector } from 'react-redux';

export default function useDirectLineAppServiceExtensionResponse() {
  return [
    useSelector(({ directLineAppServiceExtensionStatus: { reason, status } }) =>
      status === 'ready' ? reason : undefined
    )
  ];
}
