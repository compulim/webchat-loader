export type ResultOfPromise<T> = T extends Promise<infer R> ? R : never;
