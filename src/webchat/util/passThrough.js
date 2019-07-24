import Observable from 'core-js/features/observable';

export default function passThrough(observable, modifier) {
  return new Observable(observer => {
    const subscription = observable.subscribe({
      complete: () => observer.complete(),
      error: err => observer.error(err),
      next: value => {
        const nextValue = modifier ? modifier(value) : value;

        nextValue && observer.next(nextValue);
      }
    });

    return () => subscription.unsubscribe();
  });
}
