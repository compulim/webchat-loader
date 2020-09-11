import { call, put, select, takeEvery } from 'redux-saga/effects';

import { REFRESH_DIRECT_LINE_TOKEN } from '../action/refreshDirectLineToken';
import refreshDirectLineToken from '../../util/refreshDirectLineToken';
import setDirectLineToken from '../action/setDirectLineToken';

export default function* refreshDirectLineTokenSaga() {
  yield takeEvery(REFRESH_DIRECT_LINE_TOKEN, function* () {
    try {
      const { domainHost, protocol, token } = yield select(
        ({ directLineCredentials: { domainHost, token }, protocol }) => ({
          domainHost,
          protocol,
          token
        })
      );

      if (!token) {
        return;
      }

      const isAppServiceExtension = protocol === 'app service extension';

      const domain =
        isAppServiceExtension && domainHost
          ? /^localhost[:\/]/.test(domainHost)
            ? `http://${domainHost}/${isAppServiceExtension ? '.bot/' : ''}v3/directline`
            : `https://${domainHost}/${isAppServiceExtension ? '.bot/' : ''}v3/directline`
          : 'https://directline.botframework.com/v3/directline';

      const { token: refreshedToken } = yield call(refreshDirectLineToken, { domain, token });

      yield put(setDirectLineToken(refreshedToken));
    } catch (err) {
      console.error(err);
    }
  });
}
