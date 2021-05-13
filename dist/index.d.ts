export * from './utils';
import { Conversation } from './Conversation';
export declare class Chronology {
    apiKey: string;
    origin: string;
    convos: Record<number, Conversation>;
    constructor(apiKey: string, origin?: string);
    createConversation(): Conversation;
}
export default Chronology;
