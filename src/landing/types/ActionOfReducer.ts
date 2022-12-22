import type { Reducer } from 'redux';

export type ActionOfReducer<T> = T extends Reducer<any, infer T> ? T : never;
