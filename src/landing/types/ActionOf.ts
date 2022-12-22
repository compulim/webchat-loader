import type { Store } from 'redux';

export type ActionOf<T> = T extends Store<unknown, infer A> ? A : never;
