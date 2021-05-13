import { GpTs } from 'gpts';
export declare class Conversation extends GpTs {
    text: string;
    notes: string;
    responses: {
        completion: any;
        as: any;
        search: any;
        classification: any;
        answer: any;
    };
    engine: string;
}
