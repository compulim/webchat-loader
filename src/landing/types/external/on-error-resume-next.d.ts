declare module 'on-error-resume-next' {
  export default function onErrorResumeNext<T extends (...args: any) => any>(fn: T): ReturnType<T>;
}
