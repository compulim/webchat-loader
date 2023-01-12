import { call } from 'redux-saga/effects';
import { AsyncTerminable, unzip } from 'fflate';

import { FETCH_ARTIFACT_BUNDLE_URL } from '../action/fetchArtifactBundleURL';
import promisify from '../../../common/util/promisify';
import put from './internal/put';
import takeLatest from './internal/takeLatest';
import setFetchArtifactBundleURLStatusAction from '../action/setFetchArtifactBundleURLStatus';
import setVersion from '../action/setVersion';

import type { AsyncUnzipOptions, UnzipCallback } from 'fflate';
import type fetchArtifactBundleURL from '../action/fetchArtifactBundleURL';

export default function* fetchBundleURL() {
  yield takeLatest<ReturnType<typeof fetchArtifactBundleURL>>(
    FETCH_ARTIFACT_BUNDLE_URL,
    function* ({ payload: { artifactNumber, personalAccessToken } }) {
      try {
        yield put(setFetchArtifactBundleURLStatusAction('busy:authorize'));

        const res: Response = yield call(
          fetch,
          `https://api.github.com/repos/microsoft/BotFramework-WebChat/actions/artifacts/${artifactNumber}/zip`,
          {
            headers: { authorization: `Bearer ${personalAccessToken}` }
          }
        );

        if (!res.ok) {
          let message: string;

          try {
            // @ts-ignore
            message = (yield call(res.json.bind(res))).message;
          } catch {
            throw new Error('Failed to download artifact.');
          }

          throw new Error(message);
        }

        yield put(setFetchArtifactBundleURLStatusAction('busy:download'));

        const zipArrayBuffer: ArrayBuffer = yield call(res.arrayBuffer.bind(res));

        yield put(setFetchArtifactBundleURLStatusAction('busy:extract'));

        const unzip2: (data: Uint8Array, opts: AsyncUnzipOptions, cb: UnzipCallback) => AsyncTerminable = unzip;

        const unzipBundle = promisify(
          unzip2.bind(null, new Uint8Array(zipArrayBuffer), { filter: ({ name }) => name === 'webchat-es5.js' })
        );

        const scriptArrayBuffer: Record<string, ArrayBuffer> = yield call(unzipBundle);

        if (!('webchat-es5.js' in scriptArrayBuffer)) {
          throw new Error('Cannot find "webchat-es5.js" in the artifact.');
        }

        const blobURL = URL.createObjectURL(
          new Blob([scriptArrayBuffer['webchat-es5.js']], { type: 'text/javascript' })
        );

        yield put(setFetchArtifactBundleURLStatusAction('idle:downloaded'));
        yield put(setVersion(blobURL));
      } catch (error) {
        yield put(setFetchArtifactBundleURLStatusAction('error', error instanceof Error ? error.message : ''));
      }
    }
  );
}
