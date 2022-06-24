import Observable from 'core-js/features/observable';
import sleep from './sleep';

function createDeferredObservable(subscribe) {
  const observers = [];
  const observable = new Observable(observer => {
    const unsubscribe = subscribe && subscribe(observer);

    observers.push(observer);

    return () => {
      removeInline(observers, observer);

      unsubscribe && unsubscribe();
    };
  });

  return {
    complete: () => observers.forEach(observer => observer.complete()),
    error: error => observers.forEach(observer => observer.error(error)),
    next: value => observers.forEach(observer => observer.next(value)),
    observable
  };
}

function shareObservable(observable) {
  const observers = [];
  let subscription;

  return new Observable(observer => {
    observers.push(observer);

    if (!subscription) {
      subscription = observable.subscribe({
        complete: () => observers.forEach(observer => observer.complete()),
        error: err => observers.forEach(observer => observer.error(err)),
        next: value => observers.forEach(observer => observer.next(value))
      });
    }

    return () => {
      const index = observers.indexOf(observer);

      ~index && observers.splice(index, 1);

      if (!observers.length) {
        subscription.unsubscribe();
        subscription = null;
      }
    };
  });
}

export default function createDirectLineFromTranscript(activities) {
  const connectionStatusDeferredObservable = createDeferredObservable(() => {
    connectionStatusDeferredObservable.next(0);
  });

  const activityDeferredObservable = createDeferredObservable(() => {
    (async function () {
      connectionStatusDeferredObservable.next(1);
      connectionStatusDeferredObservable.next(2);

      await sleep(1000);

      for (const activity of activities) {
        activityDeferredObservable.next(activity);
        await sleep(200);
      }
    })();
  });

  return {
    activity$: shareObservable(activityDeferredObservable.observable),
    connectionStatus$: shareObservable(connectionStatusDeferredObservable.observable),
    end: () => {},
    postActivity: activity => {
      const id = Math.random().toString(36).substring(2, 7);

      activityDeferredObservable.next({
        ...activity,
        id,
        timestamp: new Date().toISOString()
      });

      return Observable.from([id]);
    }
  };
}
