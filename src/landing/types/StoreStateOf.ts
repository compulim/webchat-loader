import type { Store } from 'redux';

export type StoreStateOf<T> = T extends Store<infer P> ? P : never;
