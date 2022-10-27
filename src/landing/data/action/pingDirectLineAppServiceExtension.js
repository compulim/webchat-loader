const PING_DIRECT_LINE_APP_SERVICE_EXTENSION = 'PING_DIRECT_LINE_APP_SERVICE_EXTENSION';

export default function pingDirectLineAppServiceExtension(domainHost, protocol) {
  return {
    payload: { domainHost, protocol },
    type: PING_DIRECT_LINE_APP_SERVICE_EXTENSION
  };
}

export { PING_DIRECT_LINE_APP_SERVICE_EXTENSION };
