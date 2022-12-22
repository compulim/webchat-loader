import Observable from 'core-js/features/observable';
import sleep from './sleep';

import type { Observer, Subscription, SubscriptionObserver } from 'core-js/features/observable';

function removeInline<T>(array: T[], value: T) {
  const index = array.indexOf(value);

  ~index && array.splice(index, 1);
}

function createDeferredObservable<T>(
  subscribe?: (observer: SubscriptionObserver<T>) => void | (() => void)
): Partial<Observer<T>> & { observable: Observable<T> } {
  const observers: SubscriptionObserver<T>[] = [];
  const observable = new Observable<T>((observer: SubscriptionObserver<T>) => {
    const unsubscribe = subscribe && subscribe(observer);

    observers.push(observer);

    return () => {
      removeInline(observers, observer);

      unsubscribe && unsubscribe();
    };
  });

  return {
    complete: () => observers.forEach(observer => observer.complete()),
    error: (error: any) => observers.forEach(observer => observer.error(error)),
    next: (value: T) => observers.forEach(observer => observer.next(value)),
    observable
  };
}

function shareObservable<T>(observable: Observable<T>) {
  const observers: SubscriptionObserver<T>[] = [];
  let subscription: Subscription | undefined;

  return new Observable<T>((observer: SubscriptionObserver<T>) => {
    observers.push(observer);

    if (!subscription) {
      subscription = observable.subscribe({
        complete: () => observers.forEach(observer => observer.complete()),
        error: (err: any) => observers.forEach(observer => observer.error(err)),
        next: (value: T) => observers.forEach(observer => observer.next(value))
      });
    }

    return () => {
      const index = observers.indexOf(observer);

      ~index && observers.splice(index, 1);

      if (!observers.length) {
        subscription?.unsubscribe();
        subscription = undefined;
      }
    };
  });
}

export default function createDirectLineFromTranscript(activities: any) {
  const connectionStatusDeferredObservable = createDeferredObservable<number>(() => {
    connectionStatusDeferredObservable?.next?.(0);
  });

  const activityDeferredObservable = createDeferredObservable(() => {
    (async function () {
      connectionStatusDeferredObservable?.next?.(1);
      connectionStatusDeferredObservable?.next?.(2);

      await sleep(1000);

      for (const activity of activities) {
        activityDeferredObservable?.next?.(activity);
        await sleep(200);
      }
    })();
  });

  return {
    activity$: shareObservable(activityDeferredObservable.observable),
    connectionStatus$: shareObservable(connectionStatusDeferredObservable.observable),
    end: () => {},
    postActivity: (activity: any) => {
      const id = Math.random().toString(36).substring(2, 7);

      activityDeferredObservable?.next?.({
        ...activity,
        id,
        timestamp: new Date().toISOString()
      });

      return Observable.from([id]);
    }
  };
}
