export interface OperationConfig {
    prompt: string;
    schema: Record<string, unknown>;
}
export declare const genStructuredOutput: <T>(operationConfig: OperationConfig, context: string) => Promise<T>;
//# sourceMappingURL=genStructuredOutput.d.ts.map