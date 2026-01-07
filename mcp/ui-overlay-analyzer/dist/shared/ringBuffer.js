export class RingBuffer {
    maxSize;
    items = [];
    constructor(maxSize) {
        if (!Number.isFinite(maxSize) || maxSize <= 0) {
            throw new Error("RingBuffer maxSize must be a positive number.");
        }
        this.maxSize = Math.floor(maxSize);
    }
    push(item) {
        if (this.items.length >= this.maxSize) {
            this.items.shift();
        }
        this.items.push(item);
    }
    toArray() {
        return [...this.items];
    }
    clear() {
        this.items.length = 0;
    }
}
