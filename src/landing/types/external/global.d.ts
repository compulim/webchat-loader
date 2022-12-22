export {};

declare global {
  interface Array<T> {
    findLast(predicate: (value: T, index: number, obj: T[]) => unknown, thisArg?: any): T | undefined;
  }

  var BUILD_DATE: string | undefined;
  var BUILD_TIME: string | undefined;
}
