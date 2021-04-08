import { AnswerResponse, ClassificationResponse, CompletionRequest, CompletionResponse, EngineId, GpTs, SearchResponse } from 'gpt-ts';
import * as fs from 'fs'; // needs "@types/node": "^14.14.37",
import * as path from 'path';

import { inject } from './utils';

export class Conversation extends GpTs {
	text = '';
	notes = ''; // temp text bucket for method chaining
	lastResponses = {
		completion: null as CompletionResponse,
		search: null as SearchResponse,
		classification: null as ClassificationResponse,
		answer: null as AnswerResponse
	};

	constructor(apiKey: string) {
		super(apiKey);
	}

	// reads a .txt template conversation + adds it to this.text
	// path looks like: '../demo/prompts/artist.txt'
	addTemplate(filepath: string): this {
		const f = fs.readFileSync(path.join(__dirname, filepath), 'utf8');
		// this.text += f;
		this.append(f);
		return this; // always return "this" so method chaining is possible
	}

	// like python.format(...) but in ts
	inject(...args: any[]): this {
		this.text = inject(this.text, ...args);
		return this;
	}

	prepend(inText: string): this {
		this.text = inText + this.text;
		return this;
	}

	append(inText: string): this {
		// this.text += '\n' + inText;
		this.text = this.text + inText;
		return this;
	}

	appendNotes(): this {
		this.append(this.notes);
		return this;
	}

	// for daisy chaining methods (jquery style)
	async genCompletion(engineId: EngineId, options: CompletionRequest): Promise<this> {
		const gRes = await this.createCompletion(engineId, options);
		this.lastResponses.completion = gRes;
		return this;
	}

	saveCompletionToNotes(choiceIndex: number): this {
		if (this.lastResponses.completion) {
			this.notes = this.lastResponses.completion.choices[choiceIndex].text;
		}
		return this;
	}

}
