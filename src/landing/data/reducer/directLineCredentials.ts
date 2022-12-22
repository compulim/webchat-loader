import random from 'math-random';
import updateIn from 'simple-update-in';

import caseInsensitiveCompare from '../../util/caseInsensitiveCompare';

import { REMOVE_SAVED_DIRECT_LINE_SECRET } from '../action/removeSavedDirectLineSecret';
import { SAVE_DIRECT_LINE_SECRET } from '../action/saveDirectLineSecret';
import { SET_CONVERSATION_ID } from '../action/setConversationId';
import { SET_DIRECT_LINE_DOMAIN_HOST } from '../action/setDirectLineDomainHost';
import { SET_DIRECT_LINE_SECRET } from '../action/setDirectLineSecret';
import { SET_DIRECT_LINE_TOKEN } from '../action/setDirectLineToken';
import { SET_DIRECT_LINE_USER_ID } from '../action/setDirectLineUserId';

import type removeSavedDirectLineSecret from '../action/removeSavedDirectLineSecret';
import type saveDirectLineSecret from '../action/saveDirectLineSecret';
import type setConversationId from '../action/setConversationId';
import type setDirectLineDomainHost from '../action/setDirectLineDomainHost';
import type setDirectLineSecret from '../action/setDirectLineSecret';
import type setDirectLineToken from '../action/setDirectLineToken';
import type setDirectLineUserId from '../action/setDirectLineUserId';

type RemoveSavedDirectLineSecretAction = ReturnType<typeof removeSavedDirectLineSecret>;
type SaveDirectLineSecretAction = ReturnType<typeof saveDirectLineSecret>;
type SetConversationIdAction = ReturnType<typeof setConversationId>;
type SetDirectLineDomainHostAction = ReturnType<typeof setDirectLineDomainHost>;
type SetDirectLineSecretAction = ReturnType<typeof setDirectLineSecret>;
type SetDirectLineTokenAction = ReturnType<typeof setDirectLineToken>;
type SetDirectLineUserIdAction = ReturnType<typeof setDirectLineUserId>;

type State = {
  conversationId: string;
  domainHost: string;
  savedSecrets: string[];
  secret: string;
  token: string;
  tokenURL: string;
  userId: string;
};

const DEFAULT_STATE: State = {
  conversationId: '',
  domainHost: 'webchat-mockbot-se.azurewebsites.net',
  savedSecrets: [],
  secret: '',
  token: '',
  tokenURL: '',
  userId: `r_${random().toString(36).substr(2, 10)}`
};

type DirectLineCredentialsAction =
  | RemoveSavedDirectLineSecretAction
  | SaveDirectLineSecretAction
  | SetConversationIdAction
  | SetDirectLineDomainHostAction
  | SetDirectLineSecretAction
  | SetDirectLineTokenAction
  | SetDirectLineUserIdAction;

export default function directLineCredentials(
  state: State = DEFAULT_STATE,
  { payload, type }: DirectLineCredentialsAction
): State {
  if (type === REMOVE_SAVED_DIRECT_LINE_SECRET) {
    const { secret } = payload;

    state = updateIn(state, ['savedSecrets', (value: State['savedSecrets'][0]): boolean => value === secret]);
  } else if (type === SAVE_DIRECT_LINE_SECRET) {
    const { secret } = payload;

    state = updateIn(state, ['savedSecrets', (value: State['savedSecrets'][0]): boolean => value === secret]);
    state = updateIn(state, ['savedSecrets'], (secrets: State['savedSecrets']): State['savedSecrets'] =>
      [...secrets, secret].sort(caseInsensitiveCompare)
    );
  } else if (type === SET_CONVERSATION_ID) {
    state = updateIn(state, ['conversationId'], (): State['conversationId'] => payload.conversationId);
  } else if (type === SET_DIRECT_LINE_DOMAIN_HOST) {
    state = updateIn(state, ['domainHost'], (): State['domainHost'] => payload.host);
  } else if (type === SET_DIRECT_LINE_SECRET) {
    if (typeof payload.secret === 'string') {
      state = updateIn(state, ['secret'], (): State['secret'] => payload.secret);
    }
  } else if (type === SET_DIRECT_LINE_TOKEN) {
    state = updateIn(state, ['token'], (): State['token'] => payload.token);
  } else if (type === SET_DIRECT_LINE_USER_ID) {
    state = updateIn(state, ['userId'], (): State['userId'] => payload.userId);
  }

  return state;
}
