import { fork, put, select, takeEvery } from 'redux-saga/effects';

import { SET_DIRECT_LINE_DOMAIN_HOST } from '../action/setDirectLineDomainHost';
import { SET_PROTOCOL_APP_SERVICE_EXTENSION } from '../action/setProtocolAppServiceExtension';
import { SET_PROTOCOL_APP_SERVICE_EXTENSION_INSECURE } from '../action/setProtocolAppServiceExtensionInsecure';
import pingDirectLineAppServiceExtension from '../action/pingDirectLineAppServiceExtension';

function* dispatchPingDirectLineAppServiceExtension() {
  const [domainHost, protocol] = yield select(({ directLineCredentials: { domainHost }, protocol }) => [
    domainHost,
    protocol
  ]);

  if (domainHost && (protocol === 'app service extension' || protocol === 'app service extension insecure')) {
    yield put(pingDirectLineAppServiceExtension(domainHost, protocol));
  }
}

export default function* pingDirectLineAppServiceExtensionOnChangeSaga() {
  yield takeEvery(
    ({ type }) =>
      type === SET_DIRECT_LINE_DOMAIN_HOST ||
      type === SET_PROTOCOL_APP_SERVICE_EXTENSION ||
      type === SET_PROTOCOL_APP_SERVICE_EXTENSION_INSECURE,
    dispatchPingDirectLineAppServiceExtension
  );

  yield fork(dispatchPingDirectLineAppServiceExtension);
}
