import { AnswerResponse, ClassificationResponse, CompletionRequest, CompletionResponse, EngineId, GpTs, SearchResponse } from 'gpts';
export declare class Conversation extends GpTs {
    text: string;
    notes: string;
    responses: {
        completion: CompletionResponse;
        search: SearchResponse;
        classification: ClassificationResponse;
        answer: AnswerResponse;
    };
    engine: EngineId;
    completionData: {
        res: CompletionResponse;
        req: CompletionRequest;
        notes: string;
        create: () => void;
        getChoice: (index: number) => string;
    };
    constructor(apiKey: string, origin?: string);
    addTemplate(filepath: string): this;
    inject(...args: any[]): this;
    prepend(inText: string): this;
    append(inText: string): this;
    appendNotes(): this;
    setEngine(inEngineId: EngineId): void;
    genCompletion(options?: CompletionRequest & {
        engineId?: string;
    }): Promise<this>;
    saveCompletionToNotes(choiceIndex: number): this;
    getCompletionChoice(choiceIndex: number): string;
}
