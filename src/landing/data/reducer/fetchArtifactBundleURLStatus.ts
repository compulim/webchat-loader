import { SET_FETCH_ARTIFACT_BUNDLE_URL_STATUS } from '../action/setFetchArtifactBundleURLStatus';

import type setFetchArtifactBundleURLStatusAction from '../action/setFetchArtifactBundleURLStatus';

type SetFetchArtifactBundleURLStatusAction = ReturnType<typeof setFetchArtifactBundleURLStatusAction>;

type FetchArtifactBundleURLStatusAction = SetFetchArtifactBundleURLStatusAction;

type State = {
  reason?: string;
  status: 'busy:authorize' | 'busy:download' | 'busy:extract' | 'error' | 'idle:downloaded' | 'idle:initial';
};

export default function protocol(
  state: State = { status: 'idle:initial' },
  { payload, type }: FetchArtifactBundleURLStatusAction
): State {
  if (type === SET_FETCH_ARTIFACT_BUNDLE_URL_STATUS) {
    state = payload;
  }

  return state;
}
