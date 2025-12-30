export class RingBuffer<T> {
  private readonly maxSize: number;
  private readonly items: T[] = [];

  constructor(maxSize: number) {
    if (!Number.isFinite(maxSize) || maxSize <= 0) {
      throw new Error("RingBuffer maxSize must be a positive number.");
    }
    this.maxSize = Math.floor(maxSize);
  }

  push(item: T): void {
    if (this.items.length >= this.maxSize) {
      this.items.shift();
    }
    this.items.push(item);
  }

  toArray(): T[] {
    return [...this.items];
  }

  clear(): void {
    this.items.length = 0;
  }
}


