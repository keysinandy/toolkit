export interface CompareFn<T = unknown> {
  (a: T, b: T): number;
}

const defaultCompare: CompareFn = (a, b) => {
  if (a === b) return 0;
  return (a as number) > (b as number) ? 1 : -1;
};

export class Comparator<T = unknown> {
  compare: CompareFn<T>;
  constructor(compare?: CompareFn<T>) {
    this.compare = compare ?? defaultCompare;
  }

  equal(a: T, b: T) {
    return this.compare(a, b) === 0;
  }

  greaterThan(a: T, b: T) {
    return this.compare(a, b) > 0;
  }

  lessThan(a: T, b: T) {
    return this.compare(a, b) < 0;
  }

  greaterThanOrEqual(a: T, b: T) {
    return this.compare(a, b) >= 0;
  }

  lessThanOrEqual(a: T, b: T) {
    return this.compare(a, b) <= 0;
  }

  reverse() {
    const fn = this.compare;
    this.compare = (a, b) => fn(b, a);
  }
}
