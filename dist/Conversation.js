"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Conversation = void 0;
const gpts_1 = require("gpts");
const fs = require("fs"); // needs "@types/node": "^14.14.37",
const path = require("path");
const utils_1 = require("./utils");
class Conversation extends gpts_1.GpTs {
    constructor(apiKey, origin = 'https://api.openai.com/v1') {
        super(apiKey, origin);
        this.text = '';
        this.notes = ''; // temp text bucket for method chaining
        this.responses = {
            completion: null,
            search: null,
            classification: null,
            answer: null,
        };
        // default engine used for all api calls
        this.engine = 'ada';
        // idea:
        this.completionData = {
            res: null,
            req: {},
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
            // all completion funcs live here
        };
    }
    // reads a .txt template conversation + adds it to this.text
    // path looks like: '../demo/prompts/artist.txt'
    addTemplate(filepath) {
        const f = fs.readFileSync(path.join(__dirname, filepath), 'utf8');
        // this.text += f;
        this.append(f);
        return this; // return "this" so method chaining is possible
    }
    // like python.format(...) but in ts
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    inject(...args) {
        this.text = utils_1.inject(this.text, ...args);
        return this;
    }
    prepend(inText) {
        this.text = inText + this.text;
        return this;
    }
    append(inText) {
        // this.text += '\n' + inText;
        this.text = this.text + inText;
        return this;
    }
    appendNotes() {
        this.append(this.notes);
        return this;
    }
    setEngine(inEngineId) {
        this.engine = inEngineId;
    }
    // for daisy chaining methods (jquery style)
    genCompletion(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const gRes = yield this.completion(Object.assign(Object.assign({}, (options || {})), { engineId: (options === null || options === void 0 ? void 0 : options.engineId) || this.engine, prompt: this.text }));
            this.responses.completion = gRes;
            return this;
        });
    }
    saveCompletionToNotes(choiceIndex) {
        this.notes = this.getCompletionChoice(choiceIndex);
        return this;
    }
    getCompletionChoice(choiceIndex) {
        if (this.responses.completion) {
            return this.responses.completion.choices[choiceIndex].text;
        }
        else {
            return '';
        }
    }
}
exports.Conversation = Conversation;
//# sourceMappingURL=Conversation.js.map