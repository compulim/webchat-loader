import { useSelector } from 'react-redux';

import getDomainURL from '../../../common/util/getDomainURL';

import type { StoreState } from '../createStore';

export default function useDirectLineDomainURL(): readonly [URL] {
  const [domainHost, protocol] = useSelector<StoreState, [string, string]>(
    ({ directLineCredentials: { domainHost }, protocol }) => [domainHost || 'directline.botframework.com', protocol]
  );

  return Object.freeze([getDomainURL(domainHost, protocol)]);
}
