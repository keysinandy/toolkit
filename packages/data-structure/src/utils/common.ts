export const swap = <T = unknown>(a: number, b: number, list: T[]) => {
  [list[a], list[b]] = [list[b], list[a]];
};

export const isValid = <T = any>(val: T | undefined | null): val is T => {
  return val !== undefined && val !== null;
};

export const isFunction = (f: any): f is FunctionLike => typeof f === 'function';

export const isEqual = (a: any, b: any) => Object.is(a, b);
