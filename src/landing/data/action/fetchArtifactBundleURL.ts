import type { Action } from 'redux';

const FETCH_ARTIFACT_BUNDLE_URL = 'FETCH_ARTIFACT_BUNDLE_URL';

type FetchArtifactBundleURLAction = Action<typeof FETCH_ARTIFACT_BUNDLE_URL> & {
  payload: { artifactNumber: number; personalAccessToken: string };
};

export default function fetchArtifactBundleURL(
  artifactNumber: number,
  personalAccessToken: string
): FetchArtifactBundleURLAction {
  return { payload: { artifactNumber, personalAccessToken }, type: FETCH_ARTIFACT_BUNDLE_URL };
}

export { FETCH_ARTIFACT_BUNDLE_URL };
