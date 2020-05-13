import { call, put, select, takeEvery } from 'redux-saga/effects';
import { GENERATE_DIRECT_LINE_TOKEN } from '../action/generateDirectLineToken';

import generateDirectLineToken from '../../util/generateDirectLineToken';
import setDirectLineToken from '../action/setDirectLineToken';

export default function* generateDirectLineTokenSaga() {
  yield takeEvery(GENERATE_DIRECT_LINE_TOKEN, function* () {
    const { appServiceExtensionEnabled, domainHost, secret } = yield select(
      ({ directLineCredentials: { domainHost, secret }, appServiceExtensionEnabled }) => ({
        appServiceExtensionEnabled,
        domainHost,
        secret
      })
    );

    const domain =
      appServiceExtensionEnabled && domainHost
        ? /^localhost[:\/]/.test(domainHost)
          ? `http://${domainHost}/${appServiceExtensionEnabled ? '.bot/' : ''}v3/directline`
          : `https://${domainHost}/${appServiceExtensionEnabled ? '.bot/' : ''}v3/directline`
        : 'https://directline.botframework.com/v3/directline';

    const { token } = yield call(generateDirectLineToken, { domain, secret });

    yield put(setDirectLineToken(token));
  });
}
