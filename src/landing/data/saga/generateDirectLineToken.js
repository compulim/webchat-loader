import { call, put, select, takeEvery } from 'redux-saga/effects';
import { GENERATE_DIRECT_LINE_TOKEN } from '../action/generateDirectLineToken';

import generateDirectLineToken from '../../util/generateDirectLineToken';
import setDirectLineToken from '../action/setDirectLineToken';

export default function* generateDirectLineTokenSaga() {
  yield takeEvery(GENERATE_DIRECT_LINE_TOKEN, function* () {
    const { domainHost, protocol, secret } = yield select(
      ({ directLineCredentials: { domainHost, secret }, protocol }) => ({
        domainHost,
        protocol,
        secret
      })
    );

    const isAppServiceExtension = protocol === 'app service extension';

    const domain =
      isAppServiceExtension && domainHost
        ? /^localhost[:\/]/.test(domainHost)
          ? `http://${domainHost}/${isAppServiceExtension ? '.bot/' : ''}v3/directline`
          : `https://${domainHost}/${isAppServiceExtension ? '.bot/' : ''}v3/directline`
        : 'https://directline.botframework.com/v3/directline';

    try {
      const { token } = yield call(generateDirectLineToken, { domain, secret });

      yield put(setDirectLineToken(token));
    } catch (err) {
      yield put(setDirectLineToken('<Failed to fetch token>'));
    }
  });
}
