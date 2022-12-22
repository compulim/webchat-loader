export default function readOnlyFixedArray<T>(array: [T]): readonly [T] {
  return Object.freeze(array);
}
