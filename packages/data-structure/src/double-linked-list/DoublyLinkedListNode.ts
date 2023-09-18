export class DoublyLinkedListNode<T> {
  value: T;
  next: Nullable<DoublyLinkedListNode<T>>;
  prev: Nullable<DoublyLinkedListNode<T>>;
  constructor(value: T, next?: Nullable<DoublyLinkedListNode<T>>, prev?: Nullable<DoublyLinkedListNode<T>>) {
    this.value = value;
    this.next = next ?? null;
    this.prev = prev ?? null;
  }

  toString(callback?: (val: T) => string) {
    return typeof callback === 'function' ? callback(this.value) : `${this.value}`;
  }
}
