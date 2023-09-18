import { LinkedList } from '..';

export class Stack<T> {
  private linkedList;

  constructor() {
    this.linkedList = new LinkedList<T>();
  }

  isEmpty() {
    return this.linkedList.head === null;
  }

  peek() {
    return this.linkedList.head?.value ?? null;
  }

  push(val: T) {
    this.linkedList.prepend(val);
  }

  pop() {
    const node = this.linkedList.deleteHead();
    return node?.value ?? null;
  }

  toArray() {
    return this.linkedList.toArray().map((n) => n.value);
  }

  toString(callback?: ToStringCallback<T>) {
    return this.linkedList.toString(callback);
  }
}
