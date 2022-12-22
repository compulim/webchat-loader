import type { ActionWithPayload } from '../../types/ActionWithPayload';

const PING_DIRECT_LINE_APP_SERVICE_EXTENSION = 'PING_DIRECT_LINE_APP_SERVICE_EXTENSION';

export default function pingDirectLineAppServiceExtension(
  domainHost: string,
  protocol: string
): ActionWithPayload<typeof PING_DIRECT_LINE_APP_SERVICE_EXTENSION, { domainHost: string; protocol: string }> {
  return {
    payload: { domainHost, protocol },
    type: PING_DIRECT_LINE_APP_SERVICE_EXTENSION
  };
}

export { PING_DIRECT_LINE_APP_SERVICE_EXTENSION };
