import { GpTs } from 'gpt-ts';
import * as fs from 'fs'; // needs "@types/node": "^14.14.37",
import * as path from 'path';

import { inject } from './utils';

export class Conversation extends GpTs {
	text = '';

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

	// TBD can input ask be any openai call type?
	async reply(ask: any): Promise<string> {
		console.log('reply, ask:', ask);

		// TODO move this work to gpt-ts
		const res = await ask();
		// console.log('res', res);

		const json = await res.json(); // type: CompletionResponse
		// console.log('json', json);

		return json.choices[0].text.trim();
	}

}
