export const chunker = (
    text: string,
    chunkSize: number = 450,
    overlap: number = 100,
    isRecursive: boolean = false,
    separators: string[] = ["\n\n", "\n", ". ", " "]
): string[] => {
    if (text.length <= chunkSize) {
        return [text]
    };

    const [currentSeparator, ...remainingSeparators] = separators;

    const chunksList: string[] = []

    if (!currentSeparator) {
        for (let i = 0; i < text.length; i += chunkSize - overlap) {
            chunksList.push(text.slice(i, i + chunkSize));
        };
        return chunksList;
    } else {
        const splits = text.split(currentSeparator);

        let currentChunk: string = "";

        for (const split of splits) {
            const candidate = (currentChunk ? currentChunk + currentSeparator + split : split)
            if (candidate.length > chunkSize) {
                if (currentChunk) {
                    chunksList.push(currentChunk.trim())
                    currentChunk = "";
                }
                if (split.length > chunkSize) {
                    const subchunks = chunker(split, chunkSize, overlap, true, remainingSeparators);
                    chunksList.push(...subchunks);
                } else {
                    currentChunk = split
                }
            } else {
                currentChunk = candidate;
            }
        }

        if (currentChunk) chunksList.push(currentChunk.trim());

        if (isRecursive) return chunksList;

        return chunksList.map((chunk: string, i: number): string => {
            if (i === 0) {
                return chunk;
            }
            const previousChunk = chunksList[i - 1];
            const overlapContent = previousChunk?.slice(-overlap);
            return overlapContent + " " + chunk;
        });
    }


}