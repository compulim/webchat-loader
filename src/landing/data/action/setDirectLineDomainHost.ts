import type { ActionWithPayload } from '../../types/ActionWithPayload';

const SET_DIRECT_LINE_DOMAIN_HOST = 'SET_DIRECT_LINE_DOMAIN_HOST';

export default function setDirectLineDomainHost(
  host: string
): ActionWithPayload<typeof SET_DIRECT_LINE_DOMAIN_HOST, { host: string }> {
  return {
    payload: { host },
    type: SET_DIRECT_LINE_DOMAIN_HOST
  };
}

export { SET_DIRECT_LINE_DOMAIN_HOST };
