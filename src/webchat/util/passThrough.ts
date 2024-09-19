import { Observable, type SubscriptionObserver } from 'iter-fest/observable';

export default function passThrough<T>(observable: Observable<T>, modifier?: (value: T) => T): Observable<T> {
  return new Observable((observer: SubscriptionObserver<T>) => {
    const subscription = observable.subscribe({
      complete: () => observer.complete(),
      error: (err: any) => observer.error(err),
      next: (value: T) => {
        const nextValue = modifier ? modifier(value) : value;

        nextValue && observer.next(nextValue);
      }
    });

    return () => subscription.unsubscribe();
  });
}
