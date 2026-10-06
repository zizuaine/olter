import { tokenBucket } from "./rate-limiting/tokenBucket.js";
const bucket = new tokenBucket(2, 0.001);

const start = Date.now();

await Promise.all([
    bucket.consume(),
    bucket.consume(),
    bucket.consume(),
    bucket.consume(),
]);

console.log(`Finished in ${Date.now() - start}ms`);