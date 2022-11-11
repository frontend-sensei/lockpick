export class Observable {
  constructor(value) {
    this.value = value;
    this.observers = [];
  }

  subscribe(fn) {
    this.observers.push(fn);
    fn(this.value);
  }

  unsubscribe(fn) {
    this.observers = this.observers.filter((observer) => observer !== fn);
  }

  notify(value) {
    this.observers.forEach((observer) => observer(value));
  }

  set(value) {
    this.value = value;
    this.notify(value);
  }
}
