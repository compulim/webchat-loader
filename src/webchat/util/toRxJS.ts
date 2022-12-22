import type { Subscription } from 'core-js/features/observable';
import type Observable from 'core-js/features/observable';

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
