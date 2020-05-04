import random from 'math-random';
import updateIn from 'simple-update-in';

import caseInsensitiveCompare from '../../util/caseInsensitiveCompare';

import { SET_CONVERSATION_ID } from '../action/setConversationId';
import { SET_DIRECT_LINE_DOMAIN_HOST } from '../action/setDirectLineDomainHost';
import { SET_DIRECT_LINE_SECRET } from '../action/setDirectLineSecret';
import { SET_DIRECT_LINE_TOKEN } from '../action/setDirectLineToken';
import { SET_DIRECT_LINE_USER_ID } from '../action/setDirectLineUserId';
import { SAVE_DIRECT_LINE_SECRET } from '../action/saveDirectLineSecret';
import { REMOVE_SAVED_DIRECT_LINE_SECRET } from '../action/removeSavedDirectLineSecret';

const DEFAULT_STATE = {
  conversationId: '',
  domainHost: 'webchat-mockbot-se.azurewebsites.net',
  savedSecrets: [],
  secret: '',
  token: '',
  tokenURL: '',
  userId: `r_${random().toString(36).substr(2, 10)}`
};

export default function directLineCredentials(state = DEFAULT_STATE, { payload, type }) {
  if (type === REMOVE_SAVED_DIRECT_LINE_SECRET) {
    const { secret } = payload;

    state = updateIn(state, ['savedSecrets', value => value === secret]);
  } else if (type === SAVE_DIRECT_LINE_SECRET) {
    const { secret } = payload;

    state = updateIn(state, ['savedSecrets', value => value === secret]);
    state = updateIn(state, ['savedSecrets'], secrets => [...secrets, secret].sort(caseInsensitiveCompare));
  } else if (type === SET_CONVERSATION_ID) {
    state = updateIn(state, ['conversationId'], () => payload.conversationId);
  } else if (type === SET_DIRECT_LINE_DOMAIN_HOST) {
    state = updateIn(state, ['domainHost'], () => payload.host);
  } else if (type === SET_DIRECT_LINE_SECRET) {
    if (typeof payload.secret === 'string') {
      state = updateIn(state, ['secret'], () => payload.secret);
    }
  } else if (type === SET_DIRECT_LINE_TOKEN) {
    state = updateIn(state, ['token'], () => payload.token);
  } else if (type === SET_DIRECT_LINE_USER_ID) {
    state = updateIn(state, ['userId'], () => payload.userId);
  }

  return state;
}
