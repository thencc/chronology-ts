import { AnswerResponse, ClassificationResponse, CompletionRequest, CompletionResponse, EngineId, GpTs, SearchResponse } from 'gpts';
import * as fs from 'fs';
import * as path from 'path';
import { inject } from './utils';
export class Conversation extends GpTs {
    constructor(...args) {
        super(...args);
        this.text = '';
        this.notes = ''; // temp text bucket for method chaining
        this.responses = {
            completion: null, as: CompletionResponse,
            search: null, as: SearchResponse,
            classification: null, as: ClassificationResponse,
            answer: null, as: AnswerResponse,
        };
        // default engine used for all api calls
        this.engine = 'ada';
    }
}
as;
EngineId;
// idea:
completionData = {
    res: null, as: CompletionResponse,
    req: {}, as: CompletionRequest,
    notes: '',
    create: () => {
        //
        // super.completion()
    },
    // unique:
    getChoice: (index) => {
        //
        index;
        return '';
    },
};
constructor(apiKey, string);
{
    super(apiKey);
}
// reads a .txt template conversation + adds it to this.text
// path looks like: '../demo/prompts/artist.txt'
addTemplate(filepath, string);
this;
{
    const f = fs.readFileSync(path.join(__dirname, filepath), 'utf8');
    // this.text += f;
    this.append(f);
    return this; // return "this" so method chaining is possible
}
// like python.format(...) but in ts
// eslint-disable-next-line @typescript-eslint/no-explicit-any
inject(...args, any[]);
this;
{
    this.text = inject(this.text, ...args);
    return this;
}
prepend(inText, string);
this;
{
    this.text = inText + this.text;
    return this;
}
append(inText, string);
this;
{
    // this.text += '\n' + inText;
    this.text = this.text + inText;
    return this;
}
appendNotes();
this;
{
    this.append(this.notes);
    return this;
}
setEngine(inEngineId, EngineId);
void {
    this: .engine = inEngineId
};
// for daisy chaining methods (jquery style)
async;
genCompletion(options ?  : CompletionRequest & { engineId: string });
Promise < this > {
    const: gRes = await, this: .completion({}, ...(options || {}), engineId, options ? .engineId || this.engine : , prompt, this.text) // use locally stored val
};
;
this.responses.completion = gRes;
return this;
saveCompletionToNotes(choiceIndex, number);
this;
{
    this.notes = this.getCompletionChoice(choiceIndex);
    return this;
}
getCompletionChoice(choiceIndex, number);
string;
{
    if (this.responses.completion) {
        return this.responses.completion.choices[choiceIndex].text;
    }
    else {
        return '';
    }
}
//# sourceMappingURL=Conversation.js.map