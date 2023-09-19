import { Comparator, CompareFn } from '../utils';
import { isValid, swap } from '../utils/common';

export class Heap<T> {
  comparator: Comparator<T>;
  private container: T[];
  constructor(compare?: CompareFn<T>) {
    if (new.target === Heap) {
      throw new TypeError('Should implement Heap');
    }
    this.comparator = new Comparator(compare);
    this.container = [];
  }

  isEmpty() {
    return this.container.length === 0;
  }

  getParentIndex(childIndex: number) {
    return Math.floor((childIndex - 1) / 2);
  }

  getParent(childIndex: number) {
    return this.container[this.getParentIndex(childIndex)] ?? null;
  }

  hasParent(childIndex: number) {
    if (childIndex > 0 && this.getParent(childIndex) !== null) {
      return true;
    }
    return false;
  }

  getLeftIndex(parentIndex: number) {
    return parentIndex * 2 + 1;
  }

  getLeft(parentIndex: number) {
    return this.container[this.getLeftIndex(parentIndex)] ?? null;
  }

  hasLeft(parentIndex: number) {
    return this.getLeft(parentIndex) !== null;
  }

  getRightIndex(parentIndex: number) {
    return parentIndex * 2 + 2;
  }

  gerRight(parentIndex: number) {
    return this.container[this.getRightIndex(parentIndex)] ?? null;
  }

  hasRight(parentIndex: number) {
    return this.gerRight(parentIndex) !== null;
  }

  peek() {
    return this.container[0] ?? null;
  }

  add(val: T) {
    this.container.push(val);
    this.heapifyUp();
  }

  poll() {
    const node = this.container.shift();
    if (this.container.length) {
      this.container.unshift(this.container.pop()!);
      this.heapifyDown();
    }
    return node ?? null;
  }

  heapifyUp(startIndex?: number) {
    let currentIndex = startIndex ?? this.container.length - 1;
    while (this.hasParent(currentIndex)) {
      const current = this.container[currentIndex];
      const parent = this.getParent(currentIndex);
      const parentIndex = this.getParentIndex(currentIndex);
      if (!this.isPairInCorrectOrder(parent!, current)) {
        swap(currentIndex, parentIndex, this.container);
      }
      currentIndex = parentIndex;
    }
  }
  heapifyDown(startIndex?: number) {
    let currentIndex = startIndex ?? 0;
    if (this.isEmpty()) return;
    while (this.hasLeft(currentIndex) || this.hasRight(currentIndex)) {
      const current = this.container[currentIndex];
      const hasLeft = this.hasLeft(currentIndex);
      const hasRight = this.hasRight(currentIndex);
      const leftIndex = this.getLeftIndex(currentIndex);
      const rightIndex = this.getRightIndex(currentIndex);
      const left = this.getLeft(currentIndex);
      const right = this.gerRight(currentIndex);
      if (hasRight && hasLeft) {
        const compareIndex = this.isPairInCorrectOrder(this.container[leftIndex], this.container[rightIndex])
          ? leftIndex
          : rightIndex;

        if (!this.isPairInCorrectOrder(current, this.container[compareIndex]!)) {
          swap(currentIndex, compareIndex, this.container);
          currentIndex = compareIndex;
        }
      } else if (hasLeft && !this.isPairInCorrectOrder(current, left!)) {
        swap(currentIndex, leftIndex, this.container);
        currentIndex = leftIndex;
      } else if (hasRight && !this.isPairInCorrectOrder(current, right!)) {
        swap(currentIndex, rightIndex, this.container);
        currentIndex = rightIndex;
      } else {
        break;
      }
    }
  }

  toString() {
    return this.container.toString();
  }

  isPairInCorrectOrder(_a: T, _b: T): boolean {
    throw new TypeError('Should overwrite this method');
  }

  find(item: T, comparator = this.comparator) {
    const findIndex: number[] = [];
    this.container.forEach((value, index) => {
      if (comparator.equal(value, item)) {
        findIndex.push(index);
      }
    });
    return findIndex;
  }
  remove(item: T, comparator = this.comparator) {
    let toRemoveIndex = this.find(item, comparator).pop();
    while (isValid(toRemoveIndex)) {
      if (toRemoveIndex === this.container.length - 1) {
        this.container.pop();
      } else {
        this.container[toRemoveIndex] = this.container.pop()!;
        if (
          this.hasParent(toRemoveIndex) &&
          !this.isPairInCorrectOrder(this.getParent(toRemoveIndex)!, this.container[toRemoveIndex])
        ) {
          this.heapifyUp(toRemoveIndex);
        } else {
          this.heapifyDown(toRemoveIndex);
        }
      }
      toRemoveIndex = this.find(item, comparator).pop();
    }
    return this;
  }
}
