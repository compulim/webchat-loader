const SET_DIRECT_LINE_APP_SERVICE_EXTENSION_STATUS = 'SET_DIRECT_LINE_APP_SERVICE_EXTENSION_STATUS';

export default function setDirectLineAppServiceExtensionStatus(status, reason) {
  return {
    payload: {
      reason: status === 'error' ? reason : undefined,
      status: status === 'error' || status === 'ready' ? status : 'checking'
    },
    type: SET_DIRECT_LINE_APP_SERVICE_EXTENSION_STATUS
  };
}

export { SET_DIRECT_LINE_APP_SERVICE_EXTENSION_STATUS };
