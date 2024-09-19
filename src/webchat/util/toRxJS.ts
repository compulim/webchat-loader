import { type Observable, type Subscription } from 'iter-fest';

export default function toRxJS<T>(observable: Observable<T>): {
  subscribe: (subscriber: (value: T) => void) => Subscription;
} {
  return {
    subscribe: subscriber =>
      observable.subscribe({
        next: value => subscriber(value)
      })
  };
}
