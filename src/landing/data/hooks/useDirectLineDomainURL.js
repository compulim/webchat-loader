import { useSelector } from 'react-redux';
import getDomainURL from '../../../common/util/getDomainURL';

export default function useDirectLineDomainURL() {
  const [domainHost, protocol] = useSelector(({ directLineCredentials: { domainHost }, protocol }) => [
    domainHost || 'directline.botframework.com',
    protocol
  ]);

  return [getDomainURL(domainHost, protocol)];
}
