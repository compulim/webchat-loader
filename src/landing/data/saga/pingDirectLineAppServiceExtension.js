import { call, put, takeLatest } from 'redux-saga/effects';

import { PING_DIRECT_LINE_APP_SERVICE_EXTENSION } from '../action/pingDirectLineAppServiceExtension';
import getDomainURL from '../../../common/util/getDomainURL';
import setDirectLineAppServiceExtensionStatus from '../action/setDirectLineAppServiceExtensionStatus';

export default function* pingDirectLineAppServiceExtensionSaga() {
  yield takeLatest(PING_DIRECT_LINE_APP_SERVICE_EXTENSION, function* ({ payload: { domainHost, protocol } }) {
    const abortController = new AbortController();

    try {
      yield put(setDirectLineAppServiceExtensionStatus('checking'));

      const res = yield call(fetch, new URL('..', getDomainURL(domainHost, protocol)), {
        signal: abortController.signal
      });

      if (!res.ok) {
        throw new Error(`Direct Line App Service Extension returned ${res.status}.`);
      }

      const response = yield call([res, res.json]);
      const { ib, initialized, k, ob } = response;

      if (!initialized) {
        throw new Error('Direct Line App Service Extension adapter is unavailable.');
      } else if (!k) {
        throw new Error('Direct Line App Service Extension adapter is not properly configured.');
      } else if (!ib || !ob) {
        throw new Error('Direct Line App Service Extension adapter could not connect to the bot.');
      }

      yield put(setDirectLineAppServiceExtensionStatus('ready', response));
    } catch (err) {
      abortController.abort();

      yield put(setDirectLineAppServiceExtensionStatus('error', err.message));
    }
  });
}
