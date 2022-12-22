import type { Action } from 'redux';

export type ActionWithPayload<T extends string, P> = Action<T> & { payload: P };
