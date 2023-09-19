import { CompareFn } from '../utils';
import { Heap } from './Heap';

export class MaxHeap<T> extends Heap<T> {
  constructor(compare?: CompareFn<T>) {
    super(compare);
  }

  isPairInCorrectOrder(a: T, b: T): boolean {
    return this.comparator.greaterThan(a, b);
  }
}
