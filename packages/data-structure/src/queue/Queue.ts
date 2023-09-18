import { LinkedList } from '..';

export class Queue<T> {
  private linkedLink;

  constructor() {
    this.linkedLink = new LinkedList<T>();
  }

  isEmpty() {
    return this.linkedLink.head === null;
  }

  peek() {
    return this.linkedLink.head?.value ?? null;
  }

  enqueue(val: T) {
    this.linkedLink.append(val);
  }

  dequeue() {
    const node = this.linkedLink.deleteHead();
    return node?.value ?? null;
  }

  toString(callback?: ToStringCallback<T>) {
    return this.linkedLink.toString(callback);
  }
}
