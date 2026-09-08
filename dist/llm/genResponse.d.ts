type ChatMessage = {
    role: "user" | "assistant";
    content: string;
};
export declare const genResponse: (query: string, context: string, chat: ChatMessage[]) => Promise<{
    answer: string;
}>;
export {};
//# sourceMappingURL=genResponse.d.ts.map