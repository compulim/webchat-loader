declare module 'simple-update-in' {
  export default function updateIn<S, T>(
    state: S,
    path: (string | ((value: any) => boolean))[],
    fn?: (value: T) => T
  ): S;
}
