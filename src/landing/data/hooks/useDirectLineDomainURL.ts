import getDomainURL from '../../../common/util/getDomainURL';
import useSelector from './internal/useSelector';

export default function useDirectLineDomainURL(): readonly [URL] {
  const [domainHost, protocol] = useSelector(({ directLineCredentials: { domainHost }, protocol }) => [
    domainHost || 'directline.botframework.com',
    protocol
  ]);

  return Object.freeze([getDomainURL(domainHost, protocol)]);
}
