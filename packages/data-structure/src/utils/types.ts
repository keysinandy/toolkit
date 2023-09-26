declare type Nullable<T> = T | null;
declare type ToStringCallback<T> = (val: T) => string;
declare interface FunctionLike {
  (...args: any): any;
}
