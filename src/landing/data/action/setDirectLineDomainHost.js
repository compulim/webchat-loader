const SET_DIRECT_LINE_DOMAIN_HOST = 'SET_DIRECT_LINE_DOMAIN_HOST';

export default function setDirectLineDomainHost(host) {
  return {
    payload: { host },
    type: SET_DIRECT_LINE_DOMAIN_HOST
  };
}

export { SET_DIRECT_LINE_DOMAIN_HOST }
