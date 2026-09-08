export declare const sendQueryService: (query: string, chatId: string, user: string) => Promise<{
    status: number;
    body: {
        message: string;
    };
} | {
    status: number;
    body: {
        message: string;
        answer: string;
        sources: never[];
        chatId: any;
    };
} | {
    status: number;
    body: {
        chatId: string;
        sources: (import("mongoose").Document<unknown, {}, {
            tags: string[];
            topics: string[];
            userId: import("mongoose").Types.ObjectId;
            content: string;
            embeddingStatus: "pending" | "processing" | "completed" | "failed";
            chunkIds: string[];
            type?: "link" | "note" | "pdf" | "youtube" | null;
            link?: string | null;
            title?: string | null;
            summary?: string | null;
            sitename?: string | null;
            brainId?: import("mongoose").Types.ObjectId | null;
        } & import("mongoose").DefaultTimestampProps, {}, import("mongoose").DefaultSchemaOptions> & {
            tags: string[];
            topics: string[];
            userId: import("mongoose").Types.ObjectId;
            content: string;
            embeddingStatus: "pending" | "processing" | "completed" | "failed";
            chunkIds: string[];
            type?: "link" | "note" | "pdf" | "youtube" | null;
            link?: string | null;
            title?: string | null;
            summary?: string | null;
            sitename?: string | null;
            brainId?: import("mongoose").Types.ObjectId | null;
        } & import("mongoose").DefaultTimestampProps & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        } & {
            id: string;
        })[] | undefined;
        message?: never;
    } | {
        chatId: string;
        sources: (import("mongoose").Document<unknown, {}, {
            tags: string[];
            topics: string[];
            userId: import("mongoose").Types.ObjectId;
            content: string;
            embeddingStatus: "pending" | "processing" | "completed" | "failed";
            chunkIds: string[];
            type?: "link" | "note" | "pdf" | "youtube" | null;
            link?: string | null;
            title?: string | null;
            summary?: string | null;
            sitename?: string | null;
            brainId?: import("mongoose").Types.ObjectId | null;
        } & import("mongoose").DefaultTimestampProps, {}, import("mongoose").DefaultSchemaOptions> & {
            tags: string[];
            topics: string[];
            userId: import("mongoose").Types.ObjectId;
            content: string;
            embeddingStatus: "pending" | "processing" | "completed" | "failed";
            chunkIds: string[];
            type?: "link" | "note" | "pdf" | "youtube" | null;
            link?: string | null;
            title?: string | null;
            summary?: string | null;
            sitename?: string | null;
            brainId?: import("mongoose").Types.ObjectId | null;
        } & import("mongoose").DefaultTimestampProps & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        } & {
            id: string;
        })[] | undefined;
        message?: never;
    } | {
        chatId: string;
        sources: (import("mongoose").Document<unknown, {}, {
            tags: string[];
            topics: string[];
            userId: import("mongoose").Types.ObjectId;
            content: string;
            embeddingStatus: "pending" | "processing" | "completed" | "failed";
            chunkIds: string[];
            type?: "link" | "note" | "pdf" | "youtube" | null;
            link?: string | null;
            title?: string | null;
            summary?: string | null;
            sitename?: string | null;
            brainId?: import("mongoose").Types.ObjectId | null;
        } & import("mongoose").DefaultTimestampProps, {}, import("mongoose").DefaultSchemaOptions> & {
            tags: string[];
            topics: string[];
            userId: import("mongoose").Types.ObjectId;
            content: string;
            embeddingStatus: "pending" | "processing" | "completed" | "failed";
            chunkIds: string[];
            type?: "link" | "note" | "pdf" | "youtube" | null;
            link?: string | null;
            title?: string | null;
            summary?: string | null;
            sitename?: string | null;
            brainId?: import("mongoose").Types.ObjectId | null;
        } & import("mongoose").DefaultTimestampProps & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        } & {
            id: string;
        })[] | undefined;
        message: string;
        answer: string;
    } | {
        chatId: string;
        sources: (import("mongoose").Document<unknown, {}, {
            tags: string[];
            topics: string[];
            userId: import("mongoose").Types.ObjectId;
            content: string;
            embeddingStatus: "pending" | "processing" | "completed" | "failed";
            chunkIds: string[];
            type?: "link" | "note" | "pdf" | "youtube" | null;
            link?: string | null;
            title?: string | null;
            summary?: string | null;
            sitename?: string | null;
            brainId?: import("mongoose").Types.ObjectId | null;
        } & import("mongoose").DefaultTimestampProps, {}, import("mongoose").DefaultSchemaOptions> & {
            tags: string[];
            topics: string[];
            userId: import("mongoose").Types.ObjectId;
            content: string;
            embeddingStatus: "pending" | "processing" | "completed" | "failed";
            chunkIds: string[];
            type?: "link" | "note" | "pdf" | "youtube" | null;
            link?: string | null;
            title?: string | null;
            summary?: string | null;
            sitename?: string | null;
            brainId?: import("mongoose").Types.ObjectId | null;
        } & import("mongoose").DefaultTimestampProps & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        } & {
            id: string;
        })[] | undefined;
        questions: {
            questionNumber: number;
            question: string;
            options: string[];
            correctAnswer: string;
            explanation: string;
        }[];
        message?: never;
    } | {
        chatId: string;
        sources: (import("mongoose").Document<unknown, {}, {
            tags: string[];
            topics: string[];
            userId: import("mongoose").Types.ObjectId;
            content: string;
            embeddingStatus: "pending" | "processing" | "completed" | "failed";
            chunkIds: string[];
            type?: "link" | "note" | "pdf" | "youtube" | null;
            link?: string | null;
            title?: string | null;
            summary?: string | null;
            sitename?: string | null;
            brainId?: import("mongoose").Types.ObjectId | null;
        } & import("mongoose").DefaultTimestampProps, {}, import("mongoose").DefaultSchemaOptions> & {
            tags: string[];
            topics: string[];
            userId: import("mongoose").Types.ObjectId;
            content: string;
            embeddingStatus: "pending" | "processing" | "completed" | "failed";
            chunkIds: string[];
            type?: "link" | "note" | "pdf" | "youtube" | null;
            link?: string | null;
            title?: string | null;
            summary?: string | null;
            sitename?: string | null;
            brainId?: import("mongoose").Types.ObjectId | null;
        } & import("mongoose").DefaultTimestampProps & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        } & {
            id: string;
        })[] | undefined;
        summary: string;
        message?: never;
    } | {
        chatId: string;
        sources: (import("mongoose").Document<unknown, {}, {
            tags: string[];
            topics: string[];
            userId: import("mongoose").Types.ObjectId;
            content: string;
            embeddingStatus: "pending" | "processing" | "completed" | "failed";
            chunkIds: string[];
            type?: "link" | "note" | "pdf" | "youtube" | null;
            link?: string | null;
            title?: string | null;
            summary?: string | null;
            sitename?: string | null;
            brainId?: import("mongoose").Types.ObjectId | null;
        } & import("mongoose").DefaultTimestampProps, {}, import("mongoose").DefaultSchemaOptions> & {
            tags: string[];
            topics: string[];
            userId: import("mongoose").Types.ObjectId;
            content: string;
            embeddingStatus: "pending" | "processing" | "completed" | "failed";
            chunkIds: string[];
            type?: "link" | "note" | "pdf" | "youtube" | null;
            link?: string | null;
            title?: string | null;
            summary?: string | null;
            sitename?: string | null;
            brainId?: import("mongoose").Types.ObjectId | null;
        } & import("mongoose").DefaultTimestampProps & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        } & {
            id: string;
        })[] | undefined;
        length: number;
        toString(): string;
        toLocaleString(): string;
        toLocaleString(locales: string | string[], options?: Intl.NumberFormatOptions & Intl.DateTimeFormatOptions): string;
        pop(): {
            question: string;
            answer: string;
        } | undefined;
        push(...items: {
            question: string;
            answer: string;
        }[]): number;
        concat(...items: ConcatArray<{
            question: string;
            answer: string;
        }>[]): {
            question: string;
            answer: string;
        }[];
        concat(...items: ({
            question: string;
            answer: string;
        } | ConcatArray<{
            question: string;
            answer: string;
        }>)[]): {
            question: string;
            answer: string;
        }[];
        join(separator?: string): string;
        reverse(): {
            question: string;
            answer: string;
        }[];
        shift(): {
            question: string;
            answer: string;
        } | undefined;
        slice(start?: number, end?: number): {
            question: string;
            answer: string;
        }[];
        sort(compareFn?: ((a: {
            question: string;
            answer: string;
        }, b: {
            question: string;
            answer: string;
        }) => number) | undefined): {
            question: string;
            answer: string;
        }[];
        splice(start: number, deleteCount?: number): {
            question: string;
            answer: string;
        }[];
        splice(start: number, deleteCount: number, ...items: {
            question: string;
            answer: string;
        }[]): {
            question: string;
            answer: string;
        }[];
        unshift(...items: {
            question: string;
            answer: string;
        }[]): number;
        indexOf(searchElement: {
            question: string;
            answer: string;
        }, fromIndex?: number): number;
        lastIndexOf(searchElement: {
            question: string;
            answer: string;
        }, fromIndex?: number): number;
        every<S extends {
            question: string;
            answer: string;
        }>(predicate: (value: {
            question: string;
            answer: string;
        }, index: number, array: {
            question: string;
            answer: string;
        }[]) => value is S, thisArg?: any): this is S[];
        every(predicate: (value: {
            question: string;
            answer: string;
        }, index: number, array: {
            question: string;
            answer: string;
        }[]) => unknown, thisArg?: any): boolean;
        some(predicate: (value: {
            question: string;
            answer: string;
        }, index: number, array: {
            question: string;
            answer: string;
        }[]) => unknown, thisArg?: any): boolean;
        forEach(callbackfn: (value: {
            question: string;
            answer: string;
        }, index: number, array: {
            question: string;
            answer: string;
        }[]) => void, thisArg?: any): void;
        map<U>(callbackfn: (value: {
            question: string;
            answer: string;
        }, index: number, array: {
            question: string;
            answer: string;
        }[]) => U, thisArg?: any): U[];
        filter<S extends {
            question: string;
            answer: string;
        }>(predicate: (value: {
            question: string;
            answer: string;
        }, index: number, array: {
            question: string;
            answer: string;
        }[]) => value is S, thisArg?: any): S[];
        filter(predicate: (value: {
            question: string;
            answer: string;
        }, index: number, array: {
            question: string;
            answer: string;
        }[]) => unknown, thisArg?: any): {
            question: string;
            answer: string;
        }[];
        reduce(callbackfn: (previousValue: {
            question: string;
            answer: string;
        }, currentValue: {
            question: string;
            answer: string;
        }, currentIndex: number, array: {
            question: string;
            answer: string;
        }[]) => {
            question: string;
            answer: string;
        }): {
            question: string;
            answer: string;
        };
        reduce(callbackfn: (previousValue: {
            question: string;
            answer: string;
        }, currentValue: {
            question: string;
            answer: string;
        }, currentIndex: number, array: {
            question: string;
            answer: string;
        }[]) => {
            question: string;
            answer: string;
        }, initialValue: {
            question: string;
            answer: string;
        }): {
            question: string;
            answer: string;
        };
        reduce<U>(callbackfn: (previousValue: U, currentValue: {
            question: string;
            answer: string;
        }, currentIndex: number, array: {
            question: string;
            answer: string;
        }[]) => U, initialValue: U): U;
        reduceRight(callbackfn: (previousValue: {
            question: string;
            answer: string;
        }, currentValue: {
            question: string;
            answer: string;
        }, currentIndex: number, array: {
            question: string;
            answer: string;
        }[]) => {
            question: string;
            answer: string;
        }): {
            question: string;
            answer: string;
        };
        reduceRight(callbackfn: (previousValue: {
            question: string;
            answer: string;
        }, currentValue: {
            question: string;
            answer: string;
        }, currentIndex: number, array: {
            question: string;
            answer: string;
        }[]) => {
            question: string;
            answer: string;
        }, initialValue: {
            question: string;
            answer: string;
        }): {
            question: string;
            answer: string;
        };
        reduceRight<U>(callbackfn: (previousValue: U, currentValue: {
            question: string;
            answer: string;
        }, currentIndex: number, array: {
            question: string;
            answer: string;
        }[]) => U, initialValue: U): U;
        find<S extends {
            question: string;
            answer: string;
        }>(predicate: (value: {
            question: string;
            answer: string;
        }, index: number, obj: {
            question: string;
            answer: string;
        }[]) => value is S, thisArg?: any): S | undefined;
        find(predicate: (value: {
            question: string;
            answer: string;
        }, index: number, obj: {
            question: string;
            answer: string;
        }[]) => unknown, thisArg?: any): {
            question: string;
            answer: string;
        } | undefined;
        findIndex(predicate: (value: {
            question: string;
            answer: string;
        }, index: number, obj: {
            question: string;
            answer: string;
        }[]) => unknown, thisArg?: any): number;
        fill(value: {
            question: string;
            answer: string;
        }, start?: number, end?: number): {
            question: string;
            answer: string;
        }[];
        copyWithin(target: number, start: number, end?: number): {
            question: string;
            answer: string;
        }[];
        entries(): ArrayIterator<[number, {
            question: string;
            answer: string;
        }]>;
        keys(): ArrayIterator<number>;
        values(): ArrayIterator<{
            question: string;
            answer: string;
        }>;
        includes(searchElement: {
            question: string;
            answer: string;
        }, fromIndex?: number): boolean;
        flatMap<U, This = undefined>(callback: (this: This, value: {
            question: string;
            answer: string;
        }, index: number, array: {
            question: string;
            answer: string;
        }[]) => U | readonly U[], thisArg?: This | undefined): U[];
        flat<A, D extends number = 1>(this: A, depth?: D | undefined): FlatArray<A, D>[];
        at(index: number): {
            question: string;
            answer: string;
        } | undefined;
        findLast<S extends {
            question: string;
            answer: string;
        }>(predicate: (value: {
            question: string;
            answer: string;
        }, index: number, array: {
            question: string;
            answer: string;
        }[]) => value is S, thisArg?: any): S | undefined;
        findLast(predicate: (value: {
            question: string;
            answer: string;
        }, index: number, array: {
            question: string;
            answer: string;
        }[]) => unknown, thisArg?: any): {
            question: string;
            answer: string;
        } | undefined;
        findLastIndex(predicate: (value: {
            question: string;
            answer: string;
        }, index: number, array: {
            question: string;
            answer: string;
        }[]) => unknown, thisArg?: any): number;
        toReversed(): {
            question: string;
            answer: string;
        }[];
        toSorted(compareFn?: ((a: {
            question: string;
            answer: string;
        }, b: {
            question: string;
            answer: string;
        }) => number) | undefined): {
            question: string;
            answer: string;
        }[];
        toSpliced(start: number, deleteCount: number, ...items: {
            question: string;
            answer: string;
        }[]): {
            question: string;
            answer: string;
        }[];
        toSpliced(start: number, deleteCount?: number): {
            question: string;
            answer: string;
        }[];
        with(index: number, value: {
            question: string;
            answer: string;
        }): {
            question: string;
            answer: string;
        }[];
        [Symbol.iterator](): ArrayIterator<{
            question: string;
            answer: string;
        }>;
        [Symbol.unscopables]: {
            [x: number]: boolean | undefined;
            length?: boolean;
            toString?: boolean;
            toLocaleString?: boolean;
            pop?: boolean;
            push?: boolean;
            concat?: boolean;
            join?: boolean;
            reverse?: boolean;
            shift?: boolean;
            slice?: boolean;
            sort?: boolean;
            splice?: boolean;
            unshift?: boolean;
            indexOf?: boolean;
            lastIndexOf?: boolean;
            every?: boolean;
            some?: boolean;
            forEach?: boolean;
            map?: boolean;
            filter?: boolean;
            reduce?: boolean;
            reduceRight?: boolean;
            find?: boolean;
            findIndex?: boolean;
            fill?: boolean;
            copyWithin?: boolean;
            entries?: boolean;
            keys?: boolean;
            values?: boolean;
            includes?: boolean;
            flatMap?: boolean;
            flat?: boolean;
            at?: boolean;
            findLast?: boolean;
            findLastIndex?: boolean;
            toReversed?: boolean;
            toSorted?: boolean;
            toSpliced?: boolean;
            with?: boolean;
            [Symbol.iterator]?: boolean;
            readonly [Symbol.unscopables]?: boolean;
        };
        message?: never;
    } | {
        chatId: string;
        sources: (import("mongoose").Document<unknown, {}, {
            tags: string[];
            topics: string[];
            userId: import("mongoose").Types.ObjectId;
            content: string;
            embeddingStatus: "pending" | "processing" | "completed" | "failed";
            chunkIds: string[];
            type?: "link" | "note" | "pdf" | "youtube" | null;
            link?: string | null;
            title?: string | null;
            summary?: string | null;
            sitename?: string | null;
            brainId?: import("mongoose").Types.ObjectId | null;
        } & import("mongoose").DefaultTimestampProps, {}, import("mongoose").DefaultSchemaOptions> & {
            tags: string[];
            topics: string[];
            userId: import("mongoose").Types.ObjectId;
            content: string;
            embeddingStatus: "pending" | "processing" | "completed" | "failed";
            chunkIds: string[];
            type?: "link" | "note" | "pdf" | "youtube" | null;
            link?: string | null;
            title?: string | null;
            summary?: string | null;
            sitename?: string | null;
            brainId?: import("mongoose").Types.ObjectId | null;
        } & import("mongoose").DefaultTimestampProps & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        } & {
            id: string;
        })[] | undefined;
        quizId: import("mongoose").Types.ObjectId;
        questions: import("mongoose").Types.DocumentArray<{
            options: string[];
            questionNumber: number;
            question: string;
            correctAnswer: string;
            explanation: string;
        }, import("mongoose").Types.Subdocument<import("mongodb").ObjectId, unknown, {
            options: string[];
            questionNumber: number;
            question: string;
            correctAnswer: string;
            explanation: string;
        }, {}, {}> & {
            options: string[];
            questionNumber: number;
            question: string;
            correctAnswer: string;
            explanation: string;
        }>;
        message?: never;
    };
}>;
export declare const getExistingChatService: (chatId: string, user: string) => Promise<(import("mongoose").Document<unknown, {}, {
    title: string;
    userId: import("mongoose").Types.ObjectId;
    messages: import("mongoose").Types.DocumentArray<{
        createdAt: NativeDate;
        content: string;
        role: "user" | "assistant";
    }, import("mongoose").Types.Subdocument<import("mongodb").ObjectId, unknown, {
        createdAt: NativeDate;
        content: string;
        role: "user" | "assistant";
    }, {}, {}> & {
        createdAt: NativeDate;
        content: string;
        role: "user" | "assistant";
    }>;
    activeContentIds: import("mongoose").Types.ObjectId[];
    activeChunksIds: string[];
    brainId?: import("mongoose").Types.ObjectId | null;
    quizId?: import("mongoose").Types.ObjectId | null;
} & import("mongoose").DefaultTimestampProps, {}, import("mongoose").DefaultSchemaOptions> & {
    title: string;
    userId: import("mongoose").Types.ObjectId;
    messages: import("mongoose").Types.DocumentArray<{
        createdAt: NativeDate;
        content: string;
        role: "user" | "assistant";
    }, import("mongoose").Types.Subdocument<import("mongodb").ObjectId, unknown, {
        createdAt: NativeDate;
        content: string;
        role: "user" | "assistant";
    }, {}, {}> & {
        createdAt: NativeDate;
        content: string;
        role: "user" | "assistant";
    }>;
    activeContentIds: import("mongoose").Types.ObjectId[];
    activeChunksIds: string[];
    brainId?: import("mongoose").Types.ObjectId | null;
    quizId?: import("mongoose").Types.ObjectId | null;
} & import("mongoose").DefaultTimestampProps & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}) | null>;
export declare const getAllChatsService: (user: string) => Promise<(import("mongoose").Document<unknown, {}, {
    title: string;
    userId: import("mongoose").Types.ObjectId;
    messages: import("mongoose").Types.DocumentArray<{
        createdAt: NativeDate;
        content: string;
        role: "user" | "assistant";
    }, import("mongoose").Types.Subdocument<import("mongodb").ObjectId, unknown, {
        createdAt: NativeDate;
        content: string;
        role: "user" | "assistant";
    }, {}, {}> & {
        createdAt: NativeDate;
        content: string;
        role: "user" | "assistant";
    }>;
    activeContentIds: import("mongoose").Types.ObjectId[];
    activeChunksIds: string[];
    brainId?: import("mongoose").Types.ObjectId | null;
    quizId?: import("mongoose").Types.ObjectId | null;
} & import("mongoose").DefaultTimestampProps, {}, import("mongoose").DefaultSchemaOptions> & {
    title: string;
    userId: import("mongoose").Types.ObjectId;
    messages: import("mongoose").Types.DocumentArray<{
        createdAt: NativeDate;
        content: string;
        role: "user" | "assistant";
    }, import("mongoose").Types.Subdocument<import("mongodb").ObjectId, unknown, {
        createdAt: NativeDate;
        content: string;
        role: "user" | "assistant";
    }, {}, {}> & {
        createdAt: NativeDate;
        content: string;
        role: "user" | "assistant";
    }>;
    activeContentIds: import("mongoose").Types.ObjectId[];
    activeChunksIds: string[];
    brainId?: import("mongoose").Types.ObjectId | null;
    quizId?: import("mongoose").Types.ObjectId | null;
} & import("mongoose").DefaultTimestampProps & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
})[]>;
export declare const deleteChatService: (chatId: string, user: string) => Promise<(import("mongoose").Document<unknown, {}, {
    title: string;
    userId: import("mongoose").Types.ObjectId;
    messages: import("mongoose").Types.DocumentArray<{
        createdAt: NativeDate;
        content: string;
        role: "user" | "assistant";
    }, import("mongoose").Types.Subdocument<import("mongodb").ObjectId, unknown, {
        createdAt: NativeDate;
        content: string;
        role: "user" | "assistant";
    }, {}, {}> & {
        createdAt: NativeDate;
        content: string;
        role: "user" | "assistant";
    }>;
    activeContentIds: import("mongoose").Types.ObjectId[];
    activeChunksIds: string[];
    brainId?: import("mongoose").Types.ObjectId | null;
    quizId?: import("mongoose").Types.ObjectId | null;
} & import("mongoose").DefaultTimestampProps, {}, import("mongoose").DefaultSchemaOptions> & {
    title: string;
    userId: import("mongoose").Types.ObjectId;
    messages: import("mongoose").Types.DocumentArray<{
        createdAt: NativeDate;
        content: string;
        role: "user" | "assistant";
    }, import("mongoose").Types.Subdocument<import("mongodb").ObjectId, unknown, {
        createdAt: NativeDate;
        content: string;
        role: "user" | "assistant";
    }, {}, {}> & {
        createdAt: NativeDate;
        content: string;
        role: "user" | "assistant";
    }>;
    activeContentIds: import("mongoose").Types.ObjectId[];
    activeChunksIds: string[];
    brainId?: import("mongoose").Types.ObjectId | null;
    quizId?: import("mongoose").Types.ObjectId | null;
} & import("mongoose").DefaultTimestampProps & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}) | null>;
//# sourceMappingURL=chat.service.d.ts.map