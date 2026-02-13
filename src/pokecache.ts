export type CacheEntry<T> = {
    createdAt: number,
    val: T,
}

export class Cache {
    constructor(interval: number) {
        this.#interval = interval;
        this.#startReapLoop();
    }

    #cache = new Map<string, CacheEntry<any>>();
    #reapIntervalId: NodeJS.Timeout | undefined = undefined;
    #interval: number;

    add<T>(key: string, val: T): void {
        const entry: CacheEntry<T> = {
            createdAt: Date.now(),
            val: val,
        };
        this.#cache.set(key, entry);
    }

    get<T>(key: string): T | undefined {
        const entry = this.#cache.get(key)
        if (!entry) return undefined;
        return entry.val as T;
    }

    #reap() {
        const cutOff = Date.now() - this.#interval;
        for (const [key, entry] of this.#cache) {
            if (entry.createdAt < cutOff) {
                this.#cache.delete(key)
            }
        }
    }
    #startReapLoop() {
        this.#reapIntervalId = setInterval(() => this.#reap(), this.#interval)
    }
    stopReapLoop() {
        if (!this.#reapIntervalId) return;
        clearInterval(this.#reapIntervalId);
        this.#reapIntervalId = undefined;
    }

}