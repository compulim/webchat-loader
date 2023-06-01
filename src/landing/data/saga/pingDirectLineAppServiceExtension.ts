import { call } from 'redux-saga/effects';

import { PING_DIRECT_LINE_APP_SERVICE_EXTENSION } from '../action/pingDirectLineAppServiceExtension';
import getDomainURL from '../../../common/util/getDomainURL';
import put from './internal/put';
import setDirectLineAppServiceExtensionStatus from '../action/setDirectLineAppServiceExtensionStatus';
import takeLatest from './internal/takeLatest';

import type { ResultOfPromise } from '../../types/ResultOfPromise';
import type pingDirectLineAppServiceExtension from '../action/pingDirectLineAppServiceExtension';

type PingDirectLineAppServiceExtensionAction = ReturnType<typeof pingDirectLineAppServiceExtension>;

export default function* pingDirectLineAppServiceExtensionSaga() {
  yield takeLatest(
    PING_DIRECT_LINE_APP_SERVICE_EXTENSION,
    function* ({ payload: { domainHost, protocol } }: PingDirectLineAppServiceExtensionAction) {
      const abortController = new AbortController();

      try {
        yield put(setDirectLineAppServiceExtensionStatus('checking'));

        const res = (yield call(fetch, new URL('..', getDomainURL(domainHost, protocol)), {
          signal: abortController.signal
        })) as ResultOfPromise<ReturnType<typeof fetch>>;

        if (!res.ok) {
          throw new Error(`Direct Line App Service Extension returned ${res.status}.`);
        }

        const responseText = (yield call([res, res.text])) as string;

        const response = JSON.parse(responseText.split(/\r?\n\r?\n/)[0]) as {
          IB: boolean;
          Initialized: boolean;
          K: boolean;
          OB: boolean;
        };

        const { IB: ib, Initialized: initialized, K: k, OB: ob } = response;

        if (!initialized) {
          throw new Error('Direct Line App Service Extension adapter is unavailable.');
        } else if (!k) {
          throw new Error('Direct Line App Service Extension adapter is not properly configured.');
        } else if (!ib || !ob) {
          throw new Error('Direct Line App Service Extension adapter could not connect to the bot.');
        }

        yield put(setDirectLineAppServiceExtensionStatus('ready', JSON.stringify(response)));
      } catch (error) {
        const message = (error as any)?.message;

        abortController.abort();

        yield put(setDirectLineAppServiceExtensionStatus('error', typeof message === 'string' ? message : ''));
      }
    }
  );
}
