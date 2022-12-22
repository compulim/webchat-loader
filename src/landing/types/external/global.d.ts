export {};

declare global {
  interface Array<T> {
    findLast(predicate: (value: T, index: number, obj: T[]) => unknown, thisArg?: any): T | undefined;
  }

  interface ReadonlyArray<T> {
    findLast(predicate: (value: T, index: number, obj: T[]) => unknown, thisArg?: any): T | undefined;
  }

  var BUILD_TIMESTAMP: string | undefined;
}
