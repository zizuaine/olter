export const chunker = (text, chunkSize = 450, overlap = 100, isRecursive = false, separators = ["\n\n", "\n", ". ", " "]) => {
    if (text.length <= chunkSize) {
        return [text];
    }
    ;
    const [currentSeparator, ...remainingSeparators] = separators;
    const chunksList = [];
    if (!currentSeparator) {
        for (let i = 0; i < text.length; i += chunkSize - overlap) {
            chunksList.push(text.slice(i, i + chunkSize));
        }
        ;
        return chunksList;
    }
    else {
        const splits = text.split(currentSeparator);
        let currentChunk = "";
        for (const split of splits) {
            const candidate = (currentChunk ? currentChunk + currentSeparator + split : split);
            if (candidate.length > chunkSize) {
                if (currentChunk) {
                    chunksList.push(currentChunk.trim());
                    currentChunk = "";
                }
                if (split.length > chunkSize) {
                    const subchunks = chunker(split, chunkSize, overlap, true, remainingSeparators);
                    chunksList.push(...subchunks);
                }
                else {
                    currentChunk = split;
                }
            }
            else {
                currentChunk = candidate;
            }
        }
        if (currentChunk)
            chunksList.push(currentChunk.trim());
        if (isRecursive)
            return chunksList;
        return chunksList.map((chunk, i) => {
            if (i === 0) {
                return chunk;
            }
            const previousChunk = chunksList[i - 1];
            const overlapContent = previousChunk?.slice(-overlap);
            const finalChunk = overlapContent + " " + chunk;
            return finalChunk;
        });
    }
};
//# sourceMappingURL=chunking.js.map