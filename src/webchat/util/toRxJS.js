export default function toRxJS(observable) {
  return {
    subscribe: subscriber =>
      observable.subscribe({
        next: value => subscriber(value)
      })
  };
}
