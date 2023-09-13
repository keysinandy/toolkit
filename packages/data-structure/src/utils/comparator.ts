export interface CompareFn<T = unknown> {
  (a: T, b: T): number;
}

export class Comparator<T = unknown> {
  compare: CompareFn<T>;
  constructor(compare?: CompareFn<T>) {
    this.compare = compare ?? ((a, b) => (a as number) - (b as number));
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

  greaterOrEqualThan(a: T, b: T) {
    return this.compare(a, b) >= 0;
  }

  lessOrEqualThan(a: T, b: T) {
    return this.compare(a, b) <= 0;
  }
}
