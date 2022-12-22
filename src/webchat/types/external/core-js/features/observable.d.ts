declare module 'core-js/features/observable' {
  interface Subscription {
    // Cancels the subscription
    unsubscribe(): void;

    // A boolean value indicating whether the subscription is closed
    get closed(): Boolean;
  }

  interface Observer<T> {
    // Receives the subscription object when `subscribe` is called
    start(subscription: Subscription): void;

    // Receives the next value in the sequence
    next(value: T): void;

    // Receives the sequence error
    error(errorValue: any): void;

    // Receives a completion notification
    complete(): void;
  }

  interface SubscriptionObserver<T> {
    // Sends the next value in the sequence
    next(value: T): void;

    // Sends the sequence error
    error(errorValue: any): void;

    // Sends the completion notification
    complete(): void;

    // A boolean value indicating whether the subscription is closed
    get closed(): Boolean;
  }

  type SubscriberFunction<T> = (observer: SubscriptionObserver<T>) => (() => void) | Subscription;

  class Observable<T> {
    constructor(subscriber: SubscriberFunction<T>);

    // Subscribes to the sequence with an observer
    subscribe(observer: Partial<Observer<T>>): Subscription;

    // Subscribes to the sequence with callbacks
    subscribe(onNext: Function, onError?: Function, onComplete?: Function): Subscription;

    // Returns itself
    [Symbol.observable](): Observable<T>;

    // Converts items to an Observable
    static of<T>(...items: readonly T[]): Observable<T>;

    // Converts an observable or iterable to an Observable
    static from<T>(observable: Iterable<T> | Observable<T>): Observable<T>;
  }

  // export = Observable;

  export default Observable;

  export type { Observer, Subscription, SubscriptionObserver };
}
