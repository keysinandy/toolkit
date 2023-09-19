import { LinkedList } from '..';

const DEFAULT_SIZE = 10;

export class LRUCache<K, V> {
  private list: LinkedList<K>;
  private map: Map<any, any>;
  private limitSize: number;
  constructor(limitSize: number) {
    this.list = new LinkedList<K>();
    this.map = new Map<K, V>();
    this.limitSize = limitSize ?? DEFAULT_SIZE;
  }

  clear() {
    this.list.clear();
    this.map.clear();
  }

  get(key: K) {
    if (this.map.has(key)) {
      const node = this.list.delete(key);
      this.list.prepend(node!.value);
    }
    return this.map.get(key);
  }

  set(key: K, value: V) {
    const alreadyHas = this.map.has(key);
    this.map.set(key, value);
    if (alreadyHas) {
      this.list.delete(key);
    }
    this.list.prepend(key);
    if (this.size > this.limitSize) {
      const node = this.list.deleteTail();
      this.map.delete(node!.value);
    }
  }

  get size() {
    return this.map.size;
  }
}
