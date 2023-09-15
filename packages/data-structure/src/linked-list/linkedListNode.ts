export class LinkedListNode<T = unknown> {
  value: T;
  next: LinkedListNode<T> | null;
  constructor(value: T, next?: LinkedListNode<T> | null) {
    this.value = value;
    this.next = next ?? null;
  }

  toString(callback?: (val: T) => string) {
    return callback ? callback(this.value) : `${this.value}`;
  }
}
