import { LinkedListNode } from './LinkedListNode';
import { Comparator, CompareFn } from '../utils';

export class LinkedList<T> {
  head: null | LinkedListNode<T> = null;
  tail: null | LinkedListNode<T> = null;
  comparator: Comparator<T>;
  constructor(compare?: CompareFn<T>) {
    this.comparator = new Comparator<T>(compare);
  }

  /**
   *
   * @param value
   * @returns {LinkedList}
   */
  prepend(value: T) {
    const node = new LinkedListNode(value, this.head);
    this.head = node;
    if (!this.tail) this.tail = node;
    return this;
  }

  append(value: T) {
    const node = new LinkedListNode(value);
    if (!this.tail) {
      this.tail = this.head = node;
    } else {
      this.tail.next = node;
      this.tail = node;
    }
    return this;
  }

  insert(value: T, index: number) {
    if (index <= 0) {
      this.prepend(value);
    } else {
      let currentNode = this.head;
      let currentIndex = 1;
      while (currentNode) {
        if (currentIndex === index) {
          break;
        }
        currentNode = currentNode.next;
        currentIndex++;
      }
      if (currentNode === null) {
        this.append(value);
      } else {
        const node = new LinkedListNode(value);
        const next = currentNode.next;
        currentNode.next = node;
        node.next = next;
        if (next === null) {
          this.tail = node;
        }
      }
    }
    return this;
  }

  delete(val: T) {
    let prevNode = null;
    let currentNode = this.head;
    let deleted = null;
    while (currentNode) {
      if (this.comparator.equal(val, currentNode.value)) {
        deleted = currentNode;
        if (prevNode) {
          prevNode.next = currentNode.next;
        }
        if (this.tail === deleted) {
          this.tail = prevNode;
        }
        if (this.head === deleted) {
          this.head = currentNode.next;
        }
      } else {
        prevNode = currentNode;
      }
      currentNode = currentNode.next;
    }
    deleted && (deleted.next = null);
    return deleted;
  }

  find({ value, callback }: { value: T; callback?: (n: T) => boolean }) {
    let currentNode = this.head;
    while (currentNode) {
      if (callback && callback(currentNode.value)) return currentNode;
      if (this.comparator.equal(currentNode.value, value)) return currentNode;
      currentNode = currentNode.next;
    }
    return null;
  }

  deleteHead() {
    if (this.head === null) return null;
    const deleted = this.head;
    if (this.head === this.tail) {
      this.head = this.tail = null;
    } else {
      this.head = this.head.next;
      deleted.next = null;
    }
    return deleted;
  }

  deleteTail() {
    let currentNode = this.head;
    let prevNode = null;
    let deleted = null;
    while (currentNode) {
      if (currentNode.next === null) {
        deleted = currentNode;
        if (prevNode === null) {
          this.head = this.tail = null;
        } else {
          prevNode.next = currentNode.next;
          if (currentNode.next === null) {
            this.tail = prevNode;
          }
        }
        break;
      }
      prevNode = currentNode;
      currentNode = currentNode.next;
    }
    deleted && (deleted.next = null);
    return deleted;
  }

  toArray() {
    const list: LinkedListNode<T>[] = [];
    let currentNode = this.head;
    while (currentNode) {
      list.push(currentNode);
      currentNode = currentNode.next;
    }
    return list;
  }

  fromArray(values: T[]) {
    for (const val of values) {
      this.append(val);
    }
  }

  clear() {
    this.head = this.tail = null;
  }

  toString(callback?: (val: T) => string) {
    return this.toArray()
      .map((node) => node.toString(callback))
      .join(',');
  }

  reverse() {
    if (this.head === null || this.head === this.tail) return;
    let prevNode: LinkedListNode<T> | null = null;
    let currentNode: LinkedListNode<T> | null = this.head;
    while (currentNode) {
      const nextNode: LinkedListNode<T> | null = currentNode.next;
      currentNode.next = prevNode;
      prevNode = currentNode;
      currentNode = nextNode;
    }
    [this.head, this.tail] = [this.tail, this.head];
  }
}
