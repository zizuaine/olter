
export class tokenBucket {
    private tokens: number;
    private refillRate: number;
    private capacity: number;
    private lastRefill: number;

    constructor(capacity: number, refillRate: number) {
        this.capacity = capacity;
        this.refillRate = refillRate;
        this.tokens = capacity;
        this.lastRefill = Date.now();
    }

    private refill(): void {
        const currentTime = Date.now();
        const elapsedTime = currentTime - this.lastRefill;
        const tokensToAdd = this.refillRate * elapsedTime;
        this.tokens = Math.min(this.capacity, this.tokens + tokensToAdd);
        this.lastRefill = currentTime;
    }

    public async consume(): Promise<void> {
        this.refill();
        while (this.tokens < 1) {
            const waitMs = Math.ceil(1 - this.tokens) / this.refillRate;
            await new Promise(resolve => setTimeout(resolve, waitMs));
            this.refill();
        }
        this.tokens -= 1;
    }
}

export const geminiBucket = new tokenBucket(5, 80 / 60000);
export const groqRateLimiter = new tokenBucket(30, 30 / 60000)