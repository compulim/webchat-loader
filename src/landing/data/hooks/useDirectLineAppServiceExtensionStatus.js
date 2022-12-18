import { useSelector } from 'react-redux';

export default function useDirectLineAppServiceExtensionStatus() {
  return [useSelector(({ directLineAppServiceExtensionStatus: { status } }) => status)];
}
