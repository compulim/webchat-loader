import type { Action } from 'redux';

const SET_FETCH_ARTIFACT_BUNDLE_URL_STATUS = 'SET_FETCH_ARTIFACT_BUNDLE_URL_STATUS';

type SetFetchArtifactBundleURLStatusAction = Action<typeof SET_FETCH_ARTIFACT_BUNDLE_URL_STATUS> & {
  payload: {
    reason?: string;
    status: 'busy:authorize' | 'busy:download' | 'busy:extract' | 'error' | 'idle:downloaded' | 'idle:initial';
  };
};

export default function setFetchArtifactBundleURLStatusAction(
  status: 'error',
  reason: string
): SetFetchArtifactBundleURLStatusAction;

export default function setFetchArtifactBundleURLStatusAction(
  status: 'busy:authorize' | 'busy:download' | 'busy:extract' | 'idle:downloaded' | 'idle:initial'
): SetFetchArtifactBundleURLStatusAction;

export default function setFetchArtifactBundleURLStatusAction(
  status: 'busy:authorize' | 'busy:download' | 'busy:extract' | 'error' | 'idle:downloaded' | 'idle:initial',
  reason?: string
): SetFetchArtifactBundleURLStatusAction {
  return { payload: { reason, status }, type: SET_FETCH_ARTIFACT_BUNDLE_URL_STATUS };
}

export { SET_FETCH_ARTIFACT_BUNDLE_URL_STATUS };
