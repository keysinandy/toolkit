import { DoublyLinkedListNode } from '.';
import { Comparator, CompareFn } from '../utils';

export class DoublyLinkedList<T> {
  comparator: Comparator<T>;
  head: Nullable<DoublyLinkedListNode<T>> = null;
  tail: Nullable<DoublyLinkedListNode<T>> = null;
  constructor(compare?: CompareFn<T>) {
    this.comparator = new Comparator(compare);
  }

  prepend(value: T) {
    if (this.head === null && this.tail === null) {
      this.head = this.tail = new DoublyLinkedListNode(value);
    } else {
      const node = new DoublyLinkedListNode(value, this.head);
      this.head!.prev = node;
      this.head = node;
    }
    return this;
  }

  append(value: T) {
    if (this.head === null) {
      this.head = this.tail = new DoublyLinkedListNode(value);
    } else {
      const node = new DoublyLinkedListNode(value, null, this.tail);
      this.tail!.next = node;
      this.tail = node;
    }
    return this;
  }

  delete(value: T) {
    let currentNode = this.head;
    let deletedNode = null;
    while (currentNode) {
      if (this.comparator.equal(value, currentNode.value)) {
        deletedNode = currentNode;
        if (currentNode.prev) {
          currentNode.prev.next = currentNode.next;
        }
        if (currentNode.next) {
          currentNode.next.prev = currentNode.prev;
        }
        if (this.head === currentNode) {
          this.head = currentNode.next;
        }
        if (this.tail === currentNode) {
          this.tail = currentNode.prev;
        }
      }
      currentNode = currentNode.next;
    }
    return deletedNode;
  }

  find({ value, callback }: { value: T; callback?: (n: T) => boolean }) {
    let currentNode = this.head;
    while (currentNode) {
      if (typeof callback === 'function' && callback(currentNode.value)) {
        return currentNode;
      }
      if (this.comparator.equal(value, currentNode.value)) {
        return currentNode;
      }
      currentNode = currentNode.next;
    }
    return null;
  }

  deleteHead() {
    const node = this.head;
    if (this.head === this.tail) {
      this.head = this.tail = null;
    } else {
      this.head = this.head!.next;
      this.head!.prev = null;
    }
    return node;
  }

  deleteTail() {
    const node = this.tail;
    if (this.head === this.tail) {
      this.head = this.tail = null;
    } else {
      this.tail = this.tail!.prev;
      this.tail!.next = null;
    }
    return node;
  }

  toArray() {
    const list: DoublyLinkedListNode<T>[] = [];
    let currentNode = this.head;
    while (currentNode) {
      list.push(currentNode);
      currentNode = currentNode.next;
    }
    return list;
  }

  fromArray(values: T[]) {
    for (const value of values) {
      this.append(value);
    }
  }

  toString(callback?: (val: T) => string) {
    return this.toArray()
      .map((node) => node.toString(callback))
      .join(',');
  }

  reverse() {
    let currentNode = this.head;
    while (currentNode) {
      const nextNode = currentNode.next;
      currentNode.next = currentNode.prev;
      currentNode.prev = nextNode;
      currentNode = nextNode;
    }
    [this.head, this.tail] = [this.tail, this.head];
  }
}
