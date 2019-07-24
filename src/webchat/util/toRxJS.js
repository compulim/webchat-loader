export default function toRxJS(observable) {
  return {
    subscribe: subscriber => {
      return observable.subscribe({
        next: value => subscriber(value)
      });
    }
  };
}
